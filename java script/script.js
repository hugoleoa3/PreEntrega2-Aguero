// Variables globales
let mesaDeLuz = { nombre: "Mesa de luz pequeña", precio: 5000 }
let MesaDeLuz2 = { nombre: "Mesa de luz mediana", precio: 8000 }
let MesaDeLuz3 = { nombre: "Mesa de luz grande", precio: 10000 }
let preciofinal = 0
let nombreCliente
let condicion = 1
let textoListado = ""
let variableultpos = 0
let contmesaDeLuz = 0
let contmesaDeLuz2 = 0
let contmesaDeLuz3 = 0
let persona1 = { nombre: "", apellido: "", saldo: 0, saludar: function() { alert("Hola " + this.nombre + " " + this.apellido) } }
let arrayProductos = [mesaDeLuz, MesaDeLuz2, MesaDeLuz3]

// Función para agregar productos al precio final
function agregarProducto(producto) {
    preciofinal = preciofinal + producto.precio
}

// Función principal del flujo
function flujo() {
    persona1.nombre = prompt("Hola, ingresa tu nombre")
    persona1.apellido = prompt("Ingresa tu apellido")
    persona1.saludar()
    persona1.saldo = parseFloat(prompt("Ingresa tu saldo"))
    if (persona1.saldo >= 0) {
        carritoCompra()
    } else {
        alert("No posee saldo")
    }
}

// Función para listar productos
function listadoProductos() {
    textoListado = ""
    for (let i = 0; i < arrayProductos.length; i++) {
        let cont = i + 1
        textoListado += cont + ". " + arrayProductos[i].nombre + " - $" + arrayProductos[i].precio + "\n"
    }
    return textoListado
}

// Función para manejar el carrito de compras
function carritoCompra() {
    variableultpos = arrayProductos.length + 1
    let variablestring = variableultpos.toString()
    opcion = prompt("Elija el producto a agregar al carrito: \n Saldo disponible: $" + persona1.saldo + "\n" + listadoProductos() + variableultpos + ". Finalizar compra \n Subtotal: $" + preciofinal)
    while (condicion == 1) {
        switch (opcion) {
            case "1":
                if (persona1.saldo >= mesaDeLuz.precio) {
                    preciofinal += mesaDeLuz.precio
                    persona1.saldo -= mesaDeLuz.precio
                    contmesaDeLuz++
                } else {
                    alert("Saldo insuficiente")
                }
                carritoCompra()
                break
            case "2":
                if (persona1.saldo >= MesaDeLuz2.precio) {
                    preciofinal += MesaDeLuz2.precio
                    persona1.saldo -= MesaDeLuz2.precio
                    contmesaDeLuz2++
                } else {
                    alert("Saldo insuficiente")
                }
                carritoCompra()
                break
            case "3":
                if (persona1.saldo >= MesaDeLuz3.precio) {
                    preciofinal += MesaDeLuz3.precio
                    persona1.saldo -= MesaDeLuz3.precio
                    contmesaDeLuz3++
                } else {
                    alert("Saldo insuficiente")
                }
                carritoCompra()
                break
            case variablestring:
                condicion = 2
                alert("Carrito de compras \n 1. Mesa de luz pequeña: " + contmesaDeLuz + "\n 2. Mesa de Luz mediana: " + contmesaDeLuz2 + "\n 3. Mesa de Luz Grande: " + contmesaDeLuz3 + "\nTotal: $" + preciofinal)
                alert("Gracias por su compra, vuelva pronto")
                break
            default:
                alert("Por favor ingrese una opción válida")
                carritoCompra()
                break
        }
    }
}

flujo()
