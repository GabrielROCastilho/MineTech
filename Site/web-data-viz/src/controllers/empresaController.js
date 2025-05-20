var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
    var cnpj = req.body.cnpjServer
    var nomeFantasia = req.body.nomeFantasiaServer
    var cidade = req.body.cidadeServer
    var sigla = req.body.siglaServer
    var cep = req.body.cepServer
    var logradouro = req.body.logradouroServer
    var bairro = req.body.bairroServer
    var numero = req.body.numeroServer

    // Faça as validações dos valores
    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (nomeFantasia == undefined) {
        res.status(400).send("Seu nome fantasia está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (sigla == undefined) {
        res.status(400).send("Sua sigla está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else {
        res.status(400).send("Seu numero está undefined!");
    }

    empresaModel.cadastrar(cnpj, nomeFantasia, cidade, sigla, cep, logradouro, bairro, numero)
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