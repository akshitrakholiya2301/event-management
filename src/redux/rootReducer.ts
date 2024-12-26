import { combineReducers } from "redux";
import appReducer from './Loader/loader.reducer';


import genericReducer from "./generic/generic.reducer";
import loaderReducer from "./Loader/loader.reducer";
import ForgetPasswordReducer from './forgotPassword/forgotPassword.reducer';
import SettingsReducer from "./settings/settings.reducer";
import BlogsManagementReducer from "./blogManagement/blogManagement.reducer";
import CharityManagementReducer from "./charity Management/All Charity/charityManagement.reducer";
import MyCharityManagementReducer from "./charity Management/My Charity/charityManagement.reducer";
/**Combining multiple reducers into a single root reducer  */
const rootReducer = combineReducers({

    genericReducer,
    loaderReducer,
    ForgetPasswordReducer,
    SettingsReducer,
    BlogsManagementReducer,
    CharityManagementReducer,
    MyCharityManagementReducer

})
/** Defining types for better type safety */
export type rootReducerType = ReturnType<typeof rootReducer>;
export type LoaderReducerType = ReturnType<typeof loaderReducer>;
export type genericReducerType = ReturnType<typeof genericReducer>;
export default rootReducer;