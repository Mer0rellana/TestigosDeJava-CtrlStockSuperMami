const obj = {};
document.cookie.split(';').forEach(e => {
    const key = e.split('=')[0].trim();
    const val = e.split('=')[1].trim();
    obj[key] = val;
});
function ConsultarDepositos() {
    axios({
        url: 'http://localhost:3000/storage/',
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
    $("#tabla-deposito-body tr").remove();
    for (var i = 0; i < datos.length; i++) {
        var html = "<tr>"
        html += `<td class="text-center">` + datos[i].id + "</td>";
        html += `<td class="text-center">` + datos[i].mts + "</td>";
        html += `<td class="text-center">` + datos[i].state + "</td>";
        html += `<td class="text-center">` + datos[i].availablePercentage + "</td>";

        if (!(datos[i].state === 'Inactivo')) {
            html += `<td class="text-center">
      <button class="edit" style="font-weight: 200; color: #ffbb2f; background-color: white; border: none;"
      data-toggle="modal" data-target="#editStorageModal"  type="button"><i class="fas fa-edit"></i></button>
      <button class="delete btnEliminar" style="font-weight: 200; color: #9c0202e8; background-color: white; border: none;"
      data-toggle="modal" data-target="#deleteStorageModal"  type="button"><i class="fas fa-trash-alt"
      title="Eliminar"></i></button>
    </td>`
        } else {
            html += `<td class="text-center">
        <button class="edit" style="font-weight: 200; color: #ffbb2f; background-color: white;  border: none;"
        data-toggle="modal" data-target="#editStorageModal"  type="button"><i class="fas fa-edit"></i></button>
        <button disabled class="delete btnEliminar" style="font-weight: 200; color: #9c0202e8; background-color: white; border: none;"
          type="button"><i class="fas fa-trash-alt"
        title="Eliminar"></i></button>
      </td>`

        }
        html += "</tr>"
        $("#tabla-deposito-body").append(html);
    }
}
ConsultarDepositos()

function ModificarDeposito() {
    const mts = document.getElementById('inputModalMetros').value;
    const estado = document.getElementById('inputModalEstado"').value;
   
    const data = { mts, estado}

    console.log(data)

    axios({
        url: 'http://localhost:3000/storage/update/' + code,
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

