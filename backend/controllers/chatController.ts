import type {Request, Response} from "express";
import ChatService from "../services/chatService.ts";
import NotificationModel from "../models/notificationModel.ts";
import {NotificationType} from "../types/enumNotificationType.ts";

export default class ChatController {
    static async sendMessage(req: Request, res: Response) {
        const user = req.user;
        const {message, id} = req.body;

        if (!user) throw new Error("User not found");
        if (!message || !id) throw new Error("Message or id not found");
        await ChatService.sendMessage(user.id, id, message);
        await NotificationModel.createNotification(id, user.id, NotificationType.message);
        res.json({message: "Message sent!"});
    }

    static async getMessages(req: Request, res: Response) {
        const user = req.user;
        const id = req.params.id;
        const lastMessage = req.query.lastMessage === "true";

        if (!user) throw new Error("User not found");
        const messages = await ChatService.getMessages(user.id, id);
        const formatMessages = messages.map((message: any) => {
            return {
                id: message.user_id,
                message: message.message,
            };
        })
        res.json({
            messages: lastMessage ? formatMessages[formatMessages.length - 1] : formatMessages,
        });
    }
}