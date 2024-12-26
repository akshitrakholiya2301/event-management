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

export interface BlogsManagementInitializeState {
  blogsData: any;
  deleteBlg: any;
  updateStatus: any;
  approveReject: any;
  addEditBlog: any;
  loading: boolean;
}
/** Define the initial state */
const initialState: BlogsManagementInitializeState = {

  blogsData: [],
  deleteBlg: null,
  updateStatus: null,
  approveReject: null,
  addEditBlog: null,
  loading: false,
};

function BlogsManagementReducer(
  state: BlogsManagementInitializeState = initialState,
  action: RooteAction
): BlogsManagementInitializeState {
  switch (action.type) {
    case GET_ALL_BLOGS_LIST_SUCCESS:
      return {
        ...state,
        blogsData: action.payload,
        loading: false,
      };
    case GET_ALL_BLOGS_LIST_FAILURE:
      return {
        ...state,
        blogsData: null,
        loading: false,
      };
    case RESET_ALL_BLOG_LIST:
      return {
        ...state,
        blogsData: null,
        loading: false,
      };


    case GET_MY_BLOGS_LIST_SUCCESS:
      return {
        ...state,
        blogsData: action.payload,
        loading: false,
      };
    case GET_MY_BLOGS_LIST_FAILURE:
      return {
        ...state,
        blogsData: null,
        loading: false,
      };
    case RESET_MY_BLOG_LIST:
      return {
        ...state,
        blogsData: null,
        loading: false,
      };

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        deleteBlg: action.payload,
        loading: false,
      };
    case DELETE_BLOG_FAILURE:
      return {
        ...state,
        deleteBlg: null,
        loading: false,
      };

    case UPDATE_BLOG_STATUS_SUCCESS:
      return {
        ...state,
        updateStatus: action.payload,
        loading: false,
      };
    case UPDATE_BLOG_STATUS_FAILURE:
      return {
        ...state,
        updateStatus: null,
        loading: false,
      };

    case APPROVE_REJECT_BLOG_SUCCESS:
      return {
        ...state,
        approveReject: action.payload,
        loading: false,
      };
    case APPROVE_REJECT_BLOG_FAILURE:
      return {
        ...state,
        approveReject: null,
        loading: false,
      };
    case ADD_EDIT_BLOG_SUCCESS:
      return {
        ...state,
        addEditBlog: action.payload,
        loading: false,
      };
    case ADD_EDIT_BLOG_FAILURE:
      return {
        ...state,
        addEditBlog: null,
        loading: false,
      };




    default:
      return state;
  }
}
export default BlogsManagementReducer;