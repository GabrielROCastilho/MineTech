var database = require("../database/config")

function riscoDeExplosao() {
    var instrucaoSql =
        `
    select se.sigla as sigla
    from medicao m
    inner join sensor s on m.fkSensor = s.id
    inner join localSensor ls on s.fkLocal = ls.id
    inner join setor se on se.id = ls.fkSetor
    where m.statusnivel = 'Risco de Explosão'
    order by m.id desc
    limit 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function evacuacaoTotal() {
    var instrucaoSql =
        `
    select se.sigla as sigla
    from medicao m
    inner join sensor s on m.fkSensor = s.id
    inner join localSensor ls on s.fkLocal = ls.id
    inner join setor se on se.id = ls.fkSetor
    where m.statusnivel = 'Evacuação Total'
    order by m.id desc
    limit 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function visaoGeral() {
    var instrucaoSql =
        `
    select m.nivelMetano as NivelMetano,
	(select concat(extract(hour from m.dataHora), ':',
    extract(minute from m.dataHora), ':',
    extract(second from m.dataHora))) as Hora,
    se.sigla as SiglaSetor
    from medicao m
    inner join sensor s on m.fkSensor = s.id
    inner join localSensor ls on ls.id = s.fkLocal
    inner join setor se on se.id = ls.fkSetor
    order by m.id desc
    limit 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    riscoDeExplosao,
    evacuacaoTotal,
    visaoGeral
};