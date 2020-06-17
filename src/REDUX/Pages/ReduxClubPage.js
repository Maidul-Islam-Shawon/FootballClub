import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchClubs } from "../Actions/ClubActions";
import ReduxClubTable from "../Components/ReduxClubTable";

const ReduxClubPage = ({ dispatch, clubs, loading, hasError, errorResult }) => {
  //console.log(props);
  //const [state, setState] = useState([]);
  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  console.log("All Clubs", clubs);

  const renderClubs = () => {
    if (loading) return <div>Loading....</div>;
    if (hasError) return <div>Error: {errorResult}</div>;
    return <ReduxClubTable clubs={clubs} />;
  };

  return (
    <div>
      <hr />
      <h2 style={{ textAlign: "center" }}>Redux Club Page</h2>
      <hr />
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="default" size="small">
          Back
        </Button>
      </Link>
      &nbsp;&nbsp;
      <Link to="/reduxaddclub" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary" size="small">
          Add
        </Button>
      </Link>
      <br />
      <br />
      {renderClubs()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  clubs: state.clubs.clubs,
  loading: state.clubs.loading,
  hasError: state.clubs.hasError,
  errorResult: state.clubs.errorResult,
});

export default connect(mapStateToProps)(ReduxClubPage);
