import {useYup} from "@/composables/useYup";
import {useInterestCreateProfile} from "@/composables/useCreateProfile";
import * as yup from 'yup';


export const useFields = () => {
	return
}
// export const useInterest = () => {
// 	const {interestsSchema} = useYup();
// 	const interestSchema = yup.object().shape({
// 		interests: interestsSchema,
// 	})

	// const {onSubmit} = useInterestCreateProfile(interestSchema);

	// const allFields = useFields();

	// function onInterestClick(interest: string) {
	// 	if (!values.interests) {
	// 		setFieldValue('interests', [interest]);
	// 		return;
	// 	}
	// 	const index = values.interests.findIndex((interestLoop: any) => interestLoop === interest);
	// 	if (index === -1) {
	// 		setFieldValue('interests', [...values.interests, interest]);
	// 	} else {
	// 		setFieldValue('interests', values.interests.filter((_: any, i: number) => i !== index));
	// 	}
	// }
	// return {
		// onSubmit,
		// allFields,
	// }
// }