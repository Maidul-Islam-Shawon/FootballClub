import {
  GET_All_MEMBERS,
  GET_All_MEMBERS_SUCCESS,
  GET_All_MEMBERS_FAILURE,
} from "./ActionTypes";
import Axios from "axios";

export const getAllMembers = () => ({
  type: GET_All_MEMBERS,
});

export const getAllMembersSuccess = (members) => ({
  type: GET_All_MEMBERS_SUCCESS,
  payload: members,
});

export const getAllMembersFailure = (error) => ({
  type: GET_All_MEMBERS_FAILURE,
  payload: error,
});

export function fetchAllMembers() {
  return function (dispatch) {
    dispatch(getAllMembers());
    Axios.get("https://localhost:44375/api/clubmembers").then(
      (result) => {
        dispatch(getAllMembersSuccess(result.data));
      },
      (err) => dispatch(getAllMembersFailure(err))
    );
  };
}
