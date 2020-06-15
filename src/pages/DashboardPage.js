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
    </>
  );
};

export default DashboardPage;
