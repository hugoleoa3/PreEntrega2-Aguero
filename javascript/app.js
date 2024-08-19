// Variables globales
let productos = [];
let carrito = [];

// Definición de productos
productos.push(new Productos("Mesa De Luz Pequena", 15000));
productos.push(new Productos("Mesa De Luz Mediana", 25000));
productos.push(new Productos("Mesa De Luz Grande", 35000));
productos.push(new Productos("Pax x2 Mesa De Luz Mediana", 40000));

localStorage.setItem("productos", JSON.stringify(productos));

// Inicializar la aplicación
function init() {
    const botonContinuar = document.getElementById("btnContinuar");
    botonContinuar.addEventListener("click", ingresarUsuario);
}

// Completar datos de la persona
function completarDatosPersona() {
    persona1.saldo = document.getElementById("formGroupExampleInput2saldo").value;
    persona1.nombre = document.getElementById("formGroupExampleInput").value;
    persona1.apellido = document.getElementById("formGroupExampleInputApellido").value;
}

// Volver a la pantalla inicial
function volverInicio() {
    let container = document.getElementById("contenedorPrincipal");
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
    `;
    // Reasignar el evento click al botón "Continuar"
    init();
}

// Ingresar usuario y validar datos
function ingresarUsuario() {
    completarDatosPersona();
    if (persona1.nombre !== "" && persona1.apellido !== "" && persona1.saldo !== "") {
        htmlSecundario();
    } else {
        Swal.fire({
            title: 'Por favor, completa todos los campos',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }
}

// Mostrar la segunda pantalla con los productos
function htmlSecundario() {
    let container = document.getElementById("contenedorPrincipal");
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
    <div id="tablaProductos"> 
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Operación</th>
                </tr>
            </thead>
            <tbody class="thead-dark" id="items"></tbody>
            <tfoot class="thead-dark">
                <tr>
                    <th>Total:</th>
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
        <button type="button" class="btn btn-primary" id="btnVolver">Volver</button>
    </div>`;
    
    container.innerHTML = variableInicial;

    // Llenar el select con los productos
    let selectProducto = document.getElementById("seleccionarProducto");
    productos.forEach((producto, index) => {
        let option = document.createElement("option");
        option.value = index; // Usar el índice como valor
        option.text = `${producto.nombre} - $${producto.precio}`;
        selectProducto.appendChild(option);
    });

    // Asignar eventos
    const agregarProducto = document.getElementById("btnAgregar");
    agregarProducto.addEventListener("click", eventoAgregarCarrito);

    const botonVolver = document.getElementById("btnVolver");
    botonVolver.addEventListener("click", volverInicio);

    const btnVaciar = document.getElementById("vaciar");
    btnVaciar.addEventListener("click", vaciarCarrito);

    const btnFinalizar = document.getElementById("finalizarCompra");
    btnFinalizar.addEventListener("click", finalizarCompra);

    actualizarTablaCarrito();
}

function eventoAgregarCarrito() {
    const selectProductos = document.getElementById("seleccionarProducto");
    const productSelected = productos[selectProductos.value];
    const nuevoItem = new ItemCarrito(productSelected);
    carrito.push(nuevoItem);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarTablaCarrito();
}

// Función para actualizar la tabla del carrito
function actualizarTablaCarrito() {
    const tabla = document.getElementById("items");
    const total = document.getElementById("total");
    tabla.innerHTML = ""; // Limpiar la tabla antes de volver a llenarla

    carrito.forEach((item, index) => {
        const fila = document.createElement("tr");

        let td = document.createElement("td");
        td.textContent = item.producto.nombre;
        fila.appendChild(td);

        td = document.createElement("td");
        td.textContent = item.producto.precio;
        fila.appendChild(td);

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-warning";
        btnEliminar.innerText = "Eliminar";

        btnEliminar.onclick = () => {
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarTablaCarrito();
        };

        td = document.createElement("td");
        td.appendChild(btnEliminar);
        fila.appendChild(td);
        tabla.appendChild(fila);
    });

    total.innerText = carrito.reduce((acumulador, item) => acumulador + item.producto.precio, 0);
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarTablaCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
    const totalCompra = carrito.reduce((acumulador, item) => acumulador + item.producto.precio, 0);
    if (carrito.length > 0) {
        if (totalCompra <= persona.saldo) {
            Swal.fire({
                title: '¡Felicidades por su compra!',
                text: `Total pagado: $${totalCompra}. Gracias por visitarnos. Lo esperamos pronto.`,
                imageUrl: 'https://www.mueblehome.es/wp-content/uploads/2021/06/CP1712-D-NOGAL-a-1000x745.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Imagen de compra finalizada',
            });
            persona.saldo -= totalCompra;
            vaciarCarrito();
        } else {
            Swal.fire({
                title: 'Saldo insuficiente',
                text: `El total de la compra ($${totalCompra}) supera su saldo disponible ($${persona.saldo}).`,
                icon: 'error',
            });
        }
    } else {
        Swal.fire({
            title: 'Carrito vacío',
            text: "No hay productos en el carrito para finalizar la compra.",
            icon: 'warning',
        });
    }
}

// Inicializar evento del botón "Continuar" al cargar la página
init();
