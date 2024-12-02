import api from "@/api/api";

export const sendMessage = async (id: string, message: string) => {
    try {
        const response = await api.post('/chat/send-message', {message, id});
        return response.data;
    } catch (error) {}
}

export const fetchMessages = async (id: string, lastMessage: boolean = false) => {
    try {
        const response = await api.get(`/chat/get-message/${id}?lastMessage=${lastMessage}`);
        return response.data;
    } catch (error) {}
}