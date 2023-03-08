/*import Container from '../../DAOs/connectionMongo.js'
import Message from '../../DAOs/connectionSQL.js'
import config from '../../../connection.js'
let prod = new Container("productos", config.mysql);
let msg = new Message("mensajes", config.sqlite3)

// Conectamos websocket
io.on("connection", async (socket) => {
    console.log('Usuario con id: ', socket.id, ' se ha conectado')

    let productos = await prod.getAll();
    let mensajes = await msg.getAll();
    // Socket Chat
    socket.emit('messages', mensajes);

    // Mensajes mostrados correctamente.
    socket.on("new-message", async (data) => {
        data.date = new Date().toLocaleDateString()
        mensajes.push(data);
        msg.addMessage(data);

        console.log(data)

        io.sockets.emit("messages", mensajes);
    });

    // Socket productos
    
    socket.emit("productList", productos);


    socket.on("newProduct", async (data) => {
        await prod.createData(data);

        io.sockets.emit("productList", productos)
    });

})*/
