
function ConsultarInventario() {
  axios({
    url: 'http://localhost:3000/inventory/',
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
  $("#tabla-inventario tr").remove();
  for (var i = 0; i < datos.length; i++) {
    var html = "<tr>"

    html += "<td>" + datos[i].idItem + "</td>";
    html += "<td>" + datos[i].description + "</td>";
    html += "<td>" + datos[i].idUser + "</td>";
    html += "<td>" + datos[i].createdAt + "</td>";
    datos[i].adjusted ? html += "<td> <button style='background-color: #00bb2d; color: white; border-radius: 10px;'>Sí</button></td>" : html += "<td> <button style='background-color :#9c0202e8; color: white; border-radius: 10px';>No</button></td>";
    datos[i].state == 'Activo' ? html += "<td> <button style='background-color: #00bb2d; color: white; border-radius: 10px;'>Activo</button></td>" : html += "<td> <button style='background-color :#9c0202e8; color: white; border-radius: 10px';>Inactivo</button></td>";

    html += `<td class="text-center"> 
      <button class="edit" onclick="rellenarCampos('${datos[i]._id}')"  style="font-weight: 200; background-color: white; color: #ffbb2f; border: none; outline: none !important; -webkit-appearance: none !important;"
      data-toggle="modal" data-target="#modalInfo"  type="button"><i class="fas fa-info"
                                                    title="Ver Mas"></i></button>
      <button class="edit"  style="font-weight: 200; background-color: white;  color: #217025; border: none; outline: none !important; -webkit-appearance: none !important;"
      data-toggle="modal" data-target="#deleteEmployeeModal" onclick="ModInventario('${datos[i]._id}')"  type="button"><i class="fas fa-wrench"
                                                    title="Ajustar"></i></button>
      <button class="edit"  style="font-weight: 200; background-color: white;  color: #9c0202e8; border: none; outline: none !important; -webkit-appearance: none !important;"
      data-toggle="modal" data-target="#deleteEmployeeModal" onclick="EliminarInventario('${datos[i]._id}')"  type="button"><i class="fas fa-trash-alt"></i></button>
    </td>`
    html += "</tr>"
    $("#tabla-inventario").append(html);

  }

}
ConsultarInventario()

function rellenarCampos(id) {
  axios({
    url: 'http://localhost:3000/inventory/detail?id=' + id,
    method: 'get',
    headers: { Authorization: `Bearer ${obj.token}` },
  })
    .then((data) => {

      document.getElementById('inputInventario').value = data.data._id;
      document.getElementById('inputResponsable').value = data.data.idUser;
      document.getElementById('modalObservaciones').value = data.data.observation;
      document.getElementById('modalDeposito').value = data.data.idStorage;
      document.getElementById('inputFechaCreacion').value = data.data.createdAt;
      document.getElementById('inputFechaModi').value = data.data.updatedAt;
      let state= '';
      data.data.adjusted ? state = "Ajustado" : state= "No ajustado";
      document.getElementById('inputAjustes').value = state;
      document.getElementById('inputCodArticulo').value = data.data.idItem;
      document.getElementById('inputDescripcion').value = data.data.description;
      document.getElementById('modalStockReal').value = data.data.realStock;
      document.getElementById('modalStockFallado').value = data.data.failedRealStock;
      document.getElementById('inputEstado').value = data.data.state;

      console.log(data.data.observation)

    })
}

function ModInventario(id) {
  Swal.fire({
    title: '¿Estas seguro de querer ajustar el inventario?',
    text: "¡No podrás revertir esta acción!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00bb2d',
    cancelButtonColor: '#9c0202e8',
    confirmButtonText: '¡Si, ajustar!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        url: 'http://localhost:3000/adjustment/add/' + id,
        method: 'post',
        headers: { Authorization: `Bearer ${obj.token}` },
      }).then(() => {
        Swal.fire(
          '¡Inventario Ajustado correctamente!',
          'Operación realizada con éxito',
          'success'
        )
        ConsultarInventario()
      }).catch((error) => {
        if (error.response) {
          if (error.response.status == 404) {
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${error.response.data.message}`
            })
          }
          if (error.response.status == 401) {
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario no autorizado',
            })
          }
        }
      })
    }
  })
}

function EliminarInventario(id) {
  Swal.fire({
    title: '¿Estás seguro de querer eliminar este inventario?',
    text: "¡No podras revertir esta acción!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00bb2d',
    cancelButtonColor: '#9c0202e8',
    confirmButtonText: '¡Si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        url: 'http://localhost:3000/inventory/updateState/' + id,
        method: 'put',
        headers: { Authorization: `Bearer ${obj.token}` }
      })
        .then(() => {
          Swal.fire(
            '¡Inventario Eliminado correctamente!',
            'Operación realizada con éxito',
            'success'
          )
          ConsultarInventario()
        })
        .catch((error) => {
          console.log(error.response)
          if (error.response) {
            if (error.response.status == 404) {
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.message}`
              })
            }
            if (error.response.status == 401) {
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario no autorizado',
              })
            }
            if (error.response.status == 400) {
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.message}`
              })
            }
          }
        })
    }
  })
}

function FiltroBusqueda() {
  const id = document.getElementById('filtroInventario').value;
  if (id.length > 0) {
    let id = '';
    consulta = 'id=' + id
    axios({
      url: 'http://localhost:3000/inventory/?' + consulta,
      method: 'get',
      headers: { Authorization: `Bearer ${obj.token}` },
    }).then((data) => {
      crearTabla(data.data)
    })
  } else {
    ConsultarInventario()
  }
}
function LimpiarFiltro() {
  document.getElementById('filtroInventario').value = '';
  ConsultarInventario()
}