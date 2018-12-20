const express = require('express');
const router  = express.Router();

const marvelAPiRoutes = require ("./api");
router.use("/api", marvelAPiRoutes);


const authRoutes = require('./auth');
router.use('/api/auth', authRoutes);
      
module.exports = router;
