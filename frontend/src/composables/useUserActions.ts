import {fetchInteractions} from "@/api/actions";
import { useAsyncState } from '@vueuse/core'
import {ref, type Ref} from "vue"

export interface InteractionsWithUser {
	user_id: string,
	target_user_id: string,
	action_type: "viewed" | "like" | "match"
	user: User,
}

export const useUserActions = ()  => {
	const interactions : Ref<InteractionsWithUser[]> = ref([]);
	const isLoading: Ref<boolean> = ref(true);

	useAsyncState(fetchInteractions, [], {
		immediate: true,
		onSuccess: (data) => {
			isLoading.value = false;
			interactions.value = data.interactions
		},
		onError: (error) => {
			isLoading.value = false;
		}
	})

	return {
		interactions,
		isLoading
	}
}