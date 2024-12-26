import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { ChangePasswordRequest, ENUMFORACCOUNTTAB, ENUMFORROUTES } from '../../../interfaces/interface';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import { PASSWORD_INVALID, PATTERN_FOR_PASSWORD_NEW } from '../../../Utility/Validation_Helper';
import * as yup from 'yup';
import { renderError } from '../../../Utility/Helper';
import { addNewPassword } from '../../../redux/Service/settings';
import { useNavigate } from 'react-router-dom';

const ChangePassword = (props) => {
    const navigate = useNavigate();
    const [eyeToggle, setEyeToggle] = useState<boolean>(false);
    const [eyeConfirmToggle, setEyeConfirmToggle] = useState<boolean>(false);
    const [eyeCurrentToggle, setEyeCurrentToggle] = useState<boolean>(false);

    const initPasswordSettingsValues: ChangePasswordRequest = {
        current_password: "",
        new_password: "",
        confirm_password: ""
    }
    const onSubmit = (values) => {
    }

    const validationSchema = yup.object({
        current_password: yup
            .string()
            .trim()
            // .matches(PATTERN_FOR_PASSWORD_NEW, `${PASSWORD_INVALID}`)
            .required("Password is Required!!"),
        new_password: yup
            .string()
            // .notOneOf([yup.ref("current_password"), null], "New password must be different from current password")
            .trim()
            .matches(PATTERN_FOR_PASSWORD_NEW, `${PASSWORD_INVALID}`)
            .required("New Password is Required!!"),
        confirm_password: yup.string()
            .oneOf([yup.ref("new_password")], "Confirm Password Not Matched")
            .trim()
            .when("new_password", {
                is: (new_password: string) => new_password === "",
                then: schema => schema.required("Confirm Password is Required!!"),
                otherwise: schema => schema.notRequired(),
            }),
    })

    const passwordSettingsFormData = useFormik({
        initialValues: initPasswordSettingsValues,
        onSubmit,
        validationSchema,
    });

    const handleChangePassword = async () => {
        passwordSettingsFormData.handleSubmit();
        const changPasswordErrors = await passwordSettingsFormData.validateForm();
        if (Object.keys(changPasswordErrors).length > 0) {
            passwordSettingsFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(changPasswordErrors, true));

            return;
        }
        const reqBody = { new_password: passwordSettingsFormData.values.new_password, current_password: passwordSettingsFormData.values.current_password };


        const response = await props.addNewPassword(reqBody);

        if (response) {
            passwordSettingsFormData.resetForm();
        }
    }

    useEffect(() => {
        if (props.selectedTab === ENUMFORACCOUNTTAB.UPDATE_PASSWORD) {
            passwordSettingsFormData.resetForm();
        }

    }, [props.selectedTab]);

    return (
        <>
            <div className="tab-title">
                <h3>Change Password</h3>
                {/* <p>Edit/Change your personal details here</p> */}
            </div>
            <div className="tab-from">
                <div className="change-password">
                    <Form.Group className="form-group">
                        <Form.Label>Current Password</Form.Label>
                        <div className="form-control-icon  form-control-password icon-start">
                            <i className='th-outline-lock'></i>
                            <Form.Control type={eyeCurrentToggle ? "text" : "password"} placeholder="Enter Current password"  {...passwordSettingsFormData.getFieldProps("current_password")} />
                            <button
                                className=" btn-password"
                                onClick={() => setEyeCurrentToggle(!eyeCurrentToggle)}
                            >
                                <i className={`${eyeCurrentToggle ? 'th-outline-eye' : 'th-outline-eye-slash'}`} ></i>
                            </button>
                        </div>
                        {passwordSettingsFormData.touched.current_password &&
                            passwordSettingsFormData.errors.current_password
                            ? renderError(passwordSettingsFormData.errors.current_password)
                            : null}

                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>New Password</Form.Label>
                        <div className="form-control-icon  form-control-password icon-start">
                            <i className='th-outline-lock'></i>
                            <Form.Control type={eyeToggle ? "text" : "password"} placeholder="Enter New password" {...passwordSettingsFormData.getFieldProps("new_password")} />
                            <button
                                className=" btn-password"
                                onClick={() => setEyeToggle(!eyeToggle)}
                            >
                                <i className={`${eyeToggle ? 'th-outline-eye' : 'th-outline-eye-slash'}`} ></i>
                            </button>
                        </div>
                        {passwordSettingsFormData.touched.new_password &&
                            passwordSettingsFormData.errors.new_password
                            ? renderError(passwordSettingsFormData.errors.new_password)
                            : null}
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Confirm password</Form.Label>
                        <div className="form-control-icon  form-control-password icon-start">
                            <i className='th-outline-lock'></i>
                            <Form.Control type={eyeConfirmToggle ? "text" : "password"} placeholder="Enter Confirm password" {...passwordSettingsFormData.getFieldProps("confirm_password")} />
                            <button
                                className=" btn-password"
                                onClick={() => setEyeConfirmToggle(!eyeConfirmToggle)}
                            >
                                <i className={`${eyeConfirmToggle ? 'th-outline-eye' : 'th-outline-eye-slash'}`} ></i>
                            </button>
                        </div>
                        {passwordSettingsFormData.touched.confirm_password &&
                            passwordSettingsFormData.errors.confirm_password
                            ? renderError(passwordSettingsFormData.errors.confirm_password)
                            : null}
                    </Form.Group>
                    <div className="button-group">
                        <Button variant='primary' className='w-100' onClick={() => { handleChangePassword() }}>Save</Button>
                        <Button variant='white' className='w-100' onClick={() => { navigate(ENUMFORROUTES.DASHBOARD) }}>Cancel</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    addNewPassword
}


export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)