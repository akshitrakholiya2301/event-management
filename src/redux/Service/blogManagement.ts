import { AppDispatch } from "../store";
import { loading } from "../Loader/loader.action";
import { te, ts } from "../../Utility/Toaster";

import {
    getAllBlogsListFailure,
    getAllBlogsListReset,
    getAllBlogsListSuccess,
    getMyBlogsListFailure,
    getMyBlogsListReset,
    getMyBlogsListSuccess,
    deleteBlogFailure,
    deleteBlogSuccess,
    updateBlogStatusFailure,
    updateBlogStatusSuccess,
    approveRejectBlogFailure,
    approveRejectBlogSuccess,
    addEditBlogFailure,
    addEditBlogSuccess
} from "../blogManagement/blogManagement.action";
import {
    ALL_BLOG_LISTING_API,
    MY_BLOG_LISTING_API,
    DELETE_BLOGS_API,
    UPDATE_BLOGS_STATUS_API,
    APPROVE_REJECT_API,
    ADD_EDIT_BLOG_API
} from "../../Utility/ApiList";
import { deleteAPI, post } from "../../Utility/httpInterceptor";


/**
 * api will get ALL blog listing 
 * @param {*} objBody
 * @method getBlogListAPI
 * @url /blogListingAdminSide
 * @returns API will api will get ALL blog listing 
 */
export const getAllBlogListAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${ALL_BLOG_LISTING_API}`, objBody, true);
                // console.log(response);
                if (!response.data.error) {
                    // ts(response.data.message);
                    return dispatch(getAllBlogsListSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(getAllBlogsListFailure());
                }
            } catch (err) {
                dispatch(getAllBlogsListFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
* api will get my blog listing 
* @param {*} objBody
* @method getBlogListAPI
* @url /blogListingAdminSide
* @returns API will api will get my blog listing 
*/
export const getMyBlogListAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${MY_BLOG_LISTING_API}`, objBody, true);
                // console.log(response);
                if (!response.data.error) {
                    // ts(response.data.message);
                    return dispatch(getMyBlogsListSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(getMyBlogsListFailure());
                }
            } catch (err) {
                dispatch(getMyBlogsListFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
* api will DELETE blog listing 
* @param {*} objBody
* @method getBlogListAPI
* @url /deleteBlogs
* @returns API will api will get blog listing 
*/
export const deleteBlogAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                console.log(objBody)
                const response: any = await deleteAPI(`${DELETE_BLOGS_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(deleteBlogSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(deleteBlogFailure());
                }
            } catch (err) {
                dispatch(deleteBlogFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
* api will update blog listing 
* @param {*} objBody
* @method getBlogListAPI
* @url /updateBlogStatus
* @returns API will api will get blog listing 
*/
export const updateBlogStatusAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${UPDATE_BLOGS_STATUS_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(updateBlogStatusSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(updateBlogStatusFailure());
                }
            } catch (err) {
                dispatch(updateBlogStatusFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
* api will DELETE blog listing 
* @param {*} objBody
* @method getBlogListAPI
* @url /deleteBlogs
* @returns API will api will get blog listing 
*/
export const approveRejectAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${APPROVE_REJECT_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(approveRejectBlogSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(approveRejectBlogFailure());
                }
            } catch (err) {
                dispatch(approveRejectBlogFailure());
            } finally {
                dispatch(loading(false));
            }
        };


/**
* api will DELETE blog listing 
* @param {*} objBody
* @method getBlogListAPI
* @url /deleteBlogs
* @returns API will api will get blog listing 
*/
export const addEditBlogAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(`${ADD_EDIT_BLOG_API}`, objBody);
                // console.log(response);
                if (!response.data.error) {
                    ts(response.data.message);
                    return dispatch(addEditBlogSuccess(response.data));
                } else {
                    te(response.data.message);
                    dispatch(addEditBlogFailure());
                }
            } catch (err) {
                dispatch(addEditBlogFailure());
            } finally {
                dispatch(loading(false));
            }
        };