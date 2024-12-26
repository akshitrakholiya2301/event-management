
import { LoaderAction } from "./loader.action";
import { LOADING } from "./loader.type";
/**
 * Initial state for the loader reducer.
 */
const initialState = {
    /** Indicates whether the loader was successful */
  loading: false,
};
/**
 * Interface for the initial state of the loader reducer.
 */
export interface LoaderReducerInitialState {
  loading: boolean;
}
/**
 * Reducer function for the loader reducer.
 * @param state Current state of the reducer.
 * @param action Action dispatched to the reducer.
 * @returns New state after applying the action.
 */
function loaderReducer(
  state: LoaderReducerInitialState = initialState,
  action: LoaderAction
): LoaderReducerInitialState {
  switch (action.type) {
    case LOADING:

      return { ...state, loading: action.payload };

    default:
      return state;
  }
}
export default loaderReducer;
