import {
  GET_All_CLUBS,
  GET_All_CLUBS_SUCCESS,
  GET_All_CLUBS_FAILURE,
  ADD_CLUB,
  DELETE_CLUB,
  UPDATE_CLUB,
} from "../Actions/ActionTypes";

const initialState = {
  clubs: [],
  loading: false,
  hasError: false,
  errorResult: "",
};

export default function clubReducer(state = initialState, action) {
  switch (action.type) {
    case GET_All_CLUBS:
      return { ...state, loading: true };

    case GET_All_CLUBS_SUCCESS:
      return { clubs: action.payload, loading: false, hasError: false };

    case ADD_CLUB:
      return { ...state, clubs: state.clubs.concat(action.payload) };

    case UPDATE_CLUB:
      return { ...state, clubs: action.payload };

    case DELETE_CLUB:
      return {
        ...state,
        clubs: state.clubs.filter((club) => club.clubId !== action.payload),
      };

    case GET_All_CLUBS_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        errorResult: action.payload,
      };
    default:
      return state;
  }
}
