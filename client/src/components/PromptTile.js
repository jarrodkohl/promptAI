import React from "react";
import { Link } from "react-router-dom";

const PromptTile = (props) => {
  const { id, promptContent } = props

  return (
    <div className="saved-prompt-tile callout">
      <Link to={`/prompts/${id}`}>{promptContent}</Link>
    </div>
  )
}

export default PromptTile;
