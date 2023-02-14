import React, { useState } from 'react';

const  PromptTest = () => {
  const [prompt, setPrompt] = useState('')
  const [generatedPrompts, setGeneratedPrompts] = useState([])

  const generatePrompt = async (promptText) => {
    try {
      const response = await fetch(`/api/v1/openai/generate-prompt?promptText=${promptText}`)
      // query params
      const data = await response.json()
      // debugger
      console.log(`promptText ${promptText}`)
      return data.prompt
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  const handleGeneratePrompt = async () => {
    const generatedPrompt = await generatePrompt('generate a random story idea')
    setPrompt(generatedPrompt)
  }

  const handleSavePrompt = () => {
    setGeneratedPrompts([...generatedPrompts, prompt])
  }

  return (
    <div className='callout app-main-div'>
      <h1>Test API Request</h1>
      <button className='button orange-btn' onClick={handleGeneratePrompt}>Generate Prompt</button>
      <p>Generated Prompt: {prompt}</p>
      <button className='button orange-btn' onClick={handleSavePrompt}>Save Prompt</button>
      <h2>Saved Prompts</h2>
      <div className='grid-container text-center' >
        {generatedPrompts.map((savedPrompt, index) => (
          <div className='saved-prompt-tile grid-x grid-margin-x cell large-4 medium-6 small-12 text-center callout' key={index}>{savedPrompt}</div>
        ))}
      </div>
    </div>
  )
}

export default PromptTest
