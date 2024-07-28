import express from "express";
import {
	emailValidator,
	resetPassValidator
} from "../validators/userValidator.ts";
import UserController from "../controllers/userController.ts";
import {verifyAuth} from "../middlewares/authMiddleware.ts";

const userRouter = express.Router();


// @ts-ignore
userRouter.get('/me', verifyAuth, UserController.getUserConnected);
// @ts-ignore
userRouter.get('/:id', verifyAuth, UserController.getUserById);
// @ts-ignore
userRouter.post('/forgot-password', emailValidator(), UserController.forgotPassword);
// @ts-ignore
userRouter.post('/reset-password', resetPassValidator(), UserController.resetPassword);
// @ts-ignore
userRouter.post('/update', verifyAuth, UserController.updateUser);

export default userRouter