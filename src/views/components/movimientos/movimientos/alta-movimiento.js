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
  const combo = document.getElementById("inputCodArticulo");
  const codeItem = combo.value;
  const descriptionItem = combo.options[combo.selectedIndex].text;
  const amount = document.getElementById("inputCantidad").value;
  const date = document.getElementById("inputFechaExp").value;
  const storage = document.getElementById("inputIdDeposito").value;
  const area = document.getElementById("inputIdArea").value;
  const arrayDate = date.split('-');
  const expiredAt = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
  let data = {}
  if(expiredAt !== "undefined/undefined/") {
    data = { id, codeItem, descriptionItem, amount, expiredAt, storage, area };
  } else {
    data = { id, codeItem, descriptionItem, amount, storage, area };
  }
  
  if (!(arrayLotes.some((l) => l.id === data.id))) {

    //const loteEliminado=lotes.find(l=>l.id===data.id);
    arrayLotes.push(data);
    lotes = lotes.filter(l => l.id !== data.id)
    cargarComboLotes()
  }


  crearTabla(arrayLotes)
  $("#inputTipo").prop("disabled", false);
  if (arrayLotes.length > 0) {
    $("#inputTipo").prop("disabled", true);
  }
  $('#cancelar').click()
  limpiarCampos()

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
        $('#volver').click()
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

  const loteBorrado = arrayLotes.find(lote =>
    lote.id === id
  )
  loteBorrado.idStorage = loteBorrado.storage;
  loteBorrado.idArea = loteBorrado.area;

  lotes.push(loteBorrado);
  arrayLotes = arrayLotes.filter(lote =>
    lote.id !== id
  );
  cargarComboLotes()
  crearTabla(arrayLotes);
  $("#inputTipo").prop("disabled", false);
  if (arrayLotes.length > 0) {
    $("#inputTipo").prop("disabled", true);
  }
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
      <button class="delete btnEliminar"  style="font-weight: 200; background-color: white; color: #9c0202e8; border: none;"
      data-toggle="modal" data-target="#deleteEmployeeModal" onclick="borrarLote('${datos[i].id}')"  type="button"><i class="fas fa-trash-alt"
      title="Eliminar"></i></button>
    </td>`

    html += "</tr>"
    // let tabla = document.getElementById('tabla-usuario');
    // tabla.appendChild(html)B
    $("#table-body-lotes").append(html);
  }
}

let lotes = [];
async function llenarLotes() {
  await axios({
    url: 'http://localhost:3000/batch',
    headers: { Authorization: `Bearer ${obj.token}` },
    method: 'get'
  }).
    then(data => {
      data = data.data
      data.map((d) => {
        if (d.state === "Ingresado") {
          lotes.push(d)
        }
      })
    });
}
llenarLotes();

function movimientoSalida() {
  const comboValue = document.getElementById("inputTipo").value;
  const input = document.getElementById("inputIdLote");
  const divIdLote = document.getElementById("divIdLote");
  divIdLote.removeChild(input);
  if (comboValue !== "Entrada") {
    $("#modalAgregar :input[type='text']").prop("disabled", true);
    $("#modalAgregar :input[type='date']").prop("disabled", true);
    $("#modalAgregar :input[type='number']").prop("disabled", true);
    const inputLote = document.createElement("select");
    inputLote.id = "inputIdLote";
    inputLote.className = "verde form-control";
    divIdLote.appendChild(inputLote);
    cargarComboLotes();
    inputLote.onchange = llenarDatosLotes;
    llenarDatosLotes()
  } else {
    $("#modalAgregar :input[type='text']").prop("disabled", false);
    $("#modalAgregar :input[type='date']").prop("disabled", false);
    $("#modalAgregar :input[type='number']").prop("disabled", false);
    const inputLote = document.createElement("input");
    inputLote.id = "inputIdLote";
    inputLote.className = "verde form-control"
    divIdLote.appendChild(inputLote);
    document.getElementById("inputIdLote").value="";
    document.getElementById("inputCodArticulo").selectedIndex=0;
    document.getElementById("inputCantidad").value="";
    document.getElementById("inputFechaExp").value=""
    document.getElementById("inputIdDeposito").selectedIndex=0;
    document.getElementById("inputIdArea").value="";

  }
}

function llenarDatosLotes() {
  const select = document.getElementById("inputIdLote").value;
  const selectedLote = lotes.find((l) => l.id === select);
  document.getElementById("inputIdLote").value = selectedLote.id;
  document.getElementById("inputCodArticulo").value = selectedLote.codeItem;
  document.getElementById("inputCantidad").value = selectedLote.amount;
  const date = selectedLote.expiredAt;
  const arrayDate = date.split('/');
  const expiredAt = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`;
  document.getElementById("inputFechaExp").value = expiredAt;
  document.getElementById("inputIdDeposito").value = selectedLote.idStorage;
  document.getElementById("inputIdArea").value = selectedLote.idArea;
}

function cargarComboLotes() {
  $("#inputIdLote option").remove();
  for (var i = 0; i < lotes.length; i++) {
    let option = document.createElement("option");
    option.text = lotes[i].id;
    option.value = lotes[i].id
    $("#inputIdLote").append(option);
  }
}

function limpiarCampos() {

  document.getElementById('inputIdLote').value = '';
  document.getElementById('inputCodArticulo').selectedIndex = -1;
  document.getElementById('inputCantidad').value = '';
  document.getElementById('inputFechaExp').value = '';
  document.getElementById('inputIdDeposito').selectedIndex = -1;
  document.getElementById('inputIdArea').value = '';
}