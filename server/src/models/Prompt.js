const Model = require('./Model');

class Prompt extends Model {
	static get tableName() {
		return 'prompts'
	}

	static get relationMappings() {
		const { User } = require("./index")

		return {
				user: {
						relation: Model.BelongsToOneRelation,
						modelClass: User,
						join: {
							from: 'prompt.userId',
							to: 'users.id',
						}
				}
		}
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['promptContent'],

			properties: {
				id: { type: 'integer' },
				promptContent: { type: 'string' }
			},
		}
	}
}

module.exports = Prompt
