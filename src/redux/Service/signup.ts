import {
  OTP_GENERATOR_REGISTARTION_API,
  SIGN_UP_API,
} from "../../Utility/ApiList";
import { te, ts } from "../../Utility/Toaster";
import { post } from "../../Utility/httpInterceptor";
import { loading } from "../Loader/loader.action";
import {
  getSignupFailure,
  getSignupSuccess,
  sendOtpFailure,
  sendOtpSuccess,
} from "../SignUp/signup.action";
import { AppDispatch } from "../store";

/**
 * Send Otp to Email For Forget Password
 * @param {*} objBody
 * @method sendOtpToEmailForRegistration
 * @url /otpGeneratorForRegistartion
 * @returns API will Send Otp to email For Forget Password
 */
export const sendOtpToEmailForRegistration =
  (objBody: any = undefined) =>
  async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    try {
      const response: any = await post(
        `${OTP_GENERATOR_REGISTARTION_API}`,
        objBody,
        false
      );
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
 * Send Otp to Email For Forget Password
 * @param {*} objBody
 * @method SignUpApi
 * @url /donorRegistration
 * @returns API will Send
 */
export const SignUpApi =
  (objBody: any = undefined) =>
  async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    try {
      const response: any = await post(`${SIGN_UP_API}`, objBody, false);
      // console.log(response);
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(getSignupSuccess(response.data));
      } else {
        te(response.data.message);
        dispatch(getSignupFailure());
      }
    } catch (err) {
      dispatch(getSignupFailure());
    } finally {
      dispatch(loading(false));
    }
  };
