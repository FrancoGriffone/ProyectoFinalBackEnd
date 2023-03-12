import express from "express";
import Carrito from "../../DAOs/Carrito.dao.class.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";
import Pedido from "../../DAOs/Pedidos.dao.class.js";

const router = express.Router();

const carrito = new Carrito(); 

const pedido = new Pedido();

router.post("/crearcarrito", passport.authenticate('jwt', {session: false}) , async (req, res) =>{
    let token = req.headers.authorization
    token = token.replace('Bearer ', '')
    const user = jwt.decode(token)
    const carritoCreado = await carrito.crearCarrito({
        email: user.email,
        direccion: user.direccion,
    });
    res.send(carritoCreado);
});

router.delete("/borrarcarrito/:id", passport.authenticate('jwt', {session: false}) , async (req, res) => {
    const carritoBorrado = await carrito.borrar(req.params.id);
    res.send(carritoBorrado);
});

router.delete("/:id/borrarproducto/:id_prod", passport.authenticate('jwt', {session: false}) , async (req, res) =>{
    const borrarProducto = await carrito.actualizar(
        req.params.id,
        req.params.id_prod,
    );
    res.send(borrarProducto);
});

router.get("/", passport.authenticate('jwt', {session: false}) , async (req, res) => {
    const listaCarritos = await carrito.listarAll();
    res.send(listaCarritos);
});

router.get("/:id", passport.authenticate('jwt', {session: false}) , async (req, res) => {
    const carritoPorId = await carrito.listar(req.params.id);
    res.send(carritoPorId);
});
router.post("/:id/agregarproducto/:idPrd", passport.authenticate('jwt', {session: false}) , async (req, res) => {
    const respuesta = await carrito.guardarProductoEnCarrito(
        req.params.id,
        req.params.idPrd,
        );
   res.send((respuesta))
});

router.post("/crearpedido", passport.authenticate('jwt', {session: false}) , async (req, res) =>{
    const pedidoCreado = await pedido.crearPedido();
    res.send(pedidoCreado);
});

router.post("/:idCarr/finalizarcompra/:idPed", passport.authenticate('jwt', {session: false}) , async (req, res) =>{
    let token = req.headers.authorization
    token = token.replace('Bearer ', '')
    const user = jwt.decode(token)

    const transporter = createTransport({
        service: "gmail",
        port: 587, 
        auth: {
            user: process.env.TEST_MAIL, 
            pass: process.env.PASS_APP
        } 
    });
    
    const mailOptions = {
        from: 'Servidor Node.js',
        to: user.email,
        subject: 'Gracias por tu compra!',
        html: '<h1>Agradecemos que confies en nosotros!</h1>'
    }
    
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    }

    const postPedido = await pedido.guardarCarroEnPedido(
        req.params.idCarr,
        req.params.idPed,
    );
    res.send(postPedido)
})

router.get("/pedido/:idPed", passport.authenticate('jwt', {session: false}) , async (req, res) =>{
    const postPedido = await pedido.listarPedido(
        req.params.idPed
    );
    res.send(postPedido)
})
export default router;