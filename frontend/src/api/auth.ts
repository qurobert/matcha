import api from './api';

export const fetchSignup = async (email: string, username: string, password: string)  => {
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

export const fetchStatus = async () => {
	const response = await api.get('/users/status');
	return response.data;
}

export const fetchLogin = async (username: string, password: string) => {
	const response = await api.post('/auth/login', {
		username,
		password
	});
	return response.data;
}

export const fetchResendEmail = async (email: string) => {
	const response = await api.post('/auth/send-email-verify', {
		email
	});
	return response.data;
}

export const fetchForgotPassword = async (email: string) => {
	const response = await api.post('/users/forgot-password', {
		email
	});
	return response.data;
}

export const fetchResetPassword = async (code: string, email: string, password: string) => {
	const response = await api.post('/users/reset-password', {
		code,
		email,
		password
	});
	return response.data;
}