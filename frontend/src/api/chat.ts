import api from "@/api/api";

export const sendMessage = async (message: string) => {
    const response = await api.get('/browse', {params: {n: 5}});
    return response.data;
}