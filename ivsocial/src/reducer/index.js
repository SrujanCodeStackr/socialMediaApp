import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postReducer from "./postReducer";

const reducer = combineReducers({authReducer ,postReducer})

export default reducer;