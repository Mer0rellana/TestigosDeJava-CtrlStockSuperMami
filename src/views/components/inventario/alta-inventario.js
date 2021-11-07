function AltaInventario() {
  const obj = {};

  document.cookie.split(';').forEach(e => {
    const key = e.split('=')[0].trim();
    const val = e.split('=')[1].trim();
    obj[key] = val;
  });

  const idItem = document.getElementById('inputCodigo').value;
  const idStorage = document.getElementById('inputDeposito').value;
  const realStock = document.getElementById('inputStockReal').value;
  const failedRealStock = document.getElementById('inputStockFallado').value;
  const observation = document.getElementById('inputObservaciones').value;

  const data = { idItem, idStorage, realStock, failedRealStock, observation }


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
      })

    })

    .catch((error) => {
      console.log(error)
      console.log(error.response.status)

      if (error.response.status == 400) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar los datos, por favor, intente más tarde'
        })
      }
      if (error.response.status == 404) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
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
    })
}
