import express from "express"
import routerSession from "./src/routes/web/newConnect.js"
import routerCarrito from "./src/routes/web/carritos.router.js"
import routerProductos from "./src/routes/web/productos.router.js"
import { Server as IOServer } from "socket.io"
import { Server as HttpServer } from "http"

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("/public"))
app.use("/", routerSession)
app.use("/api/productos", routerProductos);
app.use("/api/carritos", routerCarrito);
app.set("view engine", "ejs");
app.set("views", "./views");

io.on('connection', (socket)=>{
    console.log("Se conectó un usuario")
})

app.set("socketio", io)

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
	console.log(`Http server started on port ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error in server ${error}`))
