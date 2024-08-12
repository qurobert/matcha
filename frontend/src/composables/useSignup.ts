import {useForm} from 'vee-validate';
import {ref} from "vue";
import {signup} from "@/services/auth";
import {useRouter} from "vue-router";

export const useSignup = () => {
	const {handleSubmit} = useForm()
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
		onSubmit,
		globalError
	}
}