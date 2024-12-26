import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import defaultAvatar2 from '../../../assets/images/avatar-default.svg'
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import OTPInput from 'react-otp-input'
import { getUserProfile, updateProfileData } from '../../../redux/Service/settings'
import { getCityAPI, getCountryAPI, getCountryPhoneCodeAPI, getStateAPI } from '../../../redux/Service/generic'
import { checkFileSize, customJsonInclude, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper'
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik'
import * as yup from 'yup';
import { DropDownResponse, ENUMFORACCOUNTTAB, ENUMFORCHANGEEMAIL, ENUMFORROUTES, UserProfileResponse } from '../../../interfaces/interface'
import { MAX_10, MAX_100, MAX_15, MAX_300, MAX_5, MAX_50 } from '../../../Utility/Validation_Helper'
import Select from "react-select";
import { forgetPasswordVerifyOtp, sendOtpToEmail } from '../../../redux/Service/forgotPassword'

const ProfileInfo = (props) => {
    const [show, setDeleteShow] = useState(false);
    const navigate = useNavigate();
    const handleDeleteClose = () => {
        setemail(""); setOtp(null); setSteps(ENUMFORCHANGEEMAIL.SEND_OTP); setDeleteShow(false); sendOtpform.values = {}; sendOtpform.resetForm();
    };
    const handleDeleteShow = () => { setSteps(ENUMFORCHANGEEMAIL.SEND_OTP); setDeleteShow(true) };

    /* ------------------------------------send otp --------------------------------------- */
    const [steps, setSteps] = useState<string>(ENUMFORCHANGEEMAIL.SEND_OTP);
    const [email, setemail] = useState<string>("");
    const initevalueSendOtp: any = {
        email: "",
    };

    const validationSchemaForSendOtp = yup.object({
        email: yup.string().email("Please Enter a valid Email. ").required("Email is Required!!"),
    });

    const handleSendOtp = async () => {
        const emailErrors = sendOtpform.validateForm();
        if (Object.keys(emailErrors).length > 0) {
            sendOtpform.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(emailErrors, true))
            return;
        } else {
            setemail(sendOtpform.values.email)
            let response = await props?.sendOtpToEmail({ email: email ? email : sendOtpform.values.email, type: "change_email" });
            if (response) {
                setSteps(ENUMFORCHANGEEMAIL.Verify_OTP);
                sendOtpform.resetForm();
            }
        }

    }

    const handleReSendOtp = async () => {


        let response = await props?.sendOtpToEmail({ email: email });
        if (response) {
            setSteps(ENUMFORCHANGEEMAIL.Verify_OTP);

        }
    }

    const handleKeyPressSendOtp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            sendOtpform.handleSubmit();
        }
    };

    const sendOtpform = useFormik({
        initialValues: initevalueSendOtp,
        onSubmit: handleSendOtp,
        validationSchema: validationSchemaForSendOtp,
    });

    /* ------------------------------------verify otp------------------------------------------------------ */
    const [otp, setOtp] = useState<any>('');

    const handleVerifyOtp = async () => {
        let payload = { email, otp }

        let response = await props?.forgetPasswordVerifyOtp(payload);
        if (response) {
            userProfileFormData.values.email = email
            handleDeleteClose();
            setOtp(null);
            setemail("")
        }
    }





    const [userData, setUserData] = useState<UserProfileResponse>({} as UserProfileResponse);
    const [country, setCountry] = useState<Array<DropDownResponse>>([])
    const [city, setCity] = useState<Array<DropDownResponse>>([])
    const [state, setState] = useState<Array<DropDownResponse>>([])
    const [countryCode, setCountryCode] = useState<Array<DropDownResponse>>([])
    const userProfileImage = useRef(null) as any;
    const [profileUrl, setProfileUrl] = useState<any>();
    const [profileImg, setProfileImg] = useState<any>();
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<any>("");

    const handleGetUserProfileData = async () => {
        // let response = await props.getUserProfile();
        let response = null;
        // if (!isNullUndefinedOrBlank(response)) {
        //     setUserData(response.payload)
        // }
    }

    const handleUploadProfileImg = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (!isNullUndefinedOrBlank(file)) {

            // const fileSIzeInMb = +convertDecimalTwoPoint(file.size / (1024 ** 2));
            if (!checkFileSize(file.size, MAX_5)) {
                setShowError(true);
                setErrorMsg("File size can not be exceeded than 5 mb.");
                // setProfileUrl(null);
                userProfileImage.current.value = null;
                setProfileImg(null);
                return;
            }
            const url = URL.createObjectURL(file);

            const splitValue = file?.name.split(".");
            const ExteValue = (splitValue[splitValue.length - 1]).toLowerCase();
            const CheckExteValues = ["png", "jpeg", "jpg"];

            if (CheckExteValues.includes(ExteValue)) {
                setProfileUrl(url);
                setProfileImg(file);
                setShowError(false);
                setErrorMsg("");
            }
            else {
                userProfileImage.current.value = null;
                setShowError(true);
                setErrorMsg("Uploaded Image type is not Valid");
                setProfileUrl(null);
                setProfileImg(null);
                // te("Upload only Image");
            }
        }
        else {
            setShowError(false);
            setErrorMsg("");
        }
        // inputFile.value=file;

    };

    const handleremoveProfileImg = () => {
        userProfileImage.current.value = null;
        setShowError(false);
        setErrorMsg("");
        setProfileUrl(null);
        setProfileImg(null);
    }

    const initValues: UserProfileResponse = {
        first_name: "",
        last_name: "",
        email: "",
        mobile_no: "",
        city: null,
        country: null,
        state: null,
        zip_code: "",
        address: "",
        phone_code: "",
        url: ""

    }
    const onSubmit = (values) => {

    };
    const validationSchema = yup.object({
        first_name: yup.string().required("First Name is Required !!"),
        last_name: yup.string().required("Last Name is Required!!"),
        email: yup.string().email("Please Enter a valid Email. ").required("Email is Required!!"),
        mobile_no: yup
            .string()
            .trim()
            .min(7, "Please Enter a valid Mobile No.")
            // .matches(PATTERN_FOR_PHONE_NO, "Please Enter a valid Mobile No. ")
            .required("Mobile No Required!!"),
        country: yup.number(),
        state: yup.number(),
        city: yup.number(),
        phone_code: yup.string().required("Country Code is Required!!"),
        zip_code: yup.string()
    });

    const userProfileFormData = useFormik({
        initialValues: userData,
        onSubmit,
        validationSchema,
        enableReinitialize: true
    });

    const handlePersonalDetailsSubmit = async () => {
        userProfileFormData.handleSubmit();
        const userProfileErrors = await userProfileFormData.validateForm();
        // console.log(userProfileErrors);
        if (Object.keys(userProfileErrors).length > 0) {
            userProfileFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(userProfileErrors, true));

            return;
        }
        const reqBody = new FormData();
        let requestValue = { ...userProfileFormData.values };
        customJsonInclude(requestValue);

        if (isNullUndefinedOrBlank(profileUrl) && !isNullUndefinedOrBlank(props.userProfileData.data.url)) {
            requestValue = { ...requestValue, url: profileUrl }
        }


        reqBody.append("userDetail", JSON.stringify(requestValue));
        if (!isNullUndefinedOrBlank(profileImg)) {
            reqBody.append("profile_pic", profileImg);
        }
        const response = await props.updateProfileData(reqBody);

        if (!isEmptyObjectOrNullUndefiend(response)) {
            handleGetUserProfileData();
        }
    }

    //handle country code
    const getCountryCode = async () => {
        // let response = await props?.getCountryPhoneCodeAPI();
        let response = null;
     
    }

    //handle country 
    const getCountry = async () => {
        // let response = await props?.getCountryAPI();
        let response = null;
       
        
            // setCity([]);
      
    }

    //handle state
    const getState = async (id) => {
        if (!isNullUndefinedOrBlank(id)) {
            // let response = await props?.getStateAPI({ country_id: id });
            let response = null;
       
        }
    }
    //hanlde city
    const getCity = async (id) => {
        if (!isNullUndefinedOrBlank(id)) {
            // let response = await props?.getCityAPI({ state_id: id });
            let response = null;
        }
    }

    useEffect(() => {
        if (props.selectedTab === ENUMFORACCOUNTTAB.PERSONAL_DETAILS) {
            handleGetUserProfileData();
            setShowError(false);
            setErrorMsg("");
        }

    }, [props.selectedTab])


    useEffect(() => {

        if (!isEmptyObjectOrNullUndefiend(props.userProfileData)) {
            setUserData({ ...props.userProfileData.data });
            if (!isNullUndefinedOrBlank(props.userProfileData.data.url)) {
                setProfileUrl(props.userProfileData.data.url);
                localStorage.setItem("profile_Url", props.userProfileData.data.url);
            }
            else {
                setProfileUrl("");
                localStorage.removeItem("profile_Url");
            }
            if (!isNullUndefinedOrBlank(props.userProfileData.data.email)) {
                localStorage.setItem("email", props.userProfileData.data.email);
            }
            if (!isNullUndefinedOrBlank(props.userProfileData.data.mobile_no)) {
                localStorage.setItem("mobile_no", props.userProfileData.data.mobile_no);
            }
            if (!isNullUndefinedOrBlank(props.userProfileData.data.first_name) && !isNullUndefinedOrBlank(props.userProfileData.data.last_name)) {
                localStorage.setItem("name", props.userProfileData.data.first_name + ' ' + props.userProfileData.data.last_name);
            }
        }
        else {
            setUserData(initValues);
        }
    }, [props.userProfileData])

    useEffect(() => {
        if (!isNullUndefinedOrBlank(userProfileFormData.values.country)) {
            getState(userProfileFormData.values.country);
            // setCity([]);
        } else {
            setState([])
        }
    }, [userProfileFormData.values.country])

    useEffect(() => {
        if (!isNullUndefinedOrBlank(userProfileFormData.values.state)) {
            getCity(userProfileFormData.values.state)
        } else {
            setCity([])
        }
    }, [userProfileFormData.values.state])

    useEffect(() => {
        handleGetUserProfileData();
        getCountryCode();
        getCountry();
    }, [])

    useEffect(() => {
        if (props.selectedTab === ENUMFORACCOUNTTAB.PERSONAL_DETAILS) {
            handleGetUserProfileData();
            setShowError(false);
            setErrorMsg("");
        }

    }, [props.selectedTab])
    return (
        <>
            <div className="tab-title">
                <h3>Personal Info</h3>
                <p>Edit/Change your personal details here</p>
            </div>
            <div className="admin-user-profile">
                {
                    !isNullUndefinedOrBlank(profileUrl) ?
                        <div className='admin-user-profile-image'>
                            <img src={profileUrl} alt="pure charity" />
                        </div> : <div className="admin-user-profile-image">
                            <img src={defaultAvatar2} alt="pure charity" />
                        </div>

                }
                <div className="admin-user-profile-details">
                    <div className="admin-user-profile-name">
                        <h4>{(!isNullUndefinedOrBlank(props?.userProfileData?.data)) && `${props.userProfileData.data.first_name} ${props.userProfileData.data.last_name}`}</h4>

                    </div>
                    <div className="admin-user-profile-action">

                        <Button variant="white" size='sm' className='btn-icon-start btn-input'>
                            <i className='th-outline-export'></i>
                            <input type='file' accept="image/png, image/jpeg,image/jpg" ref={userProfileImage} onChange={(event) => { handleUploadProfileImg(event); }} /> Change</Button>
                        {(profileUrl) &&
                            <Button variant="white" size='sm' className='btn-icon-start' onClick={() => { handleremoveProfileImg() }}> <i className='th-outline-trash'></i> Delete</Button>
                        }
                    </div>
                    {showError ? renderError(errorMsg) : ""}
                </div>
            </div>

            <div className="tab-from">
                <Row>
                    <Col md={6}>
                        <Form.Group className="form-group">
                            <Form.Label>First Name*</Form.Label>
                            <div className="form-control-icon icon-start">
                                <i className='th-outline-user'></i>
                                <Form.Control type="text" placeholder="Clair"
                                    {...userProfileFormData.getFieldProps("first_name")}
                                    maxLength={MAX_50}
                                />
                            </div>
                            {userProfileFormData.touched.first_name &&
                                userProfileFormData.errors.first_name
                                ? renderError(userProfileFormData.errors.first_name)
                                : null}
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="form-group">
                            <Form.Label>Last Name*</Form.Label>
                            <div className="form-control-icon icon-start">
                                <i className='th-outline-user'></i>
                                <Form.Control type="text" placeholder="Wilson"
                                    {...userProfileFormData.getFieldProps("last_name")}
                                    maxLength={MAX_50}
                                />
                            </div>
                            {userProfileFormData.touched.last_name &&
                                userProfileFormData.errors.last_name
                                ? renderError(userProfileFormData.errors.last_name)
                                : null}
                        </Form.Group>
                    </Col>
                    <Col md={6}>

                        <Form.Group className="form-group phone-number-group" >
                            <Form.Label>Phone</Form.Label>

                            <InputGroup className="">
                                <div className="select-wrapper">
                                    <Select
                                        options={countryCode}
                                        onChange={(selectedOption) => {
                                            userProfileFormData.setFieldValue("phone_code", selectedOption?.value);
                                        }}
                                        placeholder={<div>Select country code </div>}
                                        isClearable={true}
                                        value={countryCode?.filter(({ value }) => {
                                            return (
                                                value ===
                                                userProfileFormData.values.phone_code
                                            );
                                        })}
                                        className="react-select-container"
                                    />
                                    {userProfileFormData.touched.phone_code &&
                                        userProfileFormData.errors.phone_code
                                        ? renderError(userProfileFormData.errors.phone_code)
                                        : null}
                                </div>
                                <div className="form-control-wrapper">
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-call-calling'></i>
                                        <Form.Control type="number" placeholder="Enter phone no"
                                            {...userProfileFormData.getFieldProps("mobile_no")}
                                            maxLength={MAX_15}
                                        />
                                        {userProfileFormData.touched.mobile_no &&
                                            userProfileFormData.errors.mobile_no
                                            ? renderError(userProfileFormData.errors.mobile_no)
                                            : null}
                                    </div>
                                </div>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="form-group">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <Form.Label className='mb-0'>Email</Form.Label>
                                <button className="btn-link" onClick={handleDeleteShow}>Change Email</button>
                            </div>
                            <div className="form-control-icon icon-start">
                                <i className='th-outline-user'></i>
                                <Form.Control type="email" placeholder="Enter email"
                                    {...userProfileFormData.getFieldProps("email")} maxLength={MAX_100} readOnly />
                            </div>
                            {userProfileFormData.touched.email &&
                                userProfileFormData.errors.email
                                ? renderError(userProfileFormData.errors.email)
                                : null}
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group className="form-group">
                            <Form.Label>Address line</Form.Label>
                            <Form.Control type="text" placeholder="Address line"
                                {...userProfileFormData.getFieldProps("address")}
                                maxLength={MAX_300}
                            />
                            {userProfileFormData.touched.address &&
                                userProfileFormData.errors.address
                                ? renderError(userProfileFormData.errors.address)
                                : null}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="form-group">
                            <Form.Label>Country</Form.Label>
                            <Select
                                options={country}
                                onChange={(selectedOption) => {
                                    userProfileFormData.setFieldValue("country", selectedOption?.value);
                                    setCity([])
                                    // getState(selectedOption?.value);
                                }}
                                placeholder={<div>Select country </div>}
                                isClearable={true}
                                value={country?.filter(({ value }) => {
                                    return (
                                        value ==
                                        userProfileFormData.values.country
                                    );
                                })}
                                className="react-select-container"
                            />
                            {userProfileFormData.touched.country &&
                                userProfileFormData.errors.country
                                ? renderError(userProfileFormData.errors.country)
                                : null}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="form-group">
                            <Form.Label>State</Form.Label>
                            <Select
                                options={state}
                                onChange={(selectedOption) => {
                                    userProfileFormData.setFieldValue("state", selectedOption?.value)
                                    // getCity(selectedOption?.value);
                                }}
                                placeholder={<div>Select state </div>}
                                isClearable={true}
                                value={state?.filter(({ value }) => {
                                    return (
                                        value ==
                                        userProfileFormData.values.state
                                    );
                                })}
                                className="react-select-container"
                            />
                            {userProfileFormData.touched.state &&
                                userProfileFormData.errors.state
                                ? renderError(userProfileFormData.errors.state)
                                : null}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="form-group">
                            <Form.Label>City</Form.Label>
                            <Select
                                options={city}
                                onChange={(selectedOption) => {
                                    userProfileFormData.setFieldValue("city", selectedOption?.value)
                                }}
                                placeholder={<div>Select city </div>}
                                isClearable={true}
                                value={city?.filter(({ value }) => {
                                    return (
                                        value ==
                                        userProfileFormData.values.city
                                    );
                                })}
                                className="react-select-container"
                            />
                            {userProfileFormData.touched.city &&
                                userProfileFormData.errors.city
                                ? renderError(userProfileFormData.errors.city)
                                : null}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="form-group">
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control type="number" {...userProfileFormData.getFieldProps("zip_code")} maxLength={MAX_10} />
                        </Form.Group>
                        {userProfileFormData.touched.zip_code &&
                            userProfileFormData.errors.zip_code
                            ? renderError(userProfileFormData.errors.zip_code)
                            : null}
                    </Col>
                </Row>
                <div className="button-group">
                    <Button variant='primary' onClick={() => { handlePersonalDetailsSubmit() }}>Update</Button>
                    <Button variant='white' onClick={() => { navigate(ENUMFORROUTES.DASHBOARD) }}>Cancel</Button>
                </div>
            </div>

            <Modal show={show} onHide={handleDeleteClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Change Email</Modal.Title>
                    <Button variant="close" onClick={handleDeleteClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="popup-icon-wrapper">
                        <div className="popup-icon suqare-icon icon-outline-white">
                            <i className='th-outline-sms'></i>
                        </div>

                        {/* Note : Need to chnage title and button text as per figma */}
                        {(steps === ENUMFORCHANGEEMAIL.SEND_OTP) && (

                            <Form.Group className="form-group">
                                <Form.Label>Enter New Email</Form.Label>
                                <div className="form-control-icon icon-start">
                                    <i className='th-outline-user'></i>
                                    <Form.Control type="email" placeholder="Enter email"  {...sendOtpform.getFieldProps("email")} onKeyDown={(event) => handleKeyPressSendOtp(event)} />
                                </div>
                                {sendOtpform.touched.email &&
                                    sendOtpform.errors.email
                                    ? renderError(sendOtpform.errors.email)
                                    : null}
                            </Form.Group>
                        )}

                        {(steps === ENUMFORCHANGEEMAIL.Verify_OTP) && (
                            <div className="change-email-otp">
                                <div className="form-group otp-group">
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        renderInput={(props) => <input {...props} className="form-control" placeholder="-" />}
                                        inputType="number"
                                        // autoFocus={true}  
                                        numInputs={6}
                                    // renderSeparator={<span>-</span>}

                                    />
                                </div>

                                <div className="auth-form-text">
                                    <p>Didn’t receive the email? <NavLink to="" className="" onClick={() => { handleReSendOtp() }}>Click to resend</NavLink> </p>
                                </div>
                            </div>

                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    {(steps === ENUMFORCHANGEEMAIL.Verify_OTP) && (
                        <Button variant="white" onClick={() => { setSteps(ENUMFORCHANGEEMAIL.SEND_OTP) }}> <i className='th-outline-arrow-left-2'></i> Back</Button>
                    )}
                    <Button variant="primary" onClick={() => { steps === ENUMFORCHANGEEMAIL.SEND_OTP ? sendOtpform.handleSubmit() : handleVerifyOtp() }}>Continue <i className='th-outline-arrow-right-3'></i></Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
const mapStateToProps = (state) => ({
    userProfileData: state.SettingsReducer.getUserProfile
})

const mapDispatchToProps = {
    getUserProfile,
    getCountryAPI,
    getStateAPI,
    getCityAPI,
    getCountryPhoneCodeAPI,
    updateProfileData,
    sendOtpToEmail,
    forgetPasswordVerifyOtp
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)