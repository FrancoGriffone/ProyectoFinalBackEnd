import { Schema, model } from "mongoose" 

const UserSchema = new Schema({
	username: { type: String, required: true,  unique: true },
	email: {type: String, required: true},
	password: { type: String, required: true },
	telefono: { type: Number, required: true },
	direccion: { type: String, required: true },
});

const userModel = model("usuario", UserSchema)
export default userModel;