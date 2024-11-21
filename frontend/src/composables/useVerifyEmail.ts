import { onMounted, onUnmounted, ref } from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from "@/stores/authStore";
import {emailIsVerify} from "@/services/auth";
import {fetchResendEmail} from "@/api/auth";

export const useVerifyEmail = () => {
	let intervalId : number | null = null;
	const router = useRouter();
	const authStore = useAuthStore();

	onMounted(() => {
		intervalId = setInterval(() => {
			emailIsVerify().then((isVerify: boolean) => {
				if (isVerify) {
					authStore.hasVerifiedEmail();
					intervalId ? clearInterval(intervalId) : null;
					router.push({name: 'private-profile'});
				}
			}).catch((err: any) => {
				console.error(err);
			})
		}, 5000);
	})

	onUnmounted(() => {
		intervalId ? clearInterval(intervalId) : null;
	})

	const resendMail = async () => {
		fetchResendEmail(authStore.email).then(() => {
			alert('Email sent');
		});
	}
	return {resendMail};
}