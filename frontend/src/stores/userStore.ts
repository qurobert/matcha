import {defineStore} from "pinia";

type UserType = {
	email: string;
	username: string;
	verify_email: boolean;
}

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: {} as UserType,
		access_token: localStorage.getItem('access_token') || null,
		refresh_token: localStorage.getItem('refresh_token') || null,
	}),
	getters: {
		verify_email: (state) => state.user?.verify_email,
		email: (state) => state.user?.email,
		username: (state) => state.user?.username,
		token: (state) => [state.access_token, state.refresh_token]
	},
	actions: {
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
			this.user = {} as UserType;
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