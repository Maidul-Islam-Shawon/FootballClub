import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const DashboardPage = () => {
  return (
    <>
      <hr />
      <h2 style={{ textAlign: "center" }}>Dashboard Page</h2>
      <hr />
      <br />
      <br />
      <Link to="/club" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" size="large">
          Clubs
        </Button>
      </Link>
      <br />
      <br />
      <Link to="/members" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary" size="large">
          Members
        </Button>
      </Link>
      <br />
      <br />
      <Link to="/clubwithmembers" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="default" size="large">
          Club with Members
        </Button>
      </Link>
      <br />
      <br />
      <hr />
      <h2 style={{ textAlign: "center" }}>Redux Section</h2>
      <hr />
      <br />
      <Link to="/reduxclub" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" size="large">
          Redux Club Page
        </Button>
      </Link>
      <br />
      <br />
      <Link to="/reduxmember" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary" size="large">
          Redux Members Page
        </Button>
      </Link>{" "}
      <br />
      <br />
      <Link to="/reduxclubwithmembers" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="default" size="large">
          ReduxClub With Members Page
        </Button>
      </Link>
    </>
  );
};

export default DashboardPage;
