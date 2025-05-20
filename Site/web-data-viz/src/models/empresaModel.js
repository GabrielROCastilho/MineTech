var database = require("../database/config")

function cadastrar(cnpj, nomeFantasia, cidade, sigla, cep, logradouro, bairro, numero) {
    var instrucaoSql = `
        INSERT INTO 
        INSERT INTO usuario (nome, email, senha, fk_empresa) VALUES ('${nome}', '${email}', '${senha}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};
