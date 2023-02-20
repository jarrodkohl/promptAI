import React from "react";
import { useEffect, useState } from "react";

import PromptTile from "./PromptTile";

const PromptIndex = props => {
  const [userPrompts, setUserPrompts] = useState([])

  const getUserPrompts = async () =>{
      try {
        const response = await fetch(`/api/v1/prompts?userId=${props.user.id}&order=desc`)
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
    <div>
      <h1>{props.user.email}'s Saved Prompts!</h1>

      <div>
        {promptTiles}
      </div>
    </div>
  )

}

export default PromptIndex