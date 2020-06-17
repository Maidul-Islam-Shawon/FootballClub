import Axios from "axios";
import {
  GET_All_CLUBS,
  GET_All_CLUBS_SUCCESS,
  GET_All_CLUBS_FAILURE,
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
