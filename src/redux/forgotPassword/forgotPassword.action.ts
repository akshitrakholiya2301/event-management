import { RooteAction } from "../store";
import {
    SEND_OTP_FAILURE,
    SEND_OTP_SUCCESS,
    FORGET_PASSWORD_VERIFY_OTP_FAILURE,
    FORGET_PASSWORD_VERIFY_OTP_SUCCESS,
    ADD_NEW_PASSWORD_FAILURE,
    ADD_NEW_PASSWORD_SUCCESS,

} from "./forgotPassword.type";

export const sendOtpSuccess = (obj): RooteAction => {
    return { type: SEND_OTP_SUCCESS, payload: obj };
};

export const sendOtpFailure = (): RooteAction => {
    return { type: SEND_OTP_FAILURE, payload: {} };
};


export const forgetPasswordVerifyOtpSuccess = (obj): RooteAction => {
    return { type: FORGET_PASSWORD_VERIFY_OTP_SUCCESS, payload: obj };
};

export const forgetPasswordVerifyOtpFailure = (): RooteAction => {
    return { type: FORGET_PASSWORD_VERIFY_OTP_FAILURE, payload: {} };
};

export const addNewPasswordSuccess = (obj): RooteAction => {
    return { type: ADD_NEW_PASSWORD_SUCCESS, payload: obj };
};

export const addNewPasswordFailure = (): RooteAction => {
    return { type: ADD_NEW_PASSWORD_FAILURE, payload: {} };
};


