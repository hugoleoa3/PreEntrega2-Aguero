class Productos {
    constructor (nombre,precio) {
        this.nombre = nombre
        this.precio = precio
    }
}

const mesaDeLuz = new Productos ("Mesa de Luz Pequeña", 5500)
const MesaDeLuz2 = new Productos ("Mesa de Luz Mediana", 10500)
const MesaDeLuz3= new Productos ("Mesa de Luz Grande", 1500)

const arrayProductos = []

arrayProductos.push(mesaDeLuz)
arrayProductos.push(MesaDeLuz2)
arrayProductos.push(MesaDeLuz3)
console.log(arrayProductos)
