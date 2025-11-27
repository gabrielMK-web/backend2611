const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000;

// Rotas
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const restaurantesRoutes = require('./src/routes/restaurantesRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');

const app = express();

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/restaurantes', restaurantesRoutes);
app.use('/pedidos', pedidoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
