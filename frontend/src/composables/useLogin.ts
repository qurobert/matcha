import {useForm} from 'vee-validate';
import {login} from "@/services/auth";
import {useRouter} from "vue-router";
import {ref} from "vue";

export const useLogin = () => {
	const router = useRouter();

	const {handleSubmit} = useForm();
	const globalError = ref("");

	const onSubmit = handleSubmit(values => {
		const {username, password} = values;

		login(username, password).then(() => {
			router.push({name: 'profile'});
		}).catch(err => {
			globalError.value = err;
			console.log(err);
		});
	});

	return {
		onSubmit,
		globalError,
	}
}