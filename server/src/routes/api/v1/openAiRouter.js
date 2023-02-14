import express from 'express';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai"

dotenv.config()

const openAiRouter = express.Router()

const generatePrompt = async (promptText) => {
  const configuration = new Configuration({
    organization: "org-nEkG1sgONAKXdbmd0TzONMrM",
    apiKey: process.env.BT_OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration)
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: promptText,
    max_tokens: 5,
    temperature: 0.6,
  })
  console.log(response.data)
  console.log(promptText)
  return response.data.choices[0].text
}
// ^^ eventaully move to a POJO - third party API exercise (week 4) and clinic

// openAiRouter.post('/generate-prompt', async (req, res) => {
openAiRouter.get('/generate-prompt', async (req, res) => {
  console.log(req.query)
  const { promptText } = req.query
  try {
    const generatedPrompt = await generatePrompt(promptText)
    res.json({ prompt: generatedPrompt })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred' })
  }
})

export default openAiRouter;

