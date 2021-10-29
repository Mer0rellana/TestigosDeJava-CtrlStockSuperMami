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

  console.log(role)

  axios({
    url: 'http://localhost:3000/user/add',
    method: 'post',
    headers: { Authorization: `Bearer ${obj.token}` },
    data
  })

    .then((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Custom width, padding, background.',
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `
      })
    })
    .catch((error) => {
      if (error.response.status == 535) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error al enviar el correo electrónico',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    })

}