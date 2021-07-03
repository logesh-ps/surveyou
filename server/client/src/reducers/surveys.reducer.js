import ACTION_TYPES from "../actions/types";

const surveysReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_SURVEYS:
      return payload;
    default:
      return state;
  }
};

export default surveysReducer;
