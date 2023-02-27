import React, { useState, useEffect, useRef } from 'react';
import PromptTile from './PromptTile';
import Typed from 'typed.js'
import GetNewPromptForm from './GetNewPromptForm';


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
      typeSpeed: 10,
      loop: false,
      backSpeed: 0,
      cursorChar: '',
    })

    return () => {
      typed.current.destroy()
    };
  }, [prompt])

  const generatePrompt = async (personPlace, action, genre) => {
    setIsLoading(true)
    try {
      const promptText = `as a ${personPlace} create a ${genre} with a goal of ${action}  (max tokens 200)`
      const response = await fetch(`/api/v1/openai/generate-prompt?promptText=${promptText}`)
      const data = await response.json()
      setIsLoading(false)
      return data.prompt
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  const handleGeneratePrompt = async (personPlace, action, genre) => {
    const generatedPrompt = await generatePrompt(personPlace, action, genre)
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

  return (
    <div className='callout app-main-div'>
    <h1 className='get-prompt-headline'>PromptAI</h1>
    <h5 className='sub-header'>add a few keywords to get started</h5>
      <div className='generate-prompt-form'>
        <GetNewPromptForm onGeneratePrompt={handleGeneratePrompt} isLoading={isLoading}/>
      </div>
    <div className='gen-prompt-container'>
      <p id="gen-animate" className='gen-prompt-box' value={prompt} />
      <div className='button-container'>
        <button className='gen-save-btn button orange-btn' onClick={handleSavePrompt}>Save</button>
      </div>
    </div>
    <h2 className='content-title'>Recent Content</h2>
    <div className='grid-x grid-margin-x prompt-tiles-container'>
      {promptTiles}
    </div>
  </div>
  
  ) 
}

export default GetPrompt

