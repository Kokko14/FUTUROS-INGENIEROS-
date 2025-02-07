function suma()  {
    let num1 = parseFloat(document.getElementById("num1").value)
    let num2 = parseFloat(document.getElementById("num2").value)
    let suma = num1 + num2; 
    document.getElementById("resultado").innerText = isNaN(suma) ? "porfavor ingrese numeros validos": suma;
}
