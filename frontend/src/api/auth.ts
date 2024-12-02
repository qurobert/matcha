import api from './api';

export const fetchSignup = async (email: string, username: string, password: string)  => {
	try {
		const response = await api.post('/auth/register', {
			email,
			username,
			password
		});
		return response.data;
	} catch(error) {}
};

export const fetchMe = async () => {
	try {
		const response = await api.get('/users/me');
		return response.data;
	} catch (error) {}
}

export const fetchStatus = async () => {
	try {
		const response = await api.get('/users/status');
		return response.data;
	} catch (error) {}
}

export const fetchLogin = async (username: string, password: string) => {
	try {
		const response = await api.post('/auth/login', {
			username,
			password
		});
		return response.data;
	} catch (error) {}
}

export const fetchResendEmail = async (email: string) => {
	try {
		const response = await api.post('/auth/send-email-verify', {
			email
		});
		return response.data;
	} catch (error) {}
}

export const fetchForgotPassword = async (email: string) => {
	try {
		const response = await api.post('/users/forgot-password', {
			email
		});
		return response.data;
	} catch (error) {}
}

export const fetchResetPassword = async (code: string, email: string, password: string) => {
	try {
		const response = await api.post('/users/reset-password', {
			code,
			email,
			password
		});
		return response.data;
	} catch(error) {}
}