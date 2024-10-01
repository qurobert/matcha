import {ref, watch} from 'vue';

// type ValidateFunction = () => Promise<{ valid: boolean; errors: Record<string, string>}>;
export const useIsValidForm = (values: any, validate: () => any ) => {
	const isValid = ref(false);
	const hasWritten = ref(false);
	watch(() => values, async () => {
		if (!hasWritten.value && Object.values(values).some(value => value && value !== ''))
			hasWritten.value = true;

		const { valid } = await validate();
		if (valid) {
			isValid.value = true;
		}
		else if (isValid.value) {
			isValid.value = false;
		}

	}, { deep: true });

	return {
		isValid,
		hasWritten
	}
}