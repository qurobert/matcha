import * as yup from "yup";
import {useYup} from "@/composables/useYup";
import {useForm} from 'vee-validate';
import {useIsValidForm} from "@/composables/useIsValidForm";
import _ from 'lodash'
import {useToast} from "@/components/ui/toast";

export const usePreferences = () => {
	const {interestsSchema } = useYup();
	const schema = yup.object({
		age: yup.number().required(),
		fame_rating: yup.number().required(),
		distance: yup.number().required(),
		interestsPreferences: interestsSchema
	})

	const initialValues = {
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
			console.log("submit Preferences");

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
