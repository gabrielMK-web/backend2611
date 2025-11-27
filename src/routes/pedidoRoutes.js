const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pedidosController = require('../controllers/pedidosController');

router.post('/', auth, pedidosController.criarPedido);        
router.get('/meus', auth, pedidosController.meusPedidos);     

module.exports = router;
