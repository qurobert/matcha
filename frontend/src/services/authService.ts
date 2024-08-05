import {fetchLogin, fetchMe, fetchSignup} from "@/request/authRequest";
import { useAuthStore } from "@/stores/auth";

export const signup = async (email: string, username: string, password: string) => {
		try {
			const authStore = useAuthStore();
			const {access_token, refresh_token } = await fetchSignup(email, username, password);

			authStore.signup(access_token, refresh_token);
		} catch (error: any) {
			console.log(error);
			if (error?.response?.data?.message?.includes("exists"))
				throw new Error("User with this email or username already exists");
			else
				throw new Error("An error occurred");
		}
};

export const emailIsVerified = async (): Promise<boolean> => {
	const authStore = useAuthStore();
	try {
		const response = await fetchMe();
		return response?.user?.verify_email ?? false;
	} catch (error) {
		authStore.logout();
		return false;
	}
}

export const login = async (username: string, password: string) => {
	try {
		const authStore = useAuthStore();
		const {access_token, refresh_token } = await fetchLogin(username, password);

		authStore.login(access_token, refresh_token);
	} catch (error: any) {
		console.log(error);
		if (error?.response?.status === 401)
			throw new Error("Incorrect username or password");
		else
			throw new Error("An error occurred");
	}
}