import React, { useState, useEffect, useRef } from 'react';


const GetChat = (props) => {

  const [chat, setChat] = useState("")

  const generateChat = async() => {
    try {
    const response = await fetch(`/api/v1/openai/generate-chat`)
      const data = await response.json()
      return data.chat
    } catch (error) {
      console.error(error)
      return ''
    }
  }
  const handleGenerateChat = async() => {
    const generatedChat = await generateChat()
    setChat(generatedChat)
  }

  return (
    <div>
      <input>
      </input>

      <button className='gen-save-btn button orange-btn' onClick={handleGenerateChat}>Get Chat</button>
      <p>{chat}</p>
    </div>
  )

}

export default GetChat