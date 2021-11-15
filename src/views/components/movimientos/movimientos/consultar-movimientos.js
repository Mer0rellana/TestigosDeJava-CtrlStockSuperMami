function consultarMovimientos() {
  axios({
    url: 'http://localhost:3000/transaction/',
    method: 'get',
    headers: { Authorization: `Bearer ${obj.token}` },
  })
    .then((data) => {
      crearTabla(data.data)
    })
    .catch((error) => {
      console.log(error.response);
      console.log(error)
    })
}

function crearTabla(datos) {
  $("#tabla-movimientos-body tr").remove();
  for (var i = 0; i < datos.length; i++) {
    var html = "<tr>"
    html += "<td class='text-center'>" + datos[i].id + "</td>";
    html += "<td class='text-center'>" + datos[i].type + "</td>";
    html += "<td class='text-center'>" + datos[i].idUser + "</td>";
    html += "<td class='text-center'>" + datos[i].createdAt + "</td>";
    html += `<td class='text-center'><a href="./consultar-detalle.html?id=${datos[i].id}" class="seeMore" d><i class="fas fa-info"
        title="Ver Mas"></i></a></td>`;

    html += "</tr>"
    // let tabla = document.getElementById('tabla-usuario');
    // tabla.appendChild(html)B
    $("#tabla-movimientos-body").append(html);
  }
}
consultarMovimientos()

function FiltroBusqueda() {

  const type = document.getElementById('comboTipo');
  const createdAt = document.getElementById('inputFecha').value;

  if (type.selectedIndex > 0 || !(createdAt == null || createdAt == "")) {
    if (type.selectedIndex > 0 && (createdAt == null || createdAt == "")) {

      axios({
        url: 'http://localhost:3000/transaction?type=' + type.value,
        method: 'get',
        headers: { Authorization: `Bearer ${obj.token}` },
      })
        .then((data) => {
          crearTabla(data.data)
        })
    } else if (type.selectedIndex == 0 && !(createdAt == null || createdAt == "")) {
      const arrayDate = createdAt.split('-');
      const newDate = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
      axios({
        url: 'http://localhost:3000/transaction?createdAt=' + newDate,
        method: 'get',
        headers: { Authorization: `Bearer ${obj.token}` },
      })
        .then((data) => {
          crearTabla(data.data)
        })
    } else if (type.selectedIndex > 0 && !(createdAt == null || createdAt == "")) {
      const arrayDate = createdAt.split('-');
      const newDate = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
      axios({
        url: 'http://localhost:3000/transaction?createdAt=' + newDate + "&type=" + type.value,
        method: 'get',
        headers: { Authorization: `Bearer ${obj.token}` },
      })
        .then((data) => {
          crearTabla(data.data)
        })
    }

  } else {
    consultarMovimientos()
  }
}

function limpiarFiltros() {
  document.getElementById('inputFecha').value = '';
  document.getElementById('comboTipo').selectedIndex = 0;
  consultarMovimientos()
}