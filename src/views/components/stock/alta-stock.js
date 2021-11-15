function AltaStock() {

    const idItem = document.getElementById('inputModalIDStock').value;
    const currentStock = document.getElementById('inputModalStockActual').value;
    const failedStock = document.getElementById('inputStockFallado').value;
    const maxStock = document.getElementById('inputStockMaximo').value;
    const minStock = document.getElementById('inputStockMinimo').value;
  
    const data = {idItem, currentStock, failedStock, maxStock, minStock }
  
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
          title: 'Inventario agregado correctamente'
        }).then(
          $('#cancelarAltaStock').click()
        )
        ConsultarStock()
      })
  
      .catch((error) => {
        console.log(error)
        console.log(error.response.status)
  
       
      })
  
  }
  