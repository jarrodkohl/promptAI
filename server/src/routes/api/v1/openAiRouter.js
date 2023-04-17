import express from 'express';
import OpenAiClient from '../../../apiClient/OpenAiClient.js';
import dotenv from 'dotenv';

dotenv.config()

const openAiRouter = express.Router()

openAiRouter.get('/generate-prompt', async (req, res) => {
  console.log(req.query)
  const { promptText } = req.query
  try {
    const generatedPrompt = await OpenAiClient.generatePrompt(promptText)
    res.json({ prompt: generatedPrompt })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred' })
  }
})

openAiRouter.get('/generate-chat', async (req, res) => {
  console.log(req.query)
  const { message } = req.query
  try {
    const chat = await OpenAiClient.createChat()
    res.json({ chat })
    // res.json({ prompt: generatedChat })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred' })
  }
})

export default openAiRouter;

