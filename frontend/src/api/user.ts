import api from './api';

export const fetchUpdateUserProfile = async (userProfile: Profile) => {
	try {
		const response = await api.put('/users/profile', userProfile);
		return response.data;
	} catch (error) {}
}

export const fetchUpdateUserPreferences = async (userPreferences: Preferences) => {
	try {
		const response = await api.put('/users/preferences', userPreferences);
		return response.data;
	} catch (error) {}
}

export const fetchUpdateUserImages = async (images: File[]) => {
	try {
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
	} catch (error) {}
}

export const fetchGetUserImages = async () => {
	try {
		const response = await api.get('/users/images');
		return response.data;
	} catch (error) {}
}

export const fetchDeleteUserImages = async () => {
	try {
		const response = await api.delete('/users/images');
		return response.data;
	} catch (error) {}
}

export const fetchMe = async () => {
	try {
		const response = await api.get('/users/me');
		return response.data;
	} catch (error) {}
}

export const fetchUserById = async (id: string) => {
	try {
		const response = await api.get('/users/' + id);
		return response.data;
	} catch (error) {}
}

export const fetchUpdateUser = async (user: { email: string, password: string, username: string }) => {
	try {
		const response = await api.post('/users/update', user);
		return response.data;
	} catch (error) {}
}
