import {
  GET_All_MEMBERS,
  GET_All_MEMBERS_SUCCESS,
  GET_All_MEMBERS_FAILURE,
  ADD_MEMBER,
  DELETE_MEMBER,
  UPDATE_MEMBER,
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

    case GET_All_MEMBERS_SUCCESS:
      return { members: action.payload, loading: false, hasError: false };

    case GET_All_MEMBERS_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        errorMessage: action.payload.message,
      };

    case ADD_MEMBER:
      return {
        ...state,
        members: state.members.concat(action.payload),
      };

    case UPDATE_MEMBER:
      return {
        ...state,
        members: state.members.map((member) =>
          member.memberId === action.payload.id ? action.payload.member : member
        ),
      };

    case DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter((x) => x.memberId !== action.payload),
      };

    default:
      return state;
  }
}
