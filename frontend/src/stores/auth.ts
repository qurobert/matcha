import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isLoggedIn: false
	}),
	actions: {
		signup(access_token: string, refresh_token: string) {
			localStorage.setItem('access_token', access_token);
			localStorage.setItem('refresh_token', refresh_token);
		},
		login(access_token: string, refresh_token: string) {
			localStorage.setItem('access_token', access_token);
			localStorage.setItem('refresh_token', refresh_token);
			// this.isLoggedIn = true; // verify_email
		},
		logout() {
			this.isLoggedIn = false;
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
		},
		isConnected() {
			this.isLoggedIn = true;
		}
	},
})