import { RooteAction } from "../store";
import {
  GET_ALL_BLOGS_LIST_FAILURE,
  GET_ALL_BLOGS_LIST_SUCCESS,
  RESET_ALL_BLOG_LIST,
  GET_MY_BLOGS_LIST_FAILURE,
  GET_MY_BLOGS_LIST_SUCCESS,
  RESET_MY_BLOG_LIST,
  DELETE_BLOG_FAILURE,
  DELETE_BLOG_SUCCESS,
  UPDATE_BLOG_STATUS_FAILURE,
  UPDATE_BLOG_STATUS_SUCCESS,
  APPROVE_REJECT_BLOG_SUCCESS,
  APPROVE_REJECT_BLOG_FAILURE,
  ADD_EDIT_BLOG_FAILURE,
  ADD_EDIT_BLOG_SUCCESS,

} from "./blogManagement.type";


export const getAllBlogsListSuccess = (obj): RooteAction => {
  return { type: GET_ALL_BLOGS_LIST_SUCCESS, payload: obj };
};

export const getAllBlogsListFailure = (): RooteAction => {
  return { type: GET_ALL_BLOGS_LIST_FAILURE, payload: {} };
};

export const getAllBlogsListReset = (): RooteAction => {
  return { type: RESET_ALL_BLOG_LIST, payload: {} };
};

export const getMyBlogsListSuccess = (obj): RooteAction => {
  return { type: GET_MY_BLOGS_LIST_SUCCESS, payload: obj };
};

export const getMyBlogsListFailure = (): RooteAction => {
  return { type: GET_MY_BLOGS_LIST_FAILURE, payload: {} };
};

export const getMyBlogsListReset = (): RooteAction => {
  return { type: RESET_MY_BLOG_LIST, payload: {} };
};

export const deleteBlogSuccess = (obj): RooteAction => {
  return { type: DELETE_BLOG_SUCCESS, payload: obj };
};

export const deleteBlogFailure = (): RooteAction => {
  return { type: DELETE_BLOG_FAILURE, payload: {} };
};


export const updateBlogStatusSuccess = (obj): RooteAction => {
  return { type: UPDATE_BLOG_STATUS_SUCCESS, payload: obj };
};

export const updateBlogStatusFailure = (): RooteAction => {
  return { type: UPDATE_BLOG_STATUS_FAILURE, payload: {} };
};



export const approveRejectBlogSuccess = (obj): RooteAction => {
  return { type: APPROVE_REJECT_BLOG_SUCCESS, payload: obj };
};

export const approveRejectBlogFailure = (): RooteAction => {
  return { type: APPROVE_REJECT_BLOG_FAILURE, payload: {} };
};


export const addEditBlogSuccess = (obj): RooteAction => {
  return { type: ADD_EDIT_BLOG_SUCCESS, payload: obj };
};

export const addEditBlogFailure = (): RooteAction => {
  return { type: ADD_EDIT_BLOG_FAILURE, payload: {} };
};