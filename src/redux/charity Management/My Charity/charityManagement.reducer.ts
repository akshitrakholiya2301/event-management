import { RooteAction } from "../../store";
import {
  GET_MY_CHARITY_LIST_SUCCESS,
  GET_MY_CHARITY_LIST_FAUILURE

} from "./charityManagement.type";

export interface CharityManagementInitializeState {
  myCharityData: any;
  /** Indicates whether an asynchronous operation is in progress */
  loading: boolean;
}
/** Define the initial state */
const initialState: CharityManagementInitializeState = {
  myCharityData: [],
  loading: false,
};
/**
 * Reducer function responsible for managing login-related state.
 * @param state Current state of the login module. Defaults to initial state if not provided.
 * @param action Action dispatched to update the state.
 * @returns Updated state based on the dispatched action.
 */
function MyCharityManagementReducer(
  state: CharityManagementInitializeState = initialState,
  action: RooteAction
): CharityManagementInitializeState {
  switch (action.type) {

    case GET_MY_CHARITY_LIST_SUCCESS:
      return {
        ...state,
        myCharityData: action.payload,
        loading: false,
      };
    case GET_MY_CHARITY_LIST_FAUILURE:
      return {
        ...state,
        myCharityData: action.payload,
        loading: false,
      };


    default:
      return state;
  }
}
export default MyCharityManagementReducer;