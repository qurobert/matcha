import axios from 'axios';
import {useAuthStore} from "@/stores/userStore";

const api = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	}
});

api.interceptors.request.use(
	(config): any => {
		const access_token = localStorage.getItem('access_token');
		if (access_token) {
			config.headers
				['Authorization'] = `Bearer ${access_token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
)

api.interceptors.response.use(
	async (response): Promise<any> => {
		if (response.data.token_expired) {
			await refreshToken();
		}
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if ((error.response.status === 401 || error.response.data.token_expired) && !originalRequest._retry) {
			originalRequest._retry = true;
			await refreshToken();
			return api(originalRequest);
		}
		return Promise.reject(error);
	}
)

const refreshToken = async () => {
	const authStore = useAuthStore();
	const [_, refreshToken] = authStore.token;
	if (!refreshToken) {
		authStore.logout();
		return Promise.reject('No refresh token');
	}
	const response = await api.post('/auth/refresh', {
		refresh_token: refreshToken
	});
	const {access_token, refresh_token} = response.data;

	authStore.store_token(access_token, refresh_token);
}
export default api;