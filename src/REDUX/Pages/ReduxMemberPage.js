import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchAllMembers, DeleteNewMember } from "../Actions/MemberActions";
import ReduxMemberTable from "../Components/ReduxMemberTable";

const ReduxMemberPage = ({
  dispatch,
  members,
  loading,
  hasError,
  errorMessage,
}) => {
  useEffect(() => {
    dispatch(fetchAllMembers());
  }, [dispatch]);

  //console.log(members);

  const deleteMember = (id) => {
    dispatch(DeleteNewMember(id));
  };

  const renderMemberTable = () => {
    if (loading) return <div>Members Data Loading.....</div>;
    if (hasError) return <div>{errorMessage}</div>;
    return <ReduxMemberTable members={members} deleteMember={deleteMember} />;
  };
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
      {renderMemberTable()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  members: state.members.members,
  loading: state.members.loading,
  hasError: state.members.hasError,
  errorMessage: state.members.errorMessage,
});

export default connect(mapStateToProps)(ReduxMemberPage);
