var database = require("../database/config")

function cadastrar(cnpj, nomeFantasia, cidade   , cep, logradouro, bairro, numero) {
    var instrucaoSql = `
        insert into mineradora (nome, cnpj) values ('${nomeFantasia}', '${cnpj}');
        set @idMineradora := last_insert_id();
        
        set @idCidade:= (select id from cidade where nome = '${cidade}');

        insert into endereco (fkMineradora, logradouro, bairro, numero, cep, fkCidade) values (@idMineradora, '${logradouro}', '${bairro}', '${numero}', '${cep}', @idCidade);
        insert 
        
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};
