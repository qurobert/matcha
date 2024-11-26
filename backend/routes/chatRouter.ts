import express from "express";
import ChatController from "../controllers/chatController.ts";
import {verifyAuth} from "../middlewares/authMiddleware.ts";

const chatRouter = express.Router();

chatRouter.post('/send-message', verifyAuth, ChatController.sendMessage);
chatRouter.get('/get-message/:id', verifyAuth, ChatController.getMessages);

export default chatRouter;