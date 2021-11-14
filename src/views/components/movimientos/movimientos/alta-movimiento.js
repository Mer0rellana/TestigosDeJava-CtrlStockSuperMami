function cargarCombo(params) {
  axios({
    url: 'http://localhost:3000/item',
    headers: { Authorization: `Bearer ${obj.token}` },
    method: 'get'
  }).
    then(data => {
      data = data.data
      for (var i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.text = data[i].description;
        option.value = data[i].code
        $("#inputCodArticulo").append(option);
      }
    });


}
cargarCombo()
let arrayLotes = [];
function agregarLote() {

  const id = document.getElementById("inputIdLote").value;
  const codeItem = document.getElementById("inputCodArticulo").value;
  const amount = document.getElementById("inputCantidad").value;
  const date = document.getElementById("inputFechaExp").value;
  const arrayDate = date.split('-');
  const expiredAt = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
  const storage = document.getElementById("inputIdDeposito").value;
  const area = document.getElementById("inputIdArea").value;

  const data = { id, codeItem, amount, expiredAt, storage, area };
  arrayLotes.push(data);
  
  crearTabla(arrayLotes)
  $('#cancelar').click()
  
}

function altaMovimiento() {
  const inputTipo = document.getElementById("inputTipo").value;
  data = {
    type: inputTipo,
    batches: arrayLotes
  }
  axios({
    url: 'http://localhost:3000/transaction/add',
    headers: { Authorization: `Bearer ${obj.token}` },
    method: 'post',
    data
  })
    .then((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Movimiento creado correctamente, ¡Bravo!',
      }).then(
        $('#cancelarAltaMov').click()
      )
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 400) {
          swal.fire({
            icon: 'error',
            title: 'Hubo un problema',
            text: `${error.response.data.message}`,
          })
        }
        else if (error.response.status == 401) {
          swal.fire({
            icon: 'error',
            title: 'Hubo un problema.',
            text: 'Usuario no autorizado',
          })
        }
        else if (error.response.status == 404) {
          swal.fire({
            icon: 'error',
            title: 'Hubo un problema',
            text: error.response.data.message,
          })
        }
        else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un problema',
          })
        }
      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un pequeño problema',
        })

      }
    })
}

function borrarLote(id) {
  const newArrayLotes = arrayLotes.filter(lote =>
    lote.id !== id
  )
  arrayLotes = newArrayLotes;
  crearTabla(arrayLotes);
}

function crearTabla(datos) {
  $("#table-body-lotes tr").remove();
  for (var i = 0; i < datos.length; i++) {
    var html = "<tr>"
    html += "<td class='text-center'>" + datos[i].id + "</td>";
    html += "<td class='text-center'>" + datos[i].codeItem + "</td>";
    html += "<td class='text-center'>" + datos[i].amount + "</td>";
    html += "<td class='text-center'>" + datos[i].expiredAt + "</td>";
    html += "<td class='text-center'>" + datos[i].storage + "</td>";
    html += "<td class='text-center'>" + datos[i].area + "</td>";
    html += `<td class="text-center">
      <button class="delete btnEliminar"  style="font-weight: 200; color: #9c0202e8; border: none;"
      data-toggle="modal" data-target="#deleteEmployeeModal" onclick="borrarLote('${datos[i].id}')"  type="button"><i class="fas fa-trash-alt"
      title="Eliminar"></i></button>
    </td>`

    html += "</tr>"
    // let tabla = document.getElementById('tabla-usuario');
    // tabla.appendChild(html)B
    $("#table-body-lotes").append(html);
  }
}


