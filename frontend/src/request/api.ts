import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	}
});

api.interceptors.request.use(
	(config): any => {
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) {
			config.headers
				['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
)

api.interceptors.response.use(
	(response): any => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		console.log(error);
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem('refresh_token');
			const response = await api.post('/auth/refresh', {
				refreshToken
			});
			const {access_token, refresh_token} = response.data;
			localStorage.setItem('access_token', access_token);
			localStorage.setItem('refresh_token', refresh_token);
			console.log('Access token refreshed');
			return api(originalRequest);
		}
		return Promise.reject(error);
	}
)
export default api;