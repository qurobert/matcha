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
		formStore.setFormValues(values);
		formStore.incrementPageIndex();

		// Try to submit
		const index = formStore.getPageIndex();
		const maxPage = formStore.getMaxPage();
		if (index > maxPage) {
			const form = formStore.getForm();
			submitProfile(form)
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

async function urlToFile(url: string, filename : string) {
	// Utilisation de fetch pour télécharger le fichier
	const response = await fetch(url);

	// Vérifier que la requête a réussi
	if (!response.ok) {
		throw new Error('Échec du téléchargement du fichier');
	}

	// Récupérer le contenu sous forme de Blob
	const blob = await response.blob();

	// Créer un objet File à partir du Blob
	return new File([blob], filename, { type: blob.type });
}

export const submitProfile = async (form: Record<string, any>) => {
	const formattedLocation = form.location ? {
		location_lat: form.location.lat,
		location_lng: form.location.lng
	} : {};
	const profile = {
		...Object.fromEntries(Object.entries(form).filter(([key]) => key !== 'pictures' && key !== 'location')),
		...formattedLocation
	};
	const images = form.pictures as PicturesTypes[];
	if (profile)
		await fetchUpdateUserProfile(profile);
	if (images) {
		const filesImages: File[] = []
		for (const image of images) {
			if (image.file)
				filesImages.push(image.file);
			else if (image.url)
				filesImages.push(await urlToFile('http://localhost:3000/uploads/' + image.url, image.url));
		}
		await fetchUpdateUserImages(filesImages);
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