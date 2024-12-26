import { RooteAction } from "../store";
import {
  GET_SIGN_UP_FAILURE,
  GET_SIGN_UP_SUCCESS,
  RESET_STATE,
  SEND_OTP_FAILURE,
  SEND_OTP_SUCCESS,
} from "./signup.type";

export interface SignUpInitializeState {
  /** Indicates whether the login was successful */
  signUpSuccess: boolean;
  /**Contains signUp-related data  */
  signUpData: any;
  sendOtp: any;

  /** Indicates whether an asynchronous operation is in progress */
  loading: boolean;
}
/** Define the initial state */
const initialState: SignUpInitializeState = {
  signUpSuccess: false,
  signUpData: [],
  sendOtp: null,
  loading: false,
};

/**
 * Reducer function responsible for managing login-related state.
 * @param state Current state of the login module. Defaults to initial state if not provided.
 * @param action Action dispatched to update the state.
 * @returns Updated state based on the dispatched action.
 */
function SignUpReducer(
  state: SignUpInitializeState = initialState,
  action: RooteAction
): SignUpInitializeState {
  switch (action.type) {
    case GET_SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: true,
        signUpData: action.payload,
        loading: false,
      };

    case GET_SIGN_UP_FAILURE:
      return {
        ...state,
        signUpSuccess: false,
        signUpData: null,
        loading: false,
      };

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

    case RESET_STATE: {
      return {
        ...state,
        signUpSuccess: false,
        signUpData: [],

        loading: false,
      };
    }

    default:
      return state;
  }
}
export default SignUpReducer;
