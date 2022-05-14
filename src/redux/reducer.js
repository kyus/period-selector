import { combineReducers } from "redux";
import period from "./period";
import openedSelectBox from "./openedSelectBox";

const rootReducer = combineReducers({ period, openedSelectBox });

export default rootReducer;
