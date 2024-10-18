import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: {} as User ,
		tmpEmail: null,
		access_token: localStorage.getItem('access_token') || null,
		refresh_token: localStorage.getItem('refresh_token') || null,
	}),
	getters: {
		verify_email: (state) => state.user?.verify_email,
		email: (state) => state.user?.email,
		username: (state) => state.user?.username,
		token: (state) => [state.access_token, state.refresh_token],
		is_connected: (state) => state.user?.email !== undefined,
	},
	actions: {
		updateUsername(username: string) {
			this.user.username = username;
		},
		updateEmail(email: string) {
			this.user.email = email;
			this.user.verify_email = false;
		},
		store_token(access_token: string, refresh_token: string) {
			console.log('Access token stored');
			localStorage.setItem('access_token', access_token);
			localStorage.setItem('refresh_token', refresh_token);
		},
		clear_token() {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
		},
		logout() {
			this.user = {} as User;
			this.clear_token();
		},
		storeUserInfo(user: any) {
			this.user = user;
		},
		hasVerifiedEmail() {
			this.user.verify_email = true;
		}
	},
})