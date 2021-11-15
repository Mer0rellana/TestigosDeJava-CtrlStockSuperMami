function ConsultarLote() {
    axios({
        url: 'http://localhost:3000/Batch/',
        method: 'get',
        headers: { Authorization: `Bearer ${obj.token}` }

    }).then((data) => {
        CrearTabla(data.data)

    }).catch((error) => {
        console.log(error);
        console.log(error.response);
    })
}

function CrearTabla(datos) {
    $('#tabla-lote-body tr').remove()
    for (var i = 0; i < datos.length; i++) {
        var html = "<tr>"
        html += "<td>" + datos[i]._id + "</td>";
        // html += "<td>" + datos[i].codeItem + "</td>";
        html += "<td>" + datos[i].descriptionItem + "</td>";
        html += "<td>" + datos[i].amount + "</td>";
        html += "<td>" + datos[i].state + "</td>";
        html += "<td>" + datos[i].idStorage + "</td>";
        html += "<td>" + datos[i].idArea + "</td>";
        // html += "<td>" + datos[i].failed + "</td>";
        html += "<td>" + datos[i].expiredAt + "</td>";
        // html += "<td>" + datos[i].updatedAt + "</td>";

        html += `<td class="text-center">
    
    <button class="edit" onclick="" style="font-weight: 200; color: #ffbb2f; background-color:white; border: none; outline: none !important; -webkit-appearance: none !important;"
    data-toggle="modal" data-target="#modalEditarLote"  type="button"><i class="fas fa-edit"></i></button>
    </td>`

        html += "</tr>"
        $('#tabla-lote-body').append(html)
    }

}
ConsultarLote();

function ModLote() {
    const idStorage = document.getElementById('inputDepósito').value;
    const idArea = document.getElementById('inputÁrea').value;

    const data = { idStorage, idArea, }

    axios({
        url: 'http://localhost:3000/Batch/Update/' + idStorage,
        method: 'PUT',
        headers: { Authorization: `Bearer ${obj.token}` },
        data
    })
        .then((data) => {
            swal.fire({
                icon: 'success',
                title: 'Lote actualizado con éxito, ¡Bravo!',
            }).then(
                $('#cancelarButton').click()
            )
            ConsultarLote()
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

function FiltrarBusqueda() {
    const idStorage = document.getElementById('inputDeposito').value;
    const idItem = document.getElementById('inputArticulo').value;
    const state = document.getElementById('selectEstado');

    if (idStorage.length > 0 || idItem.length > 0 || state.selectedIndex > 0) {
        let consulta = '';

        if (state.selectedIndex > 0) {
            if (consulta != '') {
                consulta += '&'
            }
            consulta += 'state=' + state.value

        } if (idStorage.length > 0) {
            if (consulta != '') {
                consulta += '&'
            }
            consulta += 'idStorage=' + idStorage

        } if (idItem.length > 0) {
            if (consulta != '') {
                consulta += '&'
            }
            consulta += 'codeItem=' + idItem

        }
        console.log(consulta)
        axios({
            url: 'http://localhost:3000/Batch/?' + consulta,
            method: 'get',
            headers: { Authorization: `Bearer ${obj.token}` }
        }).then((data) => {
            CrearTabla(data.data)
            console.log(consulta)
        })
    } else {
        ConsultarLote()
    }
}

function limpiarFiltros() {
    document.getElementById('inputDeposito').value = '';
    document.getElementById('inputArticulo').value = '';
    document.getElementById('selectEstado').selectedIndex = 0;

    ConsultarLote()
}
