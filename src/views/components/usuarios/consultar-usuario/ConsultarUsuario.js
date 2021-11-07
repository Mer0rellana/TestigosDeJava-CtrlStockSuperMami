const obj = {};
document.cookie.split(';').forEach(e => {
  const key = e.split('=')[0].trim();
  const val = e.split('=')[1].trim();
  obj[key] = val;
});
function ConsultarUser() {
  axios({
    url: 'http://localhost:3000/user/',
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
  $("#tabla-usuario-body tr").remove();
  for (var i = 0; i < datos.length; i++) {
    var html = "<tr>"
    html += "<td>" + datos[i].id + "</td>";
    html += "<td>" + datos[i].name + "</td>";
    html += "<td>" + datos[i].dni + "</td>";
    html += "<td>" + datos[i].tel + "</td>";
    html += "<td>" + datos[i].mail + "</td>";
    html += "<td>" + datos[i].createdAt + "</td>";
    html += "<td>" + datos[i].role + "</td>";
    datos[i].state ? html += "<td> <button style='background-color: #00bb2d; color: white; border-radius: 10px;'>Activo</button></td>" : html += "<td> <button style='background-color :#9c0202e8; color: white; border-radius: 10px';>Inactivo</button></td>";


    html += `<td class="text-center"> 
      <button class="edit" onclick="rellenarCampos(${datos[i].id})" style="font-weight: 200; color: #ffbb2f; border: none; outline: none !important; -webkit-appearance: none !important;"
      data-toggle="modal" data-target="#editEmployeeModal"  type="button"><i class="fas fa-edit"></i></button>
      <button class="edit" onclick="rellenarCampos(${datos[i].id})" style="font-weight: 200; color: #9c0202e8; border: none; outline: none !important; -webkit-appearance: none !important;"
      data-toggle="modal" data-target="#deleteEmployeeModal"  type="button"><i class="fas fa-trash-alt"></i></button>
    </td>`
    html += "</tr>"
    $("#tabla-usuario-body").append(html);
  }
}
ConsultarUser()

function rellenarCampos(id) {
  axios({
    url: 'http://localhost:3000/user?id=' + id,
    method: 'get',
    headers: { Authorization: `Bearer ${obj.token}` },
  })
    .then((data) => {

      document.getElementById('modalLegajo').value = data.data[0].id;
      document.getElementById('modalDNI').value = data.data[0].dni;
      document.getElementById('modalRol').value = data.data[0].role;
      document.getElementById('modalNombre').value = data.data[0].name;
      document.getElementById('modalTelefono').value = data.data[0].tel;
      document.getElementById('modalEmail').value = data.data[0].mail;


    })
}
function ModUsuario() {
  const id = document.getElementById('modalLegajo').value;
  const dni = document.getElementById('modalDNI').value;
  const role = document.getElementById('modalRol').value;
  const name = document.getElementById('modalNombre').value;
  const tel = document.getElementById('modalTelefono').value;
  const mail = document.getElementById('modalEmail').value;


  const data = { id, dni, role, name, tel, mail }


  axios({
    url: 'http://localhost:3000/user/put/' + id,
    method: 'PUT',
    headers: { Authorization: `Bearer ${obj.token}` },
    data
  })

    .then((data) => {
      swal.fire({
        icon: 'success',
        title: 'Usuario actualizado con éxito, ¡Bravo!',
      }).then(
        $('#cancelarEdit').click()
      )

      ConsultarUser()
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 400) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error interno el servidor',
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

function DeleteUsuario() {
  const id = document.getElementById('modalLegajo').value;
  axios({
    url: 'http://localhost:3000/user/deleteUser/' + id,
    method: 'PUT',
    headers: { Authorization: `Bearer ${obj.token}` },
  })

    .then((data) => {
      swal.fire({
        icon: 'success',
        title: 'Usuario borrado Correctamente, Ahora se encuentra inactivo',
      })
        .then(
          $('#cancelarDelete').click()
        )
      ConsultarUser()
    })
    .catch((error) => {
      if (error.response.status == 400) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error interno el servidor',
        })
      }
    })
}

function FiltroBusqueda(tipo) {

  const id = document.getElementById('inputLegajo').value;
  const select = document.getElementById('comboRol');
  console.log(select === 'Rol')
  if (id.length > 0 || select.selectedIndex > 0) {
    let consulta = '';
    if (tipo == 'Rol') {
      consulta = 'role=' + select.value
    } else {
      consulta = 'id=' + id
    }
    axios({
      url: 'http://localhost:3000/user?' + consulta,
      method: 'get',
      headers: { Authorization: `Bearer ${obj.token}` },
    })
      .then((data) => {

        crearTabla(data.data)
      })
  } else {
    ConsultarUser()
  }
}

function limpiarFiltros() {
  document.getElementById('inputLegajo').value = '';
  document.getElementById('comboRol').selectedIndex = 0;
  ConsultarUser()
}

