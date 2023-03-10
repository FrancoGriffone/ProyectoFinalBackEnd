import mongoose, { Schema } from "mongoose";

const pedidoSchema = new mongoose.Schema({
    carritos: Array, //es esto o sino poner solo Array
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