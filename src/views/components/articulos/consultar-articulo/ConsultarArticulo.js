const obj = {};
document.cookie.split(';').forEach(e => {
  const key = e.split('=')[0].trim();
  const val = e.split('=')[1].trim();
  obj[key] = val;
});
function ConsultarArticulos() {
  axios({
    url: 'http://localhost:3000/item/',
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
  $("#tabla-articulos-body tr").remove();
  for (var i = 0; i < datos.length; i++) {
    var html = "<tr style='background-color: #35990750;'>"
    html += "<td>" + datos[i].code + "</td>";
    html += "<td>" + datos[i].description + "</td>";
    html += "<td>" + datos[i].price + "</td>";
    html += "<td>" + datos[i].state + "</td>";
    html += "<td>" + datos[i].group + "</td>";
    html += "<td>" + datos[i].family + "</td>";
    html += "<td>" + datos[i].unit + "</td>";
    html += "<td>" + datos[i].amount + "</td>";

    if (!(datos[i].state==='Eliminado')) {
      html += `<td class="text-center">
      <button class="edit" onclick="rellenarCampos('${datos[i].code}')" style="font-weight: 200; color: #ffbb2f; border: none;"
      data-toggle="modal" data-target="#modal-editar"  type="button"><i class="fas fa-edit"></i></button>
      <button class="delete btnEliminar" onclick="rellenarCampos('${datos[i].code}')" style="font-weight: 200; color: #9c0202e8; border: none;"
      data-toggle="modal" data-target="#deleteEmployeeModal"  type="button"><i class="fas fa-trash-alt"
      title="Eliminar"></i></button>
    </td>`
    }else{
      html += `<td class="text-center">
        <button class="edit" onclick="rellenarCampos('${datos[i].code}')" style="font-weight: 200; color: #ffbb2f; border: none;"
        data-toggle="modal" data-target="#modal-editar"  type="button"><i class="fas fa-edit"></i></button>
        <button disabled class="delete btnEliminar" style="font-weight: 200; color: #9c0202e8; border: none;"
          type="button"><i class="fas fa-trash-alt"
        title="Eliminar"></i></button>
      </td>`

    }
    
    html += "</tr>"
    // let tabla = document.getElementById('tabla-usuario');
    // tabla.appendChild(html)B
    $("#tabla-articulos-body").append(html);
  }
  {/* <a href="" class="edit" data-bs-toggle="modal"
        data-bs-target="#editEmployeeModal"><i class="fas fa-edit"
          title="Editar"></i></a>
      <a class="delete btnEliminar" data-toggle="modal"><i
        class="fas fa-trash-alt" title="Eliminar"></i></a> */}
}
ConsultarArticulos()

function rellenarCampos(id) {

  axios({
    url: 'http://localhost:3000/item?code=' + id,
    method: 'get',
    headers: { Authorization: `Bearer ${obj.token}` },
  })
    .then((data) => {
      document.getElementById('modalCode').value = data.data[0].code;
      document.getElementById('modalDescripcion').value = data.data[0].description;
      document.getElementById('modalFamilia').value = data.data[0].family;
      document.getElementById('modalGrupo').value = data.data[0].group;
      document.getElementById('modalPrecio').value = data.data[0].price;
      document.getElementById('modalUnidad').value = data.data[0].unit;
      document.getElementById('modalCantidad').value = data.data[0].amount;
    })
}

function ModArticulo() {


  const code = document.getElementById('modalCode').value;
  const description = document.getElementById('modalDescripcion').value;
  const family = document.getElementById('modalFamilia').value;
  const group = document.getElementById('modalGrupo').value;
  const price = document.getElementById('modalPrecio').value;
  const unit = document.getElementById('modalUnidad').value;
  const amount = document.getElementById('modalCantidad').value;

  const data = { description, family, group, price, unit, amount }

  console.log(data)

  axios({
    url: 'http://localhost:3000/item/update/' + code,
    method: 'PUT',
    headers: { Authorization: `Bearer ${obj.token}` },
    data
  })

    .then((data) => {
      swal.fire({
        icon: 'success',
        title: 'Item actualizado Correctamente, ¡Bravo!',
      })
        .then(
          $("#cancelarEdit").click()
        )
      ConsultarArticulos()
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 400) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error en la carga de datos`,
          })
        }
        else if (error.response.status == 401) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario no autorizado',
          })
        }
        else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un problema',
          })
        }
      }
      else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un pequeño problema',
        })
      }

    })

}

function DeleteModificar() {
  const code = document.getElementById('modalCode').value;
  axios({
    url: 'http://localhost:3000/item/update-state/' + code,
    method: 'PUT',
    headers: { Authorization: `Bearer ${obj.token}` },
  })

    .then((data) => {
      swal.fire({
        icon: 'success',
        title: 'Artìculo borrado correctamente, ¡Bravo!',
      }).then(
        $("#cancelarDelete").click()
      )
      ConsultarArticulos()
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 500) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error interno el servidor',
          })
        }
        if (error.response.status == 400) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error en la carga de datos',
          })
        }
        else if (error.response.status == 401) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario no autorizado',
          })
        }
        else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un problema',
          })
        }
      }
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un pequeño problema',
      })
    })

}

