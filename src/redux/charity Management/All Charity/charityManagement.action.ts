import { RooteAction } from "../../store";
import {
  GET_ALL_CHARITY_LIST_FAILURE,
  GET_ALL_CHARITY_LIST_RESET,
  GET_ALL_CHARITY_LIST_SUCCESS,
  GET_BLOG_DROPDOWN_DATA_FAILURE,
  GET_BLOG_DROPDOWN_DATA_SUCCESS,
  ADD_EDIT_CHARITY_DETAILS_FAILURE,
  ADD_EDIT_CHARITY_DETAILS_SUCCESS,
  GET_MY_CHARITY_LIST_FAUILURE,
  GET_MY_CHARITY_LIST_SUCCESS,
  GET_MY_CHARITY_RESET,
  APPROVE_CHYARITY_REQUEST_FAILURE,
  APPROVE_CHYARITY_REQUEST_SUCCESS,
} from "../All Charity/charityManagement.type";

/**
 * Action creator function to dispatch action when Charity List  is successful.
 * @param obj Object containing Charity List  data.
 * @returns Action object with type and payload.
 */
export const getAllCharityListSuccess = (obj): RooteAction => {
  return { type: GET_ALL_CHARITY_LIST_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when Charity List fails.
 * @returns Action object with type and an empty payload.
 */
export const getAllCharityListFailure = (): RooteAction => {
  return { type: GET_ALL_CHARITY_LIST_FAILURE, payload: {} };
};
export const getCharityListReset = (): RooteAction => {
  return { type: GET_ALL_CHARITY_LIST_RESET, payload: {} };
};



export const getBlogDropDownDataSuccess = (obj): RooteAction => {
  return { type: GET_BLOG_DROPDOWN_DATA_SUCCESS, payload: obj };
};
export const getBlogDropDownDataFailure = (): RooteAction => {
  return { type: GET_BLOG_DROPDOWN_DATA_FAILURE, payload: {} };
};

export const addEditCharitySuccess = (obj): RooteAction => {
  return { type: ADD_EDIT_CHARITY_DETAILS_SUCCESS, payload: obj };
};
export const addEditCharityFailure = (): RooteAction => {
  return { type: ADD_EDIT_CHARITY_DETAILS_FAILURE, payload: {} };
};



export const getMyCharityListSuccess = (obj): RooteAction => {
  return { type: GET_MY_CHARITY_LIST_SUCCESS, payload: obj };
};
export const getMyCharityListFailure = (): RooteAction => {
  return { type: GET_MY_CHARITY_LIST_FAUILURE, payload: {} };
};


export const approveCharitySuccess = (obj): RooteAction => {
  return { type: APPROVE_CHYARITY_REQUEST_SUCCESS, payload: obj };
};
export const approveCharityFailure = (): RooteAction => {
  return { type: APPROVE_CHYARITY_REQUEST_FAILURE, payload: {} };
};

