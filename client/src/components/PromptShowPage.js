import React, { useEffect, useState } from "react";
import EntryForm from "./EntryForm";
import EntryTile from "./EntryTile";

const PromptShowPage = ({ match }) => {
  const [showPrompt, setShowPrompt] = useState({
    promptContent: ""
  })

  const [entries, setEntries] = useState([])

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

  useEffect(() => {
    getPromptPage()
  }, []);

  const entryTiles = entries.map(entry => (
    <EntryTile key={entry.id} entry={entry} />
  ))

  return (
    <div className="prompt-show-main callout">
      <h2>Prompt:</h2>
      <p className="saved-prompt-tile">{showPrompt.promptContent}</p>
      <EntryForm promptId={id} addEntry={addEntry} />
      <h3 className="entry-list-title">Saved Entries</h3>
      <div className="entry-tile-container">
      {entryTiles}
      </div>
    </div>
  )
}

export default PromptShowPage
