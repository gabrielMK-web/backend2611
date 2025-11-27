const knex = require('../../knexfile');

async function criarPedido(req, res) {
  try {
    const usuarioId = req.userId;
    const { restaurante_id, itens } = req.body;

    if (!restaurante_id || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ erro: 'Dados inválidos.' });
    }

    const restaurante = await knex('restaurantes')
      .where({ id: restaurante_id })
      .first();

    if (!restaurante) {
      return res.status(404).json({ erro: 'Restaurante não encontrado.' });
    }

    let valorTotal = 0;
    const itensParaInserir = [];

    for (const i of itens) {
      const itemId = i.id ?? i.item_id;
      const quantidade = i.quantidade;

      const item = await knex('itens_cardapio')
        .where({ id: itemId, restaurante_id })
        .first();

      if (!item) {
        return res.status(400).json({ erro: `Item ${itemId} inválido.` });
      }

      const preco = Number(item.preco);
      valorTotal += preco * quantidade;

      itensParaInserir.push({
        item_id: itemId,
        quantidade,
        preco_unitario: preco
      });
    }

    const resultado = await knex.transaction(async trx => {
      const [pedidoId] = await trx('pedidos').insert({
        usuario_id: usuarioId,
        restaurante_id,
        valor_total: valorTotal,
        status: 'Pendente',
        data_criacao: trx.fn.now()
      });

      itensParaInserir.forEach(i => i.pedido_id = pedidoId);
      await trx('pedido_itens').insert(itensParaInserir);

      return pedidoId;
    });

    return res.status(201).json({
      pedido_id: resultado,
      valor_total: valorTotal
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno.' });
  }
}

async function meusPedidos(req, res) {
  try {
    const pedidos = await knex('pedidos')
      .where({ usuario_id: req.userId });

    return res.json(pedidos);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno.' });
  }
}

module.exports = { criarPedido, meusPedidos };
