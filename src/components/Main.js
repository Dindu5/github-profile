import React from "react";

import PersonIcon from "@material-ui/icons/Person";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import TwitterIcon from "@material-ui/icons/Twitter";
import Skeleton from "@material-ui/lab/Skeleton";

function Main(props) {
  const {
    login,
    followers,
    public_repos,
    avatar_url,
    following,
    location,
    twitter_username,
  } = props.userdata;

  return (
    <div id="main-profile">
      <div className="img-container">
        {!props.loading ? (
          <img src={avatar_url} alt="GitHub User" />
        ) : (
          <Skeleton variant="circle" width="100%" height="13vh" />
        )}
      </div>

      <div className="meta">
        {!props.loading ? (
          <h2>{login}</h2>
        ) : (
          <Skeleton variant="rect" width="100%" height={15} />
        )}
      </div>

      <div className="details">
        <span>
          <BusinessCenterIcon />
          <p>{public_repos} Repo(s)</p>
        </span>
        <span>
          <GroupAddIcon />
          <p>{followers} Followers</p>
        </span>
        <span>
          <PersonIcon />
          <p>{following} Following</p>
        </span>
        <span>
          <LocationOnIcon />
          <p>{location}</p>
        </span>
        <span>
          <TwitterIcon />
          <p>{twitter_username}</p>
        </span>
      </div>
    </div>
  );
}

export default Main;
