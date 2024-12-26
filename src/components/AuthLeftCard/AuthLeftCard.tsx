import React, { useState } from 'react'

import Slider from "react-slick";
import avatarDefault from "../../assets/images/avatar-default.svg";
import authLogo from "../../assets/images/donor-auth-logo.svg";
import donorAutBg from "../../assets/images/donor-auth-bg.svg";


const AuthLeftCard = () => {
    const [eyeToggle, setEyeToggle] = useState<boolean>(false);
    var settings = {
        dots: true,
        arrows: false,
        infinite: false
    };
    return (
        <div className="donor-auth-col donor-auth-left">
            <div className="donor-auth-bg">
                <img src={donorAutBg} alt="donorAutBg" />
            </div>
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

                        <p>2024 © Infinite</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLeftCard