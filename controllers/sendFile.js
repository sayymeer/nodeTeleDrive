import { StringSession } from "telegram/sessions/index.js";
import { CONNECTION_RETRIES, apiCred } from "../config.js";
import { TelegramClient } from "telegram";

export const FileHandler = async (req, res,next) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    const fileName = req.fileName
    const user = req.body.user
    const sessionString = user.session
    const session = new StringSession(sessionString)
    const client = new TelegramClient(session,apiCred.apiId,apiCred.apiHash,{connectionRetries:CONNECTION_RETRIES})
    await client.connect()
    await client.sendFile("me",{file:`files/${fileName}`,caption:"Uploaded Automatically"})
    await client.disconnect()
    res.json("file uploaded successfully")
}