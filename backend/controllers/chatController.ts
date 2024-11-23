import type {Request, Response} from "express";

export default class ChatController {
    static async sendMessage(req: Request, res: Response) {
        res.json({message: "Message sent!"});
    }
}