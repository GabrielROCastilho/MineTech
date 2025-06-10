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
    datasets: [
      {
        label: "Nível de Metano",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
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
