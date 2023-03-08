import Producto from "./Producto.dao.class.js";

export default class MyConnectionFactory {
    returnDbConnection(){
        if(process.env.STORE == "MONGO") return Producto.returnSingleton()
    }
}