import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchClubs } from "../Actions/ClubActions";
import Club from "../Components/Club";

const ReduxClubPage = ({ dispatch, clubs, loading, hasError, errorResult }) => {
  //console.log(props);
  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  //console.log(errorResult.message);

  const renderClubs = () => {
    if (loading) return <div>Loading....</div>;
    if (hasError) return <div>Error: {errorResult}</div>;
    return clubs.map((club) => <Club key={club.clubId} club={club} />);
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
