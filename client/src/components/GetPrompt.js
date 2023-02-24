import React, { useState, useEffect, useRef } from 'react';
import PromptTile from './PromptTile';
import Typed from 'typed.js'



const  GetPrompt = (props) => {
  const [prompt, setPrompt] = useState("")
  const [generatedPrompts, setGeneratedPrompts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
 
  const fetchUserPrompts = async () => {
    try {
      const response = await fetch(`/api/v1/prompts?limit=4&order=desc`)
      const data = await response.json()
      setGeneratedPrompts(data.prompts)
    } catch (error) {
      console.error(error)
    }
  }

  const typed = useRef(null)
  
  useEffect(() => {
    fetchUserPrompts();

    if (typed.current) {
      typed.current.destroy()
    }

    typed.current = new Typed('#gen-animate', {
      strings: [prompt],
      typeSpeed: 30,
      loop: false,
      backSpeed: 0,
      cursorChar: '',
    })

    return () => {
      typed.current.destroy()
    };
  }, [prompt])

  const generatePrompt = async (promptText) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/v1/openai/generate-prompt?promptText=${promptText}`)
      const data = await response.json()
      setIsLoading(false)
      return data.prompt
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  const handleGeneratePrompt = async () => {
    const generatedPrompt = await generatePrompt('generate a random story idea(max tokens 50)')
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
      setGeneratedPrompts([...generatedPrompts, data.newPrompt])
    } catch (error) {
      console.error(error)
    }
  }
  const promptTiles = generatedPrompts.map(prompt =>{
    return(
      <PromptTile
      key={prompt.id}
      id={prompt.id}
      promptContent={prompt.promptContent}
      />
    )
  })
  const buttonText = isLoading ? "Tinkering..." : "Generate Prompt";

  return (
    <div className='callout app-main-div'>
    <h1>PromptAI</h1>
    <h5>Click the button to generate a prompt using AI.</h5>
    <div className='gen-prompt-container'>
      <p id="gen-animate" className='gen-prompt-box' value={prompt} />
      <div className='button-container'>
        <button className='gen-btn button orange-btn' onClick={handleGeneratePrompt} disabled={isLoading}>{buttonText}</button>
        <button className='gen-save-btn button orange-btn' onClick={handleSavePrompt}>Save Prompt</button>
      </div>
    </div>
    <h2>Recent Prompts</h2>
    <div className='grid-x grid-margin-x prompt-tiles-container'>
      {promptTiles}
    </div>
  </div>
  
  ) 
}

export default GetPrompt

