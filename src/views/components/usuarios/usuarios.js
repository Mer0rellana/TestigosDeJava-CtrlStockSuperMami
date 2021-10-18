$(".btnEliminar").click(function(){
    Swal.fire({
        title: 'Esta seguro que desea eliminar?',
        text: "No se podra dar de alta de nuevo!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El usuario se ha eliminado correctamente.',
            'success'
          )
        }
      })
})