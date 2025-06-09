var database = require("../database/config")

function cadastrar(cnpj, nomeFantasia) {
    var instrucaoSql = `
        insert into mineradora (nome, cnpj) values ('${nomeFantasia}', '${cnpj}');        
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPeloNome(nome) {
    var instrucaoSql = `
    select id as IdMineradora from mineradora where nome = '${nome}';        
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPeloCnpj(cnpj){
    var instrucaoSql = `
    select id as IdMineradora from mineradora where cnpj = ${cnpj};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    buscarPeloNome,
    buscarPeloCnpj
};
