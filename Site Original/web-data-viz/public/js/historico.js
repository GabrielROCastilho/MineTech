// Exemplo: gera dados fictícios para a tabela de histórico

function gerarHistoricoFake(qtd = 30) {
    const setores = ['A', 'B', 'C'];
    const historico = [];
    for (let i = 0; i < qtd; i++) {
        const data = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // até 7 dias atrás
        const setor = setores[Math.floor(Math.random() * setores.length)];
        // IDs de sensores fictícios: 1-5 para A, 6-10 para B, 11-14 para C
        let idSensor;
        if (setor === 'A') idSensor = Math.floor(Math.random() * 5) + 1;
        else if (setor === 'B') idSensor = Math.floor(Math.random() * 5) + 6;
        else idSensor = Math.floor(Math.random() * 4) + 11;
        const valor = (setor === 'C')
            ? (0.3 + Math.random() * 0.2).toFixed(3)
            : (Math.random() * 0.2).toFixed(3);
        historico.push({
            data: data.toLocaleDateString(),
            horario: data.toLocaleTimeString(),
            setor,
            idSensor,
            valor
        });
    }
    return historico;
}

function preencherTabela(historico) {
    const tbody = document.querySelector('#tabela-historico tbody');
    tbody.innerHTML = '';
    historico.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.data}</td>
            <td>${item.horario}</td>
            <td>${item.setor}</td>
            <td>${item.idSensor}</td>
            <td>${item.valor}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para filtrar a tabela conforme o texto digitado e o campo selecionado
function filtrarTabela() {
    const busca = document.getElementById('input-busca').value.toLowerCase();
    const campo = document.getElementById('select-campo').value;
    const linhas = document.querySelectorAll('#tabela-historico tbody tr');
    linhas.forEach(linha => {
        let mostrar = false;
        if (!campo || campo === '') {
            mostrar = linha.textContent.toLowerCase().includes(busca);
        } else {
            let idx = 0;
            if (campo === 'data') idx = 0;
            else if (campo === 'horario') idx = 1;
            else if (campo === 'setor') idx = 2;
            else if (campo === 'idSensor') idx = 3;
            else if (campo === 'valor') idx = 4;
            const celula = linha.children[idx];
            if (celula && celula.textContent.toLowerCase().includes(busca)) {
                mostrar = true;
            }
        }
        linha.style.display = mostrar ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const historico = gerarHistoricoFake(30); // 30 linhas de exemplo
    preencherTabela(historico);
    document.getElementById('input-busca').addEventListener('input', filtrarTabela);
    document.getElementById('select-campo').addEventListener('change', filtrarTabela);
});