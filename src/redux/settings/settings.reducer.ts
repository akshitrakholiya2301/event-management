import { RooteAction } from "../store";
import {
    GET_USER_PROFILE_FAILURE,
    GET_USER_PROFILE_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    CHANGE_PASSWORD_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_SUCCESS,
} from "./settings.type";

export interface SettingsInitializeState {
    getUserProfile: any;
    updatePassword: any;
    updateProfile: any;
    loading: boolean;
}

const initialState: SettingsInitializeState = {
    getUserProfile: null,
    updatePassword: null,
    updateProfile: null,
    loading: false,
};

function SettingsReducer(
    state: SettingsInitializeState = initialState,
    action: RooteAction
): SettingsInitializeState {
    switch (action.type) {
        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                getUserProfile: action.payload,
                loading: false,
            };

        case GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                getUserProfile: null,
                loading: false,
            };

        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                updateProfile: action.payload,
                loading: false,
            };

        case UPDATE_USER_PROFILE_FAILURE:
            return {
                ...state,
                updateProfile: null,
                loading: false,
            };

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                updatePassword: action.payload,
                loading: false,
            };

        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                updatePassword: null,
                loading: false,
            };

        default:
            return state;
    }
}
export default SettingsReducer;
