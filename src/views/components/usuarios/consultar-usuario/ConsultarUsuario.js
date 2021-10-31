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
  for (var i = 0; i < datos.length; i++) {
    var html = "<tr>"
    html += "<td>" + datos[i].id + "</td>";
    html += "<td>" + datos[i].name + "</td>";
    html += "<td>" + datos[i].dni + "</td>";
    html += "<td>" + datos[i].tel + "</td>";
    html += "<td>" + datos[i].mail + "</td>";
    html += "<td>" + datos[i].createdAt + "</td>";
    html += "<td>" + datos[i].role + "</td>";
    html += "<td>" + datos[i].state + "</td>";

    html += `<td class="text-center">
      <button class="edit" onclick="rellenarCampos(${datos[i].id})" style="font-weight: 200; color: #ffbb2f; border: none;"
      data-toggle="modal" data-target="#editEmployeeModal"  type="button"><i class="fas fa-edit"></i></button>
      <a class="delete btnEliminar" data-toggle="modal"><i class="fas fa-trash-alt" title="Eliminar"></i></a>
    </td>`
    html += "</tr>"
    // let tabla = document.getElementById('tabla-usuario');
    // tabla.appendChild(html)B
    $("#tabla-usuario-body").append(html);
  }
  {/* <a href="" class="edit" data-bs-toggle="modal"
        data-bs-target="#editEmployeeModal"><i class="fas fa-edit"
          title="Editar"></i></a>
      <a class="delete btnEliminar" data-toggle="modal"><i
        class="fas fa-trash-alt" title="Eliminar"></i></a> */}
}
ConsultarUser()

function rellenarCampos(id) {
  console.log(id)
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

      console.log(data.data)
    })
}
