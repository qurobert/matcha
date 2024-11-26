import type {Request, Response} from "express";
import ChatService from "../services/chatService.ts";

export default class ChatController {
    static async sendMessage(req: Request, res: Response) {
        const user = req.user;
        if (!user) throw new Error("User not found");
        const {message, id} = req.body;
        if (!message || !id) throw new Error("Message or id not found");
        // call service check : if user exists, if user is not himself, if user is not blocked
        // call service to send message via websokcet
        await ChatService.sendMessage(user.id, id, message);
        // call service to notify user
        res.json({message: "Message sent!"});
    }

    static async getMessages(req: Request, res: Response) {
        console.log("mew");
        const user = req.user;
        const id = req.params.id;

        if (!user) throw new Error("User not found");
        // call service to get messages
        // can ask just the last message
        const messages = await ChatService.getMessages(user.id, id);
        const formatMessages = messages.map((message: any) => {
            return {
                id: message.user_id,
                message: message.message,
            };
        })
        res.json({
            messages: formatMessages,
        });
    }
}