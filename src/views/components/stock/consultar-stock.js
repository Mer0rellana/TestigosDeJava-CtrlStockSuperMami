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
  $("#tabla-stock tr").remove();
  for (var i = 0; i < datos.length; i++) {
    var html = "<tr>"
    html += "<td>" + datos[i].idItem + "</td>";
    html += "<td>" + datos[i].currentStock + "</td>";
    html += "<td>" + datos[i].failedStock + "</td>";
    html += "<td>" + datos[i].maxStock + "</td>";
    html += "<td>" + datos[i].minStock + "</td>";

    html += `<td class="text-center"> 
      <button class="edit" onclick="rellenarCampos(${datos[i].id})" style="font-weight: 200; color: #ffbb2f; border: none; outline: none !important; -webkit-appearance: none !important;"
      data-toggle="modal" data-target="#editEmployeeModal"  type="button"><i class="fas fa-edit"></i></button>
      <button class="edit" onclick="rellenarCampos(${datos[i].id})" style="font-weight: 200; color: #9c0202e8; border: none; outline: none !important; -webkit-appearance: none !important;"
      data-toggle="modal" data-target="#deleteEmployeeModal"  type="button"><i class="fas fa-trash-alt"></i></button>
    </td>`
    html += "</tr>"
    $("#tabla-stock").append(html);
  }
}
ConsultarStock()
