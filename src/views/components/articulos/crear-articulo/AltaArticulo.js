// const axios = require('axios');
const moment = require('moment');
function AltaArt() {
  console.log(moment.locale());
}

// function AltaArt() {

//   const codigo = document.getElementById('codigoArt');
//   const precio = document.getElementById('precioArt');
//   const descripcion = document.getElementById('descripcionArt');
//   const familia = document.getElementById('familiaArt');
//   const grupo = document.getElementById('grupoArt');
//   const unidad = document.getElementById('unidadArt');
//   const cantidad = document.getElementById('cantidadArt');

//   const data = { codigo, precio, descripcion, familia, grupo, unidad, cantidad }

//   axios({
//     url: 'localhost',
//     headers: { Authorization: `Bearer ${token}` },
//     method: 'post',
//     data
//   })
//     .then((data) => {
//       console.log(data)
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// }

