import {useForm} from 'vee-validate';
// import {useRouter} from "vue-router";

export const useLogin = () => {
	// const router = useRouter();

	const {handleSubmit} = useForm();

	const onSubmit = handleSubmit(values => {
		console.log(values);
	});

	return {
		onSubmit,
	}
}