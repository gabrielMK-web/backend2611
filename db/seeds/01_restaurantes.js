exports.seed = async function (knex) {
  // Apaga dados existentes
  await knex('restaurantes').del();

  // Insere dados
  await knex('restaurantes').insert([
    { id: 1, nome: 'Pizza do Zé', tipo_cozinha: 'Pizzaria' },
    { id: 2, nome: 'Sushi da Vila', tipo_cozinha: 'Japonesa' },
    { id: 3, nome: 'Churrasco do Gaúcho', tipo_cozinha: 'Churrascaria' }
  ]);
};
