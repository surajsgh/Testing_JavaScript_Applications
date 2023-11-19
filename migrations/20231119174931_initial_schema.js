/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username');
    table.unique('username');
    table.string('email');
    table.string('passwordHash');
  })

  await knex.schema.createTable('carts_item', table => {
    table.integer('userId').references('users.id');
    table.string('itemName');
    table.unique('itemName');
    table.integer('quantity');
  })

  await knex.schema.createTable('inventory', table => {
    table.integer('id');
    table.string('itemName');
    table.unique('itemName');
    table.integer('quantity');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('inventory');
  await knex.schema.dropTable('carts_item');
  await knex.schema.dropTable('users');
};
