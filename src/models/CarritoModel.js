import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    productos: Array,
    fecha: {
      type: Date,
      default: Date.now  
    },
    email: {type: String, required: true},
    direccion: {type: String, required: true},
});

const CarritoModel = mongoose.model("carritos", carritoSchema);
export default CarritoModel;