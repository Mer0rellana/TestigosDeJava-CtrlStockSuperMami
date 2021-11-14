const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Articulo 1','Articulo 2'],
        datasets: [
            {
                label: 'Salida',
                backgroundColor: 'red',
                data: [5,2]
            },
            {
                label: 'Entrada',
                backgroundColor: 'green',
                data: [1,5]
            }             
        ],
        
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});