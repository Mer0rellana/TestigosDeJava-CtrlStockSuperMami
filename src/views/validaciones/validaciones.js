function dniValid(elem,mensaje,boton)
{
    let button = document.getElementById(boton);
    let inputDNI = document.getElementById(elem).value;
    let msj = document.getElementById(mensaje);
    let expr =/^[0-9]{7,8}$/
    console.log(button)

    if (!expr.test(inputDNI)) {

        msj.innerHTML = "DNI Invalido!";
        msj.style.color = "red";
        button.disabled = true;
    }
    else
    {
        msj.style.color = "green";
        msj.innerHTML = "DNI Valido!";
        button.disabled = false;
    }
}