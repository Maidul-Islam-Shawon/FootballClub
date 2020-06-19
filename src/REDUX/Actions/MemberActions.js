import {
  GET_All_MEMBERS,
  GET_All_MEMBERS_SUCCESS,
  GET_All_MEMBERS_FAILURE,
  ADD_MEMBER,
  DELETE_MEMBER,
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

export const addMember = (member) => ({
  type: ADD_MEMBER,
  payload: member,
});

export const deleteMember = (id) => ({
  type: DELETE_MEMBER,
  payload: id,
});

export function fetchAllMembers() {
  return function (dispatch) {
    try {
      dispatch(getAllMembers());
      Axios.get("https://localhost:44375/api/clubmembers").then((result) => {
        dispatch(getAllMembersSuccess(result.data));
      });
    } catch (err) {
      dispatch(getAllMembersFailure(err));
    }
  };
}

export function AddNewMember(member) {
  return function (dispatch) {
    try {
      Axios.post("https://localhost:44375/api/clubmembers", member).then(
        (result) => {
          dispatch(addMember(result.data));
          //console.log("ADD NEW Member:", result.data);
        }
      );
    } catch (err) {
      dispatch(getAllMembersFailure(err));
    }
  };
}

export function DeleteNewMember(id) {
  return function (dispatch) {
    try {
      Axios.delete("https://localhost:44375/api/clubmembers/" + id).then(
        (result) => {
          dispatch(deleteMember(id));
        }
      );
    } catch (err) {
      dispatch(getAllMembersFailure(err));
    }
  };
}
