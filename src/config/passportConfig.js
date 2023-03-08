import mongoose from "mongoose";
import UserModel from "./../models/userSchema.js"
import bCrypt from "bCrypt"
import { createTransport } from 'nodemailer';

import passport from "passport";
import { Strategy } from "passport-local";
import dotenv from 'dotenv'
import passportJwt from "passport-jwt"

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

dotenv.config()

const localStrategy = Strategy;

const jwtOptions = {
    secretOrKey: process.env.JWT_SIGN,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(new JwtStrategy(jwtOptions, async(payload, done)=>{
    try {
        console.log("validando")
        await mongoose.connect(process.env.MONGOOSE_CONNECT)
        const user = await UserModel.find({username: payload.username})
        if(user){
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (e) {
        console.log(e)
        return done(e, false)
    }
}))

passport.use("register", new localStrategy(
    { passReqToCallback: true},
    async (req, username, password, done) => {
        console.log("User Registred has", username + " " + password);
        mongoose.connect(process.env.MONGOOSE_CONNECT);

        try {
            UserModel.create(
                {
                    username,
                    email: req.body.email,
					password: createHash(password),
					telefono: req.body.telefono,
					direccion: req.body.address,
                },
                (err, userWithId) => {
                    if (err) {
                        console.log(`User already exist: ${err}`)
                        return done(err, null);
                    }
                    return done(null, userWithId);
                }
            );
            const transporter = createTransport({
                service: "gmail",
                port: 587, 
                auth: {
                    user: process.env.TEST_MAIL, 
                    pass: process.env.PASS_APP
                } 
            });
            
            const mailOptions = {
                from: 'Servidor Node.js',
                to: process.env.TEST_MAIL,
                subject: 'Nuevo registro',
                html: '<h1>Te notificamos que existe un nuevo registro en la base de datos. Compruebalo en el servidor de Mongo Atlas</h1>'
            }
            
            try {
                const info = await transporter.sendMail(mailOptions)
                console.log(info)
            } catch (error) {
                console.log(err)
            }
            //await sendMail(), abria que hacer el async arriba
            console.log("Este try de register")
        } catch (error) {
            console.log({ error: 'Usuario ya existe' })
            return done(error, null);
        }
    }));

passport.use("login",
    new localStrategy({passReqToCallback: true, usernameField: 'username', passwordField: 'password'},(req, username, password, done) => {
        mongoose.connect(process.env.MONGOOSE_CONNECT);
        try{
            UserModel.findOne({username},(err, user)=>{
                if(err){
                    return done(err, null)
                }
                if(!user){
                    return done(null, false)
                }
                if(!isValidPassword(user, password)){
                    return done(null, false)
                }
                return done(null, user)
            });
        }catch(error){
            console.log({error: 'No se pudo validar usuario'})
            return done(error, null);
        }
}));



passport.serializeUser((usuario, done) => {
	console.log(usuario);
	done(null, usuario.username);
});

passport.deserializeUser((username, done) => { //cambie id por username en los argumentos de el deserialize y del findbyid, que lo puse como findone
	UserModel.findOne(username, done);
});

function createHash(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10),null)
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
}

export default passport;