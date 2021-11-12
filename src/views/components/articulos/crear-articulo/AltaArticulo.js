

function AltaArt() {
  const code = document.getElementById('codigoArt').value;
  const description = document.getElementById('descripcionArt').value;
  const family = document.getElementById('familiaArt').value;
  const group = document.getElementById('grupoArt').value;
  const price = document.getElementById('precioArt').value;
  const unit = document.getElementById('unidadArt').value;
  const amount = document.getElementById('cantidadArt').value;

  const data = { code, description, family, group, price, unit, amount }

  axios({
    url: 'http://localhost:3000/item/add',
    headers: { Authorization: `Bearer ${obj.token}` },
    method: 'post',
    data
  })
    .then((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Articulo creado correctamente, ¡Bravo!',
      })
      borrarCampos();
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


function borrarCampos() {
  document.getElementById('codigoArt').value = "";
  document.getElementById('descripcionArt').value = "";
  document.getElementById('familiaArt').value = "";
  document.getElementById('grupoArt').value = "";
  document.getElementById('precioArt').value = "";
  document.getElementById('unidadArt').value = "";
  document.getElementById('cantidadArt').value = "";
}