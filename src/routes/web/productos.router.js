import express from "express";
import MyConnectionFactory from "../../DAOs/Dao.factory.js";
import passport from "passport";

const connection = new MyConnectionFactory()
const producto = connection.returnDbConnection()

const router = express.Router();

//const producto = new Producto();

function validarAdmin(req, res, next){
    if(req.query.admin){
        next()
    } else {
        res.send("Usted no tiene acceso")
    }
}
router.get("/", passport.authenticate('jwt', {session: false}) , async (req, res) =>{
    const listaProductos = await producto.listarAll();
    res.send(listaProductos)
});

router.get("/categoria/:categoria", passport.authenticate('jwt', {session: false}) , async (req, res) =>{
    const productosCategoria = await producto.listarCat(req.params.categoria);
    res.send(productosCategoria)
});

router.get("/:id", passport.authenticate('jwt', {session: false}) , async (req, res) =>{
    const productoBuscado = await producto.listar(req.params.id);
    res.send(productoBuscado)
});

router.post("/crearproducto", validarAdmin, async (req, res) => {
    const response = await producto.guardar(req.body)
    res.send(response);
});

router.put("/actualizarproducto/:id", validarAdmin, async (req, res) => {
    const productoActualizado = await producto.actualizar(req.params.id, req.body);
    res.send(productoActualizado)
});

router.delete("/borrarproducto/:id", validarAdmin, async (req, res) => {
    const productoBorrado = await producto.borrar(req.params.id);
    res.send(productoBorrado);
});


export default router;