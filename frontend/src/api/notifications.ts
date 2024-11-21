import api from "@/api/api";

export const fetchNotifications = async () => {
	const response = await api.get('/notifications');
	return response.data;
}

export const fetchMarkAsReadNotifications = async () => {
	const response = await api.post('/notifications/mark_as_read');
	return response.data;
}

export const fetchViewedProfile = async (profile_user_id: string) => {
	const response = await api.post('/notifications/viewed_profile', {target_user_id: profile_user_id});
	return response.data;
}