import {useFormStore} from "@/stores/formStore";
import {useForm, type YupSchema} from 'vee-validate';
import {fetchUpdateUserImages, fetchUpdateUserProfile} from "@/api/user";
import router from "@/router";

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
		if (index > maxPage) {
			console.log('submit');
			const form = formStore.getForm();
			const profile = Object.fromEntries(
				Object.entries(form).filter(([key]) => key !== 'pictures')
			);
			const images = form.pictures as File[];
			const formData = new FormData();
			images.forEach((file) => {
				console.log(file);
				formData.append('pictures', file);  // Même clé pour tous les fichiers
			});
			fetchUpdateUserProfile(profile);
			fetchUpdateUserImages(formData);
			formStore.clearAllData();
			router.push('/profile');
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