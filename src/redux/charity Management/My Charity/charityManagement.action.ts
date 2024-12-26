import { RooteAction } from "../../store";
import {
  GET_MY_CHARITY_LIST_FAUILURE,
  GET_MY_CHARITY_LIST_SUCCESS,
  GET_MY_CHARITY_RESET
} from "./charityManagement.type";




export const getMyCharityListSuccess = (obj): RooteAction => {
  return { type: GET_MY_CHARITY_LIST_SUCCESS, payload: obj };
};
export const getMyCharityListFailure = (): RooteAction => {
  return { type: GET_MY_CHARITY_LIST_FAUILURE, payload: {} };
};
