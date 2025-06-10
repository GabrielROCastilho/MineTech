var database = require("../database/config")

function riscoDeExplosao() {
    var instrucaoSql =
        `
SELECT DISTINCT
    s.sigla
FROM (
    SELECT
        m.id,
        m.fkSensor,
        m.statusNivel,
        @row_num := IF(@prev_sensor = m.fkSensor, @row_num + 1, 1) AS rn,
        @prev_sensor := m.fkSensor
    FROM
        medicao m
    ORDER BY
        m.fkSensor, m.dataHora DESC
) AS ranked_medicoes
JOIN
    sensor AS se ON ranked_medicoes.fkSensor = se.id
JOIN
    localSensor AS ls ON se.fkLocal = ls.id
JOIN
    setor AS s ON ls.fkSetor = s.id AND ls.fkMineradora = s.fkMineradora
WHERE
    ranked_medicoes.rn <= 5 -- Filtra apenas as 5 medições mais recentes por sensor
    AND ranked_medicoes.statusNivel = 'Risco de Explosão';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function evacuacaoTotal() {
    var instrucaoSql =
        `
SELECT DISTINCT
    s.sigla
FROM (
    SELECT
        m.id,
        m.fkSensor,
        m.statusNivel,
        @row_num := IF(@prev_sensor = m.fkSensor, @row_num + 1, 1) AS rn,
        @prev_sensor := m.fkSensor
    FROM
        medicao m
    ORDER BY
        m.fkSensor, m.dataHora DESC
) AS ranked_medicoes
JOIN
    sensor AS se ON ranked_medicoes.fkSensor = se.id
JOIN
    localSensor AS ls ON se.fkLocal = ls.id
JOIN
    setor AS s ON ls.fkSetor = s.id AND ls.fkMineradora = s.fkMineradora
WHERE
    ranked_medicoes.rn <= 5 -- Filtra apenas as 5 medições mais recentes por sensor
    AND ranked_medicoes.statusNivel = 'Evacuação Total';
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