import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import routers from "./src/routers/index.js";
import db from "./src/config/db/db.js";
import bodyParser from "body-parser";
const app = express()

dotenv.config()
app.use(morgan('combined'))
app.use(bodyParser.json())
routers(app)
db.connect()



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`run on port ${port}`)
})