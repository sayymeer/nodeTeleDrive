import { Router } from "express";
import { errorTest, signUpHandler, test, loginHandler } from "../controllers/common.js";
import { sendCodeHandler, teleLoginHandler } from "../controllers/auth.js";
import { authMiddleware } from "../middleware/authorize.js";
import multer from "multer";
import { FileHandler } from "../controllers/sendFile.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        req.fileName = Date.now()+file.originalname
        cb(null, Date.now()+file.originalname); // Use the original file name for saving
    }
});

const upload = multer({ storage: storage });

export const router = Router()

router.get("/test", test)
router.get("/error", errorTest)

router.post('/signup', signUpHandler)
router.post('/login', loginHandler)

router.post("/sendCode", authMiddleware, sendCodeHandler)
router.post("/loginTelegram", authMiddleware, teleLoginHandler)

router.post("/upload-file", upload.single('file'),authMiddleware, FileHandler)