import { Schema, model } from "mongoose" 

const productoSchema = new Schema({
    nombre: {type: String, require: true},
    descripcion: {type: String, require: true},
    categoria: {type: String, require: true},
    precio: {type: String, require: true},
    stock: {type: Number, require: true},
    foto: { type: String, required: true }
});

const ProductoModel = model("producto", productoSchema);
export default ProductoModel;