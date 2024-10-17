import {useForm} from 'vee-validate';
import {login} from "@/services/auth";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useYup} from "@/composables/useYup";
import * as yup from "yup";

export const useLogin = () => {
	const router = useRouter();
	const {usernameSchema, passwordSchema} = useYup();

	const loginSchema = yup.object().shape({
		username: usernameSchema,
		password: passwordSchema
	})

	const {handleSubmit} = useForm({
		validationSchema: loginSchema
	})
	const errorOnSubmit = ref("");

	const onSubmit = handleSubmit(values => {
		const {username, password} = values;

		login(username, password).then(() => {
			router.push({name: 'private-profile'});
		}).catch(err => {
			errorOnSubmit.value = err;
		});
	});

	return {
		onSubmit,
		errorOnSubmit,
	}
}