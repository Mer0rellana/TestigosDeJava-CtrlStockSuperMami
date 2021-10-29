function ConsultarUser() {
  const obj = {};
  document.cookie.split(';').forEach(e => {
    const key = e.split('=')[0].trim();
    const val = e.split('=')[1].trim();
    obj[key] = val;
  });

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
  console.log(datos)
  for (var i = 0; i < datos.length; i++) {
    console.log(datos[i])
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
      <a href="" class="edit" data-bs-toggle="modal"
        data-bs-target="#editEmployeeModal"><i class="fas fa-edit"
          title="Editar"></i></a>
      <a class="delete btnEliminar" data-toggle="modal"><i
        class="fas fa-trash-alt" title="Eliminar"></i></a>
    </td>`
    html += "</tr>"
    // let tabla = document.getElementById('tabla-usuario');
    // tabla.appendChild(html)
    $("#tabla-usuario-body").append(html);
  }

}
ConsultarUser()