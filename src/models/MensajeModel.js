import mongoose from "mongoose";

const mensajeSchema = new mongoose.Schema({
    email: String,
    tipo: String,
    fecha: {
        type: Date,
        default: Date.now  
    },
    cuerpo: String,
});

const MensajeModel = mongoose.model("mensajes", mensajeSchema);
export default MensajeModel;