import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import TextField from "@material-ui/core/TextField";

import PersonIcon from "@material-ui/icons/Person";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function App() {
  const classes = useStyles();

  const [search, setsearch] = useState("example");
  const [userSearch, setUserSearch] = useState("");
  const [userdata, setUserData] = useState({});
  const [repositores, setRepositores] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    const url1 = `https://api.github.com/users/${search}`;
    const url2 = `https://api.github.com/users/${search}/repos`;

    const userDetails = axios.get(url1);
    const repoDetails = axios.get(url2);

    axios
      .all([userDetails, repoDetails])
      .then(
        axios.spread((...allData) => {
          const res1 = allData[0];
          const res2 = allData[1];

          setUserData(res1.data);
          setRepositores(res2.data);
          setLoading(false);
        })
      )
      .catch((err) => {
        console.log("there was an error", err.response);
      });
  }, [search]);

  const repos = Array.from(repositores);
  console.log("repoarray =", repos);

  const {
    login,
    followers,
    public_repos,
    avatar_url,
    bio,
    following,
    name,
    location,
    html_url,
    twitter_username,
    created_at,
    updated_at,
  } = userdata;

  const captureInput = (e) => {
    setUserSearch(e.target.value);
  };

  const fetchUser = (e, userSearch) => {
    e.preventDefault();
    setLoading(true);
    if (userSearch !== "") {
      setsearch(userSearch);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <NavBar />

      <form
        onSubmit={(e) => {
          fetchUser(e, userSearch);
        }}
      >
        <TextField
          id="outlined-basic"
          label="GitHub Name"
          variant="outlined"
          onKeyUp={(e) => captureInput(e)}
        />
        <button>Submit</button>
      </form>

      <div className="grid">
        <div id="main-profile">
          <div className="img-container">
            <img src={avatar_url} alt="GitHub User" />
          </div>

          <div className="meta">
            <h2>{login}</h2>
          </div>

          <div className="details">
            <span>
              <BusinessCenterIcon />
              <p> {public_repos} Repo(s)</p>
            </span>
            <span>
              <GroupAddIcon />
              <p>{followers} Followers</p>
            </span>
            <span>
              <PersonIcon />
              <p>{following} Following</p>
            </span>
          </div>
        </div>

        <div id="content1">
          <div className="items">
            <span>
              <p className="heading">Name :</p>
              <p>{name}</p>
            </span>
            <span>
              <p className="heading">Bio :</p>
              <p>{bio}</p>
            </span>
            <span>
              <p className="heading">Location :</p>
              <p>{location}</p>
            </span>
            {!loading ? (
              <span>
                <p className="heading">Repo Link :</p>
                <a href={html_url}>{html_url}</a>
              </span>
            ) : (
              <Skeleton variant="text" height={10} />
            )}
          </div>
        </div>

        <div id="content4">
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
                        <a href={repo.html_url} target="_blank">
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                          >
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
      </div>
    </div>
  );
}
