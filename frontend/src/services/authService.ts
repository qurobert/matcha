import {fetchSignup} from "@/request/authRequest";
import { useAuthStore } from "@/stores/auth";

export const signup = async (email: string, username: string, password: string) => {
		try {
			const authStore = useAuthStore();
			const {access_token, refresh_token } = await fetchSignup(email, username, password);

			authStore.signup(access_token, refresh_token);
		} catch (error: any) {
			throw new Error(error?.response?.data?.message ?? "An error occurred");
		}
};