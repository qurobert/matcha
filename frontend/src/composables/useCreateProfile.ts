import {useFormStore} from "@/stores/formStore";
import {useForm, type YupSchema} from 'vee-validate';

export const useInfoCreateProfile = (schema: YupSchema, ) => {
	const {handleSubmit, setFieldValue} = useForm({
		validationSchema: schema
	})
	const formStore = useFormStore();
	const onSubmit = handleSubmit(values => {
		console.log(values);
		const {first_name, last_name, date, location} = values;
		formStore.setFormValues({
			first_name,
			last_name,
			date,
			location
		});
		formStore.incrementPageIndex();
		// console.log(formStore.getForm())
	});
	return {
		setFieldValue,
		onSubmit
	}
}
