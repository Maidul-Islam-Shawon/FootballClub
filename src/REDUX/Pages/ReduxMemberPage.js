import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchAllMembers } from "../Actions/MemberActions";

const ReduxMemberPage = (props) => {
  useEffect(() => {
    props.dispatch(fetchAllMembers());
  }, []);
  console.log(props);
  return (
    <div>
      <hr />
      <h2 style={{ textAlign: "center" }}>Redux Members Page</h2>
      <hr />
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="default" size="small">
          Back
        </Button>
      </Link>
      &nbsp;&nbsp;
      <Link to="/reduxaddmember" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary" size="small">
          Add
        </Button>
      </Link>
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => ({
  members: state.members.members,
  loading: state.members.loading,
  hasError: state.members.hasError,
});

export default connect(mapStateToProps)(ReduxMemberPage);
