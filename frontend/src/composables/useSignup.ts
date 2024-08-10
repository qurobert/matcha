import {useForm} from 'vee-validate';
import {ref} from "vue";
import {signup} from "@/services/auth";
import {useRouter} from "vue-router";
import * as yup from 'yup';

const schema = yup.object({
	email: yup.string()
	.email()
	.required("Email is required"),
	username: yup.string()
	.min(6, "Minimum 6 characters")
	.max(15, "Maximum 15 characters")
	.required("Username is required"),
	password: yup.string()
	.min(8, "Minimum 8 characters")
	.matches(/[A-Z]/, 'Minimum 1 uppercase letter')
	.matches(/[!@#$%^&*(),.?":{}|<>]/, 'Minimum 1 special character')
	.required("Password is required"),
})

export const useSignup = () => {
	const {defineField, errors, handleSubmit} = useForm({
		validationSchema: schema
	})
	const [email, emailAttrs] = defineField('email');
	const [password, passwordAttrs] = defineField('password');
	const [username, usernameAttrs] = defineField('username');
	const globalError = ref("");
	const router = useRouter();

	const onSubmit = handleSubmit(values => {
		const {email, username, password} = values;

		signup(email, username, password).then(() => {
			router.push('/verify-email');
		}).catch(err => {
			console.log("ERREUR : ", err);
			globalError.value = err;
		});
	});

	return {
		email,
		emailAttrs,
		password,
		passwordAttrs,
		username,
		usernameAttrs,
		onSubmit,
		errors,
		globalError
	}
}