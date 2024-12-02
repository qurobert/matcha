import api from "@/api/api";

export const fetchNotifications = async () => {
	try {
		const response = await api.get('/notifications');
		return response.data;
	} catch(error) {}
}

export const fetchMarkAsReadNotifications = async () => {
	try {
		const response = await api.post('/notifications/mark_as_read');
		return response.data;
	} catch(error) {}
}

export const fetchViewedProfile = async (profile_user_id: string) => {
	try {
		const response = await api.post('/notifications/viewed_profile', {target_user_id: profile_user_id});
		return response.data;
	} catch(error) {}
}