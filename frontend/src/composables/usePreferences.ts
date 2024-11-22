import * as yup from "yup";
import {useYup} from "@/composables/useYup";
import {useForm} from 'vee-validate';
import {useIsValidForm} from "@/composables/useIsValidForm";
import _ from 'lodash'
import {useToast} from "@/components/ui/toast";
import {useAuthStore} from "@/stores/authStore";
import {fetchUpdateUserPreferences} from "@/api/user";

export const usePreferences = () => {
	const {interestsSchemaNotRequired } = useYup();
	const userStore = useAuthStore();
	const tupleNumberSchema = yup.array()
	.of(
		yup.mixed().test((value, context) => {
			const index = context.path.split('[')[1]?.split(']')[0];
			if (index === '0') {
				return yup.number().isValidSync(value);
			} else if (index === '1') {
				return yup.number().isValidSync(value);
			}
			return false;
		})
	)
	.length(2);
	const schema = yup.object({
		age: tupleNumberSchema,
		fame_rating: tupleNumberSchema,
		distance: yup.number().required(),
		interests_preferences: interestsSchemaNotRequired
	})

	const initialValues = {
		age: userStore.user?.preferences?.age,
		fame_rating: userStore.user?.preferences?.fame_rating,
		distance: [userStore.user?.preferences?.distance],
		interests_preferences: userStore.user?.preferences?.interests
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

			await fetchUpdateUserPreferences(modifiedValues as Preferences);
			hasWritten.value = false;
			toast({
				title: 'Your preferences has been updated',
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
