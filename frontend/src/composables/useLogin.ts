import {useForm} from 'vee-validate';
import * as yup from 'yup';
import {login} from "@/services/auth";
import {useRouter} from "vue-router";

const schema = yup.object({
	username: yup.string()
	.min(1, "Minimum 1 characters")
	.max(15, "Maximum 15 characters")
	.required("Username is required"),
	password: yup.string()
	.min(8, "Minimum 8 characters")
	.matches(/[A-Z]/, 'Minimum 1 uppercase letter')
	.matches(/[!@#$%^&*(),.?":{}|<>]/, 'Minimum 1 special character')
	.required("Password is required"),
})

export const useLogin = () => {
	const router = useRouter();

	const {defineField, errors, handleSubmit} = useForm({
		validationSchema: schema
	});
	const [username, usernameAttrs] = defineField('username');
	const [password, passwordAttrs] = defineField('password');

	const onSubmit = handleSubmit(values => {
		const {username, password} = values;

		login(username, password).then(() => {
			router.push({name: 'profile'});
		}).catch(err => {
			console.log(err);
		});
	});

	return {
		username,
		usernameAttrs,
		password,
		passwordAttrs,
		onSubmit,
		errors
	}
}