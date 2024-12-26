import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import AuthLeftCard from '../../../components/AuthLeftCard/AuthLeftCard';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import google from '../../../assets/images/google-logo.svg'
import authLogo from "../../../assets/images/donor-auth-logo.svg";
import yourDeatails from "../../../assets/images/your-deatails.png";
import paymentDetails from "../../../assets/images/payment-details.png";
import confirmation from "../../../assets/images/confirmation.png";
import card from "../../../assets/images/card.svg";
import paypal from "../../../assets/images/paypal.svg";
import stripe from "../../../assets/images/stripe.svg";
import thankyou from "../../../assets/images/thankyou.svg";
import { MAX_10, MAX_15, MAX_16, MAX_3, MAX_30, MAX_300, MAX_32, MAX_5, MAX_50, PASSWORD_INVALID, PATTERN_EMAIL, PATTERN_FOR_PASSWORD_NEW } from '../../../Utility/Validation_Helper';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { SignUpApi, sendOtpToEmailForRegistration } from '../../../redux/Service/signup';
import { isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper';
import { sendOtpToEmail, forgetPasswordVerifyOtp } from '../../../redux/Service/forgotPassword';
import { DropdownListFormat, ENUMFORROUTES, ENUM_FOR_DONOR_TYPE, ENUM_FOR_SIGNUP_STEPS, User } from '../../../interfaces/interface';
import OTPInput from 'react-otp-input';
import Select from "react-select";
import { getCountryAPI, getCityAPI, getStateAPI, getCountryPhoneCodeAPI } from '../../../redux/Service/generic';
import { defaultReduxSuccess } from '../../../redux/generic/generic.action';
import { loading } from '../../../redux/Loader/loader.action';

export const SignUp = (props) => {
    const [eyeToggle, setEyeToggle] = useState<boolean>(false);
    const [step, setStep] = useState<string>(ENUM_FOR_SIGNUP_STEPS.EMAIL_PASSWORD);
    const [otp, setOtp] = useState<string>('');
    const [countryDropDownData, setCountryDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [stateDropDownData, setStateDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [cityDropDownData, setCityDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [countryPhoneCodeDropDownData, setCountryPhoneCodeDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [registrationResponse, setRegistrationResponse] = useState<User>({} as User);

    const navigate = useNavigate();

    var settings = {
        dots: true,
        arrows: false,
        infinite: false
    };

    const initSignupValues = {
        email: '',
        password: '',
        donor_type: ENUM_FOR_DONOR_TYPE.INDIVIDUAL,
        organization_name: '',
        first_name: '',
        last_name: '',
        phone_code: '',
        mobile_no: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zip_code: '',
        receiveNewsAndUpdates: "true",
    };

    /**
     * Validation schema for login data based on the selected tab.
     */
    const validationSchemaForSignUpData = yup.object({
        email: yup.string().trim().matches(PATTERN_EMAIL, "Please Enter a valid Email.").required("Email is required !!"),
        password: yup.string().trim().required("Password is required !!").trim()
            .matches(PATTERN_FOR_PASSWORD_NEW, PASSWORD_INVALID),
        donor_type: yup.string(),
        first_name: yup.string().required("First Name is Required !!"),
        last_name: yup.string().required("Last Name is Required!!"),
        phone_code: yup
            .string()
            .required("Country Code Is Required!!"),
        mobile_no: yup
            .string()
            .trim()
            .min(7, "Please Enter a valid Phone No.")
            // .matches(PATTERN_FOR_PHONE_NO, "Please Enter a valid Mobile No. ")
            .required("Phone No Required!!"),
        organization_name: yup.string()
            .when('donor_type', ([donor_type]) => {
                return donor_type === ENUM_FOR_DONOR_TYPE.ORGANIZATION ? yup.string().required("Organization Name is Required!!") : yup.string()
            }),
        receiveNewsAndUpdates: yup.string()
    })

    const handleSubmitSignUpData = async (values, formikHelpers) => {
        const payload: any = signUpFormData.values;
        payload.payment_details = values;

        const formData = new FormData();
        formData.set('registrationDetail', JSON.stringify(payload));
        const response = await props?.SignUpApi(formData);
        // console.log(response);

        if (response) {
            setStep(ENUM_FOR_SIGNUP_STEPS.THANK_YOU);
            setRegistrationResponse(response.payload.data)
        }

    }


    const redirectTo = (route) => {
        localStorage.setItem("email", registrationResponse.email);
        localStorage.setItem("token", registrationResponse.token);
        localStorage.setItem("name", registrationResponse.first_name + " " + registrationResponse.last_name);
        localStorage.setItem("mobile_no", registrationResponse.mobile_no);
        localStorage.setItem("userId", registrationResponse.id);
        localStorage.setItem("profile_Url", registrationResponse.profile_pic_url);

        props.loading(true);
        navigate(route);
        setTimeout(() => {
            props.loading(false);
        }, 250);

    }

    const handleNext = (values, formikHelpers) => {
        console.log(values);
        setStep(ENUM_FOR_SIGNUP_STEPS.PAYMENT_DETAILS);
    }

    /**
         * Formik hook for managing login form data.
         */
    const signUpFormData = useFormik({
        initialValues: initSignupValues,
        validationSchema: validationSchemaForSignUpData,
        onSubmit: handleNext,
    });

    const handleKeyPress = (event) => {

        if (event.keyCode === 13) {
            event.preventDefault();
            signUpFormData.handleSubmit();

        }

    };

    const handleSendOtpToEmail = async () => {

        signUpFormData.setFieldTouched('email', true);
        signUpFormData.setFieldTouched('password', true);
        if (!isNullUndefinedOrBlank(signUpFormData?.errors?.email) || !isNullUndefinedOrBlank(signUpFormData?.errors?.password)) {
            return;
        }

        let response = await props?.sendOtpToEmailForRegistration({ email: signUpFormData?.values?.email });
        if (response) {
            setOtp('');
            setStep(ENUM_FOR_SIGNUP_STEPS.VERIFY_OTP);
        }
    }

    const handleReSendOtp = async () => {


        let response = await props?.sendOtpToEmailForRegistration({ email: signUpFormData?.values?.email });
        if (response) {
            setOtp('');
            setStep(ENUM_FOR_SIGNUP_STEPS.VERIFY_OTP);

        }
    }

    const handleVerifyOtp = async () => {
        let payload = { email: signUpFormData?.values?.email, otp }

        let response = await props?.forgetPasswordVerifyOtp(payload);
        const tempobj = signUpFormData?.values;
        if (response) {
            signUpFormData.resetForm();
            setTimeout(() => {
                signUpFormData.setFieldValue('email', tempobj.email);
                signUpFormData.setFieldValue('password', tempobj.password);
            }, 150);
            setStep(ENUM_FOR_SIGNUP_STEPS.YOUR_DETAILS);
        }
    }


    const handleBlurValueUpdate = (formData, key) => {
        formData.setFieldValue(key, formData.values[key].trim());
        setTimeout(() => {

            formData.setFieldTouched(key, true);
        }, 100);

    }

    /**
* Validation schema for payment Details data based on the selected tab.
*/
    const validationSchemaForPaymentDetails = yup.object({
        payment_type: yup
            .string()
            .required("Country Code Is Required!!"),
        holder_name: yup
            .string()
            .required("Holder Name Is Required!!"),
        number: yup
            .string()
            .required("Card Number Is Required!!"),
        expiry: yup
            .string()
            .required("Expiry Is Required!!")
    })

    const initPaymentValues = {
        payment_type: "Credit Card",
        holder_name: "",
        number: "",
        expiry: ""
    };

    /**
      * Formik hook for managing login form data.
      */
    const paymentDetailsForm = useFormik({
        initialValues: initPaymentValues,
        validationSchema: validationSchemaForPaymentDetails,
        onSubmit: handleSubmitSignUpData,
    });


    const handleGetStateData = async (CountryId) => {
        const reqBody = {
            country_id: CountryId
        }
        const response = await props.getStateAPI(reqBody);
        if (response) {
            setStateDropDownData(response.payload);
        }
    }

    const handleGetCityData = async (StateId) => {
        const reqBody = {
            state_id: StateId
        }
        const response = await props.getCityAPI(reqBody);
        if (response) {
            setCityDropDownData(response.payload);
        }
    }

    useEffect(() => {
        props.getCountryAPI();
        props.getCountryPhoneCodeAPI();

    }, []);
    useEffect(() => {

        console.log(props.countryData);
        if (!isEmptyObjectOrNullUndefiend(props.countryData)) {

            setCountryDropDownData(props.countryData);
        }
        else {
            setCountryDropDownData([]);
        }
    }, [props.countryData]);
    useEffect(() => {
        if (!isEmptyObjectOrNullUndefiend(props.countryPhoneCodeData)) {
            setCountryPhoneCodeDropDownData(props.countryPhoneCodeData);
        }
        else {
            setCountryPhoneCodeDropDownData([]);
        }
    }, [props.countryPhoneCodeData]);

    useEffect(() => {
        if (!isNullUndefinedOrBlank(signUpFormData.values.country)) {

            handleGetStateData(signUpFormData.values.country);
        }

    }, [signUpFormData.values.country])
    useEffect(() => {
        if (!isNullUndefinedOrBlank(signUpFormData.values.state)) {

            handleGetCityData(signUpFormData.values.state);
        }

    }, [signUpFormData.values.state])

    return (
        <>
            {/* signup form */}

            {/* note : 
            after signup need to add class on donor-auth-wrapper "your-details" for all the step,
            for step 2 color need to add class "payment-details" ,
            for step 3 color need to add class "confirmation-details" */}

            <div className={`donor-auth-wrapper 
            ${(step === ENUM_FOR_SIGNUP_STEPS.YOUR_DETAILS ||
                    step === ENUM_FOR_SIGNUP_STEPS.PAYMENT_DETAILS ||
                    step === ENUM_FOR_SIGNUP_STEPS.THANK_YOU) && 'your-details'
                } `}>
                <div className="donor-auth-inner-wrapper">
                    {(() => {
                        switch (step) {
                            case ENUM_FOR_SIGNUP_STEPS.EMAIL_PASSWORD:
                                return (
                                    <div className="donor-auth-row">

                                        <AuthLeftCard />
                                        <div className="donor-auth-col donor-auth-right">
                                            <div className="admin-auth-from">


                                                <div className='admin-auth-card'>
                                                    <div className="admin-auth-icon">
                                                        <i className='th-outline-frame-1'></i>
                                                    </div>
                                                    <div className="admin-auth-card-title">
                                                        <h2>Welcome to Infinite</h2>
                                                        <p>Your little help make big impact ❤️</p>
                                                    </div>
                                                    <div className="other-login">
                                                        <Button variant='white' className='btn-icon-start'> <img src={google} alt="google" />  Continue with Google</Button>
                                                        <div className="or">
                                                            <p>OR</p>
                                                        </div>
                                                    </div>
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Email*</Form.Label>
                                                        <div className="form-control-icon icon-start">
                                                            <i className='th-outline-user'></i>
                                                            <Form.Control type="email" placeholder="Enter email"
                                                                {...signUpFormData.getFieldProps("email")}
                                                                onKeyDown={(event) => { handleKeyPress(event) }}
                                                                onBlur={() => {
                                                                    handleBlurValueUpdate(signUpFormData, "email");
                                                                }}
                                                                maxLength={MAX_50}
                                                            />
                                                        </div>
                                                        {signUpFormData.touched.email &&
                                                            signUpFormData.errors.email
                                                            ? renderError(signUpFormData.errors?.email)
                                                            : null}
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Password*</Form.Label>
                                                        <div className="form-control-icon  form-control-password icon-start">

                                                            <i className='th-outline-lock'></i>
                                                            <Form.Control type={eyeToggle ? "text" : "password"} placeholder="Enter your password"
                                                                {...signUpFormData.getFieldProps("password")}
                                                                onKeyDown={(event) => { handleKeyPress(event) }}
                                                                maxLength={MAX_32}
                                                            />
                                                            <button
                                                                className=" btn-password"
                                                                onClick={() => setEyeToggle(!eyeToggle)}
                                                            >
                                                                <i className={`${eyeToggle ? 'th-outline-eye' : 'th-outline-eye-slash'}`} ></i>
                                                            </button>
                                                        </div>
                                                        {signUpFormData.touched.password &&
                                                            signUpFormData.errors.password
                                                            ? renderError(signUpFormData.errors?.password)
                                                            : null}
                                                    </Form.Group>

                                                    <div className="btn-full-group">
                                                        <Button variant='primary' onClick={() => { handleSendOtpToEmail() }}>Continue</Button>
                                                        <div className="auth-form-text">
                                                            <p>
                                                                Already have a Donor?
                                                                <NavLink className="btn-link btn-icon-start back-login justify-content-center" to="/login">Login</NavLink>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            case ENUM_FOR_SIGNUP_STEPS.VERIFY_OTP:
                                return (
                                    <div className="donor-auth-row">

                                        <AuthLeftCard />
                                        <div className="donor-auth-col donor-auth-right">
                                            <div className="admin-auth-from">
                                                <div className='admin-auth-card'>
                                                    <div className="admin-auth-icon">
                                                        <i className='th-outline-sms'></i>
                                                    </div>
                                                    <div className="admin-auth-card-title">
                                                        <h2>Check Your Email</h2>
                                                        <p>We sent a verification Code to <br /> <span>{signUpFormData?.values?.email}</span> </p>
                                                    </div>

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
                                                        <p>Didn’t receive the email? <NavLink to="" onClick={handleReSendOtp} className="">Click to resend</NavLink> </p>
                                                    </div>



                                                    <div className="btn-full-group">
                                                        <Button variant='primary' disabled={isNullUndefinedOrBlank(signUpFormData?.values?.email) || otp?.length !== 6} onClick={() => { handleVerifyOtp() }} >Verify Email</Button>
                                                        <NavLink className="btn-link-two btn-icon-start back-login" to="/login"> <i className='th-outline-arrow-left'></i> Back to Login</NavLink>
                                                    </div>
                                                    {/* </Form> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            case ENUM_FOR_SIGNUP_STEPS.YOUR_DETAILS:
                                return (
                                    <div className="donor-auth-row">

                                        <div className="donor-auth-col donor-auth-left">
                                            <div className="donor-auth-testimonials">
                                                <div className="donor-auth-logo">
                                                    <img src={authLogo} alt="authLogo" />
                                                </div>
                                                <div className="donor-auth-side-image">
                                                    <img src={yourDeatails} alt="yourDeatails" />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="donor-auth-col donor-auth-right">
                                            <div className="donor-details-from">
                                                <div className="details-form">
                                                    <div className="details-form-title donor-details-from-width">
                                                        <div className="details-stepper">
                                                            <ul>
                                                                <li className='active'>
                                                                    <div className="stapper-indiacator"></div>
                                                                    <p>Your Details</p>
                                                                </li>
                                                                <li>
                                                                    <div className="stapper-indiacator"></div>
                                                                    <p>Payment Details</p>
                                                                </li>
                                                                <li>
                                                                    <div className="stapper-indiacator"></div>
                                                                    <p>Confirmation</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <h2>Your Details</h2>
                                                        <p>Choose donation you want to do</p>
                                                    </div>
                                                    <div className="details-form-data donor-details-from-width">
                                                        <div className="details-form-data-inner-wrapper">

                                                            <Form.Group className="form-group" >

                                                                <div className='radio-group'>
                                                                    <Form.Check type="radio" name="donor_type" aria-label="radio 1" id="Individual" label="Individual" value={ENUM_FOR_DONOR_TYPE.INDIVIDUAL} checked={signUpFormData.values.donor_type === ENUM_FOR_DONOR_TYPE.INDIVIDUAL} onChange={() => { signUpFormData.setFieldValue("donor_type", ENUM_FOR_DONOR_TYPE.INDIVIDUAL); signUpFormData.setFieldValue("organization_name", ""); }} />
                                                                    <Form.Check type="radio" name="donor_type" aria-label="radio 2" id="Organization" label="Organisation" value={ENUM_FOR_DONOR_TYPE.ORGANIZATION} checked={signUpFormData.values.donor_type === ENUM_FOR_DONOR_TYPE.ORGANIZATION} onChange={() => { signUpFormData.setFieldValue("donor_type", ENUM_FOR_DONOR_TYPE.ORGANIZATION); signUpFormData.setFieldValue("organization_name", ""); }} />
                                                                </div>
                                                            </Form.Group>
                                                            {signUpFormData.values.donor_type === ENUM_FOR_DONOR_TYPE.ORGANIZATION ?

                                                                <Form.Group className="form-group" >
                                                                    <Form.Label>Organisation Name*</Form.Label>
                                                                    <div className="form-control-icon icon-start">
                                                                        <i className='th-outline-buildings'></i>
                                                                        <Form.Control type="text" placeholder="Enter organisation name"  {...signUpFormData.getFieldProps("organization_name")} onBlur={() => {
                                                                            handleBlurValueUpdate(signUpFormData, "organization_name");
                                                                        }} maxLength={MAX_30} />
                                                                    </div>
                                                                    {signUpFormData.touched.organization_name &&
                                                                        signUpFormData.errors.organization_name
                                                                        ? renderError(signUpFormData.errors.organization_name)
                                                                        : null}
                                                                </Form.Group>
                                                                : <></>}
                                                            <Row>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group" >
                                                                        <Form.Label>First Name*</Form.Label>
                                                                        <div className="form-control-icon icon-start">
                                                                            <i className='th-outline-user'></i>
                                                                            <Form.Control type="text" placeholder="Enter first name"   {...signUpFormData.getFieldProps("first_name")} onBlur={() => {
                                                                                handleBlurValueUpdate(signUpFormData, "first_name");
                                                                            }} maxLength={MAX_30} />
                                                                        </div>
                                                                        {signUpFormData.touched.first_name &&
                                                                            signUpFormData.errors.first_name
                                                                            ? renderError(signUpFormData.errors.first_name)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group" >
                                                                        <Form.Label>Last Name*</Form.Label>
                                                                        <div className="form-control-icon icon-start">
                                                                            <i className='th-outline-user'></i>
                                                                            <Form.Control type="text" placeholder="Enter last name" {...signUpFormData.getFieldProps("last_name")} onBlur={() => {
                                                                                handleBlurValueUpdate(signUpFormData, "last_name");
                                                                            }} maxLength={MAX_30} />
                                                                        </div>
                                                                        {signUpFormData.touched.last_name &&
                                                                            signUpFormData.errors.last_name
                                                                            ? renderError(signUpFormData.errors.last_name)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group phone-number-group" >
                                                                        <Form.Label>Phone*</Form.Label>

                                                                        <InputGroup className="">
                                                                            <div className="select-wrapper">
                                                                                <Select
                                                                                    options={countryPhoneCodeDropDownData}
                                                                                    placeholder={<div>Coutry code*</div>}
                                                                                    onChange={(selectedOption) => { signUpFormData.setFieldValue("phone_code", selectedOption?.value); }}
                                                                                    value={countryPhoneCodeDropDownData?.filter(({ value }) => {
                                                                                        return (
                                                                                            value ===
                                                                                            signUpFormData.values.phone_code
                                                                                        );
                                                                                    })}
                                                                                    onBlur={() => {
                                                                                        signUpFormData.setFieldTouched("phone_code", true)
                                                                                    }}
                                                                                    isClearable
                                                                                    menuPosition="fixed"
                                                                                    className="react-select-container"
                                                                                    styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) }}
                                                                                />
                                                                                {signUpFormData.touched.phone_code &&
                                                                                    signUpFormData.errors.phone_code
                                                                                    ? renderError(signUpFormData.errors.phone_code)
                                                                                    : null}
                                                                            </div>
                                                                            <div className="form-control-wrapper">
                                                                                <div className="form-control-icon icon-start">
                                                                                    <i className='th-outline-call-calling'></i>
                                                                                    <Form.Control type="text" placeholder="Enter phone no" {...signUpFormData.getFieldProps("mobile_no")} maxLength={MAX_15} />
                                                                                </div>
                                                                                {signUpFormData.touched.mobile_no &&
                                                                                    signUpFormData.errors.mobile_no
                                                                                    ? renderError(signUpFormData.errors.mobile_no)
                                                                                    : null}
                                                                            </div>
                                                                        </InputGroup>
                                                                    </Form.Group>

                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group" >
                                                                        <Form.Label>Email*</Form.Label>
                                                                        <div className="form-control-icon icon-start">
                                                                            <i className='th-outline-sms'></i>
                                                                            <Form.Control type="email" placeholder="Enter email" {...signUpFormData.getFieldProps("email")} maxLength={MAX_50} disabled />
                                                                        </div>
                                                                        {signUpFormData.touched.email &&
                                                                            signUpFormData.errors.email
                                                                            ? renderError(signUpFormData.errors.email)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Form.Group className="form-group" >
                                                                <Form.Label>Address line</Form.Label>
                                                                <Form.Control type="text" placeholder="Address line" {...signUpFormData.getFieldProps("address")} onBlur={() => {
                                                                    handleBlurValueUpdate(signUpFormData, "organization_name");
                                                                }} maxLength={MAX_300} />
                                                            </Form.Group>

                                                            <Row>
                                                                <Col md={3}>
                                                                    <Form.Group className="form-group" >
                                                                        <Form.Label>Country</Form.Label>
                                                                        <Select
                                                                            options={countryDropDownData}
                                                                            onChange={(selectedOption) => {
                                                                                signUpFormData.setFieldValue("country", selectedOption?.value);
                                                                                signUpFormData.setFieldValue("state", "");
                                                                                signUpFormData.setFieldValue("city", "");
                                                                                setStateDropDownData([]);

                                                                            }}
                                                                            placeholder={<div>Select country </div>}
                                                                            isClearable={true}
                                                                            value={countryDropDownData?.filter(({ value }) => {
                                                                                return (
                                                                                    value ===
                                                                                    signUpFormData.values.country
                                                                                );
                                                                            })}
                                                                            className="react-select-container"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <Form.Group className="form-group" >
                                                                        <Form.Label>State</Form.Label>
                                                                        <Select
                                                                            options={stateDropDownData}
                                                                            onChange={(selectedOption) => {
                                                                                // signUpFormData.setFieldValue("country", selectedOption?.value);
                                                                                signUpFormData.setFieldValue("state", selectedOption?.value);
                                                                                signUpFormData.setFieldValue("city", "");
                                                                                setCityDropDownData([]);
                                                                            }}
                                                                            placeholder={<div>Select state </div>}
                                                                            isClearable={true}
                                                                            value={stateDropDownData?.filter(({ value }) => {
                                                                                return (
                                                                                    value ===
                                                                                    signUpFormData.values.state
                                                                                );
                                                                            })}
                                                                            className="react-select-container"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <Form.Group className="form-group" >
                                                                        <Form.Label>City</Form.Label>
                                                                        <Select
                                                                            options={cityDropDownData}
                                                                            onChange={(selectedOption) => {
                                                                                // signUpFormData.setFieldValue("country", selectedOption?.value);
                                                                                // signUpFormData.setFieldValue("state", selectedOption?.value);
                                                                                signUpFormData.setFieldValue("city", selectedOption?.value);
                                                                            }}
                                                                            placeholder={<div>Select city </div>}
                                                                            isClearable={true}
                                                                            value={cityDropDownData?.filter(({ value }) => {
                                                                                return (
                                                                                    value ===
                                                                                    signUpFormData.values.city
                                                                                );
                                                                            })}
                                                                            className="react-select-container"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <Form.Group className="form-group" >
                                                                        <Form.Label>Zipcode</Form.Label>
                                                                        <Form.Control type="text" placeholder="Zipcode"   {...signUpFormData.getFieldProps("zip_code")}
                                                                            onBlur={() => {
                                                                                handleBlurValueUpdate(signUpFormData, "zip_code");
                                                                            }}
                                                                            maxLength={MAX_10} />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>

                                                            <Form.Group className="form-group" >
                                                                <Form.Label>ld like to receive news & updates</Form.Label>
                                                                <div className='radio-group'>
                                                                    <Form.Check type="radio" id="new-yes" label="Yes"  {...signUpFormData.getFieldProps("receiveNewsAndUpdates")} value={true as any} checked={signUpFormData.values.receiveNewsAndUpdates == "true"} />
                                                                    <Form.Check type="radio" id="new-no" label="No" {...signUpFormData.getFieldProps("receiveNewsAndUpdates")} value={false as any} checked={signUpFormData.values.receiveNewsAndUpdates == "false"} />
                                                                </div>
                                                            </Form.Group>
                                                        </div>

                                                    </div>
                                                    <div className="details-form-footer donor-details-from-width">
                                                        <Button variant='white' className='btn-icon-start' onClick={() => { setStep(ENUM_FOR_SIGNUP_STEPS.EMAIL_PASSWORD) }}><i className='th-outline-arrow-left-2' ></i> Back</Button>
                                                        <Button variant='primary' className='btn-icon-Continue' onClick={() => { signUpFormData.handleSubmit(); }}>Continue <i className='th-outline-arrow-right-3'></i></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                );
                            case ENUM_FOR_SIGNUP_STEPS.PAYMENT_DETAILS:
                                return (
                                    <div className="donor-auth-row">

                                        <div className="donor-auth-col donor-auth-left">
                                            <div className="donor-auth-testimonials">
                                                <div className="donor-auth-logo">
                                                    <img src={authLogo} alt="authLogo" />
                                                </div>
                                                <div className="donor-auth-side-image">
                                                    <img src={paymentDetails} alt="yourDeatails" />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="donor-auth-col donor-auth-right">
                                            <div className="donor-details-from">
                                                <div className="details-form">
                                                    <div className="details-form-title donor-details-from-width">
                                                        <div className="details-stepper">
                                                            <ul>
                                                                <li className=''>
                                                                    <div className="stapper-indiacator"></div>
                                                                    <p>Your Details</p>
                                                                </li>
                                                                <li className='active'>
                                                                    <div className="stapper-indiacator"></div>
                                                                    <p>Payment Details</p>
                                                                </li>
                                                                <li>
                                                                    <div className="stapper-indiacator"></div>
                                                                    <p>Confirmation</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <h2>Payment Details</h2>
                                                        <p>Choose donation you want to do</p>
                                                    </div>
                                                    <div className="details-form-data donor-details-from-width">
                                                        <div className="details-form-data-inner-wrapper">
                                                            <div className="normal-tab">

                                                                <ul className="nav nav-pills " id="pills-tab" role="tablist">
                                                                    <li className="nav-item" role="presentation">
                                                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"> <img src={card} alt="card" /> Credit Card</button>
                                                                    </li>
                                                                    <li className="nav-item" role="presentation">
                                                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><img src={paypal} alt="paypal" />PayPal</button>
                                                                    </li>
                                                                    <li className="nav-item" role="presentation">
                                                                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"><img src={stripe} alt="stripe" />Stripe</button>
                                                                    </li>
                                                                </ul>
                                                                <div className="tab-content" id="pills-tabContent">
                                                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                                        <div className="tab-data">
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label>Name on Card*</Form.Label>
                                                                                <div className="form-control-icon icon-start">
                                                                                    <i className='th-outline-user'></i>
                                                                                    <Form.Control type="text" placeholder="Enter name"  {...paymentDetailsForm.getFieldProps("holder_name")} onBlur={() => {
                                                                                        handleBlurValueUpdate(paymentDetailsForm, "holder_name");
                                                                                    }} maxLength={MAX_30} />
                                                                                </div>
                                                                                {paymentDetailsForm.touched.holder_name &&
                                                                                    paymentDetailsForm.errors.holder_name
                                                                                    ? renderError(paymentDetailsForm.errors?.holder_name)
                                                                                    : null}


                                                                            </Form.Group>
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label>Card Number*</Form.Label>
                                                                                <div className="form-control-icon icon-start">
                                                                                    <i className='th-outline-card'></i>
                                                                                    <Form.Control type="text" placeholder="Enter card no" {...paymentDetailsForm.getFieldProps("number")} onBlur={() => {
                                                                                        handleBlurValueUpdate(paymentDetailsForm, "number");
                                                                                    }} maxLength={MAX_16} />
                                                                                </div>
                                                                                {paymentDetailsForm.touched.number &&
                                                                                    paymentDetailsForm.errors.number
                                                                                    ? renderError(paymentDetailsForm.errors?.number)
                                                                                    : null}
                                                                            </Form.Group>
                                                                            <Row>
                                                                                <Col md={8}>
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label>Expiry*</Form.Label>
                                                                                        <Form.Control type="text" placeholder="MM/YY" {...paymentDetailsForm.getFieldProps("expiry")} onBlur={() => {
                                                                                            handleBlurValueUpdate(paymentDetailsForm, "expiry");
                                                                                        }} maxLength={MAX_5} />
                                                                                    </Form.Group>
                                                                                    {paymentDetailsForm.touched.expiry &&
                                                                                        paymentDetailsForm.errors.expiry
                                                                                        ? renderError(paymentDetailsForm.errors?.expiry)
                                                                                        : null}
                                                                                </Col>
                                                                                <Col md={4}>
                                                                                    <Form.Group className="form-group">
                                                                                        <Form.Label>CVV</Form.Label>
                                                                                        <Form.Control type="text" placeholder="" maxLength={MAX_3} />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            </Row>
                                                                            <Form.Group className="" >
                                                                                <Form.Check type="checkbox" label="i Agree to save my Card Details for future donation" />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                                        <div className="tab-data">
                                                                            <div className="payment-info">
                                                                                <div className="payment-icon">
                                                                                    <img src={paypal} alt="paypal" />
                                                                                </div>
                                                                                <div className="payment-text">
                                                                                    <h3>PayPal</h3>
                                                                                    <p>This is detail description about hoe paypal work! It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960.</p>
                                                                                    <Button variant='primary' className='btn-icon-end'>Connect PayPal <i className='th-outline-arrow-right-3'></i></Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                                                        <div className="tab-data">
                                                                            <div className="payment-info">
                                                                                <div className="payment-icon">
                                                                                    <img src={stripe} alt="paypal" />
                                                                                </div>
                                                                                <div className="payment-text">
                                                                                    <h3>PayPal</h3>
                                                                                    <p>This is detail description about hoe paypal work! It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960.</p>
                                                                                    <Button variant='primary' className='btn-icon-end'>Connect Stripe <i className='th-outline-arrow-right-3'></i></Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="details-form-footer donor-details-from-width">
                                                        <Button variant='white' className='btn-icon-start' onClick={() => { setStep(ENUM_FOR_SIGNUP_STEPS.YOUR_DETAILS) }}><i className='th-outline-arrow-left-2'></i> Back</Button>
                                                        <Button variant='primary' className='btn-icon-Continue' onClick={() => { paymentDetailsForm.handleSubmit() }}>Continue <i className='th-outline-arrow-right-3'></i></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            case ENUM_FOR_SIGNUP_STEPS.THANK_YOU:
                                return (
                                    <div className="donor-auth-row">

                                        <div className="donor-auth-col donor-auth-left">
                                            <div className="donor-auth-testimonials">
                                                <div className="donor-auth-logo">
                                                    <img src={authLogo} alt="authLogo" />
                                                </div>
                                                <div className="donor-auth-side-image">
                                                    <img src={confirmation} alt="yourDeatails" />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="donor-auth-col donor-auth-right">

                                            <div className="donor-details-from">
                                                <div className="details-form">
                                                    <div className="details-form-title donor-details-from-width">
                                                        <div className="details-stepper">
                                                            <ul>
                                                                <li className=''>
                                                                    <div className="stapper-indiacator"></div>
                                                                    <p>Your Details</p>
                                                                </li>
                                                                <li className=''>
                                                                    <div className="stapper-indiacator"></div>
                                                                    <p>Payment Details</p>
                                                                </li>
                                                                <li className='active'>
                                                                    <div className="stapper-indiacator"></div>
                                                                    <p>Confirmation</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="details-form-data donor-details-from-width">
                                                        <div className="details-form-data-inner-wrapper">


                                                            <div className="thankyou">
                                                                <img src={thankyou} alt="thankyou" />
                                                                <div className="thankyou-text">
                                                                    <h2>Thank You!</h2>
                                                                    <p>For choosing us for donation you want to <br /> do nothing to say here.</p>
                                                                </div>
                                                                <div className="button-group">
                                                                    <Button variant='white'>Explore Charity</Button>
                                                                    <Button variant='primary' className='btn-icon-end' onClick={() => { redirectTo(ENUMFORROUTES.DASHBOARD) }}>Go to Dashboard <i className='th-outline-arrow-right-3'></i></Button>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                        }
                    })()}

                </div>
            </div >

        </>
    )
}

const mapStateToProps = (state) => ({
    countryData: state.genericReducer.countryData,
    countryPhoneCodeData: state.genericReducer.countryPhoneCodeData,
})

const mapDispatchToProps = {
    SignUpApi,
    sendOtpToEmailForRegistration,
    forgetPasswordVerifyOtp,
    getCountryAPI, getCityAPI, getStateAPI,
    getCountryPhoneCodeAPI,
    defaultReduxSuccess,
    loading

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)