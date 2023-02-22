const Model = require('./Model');

class Entry extends Model {
  static get tableName() {
    return 'entries'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'entryContent', 'promptId'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        entryContent: { type: 'string', minLength: 1, maxLength: 60000 },
        label: { type: 'string', maxLength: 255 },
        promptId: { type: ["string", "integer"] },
        userId: { type: ["string", "integer"]},
      },
    }
  }

  static get relationMappings() {
    const { Prompt , User } = require('./index')

    return {
      prompt: {
        relation: Model.BelongsToOneRelation,
        modelClass: Prompt,
        join: {
          from: 'entries.promptId',
          to: 'prompts.id',
        },
      },
      user:{
        relation: Model.BelongsToOneRelation,
        modelClass: User,
          join: {
            from: 'entries.userId',
            to: 'user.id',
          }
      }
    }
  }
}

module.exports = Entry
