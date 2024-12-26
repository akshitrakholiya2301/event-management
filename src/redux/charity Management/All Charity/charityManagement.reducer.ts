import { RooteAction } from "../../store";
import {
  GET_ALL_CHARITY_LIST_FAILURE,
  GET_ALL_CHARITY_LIST_RESET,
  GET_ALL_CHARITY_LIST_SUCCESS,
  GET_BLOG_DROPDOWN_DATA_FAILURE,
  GET_BLOG_DROPDOWN_DATA_SUCCESS,
  ADD_EDIT_CHARITY_DETAILS_FAILURE,
  ADD_EDIT_CHARITY_DETAILS_SUCCESS,
  APPROVE_CHYARITY_REQUEST_FAILURE,
  APPROVE_CHYARITY_REQUEST_SUCCESS

} from "../All Charity/charityManagement.type";

export interface CharityManagementInitializeState {
  /** Indicates whether the charity Mangement was successful */
  charityMangementSuccess: boolean;
  /**Contains Charity-related data  */
  charityData: any;
  /**Contains Publisher DropDownData data  */
  publisherDropDownData: any;
  /**Contains Requested DropDownData data  */
  requestedByDropDownData: any;
  /**Contains tag DropDownData data  */
  tagDropDownData: any;
  /**Contains blog DropDownData data  */
  blogDropDownData: any;
  /**Contains Update Charity Status data  */
  updateCharityStatusData: any;
  /**Contains Delete Charity data  */
  deleteCharityData: any;
  addEditCharityData: any;
  approveCharityRequest: any;
  /** Indicates whether an asynchronous operation is in progress */
  loading: boolean;
}
/** Define the initial state */
const initialState: CharityManagementInitializeState = {
  charityMangementSuccess: false,
  charityData: [],
  publisherDropDownData: [],
  requestedByDropDownData: [],
  updateCharityStatusData: [],
  deleteCharityData: [],
  tagDropDownData: [],
  blogDropDownData: [],
  approveCharityRequest: null,
  addEditCharityData: null,
  loading: false,
};
/**
 * Reducer function responsible for managing login-related state.
 * @param state Current state of the login module. Defaults to initial state if not provided.
 * @param action Action dispatched to update the state.
 * @returns Updated state based on the dispatched action.
 */
function CharityManagementReducer(
  state: CharityManagementInitializeState = initialState,
  action: RooteAction
): CharityManagementInitializeState {
  switch (action.type) {
    case GET_ALL_CHARITY_LIST_SUCCESS:
      return {
        ...state,
        charityMangementSuccess: true,
        charityData: action.payload,
        loading: true,
      };
    case GET_ALL_CHARITY_LIST_FAILURE:
      return {
        ...state,
        charityMangementSuccess: false,
        charityData: null,
        loading: false,
      };
    case GET_ALL_CHARITY_LIST_RESET:
      return {
        ...state,
        charityMangementSuccess: false,
        charityData: null,
        loading: false,
      };


    case GET_BLOG_DROPDOWN_DATA_SUCCESS:
      return {
        ...state,
        blogDropDownData: action.payload,
        loading: true,
      };
    case GET_BLOG_DROPDOWN_DATA_FAILURE:
      return {
        ...state,
        blogDropDownData: action.payload,
        loading: false,
      };

    case ADD_EDIT_CHARITY_DETAILS_SUCCESS:
      return {
        ...state,
        addEditCharityData: action.payload,
        loading: true,
      };
    case ADD_EDIT_CHARITY_DETAILS_FAILURE:
      return {
        ...state,
        addEditCharityData: null,
        loading: false,
      };

    case APPROVE_CHYARITY_REQUEST_SUCCESS:
      return {
        ...state,
        approveCharityRequest: action.payload,
        loading: true,
      };
    case APPROVE_CHYARITY_REQUEST_FAILURE:
      return {
        ...state,
        approveCharityRequest: null,
        loading: false,
      };

    default:
      return state;
  }
}
export default CharityManagementReducer;