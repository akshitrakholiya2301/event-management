import { RooteAction } from "../store";
import {
    SEND_OTP_FAILURE,
    SEND_OTP_SUCCESS,
    FORGET_PASSWORD_VERIFY_OTP_FAILURE,
    FORGET_PASSWORD_VERIFY_OTP_SUCCESS,
    ADD_NEW_PASSWORD_FAILURE,
    ADD_NEW_PASSWORD_SUCCESS,

} from "./forgotPassword.type";

export interface ForgetPasswordInitializeState {
    sendOtp: any;
    verifyEmail: any;
    addNewPassWord: any;
    loading: boolean;
}

const initialState: ForgetPasswordInitializeState = {
    sendOtp: null,
    verifyEmail: null,
    addNewPassWord: null,
    loading: false,
};

function ForgetPasswordReducer(
    state: ForgetPasswordInitializeState = initialState,
    action: RooteAction
): ForgetPasswordInitializeState {
    switch (action.type) {
        case SEND_OTP_SUCCESS:
            return {
                ...state,
                sendOtp: action.payload,
                loading: false,
            };

        case SEND_OTP_FAILURE:
            return {
                ...state,
                sendOtp: null,
                loading: false,
            };
        case FORGET_PASSWORD_VERIFY_OTP_SUCCESS:
            return {
                ...state,
                verifyEmail: action.payload,
                loading: false,
            };

        case FORGET_PASSWORD_VERIFY_OTP_FAILURE:
            return {
                ...state,
                verifyEmail: null,
                loading: false,
            };
        case ADD_NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                addNewPassWord: action.payload,
                loading: false,
            };

        case ADD_NEW_PASSWORD_FAILURE:
            return {
                ...state,
                addNewPassWord: null,
                loading: false,
            };



        default:
            return state;
    }
}
export default ForgetPasswordReducer;
