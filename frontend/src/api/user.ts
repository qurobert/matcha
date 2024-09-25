import api from './api';

export const fetchUpdateUserProfile = async (userProfile: Profile) => {
	const response = await api.put('/users/profile', userProfile);
	return response.data;
}

export const fetchUpdateUserImages = async (formData: FormData) => {
	const response = await api.put('/users/images', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return response.data;
}

export const fetchGetUserImages = async () => {
	const response = await api.get('/users/images');
	return response.data;
}

export const fetchDeleteUserImages = async () => {
	const response = await api.delete('/users/images');
	return response.data;
}

export const fetchMe = async () => {
	const response = await api.get('/users/me');
	return response.data;
}
