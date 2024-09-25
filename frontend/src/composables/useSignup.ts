import {useForm} from 'vee-validate';
import {ref} from "vue";
import {signup} from "@/services/auth";
import {useRouter} from "vue-router";
import {useYup} from "@/composables/useYup";
import * as yup from "yup";

export const useSignup = () => {
	const errorOnSubmit = ref("");
	const router = useRouter();

	const {emailSchema, usernameSchema, passwordSchema} = useYup();
	const signupSchema = yup.object().shape({
		email: emailSchema,
		username: usernameSchema,
		password: passwordSchema
	})

	const {handleSubmit} = useForm({
		validationSchema: signupSchema
	})

	const onSubmit = handleSubmit(values => {
		const {email, username, password} = values;

		signup(email, username, password).then(() => {
			router.push('/verify-email');
		}).catch(err => {
			console.log("ERREUR : ", err);
			errorOnSubmit.value = err;
		});
	});

	return {
		onSubmit,
		errorOnSubmit
	}
}