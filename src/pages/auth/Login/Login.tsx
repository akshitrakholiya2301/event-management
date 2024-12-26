import React, { useState } from 'react'
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import { loading } from '../../../redux/Loader/loader.action';
import { Button, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import google from '../../../assets/images/google-logo.svg'
import AuthLeftCard from '../../../components/AuthLeftCard/AuthLeftCard';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { PATTERN_EMAIL } from '../../../Utility/Validation_Helper';
import { isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper';
import { ENUMFORROUTES } from '../../../interfaces/interface';
import { loginToSystem } from '../../../redux/Service/login';
import Select from "react-select";

/**
 * Login Component
 * @param {object} props - Props passed to the component
 * @returns {JSX.Element} JSX element representing the Login component
 */
const Login = (props) => {

    const [eyeToggle, setEyeToggle] = useState<boolean>(false);
    var settings = {
        dots: true,
        arrows: false,
        infinite: false
    };


    const navigate = useNavigate();

    const initLoginValues = {
        email: '',
        password: ''
    };

    /**
     * Validation schema for login data based on the selected tab.
     */
    const validationSchemaForLoginData = yup.object({
        email: yup.string().trim().matches(PATTERN_EMAIL, "Please Enter a valid Email.").required("Email is required !!"),
        password: yup.string().trim().required("Password is required !!")
    })


    const handleSubmit = async (values, formikHelpers) => {
        const response = await props.loginToSystem(values);
        if (response) {
            if (!isNullUndefinedOrBlank(response)) {
                navigate(ENUMFORROUTES.DASHBOARD);
            }
        }
    }

    /**
      * Formik hook for managing login form data.
      */
    const loginFormData = useFormik({
        initialValues: initLoginValues,
        validationSchema: validationSchemaForLoginData,
        onSubmit: handleSubmit,
    });

    const handleKeyPress = (event) => {

        if (event.keyCode === 13) {
            event.preventDefault();

            loginFormData.handleSubmit();

        }

    };
    return (
        <>
            <div className="donor-auth-wrapper">
                <div className="donor-auth-inner-wrapper">
                    <div className="donor-auth-row">
                        {/* <div className="donor-auth-col donor-auth-left">
                            <div className="donor-auth-testimonials">
                                <div className="donor-auth-logo">
                                    <img src={authLogo} alt="authLogo" />
                                </div>
                                <div className="donor-auh-slider-footer">

                                    <div className="donor-auth-testimonials-slider">
                                        <Slider {...settings}>

                                            <div className="testimonials-slider-item">
                                                <div className="testimonials-slider-text">
                                                    <p>"Imagination is more important than
                                                        knowledge, especially when designing IJI kits.
                                                        Just remember, if your buttons are quantum
                                                        entangled, users might get stuck in a parallel
                                                        universe of endless clicks"</p>
                                                </div>
                                                <div className="testimonials-slider-user">
                                                    <img src={avatarDefault} alt="avatarDefault" />
                                                    <div className="testimonials-slider-user-text">
                                                        <h6>Robert Downey Jr.</h6>
                                                        <p>Hollywood Actor </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="testimonials-slider-item">
                                                <div className="testimonials-slider-text">
                                                    <p>"Imagination is more important than
                                                        knowledge, especially when designing IJI kits.
                                                        Just remember, if your buttons are quantum
                                                        entangled, users might get stuck in a parallel
                                                        universe of endless clicks"</p>
                                                </div>
                                                <div className="testimonials-slider-user">
                                                    <img src={avatarDefault} alt="avatarDefault" />
                                                    <div className="testimonials-slider-user-text">
                                                        <h6>Robert Downey Jr.</h6>
                                                        <p>Hollywood Actor </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </Slider>
                                    </div>
                                    <div className="donor-auh-footer">

                                        <p>2024 © PureCharity Ltd</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <AuthLeftCard />
                        <div className="donor-auth-col donor-auth-right">
                            <div className="admin-auth-from">
                                <div className='admin-auth-card'>
                                    <div className="admin-auth-icon">
                                        <i className='th-outline-frame-1'></i>
                                    </div>
                                    <div className="admin-auth-card-title">
                                        <h2>Welcome Back</h2>
                                        <p>Welcome back! Please enter your details.</p>
                                    </div>
                                    <div className="other-login">
                                        <Button variant='white' className='btn-icon-start'> <img src={google} alt="google" />  Continue with Google</Button>
                                        <div className="or">
                                            <p>OR</p>
                                        </div>
                                    </div>
                                    <Form.Group className="form-group">
                                        <Form.Label>Email</Form.Label>
                                        <div className="form-control-icon icon-start">
                                            <i className='th-outline-user'></i>
                                            <Form.Control type="email" placeholder="Enter email"
                                                {...loginFormData.getFieldProps("email")}
                                                onKeyDown={(event) => { handleKeyPress(event) }} />
                                        </div>
                                        {loginFormData.touched.email &&
                                            loginFormData.errors.email
                                            ? renderError(loginFormData.errors?.email)
                                            : null}
                                    </Form.Group>

                                    <Form.Group className="form-group">
                                        <Form.Label>Password</Form.Label>
                                        <div className="form-control-icon  form-control-password icon-start">
                                            <i className='th-outline-lock'></i>
                                            <Form.Control type={eyeToggle ? "text" : "password"} placeholder="Enter your password" {...loginFormData.getFieldProps("password")} onKeyDown={(event) => { handleKeyPress(event) }} />
                                            <button
                                                className=" btn-password"
                                                onClick={() => setEyeToggle(!eyeToggle)}
                                            >
                                                <i className={`${eyeToggle ? 'th-outline-eye' : 'th-outline-eye-slash'}`} ></i>
                                            </button>
                                        </div>
                                        {loginFormData.touched.password &&
                                            loginFormData.errors.password
                                            ? renderError(loginFormData.errors?.password)
                                            : null}
                                    </Form.Group>

                                    <div className="remember-forgot-password">

                                        {/* <   <Form.Group className="" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Remember me!" />
                                        </Form.Group>> */}
                                        <div></div>
                                        <NavLink className="btn-link btn-icon-start back-login justify-content-center" to="/forgot-password">Forgot Password</NavLink>
                                    </div>



                                    <div className="btn-full-group">
                                        <Button onClick={() => {

                                            localStorage.setItem("token", "hii");
                                            props.loading(true);
                                            setTimeout(() => {
                                                props.loading(false);
                                            }, 2000);
                                        }} variant='primary'>Login</Button>
                                        <div className="auth-form-text">
                                            <p>
                                                Don’t have an account?
                                                <NavLink className="btn-link btn-icon-start back-login justify-content-center" to="/signup">Donate Now</NavLink> ❤️
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/* <div>Login</div>
            <button onClick={() => {
                localStorage.setItem("token", "hii");
                props.loading(true);
                setTimeout(() => {
                    props.loading(false);
                }, 2000);
            }}>
                login
            </button> */}
        </>
    )
}
const mapStateToProps = (state: RootState) => {
    //   return { appReducer: state.loaderReducer };
};

const mapDispatchToProps = {
    loading,
    loginToSystem

};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login