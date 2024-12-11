import {defineStore} from "pinia";
import { computed, onMounted, ref, type Ref } from 'vue'
import {fetchBrowse} from "@/api/browse";
import { useAsyncState } from '@vueuse/core'

export const useUserTargetStore = defineStore('targetUser', () => {
    const users = ref([] as User[]);
    const isLoading = ref(false);
    const activeUserIndex = ref(0);
    const activeUser = computed(() => users.value[activeUserIndex.value]);
    const fetchNewUsers = () => {
        isLoading.value = true;
        const {state, isLoading: loading} = useAsyncState(fetchBrowse(), [],
            {
                immediate: true,
                onSuccess(data) {
                    users.value = data.users;
                    activeUserIndex.value = 0;
                    isLoading.value = false;
                },
                onError(e) {
                    isLoading.value = false;
                },
            },
        );
        return state;
    };
    const incrementActiveUserIndex =  () =>  {
        activeUserIndex.value += 1;
    };
    const goToNextUser =  () => {
        if (activeUserIndex.value + 1 > users.value.length - 1) {
            fetchNewUsers()
        } else {
            incrementActiveUserIndex();
        }
    };
    const reset = () => {
        users.value = [];
        isLoading.value = false
        activeUserIndex.value = 0;
    };
    return {
        users,
        isLoading,
        activeUser,
        fetchNewUsers,
        activeUserIndex,
        goToNextUser,
        reset
    }
});