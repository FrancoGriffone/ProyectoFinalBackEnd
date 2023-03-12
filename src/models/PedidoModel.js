import mongoose, { Schema } from "mongoose";

const pedidoSchema = new mongoose.Schema({
    carritos: Array,
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