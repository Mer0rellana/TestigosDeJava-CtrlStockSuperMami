function AltaInventario() {

  const idItem = document.getElementById('inputCodigo').value;
  const idStorage = document.getElementById('inputDeposito').value;
  console.log(idStorage)
  const realStock = document.getElementById('inputStockReal').value;
  const failedRealStock = document.getElementById('inputStockFallado').value;
  const observation = document.getElementById('inputObservaciones').value;

  const data = { idItem, idStorage, realStock, failedRealStock, observation }

  console.log(data)

  axios({
    url: 'http://localhost:3000/inventory/add',
    method: 'post',
    headers: { Authorization: `Bearer ${obj.token}` },
    data
  })
    .then((data) => {
      console.log('data')
      swal.fire({
        icon: 'success',
        title: 'Inventario agregado correctamente'
      }).then(
        $('#cancelarAltaInventario').click()
      )
      ConsultarInventario()
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
