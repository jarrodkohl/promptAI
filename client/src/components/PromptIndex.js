import React from "react";
import { useEffect, useState } from "react";

import PromptTile from "./PromptTile";

const PromptIndex = props => {
  const [userPrompts, setUserPrompts] = useState([])

  const getUserPrompts = async () =>{
      try {
        const response = await fetch(`/api/v1/prompts?order=desc`)
        const data = await response.json()
        setUserPrompts(data.prompts)
      } catch (error) {
        console.error(error)
      }
  }

  useEffect(() =>{
    getUserPrompts()
  }, [])

  const promptTiles = userPrompts.map(prompt =>{
    return(
      <PromptTile
      key={prompt.id}
      id={prompt.id}
      promptContent={prompt.promptContent}
      />
    )
  })

  return(
    <div className="grid-container prompt-list-container">
      <div className="user-profile-prompt">
      <h1>{props.user.email}'s Saved Prompts!</h1>
      </div>

      <div className="grid-x grid-margin-x prompt-tiles-container">
        {promptTiles}
      </div>
    </div>
  )

}

export default PromptIndex