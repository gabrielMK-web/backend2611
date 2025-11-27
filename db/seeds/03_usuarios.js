exports.seed = async function (knex) {
  await knex('usuarios').del();

  await knex('usuarios').insert([
    {
      id: 1,
      email: 'teste@teste.com',
      senha: '$2b$10$GQKIEV1XpQNJbRy/QYg2OeMFl6fr6R8Q9jF1xp1KzKtH4SykafgI2' // senha: 123456
    }
  ]);
};
