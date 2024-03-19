import { StringSession } from "telegram/sessions/index.js";
import { CONNECTION_RETRIES, apiCred } from "../config.js";
import { Api, TelegramClient } from "telegram";

export const FileHandler = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    const fileName = req.fileName
    const originalFileName = req.fileOrgName
    const user = req.body.user
    const sessionString = user.session
    const session = new StringSession(sessionString)
    const client = new TelegramClient(session, apiCred.apiId, apiCred.apiHash, { connectionRetries: CONNECTION_RETRIES })
    await client.connect()
    const uploadDetails = await client.sendFile("me", { file: `files/${fileName}`, caption: "Uploaded Automatically" })
    user.files.push({
        id: uploadDetails.id,
        name: originalFileName
    });
    await user.save();
    await client.disconnect();
    res.json({
        id: uploadDetails.id,
        name: originalFileName
    });
}

export const fileDownloadHandler = async (req,res,next) => {
    const {fileId} = req.body
    const user = req.body.user
    const sessionString = user.session
    const session = new StringSession(sessionString)
    const client = new TelegramClient(session, apiCred.apiId, apiCred.apiHash, { connectionRetries: CONNECTION_RETRIES })
    await client.connect()
    const buffer = await client.downloadMedia(new Api.Message({
        id:Number(fileId)
    }),{progressCallback:console.log})
    console.log(buffer.length)
    res.send(buffer)
    await client.disconnect()
}