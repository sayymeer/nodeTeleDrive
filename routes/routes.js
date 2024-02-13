import { Router } from "express";
import { test } from "../controllers/common.js";


export const router = Router()
router.get("/test",test)
