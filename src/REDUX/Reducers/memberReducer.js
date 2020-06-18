import {
  GET_All_MEMBERS,
  GET_All_CLUBS_SUCCESS,
  GET_All_MEMBERS_FAILURE,
} from "../Actions/ActionTypes";

const initialState = {
  members: [],
  loading: false,
  hasError: false,
  errorMessage: "",
};

export function memberReducer(state = initialState, action) {
  switch (action.type) {
    case GET_All_MEMBERS:
      return { ...state, loading: true };

    case GET_All_CLUBS_SUCCESS:
      return { members: action.payload, loading: false, hasError: false };

    case GET_All_MEMBERS_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
}
