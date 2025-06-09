function carregarDados() {
    fetch('/dashboards/riscodeexplosao')
        .then(function (response) {
            return response.json();
        })
        .then(function (resposta) {
            riscoDeExplosao(resposta.sigla);
        })
        .catch(function (err) {
            console.error("Erro ao buscar os dados:", err);
        });
    fetch('/dashboards/evacuacaototal')
        .then(function (response) {
            return response.json();
        })
        .then(function (resposta) {
            evacuacaoTotal(resposta.sigla);
        })
        .catch(function (err) {
            console.error("Erro ao buscar os dados:", err);
        });
    fetch('/dashboards/visaogeral')
        .then(function (response) {
            return response.json();
        })
        .then(function (resposta) {
            visaoGeral(resposta.siglaSetor, resposta.nivelMetano, resposta.hora);
        })
        .catch(function (err) {
            console.error("Erro ao buscar os dados:", err);
        });
}

function riscoDeExplosao(sigla) {
    status_sitema.innerHTML =
        `
        <div class="kpi-dashboard-pessoal" id="kpi_performance_geral"></div>
            <h2>${sigla}</h2>
        </div>
        `
}

// === INÍCIO DO NOVO CÓDIGO PARA O GRÁFICO ===

const ctxGeral = document.getElementById('grafico_geral').getContext('2d');
const graficoGeral = new Chart(ctxGeral, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Setor A (Média)',
                data: [],
                backgroundColor: 'rgba(52, 152, 219, 0.3)',
                borderColor: 'rgba(52, 152, 219, 0.8)',
                borderWidth: 3
            },
            {
                label: 'Setor B (Média)',
                data: [],
                backgroundColor: 'rgba(231, 76, 60, 0.3)',
                borderColor: 'rgba(231, 76, 60, 0.8)',
                borderWidth: 3
            },
            {
                label: 'Setor C (Média)',
                data: [],
                backgroundColor: 'rgba(46, 204, 113, 0.3)',
                borderColor: 'rgba(46, 204, 113, 0.8)',
                borderWidth: 3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                title: {
                    display: true,
                    text: 'Concentração de Metano (0-1)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Horário'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'right'
            }
        }
    }
});

// Função para buscar histórico e atualizar o gráfico
async function atualizarGraficoComHistorico() {
    try {
        const resposta = await fetch('/api/medicao/historico');
        const historico = await resposta.json();
        // Agrupar por horário (últimos 15)
        const agrupado = {};
        historico.reverse().forEach(med => {
            const hora = new Date(med.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            if (!agrupado[hora]) agrupado[hora] = {A: [], B: [], C: []};
            // Setor A: sensores 1-5, Setor B: 6-10, Setor C: 11-14
            if (med.fkSensor >= 1 && med.fkSensor <= 5) agrupado[hora].A.push(Number(med.nivelMetano));
            else if (med.fkSensor >= 6 && med.fkSensor <= 10) agrupado[hora].B.push(Number(med.nivelMetano));
            else if (med.fkSensor >= 11 && med.fkSensor <= 14) agrupado[hora].C.push(Number(med.nivelMetano));
        });
        const labels = Object.keys(agrupado).slice(-15);
        const dadosA = [], dadosB = [], dadosC = [];
        labels.forEach(hora => {
            const arr = agrupado[hora];
            dadosA.push(arr.A.length ? (arr.A.reduce((x, y) => x + y, 0) / arr.A.length).toFixed(3) : null);
            dadosB.push(arr.B.length ? (arr.B.reduce((x, y) => x + y, 0) / arr.B.length).toFixed(3) : null);
            dadosC.push(arr.C.length ? (arr.C.reduce((x, y) => x + y, 0) / arr.C.length).toFixed(3) : null);
        });
        graficoGeral.data.labels = labels;
        graficoGeral.data.datasets[0].data = dadosA;
        graficoGeral.data.datasets[1].data = dadosB;
        graficoGeral.data.datasets[2].data = dadosC;
        graficoGeral.update();
    } catch (erro) {
        console.error('Erro ao atualizar gráfico:', erro);
    }
}

// Atualizar gráfico a cada 2 segundos
setInterval(atualizarGraficoComHistorico, 2000);
document.addEventListener('DOMContentLoaded', atualizarGraficoComHistorico);
// === FIM DO NOVO CÓDIGO PARA O GRÁFICO ===

// Função para simular sensores e buscar do Arduino
async function obterSensores() {
    // Setor A: 4 simulados + 1 real do Arduino
    const sensoresA_simulados = Array.from({length: 4}, () => Number((Math.random() * 0.5 + 0.1).toFixed(3)));
    let sensorA_arduino = null;
    try {
        const resp = await fetch('/dashboards/visaogeral');
        const dado = await resp.json();
        sensorA_arduino = Number(parseFloat(dado.nivelMetano).toFixed(3));
    } catch {
        sensorA_arduino = Number((Math.random() * 0.5 + 0.1).toFixed(3)); // fallback
    }
    const sensoresA = [...sensoresA_simulados, sensorA_arduino];
    // Setor B: 5 simulados
    const sensoresB = Array.from({length: 5}, () => Number((Math.random() * 0.5 + 0.1).toFixed(3)));
    // Setor C: 5 simulados
    const sensoresC = Array.from({length: 5}, () => Number((Math.random() * 0.5 + 0.1).toFixed(3)));
    // Debug: mostrar valores de cada sensor
    console.log('Setor A:', sensoresA, 'Setor B:', sensoresB, 'Setor C:', sensoresC);
    return {
        A: sensoresA,
        B: sensoresB,
        C: sensoresC
    };
}
