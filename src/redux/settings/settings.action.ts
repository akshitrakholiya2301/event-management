import { RooteAction } from "../store";
import {
    GET_USER_PROFILE_FAILURE,
    GET_USER_PROFILE_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    CHANGE_PASSWORD_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_SUCCESS,

} from "./settings.type";

export const getUserProfileSuccess = (obj): RooteAction => {
    return { type: GET_USER_PROFILE_SUCCESS, payload: obj };
};

export const getUserProfileFailure = (): RooteAction => {
    return { type: GET_USER_PROFILE_FAILURE, payload: {} };
};


export const updateProfileSuccess = (obj): RooteAction => {
    return { type: UPDATE_USER_PROFILE_SUCCESS, payload: obj };
};

export const updateProfileFailure = (): RooteAction => {
    return { type: UPDATE_USER_PROFILE_FAILURE, payload: {} };
};


export const updatePasswordSuccess = (obj): RooteAction => {
    return { type: CHANGE_PASSWORD_SUCCESS, payload: obj };
};

export const updatePasswordFailure = (): RooteAction => {
    return { type: CHANGE_PASSWORD_FAILURE, payload: {} };
};


