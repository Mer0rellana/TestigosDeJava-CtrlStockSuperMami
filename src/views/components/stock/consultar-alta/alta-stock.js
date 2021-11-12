function AltaStock() {

  const idItem = document.getElementById('modalCodArticulo').value;
  const currentStock = document.getElementById('inputModalStockActual').value;
  const failedStock = document.getElementById('inputStockFallado').value;
  const maxStock = document.getElementById('inputStockMaximo').value;
  const minStock = document.getElementById('inputStockMinimo').value;

  const data = { idItem, currentStock, failedStock, maxStock, minStock }
  console.log('holis')
  console.log(data)

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
    })
    .catch((error) => {
      console.log(error)
      console.log(error.response.status)

      if (error.response.status == 404) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    })
}