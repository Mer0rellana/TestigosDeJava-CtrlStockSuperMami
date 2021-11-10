
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
      <button class="edit" onclick="rellenarCampos('${datos[i].id}')" style="font-weight: 200; color: #ffbb2f; background-color: white; border: none;"
      data-toggle="modal" data-target="#editStorageModal"  type="button"><i class="fas fa-edit"></i></button>
      <button type="button" data-toggle="modal" id="btnAreas" onclick="verAreas('${datos[i].id}')"data-target="#modalAreas" class="edit" style="font-weight: 200; color: #1e450c; background-color: white; border: none;"><i
      class="fas fa-eye"></i></button>
      <button class="delete btnEliminar" onclick="rellenarCampos('${datos[i].id}')"  style="font-weight: 200; color: #9c0202e8; background-color: white; border: none;"
      data-toggle="modal" data-target="#deleteStorageModal"  type="button"><i class="fas fa-trash-alt"
      title="Eliminar"></i></button>
    </td>`
        } else {
            html += `<td class="text-center">
        <button class="edit" onclick="rellenarCampos('${datos[i].id}')" style="font-weight: 200; color: #ffbb2f; background-color: white;  border: none;"
        data-toggle="modal" data-target="#editStorageModal"  type="button"><i class="fas fa-edit"></i></button>
        <button type="button" data-toggle="modal" id="btnAreas" onclick="verAreas(obtenerId())"data-target="#modalAreas" class="edit" style="font-weight: 200; color: #1e450c; background-color: white; border: none;"><i
        class="fas fa-eye"></i></button>
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

function rellenarCampos(id) {
    axios({
        url: 'http://localhost:3000/storage/?id=' + id,
        method: 'get',
        headers: { Authorization: `Bearer ${obj.token}` },
    })
        .then((data) => {
            document.getElementById('inputModalId').value = data.data[0].id;
            document.getElementById('inputModalMetros').value = data.data[0].mts;
            document.getElementById('inputModalEstado').value = data.data[0].state;
        })
}
function ModificarDeposito() {

    const id = document.getElementById('inputModalId').value;
    const mts = document.getElementById('inputModalMetros').value;
    const state = document.getElementById('inputModalEstado').value;

    const data = { id, mts, state }
    console.log(data)
    axios({
        url: 'http://localhost:3000/storage/update/' + id,
        method: 'PUT',
        headers: { Authorization: `Bearer ${obj.token}` },
        data
    })

        .then((data) => {
            swal.fire({
                icon: 'success',
                title: 'Depósito actualizado correctamente, ¡Bravo!',
            })
                .then(
                    $("#cancelarEdit").click()
                )
            ConsultarDepositos()
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status == 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema',
                        text: `${error.response.data.message}`,

                    })
                }
                else if (error.response.status == 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema',
                        text: 'Usuario no autorizado',
                    })
                }
                else if (error.response.status == 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema',
                        text: `${error.response.data.message}`,
                    })
                }
                else if (error.response.status == 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema',
                        text: `${error.response.data.message}`,
                    })
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un pequeño problema',
                })
            }
        })
}

function Delete() {
    const id = document.getElementById('inputModalId').value;
    axios({
        url: 'http://localhost:3000/storage/delete/' + id,
        method: 'PUT',
        headers: { Authorization: `Bearer ${obj.token}` },
    })

        .then((data) => {
            swal.fire({
                icon: 'success',
                title: 'Depósito dado de baja correctamente, ¡Bravo!',
            }).then(
                $("#cancelarDelete").click()
            )
            ConsultarDepositos()
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status == 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema',
                        text: `${error.response.data.message}`,

                    })
                }
                else if (error.response.status == 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema',
                        text: 'Usuario no autorizado',
                    })
                }
                else if (error.response.status == 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema',
                        text: `${error.response.data.message}`,
                    })
                }
                else if (error.response.status == 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema',
                        text: `${error.response.data.message}`,
                    })
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un pequeño problema',
                })
            }
        })
}

function FiltroBusqueda(tipo) {

    const id = document.getElementById('inputID').value;
    const select = document.getElementById('inputEstado');

    if (id.length > 0 || select.selectedIndex > 0) {
        let consulta = '';
        if (tipo == 'Estado') {
            consulta = 'state=' + select.value
        } else {
            consulta = 'id=' + id
        }
        axios({
            url: 'http://localhost:3000/storage/?' + consulta,
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
