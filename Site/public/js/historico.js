/*
// Dados fake para teste
const dadosFake = [
    {
        data: "08/06/2025",
        horario: "14:30",
        setor: "Setor A",
        idSensor: "SENS001",
        valor: "2.5 ppm"
    },
    {
        data: "08/06/2025",
        horario: "14:25",
        setor: "Setor B",
        idSensor: "SENS002",
        valor: "1.8 ppm"
    },
    {
        data: "08/06/2025",
        horario: "14:20",
        setor: "Setor A",
        idSensor: "SENS003",
        valor: "3.2 ppm"
    },
    {
        data: "08/06/2025",
        horario: "14:15",
        setor: "Setor C",
        idSensor: "SENS004",
        valor: "0.9 ppm"
    },
    {
        data: "07/06/2025",
        horario: "16:45",
        setor: "Setor B",
        idSensor: "SENS002",
        valor: "2.1 ppm"
    },
    {
        data: "07/06/2025",
        horario: "16:40",
        setor: "Setor D",
        idSensor: "SENS005",
        valor: "4.1 ppm"
    },
    {
        data: "07/06/2025",
        horario: "16:35",
        setor: "Setor A",
        idSensor: "SENS001",
        valor: "1.7 ppm"
    },
    {
        data: "06/06/2025",
        horario: "09:15",
        setor: "Setor C",
        idSensor: "SENS006",
        valor: "3.8 ppm"
    },
    {
        data: "06/06/2025",
        horario: "09:10",
        setor: "Setor B",
        idSensor: "SENS002",
        valor: "2.3 ppm"
    },
    {
        data: "06/06/2025",
        horario: "09:05",
        setor: "Setor A",
        idSensor: "SENS003",
        valor: "1.5 ppm"
    },
    {
        data: "08/06/2025",
        horario: "14:30",
        setor: "Setor A",
        idSensor: "SENS001",
        valor: "2.5 ppm"
    },
    {
        data: "08/06/2025",
        horario: "14:25",
        setor: "Setor B",
        idSensor: "SENS002",
        valor: "1.8 ppm"
    },
    {
        data: "08/06/2025",
        horario: "14:20",
        setor: "Setor A",
        idSensor: "SENS003",
        valor: "3.2 ppm"
    },
    {
        data: "08/06/2025",
        horario: "14:15",
        setor: "Setor C",
        idSensor: "SENS004",
        valor: "0.9 ppm"
    },
    {
        data: "07/06/2025",
        horario: "16:45",
        setor: "Setor B",
        idSensor: "SENS002",
        valor: "2.1 ppm"
    },
    {
        data: "07/06/2025",
        horario: "16:40",
        setor: "Setor D",
        idSensor: "SENS005",
        valor: "4.1 ppm"
    },
    {
        data: "07/06/2025",
        horario: "16:35",
        setor: "Setor A",
        idSensor: "SENS001",
        valor: "1.7 ppm"
    },
    {
        data: "06/06/2025",
        horario: "09:15",
        setor: "Setor C",
        idSensor: "SENS006",
        valor: "3.8 ppm"
    },
    {
        data: "06/06/2025",
        horario: "09:10",
        setor: "Setor B",
        idSensor: "SENS002",
        valor: "2.3 ppm"
    },
    {
        data: "06/06/2025",
        horario: "09:05",
        setor: "Setor A",
        idSensor: "SENS003",
        valor: "1.5 ppm"
    }
];
*/
/*
// Quando a página carregar, usa os dados fake
window.onload = function() {
    // Simula um pequeno delay como se fosse uma requisição real
    setTimeout(() => {
        colocarNaTabela(dadosFake);
    }, 500);
};
*/

function buscarDados() {
    console.log('Entri aq')
    fetch('/medicoes/historico')
        .then(response => response.json())
        .then(dados => {
            colocarNaTabela(dados);
        })
        .catch(erro => {
            console.log("Erro ao buscar dados:", erro);
            alert("Erro ao carregar dados!");
        });
}

// Função que coloca os dados na tabela HTML (mantém a mesma)
function colocarNaTabela(dados) {
    var tbody = document.querySelector('#tabela-historico tbody');
    
    // Limpa a tabela
    tbody.innerHTML = '';
    
    // Se não tem dados, mostra mensagem
    if (dados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="sem-dados">Nenhum dado encontrado</td></tr>';
        return;
    }
    
    // Para cada dado recebido, cria uma linha
    dados.forEach(function(item) {
        var linha = document.createElement('tr');
        
        linha.innerHTML = `
            <td>${item.data}</td>
            <td>${item.horario}</td>
            <td>${item.setor}</td>
            <td>${item.idSensor}</td>
            <td>${item.valor}</td>
        `;
        
        // Adiciona a linha na tabela
        tbody.appendChild(linha);
    });
}

// Função para filtrar tabela (mantém a mesma)
function filtrarTabela() {
    const busca = document.getElementById('input-busca').value.toLowerCase();
    const campo = document.getElementById('select-campo').value;
    const linhas = document.querySelectorAll('#tabela-historico tbody tr');
    
    linhas.forEach(linha => {
        let mostrar = false;
        
        if (campo === '') {
            // Busca em todos os campos
            mostrar = linha.textContent.toLowerCase().includes(busca);
        } else {
            // Busca no campo específico
            const colunas = linha.querySelectorAll('td');
            let indiceColuna;
            
            switch(campo) {
                case 'data': indiceColuna = 0; break;
                case 'horario': indiceColuna = 1; break;
                case 'setor': indiceColuna = 2; break;
                case 'idSensor': indiceColuna = 3; break;
                case 'valor': indiceColuna = 4; break;
            }
            
            if (colunas[indiceColuna]) {
                mostrar = colunas[indiceColuna].textContent.toLowerCase().includes(busca);
            }
        }
        
        linha.style.display = mostrar ? '' : 'none';
    });
}

// Adiciona eventos aos campos de busca
document.addEventListener('DOMContentLoaded', function() {
    const inputBusca = document.getElementById('input-busca');
    const selectCampo = document.getElementById('select-campo');
    
    if (inputBusca) {
        inputBusca.addEventListener('input', filtrarTabela);
    }
    
    if (selectCampo) {
        selectCampo.addEventListener('change', filtrarTabela);
    }
});

// Função para gerar mais dados fake (útil para teste)
function gerarMaisDados() {
    const setores = ['Setor A', 'Setor B', 'Setor C', 'Setor D', 'Setor E'];
    const novosDados = [];
    
    for (let i = 0; i < 20; i++) {
        const data = new Date();
        data.setDate(data.getDate() - Math.floor(Math.random() * 30));
        
        novosDados.push({
            data: data.toLocaleDateString('pt-BR'),
            horario: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
            setor: setores[Math.floor(Math.random() * setores.length)],
            idSensor: `SENS${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`,
            valor: `${(Math.random() * 5).toFixed(1)} ppm`
        });
    }
    
    return novosDados;
}