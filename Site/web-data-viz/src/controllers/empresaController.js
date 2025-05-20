var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
    var cnpjVar = req.body.cnpjServer
    var nomeFantasiaVar = req.body.nomeFantasiaServer
    var cidadeVar = req.body.cidadeServer
    var siglaVar = req.body.siglaServer
    var cepVar = req.body.cepServer
    var logradouroVar = req.body.logradouroServer
    var bairroVar = req.body.bairroServer
    var numeroVar = req.body.numeroServer

    // Faça as validações dos valores
    if (cnpjVar == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (nomeFantasiaVar == undefined) {
        res.status(400).send("Seu nome fantasia está undefined!");
    } else if (cidadeVar == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (siglaVar == undefined) {
        res.status(400).send("Sua sigla está undefined!");
    } else if (cepVar == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (logradouroVar == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (bairroVar == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else {
        res.status(400).send("Seu numero está undefined!");
    }

    empresaModel.cadastrar(cnpjVar, nomeFantasiaVar)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar
};