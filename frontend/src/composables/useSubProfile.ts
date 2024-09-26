import * as yup from "yup";
import {useYup} from "@/composables/useYup";
import {useForm} from 'vee-validate';
import {ref} from "vue";
import {useAuthStore} from "@/stores/userStore";
import {fetchUpdateUser} from "@/api/user";
import {useToast} from "@/components/ui/toast";
import {useRouter} from "vue-router";

export const useSettings = () => {
	const { usernameSchemaNotRequired, passwordSchemaNotRequired, confirmPasswordNotRequiredSchema} = useYup();

	const schema = yup.object({
		username: usernameSchemaNotRequired,
		email: yup.string().email(),
		password: passwordSchemaNotRequired,
		confirm_password: yup.string()
			.test('passwords-match', 'Les mots de passe ne correspondent pas', function(value) {
				return this.parent.password === value
			})
	})
	.test('at-least-at-least-one-field', 'At least one field (username, password or email) need to be fill', function (value) {
		return !!value.password || !!value.email || !!value.username;
	});


	const {handleSubmit, validate, values, errors} = useForm({
		validationSchema: schema
	})
	const errorOnSubmit = ref("");

	const router = useRouter();
	const onSubmit = handleSubmit(async (values) => {
		const { toast } = useToast()

		const {email, password, username} = values;
		const user = useAuthStore();
		try {
			console.log("TRY");
			await fetchUpdateUser(email, username, password)
			if (username) {
				user.updateUsername(username);
			}
			if (email) {
				console.log("EMAIL: ", email);
				toast({
					title: 'An email has been sent to verify your email (You need to verify your email before go back to the app)',
				})
				user.updateEmail(email);
				router.push({name: 'verify-email'});
			} else {
				toast({
					title: 'Your settings have been updated',
				})
				console.log("redirect to profile");
				router.push({name: 'private-profile'});
			}
		}
		catch (e) {
			toast({
				title: 'An error occurred',
				variant: 'destructive',
			})
		}

	});

	return {
		onSubmit,
		errorOnSubmit,
		validate,
		values,
		errors
	}
}