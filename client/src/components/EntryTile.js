import React from "react";
import { Link } from "react-router-dom";

const EntryTile = ({ entry }) => {
  return (
    <div className="cell ">
        <div className="card entry-tile">
      <Link to={`/prompts/${entry.promptId}/entries/${entry.id}`}>
          <h3>{entry.title}</h3>
      </Link>
          <p>{entry.label}</p>
        </div>
    </div>
  );
};

export default EntryTile;
