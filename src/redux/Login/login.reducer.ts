import { RooteAction } from "../store";
import {
  GET_LOGIN_FAILURE,
  GET_LOGIN_SUCCESS,
  GET_LOGOUT_FAILURE,
  GET_LOGOUT_SUCCESS,
  RESET_STATE,
} from "./login.type";

export interface LoginInitializeState {
  /** Indicates whether the login was successful */
  loginSuccess: boolean;
  /**Contains login-related data  */
  loginData: any;
  /** Indicates whether the logout was successful */
  logoutSuccess: boolean;
  /** Contains user-related data */
  userData: any;
  /** Indicates whether an asynchronous operation is in progress */
  loading: boolean;
}
/** Define the initial state */
const initialState: LoginInitializeState = {
  loginSuccess: false,
  loginData: [],
  logoutSuccess: false,
  userData: [],
  loading: false,
};

/**
 * Reducer function responsible for managing login-related state.
 * @param state Current state of the login module. Defaults to initial state if not provided.
 * @param action Action dispatched to update the state.
 * @returns Updated state based on the dispatched action.
 */
function LoginReducer(
  state: LoginInitializeState = initialState,
  action: RooteAction
): LoginInitializeState {
  switch (action.type) {
    case GET_LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        loginData: action.payload,
        loading: false,
      };

    case GET_LOGIN_FAILURE:
      return {
        ...state,
        loginSuccess: false,
        loginData: null,
        loading: false,
      };

    case GET_LOGOUT_SUCCESS:
      return {
        ...state,
        logoutSuccess: true,
        loading: false,
      };

    case GET_LOGOUT_FAILURE:
      return {
        ...state,
        logoutSuccess: false,
        loading: false,
      };

    case RESET_STATE: {
      return {
        ...state,
        loginSuccess: false,
        loginData: [],
        logoutSuccess: false,
        userData: [],
        loading: false,
      };
    }

    default:
      return state;
  }
}
export default LoginReducer;
