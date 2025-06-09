var database = require("../database/config");

function obterResultados(){
    const sql = `SELECT * FROM medicao;`;
    return database.executar(sql);
}