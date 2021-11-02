function AltaUsuario() {

  // const token = document.cookie.replace(/(?:(?:^|.;\s)token\s=\s([^;]).$)|^.*$/, '$1');
  const obj = {};
  document.cookie.split(';').forEach(e => {
    const key = e.split('=')[0].trim();
    const val = e.split('=')[1].trim();
    obj[key] = val;
  });

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
        title: 'Usuario Creado Correctamente, ¡Bravo!',
      });
      limpiarCampos()
    })
    .catch((error) => {
      if (error.response.status == 535) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error al enviar el correo electrónico',
          footer: '<a href="">¿Por qué me sale este error?</a>'
        })
      }
      if (error.response.status == 400) {
        swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          text: 'El usuario ya existe'
        })
      }
      if (error.response.status == 401) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario no autorizado',
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