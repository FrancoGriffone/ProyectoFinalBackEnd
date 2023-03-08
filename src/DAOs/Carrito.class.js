import Producto from "./Producto.class.js";

export default class Carrito {
    constructor(){
        this.producto = new Producto();
        this.carritos = [];
        this.id = 1;
    }

    listar(id){
        let prod = this.carritos.find((carr) => carr.id == id);
        return prod || {error: "Carrito no encontrado"};
    }

    listarAll(){
        return this.carritos.length
        ? this.carritos
        : {error: "No hay carritos cargados"};
    }

    crearCarrito(){
        const carr = {id: this.id++, timeStamp: Date.now(), productos: []};
        this.carritos.push(carr);
        return carr;
    }

    guardarProductoEnCarrito(idProd, idCarrito){
        console.log(idProd);
        const producto = this.producto.listar(idProd);
        this.carritos.forEach((carro) =>{
            carro.id == idCarrito ? carro.productos.push(producto) : null;
        });
        return this.carritos;
    }

    actualizar(carr, id){
        console.log("ID carrito: "+ carr)
        console.log("ID objeto: "+ id)
        const producto = this.producto.listar(id);
        this.carritos.forEach((carro) =>{
            carro.id == carr ? carro.productos.splice(producto) : null;
        });
        return this.carritos;
    }

    borrar(id){
        let index = this.carritos.findIndex((carr) => carr.id == id);
        return this.carritos.splice(index, 1);
    }
}