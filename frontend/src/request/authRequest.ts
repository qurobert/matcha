import api from './api';

export const fetchSignup = async (email: string, username: string, password: string) => {
	const response = await api.post('/auth/register', {
		email,
		username,
		password
	});
	return response.data;
};

export const fetchMe = async () => {
	const response = await api.get('/users/me');
	return response.data;
}

export const fetchLogin = async (username: string, password: string) => {
	const response = await api.post('/auth/login', {
		username,
		password
	});
	return response.data;
}