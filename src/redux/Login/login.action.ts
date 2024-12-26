import { RooteAction } from "../store";
import {
  GET_LOGIN_FAILURE,
  GET_LOGIN_SUCCESS,
  GET_LOGOUT_FAILURE,
  GET_LOGOUT_SUCCESS,
  RESET_STATE,
} from "./login.type";

/**
 * Action creator function to dispatch action when login is successful.
 * @param obj Object containing login data.
 * @returns Action object with type and payload.
 */
export const getLoginSuccess = (obj): RooteAction => {
  return { type: GET_LOGIN_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when login fails.
 * @returns Action object with type and an empty payload.
 */
export const getLoginFailure = (): RooteAction => {
  return { type: GET_LOGIN_FAILURE, payload: {} };
};
/**
 * Action creator function to dispatch action when logout is successful.
 * @param obj Object containing logout data.
 * @returns Action object with type and payload.
 */
export const getLogoutSuccess = (obj): RooteAction => {
  return { type: GET_LOGOUT_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when logout fails.
 * @returns Action object with type and an empty payload.
 */
export const getLogoutFailure = (): RooteAction => {
  return { type: GET_LOGOUT_FAILURE, payload: {} };
};
/**
 * Action creator function to reset the login state.
 * @returns Action object with type and an empty payload.
 */
export const resetState = (): RooteAction => {
  return { type: RESET_STATE, payload: {} };
};
