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
function limpiarCampos() {

    document.getElementById('inputId').value = '';
    document.getElementById('inputFilas').value = '';
    document.getElementById('inputMetros').value = 0;
    document.getElementById('inputColumnas').value = '';
}