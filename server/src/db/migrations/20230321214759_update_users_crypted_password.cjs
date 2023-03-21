/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable('users', (table) =>{
    table.string("cryptedPassword").nullable().alter()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.string("cryptedPassword").notNullable().alter()
  })
}
