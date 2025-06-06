var dashboardModel = require("../models/dashboardModel");

function riscoDeExplosao(_, res) {
    dashboardModel.riscoDeExplosao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const Sigla = resultado.map(registro => registro.sigla);

                res.json({
                    sigla: Sigla,
                });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function evacuacaoTotal(_, res) {
    dashboardModel.evacuacaoTotal()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const Sigla = resultado.map(registro => registro.sigla);

                res.json({
                    sigla: Sigla,
                });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function visaoGeral(_, res) {
    dashboardModel.visaoGeral()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const NivelMetano = resultado.map(registro => registro.NivelMetano);
                const SiglaSetor = resultado.map(registro => registro.SiglaSetor);
                const Hora = resultado.map(registro => registro.Hora);

                res.json({
                    siglaSetor: SiglaSetor,
                    nivelMetano: NivelMetano,
                    hora: Hora
                });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    riscoDeExplosao,
    evacuacaoTotal,
    visaoGeral
};