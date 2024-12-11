import * as yup from 'yup';
import moment from 'moment';

export const useYup = () => {
	const emailSchema = yup.string()
	.email()
	.required("Email is required");

	const usernameSchemaNotRequired = yup.string()
	.notRequired()
	.nullable()

	const usernameSchema = yup.string()
	.required("Username is required")

	const passwordSchemaNotRequired =  yup.string()
	.notRequired()
	.nullable()
	.test('uppercase-or-empty', 'The password need contain at least one uppercase letter', function(value) {
		return value === null || value === '' || value === undefined || !!value.match(/[A-Z]/);
	})
	.test('special-char-or-empty', 'The password need contain at least one special character', function(value) {
		return value === null || value === '' || value === undefined || !!value.match(/[!@#$%^&*(),.?":{}|<>]/);
	})
	.test('min-length-or-empty', 'The password need to have at least 8 characters.', function(value) {
		return value === null || value === '' || value === undefined || value.length >= 8;
	})

	const passwordSchema = yup.string()
	.min(8, "Minimum 8 characters")
	.matches(/[A-Z]/, 'Minimum 1 uppercase letter')
	.matches(/[!@#$%^&*(),.?":{}|<>]/, 'Minimum 1 special character')
	.required("Password is required")

	const confirmPasswordNotRequiredSchema = yup.string()
	.oneOf([yup.ref('password')], 'Passwords must match')

	const confirmPasswordSchema = yup.string()
	.oneOf([yup.ref('password')], 'Passwords must match')
	.required("Confirm password is required")

	const codeSchema = yup.string()
	.length(6, "Code must be 6 characters")
	.required("Code is required")

	const minNumbersOfPictures = 1;
	const picturesSchema = yup.array().of(yup.object().shape({
		url: yup.string().nullable().notRequired(),
		file: yup.string().nullable().notRequired()
	}))
	.test(
		'at-least-one-url-or-file',
		'You must upload at least one picture',
		function (value:any[] | undefined) {
			return value && value.some(item => !!(item.url || item.file));
	})
	.required("Pictures are required");

	const interestsSchemaNotRequired = yup.array().of(yup.string()).notRequired().nullable();
	const interestsSchema = yup.array().of(yup.string()
	.required("You need to choose one of this field"))
	.min(1, "You need to choose one of this field")
	.required("You need to choose one of this field")

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
	.max(new Date(2007, 0, 0), "You need to have at leat 18 years old");

	return {
		emailSchema,
		usernameSchemaNotRequired,
		usernameSchema,
		interestsSchemaNotRequired,
		interestsSchema,
		picturesSchema,
		passwordSchema,
		passwordSchemaNotRequired,
		confirmPasswordSchema,
		confirmPasswordNotRequiredSchema,
		codeSchema,
		dateSchema
	}
}

