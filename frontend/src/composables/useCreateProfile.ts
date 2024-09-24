import {useFormStore} from "@/stores/formStore";
import {useForm, type YupSchema} from 'vee-validate';

const useGeneralCreateProfile = (schema: YupSchema, ) => {
	const {handleSubmit, setFieldValue, values} = useForm({
		validationSchema: schema
	})
	const formStore = useFormStore();
	const onSubmit = handleSubmit(values => {
		console.log(values);
		formStore.setFormValues(values);
		formStore.incrementPageIndex();

		// Try to submit
		const index = formStore.getPageIndex();
		const maxPage = formStore.getMaxPage();
		if (index >= maxPage) {
			console.log('submit');
			console.log(formStore.getForm());
			// formStore.clearAllData();
		}
	});
	return {
		setFieldValue,
		values,
		onSubmit
	}
}

export const useInfoCreateProfile = (schema: YupSchema) => {
	const {setFieldValue, values, onSubmit} = useGeneralCreateProfile(schema);
	return {
		setFieldValue,
		values,
		onSubmit
	}
}

export const useInterestCreateProfile = (schema: YupSchema) => {
	const {setFieldValue, values, onSubmit} = useGeneralCreateProfile(schema);
	return {
		setFieldValue,
		values,
		onSubmit
	}
}

export const useBiographyCreateProfile = (schema: YupSchema) => {
	const {setFieldValue, values, onSubmit} = useGeneralCreateProfile(schema);
	return {
		setFieldValue,
		values,
		onSubmit
	}
}

export const usePictureCreateProfile = (schema: YupSchema) => {
	const {setFieldValue, values, onSubmit} = useGeneralCreateProfile(schema);
	return {
		setFieldValue,
		values,
		onSubmit
	}
}