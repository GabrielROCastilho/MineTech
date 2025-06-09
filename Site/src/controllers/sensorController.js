var sensorModel = require("../models/sensorModel");

function obterResultados(req, res) {
    sensorModel.obterResultados()
    .then(resultados => res.status(200).json(resultados))
    .catch(erro => {
        console.log(erro);
        res.status(500).json({ erro: "Erro ao obter resultados" });
    });
}