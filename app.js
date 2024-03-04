import express from "express";
import bodyParser from "body-parser"
import morgan from "morgan"
import {router} from "./routes/routes.js";


const port = 3000 || process.env.PORT

const app = express()
app.use(bodyParser.json())
app.use(morgan("dev"))

app.use("/v1",router)

// Handling Errors
app.use((err,req,res,next) => {
    console.log(err.stack)
    res.status(500).send("Internal server error")
})

app.listen(port, console.log(`Server Listening on ${port}`))