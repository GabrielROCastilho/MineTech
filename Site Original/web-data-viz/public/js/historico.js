// Exemplo: gera dados fictícios para a tabela de histórico

function gerarHistoricoFake(qtd = 20) {
    const setores = ['A', 'B', 'C'];
    const historico = [];
    for (let i = 0; i < qtd; i++) {
        const data = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // até 7 dias atrás
        const setor = setores[Math.floor(Math.random() * setores.length)];
        const valor = (setor === 'C')
            ? (0.3 + Math.random() * 0.2).toFixed(3)
            : (Math.random() * 0.2).toFixed(3);
        historico.push({
            data: data.toLocaleDateString(),
            horario: data.toLocaleTimeString(),
            setor,
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
            <td>${item.valor}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Ao carregar a página, preenche a tabela
document.addEventListener('DOMContentLoaded', () => {
    const historico = gerarHistoricoFake(30); // 30 linhas de exemplo
    preencherTabela(historico);
});