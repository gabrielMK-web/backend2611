/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('restaurantes', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('tipo_cozinha').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('restaurantes');
};

