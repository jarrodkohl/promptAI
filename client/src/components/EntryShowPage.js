import React, { useState, useEffect } from "react";

const EntryShowPage = ({ match }) => {
  const [entry, setEntry] = useState({
    title: "",
    entryContent: "",
    label: ""
  });

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

  return (
    <div className="callout">
      <h2 className="show-title">{entry.title}</h2>
      <p className="show-label">{entry.label}</p>
      <p className="show-entry-content">{entry.entryContent}</p>
    </div>
  );
};

export default EntryShowPage;
