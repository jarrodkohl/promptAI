const Model = require('./Model');

class Prompt extends Model {
	static get tableName() {
		return 'prompts'
	}

	static get relationMappings() {
		const { User, Entry } = require("./index")

		return {
				user: {
					relation: Model.BelongsToOneRelation,
					modelClass: User,
					join: {
						from: 'prompt.userId',
						to: 'users.id',
					}
				},
				entries: {
					relation: Model.HasManyRelation,
					modelClass: Entry,
					join: {
						from: 'prompts.id',
						to: 'entries.promptId'
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
