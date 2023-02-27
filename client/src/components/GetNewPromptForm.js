import React, { useState } from 'react';

const GetNewPromptForm = ({ onGeneratePrompt, isLoading }) => {
  const [personPlace, setPersonPlace] = useState('');
  const [action, setAction] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    onGeneratePrompt(personPlace, action, genre)
  }

  const buttonText = isLoading ? 'Loading...' : 'Generate Prompt'

  return (
    <form  onSubmit={handleSubmit}>
      <div className='new-prompt-form-container'>
        <label>
          <input className='new-prompt-form-input' type="text" value={personPlace} placeholder="about a..." onChange={(event) => setPersonPlace(event.target.value)} />
        </label>
        <label>
          <input className='new-prompt-form-input' type="text" placeholder='who must...' value={action} onChange={(event) => setAction(event.target.value)} />
        </label>
        <label>
          <input className='new-prompt-form-input' placeholder='in a world...' type="text" value={genre} onChange={(event) => setGenre(event.target.value)} />
        </label>
      </div>
      <div>
        <button className='gen-btn button orange-btn' type="submit" disabled={isLoading}>{buttonText}</button>
      </div>
    </form>
  )
};

export default GetNewPromptForm;
