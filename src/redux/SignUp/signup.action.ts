import { RooteAction } from "../store";
import {
  GET_SIGN_UP_FAILURE,
  GET_SIGN_UP_SUCCESS,
  SEND_OTP_FAILURE,
  SEND_OTP_SUCCESS,
} from "./signup.type";

/**
 * Action creator function to dispatch action when SignUp is successful.
 * @param obj Object containing SignUp data.
 * @returns Action object with type and payload.
 */
export const getSignupSuccess = (obj): RooteAction => {
  return { type: GET_SIGN_UP_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when SignUp fails.
 * @returns Action object with type and an empty payload.
 */
export const getSignupFailure = (): RooteAction => {
  return { type: GET_SIGN_UP_FAILURE, payload: {} };
};

export const sendOtpSuccess = (obj): RooteAction => {
  return { type: SEND_OTP_SUCCESS, payload: obj };
};

export const sendOtpFailure = (): RooteAction => {
  return { type: SEND_OTP_FAILURE, payload: {} };
};
