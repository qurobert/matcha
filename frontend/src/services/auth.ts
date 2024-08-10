import {fetchLogin, fetchMe, fetchSignup} from "@/api/auth";
import { useAuthStore } from "@/stores/userStore";

export const signup = async (email: string, username: string, password: string) => {
		try {
			const authStore = useAuthStore();
			const {user, access_token, refresh_token } = await fetchSignup(email, username, password);
			const {verify_email} = user;

			authStore.storeUserInfo({email, username, verify_email});
			authStore.store_token(access_token, refresh_token);

		} catch (error: any) {
			console.log(error);
			if (error?.response?.data?.message?.includes("exists"))
				throw new Error("User with this email or username already exists");
			else
				throw new Error("An error occurred");
		}
};

export const login = async (username_login: string, password_login: string) => {
	try {
		const authStore = useAuthStore();
		const {user, access_token, refresh_token } = await fetchLogin(username_login, password_login);
		const {email, username, verify_email} = user;

		authStore.store_token(access_token, refresh_token);
		authStore.storeUserInfo({email, username, verify_email});
	} catch (error: any) {
		// console.log(error);
		if (error?.response?.status === 401)
			throw new Error("Incorrect username or password");
		else
			throw new Error("An error occurred");
	}
}

export const emailIsVerify = async () : Promise<boolean> => {
	try {
		const userInfo = await fetchMe();
		const {verify_email} = userInfo.user;

		return verify_email;
	} catch (error: any) {
		throw new Error("An error occurred");
	}
}