import { StringSession } from "telegram/sessions/index.js";
import { CONNECTION_RETRIES, apiCred, mySessionString } from "../config.js";
import { TelegramClient } from "telegram";

const session = new StringSession(mySessionString)
const teleClient = new TelegramClient(session,apiCred.apiId,apiCred.apiHash,{connectionRetries:CONNECTION_RETRIES,})
await teleClient.connect()
await teleClient.sendMessage("me",{message:"helloo babby gurllll"})