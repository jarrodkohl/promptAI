import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { FaTrash } from 'react-icons/fa'
import EntryForm from "./EntryForm";
import EntryTile from "./EntryTile";

const PromptShowPage = ({ match }) => {
  const [showPrompt, setShowPrompt] = useState({
    promptContent: ""
  })

  const [entries, setEntries] = useState([])
  const [deletedPrompt, setDeletedPrompt] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showEntryForm, setShowEntryForm] = useState(false)

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
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/v1/prompts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            promptContent: showPrompt.promptContent
        })
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      setIsEditing(false)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getPromptPage()
  }, [])

  const entryTiles = entries.map(entry => (
    <EntryTile key={entry.id} entry={entry} />
  ))

  const renderEntryForm = () =>{
    if (showEntryForm){
      return(
        <>
        <EntryForm promptId={id} addEntry={addEntry} />
        </>
      )
    }
  }

  const renderPrompt = () => {
    if (isEditing) {
      return (
        <>
          <textarea
            value={showPrompt.promptContent}
            onChange={(event) =>
              setShowPrompt({ promptContent: event.target.value })
            }
            className="edit-prompt-textarea"
          />
          <div className="form-btn-container">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="save-btn" onClick={() => setIsEditing(!isEditing)}>
            Cancel
          </button>
          <button className="delete-btn" onClick={handleDelete}>
          <FaTrash size={20} color="black" />
          </button>
          </div>
        </>
      )
    } else {
      return (
        <>
          <h2>Prompt</h2>
          <p className="saved-prompt-tile">{showPrompt.promptContent}</p>
          <div className="form-btn-container">
          <button className="edit-btn" onClick={() => setShowEntryForm(!showEntryForm)}>Create Entry</button>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Prompt
          </button>
          <button className="delete-btn" onClick={handleDelete}>
          <FaTrash size={20} color="black" />
          </button>
          </div>
        </>
      )
    }
  }

  if (deletedPrompt) {
    return <Redirect to="/prompts" />;
  }

  return (
    <div className="prompt-show-main callout">
      {renderPrompt()}
     
      {renderEntryForm()}
      {/* <h3 className="entry-list-title">Saved Entries</h3> */}
      <div className="entry-tile-container">
        {entryTiles}
      </div>
    </div>
  )
}

export default PromptShowPage
