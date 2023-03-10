import mongoose from "mongoose";
import Producto from "./Producto.dao.class.js";
import CarritoModel from "../models/CarritoModel.js";
import PedidoModel from "../models/PedidoModel.js";

export default class Carrito {
  constructor() {
    this.producto = new Producto();
    this.carritos = [];
    this.url = process.env.MONGOOSE_CONNECT;
    this.mongodb = mongoose.connect;
  }

  //CREAR CARRITO
  async crearCarrito(email, dir) {
    try {
      await this.mongodb(this.url);
      const carr = CarritoModel(email, dir);
      return await carr.save();
    } catch (e) {
      console.log(e);
    }
  }

  //GUARDAR PRODUCTO EN CARRITO
  async guardarProductoEnCarrito(idCarrito, idProd) {
    try {
      await this.mongodb(this.url);
      const producto = await this.producto.listar(idProd);
      return await CarritoModel.findByIdAndUpdate(
        { _id: idCarrito },
        {
          $push: {
            productos: producto,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  //MOSTRAR UN CARRITO
  async listar(id) {
    try {
      await this.mongodb(this.url);
      return await CarritoModel.findById(id);
    } catch (e) {
      console.log(e);
    }
  }

  //MOSTRAR TODOS LOS CARRITOS
  async listarAll() {
    try {
      await this.mongodb(this.url);
      return await CarritoModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  //ACTUALIZAR UN CARRITO
  async actualizar(carr, id) {
    try {
      await this.mongodb(this.url);
      const producto = await this.producto.listar(id);
      return await CarritoModel.findByIdAndUpdate(
        { _id: carr },
        { $unset: { productos: producto } }
      );
    } catch (e) {
      console.log(e);
    }
  }

  //BORRAR UN CARRITO
  async borrar(id) {
    try {
      await this.mongodb(this.url);
      return await CarritoModel.findByIdAndDelete(id);
    } catch (e) {
      console.log(e);
    }
  }

  //*****PEDIDOS*****

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
