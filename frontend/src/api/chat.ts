import api from "@/api/api";

export const sendMessage = async (id: string, message: string) => {
    const response = await api.post('/chat/send-message', {message, id});
    return response.data;
}

export const fetchMessages = async (id: string) => {
    const response = await api.get(`/chat/get-message/${id}`);
    return response.data;
}