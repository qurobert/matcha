import express from "express";
import {
    emailValidator,
    refreshTokenValidator, registerValidator
} from "../validators/userValidator.ts";
import AuthController from "../controllers/authController.ts";

const authRouter = express.Router();

authRouter.post('/register',registerValidator(), AuthController.register);
authRouter.get('/verify-email', AuthController.verifyEmail);
authRouter.post('/login', AuthController.login);
authRouter.post('/send-email-verify', emailValidator(), AuthController.sendVerificationEmail);
authRouter.post('/refresh', refreshTokenValidator(), AuthController.refreshAuth);

export default authRouter;