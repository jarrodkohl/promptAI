import React, { useEffect, useState } from "react";

const EntryForm = ({ promptId, addEntry }) => {
  const [title, setTitle] = useState("")
  const [entryContent, setEntryContent] = useState("")
  const [label, setLabel] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, entryContent, label }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage);
        throw error;
      }
      const newEntryData = await response.json()
      addEntry(newEntryData.newEntry)
      setTitle("")
      setEntryContent("")
      setLabel("")
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  };

  return (
    <div>
      <form className="callout entry-form-container" onSubmit={handleSubmit}>
        <label>
          Title:
          <input className="entry-input title-field"
            type="text"
            value={title}
            placeholder="content title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Label:
          <input className="entry-input label-field"
            type="text"
            value={label}
            placeholder="optional label"
            onChange={(e) => setLabel(e.target.value)}
          />
        </label>

        <label>
          Entry:
          <textarea className="entry-input textarea-field"
            value={entryContent}
            onChange={(e) => setEntryContent(e.target.value)}
            placeholder="add notes, links, etc."
          ></textarea>
        </label>
        <button className="orange-btn" type="submit">Save</button>
      </form>
    </div>
  )
}

export default EntryForm;
