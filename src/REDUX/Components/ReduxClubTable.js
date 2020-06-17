import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Tooltip, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 410,
  },
});

const ReduxClubTable = ({ clubs, handleDelete }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Club Name</TableCell>
              <TableCell align="right">Address Line 1</TableCell>
              <TableCell align="right">Town</TableCell>
              <TableCell align="right">Post Code</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clubs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((club) => (
                <TableRow key={club.clubId} hover role="checkbox" tabIndex={-1}>
                  <TableCell component="th" scope="row">
                    {club.clubName}
                  </TableCell>
                  <TableCell align="right">{club.addressLine1}</TableCell>
                  <TableCell align="right">{club.town}</TableCell>
                  <TableCell align="right">{club.postcode}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <Link to={`/reduxaddclub/${club.clubId}`}>
                        <IconButton aria-label="edit">
                          <EditIcon style={{ color: "blue" }} />
                        </IconButton>
                      </Link>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "red" }}
                        onClick={() => handleDelete(club.clubId)}
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={clubs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ReduxClubTable;
