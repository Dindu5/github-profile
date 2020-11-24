import React from "react";
import { useState, useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import TextField from "@material-ui/core/TextField";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";

import NewTable from "./components/NewTable";
import Details from "./components/Details";
import Main from "./components/Main";
import CancelIcon from "@material-ui/icons/Cancel";

export default function App() {
  const [search, setsearch] = useState("example");
  const [userSearch, setUserSearch] = useState("");
  const [userdata, setUserData] = useState({});
  const [repositores, setRepositores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const message = useRef();

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
        console.log("there was an error", err.message);
        const messageBox = message.current;

        if (err.message === "Network Error") {
          setError("Oops... Seems Your Internet Disconnected");
        } else {
          setError("There was an error.. sem");
        }
        //messageBox.classList.add("open");
      });
  }, [search]);

  const repos = Array.from(repositores);

  const captureInput = (e) => {
    setUserSearch(e.target.value);
  };

  const fetchUser = (e, userSearch) => {
    e.preventDefault();
    setLoading(true);
    if (userSearch !== "") {
      setsearch(userSearch);
      setUserSearch("");
    }
  };

  const closeError = (e) => {
    const parent = e.currentTarget.parentElement;
    parent.classList.remove("open");
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
        {/* Main Details */}
        s
        <Main loading={loading} userdata={userdata} />
        <div className="others">
          {/* User Details */}

          <div id="content1">
            <Details userdata={userdata} loading={loading} />
          </div>

          {/* Repositories */}
          <div id="content4">
            {!loading ? (
              <NewTable repos={repos} />
            ) : (
              <Skeleton variant="rect" height="20vh" width="100%" />
            )}
          </div>
        </div>
      </div>
      <div className="error-message" ref={message}>
        <p className="error">{error}</p>
        <CancelIcon
          onClick={(e) => {
            closeError(e);
          }}
        />
      </div>
    </div>
  );
}
