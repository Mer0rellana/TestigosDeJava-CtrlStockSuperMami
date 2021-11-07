function AltaDeposito() {

    const obj = {};
    document.cookie.split(';').forEach(e => {
        const key = e.split('=')[0].trim();
        const val = e.split('=')[1].trim();
        obj[key] = val;
    });

    const id = document.getElementById('inputId').value;
    const mts = document.getElementById('inputMetros').value;
    const rows = document.getElementById('inputFilas').value;
    const columns = document.getElementById('inputColumnas').value;

    const data = { id, mts, rows, columns }

    axios({
        url: 'http://localhost:3000/storage/add',
        method: 'post',
        headers: { Authorization: `Bearer ${obj.token}` },
        data
    })

        .then((data) => {
            swal.fire({
                icon: 'success',
                title: 'Depósito creado con éxito, ¡Bravo!',
            }).then(
                limpiarCampos()
            );
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status == 500) {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrió un error interno en el servidor',
                    })
                }
                if (error.response.status == 400) {
                    swal.fire({
                        icon: 'error',
                        title: 'Ocurrió un error',
                        text: 'Error en la carga de datos'
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
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un pequeño problema',
            })
        })


}
function limpiarCampos() {

    document.getElementById('inputId').value = '';
    document.getElementById('inputFilas').value = '';
    document.getElementById('inputMetros').value= 0;
    document.getElementById('inputColumnas').value = '';
  }