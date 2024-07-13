
let mesaDeLuz = 5500
let MesaDeLuz2 = 10500
let MesaDeLuz3 = 15000
let contmesaDeLuz = 0
let contmesaDeLuz2 = 0
let contmesaDeLuz3 = 0
let preciofinal = 0
let nombreCliente
let saldo = 0
let condicion = 1
function agregarProducto(producto) {
    preciofinal = preciofinal + producto
}

function flujo() {
    nombreCliente = prompt("Hola ingresa tu nombre")
    alert("Hola " + nombreCliente)
    saldo = prompt("Ingresa tu saldo")
    saldo = parseFloat(saldo)
    if (saldo >= 0) {
        carritoCompra()
    }
    else {
        alert("No posee saldo")
    }

}

function carritoCompra() {
    opcion = prompt("Elija el producto a agregar al carrito: \n Saldo disponible: " + saldo + " \n 1. Mesa de luz pequeña - 5500$ \n 2. Mesa de Luz mediana - 10500$ \n 3. Mesa de Luz grande - 15000$ \n 4. Finalizar compra \n Subtotal: " + preciofinal)
    while (condicion == 1)
    {
        switch (opcion) {
            case "1":
                if (saldo >= mesaDeLuz) {
                    preciofinal = preciofinal + mesaDeLuz
                    saldo = saldo - mesaDeLuz
                    contmesaDeLuz++
                } else {
                    alert("Saldo insuficiente")
                }
                carritoCompra()
                break
            case "2":
                if (saldo >= MesaDeLuz2) {
                    preciofinal = preciofinal + MesaDeLuz2
                    saldo = saldo - MesaDeLuz2
                    contmesaDeLuz2++
                } else {
                    alert("Saldo insuficiente")
                }
                carritoCompra()
                break
            case "3":
                if (saldo >= MesaDeLuz3) {
                    preciofinal = preciofinal + MesaDeLuz3
                    saldo = saldo - MesaDeLuz3
                    contmesaDeLuz3++
                } else {
                    alert("Saldo insuficiente")
                }
                carritoCompra()
                break
            case "4":
                condicion = 2
                alert("Carrito de compras \n 1. Mesa de luz pequeña: " + contmesaDeLuz + "\n 2. Mesa de Luz mediana: " + contmesaDeLuz2 + "\n 3. Mesa de Luz Grande: " + contmesaDeLuz3 + "\nTotal: " + preciofinal)
                alert("Gracias por su compra :)")
                break
            default:
                alert("Por favor ingrese una opcion valida")
                carritoCompra()
                break
        }
    }
    
}

flujo()