/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("prompts", (table) =>{
        table.bigIncrements("id").notNullable()
        table.text("promptContent").notNullable()
        table.bigInteger("userId").notNullable()
        .index()
        .references("users.id")
        .unsigned()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("prompts")
}
