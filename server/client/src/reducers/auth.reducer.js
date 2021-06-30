import ACTION_TYPES from "../actions/types";

const authReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_USER:
      return payload || false;
    default:
      return state;
  }
};

export default authReducer;
