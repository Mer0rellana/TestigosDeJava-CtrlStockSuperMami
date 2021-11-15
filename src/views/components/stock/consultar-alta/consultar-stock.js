function cargarCombo(params) {
  axios({
    url: 'http://localhost:3000/item',
    headers: { Authorization: `Bearer ${obj.token}` },
    method: 'get'
  }).
    then(data => {
      data = data.data
      let option = document.createElement("option");
      option.text = "Seleccione un artículo";
      option.value = ""
      $("#inputCodArticulo").append(option);
      for (var i = 0; i < data.length; i++) {
        option = document.createElement("option");
        option.text = data[i].description;
        option.value = data[i].code
        $("#inputCodArticulo").append(option);
      }
      $('#inputCodArticulo').selectize({
        sortField: 'text'
      });
    });


}
cargarCombo()

function ConsultarStock() {
  axios({
    url: 'http://localhost:3000/Stock/',
    method: 'get',
    headers: { Authorization: `Bearer ${obj.token}` },
  }).then((data) => {
    crearTabla(data.data)
  })
    .catch((error) => {
      console.log(error.response);
      console.log(error)
    })
}
function crearTabla(datos) {
  console.log(datos)
  $("#tabla-stock tr").remove();
  for (var i = 0; i < datos.length; i++) {
    var html = "<tr>"
    html += "<td>" + datos[i].idItem + "</td>";
    html += "<td>" + datos[i].description + "</td>";
    html += "<td>" + datos[i].currentStock + "</td>";
    html += "<td>" + datos[i].failedStock + "</td>";
    html += "<td>" + datos[i].batchStock + "</td>";
    html += "<td>" + datos[i].maxStock + "</td>";
    html += "<td>" + datos[i].minStock + "</td>";

    $("#tabla-stock").append(html);
  }
}
ConsultarStock()

function FiltroBusqueda() {

  const id = document.getElementById('inputCodArticulo').value;

  if (id.length > 0) {
    consulta = 'idItem=' + id
    axios({
      url: 'http://localhost:3000/Stock?' + consulta,
      method: 'get',
      headers: { Authorization: `Bearer ${obj.token}` },
    })
      .then((data) => {
        crearTabla(data.data)

      }).catch((error) => {
        console.log(error)
      })
  } else {
    ConsultarStock()
  }
}

function limpiarfiltros() {
  document.getElementById('inputCodArticulo').selectedIndex=0;
  ConsultarStock()
}

