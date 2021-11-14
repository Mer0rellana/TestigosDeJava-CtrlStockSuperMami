// $("#btnIngresar").click(function(){
//     window.location = '../home/home.html'
// })

function Login() {
    const id = document.getElementById('inputLegajo').value
    const password = document.getElementById('inputContraseña').value

    const data = { id, password }

    axios({
        url: 'http://localhost:3000/user/login',
        method: 'post',
        data
    })
        .then((data) => {
            document.cookie = `token = ${data.data.token}; path=/`
            console.log(data)
        })

        .then((data) => {
            window.location = '../../home/home/home.html'
        })

        .catch((error) => {
            if (error.response.status == 500) {
                swal.fire({
                    icon: 'error',
                    title: 'Hubo un problema',
                    text: 'Ocurrió un error interno en el servidor',
                })
            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Hubo un problema',
                    text: 'Legajo o contraseña erróneos, por favor, vuelva a intentarlo',
                })
            }
            console.log(error.response)
            console.log(data)

        })
}

function RecuperarContra() {
    const mail = document.getElementById('inputEmailRecuperarContraseña').value

    const data = { mail }

    axios({
        url: 'http://localhost:3000/user/recoverPassword',
        method: 'post',
        data
    })
        .then((data) => {
            swal.fire({
                icon: 'success',
                title: 'Contraseña recuperada con éxito. Revise su casilla de correo electrónico',
            }).then(
                limpiarCampos(),
                $('#cancelar').click()

            );
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
                else if (error.response.status == 535) {
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
    document.getElementById('inputEmailRecuperarContraseña').value = '';
}