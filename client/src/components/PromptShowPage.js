import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import EntryForm from "./EntryForm";
import EntryTile from "./EntryTile";

const PromptShowPage = ({ match }) => {
  const [showPrompt, setShowPrompt] = useState({
    promptContent: ""
  })

  const [entries, setEntries] = useState([])
  const [deletedPrompt, setDeletedPrompt] = useState(false)

  const { id } = match.params

  const getPromptPage = async () => {
    try {
      const promptResponse = await fetch(`/api/v1/prompts/${id}`)
      if (!promptResponse.ok) {
        const errorMessage = `${promptResponse.status} (${promptResponse.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const { prompt } = await promptResponse.json()
      setShowPrompt({ promptContent: prompt.promptContent })
      
      const entriesResponse = await fetch(`/api/v1/prompts/${id}/entries`)
      if (!entriesResponse.ok) {
        const errorMessage = `${entriesResponse.status} (${entriesResponse.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const { entries } = await entriesResponse.json()
      setEntries(entries)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  };

  const addEntry = (newEntry) => {
    setEntries([...entries, newEntry])
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/v1/prompts/${id}`, {
        method: "DELETE"
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      setDeletedPrompt(true)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getPromptPage()
  }, []);

  const entryTiles = entries.map(entry => (
    <EntryTile key={entry.id} entry={entry} />
  ))

  if (deletedPrompt) {
    return <Redirect to="/prompts" />;
  }

  return (
    <div className="prompt-show-main callout">
      <h2>Prompt:</h2>
      <p className="saved-prompt-tile">{showPrompt.promptContent}</p>
      <button className="orange-btn" onClick={handleDelete}>
        Delete Prompt
      </button>
      <EntryForm promptId={id} addEntry={addEntry} />
      <h3 className="entry-list-title">Saved Entries</h3>
      <div className="entry-tile-container">
      {entryTiles}
      </div>
    </div>
  )
}

export default PromptShowPage
