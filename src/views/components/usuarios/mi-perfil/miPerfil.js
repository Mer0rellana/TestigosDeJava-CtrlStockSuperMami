
function ConsultarMiPerfil() {
    axios({
        url: 'http://localhost:3000/user/myProfile',
        method: 'get',
        headers: { Authorization: `Bearer ${obj.token}` },
    })
        .then((data) => {
            rellenarCampos(data.data)
        })
        .catch((error) => {
            console.log(error.response);
            console.log(error)
        })
}
function rellenarCampos(datos) {
    document.getElementById('inputLegajo').value = datos.id;
    document.getElementById('inputNombre').value = datos.name;
    document.getElementById('inputDocumento').value = datos.dni;
    document.getElementById('inputEmail').value = datos.mail;
    document.getElementById('inputTelefono').value = datos.tel;
    document.getElementById('inputRol').value = datos.role;
    let estado = '';
    datos.state ? estado = "Activo" : estado = "Inactivo";
    document.getElementById('inputEstado').value = estado;

    document.getElementById('editNombre').value = datos.name;
    document.getElementById('editEmail').value = datos.mail;
    document.getElementById('editTelefono').value = datos.tel;
}

ConsultarMiPerfil()


function ModificarUsuario() {
    const name = document.getElementById('editNombre').value;
    const tel = document.getElementById('editTelefono').value;
    const mail = document.getElementById('editEmail').value;

    const data = { name, tel, mail }
    console.log(data)
    axios({
        url: 'http://localhost:3000/user/updateUser',
        method: 'PUT',
        headers: { Authorization: `Bearer ${obj.token}` },
        data
    })

        .then((data) => {
            swal.fire({
                icon: 'success',
                title: 'Usuario actualizado correctamente, ¡Bravo!',
            })
                .then(
                    $("#cancelarEdit").click()
                )
            ConsultarMiPerfil()
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status == 400) {
                    swal.fire({
                        icon: 'error',
                        title: 'Ocurrió un error',
                        text: `${error.response.data.message}`
                    })
                }
                if (error.response.status == 401) {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Usuario no autorizado',
                    })
                }
                if (error.response.status == 500) {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${error.response.data.message}`,
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

function ModificarPassword() {
    const currentPassword = document.getElementById('inputContraseñaActual').value;
    const newPassword = document.getElementById('inputContraseñaNueva').value;
    const confirmNewPassword = document.getElementById('inputConfirmarContraseña').value;

    const data = { currentPassword, newPassword, confirmNewPassword }
    console.log(data)
    axios({
        url: 'http://localhost:3000/user/updatePassword',
        method: 'PUT',
        headers: { Authorization: `Bearer ${obj.token}` },
        data
    })

        .then((data) => {
            swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada correctamente, ¡Bravo!',
            })
                .then(
                    $("#cancelarEditPassword").click()
                )
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status == 400) {
                    swal.fire({
                        icon: 'error',
                        title: 'Ocurrió un error',
                        text: `${error.response.data.message}`
                    })
                }
                if (error.response.status == 401) {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Usuario no autorizado',
                    })
                }
                if (error.response.status == 500) {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${error.response.data.message}`,
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
