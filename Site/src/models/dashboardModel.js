var database = require("../database/config")

function riscoDeExplosao() {
    var instrucaoSql =
        `
 WITH ultimos5 AS (
    SELECT m.id, m.statusnivel, se.sigla
    FROM medicao m
    INNER JOIN sensor s ON m.fkSensor = s.id
    INNER JOIN localSensor ls ON s.fkLocal = ls.id
    INNER JOIN setor se ON se.id = ls.fkSetor
    ORDER BY m.id DESC
    LIMIT 5
)
SELECT sigla
FROM ultimos5
WHERE statusnivel = 'Risco de Explosão'
AND EXISTS (
    SELECT 1 FROM ultimos5 WHERE statusnivel = 'Risco de Explosão'
);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function evacuacaoTotal() {
    var instrucaoSql =
        `
 WITH ultimos5 AS (
    SELECT m.id, m.statusnivel, se.sigla
    FROM medicao m
    INNER JOIN sensor s ON m.fkSensor = s.id
    INNER JOIN localSensor ls ON s.fkLocal = ls.id
    INNER JOIN setor se ON se.id = ls.fkSetor
    ORDER BY m.id DESC
    LIMIT 5
)
SELECT sigla
FROM ultimos5
WHERE statusnivel = 'Evacuação Total'
AND EXISTS (
    SELECT 1 FROM ultimos5 WHERE statusnivel = 'Evacuação Total'
);
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