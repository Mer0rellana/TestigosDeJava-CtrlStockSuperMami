function consultarMovimientos() {
  const queryString= window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idMovimiento = urlParams.get('id');
  
  axios({
    url: 'http://localhost:3000/transaction/'+idMovimiento,
    method: 'get',
    headers: { Authorization: `Bearer ${obj.token}` },
  })
    .then((data) => {
      llenarDatos(data.data)
    })
    .catch((error) => {
      console.log(error.response);
      console.log(error)
    })
}

function llenarDatos(datos) {
  console.log(datos)
  document.getElementById("inputId").value=datos.id;
  document.getElementById("inputTipo").value=datos.type;
  document.getElementById("inputResponsable").value=datos.responsable;
  document.getElementById("inputEstado").value=datos.state;
  if (datos.updatedAt=="") {
    document.getElementById("inputFechaAnulado").value="Este movimiento no fue anulado";
  }else{
    document.getElementById("inputFechaAnulado").value=datos.updatedAt;
  }
  document.getElementById("inputFechaCreacion").value=datos.createdAt;

  if (datos.updatedAt=="") {
    document.getElementById("textRazonAnulado").value="Este movimiento no fue anulado";
  }else{
    document.getElementById("textRazonAnulado").value=datos.anulatedReason;
  }
  

  
  for (var i = 0; i < datos.batches.length; i++) {

    var html = "<tr>"
    html += "<td class='text-center'>" + datos.batches[i].id + "</td>";
    html += "<td class='text-center'>" + datos.batches[i].codeItem + "</td>";
    html += "<td class='text-center'>" + datos.batches[i].descriptionItem + "</td>";
    html += "<td class='text-center'>" + datos.batches[i].amount + "</td>";
    html += "<td class='text-center'>" + datos.batches[i].expiredAt + "</td>";
    html += "</tr>"
    // let tabla = document.getElementById('tabla-usuario');
    // tabla.appendChild(html)B
    $("#tabla-movimientos-detalle").append(html);
  }
}
consultarMovimientos()