const db = require('../database/config');

// Função auxiliar para determinar status do nível de metano
function statusNivelMetano(valor) {
    if (valor > 0 && valor < 1) return 'Alerta';
    if (valor >= 1 && valor < 2) return 'Evacuar área';
    if (valor >= 2 && valor < 5) return 'Evacuação total';
    if (valor >= 5) return 'Risco de explosão';
    return 'Normal';
}

// Registrar medição (simulada ou real)
exports.registrarMedicao = async (req, res) => {
    try {
        const { sensores, origem } = req.body;
        if (!sensores || !Array.isArray(sensores) || sensores.length !== 14) {
            return res.status(400).json({ erro: 'Dados inválidos' });
        }
        // Para cada sensor, inserir uma linha na tabela medicao
        for (let i = 0; i < sensores.length; i++) {
            const valor = sensores[i];
            const status = statusNivelMetano(valor);
            // fkSensor: 1 a 14 (ajuste conforme seu cadastro de sensores)
            const fkSensor = i + 1;
            await db.executar(`INSERT INTO medicao (nivelMetano, statusNivel, fkSensor) VALUES (${valor}, '${status}', ${fkSensor})`);
        }
        res.status(201).json({ mensagem: 'Medições registradas com sucesso' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao registrar medições' });
    }
};

// Buscar histórico de medições (últimas 100)
exports.buscarHistorico = async (req, res) => {
    try {
        const linhas = await db.executar('SELECT * FROM medicao ORDER BY dataHora DESC LIMIT 100');
        res.json(linhas);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao buscar histórico' });
    }
};
