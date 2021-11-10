function AltaUsuario() {


  const dni = document.getElementById('dni').value;
  const name = document.getElementById('nombreCompleto').value;
  const id = document.getElementById('Legajo').value;
  const mail = document.getElementById('email').value;
  const password = document.getElementById('contraseña').value;
  const role = document.getElementById('rol').value;
  const tel = document.getElementById('telefono').value;

  const data = { dni, name, id, mail, password, role, tel }

  console.log(data)

  axios({
    url: 'http://localhost:3000/user/add',
    method: 'post',
    headers: { Authorization: `Bearer ${obj.token}` },
    data
  })

    .then((data) => {
      swal.fire({
        icon: 'success',
        title: 'Usuario creado correctamente, ¡Bravo!',
      });
      limpiarCampos()
    })
    .catch((error) => {
      if (error.response.status == 535) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error al enviar el correo electrónico',
        })
      }
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

  document.getElementById('dni').value = '';
  document.getElementById('nombreCompleto').value = '';
  document.getElementById('Legajo').value = '';
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
  document.getElementById('rol').selectedIndex = 0;
  document.getElementById('telefono').value = '';
}