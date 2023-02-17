	import express from 'express'
	import Prompt from "../../models/Prompt.js"

	const promptRouter = express.Router()

	promptRouter.get('/', async (req, res) =>{
			try {
				const { limit = 3, order = 'desc' } = req.query
				// const { userId, limit = 3, order = 'desc' } = req.query
				const prompts = await Prompt.query()
					.where({ userId: req.user.id })
					.limit(limit)
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

		export default promptRouter

