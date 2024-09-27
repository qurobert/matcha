import * as yup from "yup";
import {useYup} from "@/composables/useYup";
import {useForm} from 'vee-validate';
import {fetchMe} from "@/api/auth";
import {useAuthStore} from "@/stores/userStore";
import {useIsValidForm} from "@/composables/useIsValidForm";

export const useEditProfile = () => {
	const {picturesSchema, interestsSchema, usernameSchema, dateSchema} = useYup();
	const schema = yup.object({
		pictures: picturesSchema,
		biography: yup.string().required(),
		interests: interestsSchema,
		first_name: usernameSchema,
		last_name: usernameSchema,
		location: yup.object().shape({
			lat: yup.number(),
			lng: yup.number(),
		}),
		date: dateSchema,
		gender: yup.string().required("You need to choose one of this field"),
		interested_in: yup.string().required("You need to choose one of this field"),
	})

	const userStore = useAuthStore();

	const initialValues = {
		pictures: userStore.user.pictures,
		biography: userStore.user.biography,
		interests: userStore.user.interests,
		first_name: userStore.user.first_name,
		last_name: userStore.user.last_name,
		location: {
			lat: userStore.user.location_lat,
			lng: userStore.user.location_lng,
		},
		date: userStore.user.date_of_birth,
	}

	const {handleSubmit, validate, values, errors, setFieldValue} = useForm({
		validationSchema: schema,
		initialValues
	})

	const {isValid, hasWritten} = useIsValidForm(values, validate);

	const onSubmit = handleSubmit(async (values) => {
			console.log("on_submit")
	})

	return {
		isValid,
		initialValues,
		hasWritten,
		setFieldValue,
		onSubmit,
		validate,
		values,
		errors
	}
}
