import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));

const ClubWithMembers = () => {
  const [state, setState] = useState([]);
  const [membersState, setMembersState] = useState([]);
  const [error, setError] = useState("");
  const classes = useStyles();

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

  const [clubName, SetClubName] = useState("");
  const handleMembers = (id) => {
    // console.log(id);
    Axios.get("https://localhost:44375/api/clubs/" + id).then(
      (result) => {
        setMembersState(result.data.clubMembers);
        SetClubName(result.data.clubName);
      },
      (err) => {
        setError(err);
      }
    );
  };
  console.log("members:", membersState);

  let membersList;

  membersList = (
    <TableBody>
      {membersState.map((member) => (
        <TableRow key={member.memberId}>
          <TableCell component="th" scope="row">
            {member.forename}
          </TableCell>
          <TableCell align="right">{member.surname}</TableCell>
          <TableCell align="right">{member.emailAddress}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
  return (
    <div>
      <hr />
      <h2 style={{ textAlign: "center" }}>Club With Members</h2>
      <hr />
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="default" size="small">
          Back
        </Button>
      </Link>
      <br />
      <br />
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h2>Clubs List</h2>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Club Name</TableCell>
                      <TableCell>Town</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.map((club) => (
                      <TableRow
                        hover
                        onClick={() => handleMembers(club.clubId)}
                        key={club.clubId}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className="mouseHover"
                        >
                          {club.clubName}
                        </TableCell>

                        <TableCell>{club.town}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <h2>Club: {clubName}</h2>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell align="right">Last Name</TableCell>
                      <TableCell align="right">Email Address</TableCell>
                    </TableRow>
                  </TableHead>
                  {membersList}
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ClubWithMembers;
