	import express from 'express'
	import Prompt from "../../models/Prompt.js"

	const promptRouter = express.Router()

	promptRouter.get('/', async (req, res) =>{
			try {
				const { order = 'desc' } = req.query
				const prompts = await Prompt.query()
					.where({ userId: req.user.id })
					.orderBy('createdAt', order)
				res.status(200).json({ prompts })
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: 'Internal server error' })
					
			}
	})


	promptRouter.post('/', async (req, res) => {
			try {
				const { promptContent } = req.body
				const { id } = req.user
				console.log(id, promptContent)
				const newPrompt = await Prompt.query().insertAndFetch({ promptContent: promptContent, userId: id })
				res.status(201).json({ newPrompt })
			} catch (error) {
				console.error(error);
				res.status(500).json({ message: 'An error occurred while saving the prompt' });
			}
		})

		promptRouter.get("/:id", async (req, res) =>{
			const { id } = req.params
			try {
				const prompt = await Prompt.query().findById(id)
				return res.status(200).json({ prompt })
			} catch (error) {
				return res.status(500).json({ errors: error })
			}
		})

		export default promptRouter

