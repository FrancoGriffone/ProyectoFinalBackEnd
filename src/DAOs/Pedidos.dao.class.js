import mongoose from "mongoose";
import CarritoModel from "../models/CarritoModel.js";
import PedidoModel from "../models/PedidoModel.js";

export default class Pedido {
  constructor() {
    this.contador = 0;
    this.url = process.env.MONGOOSE_CONNECT;
    this.mongodb = mongoose.connect;
  }

  //CREAR PEDIDO
  async crearPedido() {
    try {
      await this.mongodb(this.url);
      const ped = PedidoModel();
      return await ped.save();
    } catch (e) {
      console.log(e);
    }
  }

  //GUARDAR CARRITO EN PEDIDO
  async guardarCarroEnPedido(idCarr, idPed) {
    try {
      await this.mongodb(this.url);
      const carr = await CarritoModel.findById(idCarr);
      return await PedidoModel.findByIdAndUpdate(
        { _id: idPed },
        { $set: { carritos: carr } }
      );
    } catch (e) {
      console.log(e);
    }
  }

  //MOSTRAR UN PEDIDO
  async listarPedido(id) {
    try {
      await this.mongodb(this.url);
      return await PedidoModel.findById(id);
    } catch (e) {
      console.log(e);
    }
  }
}
