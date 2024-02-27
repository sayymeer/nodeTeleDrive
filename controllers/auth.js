import { StringSession } from "telegram/sessions/index.js";
import { CONNECTION_RETRIES, apiCred, } from "../config.js";
import { TelegramClient } from "telegram";
import { addUser } from "../model/db.js";

export const sendCodeHandler = async (req,res)=>{
    try {
        const {phoneNumber} = req.body
        const stringSession = new StringSession("")
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
        res.json({phoneCodeHash})
    } catch (error) {
        throw error
    }
}

export const loginHandler = async (req,res) => {
    try {
        const { phoneNumber, phoneCode, phoneCodeHash } = req.body
        const stringSession = new StringSession("")
        const teleClient = new TelegramClient(stringSession,apiCred.apiId,apiCred.apiHash,{connectionRetries:CONNECTION_RETRIES,})
        await teleClient.connect()
        const signIn = await teleClient.invoke(new Api.auth.SignIn({
            phoneNumber,phoneCode,phoneCodeHash
        }))
        const session = teleClient.session.save()
        await addUser(phoneNumber,"sameer",session)
        res.send("Success")
    } catch (error) {
        throw error
    }
}