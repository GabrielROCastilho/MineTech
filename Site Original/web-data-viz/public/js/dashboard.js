const ctxGeral = document.getElementById('grafico_geral').getContext('2d');

// Criar o gráfico usando Chart.js
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

// Variável para contar setores críticos
let setoresCriticos = 0;
let ultimoPopup = '';

// Função para gerar dados de teste
function gerarDadosTeste() {
    const agora = new Date();
    const horario = agora.getHours() + ':' + agora.getMinutes().toString().padStart(2, '0') + ':' + agora.getSeconds().toString().padStart(2, '0');

    const sensores = [];
    // Setor A (0-4): 0.0 a 0.2
    for (let i = 0; i < 5; i++) {
        let valor = Math.random() * 0.2;
        if (Math.random() < 0.15) {
            valor = 1 + Math.random() * 0.2;
        }
        sensores.push(Number(valor.toFixed(3)));
    }
    // Setor B (5-9): 0.0 a 0.2
    for (let i = 5; i < 10; i++) {
        let valor = Math.random() * 0.2;
        if (Math.random() < 0.15) {
            valor = 1 + Math.random() * 0.2;
        }
        sensores.push(Number(valor.toFixed(3)));
    }
    // Setor C (10-13): 0.3 a 0.5
    for (let i = 10; i < 14; i++) {
        let valor = 0.3 + Math.random() * 0.2;
        if (Math.random() < 0.15) {
            valor = 1 + Math.random() * 0.2;
        }
        sensores.push(Number(valor.toFixed(3)));
    }
    return { horario: horario, sensores: sensores };
}

// Função para verificar setores críticos
function verificarSetoresCriticos(dados) {
    let novosSetoresCriticos = 0;

    // Calcular médias dos setores
    const mediaA = dados.sensores.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
    const mediaB = dados.sensores.slice(5, 10).reduce((a, b) => a + b, 0) / 5;
    const mediaC = dados.sensores.slice(10, 14).reduce((a, b) => a + b, 0) / 4;

    // Verificar Setor A (média)
    if (mediaA >= 1) {
        novosSetoresCriticos++;
        if (ultimoPopup !== 'A') {
            mostrarPopUp('A');
            ultimoPopup = 'A';
        }
    }

    // Verificar Setor B (média)
    if (mediaB >= 1) {
        novosSetoresCriticos++;
        if (ultimoPopup !== 'B') {
            mostrarPopUp('B');
            ultimoPopup = 'B';
        }
    }

    // Verificar Setor C (média)
    if (mediaC >= 1) {
        novosSetoresCriticos++;
        if (ultimoPopup !== 'C') {
            mostrarPopUp('C');
            ultimoPopup = 'C';
        }
    }

    // Se não há mais setores críticos, limpar último popup
    if (novosSetoresCriticos === 0) {
        ultimoPopup = '';
    }

    setoresCriticos = novosSetoresCriticos;

    // Atualizar display
    const elementoSetores = document.getElementById('setores_criticos');
    if (elementoSetores) {
        elementoSetores.textContent = setoresCriticos;

        const statusSistema = document.getElementById('status_sitema');
        if (setoresCriticos > 0) {
            statusSistema.classList.add('alerta-critico');
        } else {
            statusSistema.classList.remove('alerta-critico');
        }
    }
}

// Função para registrar dados no backend
async function registrarMedicaoNoBackend(dados, origem = 'simulado') {
    try {
        await fetch('/api/medicao/registrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                horario: new Date().toISOString().slice(0, 19).replace('T', ' '),
                sensores: dados.sensores,
                origem: origem
            })
        });
    } catch (erro) {
        console.error('Erro ao registrar medição no backend:', erro);
    }
}

// Função para buscar dados do Arduino (real)
async function buscarDadosArduino() {
    try {
        // Substitua pelo IP do seu Arduino
        const resposta = await fetch('http://192.168.1.100/dados');
        if (!resposta.ok) throw new Error('Arduino não respondeu');
        const dados = await resposta.json();
        // Registrar dados reais no backend
        await registrarMedicaoNoBackend(dados, 'arduino');
        return dados;
    } catch (erro) {
        console.error('Erro ao conectar Arduino:', erro);
        // Se falhar, gera e registra dados simulados
        const dadosSimulados = gerarDadosTeste();
        await registrarMedicaoNoBackend(dadosSimulados, 'simulado');
        return dadosSimulados;
    }
}

// Função principal para atualizar gráfico
async function atualizarGrafico() {
    try {
        // Buscar dados reais do Arduino ou simular se falhar
        const dados = await buscarDadosArduino();
        // Calcular médias dos setores
        const mediaA = dados.sensores.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
        const mediaB = dados.sensores.slice(5, 10).reduce((a, b) => a + b, 0) / 5;
        const mediaC = dados.sensores.slice(10, 14).reduce((a, b) => a + b, 0) / 4;
        // Adicionar novo horário
        graficoGeral.data.labels.push(dados.horario);
        if (graficoGeral.data.labels.length > 15) {
            graficoGeral.data.labels.shift();
        }
        // Adicionar médias aos datasets
        graficoGeral.data.datasets[0].data.push(Number(mediaA.toFixed(3)));
        graficoGeral.data.datasets[1].data.push(Number(mediaB.toFixed(3)));
        graficoGeral.data.datasets[2].data.push(Number(mediaC.toFixed(3)));
        graficoGeral.data.datasets.forEach(ds => {
            if (ds.data.length > 15) ds.data.shift();
        });
        // Verificar setores críticos
        verificarSetoresCriticos(dados);
        graficoGeral.update('none');
    } catch (erro) {
        console.error('Erro ao atualizar gráfico:', erro);
    }
}

// Inicializar quando página carregar
document.addEventListener('DOMContentLoaded', function () {
    console.log('Sistema MineTech iniciado!');
    // Primeira atualização
    atualizarGrafico();
    // Atualizar a cada 3 segundos
    setInterval(atualizarGrafico, 1000);
    console.log('Monitoramento automático ativado!');
});

/* 
PARA CONECTAR COM ARDUINO REAL, USE ESTE CÓDIGO:

async function buscarDadosArduino() {
    try {
        // Substitua pelo IP do seu Arduino
        const resposta = await fetch('http://192.168.1.100/dados');
        
        if (!resposta.ok) {
            throw new Error('Arduino não respondeu');
        }
        
        const dados = await resposta.json();
        // Formato esperado: { "horario": "14:30:25", "sensores": [0.1, 0.2, ...] }
        
        return dados;
        
    } catch (erro) {
        console.error('Erro ao conectar Arduino:', erro);
        return gerarDadosTeste(); // usar dados simulados se falhar
    }
}

// Para usar dados reais, substitua gerarDadosTeste() por:
// const dados = await buscarDadosArduino();
*/