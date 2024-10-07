import {useForm} from 'vee-validate';
import {useRouter} from "vue-router";
import {fetchForgotPassword, fetchResetPassword} from "@/api/auth";
import {useAuthStore} from "@/stores/userStore";
import {ref} from 'vue'
import {useYup} from "@/composables/useYup";
import * as yup from "yup";
import {useToast} from "@/components/ui/toast";

export const useForgotPassword = () => {
	const router = useRouter();
	const authStore = useAuthStore();

	const {emailSchema} = useYup();
	const forgotPasswordSchema = yup.object().shape({
		email: emailSchema
	})

	const {handleSubmit} = useForm({
		validationSchema: forgotPasswordSchema
	});
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
	const errorOnSubmit = ref('')

	const {codeSchema, passwordSchema, confirmPasswordSchema} = useYup();
	const resetPasswordSchema = yup.object().shape({
		code: codeSchema,
		password: passwordSchema,
		confirm_password: confirmPasswordSchema
	})

	const {handleSubmit} = useForm({
		validationSchema: resetPasswordSchema
	});
	const onSubmit = handleSubmit(values => {
		const {code, password} = values;
		const email = authStore.tmpEmail;
		if (!email) {
			alert('You need to go back to the previous page before resetting your password');
			router.push('/forgot-password');
			return;
		}
		fetchResetPassword(code, email, password).then(() => {
			const {toast} = useToast();
			authStore.tmpEmail = null;
			toast({
				title: 'Your password has been reset. You can now login with your new password',
			})
			router.push('/login');
		}).catch((err: any) => {
			errorOnSubmit.value = err;
		});
	});

	return {
		onSubmit,
		errorOnSubmit
	}
}