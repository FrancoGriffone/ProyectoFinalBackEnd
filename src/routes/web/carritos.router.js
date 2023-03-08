import express from "express";
import userModel from "../../models/userSchema.js";
import Carrito from "../../DAOs/Carrito.dao.class.js";
import passport from "passport";

const router = express.Router();

const carrito = new Carrito(); 

router.post("/crearcarrito/", passport.authenticate('jwt', {session: false}) , async (req, res) =>{
    const carritoCreado = await carrito.crearCarrito();
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
router.post("/:id/agregarproducto/:idPrd/:usuario", passport.authenticate('jwt', {session: false}) , async (req, res) => {
    const respuesta = await carrito.guardarProductoEnCarrito(
        req.params.id,
        req.params.idPrd,
        );
   res.send((respuesta))
});

router.post("/:idCarr/finalizarcompra/:idPed", passport.authenticate('jwt', {session: false}) , async (req, res) =>{
    const postPedido = await carrito.guardarCarroEnPedido(
        req.params.idCarr,
        req.params.idPed
    );
    res.send(postPedido)
})

//NO SE DONDE PONERLO
router.get("/mandarMail/:id", passport.authenticate('jwt', {session: false}) , async (req, res) => {
    const carritoPorId = await carrito.listar(req.params.id);
  
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
        to: process.env.TEST_MAIL, //NO ME TOMA EL REQ.SESSION.PASSPORT.USER
        subject: 'Gracias por tu compra!',
        html: '<h1>Agradecemos que confies en nosotros!</h1>'
    }
    
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
    res.send(carritoPorId);
  });
export default router;