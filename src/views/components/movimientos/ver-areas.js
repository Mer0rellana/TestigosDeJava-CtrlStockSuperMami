
function cargarCombo(params) {
    axios({
      url: 'http://localhost:3000/storage/',
      headers: { Authorization: `Bearer ${obj.token}` },
      method: 'get'
    }).
      then(data => {
        data = data.data
        for (var i = 0; i < data.length; i++) {
          let option = document.createElement("option");
          option.text = data[i].id;
          option.value = data[i].id;
          $("#inputIdDeposito").append(option);
        }
      });
  }
  
  cargarCombo();




function obtenerId() {
    let id = document.getElementById("inputIdDeposito").value
    return id;
}

function verAreas(id) {
    axios({
        url: 'http://localhost:3000/storage/?id=' + id,
        headers: { Authorization: `Bearer ${obj.token}` },
        method: 'get'
    }).
        then(data => {
            $('.areas').remove();
            let cantFilas = data.data[0].rows;
            let cantColumnas = data.data[0].columns;
            let div = document.getElementById("areas")
            let letraArea = 0
            console.log(data.data[0].area)
            for (let i = 0; i < cantFilas; i++) {
                let fila = document.createElement("div")
                fila.classList.add("areas")
                div.append(fila);

                for (let i = 0; i < cantColumnas; i++) {

                    let box = document.createElement("div");
                    let numero = document.createElement("p");
                    numero.classList.add("centrar-texto")
                    numero.innerHTML = data.data[0].area[letraArea].id;
                    box.append(numero)
                    fila.append(box);
                    if (data.data[0].area[letraArea].available === true) {

                        box.classList.add("boxt")
                    }
                    else {

                        box.classList.add("boxf")
                    }
                    letraArea++;
                }

            }
        });


}