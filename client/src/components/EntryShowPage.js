import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { FaTrash } from 'react-icons/fa'

const EntryShowPage = ({ match }) => {
  const [entry, setEntry] = useState({
    title: "",
    entryContent: "",
    label: ""
  });

  const [isDeleted, setIsDeleted] = useState(false)


  const promptId = match.params.promptId
  const entryId = match.params.entryId


  const getEntry = async () => {
    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/entries/${entryId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const { entry } = await response.json()
      setEntry(entry)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  useEffect(()=>{
    getEntry()
  }, [])

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/entries/${entryId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error;
      }
      setIsDeleted(true);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  if (isDeleted) {
    return <Redirect to={`/prompts/${promptId}`} />
  }

  return (
    <div className="callout">
      <h2 className="show-title">{entry.title}</h2>
      <p className="show-label">{entry.label}</p>
      <p className="show-entry-content">{entry.entryContent}</p>
      <button className="delete-btn" onClick={handleDelete}>
      <FaTrash size={16} color="black" />
      </button>

    </div>
  )
}

export default EntryShowPage;
