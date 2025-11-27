const express = require('express');
const router = express.Router();
const knex = require('../../knexfile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// CADASTRO
router.post('/cadastro', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios" });
  }

  const hash = bcrypt.hashSync(senha, 10);

  try {
    await knex('usuarios').insert({ email, senha: hash });
    res.json({ mensagem: "Usuário criado com sucesso" });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao criar usuário" });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const user = await knex('usuarios').where({ email }).first();
  if (!user) return res.status(400).json({ erro: "Usuário não encontrado" });

  const senhaValida = bcrypt.compareSync(senha, user.senha);
  if (!senhaValida) return res.status(400).json({ erro: "Senha incorreta" });

  const token = jwt.sign({ id: user.id }, "segredo", { expiresIn: "1h" });

  res.json({ token });
});

module.exports = router;
