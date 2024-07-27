class persona {
    constructor (nombre, apellido, saldo, edad) {
        this.nombre = nombre
        this.apellido = apellido
        this.saldo = saldo
        this.edad = edad
    }
    saludar () {
        alert("Hola " + this.nombre + " " + this.apellido)
    }
}
const persona1 = new persona ()
