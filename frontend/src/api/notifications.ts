import api from "@/api/api";

export const fetchNotifications = async () => {
	const response = await api.get('/notifications');
	return response.data;
}

export const fetchMarkAsReadNotifications = async () => {
	const response = await api.post('/notifications/mark_as_read');
	return response.data;
}