const obj = {};
let userRol = "";


function agregarBotones(rol) {
  console.log(rol)
  let botones = "";
  if (["Admin"].includes(rol)) {
    botones += `<li >
    <a href="../../articulos/consultar-articulo/ConsultarArticulo.html"><span
            class="fa fa-shopping-cart mr-3"></span> Artículos</a>
    </li>`;
  }
  if (["Admin"].includes(rol)) {

    botones += `<li>
    <a href="../../depositos/consultar-deposito/consultar-dep.html"><span class="fa fa-archive mr-3"></span>
    Depósitos</a>
    </li>`;
  }
  if (["Admin"].includes(rol)) {
    botones += `<li>
  <a href="../../pedidos/consultar-pedido/consultar-pedido.html"><span class="fa fa-list-alt mr-3"></span>
      Pedidos</a>
  </li>`;
  }
  if (["Admin", "Gerencia"].includes(rol)) {
    botones += `<li>
  <a href=""><span class="fa fa-sticky-note mr-3"></span> Informes</a>
  </li>`;
  }
  if (["Admin"].includes(rol)) {
    botones += `<li>
  <a href="../../usuarios/consultar-usuario/consultar-usuario.html"><span
          class="fa fa-users mr-3"></span>
      Usuarios</a>
  </li>`;
  }
  if (["Admin"].includes(rol)) {
    botones += `<li>
  <a href="../../stock/consultar-alta/consultar-stock.html"><span class="fas fa-cubes mr-3"></span>Stock</a>
  </li>`;
  }
  if (["Admin"].includes(rol)) {
    botones += `<li>
  <a href="../../inventario/inventario/consultar-inventario.html"><span
          class="fas fa-dolly-flatbed mr-3"></span>Inventarios</a>
  </li>`;
  }
  if (["Admin"].includes(rol)) {
    botones += `<li>
  <a href="../lotes/consultar-lote.html"><span class="fa fa-th mr-3"></span>Lotes</a>
  </li>`;
  }
  if (["Admin", "Encargado Stock", "Operario Stock"].includes(rol)) {
    botones += `<li>
  <a href="../../movimientos/movimientos/consultar-movimientos.html"><span
          class="fa fa-paper-plane mr-3"></span> Movimientos</a>
  </li>`;
  }

  botones += `<li>
  <a href="../../usuarios/mi-perfil/miPerfil.html"><span class="fa fa-user mr-3"></span> Mi
      Perfil</a>
  </li>`;

  console.log(botones)
  $("#sideBar-lista ul").append(botones);


  //$("#sideBar-lista").listview("refresh");

}

if (document.cookie) {
  document.cookie.split(';').forEach(e => {
    const key = e.split('=')[0].trim();
    const val = e.split('=')[1].trim();
    obj[key] = val;
  });
}

if (!document.cookie || !obj.token) {
  window.location = '../login/login.html'
}

function consultarFuncionDeToken() {
  axios({
    url: 'http://localhost:3000/user/myProfile',
    method: 'get',
    headers: { Authorization: `Bearer ${obj.token}` },
  })
    .then((data) => {
      userRol = data.data.role;
      agregarBotones(userRol);
    })
    .catch((error) => {
      console.log(error)
      if (error.response && error.response.status === 401) {
        window.location = '../../login/login/login.html'
      }
    })
}

$(document).ready(function () {
  consultarFuncionDeToken()

})