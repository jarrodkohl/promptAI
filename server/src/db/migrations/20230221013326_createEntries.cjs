/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('entries', (table) =>{
    table.bigIncrements("id").notNullable()
    table.string("title").notNullable()
    table.text("entryContent").notNullable()
    table.string("label")
    table.bigInteger('userId').notNullable()
      .references('id')
      .inTable('users')
      .unsigned()
    table.bigInteger('promptId').notNullable()
      .references('id')
      .inTable('prompts')
      .unsigned()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())   
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
   knex.schema.dropTableIfExists('entries')
}
