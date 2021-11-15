function AltaStock() {

  const idItem = document.getElementById('modalCodArticulo').value;
  const currentStock = document.getElementById('inputStockActual').value;
  const failedStock = document.getElementById('inputStockFallado').value;
  const batchStock = document.getElementById('inputStockLotes').value;
  const maxStock = document.getElementById('inputStockMaximo').value;
  const minStock = document.getElementById('inputStockMinimo').value;

  const data = { idItem, currentStock, failedStock, batchStock, maxStock, minStock }

  axios({
    url: 'http://localhost:3000/Stock/add',
    method: 'post',
    headers: { Authorization: `Bearer ${obj.token}` },
    data
  })
    .then((data) => {
      console.log('data')
      swal.fire({
        icon: 'success',
        title: 'Stock creado correctamente'
      })
      ConsultarStock()
      limpiarCampos()
      $("#cancelarEdit").click()
      
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
  document.getElementById('modalCodArticulo').value = '';
  document.getElementById('inputStockActual').value = '';
  document.getElementById('inputStockFallado').value = '';
  document.getElementById('inputStockLotes').value = '';
  document.getElementById('inputStockMaximo').value = '';
  document.getElementById('inputStockMinimo').value = '';
}
