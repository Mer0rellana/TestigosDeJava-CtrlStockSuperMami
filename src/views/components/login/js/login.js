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
            window.location = '../home/home.html'
        })

        .catch((error) => {
            if (error.response.status == 500) {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrió un error interno en el servidor',
                })
            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Legajo o contraseña erróneos, por favor, vuelva a intentarlo',
                })
            }
            console.log(error.response)
            console.log(data)

        })
}