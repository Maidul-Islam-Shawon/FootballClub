import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import MembersTable from "../Components/MembersTable";
import { DeleteMessage } from "../Components/TostifyMessage";

const MembersPage = () => {
  const [state, setState] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Axios.get("https://localhost:44375/api/clubmembers").then(
      (result) => {
        setState(result.data);
      },
      (err) => {
        setError(err);
      }
    );
  }, []);

  const deleteMember = (Id) => {
    Axios.delete("https://localhost:44375/api/clubmembers/" + Id).then(
      (result) => {
        DeleteMessage();
        setState(state.filter((member) => member.memberId !== Id));
      },
      (err) => {
        setError(err);
      }
    );
  };

  console.log(state);

  return (
    <div>
      <hr />
      <h2 style={{ textAlign: "center" }}>Members Page</h2>
      <hr />
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="default" size="small">
          Back
        </Button>
      </Link>
      &nbsp; &nbsp;
      <Link to="/addmember" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary" size="small">
          Add
        </Button>
      </Link>
      <br />
      <br />
      <MembersTable members={state} deleteMember={deleteMember} />
    </div>
  );
};

export default MembersPage;
