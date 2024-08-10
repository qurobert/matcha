import express from "express";
import {verifyAuth} from "../middlewares/authMiddleware.ts";
import {
    emailValidator,
    refreshTokenValidator, registerValidator
} from "../validators/userValidator.ts";
import AuthController from "../controllers/authController.ts";

const authRouter = express.Router();

// @ts-ignore
authRouter.post('/register',registerValidator(), AuthController.register);
authRouter.get('/verify-email', AuthController.verifyEmail);
authRouter.post('/login', AuthController.login);
// @ts-ignore
authRouter.post('/send-email-verify', emailValidator(), AuthController.sendVerificationEmail);
// @ts-ignore
authRouter.post('/refresh', refreshTokenValidator(), AuthController.refreshAuth);

export default authRouter;