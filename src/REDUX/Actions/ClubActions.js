import Axios from "axios";
import {
  GET_All_CLUBS,
  GET_All_CLUBS_SUCCESS,
  GET_All_CLUBS_FAILURE,
  ADD_CLUB,
  DELETE_CLUB,
  UPDATE_CLUB,
} from "./ActionTypes";

export const getAllClubs = () => ({
  type: GET_All_CLUBS,
});

export const getAllClubsSuccess = (clubs) => ({
  type: GET_All_CLUBS_SUCCESS,
  payload: clubs,
});

export const getAllClubsFailure = (error) => ({
  type: GET_All_CLUBS_FAILURE,
  payload: error,
});

export const addClub = (club) => ({
  type: ADD_CLUB,
  payload: club,
});

export const deleteClub = (id) => ({
  type: DELETE_CLUB,
  payload: id,
});

export const updateClub = (id, club) => ({
  type: UPDATE_CLUB,
  payload: { id, club },
});

export function fetchClubs() {
  return function (dispatch) {
    dispatch(getAllClubs());
    Axios.get("https://localhost:44375/api/clubs").then(
      (result) => {
        dispatch(getAllClubsSuccess(result.data));
      },
      (err) => {
        dispatch(getAllClubsFailure(err));
      }
    );
  };
}

export function addNewClub(club) {
  return function (dispatch) {
    try {
      Axios.post("https://localhost:44375/api/clubs", club).then((result) => {
        dispatch(addClub(result.data));
      });
    } catch (err) {
      dispatch(getAllClubsFailure(err));
    }
  };
}

export function deleteNewClub(id) {
  return function (dispatch) {
    try {
      Axios.delete("https://localhost:44375/api/clubs/" + id).then((result) => {
        dispatch(deleteClub(id));
      });
    } catch (err) {
      dispatch(getAllClubsFailure(err));
    }
  };
}

export function updateNewClub(id, club) {
  return function (dispatch) {
    try {
      Axios.put("https://localhost:44375/api/clubs/" + id, club).then(
        (result) => {
          dispatch(updateClub(result.data));
        }
      );
    } catch (err) {
      dispatch(getAllClubsFailure(err));
    }
  };
}
