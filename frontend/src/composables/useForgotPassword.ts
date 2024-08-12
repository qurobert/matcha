import {useForm} from 'vee-validate';
import {useRouter} from "vue-router";
import {fetchForgotPassword, fetchResetPassword} from "@/api/auth";
import {useAuthStore} from "@/stores/userStore";
import {ref} from 'vue'

export const useForgotPassword = () => {
	const router = useRouter();
	const authStore = useAuthStore();
	const {handleSubmit} = useForm();

	const onSubmit = handleSubmit(values => {
		const {email} = values;

		fetchForgotPassword(email).then(() => {
			authStore.tmpEmail = email;
			router.push('/reset-password')
		}).catch(err => {
			console.log(err);
		});
	});

	return {
		onSubmit,
	}
}

export const useResetPassword = () => {
	const router = useRouter();
	const authStore = useAuthStore();
	const {handleSubmit} = useForm();
	const globalError = ref('')

	const onSubmit = handleSubmit(values => {
		const {code, password} = values;
		const email = authStore.tmpEmail;
		if (!email) {
			alert('You need to go back to the previous page before resetting your password');
			router.push('/forgot-password');
			return;
		}
		fetchResetPassword(code, email, password).then(() => {
			authStore.tmpEmail = null;
			router.push('/login');
		}).catch((err: any) => {
			console.log(err);
			globalError.value = err;
		});
	});

	return {
		onSubmit,
		globalError
	}
}