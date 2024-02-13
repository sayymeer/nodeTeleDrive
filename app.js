import { TelegramClient,Api } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import express from "express";
import bodyParser from "body-parser"
import morgan from "morgan"
import { CONNECTION_RETRIES, apiCred } from "./config.js";
import {router} from "./routes/routes.js";


const port = 3000 || process.env.PORT

const stringSession = new StringSession("")

const app = express()
app.use(bodyParser.json())
app.use(morgan("tiny"))

app.use("/v1",router)

app.post("/signup",async (req,res)=>{
    const {phoneNumber} = req.body
    console.log(phoneNumber)
    try {
        const teleClient = new TelegramClient(stringSession,apiCred.apiId,apiCred.apiHash,{connectionRetries:CONNECTION_RETRIES,})
        await teleClient.connect()
        const { phoneCodeHash, timeout } = await teleClient.invoke(new Api.auth.SendCode({
            ...apiCred,
            phoneNumber,
            settings: new Api.CodeSettings({
                allowFlashcall: true,
                currentNumber: true,
                allowAppHash: true,
              })
        }))
        res.json({ phoneCodeHash, timeout })
    } catch (error) {
        res.json("error")
        console.log(error)
    }
})

app.post("/login",async (req,res)=>{
    try {
        const { phoneNumber, phoneCode, phoneCodeHash } = req.body
        const teleClient = new TelegramClient(stringSession,apiCred.apiId,apiCred.apiHash,{connectionRetries:CONNECTION_RETRIES,})
        await teleClient.connect()
        const signIn = await teleClient.invoke(new Api.auth.SignIn({
            phoneNumber,phoneCode,phoneCodeHash
        }))
        res.json("success")
    } catch (error) {
        res.json("error")
        console.log(error)
    }
})

app.listen(port, console.log(`Server Listening on ${port}`))