import { AppDispatch } from "../store";
import { loading } from "../Loader/loader.action";
import { te, ts } from "../../Utility/Toaster";

import {
  getLoginFailure,
  getLoginSuccess,
  getLogoutFailure,
  getLogoutSuccess,
  resetState,
} from "../Login/login.action";
// import { LOGIN_API } from "../../Utility/ApiList";
import { post } from "../../Utility/httpInterceptor";
import { User } from "../../interfaces/interface";
import { LOGIN_API } from "../../Utility/ApiList";

/**
 * Login
 * @param {*} objBody
 * @method loginToSystem
 * @url /login/verify
 * @returns API will return login token and redirect to dashboard
 */
export const loginToSystem =
  (objBody: any = undefined) =>
    async (dispatch: AppDispatch) => {
      console.log(objBody, "calling");
      dispatch(loading(true));
      try {
        const response: any = await post(LOGIN_API, objBody);
        console.log(response, "response");
        if (response.data) {
          const user: User = response.data.data;
          ts(response.data.message);

          // localStorage.setItem("email", objBody.email);
          localStorage.setItem("email", user.email);
          localStorage.setItem("token", user.token);
          localStorage.setItem("name", user.first_name + " " + user.last_name);
          localStorage.setItem("mobile_no", user.mobile_no);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("profile_Url", user.profile_pic_url);
          localStorage.setItem("isAuthorizedForCharity", user.isAuthorizedForCharity);
          dispatch(getLoginSuccess(objBody));
        } else {
          te("Login Failed!");
          dispatch(getLoginFailure());
        }
      } catch (err) {
        console.log(err, "error");
        dispatch(getLoginFailure());
      } finally {
        dispatch(loading(false));
      }
    };

/**
 * Logout
 * @param {*} objBody
 * @method logoutFromSystem
 * @url /login/logout
 * @returns API will logout user from system
 */
export const logoutFromSystem =
  (objBody: any = undefined) =>
    async (dispatch: AppDispatch) => {
      console.log("logourt");
      dispatch(loading(true));
      try {
        localStorage.clear();

        ts("Logged Out successfully!");
        dispatch(getLogoutSuccess("true"));
      } catch (err) {
        dispatch(getLogoutFailure());
      } finally {
        dispatch(loading(false));
      }
    };

export const resetLoginState =
  (objBody: any = {}) =>
    async (dispatch: AppDispatch) => {
      dispatch(loading(true));
      try {
        return dispatch(resetState());
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(loading(false));
      }
    };
