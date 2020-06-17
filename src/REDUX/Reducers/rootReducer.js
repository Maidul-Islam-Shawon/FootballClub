import { combineReducers } from "redux";
import clubReducer from "./clubReducer";

const rootReducer = combineReducers({
  clubs: clubReducer,
});

export default rootReducer;
