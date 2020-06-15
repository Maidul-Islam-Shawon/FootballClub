import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import ClubTable from "../Components/ClubTable";
import { DeleteMessage } from "../Components/TostifyMessage";

const ClubPage = () => {
  const [state, setState] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Axios.get("https://localhost:44375/api/clubs").then(
      (result) => {
        setState(result.data);
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  const deleteClub = (id) => {
    Axios.delete("https://localhost:44375/api/clubs/" + id).then(
      (result) => {
        DeleteMessage();
        setState(state.filter((x) => x.clubId !== id));
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  console.log(state);

  return (
    <div>
      <hr />
      <h2 style={{ textAlign: "center" }}>Club Page</h2>
      <hr />
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="default" size="small">
          Back
        </Button>
      </Link>
      &nbsp; &nbsp;
      <Link to="/addclub" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary" size="small">
          Add
        </Button>
      </Link>
      <br />
      <br />
      <ClubTable clubs={state} deleteClub={deleteClub} />
      <div>{error}</div>
    </div>
  );
};

export default ClubPage;
