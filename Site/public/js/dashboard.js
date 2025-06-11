function carregarDados() {
    // Fetch para Risco de Explosão
    fetch("/dashboards/riscodeexplosao")
        .then(function (response) {
            if (response.status === 204) {
                // Se não há conteúdo, chama a função com um array vazio para limpar a KPI
                riscoDeExplosao([]);
                return Promise.reject("sem_dados"); // Impede a execução do próximo .then
            }
            return response.json();
        })
        .then(function (resposta) {
            riscoDeExplosao(resposta.sigla);
        })
        .catch(function (err) {
            if (err !== "sem_dados") {
                console.error("Erro ao buscar dados de risco:", err);
            }
        });

    // Fetch para Evacuação Total
    fetch("/dashboards/evacuacaototal")
        .then(function (response) {
            if (response.status === 204) {
                // Se não há conteúdo, chama a função com um array vazio para limpar a KPI
                evacuacaoTotal([]);
                return Promise.reject("sem_dados"); // Impede a execução do próximo .then
            }
            return response.json();
        })
        .then(function (resposta) {
            evacuacaoTotal(resposta.sigla);
        })
        .catch(function (err) {
            if (err !== "sem_dados") {
                console.error("Erro ao buscar dados de evacuação:", err);
            }
        });

    // Fetch para o gráfico (não foi alterado)
    fetch("/dashboards/visaogeral")
        .then(function (response) {
            return response.json();
        })
        .then(function (resposta) {
            atualizarGrafico(resposta);
        })
        .catch(function (err) {
            console.error("Erro ao buscar dados do gráfico:", err);
        });
}

const ctx = document.getElementById("grafico_geral");

const meuGrafico = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
  },
  options: {
    responsive: true, // Torna o gráfico responsivo
    maintainAspectRatio: false, // Permite que o gráfico use toda a altura disponível
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
    // Configurações adicionais para melhor responsividade
    interaction: {
      intersect: false,
      mode: "index",
    },
    elements: {
      point: {
        radius: 3,
      },
    },
  },
});

// Função auxiliar para gerar cores aleatórias para os novos setores
function gerarCorAleatoria() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

// Função principal modificada para lidar com múltiplos setores
function atualizarGrafico(respostas) {
  // Espera um array de respostas
  // Pega a hora da primeira resposta (assumindo que são próximas)
  const horaAtual =
    respostas.length > 0 ? respostas[0].Hora : new Date().toLocaleTimeString();

  // 1. ATUALIZAR O LABEL (EIXO X)
  const labels = meuGrafico.data.labels;
  labels.push(horaAtual);
  if (labels.length > 10) {
    // Mantém o limite de 10 pontos no eixo X
    labels.shift();
  }

  // Itera sobre cada resposta (cada setor) que veio do backend
  respostas.forEach((resposta) => {
    const siglaSetor = resposta.SiglaSetor;
    const valorMetano = parseFloat(resposta.nivelMetano);

    // 2. ENCONTRAR OU CRIAR O DATASET PARA O SETOR
    let datasetDoSetor = meuGrafico.data.datasets.find(
      (dataset) => dataset.label === siglaSetor
    );

    if (datasetDoSetor) {
      // Se o dataset já existe, apenas adiciona o novo dado
      datasetDoSetor.data.push(valorMetano);
      if (datasetDoSetor.data.length > 10) {
        datasetDoSetor.data.shift();
      }
    } else {
      // Se o dataset não existe, cria um novo
      const novaCor = gerarCorAleatoria();
      const novoDataset = {
        label: siglaSetor, // O nome da linha será a sigla do setor
        data: [valorMetano],
        borderColor: novaCor,
        borderWidth: 2,
        fill: false,
      };
      meuGrafico.data.datasets.push(novoDataset);
    }
  });

  // Garante que todos os datasets tenham o mesmo tamanho dos labels,
  // preenchendo com 'null' os que não receberam dados nesta atualização.
  meuGrafico.data.datasets.forEach((dataset) => {
    while (dataset.data.length < labels.length) {
      dataset.data.unshift(null); // Adiciona 'null' no início para dados mais antigos
    }
    while (dataset.data.length > labels.length) {
      dataset.data.shift();
    }
  });

  // 3. ATUALIZAR O GRÁFICO NA TELA
  meuGrafico.update();
}

function riscoDeExplosao(siglas) {
    // Remove duplicatas de forma eficiente e moderna
    const setoresUnicos = [...new Set(siglas)];

    // Se o array de setores estiver vazio, exibe 'Nenhum'. Senão, exibe as siglas.
    const setoresHTML = setoresUnicos.length > 0 ? setoresUnicos.join(', ') : '-';

    setores_explosao.innerHTML = `
        <div class="kpi-dashboard-pessoal" id="kpi_performance_geral">
            <h2>${setoresHTML}</h2>
        </div>
    `;
}

function evacuacaoTotal(siglas) {
    // Remove duplicatas
    const setoresUnicos = [...new Set(siglas)];
    
    // Se o array de setores estiver vazio, exibe 'Nenhum'. Senão, exibe as siglas.
    const setoresHTML = setoresUnicos.length > 0 ? setoresUnicos.join(', ') : '-';

    setores_evacuados.innerHTML = `
        <div class="kpi-dashboard-pessoal" id="kpi_performance_evacuacao">
            <h2>${setoresHTML}</h2>
        </div>
    `;
}

setInterval(carregarDados, 1000);

// Variável de controle para evitar pop-ups repetidos
let ultimoPopupAtivo = '';

// Função que verifica os dados mais recentes do gráfico
function verificarNiveisCriticos() {
    // Garante que o gráfico (graficoGeral) já foi criado pelo dashboard.js
    if (typeof graficoGeral !== 'undefined' && graficoGeral.data.datasets.length > 2) {
       
        const dadosA = graficoGeral.data.datasets[0].data;
        const dadosB = graficoGeral.data.datasets[1].data;
        const dadosC = graficoGeral.data.datasets[2].data;

        // Garante que existem dados para serem lidos
        if (dadosA.length > 0) {
            const ultimaMediaA = parseFloat(dadosA[dadosA.length - 1]);
            const ultimaMediaB = parseFloat(dadosB[dadosB.length - 1]);
            const ultimaMediaC = parseFloat(dadosC[dadosC.length - 1]);

            // Verifica se algum setor está crítico e se o alerta para ele já não foi emitido
            if (ultimaMediaA >= 1 && ultimoPopupAtivo !== 'A') {
                mostrarPopUp('A');
                ultimoPopupAtivo = 'A';
            } else if (ultimaMediaB >= 1 && ultimoPopupAtivo !== 'B') {
                mostrarPopUp('B');
                ultimoPopupAtivo = 'B';
            } else if (ultimaMediaC >= 1 && ultimoPopupAtivo !== 'C') {
                mostrarPopUp('C');
                ultimoPopupAtivo = 'C';
            }
        }
    }
}

// ==================================================================
// A FUNÇÃO QUE FALTAVA: Define o que acontece quando o pop-up é chamado
// ==================================================================
function mostrarPopUp(setor) {
    const popUp = document.getElementById('pop-up_aviso');
    const h3_aviso = popUp.querySelector('h3'); // Seleciona o h3 dentro do pop-up
    const botao = popUp.querySelector('button');

    // 1. ATUALIZA O TEXTO: Insere a mensagem com o setor correto
    h3_aviso.textContent = `Setor ${setor} está Crítico!`;

    // 2. MOSTRA O POP-UP: Adiciona a classe 'ativo' (definida no seu CSS)
    popUp.classList.add('ativo');

    // 3. DEFINE A AÇÃO DO BOTÃO: Esconde o pop-up e reseta a variável de controle
    botao.onclick = () => {
        popUp.classList.remove('ativo');
        ultimoPopupAtivo = ''; // Permite que novos alertas surjam
    };
}

// Inicia o monitoramento, chamando a verificação a cada 2 segundos
setInterval(verificarNiveisCriticos, 2000);
