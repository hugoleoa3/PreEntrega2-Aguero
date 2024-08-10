let contplanta = 0
let contplanta2 = 0
let contplanta3 = 0
let preciofinal = 0
let nombreCliente
let condicion = 1
let textoListado = ""
let variableMedio = ""
let variableultpos = 0
let botonContinuar = document.getElementById("btnContinuar")
botonContinuar.addEventListener("click", ingresarUsuario)
let botonmas = document.getElementsByClassName("mas")
let variableFinal = 
    ` <div> <br>
    <button type="button" class="btn btn-primary" id="btnVolver">Volver</button>
    </div> `
let productos = []
let carrito = []

productos.push(new Productos("Mesa De Luz Pequena", 15000))
productos.push(new Productos("Mesa De Luz Mediana", 25000))
productos.push(new Productos("Mesa De Luz Grande", 35000))
productos.push(new Productos("Pax x2 Mesa De Luz Mediana ", 40000))

localStorage.setItem("productos", JSON.stringify(productos))

function completarDatosPersona() {
    persona1.saldo = document.getElementById("formGroupExampleInput2saldo").value
    persona1.nombre = document.getElementById("formGroupExampleInput").value
    persona1.apellido = document.getElementById("formGroupExampleInputApellido").value
}

function volverInicio() {
    let container = document.getElementById("contenedorPrincipal")
    container.innerHTML = `
    <h1 class="text-center">Raices Riojanas</h1>
    <h2 class="text-center">Si lo imaginas, lo hacemos</h2>
    <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">Ingresa tu nombre</label>
        <input type="text" class="form-control nombre" id="formGroupExampleInput" placeholder="Ej: Carlos">
    </div>
    <div class="mb-3">
        <label for="formGroupExampleInputApellido" class="form-label">Ingresa tu apellido</label>
        <input type="text" class="form-control apellido" id="formGroupExampleInputApellido" placeholder="Ej: Gomez">
    </div>
    <div class="mb-3">
        <label for="formGroupExampleInput2saldo" class="form-label">Ingresa tu saldo</label>
        <input type="text" class="form-control saldo" id="formGroupExampleInput2saldo" placeholder="$">
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button class="btn btn-primary me-md-2" type="button" id="btnContinuar">Continuar</button>
    </div>
    `
    let botonContinuar = document.getElementById("btnContinuar")
    botonContinuar.addEventListener("click", ingresarUsuario)
}

function ingresarUsuario() {
    completarDatosPersona()
    console.log(persona1.nombre)
    if (persona1.nombre != "" && persona1.apellido != "" && persona1.saldo != "") {
        htmlSecundario()
    } else {
        Swal.fire({
            title: 'Por favor, completa todos los campos',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
}

function htmlSecundario() {
    let container = document.getElementById("contenedorPrincipal")
    variableMedio = ""
    let variableInicial = `
    <h1 class="text-center">Raices Riojanas</h1> 
    <h2 class="text-center">Productos disponibles</h2>
    <h3>Bienvenido/a ` + persona1.nombre + `, saldo disponible para comprar: $` + persona1.saldo + `</h3>
    <div>
        <h5>Seleccione un producto</h5>
        <select class="form-select" aria-label="Default select example" id="seleccionarProducto">
        </select>
        <br>
        <button type="button" class="btn btn-primary" id="btnAgregar">Agregar</button>
    </div>
    <div id= "tablaProductos"> 
        <table class="table">
            <thead class= "thead-dark">
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Operacion</th>
                </tr>
            </thead>
            <tbody class= "thead-dark" id= "items"></tbody>
            <tfoot class= "thead-dark">
                <tr>
                    <th>Total: </th>
                    <th></th>
                    <th id="total"></th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
    </div>
    <div>
        <button type="button" class="btn btn-success" id="vaciar">Vaciar Carrito</button>
        <button type="button" class="btn btn-success" id="finalizarCompra">Finalizar Compra</button>
    </div>`
    
    variableInicial = variableInicial + variableMedio
    variableInicial = variableInicial + variableFinal
    container.innerHTML = variableInicial
    
    const agregarProducto = document.getElementById("btnAgregar")
    agregarProducto.addEventListener("click", eventoAgregarCarrito)
    let botonVolver = document.getElementById("btnVolver")
    botonVolver.addEventListener("click", volverInicio)

    traerItemsyProductos()
}

function finalizar() {
    const btnFinalizar = document.getElementById("finalizarCompra")
    btnFinalizar.onclick = () => {
        Swal.fire({
            title: '¡Felicidades por su compra!',
            text: "Total a pagar $" + carrito.reduce((acumulador, item) => acumulador + item.producto.precio, 0) + " Gracias por visitarnos. Lo esperamos pronto",
            imageUrl: 'https://www.mueblehome.es/wp-content/uploads/2021/06/CP1712-D-NOGAL-a-1000x745.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    }
}

function eventoAgregarCarrito() {
    const selectProductos = document.getElementById("seleccionarProducto")
    const productSelected = productos[selectProductos.value]
    console.log(selectProductos.value)
    const nuevoItem = new ItemCarrito(productSelected)
    carrito.push(nuevoItem)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    nuevaFila(nuevoItem)
}

function nuevaFila(nuevoItem) {
    const tabla = document.getElementById("items")
    const btnVaciar = document.getElementById("vaciar")
    const total = document.getElementById("total")
    const fila = document.createElement("tr")
    const posCarrito = carrito.indexOf(nuevoItem)
    
    let td = document.createElement("td")
    td.textContent = nuevoItem.producto.nombre
    fila.appendChild(td)

    td = document.createElement("td")
    td.textContent = nuevoItem.producto.precio
    fila.appendChild(td)

    const btnEliminar = document.createElement("button")
    btnEliminar.className = "btn btn-warning"
    btnEliminar.innerText = "Eliminar"

    btnEliminar.onclick = () => {
        carrito.splice(posCarrito, 1)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        actualizarTablaCarrito()
    }

    td = document.createElement("td")
    td.appendChild(btnEliminar)
    fila.appendChild(td)
    tabla.appendChild(fila)

    total.innerText = carrito.reduce((acumulador, item) => acumulador + item.producto.precio, 0)

    btnVaciar.onclick = () => {
        carrito = []
        localStorage.setItem("carrito", JSON.stringify(carrito))
        actualizarTablaCarrito()
    }

    finalizar()
}

