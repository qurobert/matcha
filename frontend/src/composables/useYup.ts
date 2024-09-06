import * as yup from 'yup';
export const useYup = () => {
	const emailSchema = yup.string()
	.email()
	.required("Email is required");

	const usernameSchema = yup.string()
	.min(6, "Minimum 6 characters")
	.max(15, "Maximum 15 characters")
	.required("Username is required")

	const passwordSchema = yup.string()
	.min(8, "Minimum 8 characters")
	.matches(/[A-Z]/, 'Minimum 1 uppercase letter')
	.matches(/[!@#$%^&*(),.?":{}|<>]/, 'Minimum 1 special character')
	.required("Password is required")

	const confirmPasswordSchema = yup.string()
	.oneOf([yup.ref('password')], 'Passwords must match')
	.required("Password confirmation is required")

	const codeSchema = yup.string()
	.length(6, "Code must be 6 characters")
	.required("Code is required")

	return {
		emailSchema,
		usernameSchema,
		passwordSchema,
		confirmPasswordSchema,
		codeSchema
	}
}

