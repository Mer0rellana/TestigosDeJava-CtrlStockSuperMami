let myChart;

function estableceDatos(data) {
    const canvas = document.getElementById('myChart')
    if (myChart) {
        myChart.destroy();
    }
    const ctx = canvas.getContext('2d');
    const labels = [];
    const dataExit = [];
    const dataEntry = [];
    data.map(d => {
        labels.push(d.description);
        dataExit.push(d.exit)
        dataEntry.push(d.entry)
    })
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Salida',
                    backgroundColor: 'red',
                    data: dataExit
                },
                {
                    label: 'Entrada',
                    backgroundColor: 'green',
                    data: dataEntry
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
}
function traerDatos() {
    const comboOrden = document.getElementById('comboOrden').value;

    axios({
        url: 'http://localhost:3000/report/entries/?order=' + comboOrden,
        method: 'get',
        headers: { Authorization: `Bearer ${obj.token}` },
    }).then((data) => {
        //console.log(data.data)
        estableceDatos(data.data)
    })

}
traerDatos()

function traerDatos2() {
    axios({
        url: 'http://localhost:3000/report/restock',
        method: 'get',
        headers: { Authorization: `Bearer ${obj.token}` },
    }).then((data) => {
        console.log(data.data)
        crearTabla(data.data)
    }).catch((error) => {
        console.log(error.response)
        console.log(error)
    })

}

function crearTabla(data) {
    console.log(data)
    $("#table-articulos-body tr").remove();
    for (var i = 0; i < data.length; i++) {
        var html = "<tr>"
        html += "<td>" + data[i].idItem + "</td>";
        html += "<td>" + data[i].description + "</td>";
        html += "<td>" + data[i].currentStock + "</td>";
        html += "<td>" + data[i].minStock + "</td>";
        html += "</tr>"
        $("#table-articulos-body").append(html);
    }
}
traerDatos2()