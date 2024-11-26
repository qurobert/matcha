import { useAsyncState } from "@vueuse/core";
import {ref} from "vue";
import {fetchMatches} from "@/api/actions";
import {useRouter} from "vue-router";
import {useToast} from "@/components/ui/toast";

export const useHomeChat = () => {
	const users = ref([] as User[]);
	const isLoading = ref(true);
	const router = useRouter();

	useAsyncState(fetchMatches(), [], {
		immediate: true,
		onSuccess(data) {
			users.value = data.matches?.map((match: any) => match.user);
			isLoading.value = false;
		},
		onError(e) {
			console.log(e);
			const {toast} = useToast();
			toast({
				title: "An error occurred while fetching users",
				variant: "destructive",
			});
			router.push({name: 'home'});
			isLoading.value = false;
		},
	});

	return {
		users,
		isLoading
	}
}