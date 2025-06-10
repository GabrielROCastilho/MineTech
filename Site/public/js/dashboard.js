// --- Elementos do DOM ---
const dashboardContent = document.getElementById('dashboard_content');

// --- Configuração do Gráfico ---
const ctx = document.getElementById('grafico_geral');
const meuGrafico = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Nível de Metano',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 5
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'right'
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        elements: {
            point: {
                radius: 3
            }
        }
    }
});

// --- Funções de Atualização de Conteúdo ---
function atualizarRiscoDeExplosaoKPI(siglas) {
    const elementoKPI = document.getElementById('setores_explosao_siglas');
    if (elementoKPI) {
        if (siglas && siglas.length > 0) {
            elementoKPI.innerText = siglas.join(', ');
            elementoKPI.style.color = '#B71C1C';
        } else {
            elementoKPI.innerText = '-';
            elementoKPI.style.color = '#B71C1C';
        }
    }
}

function atualizarEvacuacaoTotalKPI(siglas) {
    const elementoKPI = document.getElementById('setores_evacuados_siglas');
    if (elementoKPI) {
        if (siglas && siglas.length > 0) {
            elementoKPI.innerText = siglas.join(', ');
            elementoKPI.style.color = '#B71C1C';
        } else {
            elementoKPI.innerText = '-';
            elementoKPI.style.color = '#B71C1C';
        }
    }
}

function atualizarGrafico(resposta) {
    const labels = meuGrafico.data.labels;
    const data = meuGrafico.data.datasets[0].data;
    var valor = parseFloat(resposta.nivelMetano);

    labels.push(resposta.hora);
    data.push(valor);

    if (labels.length > 10) {
        labels.shift();
        data.shift();
    }

    meuGrafico.update();
}

// --- Funções de Fetch para o Backend ---
async function fetchKPIs() {
    try {
        const [riscoResponse, evacuacaoResponse] = await Promise.all([
            fetch('/dashboards/riscodeexplosao'),
            fetch('/dashboards/evacuacaototal')
        ]);

        if (riscoResponse.ok && riscoResponse.status !== 204) {
            const riscoData = await riscoResponse.json();
            if (riscoData.sigla && riscoData.sigla.length > 0) {
                atualizarRiscoDeExplosaoKPI(riscoData.sigla);
            } else {
                atualizarRiscoDeExplosaoKPI([]);
            }
        } else {
            atualizarRiscoDeExplosaoKPI([]);
        }

        if (evacuacaoResponse.ok && evacuacaoResponse.status !== 204) {
            const evacuacaoData = await evacuacaoResponse.json();
            if (evacuacaoData.sigla && evacuacaoData.sigla.length > 0) {
                atualizarEvacuacaoTotalKPI(evacuacaoData.sigla);
            } else {
                atualizarEvacuacaoTotalKPI([]);
            }
        } else {
            atualizarEvacuacaoTotalKPI([]);
        }

    } catch (err) {
        console.error("Erro ao buscar dados das KPIs:", err);
        atualizarRiscoDeExplosaoKPI([]);
        atualizarEvacuacaoTotalKPI([]);
    }
}

async function fetchGrafico() {
    try {
        const response = await fetch('/dashboards/visaogeral');

        if (response.ok && response.status !== 204) {
            const resposta = await response.json();
            if (resposta.nivelMetano !== undefined && resposta.hora !== undefined) {
                atualizarGrafico(resposta);
            } else {
                console.warn("Resposta da visão geral incompleta para o gráfico.");
            }
        } else {
            console.warn("Nenhum dado de visão geral encontrado ou erro de resposta.");
        }
    } catch (err) {
        console.error("Erro ao buscar os dados do gráfico:", err);
    }
}

// --- Início: Dispara a lógica quando o DOM estiver pronto ---
// Seu código JavaScript existente (elementos do DOM, funções de atualização, fetches, etc.)

// --- Início: Dispara a lógica quando o DOM estiver pronto ---
document.addEventListener('DOMContentLoaded', async () => {
    // ... todo o código que já estava aqui dentro do DOMContentLoaded ...

    // Garante que a dashboard esteja visível por padrão
    if (dashboardContent) {
        dashboardContent.style.display = 'flex';
    }

    // Inicia as atualizações imediatamente
    fetchKPIs(); // Primeira chamada para preencher as KPIs
    fetchGrafico(); // Primeira chamada para preencher o gráfico

    setInterval(fetchKPIs, 5000); // Atualiza KPIs a cada 5 segundos
    setInterval(fetchGrafico, 1000); // Atualiza gráfico a cada 1 segundo

    // --- Lógica para o Menu de Navegação (Navbar) ---
    const buguerIcon = document.getElementById('buguer');
    const menuOpcao = document.getElementById('opcao');

    if (buguerIcon && menuOpcao) { // Garante que os elementos existem
        buguerIcon.addEventListener('click', () => {
            menuOpcao.classList.toggle('visivel');
        });

        // Opcional: Fechar o menu se clicar fora dele
        document.addEventListener('click', (event) => {
            if (!menuOpcao.contains(event.target) && !buguerIcon.contains(event.target)) {
                menuOpcao.classList.remove('visivel');
            }
        });
    }
});