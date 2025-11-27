const express = require('express');
const router = express.Router();
const knex = require('../../knexfile');

router.get('/', async (req, res) => {
  const dados = await knex('restaurantes');
  res.json(dados);
});

router.get('/:id/cardapio', async (req, res) => {
  const { id } = req.params;

  const itens = await knex('itens_cardapio').where({ restaurante_id: id });

  if (itens.length === 0) {
    return res.status(404).json({ erro: "Nenhum item encontrado para esse restaurante" });
  }

  res.json(itens);
});

module.exports = router;
