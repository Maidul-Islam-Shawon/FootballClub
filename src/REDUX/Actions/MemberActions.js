import {
  GET_All_MEMBERS,
  GET_All_MEMBERS_SUCCESS,
  GET_All_MEMBERS_FAILURE,
  ADD_MEMBER,
  DELETE_MEMBER,
  UPDATE_MEMBER,
} from "./ActionTypes";
import Axios from "axios";

const Member = {
  memberId: "",
  forename: "",
  surname: "",
  emailAddress: "",
  clubId: "",
  club: {},
};

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

export const updateMember = (member, id) => ({
  type: UPDATE_MEMBER,
  payload: { member, id },
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
          const NewMember = GetDataByPostOrPut(result.data.memberId);
          dispatch(addMember(NewMember));
        }
      );
    } catch (err) {
      dispatch(getAllMembersFailure(err));
    }
  };
}

export function DeleteCurrentMember(id) {
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

export function UpdateCurrentMember(member, id) {
  return function (dispatch) {
    try {
      Axios.put("https://localhost:44375/api/clubmembers/" + id, member).then(
        (result) => {
          const updatedMember = GetDataByPostOrPut(id);
          dispatch(updateMember(updatedMember, id));
        }
      );
    } catch (err) {
      dispatch(getAllMembersFailure(err));
    }
  };
}

function GetDataByPostOrPut(id) {
  Axios.get("https://localhost:44375/api/clubmembers/" + id).then((result) => {
    Member.memberId = result.data.memberId;
    Member.forename = result.data.forename;
    Member.surname = result.data.surname;
    Member.emailAddress = result.data.emailAddress;
    Member.clubId = result.data.clubId;
    Member.club = result.data.club;
  });
  return Member;
}
