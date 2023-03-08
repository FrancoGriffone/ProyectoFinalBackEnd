import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    productos: Array,
    fecha: {
      type: Date,
      default: Date.now  
    },
    email: String,
    direccion: String,
});

const CarritoModel = mongoose.model("carritos", carritoSchema);
export default CarritoModel;