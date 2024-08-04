import api from './api';

export const fetchSignup = async (email: string, username: string, password: string) => {
	const response = await api.post('/auth/register', {
		email,
		username,
		password
	});
	return response.data;
};