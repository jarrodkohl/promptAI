import express from 'express'
import Entry from "../../../models/index.js"

const entryRouter = express.Router({ mergeParams: true })

entryRouter.get('/', async (req, res) => {
  try {
    const { promptId, entryId } = req.params
    const entry = await Entry.query().findById(entryId).where({ promptId: promptId })
    return res.status(200).json({ entry })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default entryRouter

