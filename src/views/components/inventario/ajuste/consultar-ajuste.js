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
    html += "<td>" + datos[i].idInventory + "</td>";
        html += "<td>" + datos[i].idStock + "</td>";
        html += "<td>" + datos[i].realStock + "</td>";
        html += "<td>" + datos[i].failedRealStock + "</td>";
        html += "<td>" + datos[i].description + "</td>";

    html += `<td class="text-center"> 
      <button class="edit" onclick="rellenarCampos(${datos[i]._id})" style="font-weight: 200; color: #ffbb2f; border: none; outline: none !important; -webkit-appearance: none !important;"
      data-toggle="modal" data-target="#modalInfoAjustes"  type="button"><i class="fas fa-info"></i></button>
    </td>`
    html += "</tr>"
    $("#TablaAjuste").append(html);
  }
}
ConsultarAjuste()

function rellenarCampos(id){
    axios({
        url: 'http://localhost:3000/adjustment/?id=' + id,
        method: 'get',
        headers: {Authorization: `Bearer ${obj.token}`}

    }).then((data) =>{
        document.getElementById('modalAjuste').value = data.data[0]._id;
        document.getElementById('modalFechaCreacion').value = data.data[0].createdAt;
        document.getElementById('modalInventario').value = data.data[0].idInventory;
        document.getElementById('modalUsuario').value = data.data[0].idUser;
        document.getElementById('modalDescripcion').value = data.data[0].description;
        document.getElementById('modalStockSistema').value = data.data[0].systemStock;
        document.getElementById('modalStockReal').value = data.data[0].realStock;
        document.getElementById('modalStockFalladoSistema').value = data.data[0].failedSystemStock;
        document.getElementById('modalStockRealFallado').value = data.data[0].failedRealStock;
        
        console.log(data)
        
        console.log(data.data._id)
    })
}
