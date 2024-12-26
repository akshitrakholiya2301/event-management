import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
/** Creating the Redux store with middleware and DevTools integration */
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
/**Defining types for better type safety  */
/** Type representing the state of the Redux store */
export type RootState = ReturnType<typeof store.getState>;
/** Type representing the dispatch function of the Redux store */
export type AppDispatch = typeof store.dispatch;
/**Type representing a Redux action  */
export type RooteAction = { type: string; payload: any };

export default store;