import express from "express";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import config from "../../../connection.js";
import passport from "./../../config/passportConfig.js";
import pino from "pino";
import userModel from "../../models/userSchema.js";
import jwt from "jsonwebtoken";
const __dirname = path.resolve()

import MyConnectionFactory from "../../DAOs/Dao.factory.js";

const connection = new MyConnectionFactory()
const producto = connection.returnDbConnection()
 
const router = express.Router();

//PINO
const loggerError = pino("error.log")
const loggerWarn = pino("warning.log")
const loggerInfo = pino()
loggerError.level = "error"
loggerWarn.level = "warn"
loggerInfo.level = "info"

router.use(passport.initialize());

router.use(
  session({
    secret: "TOP SECRET",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cxnStr }),
    cookie: {
      maxAge: Number(process.env.SESSION)
    },
  })
);

//PINO MIDDLEWEAR
router.use((req, res, next)=>{
	loggerInfo.info(`Peticion entrando ---> Ruta: ${req.url}, método: ${req.method}`)
	next()
})

router.get("/", (req, res) => {
  res.redirect("/login");
});


router.get("/productos", async (req, res) => {
  const username = req.session?.passport.user;
  const usuario = userModel.find({ username: username })
  const hayProductos = await producto.listarAll();
  res.render(path.join(process.cwd(), "/views/home.ejs"), { username, hayProductos, usuario });
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/views/partials/register.html"));
});


router.get("/login", (req, res) => {
  const username = req.session?.username;
  if (username) {
    res.redirect("/productos");
  } else {
    res.sendFile(path.join(process.cwd(), "/views/partials/login.html"));
  }
});

router.get("/login-error", (req, res) => {
  loggerError.error("Error en el logueo");
  res.sendFile(path.join(process.cwd(), "/views/partials/login-error.html"));
});

router.get("/register-error", (req, res) => {
  loggerError.error("Error en el registro");
  res.sendFile(path.join(process.cwd(), "/views/partials/register-error.html"));
});

router.get("/logout", (req, res) => {
  const username = req.session?.passport.user;
  if (username) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), "/views/logout.ejs"), { username });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

router.post(
  //ok
  "/register",
  passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/register-error",
    failureFlash: true,
  })
);

router.post(
  "/login",
  passport.authenticate ("login", {
    //successRedirect: "/productos",
    failureRedirect: "/login-error",
  }), async (req, res)=>{
    const user = await userModel.find({username: req.body.username})
    console.log("el usuario es " + user.email)
    const payload = {
      name: req.body.username,
      //email: email,
      iat: Math.floor(Date.now()/1000),
      exp: Math.floor(Date.now()/1000) + 60 * 60
    }

    const token = jwt.sign(payload, process.env.JWT_SIGN)
    res.json({token})
  }
  /*function (req, res) {
    res.render("home", { username: req.body.username });
  }*/
);

const messages = [
	{
		author: "Juan",
		text: "Hola que tal",
	},
	{
		author: "Maria",
		text: "Bien y vos?",
	},
	{
		author: "Juan",
		text: "Me alegra",
	},
  {
		author: "Juan",
		text: "Hola",
	},
  {
		author: "Juan",
		text: "Pasame la copia de la tarea",
	},
  {
		author: "Juan",
		text: "Hello",
	},
  {
		author: "Maria",
		text: "ok pero no le digas al profe",
	}
];

 router.get('/chat',(req, res)=>{
  res.sendFile(__dirname + '/public/chat.html')
  const io = req.app.get('socketio')
  io.on('connection', (socket)=>{
    console.log('se conecto un usuario')
    io.sockets.emit('messages', messages)
  })

 })

 router.get('/chat-email',(req, res)=>{
  res.sendFile(__dirname + '/public/chat.html')
  const io = req.app.get('socketio')
  io.on('connection', (socket)=>{
    console.log('se conecto un usuario')
    const myMessages = messages.filter((message)=>{
      return message.author == req.query.email
    })
    socket.emit('messages', myMessages)
  })

 })

export default router;
