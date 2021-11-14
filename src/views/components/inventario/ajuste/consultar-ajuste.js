function ConsultarAjuste() {
    axios({
        url: "http://localhost:3000/adjustment/",
        method: "GET",
        headers: { Authorization: `Bearer ${obj.token}` }
    }).then((data) => {
        crearTablaAjuste(data.data);
    }).catch((error) => {
        console.log(error.reponse);
        console.log(error);
    })
}

function crearTablaAjuste(datos) {
    $("#TablaAjuste tr").remove();
    for (var i = 0; i < datos.length; i++) {
        var html = "<tr>"
        html += `<td class="text-center">` + datos[i].idInventory + "</td>";
        html += `<td class="text-center">` + datos[i].description + "</td>";
        html += `<td class="text-center">` + datos[i].realStock + "</td>";
        html += `<td class="text-center">` + datos[i].failedRealStock + "</td>";
        html += `<td class="text-center">` + datos[i].createdAt + "</td>";

        html += `<td class="text-center"> 
      <button class="edit" onclick="rellenarCampoAjuste('${datos[i]._id}')" style="font-weight: 200; background-color:white; color: #ffbb2f; border: none; outline: none !important; -webkit-appearance: none !important;"
      data-toggle="modal" data-target="#modalInfoAjustes"  type="button"><i class="fas fa-info"></i></button>
    </td>`
        html += "</tr>"
        $("#TablaAjuste").append(html);
    }
}
ConsultarAjuste()

function rellenarCampoAjuste(id) {
    console.log(id);
    axios({
        url: 'http://localhost:3000/adjustment/?_id=' + id,
        method: 'get',
        headers: { Authorization: `Bearer ${obj.token}` }

    }).then((data) => {
        console.log(data.data[0])
        document.getElementById('modalAjuste').value = data.data[0]._id;
        document.getElementById('modalFechaCreacion').value = data.data[0].createdAt;
        document.getElementById('modalInventario').value = data.data[0].idInventory;
        document.getElementById('modalUsuario').value = data.data[0].idUser;
        document.getElementById('modalDescripcion').value = data.data[0].description;
        document.getElementById('modalStockSistema').value = data.data[0].systemStock;
        document.getElementById('modalRealStock').value = data.data[0].realStock;
        document.getElementById('modalStockFalladoSistema').value = data.data[0].failedSystemStock;
        document.getElementById('modalStockFalladoReal').value = data.data[0].failedRealStock;

    })
}
