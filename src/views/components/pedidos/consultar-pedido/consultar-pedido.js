const arrayItems=[];
function consultarPedidos() {
  arrayItems.splice(0,arrayItems.length);
  axios({
    url: 'http://localhost:3000/order/',
    method: 'get',
    headers: { Authorization: `Bearer ${obj.token}` },
  })
    .then((data) => {
      crearTabla(data.data)
    })
    .catch((error) => {
      console.log(error.response);
      console.log(error)
    })
}

function limpiarFiltro() {
  document.getElementById("comboState").selectedIndex=0;
  consultarPedidos()
}

function consultarFiltro() {
  const estado= document.getElementById("comboState");
  arrayItems.splice(0,arrayItems.length);
  if(estado.selectedIndex>0){
    axios({
      url: 'http://localhost:3000/order?state='+estado.value,
      method: 'get',
      headers: { Authorization: `Bearer ${obj.token}` },
    })
      .then((data) => {
        crearTabla(data.data)
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error)
      })
  }else{
    consultarPedidos();
  }
}

function crearTabla(datos) {
  $("#table-pedidos-body tr").remove();
  for (var i = 0; i < datos.length; i++) {
    arrayItems.push(datos[i].items)
    console.log(datos[i]);
    var html = "<tr>"
    html += "<td class='text-center'>" + datos[i].createdAt + "</td>";
    html += "<td class='text-center'>" + datos[i].deliveryDate + "</td>";
    html += "<td class='text-center'>" + datos[i].state + "</td>";
    html += `<td class='text-center'> 
    <button class="seeMore" onclick="crearTablaDetalle(${[i]})" style="font-weight: 200; color: #1E450C; border: none;"
    data-toggle="modal" data-target="#modalVerMas"  type="button">
    <i class="fas fa-list"
        title="Ver Mas"></i>
    </button>
    </td>`;
    html += "</tr>"
    // let tabla = document.getElementById('tabla-usuario'); onclick="rellenarCampos('${datos[i].code}')"
    // tabla.appendChild(html)B
    $("#table-pedidos-body").append(html);
  }
}


function crearTablaDetalle(lugar) {
  $("#table-body-detalle tr").remove();
  for (var i = 0; i < arrayItems[lugar].length; i++) {
    var html = "<tr>"
    html += "<td class='text-center'>" + arrayItems[lugar][i].code + "</td>";
    html += "<td class='text-center'>" + arrayItems[lugar][i].description + "</td>";
    html += "<td class='text-center'>" + arrayItems[lugar][i].amount + "</td>";
    html += "</tr>"
    // let tabla = document.getElementById('tabla-usuario'); onclick="rellenarCampos('${datos[i].code}')"
    // tabla.appendChild(html)B
    $("#table-body-detalle").append(html);
  }
}
consultarPedidos()