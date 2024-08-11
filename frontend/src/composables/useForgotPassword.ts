import {useForm} from 'vee-validate';
import * as yup from 'yup';
import {login} from "@/services/auth";
import {useRouter} from "vue-router";
import {fetchForgotPassword, fetchResetPassword} from "@/api/auth";
import {useAuthStore} from "@/stores/userStore";

const schema = yup.object({
	email: yup.string()
	.email()
	.required("Email is required"),
})

export const useForgotPassword = () => {
	const router = useRouter();
	const authStore = useAuthStore();
	const {defineField, errors, handleSubmit} = useForm({
		validationSchema: schema
	});
	const [email, emailAttrs] = defineField('email');

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
		email,
		emailAttrs,
		onSubmit,
		errors
	}
}

const schemaResetPassword = yup.object({
	password: yup.string()
	.min(8, "Minimum 8 characters")
	.matches(/[A-Z]/, 'Minimum 1 uppercase letter')
	.matches(/[!@#$%^&*(),.?":{}|<>]/, 'Minimum 1 special character')
	.required("Password is required"),
	confirmPassword: yup.string()
	.oneOf([yup.ref('password')], 'Passwords must match'),
	code: yup.string()
	.length(6, "Code must be 6 characters")
	.required("Code is required")
})

export const useResetPassword = () => {
	const router = useRouter();
	const authStore = useAuthStore();
	const {defineField, errors, handleSubmit} = useForm({
		validationSchema: schemaResetPassword
	});
	const [code, codeAttrs] = defineField('code');
	const [password, passwordAttrs] = defineField('password');
	const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');

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
		});
	});

	return {
		code,
		codeAttrs,
		password,
		passwordAttrs,
		confirmPassword,
		confirmPasswordAttrs,
		errors,
		onSubmit
	}
}