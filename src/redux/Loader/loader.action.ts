import { LOADING } from "./loader.type";

export interface LoaderAction {
  type: string;
  payload: boolean;
}
/**
 * Action creator for setting loading state.
 * @param obj Loading state value.
 * @returns Action object to set loading state.
 */
export const loading = (obj: boolean): LoaderAction => {

  return { type: LOADING, payload: obj };
};
