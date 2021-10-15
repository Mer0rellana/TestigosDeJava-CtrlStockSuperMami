function dniValid(boton, elem, mensaje) {
    let button = document.getElementById(boton);
    let inputDNI = document.getElementById(elem).value;
    let msj = document.getElementById(mensaje);
    let expr = /^[0-9]{7,8}$/


    if (!expr.test(inputDNI)) {

        msj.innerHTML = "DNI Invalido!";
        msj.style.color = "red";
        button.disabled = true;
    }
    else {
        msj.style.color = "green";
        msj.innerHTML = "DNI Valido!";
        button.disabled = false;
    }
}

function loginValid() {
    let flag = false;
    let button = document.getElementById("btnIngresar");
    let inputLegajo = document.getElementById("inputLegajo").value;
    let inputContraseña = document.getElementById("inputContraseña");
    let msjLegajo = document.getElementById("mensajeLegajo");
    let msjContraseña = document.getElementById("mensajeContraseña");
    let legajo = /^\d+$/;
    let contraseña = /^\d+$/;



}

