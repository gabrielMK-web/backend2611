const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const restaurantesRoutes = require('./restaurantesRoutes');

router.use(authRoutes);
router.use(restaurantesRoutes);

module.exports = router;
