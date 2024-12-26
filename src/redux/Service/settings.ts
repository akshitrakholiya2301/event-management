import { AppDispatch } from "../store";
import { loading } from "../Loader/loader.action";
import { te, ts } from "../../Utility/Toaster";

import {
    getUserProfileFailure,
    getUserProfileSuccess,
    updatePasswordFailure,
    updatePasswordSuccess,
    updateProfileFailure,
    updateProfileSuccess,
} from "../settings/settings.action";
import {
    GET_USER_DATA_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
} from "../../Utility/ApiList";
import { post, get } from "../../Utility/httpInterceptor";

// import { AES, enc } from 'crypto-js';

/**
 * Get User Profile Data
 * @param {*} objBody
 * @method getUserProfile
 * @url /getMyProfileDonerSide
 * @returns API will Get Data of user
 */
export const getUserProfile =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await get(`${GET_USER_DATA_API}`);
                // console.log(response);
                if (!response.data.error) {
                    // ts(response.data.message);
                    return dispatch(getUserProfileSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(getUserProfileFailure());
                }
            } catch (err) {
                dispatch(getUserProfileFailure());
            } finally {
                dispatch(loading(false));
            }
        };

/**
 * Update Profile Data
 * @param {*} objBody
 * @method updateProfileData
 * @url /editMyProfileDonorSide
 * @returns API will Update the details in profile
 */
export const updateProfileData =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(
                    `${UPDATE_PROFILE_API}`,
                    objBody,
                    true
                );
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(updateProfileSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(updateProfileFailure());
                }
            } catch (err) {
                dispatch(updateProfileFailure());
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
                    `${CHANGE_PASSWORD_API}`,
                    objBody,
                    true
                );
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(updatePasswordSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(updatePasswordFailure());
                }
            } catch (err) {
                dispatch(updatePasswordFailure());
            } finally {
                dispatch(loading(false));
            }
        };
