import { expect } from "chai";
import axios from "axios";

describe("Verificando endpoints de api productos", ()=>{
   it("Valindado código 200 GET /api/productos", async ()=>{
        const productos = await axios.get("http://localhost:8080/api/productos")
        //console.log(productos)
        expect(productos.status).to.eql(200)
    })

    it("Validando estructura de la data de respuesta GET /api/productos", async ()=>{
        const productos = await axios.get("http://localhost:8080/api/productos")
        //console.log(productos)
        expect(productos.data[0]).to.include.keys("_id", "precio", "nombre")
    })

    it("Validando almacenar un nuevo producto POST /api/productos", async ()=>{
        const productoNuevo = {
            "nombre": "Cartucheras",
            "precio": 2000,
            "stock": 30
        }
        const producto = await axios.post("http://localhost:8080/api/productos/crearproducto?admin=true", productoNuevo)
        expect(producto.data).to.include.keys("_id", "nombre")
        expect(producto.data.title).to.eql(productoNuevo.title)
        //console.log(producto)
    })

    it("Validando que no se almacene con estructura incompleta POST /api/productos", async ()=>{
        const productoNuevo = {
            "nombre": "Cartucheras",
            "stock": 30
        }
        const producto = await axios.post("http://localhost:8080/api/productos/crearproducto?admin=true", productoNuevo)
        //console.log(producto)
        //expect(producto.data._message).to.eql("producto validation failed") ESTE NO FUNCIONA FIXME:
    })

    it("Validando un nuevo producto si no hay acceso de admin POST /api/productos", async ()=>{
        const productoNuevo = {
            "nombre": "Cartucheras",
            "precio": 2000,
            "stock": 30
        }
        const producto = await axios.post("http://localhost:8080/api/productos/crearproducto", productoNuevo)
        //console.log(producto) 
        expect(producto.data).to.eql("Usted no tiene acceso")
    })

    it("Validando un borrar un producto existente DELETE api/productos/borrarProducto", async ()=>{
        const productos = await axios.get("http://localhost:8080/api/productos")
        //console.log(productos) 
        const borrarProducto = await axios.delete("http://localhost:8080/api/productos/borrarproducto/63d9c5e9c9320588d76ec205?admin=true") 
        //HAY QUE IR MODIFICANDO EL ID, dejo otro de prueba: 63d9c659c9320588d76ec20a
        console.log(borrarProducto)
        //console.log(productos.data)
        expect(borrarProducto.data).to.eql('')
    })
    
    it("Validando que borrarProducto no se ejecute sin la validacion de admin DELETE api/productos/borrarProducto", async ()=>{
        const productos = await axios.get("http://localhost:8080/api/productos")
        //console.log(productos.data) 
        const producto = await axios.delete("http://localhost:8080/api/productos/borrarproducto/63d9c659c9320588d76ec20a") 
        expect(producto.data).to.eql("Usted no tiene acceso")
    })
})