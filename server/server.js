const express = require("express")
const cors = require("cors")
const route = require("./Routers/Routes")
// const routeNext = require('./Routers/NewRoutes')
require('dotenv').config({path: "./Config/.env"});

require("./Config/db")

const app = express()
const port = 5000;
app.use(cors())
app.use(express.json())
app.use("/api",route)


app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);

})