import React, { useEffect, useState } from "react";

const PromptShowPage = ({ match }) => {
  const [showPrompt, setShowPrompt] = useState({
    promptContent: ""
  })

  const { id } = match.params

  const getPromptPage = async () => {
    try {
      const response = await fetch(`/api/v1/prompts/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage);
        throw error;
      }
      const { prompt } = await response.json()
      setShowPrompt({ promptContent: prompt.promptContent })
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getPromptPage()
  }, [])


  return (
    <div>
      <p className="callout saved-prompt-tile">{showPrompt.promptContent}</p>
    </div>
  )
}

export default PromptShowPage



