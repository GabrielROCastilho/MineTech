const ctxGeral = document.getElementById('grafico_geral').getContext('2d');
const graficoGeral = new Chart(ctxGeral, {
    type: 'line',
    data: {
        labels: [], // será preenchido dinamicamente com as horas
        datasets: [
            {
                label: 'Setor A',
                data: [],
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2
            },
            {
                label: 'Setor B',
                data: [],
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2
            },
            {
                label: 'Setor C',
                data: [],
                backgroundColor: 'rgba(46, 204, 113, 0.7)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 1,
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
        }
    }
});
