import {io} from "../index.ts";
import ChatModel from "../models/chatModel.ts";

export default class ChatService {
    static async sendMessage(user_id: string, target_user_id: string, message: string) {
        console.log(`Message received: ${message}`, `send to: ${target_user_id}`);
        console.log(`Sending message to ${user_id}`);
        io.emit(`message_${target_user_id}`, { id: user_id, message });
        await ChatModel.createMessage(user_id, target_user_id, message);
    }

    static async getMessages(user_id: string, target_user_id: string) {
        return ChatModel.getMessages(user_id, target_user_id);
    }
}