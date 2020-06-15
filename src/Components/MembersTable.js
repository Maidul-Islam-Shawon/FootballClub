import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ClubTable(props) {
  const classes = useStyles();

  //console.log(props.clubs);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email Address</TableCell>
            <TableCell align="right">Club Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.members.map((member) => (
            <TableRow key={member.memberId}>
              <TableCell component="th" scope="row">
                {member.forename}
              </TableCell>
              <TableCell align="right">{member.surname}</TableCell>
              <TableCell align="right">{member.emailAddress}</TableCell>
              <TableCell align="right">{member.club.clubName}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <Link to={`/addmember/${member.memberId}`}>
                    <IconButton aria-label="edit">
                      <EditIcon style={{ color: "blue" }} />
                    </IconButton>
                  </Link>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    style={{ color: "red" }}
                    onClick={() => props.deleteMember(member.memberId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
