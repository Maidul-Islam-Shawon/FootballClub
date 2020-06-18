import { combineReducers } from "redux";
import clubReducer from "./clubReducer";
import { memberReducer } from "./memberReducer";

const rootReducer = combineReducers({
  clubs: clubReducer,
  members: memberReducer,
});

export default rootReducer;
