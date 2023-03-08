import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    carrito: Array,
    fecha: {
      type: Date,
      default: Date.now  
    },
    email: String,
    ordenNum: Number,
    estado: String,
});

const PedidoModel = mongoose.model("pedidos", pedidoSchema);
export default PedidoModel;