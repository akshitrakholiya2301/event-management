import { AppDispatch } from "../store";
import { loading } from "../Loader/loader.action";
import { te, ts } from "../../Utility/Toaster";

import {
  sendOtpFailure,
  sendOtpSuccess,
  forgetPasswordVerifyOtpFailure,
  forgetPasswordVerifyOtpSuccess,
  addNewPasswordFailure,
  addNewPasswordSuccess,
} from "../forgotPassword/forgotPassword.action";
import {
  OTP_GENERATOR_API,
  OTP_VERIFICATION_API,
  ADD_NEW_PASSWORD_API,
} from "../../Utility/ApiList";
import { post } from "../../Utility/httpInterceptor";

// import { AES, enc } from 'crypto-js';

/**
 * Send Otp to Email For Forget Password
 * @param {*} objBody
 * @method sendOtpToEmail
 * @url /sendOtpToemail
 * @returns API will Send Otp to email For Forget Password
 */
export const sendOtpToEmail =
  (objBody: any = undefined) =>
  async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    try {
      const response: any = await post(`${OTP_GENERATOR_API}`, objBody, false);
      // console.log(response);
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(sendOtpSuccess(response.data));
      } else {
        te(response.data.message);
        dispatch(sendOtpFailure());
      }
    } catch (err) {
      dispatch(sendOtpFailure());
    } finally {
      dispatch(loading(false));
    }
  };

/**
 * verify OTP For Forget Password
 * @param {*} objBody
 * @method forgetPasswordVerifyOtp
 * @url /forgotPassOtpVerificationAdmin
 * @returns API will verify OTP For Forget Password
 */
export const forgetPasswordVerifyOtp =
  (objBody: any = undefined) =>
  async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    try {
      const response: any = await post(
        `${OTP_VERIFICATION_API}`,
        objBody,
        false
      );
      // console.log(response);
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(forgetPasswordVerifyOtpSuccess(response.data));
      } else {
        te(response.data.message);
        dispatch(forgetPasswordVerifyOtpFailure());
      }
    } catch (err) {
      dispatch(forgetPasswordVerifyOtpFailure());
    } finally {
      dispatch(loading(false));
    }
  };

/**
 * Reset Password in  Forget Password
 * @param {*} objBody
 * @method addNewPassword
 * @url /addNewPasswordAdmin
 * @returns API will Reset the password
 */
export const addNewPassword =
  (objBody: any = undefined) =>
  async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    try {
      const response: any = await post(
        `${ADD_NEW_PASSWORD_API}`,
        objBody,
        false
      );
      // console.log(response);
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(addNewPasswordSuccess(response.data));
      } else {
        te(response.data.message);
        dispatch(addNewPasswordFailure());
      }
    } catch (err) {
      dispatch(addNewPasswordFailure());
    } finally {
      dispatch(loading(false));
    }
  };
