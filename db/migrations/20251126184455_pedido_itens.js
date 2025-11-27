/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pedido_itens', function(table) {
    table.increments('id').primary();

    table.integer('pedido_id').unsigned().notNullable()
         .references('id').inTable('pedidos')
         .onDelete('CASCADE');

    table.integer('item_id').unsigned().notNullable()
         .references('id').inTable('itens_cardapio')
         .onDelete('CASCADE');

    table.integer('quantidade').notNullable();

    // preço do item no momento da compra (histórico)
    table.integer('preco_unitario').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedido_itens');
};
