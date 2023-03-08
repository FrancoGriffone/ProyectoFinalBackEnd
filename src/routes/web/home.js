import { Router } from "express"
import { webAuth } from "../../auth/index.js"
import path from 'path'

const showProd = new Router();

showProd.get('/home', webAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/views/home.ejs'),
        { name: req.session.name })
})


export default showProd;