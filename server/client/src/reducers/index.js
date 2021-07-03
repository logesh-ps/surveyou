import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import surveysReducer from "./surveys.reducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveysReducer,
});
