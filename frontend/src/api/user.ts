import api from './api';

export const fetchUpdateUserProfile = async (userProfile: Profile) => {
	const response = await api.put('/users/profile', userProfile);
	return response.data;
}

export const fetchUpdateUserPreferences = async (userPreferences: Preferences) => {
	const response = await api.put('/users/preferences', userPreferences);
	return response.data;
}

export const fetchUpdateUserImages = async (images: File[]) => {
	const formData = new FormData();
	images.forEach((file) => {
		formData.append('pictures', file);  // Même clé pour tous les fichiers
	});
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

export const fetchUserById = async (id: string) => {
	const response = await api.get('/users/' + id);
	return response.data;
}

export const fetchUpdateUser = async (user: { email: string, password: string, username: string }) => {
	const response = await api.post('/users/update', user);
	return response.data;
}
