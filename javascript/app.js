
(function() {
    // Variables "privadas" del módulo
    let productos = [];
    let carrito = [];
    let persona1;

    // Función de inicialización
    function init() {
        console.log("Iniciando la aplicación...");
        
        // Definición de productos
        productos.push(new Productos("Mesa De Luz Pequena", 15000));
        productos.push(new Productos("Mesa De Luz Mediana", 25000));
        productos.push(new Productos("Mesa De Luz Grande", 35000));
        productos.push(new Productos("Pax x2 Mesa De Luz Mediana", 40000));

        localStorage.setItem("productos", JSON.stringify(productos));

        const botonContinuar = document.getElementById("btnContinuar");
        if (botonContinuar) {
            console.log("Botón 'Continuar' encontrado. Agregando evento click.");
            botonContinuar.addEventListener("click", ingresarUsuario);
            botonContinuar.addEventListener("click", () => console.log("Botón 'Continuar' clickeado"));
        } else {
            console.error("El botón 'Continuar' no se encontró en el DOM");
        }
    }

    function completarDatosPersona() {
        console.log("Completando datos de la persona...");
        const nombre = document.getElementById("formGroupExampleInput").value;
        const apellido = document.getElementById("formGroupExampleInputApellido").value;
        const saldo = parseFloat(document.getElementById("formGroupExampleInput2saldo").value);
        
        console.log(`Datos ingresados - Nombre: ${nombre}, Apellido: ${apellido}, Saldo: ${saldo}`);
        
        if (nombre && apellido && !isNaN(saldo)) {
            persona1 = new Persona(nombre, apellido, saldo);
            console.log("Persona creada:", persona1);
            return true;
        }
        console.log("Datos de persona inválidos");
        return false;
    }

    function mostrarAlerta(titulo, texto, tipo) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: titulo,
                text: texto,
                icon: tipo
            });
        } else {
            alert(`${titulo}\n\n${texto}`);
        }
    }

    function ingresarUsuario() {
        console.log("Función ingresarUsuario llamada");
        if (completarDatosPersona()) {
            console.log("Datos de persona válidos. Llamando a htmlSecundario()");
            htmlSecundario();
        } else {
            console.log("Datos de persona inválidos. Mostrando alerta.");
            mostrarAlerta(
                'Por favor, completa todos los campos correctamente',
                'Asegúrate de que el saldo sea un número válido.',
                'error'
            );
        }
    }

    function htmlSecundario() {
        let container = document.getElementById("contenedorPrincipal");
        let variableInicial = `
        <h1 class="text-center">Raices Riojanas</h1> 
        <h2 class="text-center">Productos disponibles</h2>
        <h3>Bienvenido/a ${persona1.nombre}, saldo disponible para comprar: $${persona1.saldo}</h3>
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
            option.value = index;
            option.text = `${producto.nombre} - $${producto.precio}`;
            selectProducto.appendChild(option);
        });

        // Asignar eventos
        document.getElementById("btnAgregar").addEventListener("click", eventoAgregarCarrito);
        document.getElementById("btnVolver").addEventListener("click", volverInicio);
        document.getElementById("vaciar").addEventListener("click", vaciarCarrito);
        document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra);

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

    function actualizarTablaCarrito() {
        const tabla = document.getElementById("items");
        const total = document.getElementById("total");
        tabla.innerHTML = ""; 

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

    function vaciarCarrito() {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarTablaCarrito();
    }

    function finalizarCompra() {
        const totalCompra = carrito.reduce((acumulador, item) => acumulador + item.producto.precio, 0);
        if (carrito.length > 0) {
            if (totalCompra <= persona1.saldo) {
                mostrarAlerta(
                    '¡Felicidades por su compra!',
                    `Total pagado: $${totalCompra}. Gracias por visitarnos. Lo esperamos pronto.`,
                    'success'
                );
                persona1.saldo -= totalCompra;
                vaciarCarrito();
                actualizarSaldoEnPantalla();
            } else {
                mostrarAlerta(
                    'Saldo insuficiente',
                    `El total de la compra ($${totalCompra}) supera su saldo disponible ($${persona1.saldo}).`,
                    'error'
                );
            }
        } else {
            mostrarAlerta(
                'Carrito vacío',
                "No hay productos en el carrito para finalizar la compra.",
                'warning'
            );
        }
    }

    function actualizarSaldoEnPantalla() {
        const saldoElement = document.querySelector('h3');
        if (saldoElement) {
            saldoElement.textContent = `Bienvenido/a ${persona1.nombre}, saldo disponible para comprar: $${persona1.saldo}`;
        }
    }

    function volverInicio() {
        console.log("Volviendo a la pantalla inicial");
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
        console.log("Reinicializando la aplicación después de volver al inicio");
        init();
    }

    document.addEventListener('DOMContentLoaded', init);

    // Event listener global para errores no manejados
    window.addEventListener('error', (event) => {
        console.error('Error no manejado:', event.error);
    });

})(); // Fin del IIFE