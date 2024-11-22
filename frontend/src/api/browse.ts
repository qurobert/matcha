import api from "@/api/api";

export const fetchBrowse = async () => {
	const response = await api.get('/browse', {params: {n: 5}});
	return response.data;
}