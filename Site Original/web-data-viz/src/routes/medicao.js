const express = require('express');
const router = express.Router();
const medicaoController = require('../controllers/medicaoController');

router.post('/registrar', medicaoController.registrarMedicao);
router.get('/historico', medicaoController.buscarHistorico);

module.exports = router;
