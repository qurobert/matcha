import {io} from "../index.ts";

export default class ChatService {
    static async sendMessage(id: string, message: string) {
        console.log(`Message received: ${message}`, `ID: ${id}`);
        io.emit(`message_${id}`, { id, message });
        return { message: "Message sent!" };
    }
}