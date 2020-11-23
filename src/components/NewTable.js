import React from "react";
import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Timestamp from "react-timestamp";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function NewTable(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const repos = props.repos;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Repository</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Date Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((repo) => (
                <TableRow key={repo.name}>
                  <TableCell component="th" scope="repo">
                    {repo.name}
                  </TableCell>
                  <TableCell>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                      <Button variant="contained" size="small" color="primary">
                        Visit
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell>
                    <Timestamp date={repo.created_at} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={repos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default NewTable;
