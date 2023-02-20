import React, { useState, useEffect } from 'react';

const  GetPrompt = (props) => {
  const [prompt, setPrompt] = useState('')
  const [generatedPrompts, setGeneratedPrompts] = useState([])
 
  const fetchUserPrompts = async () => {
    try {
      const response = await fetch(`/api/v1/prompts?userId=${props.user.id}&limit=3&order=desc`)
      const data = await response.json()
      setGeneratedPrompts(data.prompts)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUserPrompts()
  }, [])

  const generatePrompt = async (promptText) => {
    try {
      const response = await fetch(`/api/v1/openai/generate-prompt?promptText=${promptText}`)
      const data = await response.json()
      return data.prompt
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  const handleGeneratePrompt = async () => {
    const generatedPrompt = await generatePrompt('generate a random story idea(max tokens 45)')
    console.log(`generatedPrompt ${generatedPrompt}`)
    setPrompt(generatedPrompt)
  }

  const handleSavePrompt = async () => {
    try {
      const response = await fetch("/api/v1/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ promptContent: prompt })
      })
      const data = await response.json()
      setGeneratedPrompts([...generatedPrompts, data.newPrompt.promptContent])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='callout app-main-div'>
      <h1>Call on the Digital MUSE!</h1>
      <button className='button orange-btn' onClick={handleGeneratePrompt}>Generate Prompt</button>
      <p>Generated Prompt: {prompt}</p>
      <button className='button orange-btn' onClick={handleSavePrompt}>Save Prompt</button>
      <h2>Your Last 3 Saved Prompts</h2>
      <div className='grid-container text-center' >
        {generatedPrompts.map((prompt, index) => (
          <div className='saved-prompt-tile grid-x grid-margin-x cell large-4 medium-6 small-12 text-center callout' key={index}>{prompt.promptContent}</div>
        ))}
      </div>
    </div>
  ) 
}

export default GetPrompt

