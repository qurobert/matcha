import * as yup from "yup";
import {useYup} from "@/composables/useYup";
import {useForm} from 'vee-validate';
import {useAuthStore} from "@/stores/userStore";
import {useIsValidForm} from "@/composables/useIsValidForm";
import _ from 'lodash'
import {submitProfile} from "@/composables/useCreateProfile";
import {useToast} from "@/components/ui/toast";
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
		date_of_birth: dateSchema,
		gender: yup.string().required("You need to choose one of this field"),
		interested_in: yup.string().required("You need to choose one of this field"),
	})

	const userStore = useAuthStore();
	const initialValues = {
		pictures: userStore.user.pictures?.map(picture => ({url: picture, file: null})),
		biography: userStore.user.biography,
		interests: userStore.user.interests,
		first_name: userStore.user.first_name,
		last_name: userStore.user.last_name,
		location: {
			lat: userStore.user.location_lat,
			lng: userStore.user.location_lng,
		},
		date_of_birth: userStore.user.date_of_birth,
		gender: userStore.user.gender,
		interested_in: userStore.user.interested_in
	}

	const {handleSubmit, validate, values, errors} = useForm({
		validationSchema: schema,
		initialValues
	})

	const {isValid, hasWritten } = useIsValidForm(values, validate);

	const getModifiedFields = (initialValues: any, formValues: any) => {
		const modifiedFields: Record<string, any> = {};
		for (const key in formValues)
			if (!_.isEqual(formValues[key], initialValues[key]))
				modifiedFields[key] = formValues[key];
		return modifiedFields;
	};

	const onSubmit = handleSubmit(async (values) => {
		const {toast} = useToast();
		try {
			const modifiedValues = getModifiedFields(initialValues, values);
			if (_.isEmpty(modifiedValues))
				return;

			// @ts-ignore
			await submitProfile(modifiedValues);

			hasWritten.value = false;
			toast({
				title: 'Your profile has been updated',
			})

		} catch (e) {
			toast({
				title: 'An error occurred',
				variant: 'destructive',
			})
		}
	})

	return {
		isValid,
		initialValues,
		hasWritten,
		onSubmit,
		validate,
		errors
	}
}
