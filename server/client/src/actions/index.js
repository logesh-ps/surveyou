import axios from "axios";

import ACTION_TYPES from "./types";

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/api/user");
  dispatch({ type: ACTION_TYPES.SET_USER, payload: response.data });
};

export const handleStripeToken = (token) => async (dispatch) => {
  const response = await axios.post("/api/stripe", token);
  dispatch({ type: ACTION_TYPES.SET_USER, payload: response.data });
};

export const createSurvey = (payload, history) => async (dispatch) => {
  const response = await axios.post("/api/surveys", payload);

  history.push("/surveys");
  dispatch({ type: ACTION_TYPES.SET_USER, payload: response.data });
};
