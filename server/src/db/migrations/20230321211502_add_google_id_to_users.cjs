/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('users', (table) => {
    table.string('googleId').unique()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('users', (table) => {
    table.dropColumnIfExists('googleId')
  })
}
