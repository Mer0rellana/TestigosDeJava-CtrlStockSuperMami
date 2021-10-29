
function AltaArt() {

  const token = document.cookie.replace(/(?:(?:^|.;\s)token\s=\s([^;]).$)|^.*$/, '$1');

  const codigo = document.getElementById('codigoArt');
  const precio = document.getElementById('precioArt');
  const descripcion = document.getElementById('descripcionArt');
  const familia = document.getElementById('familiaArt');
  const grupo = document.getElementById('grupoArt');
  const unidad = document.getElementById('unidadArt');
  const cantidad = document.getElementById('cantidadArt');

  const data = { codigo, precio, descripcion, familia, grupo, unidad, cantidad }

  axios({
    url: 'http://localhost:3000/item/add',
    headers: { Authorization: `Bearer ${token}` },
    method: 'post',
    data
  })
    .then((data) => {
      console.log('data')
    })
    .catch((error) => {
      if (error.response.status == 401) {
        swal("Usuario no autorizado")
      }
    })
}

