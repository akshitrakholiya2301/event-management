import {
  GET_DATA_FOR_DROPDOWN_SUCCESS,
  GET_DATA_FOR_DROPDOWN_FAILURE,
  RESET_GENERIC_DATA,
  GET_ALL_NOTIFICATION_SUCCESS,
  GET_ALL_NOTIFICATION_FAILURE,
  GET_WEBSOCKET_CONNECTION_SUCCESS,
  GET_WEBSOCKET_CONNECTION_FAILURE,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
  DEFAULT_REDUX_SUCCESS,
  DEFAULT_REDUX_FAILURE,
  GET_COUNTRY_PHONE_CODE_SUCCESS,
  GET_COUNTRY_PHONE_CODE_FAILURE,
  GET_TAG_DROP_DOWN_DATA_FAILURE,
  GET_TAG_DROP_DOWN_DATA_SUCCESS,
} from "./generic.type";
import { RooteAction } from "../store";
import {
  GET_STATES_SUCCESS,
  GET_STATES_FAILURE,
  GET_CITY_SUCCESS,
  GET_CITY_FAILURE,
} from "./generic.type";

/**
 * Action creator for successful retrieval of data for dropdowns.
 * @param obj Data for dropdowns.
 * @returns Action object.
 */
export const getDataForDropdownSuccess = (obj: any): RooteAction => {
  return { type: GET_DATA_FOR_DROPDOWN_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of data for dropdowns.
 * @returns Action object.
 */
export const getDataForDropdownFailure = (): RooteAction => {
  return { type: GET_DATA_FOR_DROPDOWN_FAILURE, payload: {} };
};

/**
 * Action creator for successful retrieval of all notifications.
 * @param obj Notification data.
 * @returns Action object.
 */
export const getAllNotificationSuccess = (obj: any): RooteAction => {
  return { type: GET_ALL_NOTIFICATION_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of all notifications.
 * @returns Action object.
 */
export const getAllNotificationFailure = (): RooteAction => {
  return { type: GET_ALL_NOTIFICATION_FAILURE, payload: {} };
};

/**
 * Action creator for successful WebSocket connection.
 * @param obj WebSocket connection data.
 * @returns Action object.
 */
export const getWebSocketSuccess = (obj: any): RooteAction => {
  return { type: GET_WEBSOCKET_CONNECTION_SUCCESS, payload: true };
};

/**
 * Action creator for failed WebSocket connection.
 * @param obj WebSocket connection data.
 * @returns Action object.
 */
export const getWebSocketFailure = (obj: any): RooteAction => {
  return { type: GET_WEBSOCKET_CONNECTION_FAILURE, payload: false };
};

/**
 * Action creator for successful retrieval of states.
 * @param obj State data.
 * @returns Action object.
 */
export const getStatesSuccess = (obj: any): RooteAction => {
  return { type: GET_STATES_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of states.
 * @returns Action object.
 */
export const getStatesFailure = (): RooteAction => {
  return { type: GET_STATES_FAILURE, payload: {} };
};

/**
 * Action creator for successful retrieval of cities.
 * @param obj City data.
 * @returns Action object.
 */
export const getCitySuccess = (obj: any): RooteAction => {
  return { type: GET_CITY_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of cities.
 * @returns Action object.
 */
export const getCityFailure = (): RooteAction => {
  return { type: GET_CITY_FAILURE, payload: {} };
};

/**
 * Action creator for successful retrieval of countries.
 * @param obj Country data.
 * @returns Action object.
 */
export const getCountrySuccess = (obj: any): RooteAction => {
  return { type: GET_COUNTRY_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of countries.
 * @returns Action object.
 */
export const getCountryFailure = (): RooteAction => {
  return { type: GET_COUNTRY_FAILURE, payload: {} };
};

export const getCountryPhoneCodeSuccess = (obj: any): RooteAction => {
  return { type: GET_COUNTRY_PHONE_CODE_SUCCESS, payload: obj };
};

export const getCountryPhoneCodeFailure = (): RooteAction => {
  return { type: GET_COUNTRY_PHONE_CODE_FAILURE, payload: {} };
};

/**
 * Action creator for resetting generic data.
 * @returns Action object.
 */
export const resetGenericData = (): RooteAction => {
  return { type: RESET_GENERIC_DATA, payload: {} };
};

/**
 * Action creator for successful default Redux operation.
 * @param obj Data for default Redux operation.
 * @returns Action object.
 */
export const defaultReduxSuccess = (obj: any): RooteAction => {
  return { type: DEFAULT_REDUX_SUCCESS, payload: obj };
};

/**
 * Action creator for failed default Redux operation.
 * @returns Action object.
 */
export const defaultReduxFailure = (): RooteAction => {
  return { type: DEFAULT_REDUX_FAILURE, payload: {} };
};


/**
 * Action creator function to dispatch action when Tag DropDown Data  is successful.
 * @param obj Object containing Publisher DropDown Data.
 * @returns Action object with type and payload.
 */
export const getTagDropDownDataSuccess = (obj): RooteAction => {
  return { type: GET_TAG_DROP_DOWN_DATA_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when Tag DropDown Data fails.
 * @returns Action object with type and an empty payload.
 */
export const getTagDropDownDataFailure = (): RooteAction => {
  return { type: GET_TAG_DROP_DOWN_DATA_FAILURE, payload: {} };
}