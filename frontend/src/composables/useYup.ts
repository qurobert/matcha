import * as yup from 'yup';
import moment from 'moment';

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
	.required("Confirm password is required")

	const codeSchema = yup.string()
	.length(6, "Code must be 6 characters")
	.required("Code is required")

	// Schéma Yup pour valider une date avec moment.js
	const dateSchema = yup
	.date()
	.transform(function (value, originalValue) {
		// Vérifier si la valeur est déjà une date valide
		if (this.isType(value)) {
			return value;
		}

		// Utiliser moment.js pour transformer la chaîne au format DD/MM/YYYY
		const result = moment(originalValue, "DD/MM/YYYY", true); // true pour stricte validation du format

		// Retourner la date si elle est valide, sinon retourner une date invalide
		return result.isValid() ? result.toDate() : new Date('');
	})
	.typeError("Veuillez entrer une date valide au format DD/MM/YYYY")
	.required("La date est obligatoire")
	.min(new Date(1900, 0, 0), "La date est trop ancienne");

	return {
		emailSchema,
		usernameSchema,
		passwordSchema,
		confirmPasswordSchema,
		codeSchema,
		dateSchema
	}
}

