import React from "react";
import Timestamp from "react-timestamp";
import Skeleton from "@material-ui/lab/Skeleton";

function Details(props) {
  const { bio, name, html_url, created_at, updated_at } = props.userdata;

  return (
    <div className="items">
      <span>
        <p className="heading">Name :</p>
        <p>
          {!props.loading ? (
            name
          ) : (
            <Skeleton variant="rect" height={20} width={150} />
          )}
        </p>
      </span>
      <span>
        <p className="heading">Bio&nbsp;:</p>
        <p>
          {!props.loading ? (
            bio
          ) : (
            <Skeleton variant="rect" height={20} width={150} />
          )}
        </p>
      </span>

      <span>
        <p className="heading">Repo Link :</p>
        <p>
          {!props.loading ? (
            <a href={html_url}>{html_url}</a>
          ) : (
            <Skeleton variant="rect" height={20} width={150} />
          )}
        </p>
      </span>
      <span>
        <p className="heading">Joined on :</p>
        <p>
          {!props.loading ? (
            <Timestamp date={created_at} />
          ) : (
            <Skeleton variant="rect" height={20} width={150} />
          )}
        </p>
      </span>

      <span>
        <p className="heading">Last update :</p>
        <p>
          {!props.loading ? (
            <Timestamp date={updated_at} relative />
          ) : (
            <Skeleton variant="rect" height={20} width={150} />
          )}
        </p>
      </span>
    </div>
  );
}

export default Details;
