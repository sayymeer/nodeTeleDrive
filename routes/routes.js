import { Router } from "express";
import { errorTest, test } from "../controllers/common.js";
import { sendCodeHandler } from "../controllers/auth.js";


export const router = Router()

router.get("/test",test)
router.get("/error",errorTest)

router.post("/sendCode",sendCodeHandler)
