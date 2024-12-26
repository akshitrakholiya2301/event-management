import { GET_MY_CHARITY_API } from "../../../Utility/ApiList";
import { te, ts } from "../../../Utility/Toaster";
import { deleteAPI, get, post } from "../../../Utility/httpInterceptor";
import { loading } from "../../Loader/loader.action";
import { getMyCharityListFailure, getMyCharityListSuccess } from "../../charity Management/My Charity/charityManagement.action";
import { AppDispatch } from "../../store";

/**
 * Get My Charity List Data 
 * @param {*} objBody
 * @method getMyCharityListDataApi
 * @url /myCharityListingDonorSide
 * @returns API will return Charity List Data
 */
export const getMyCharityListDataApi =
    (objBody: any = null) =>
        async (dispatch: AppDispatch) => {
            dispatch(loading(true));
            try {
                const response: any = await post(GET_MY_CHARITY_API, objBody);
                if (!response.data.error) {
                    //   ts(response.data.message);
                    return dispatch(getMyCharityListSuccess(response.data.data));
                } else {
                    te(response.data.message);
                    dispatch(getMyCharityListFailure());
                }
            } catch (err) {
                dispatch(getMyCharityListFailure());
            } finally {
                dispatch(loading(false));
            }
        };


