import React, { useState } from 'react'
import { connect } from 'react-redux'
import AuthLeftCard from '../../../components/AuthLeftCard/AuthLeftCard';
import { Button, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import google from '../../../assets/images/google-logo.svg'
import { ENUMFORFORGOTPASSWORDSTEPS } from '../../../interfaces/interface';
import * as yup from "yup";
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import { PATTERN_FOR_PASSWORD_NEW, PASSWORD_INVALID, CONFIRM_PASSWORD_NOT_MATCHED } from '../../../Utility/Validation_Helper';
import { renderError } from '../../../Utility/Helper';
import OTPInput from 'react-otp-input';
import {
  addNewPassword,
  forgetPasswordVerifyOtp,
  sendOtpToEmail
} from '../../../redux/Service/forgotPassword';

export const ForgotPassword = (props) => {
  const [eyeToggle, setEyeToggle] = useState<boolean>(false);
  var settings = {
    dots: true,
    arrows: false,
    infinite: false
  };

  const [eyeToggle1, setEyeToggle1] = useState<boolean>(false);
  const [step, setStep] = useState<string>(ENUMFORFORGOTPASSWORDSTEPS.EMAIL);
  const [email, setemail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  const navigate = useNavigate();

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
    }
    setemail(sendOtpform.values.email)

    let response = await props?.sendOtpToEmail({ email: email ? email : sendOtpform.values.email, type: "forget_password" });
    if (response) {
      setStep(ENUMFORFORGOTPASSWORDSTEPS.VERIFY_OTP);
      sendOtpform.resetForm();
    }
  }

  const handleReSendOtp = async () => {


    let response = await props?.sendOtpToEmail({ email: email });
    if (response) {
      setStep(ENUMFORFORGOTPASSWORDSTEPS.VERIFY_OTP);

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


  const handleVerifyOtp = async () => {
    let payload = { email, otp }

    let response = await props?.forgetPasswordVerifyOtp(payload);
    if (response) {
      setStep(ENUMFORFORGOTPASSWORDSTEPS.CHANGE_PASSWORD);
    }
  }

  const checkIsValidationRegexIsProper = (name: string) => {
    const obj = { isLengthValidate: false, isSpecialChar: false };


    switch (name) {
      case 'MIN_8_Char':
        if (addNewPasswordForm?.values?.new_password && addNewPasswordForm?.values?.new_password.length >= 8) {
          obj['isLengthValidate'] = true;
        }
        break;
      case 'ONE_SPECIALCHAR':
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (format.test(addNewPasswordForm?.values?.new_password)) {
          obj['isSpecialChar'] = true;
        }
        break;

      default:
        break;
    }

    return obj;

  }



  const initvalueAddNewPassword: any = {
    new_password: "",
    confirm_password: ""
  };

  const validationSchemaForAddNewPassword = yup.object({
    new_password: yup
      .string()
      .trim()
      .matches(PATTERN_FOR_PASSWORD_NEW, PASSWORD_INVALID)
      .required("New Password is Required!!"),
    confirm_password: yup.string()
      .when('new_password', ([new_password]) => {
        return new_password?.length > 0 ? yup.string().required(" Confirm Password Is Required!!").oneOf([yup.ref("new_password")], `${CONFIRM_PASSWORD_NOT_MATCHED}`) : yup.string()
      })
  });


  const handleAddNewPassword = async () => {
    const newPasswordErrors = addNewPasswordForm.validateForm();
    if (Object.keys(newPasswordErrors).length > 0) {
      sendOtpform.setTouched(
        setNestedObjectValues<
          FormikTouched<FormikValues>
        >(newPasswordErrors, true))
      return;
    }
    addNewPasswordForm.values.email = email
    let response = await props?.addNewPassword(addNewPasswordForm.values);
    if (response) {
      addNewPasswordForm.resetForm();
      setemail('');
      navigate('/login')
    }
  }

  const handleKeyPressAddNewPassword = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      addNewPasswordForm.handleSubmit();
    }
  };

  const addNewPasswordForm = useFormik({
    initialValues: initvalueAddNewPassword,
    onSubmit: handleAddNewPassword,
    validationSchema: validationSchemaForAddNewPassword,
  });
  return (

    <div className="donor-auth-wrapper">
      <div className="donor-auth-inner-wrapper">
        <div className="donor-auth-row">

          <AuthLeftCard />
          <div className="donor-auth-col donor-auth-right">
            <div className="admin-auth-from">

              {(() => {
                switch (step) {
                  case ENUMFORFORGOTPASSWORDSTEPS.EMAIL:
                    return (
                      <div className='admin-auth-card ' >
                        <div className="admin-auth-icon">
                          <i className='th-outline-key'></i>
                        </div>
                        <div className="admin-auth-card-title">
                          <h2>Forgot Password?</h2>
                          <p>No worries, we’ll send you reset instructions.</p>
                        </div>

                        <Form>
                          <Form.Group className="form-group">
                            <Form.Label>Email</Form.Label>
                            <div className="form-control-icon icon-start">
                              <i className='th-outline-user'></i>
                              <Form.Control type="email" placeholder="Enter Email" {...sendOtpform.getFieldProps("email")}
                                onKeyDown={(event) => handleKeyPressSendOtp(event)} />
                            </div>
                            {sendOtpform.touched.email &&
                              sendOtpform.errors.email
                              ? renderError(sendOtpform.errors.email)
                              : null}
                          </Form.Group>
                          <div className="btn-full-group">
                            <Button variant='primary' onClick={() => { sendOtpform.handleSubmit() }}>Reset Password</Button>
                            <NavLink className="btn-link-two btn-icon-start back-login" to="/login"> <i className='th-outline-arrow-left'></i> Back to Login</NavLink>
                          </div>
                        </Form>
                      </div>
                    );
                  case ENUMFORFORGOTPASSWORDSTEPS.VERIFY_OTP:
                    return (
                      <div className='admin-auth-card'>
                        <div className="admin-auth-icon">
                          <i className='th-outline-sms'></i>
                        </div>
                        <div className="admin-auth-card-title">
                          <h2>Check Your Email</h2>
                          <p>We sent a verification Code to <br /> <span>{email}</span> </p>
                        </div>

                        {/* <Form>
                          <Form.Group className="form-group otp-group" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder="-" />
                            <Form.Control type="text" placeholder="-" />
                            <Form.Control type="text" placeholder="-" />
                            <Form.Control type="text" placeholder="-" />
                          </Form.Group> */}

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
                          <Button variant='primary' disabled={email == '' || otp?.length !== 6} onClick={() => { handleVerifyOtp() }}>Verify Email</Button>
                          <NavLink className="btn-link-two btn-icon-start back-login" to="/login"> <i className='th-outline-arrow-left'></i> Back to Login</NavLink>
                        </div>
                        {/* </Form> */}
                      </div>
                    );
                  case ENUMFORFORGOTPASSWORDSTEPS.CHANGE_PASSWORD:
                    return (
                      <div className='admin-auth-card'>
                        <div className="admin-auth-icon">
                          <i className='th-outline-lock'></i>
                        </div>
                        <div className="admin-auth-card-title">
                          <h2>Set New Password</h2>
                          <p>Your new password must be different to <br />
                            previously used passwords.</p>
                        </div>
                        <Form.Group className="form-group">
                          <Form.Label>Password</Form.Label>
                          <div className="form-control-icon  form-control-password icon-start">

                            <i className='th-outline-lock'></i>

                            <Form.Control type={eyeToggle ? "text" : "password"} placeholder="Enter your password" {...addNewPasswordForm.getFieldProps("new_password")} onKeyDown={(event) => handleKeyPressAddNewPassword(event)} />

                            <button
                              className=" btn-password"
                              onClick={() => setEyeToggle(!eyeToggle)}
                            >
                              <i className={`${eyeToggle ? 'th-outline-eye' : 'th-outline-eye-slash'}`} ></i>
                            </button>
                          </div>
                          {addNewPasswordForm.touched.new_password &&
                            addNewPasswordForm.errors.new_password
                            ? renderError(addNewPasswordForm.errors.new_password)
                            : null}
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label>Confirm password</Form.Label>
                          <div className="form-control-icon  form-control-password icon-start">

                            <i className='th-outline-lock'></i>
                            <Form.Control type={eyeToggle1 ? "text" : "password"} placeholder="Enter your password"  {...addNewPasswordForm.getFieldProps("confirm_password")} onKeyDown={(event) => handleKeyPressAddNewPassword(event)} />
                            <button
                              className=" btn-password"
                              onClick={() => setEyeToggle1(!eyeToggle1)}
                            >
                              <i className={`${eyeToggle1 ? 'th-outline-eye' : 'th-outline-eye-slash'}`} ></i>
                            </button>
                          </div>
                          {addNewPasswordForm.touched.confirm_password &&
                            addNewPasswordForm.errors.confirm_password
                            ? renderError(addNewPasswordForm.errors.confirm_password)
                            : null}
                        </Form.Group>

                        <div className="auth-form-text mt-0">
                          <ul>
                            <li className={`${checkIsValidationRegexIsProper('MIN_8_Char').isLengthValidate ? 'text-success' : ''}`}>Must be at least 8 characters</li>
                            <li className={`${checkIsValidationRegexIsProper('ONE_SPECIALCHAR').isSpecialChar ? 'text-success' : ''}`}>Must contain one special character</li>
                          </ul>
                        </div >


                        <div className="btn-full-group">
                          <Button variant='primary' onClick={() => { addNewPasswordForm.handleSubmit() }}>Reset Password</Button>
                          <NavLink className="btn-link-two btn-icon-start back-login" to="/login"> <i className='th-outline-arrow-left'></i> Back to Login</NavLink>
                        </div>

                      </div>
                    );
                }
              })()}



              {/* OTP card  */}


              {/* Change Password Card */}

            </div>
          </div>
        </div>
      </div>
    </div >

  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  sendOtpToEmail,
  forgetPasswordVerifyOtp,
  addNewPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)