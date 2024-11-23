import type {Request, Response} from "express";
import ChatService from "../services/chatService.ts";

export default class ChatController {
    static async sendMessage(req: Request, res: Response) {
        const message = req.body.message;
        const id = req.body.id;
        // call service check : if user exists, if user is not himself, if user is not blocked
        // call service to send message via websokcet
        await ChatService.sendMessage(id, message);
        // call service to notify user
        res.json({message: "Message sent!"});
    }
}