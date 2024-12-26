import { ADD_EDIT_CHARITY_API, GET_ALL_CHARITY_LIST_API, GET_BLOG_DROP_DOWN_DATA_API, APPROVE_REQUEST_FOR_CHARITY_API } from "../../../Utility/ApiList";
import { te, ts } from "../../../Utility/Toaster";
import { deleteAPI, get, post } from "../../../Utility/httpInterceptor";
import { loading } from "../../Loader/loader.action";
import {
    getAllCharityListFailure, getAllCharityListSuccess, getBlogDropDownDataFailure, getBlogDropDownDataSuccess, addEditCharityFailure,
    addEditCharitySuccess, approveCharityFailure, approveCharitySuccess
} from "../../charity Management/All Charity/charityManagement.action";

import { AppDispatch } from "../../store";

/**
 * Get Charity List Data 
 * @param {*} objBody
 * @method getCharityListDataApi
 * @url /charityLisitngAdminSide
 * @returns API will return Charity List Data
 */
export const getCharityListDataApi =
    (objBody: any = null) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(GET_ALL_CHARITY_LIST_API, objBody);
                if (!response.data.error) {
                    //   ts(response.data.message);
                    return dispatch(getAllCharityListSuccess(response.data.data));
                } else {
                    te(response.data.message);
                    dispatch(getAllCharityListFailure());
                }
            } catch (err) {
                dispatch(getAllCharityListFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
 * Get blog dropdown List Data 
 * @param {*} objBody
 * @method getBlogDropDownDataApi
 * @url /getBlogsDetails
 * @returns API will return blog dropdown data
 */
export const getBlogDropDownDataApi =
    (objBody: any = null) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await get(GET_BLOG_DROP_DOWN_DATA_API);
                if (!response.data.error) {
                    //   ts(response.data.message);
                    return dispatch(getBlogDropDownDataSuccess(response.data.data));
                } else {
                    te(response.data.message);
                    dispatch(getBlogDropDownDataFailure());
                }
            } catch (err) {
                dispatch(getBlogDropDownDataFailure());
            } finally {
                dispatch(loading(false));
            }
        };



/**
 * addEdit charity 
 * @param {*} objBody
 * @method addEditCharityApi
 * @url /addEditCharity
 * @returns API will add edit charity
 */
export const addEditCharityApi =
    (objBody: any = null) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(ADD_EDIT_CHARITY_API, objBody);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(addEditCharitySuccess(response.data.data));
                } else {
                    te(response.data.message);
                    dispatch(addEditCharityFailure());
                }
            } catch (err) {
                dispatch(addEditCharityFailure());
            } finally {
                dispatch(loading(false));
            }
        };



/**
 * approve charity charity Request 
 * @param {*} objBody
 * @method approveCharityRequest
 * @url /approveDeclineCharityRequest
 * @returns API will add edit charity
 */
export const approveCharityRequestApi =
    (objBody: any = null) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(APPROVE_REQUEST_FOR_CHARITY_API, objBody);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(approveCharitySuccess(response.data.data));
                } else {
                    te(response.data.message);
                    dispatch(approveCharityFailure());
                }
            } catch (err) {
                dispatch(approveCharityFailure());
            } finally {
                dispatch(loading(false));
            }
        };


