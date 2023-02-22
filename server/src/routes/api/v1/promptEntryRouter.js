import express from 'express'
import { Entry, Prompt} from "../../../models/index.js"

const promptEntryRouter = express.Router({ mergeParams: true })


promptEntryRouter.get('/', async (req, res) =>{
  try {
    const { promptId } = req.params
    const entries = await Entry.query()
      .where({ promptId })
    res.status(200).json({ entries })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' })    
  }
})


promptEntryRouter.post('/', async (req, res) => {
  try {
    const { promptId } = req.params
    const userId  = req.user.id
    const { title, entryContent, label } = req.body
    const newEntry = await Entry.query().insertAndFetch({ title, entryContent, label, promptId, userId })
    res.status(201).json({ newEntry })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving the entry' });
  }
})


promptEntryRouter.get('/:entryId', async (req, res) =>{
  try {
    const { entryId } = req.params
    const entry = await Entry.query().findById(entryId)
    return res.status(200).json({ entry })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default promptEntryRouter
