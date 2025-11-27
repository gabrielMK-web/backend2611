exports.seed = async function (knex) {
  await knex('itens_cardapio').del();

  await knex('itens_cardapio').insert([
    // Restaurante 1 – Pizza do Zé
    { id: 1, nome: 'Pizza Margherita', descricao: 'Tradicional', preco: 4500, restaurante_id: 1 },
    { id: 2, nome: 'Pizza Calabresa', descricao: 'Com cebola', preco: 5000, restaurante_id: 1 },

    // Restaurante 2 – Sushi da Vila
    { id: 3, nome: 'Sushi Combinado 12 peças', descricao: 'Variedade de peixes', preco: 3200, restaurante_id: 2 },
    { id: 4, nome: 'Temaki Salmão', descricao: 'Salmão fresco', preco: 2800, restaurante_id: 2 },

    // Restaurante 3 – Churrasco do Gaúcho
    { id: 5, nome: 'Picanha 300g', descricao: 'Corte premium', preco: 6500, restaurante_id: 3 },
    { id: 6, nome: 'Costela Gaúcha', descricao: 'Assada 6h', preco: 5500, restaurante_id: 3 }
  ]);
};
