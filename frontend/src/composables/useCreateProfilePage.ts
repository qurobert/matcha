import {useFormStore} from "@/stores/formStore";
import {useForm, type YupSchema} from 'vee-validate';

export const useCreateProfilePage = (schema: YupSchema, ) => {
	const {handleSubmit} = useForm({
		validationSchema: schema
	})
	const formStore = useFormStore();
	const onSubmit = handleSubmit(values => {
		const {first_name, last_name, date} = values;

		formStore.setFormValues({
			first_name,
			last_name,
			date
		});
		formStore.incrementPageIndex();
		console.log(formStore.getForm())
	});
	return {
		onSubmit
	}
}
