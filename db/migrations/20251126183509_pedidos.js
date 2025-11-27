/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pedidos', function(table) {
    table.increments('id').primary();

    table.integer('usuario_id').unsigned().notNullable()
         .references('id').inTable('usuarios')
         .onDelete('CASCADE');

    table.integer('restaurante_id').unsigned().notNullable()
         .references('id').inTable('restaurantes')
         .onDelete('CASCADE');

    // valor total em centavos
    table.integer('valor_total').notNullable();

    table.string('status').notNullable(); // status pendente, confirmado, etc.

    table.timestamp('data_criacao')
         .defaultTo(knex.fn.now())
         .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedidos');
};
