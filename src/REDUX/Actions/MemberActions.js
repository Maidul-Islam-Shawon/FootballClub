import {
  GET_All_MEMBERS,
  GET_All_MEMBERS_SUCCESS,
  GET_All_MEMBERS_FAILURE,
  ADD_MEMBER,
  DELETE_MEMBER,
  UPDATE_MEMBER,
} from "./ActionTypes";
import Axios from "axios";

const NewMember = {
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
          Axios.get(
            "https://localhost:44375/api/clubmembers/" + result.data.memberId
          ).then((result) => {
            NewMember.memberId = result.data.memberId;
            NewMember.forename = result.data.forename;
            NewMember.surname = result.data.surname;
            NewMember.emailAddress = result.data.emailAddress;
            NewMember.clubId = result.data.clubId;
            NewMember.club = result.data.club;
          });
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
          NewMember.memberId = member.memberid;
          NewMember.forename = member.forename;
          NewMember.surname = member.surname;
          NewMember.emailAddress = member.emailAddress;
          NewMember.clubId = member.clubId;
          //NewMember.club = result.data.club;

          dispatch(updateMember(NewMember, id));
          //console.log("update member: ", member.memberId, member.forename);
        }
      );
    } catch (err) {
      dispatch(getAllMembersFailure(err));
    }
  };
}
