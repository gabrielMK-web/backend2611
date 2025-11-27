/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('itens_cardapio', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('descricao').notNullable();

    // preço em centavos 
    table.integer('preco').notNullable();

    // fk para restaurantes
    table.integer('restaurante_id').unsigned().notNullable()
         .references('id').inTable('restaurantes')
         .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('itens_cardapio');
};
