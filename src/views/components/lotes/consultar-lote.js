function ConsultarLote(){
    axios({
      url:'http://localhost:3000/Batch/',
      method:'get',
      headers:{ Authorization: `Bearer ${obj.token}`}

    }).then((data)=>{
        CrearTabla(data.data)
        
    }).catch((error)=>{
        console.log(error);
        console.log(error.response);
    })
}

function CrearTabla(datos) {
    $('#tabla-lote-body tr').remove()
    for(var i=0; i<datos.length; i++){
    var html = "<tr>"
    html += "<td>" + datos[i]._id + "</td>";
    html += "<td>" + datos[i].codeItem + "</td>";
    html += "<td>" + datos[i].descriptionItem + "</td>";
    html += "<td>" + datos[i].amount + "</td>";
    html += "<td>" + datos[i].state + "</td>";
    html += "<td>" + datos[i].idStorage + "</td>";
    html += "<td>" + datos[i].idArea + "</td>";
    html += "<td>" + datos[i].failed + "</td>";
    html += "<td>" + datos[i].expiredAt + "</td>";
    html += "<td>" + datos[i].updatedAt + "</td>";

    html+=`<td class="text-center">
    <button class="edit" onclick="" style="font-weight: 200; color: #ffbb2f; background-color:white; border: none; outline: none !important; -webkit-appearance: none !important;"
    data-toggle="modal" data-target="#modalEditarLote"  type="button"><i class="fas fa-edit"></i></button>
    </td>`
    
    html+="</tr>"
    $('#tabla-lote-body').append(html)
    }
    
}

ConsultarLote();
