var express = require("express");
var router = express.Router();
var sensorController = require("../controllers/sensorController");

router.post("/enviar", sensorController.obterResultados);

module.exports = router;