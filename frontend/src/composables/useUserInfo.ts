import {useUserTargetStore} from "@/stores/userTargetStore";
import {useToast} from "@/components/ui/toast";
import {
	fetchBlockUser,
	fetchInfoTargetUser,
	fetchReportUser,
	fetchUnBlockUser,
	fetchUnLikeUser,
	fetchUnReportUser
} from "@/api/actions";
import { type Ref, ref } from 'vue'
import moment from "moment";
import { useAsyncState } from '@vueuse/core'
import { fetchUserById } from '@/api/user'
import { fetchViewedProfile } from '@/api/notifications'
import {type RouteParamValue, useRouter} from 'vue-router'
import {useAuthStore} from "@/stores/authStore";

export interface UserAction {
	id: string,
	title: string,
	description: string,
	click: () => void
}

export interface UserInfo {
	icon: string,
	text: string,
	color?: string
}

export interface UserWithInfo extends User {
	info?: UserInfo[];
	actions?: UserAction[];
	age: number;
}

function isNotNull<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}

export const useUserInfo = (id: string | RouteParamValue[]) => {
	const targetStore = useUserTargetStore();
	const user = ref({} as UserWithInfo);
	const isLoading = ref(false);
	const router = useRouter();
	const authStore = useAuthStore();
	const fromHomePage = ref(false);
	if (id == authStore.user.id) {
		router.push({ name: 'private-profile'});
	}

	if (!targetStore.activeUser) {
		isLoading.value = true;
		useAsyncState(fetchUserById(id as string), null, {
			immediate: true,
			onSuccess(data) {
				const userData = data.user;
				fetchUserInfo(userData, user, isLoading);
			},
			onError() {
				router.push({ name: 'home' });
				isLoading.value = false;
			},
		});
	} else {
		fromHomePage.value = true;
		fetchUserInfo(targetStore.activeUser, user, isLoading);
	}

	return {
		user,
		isLoading,
		fromHomePage
	};
}

function fetchUserInfo(activeUser: User, user: Ref<UserWithInfo>, isLoading : Ref<Boolean>) {
	useAsyncState(fetchInfoTargetUser(activeUser.id), null, {
		immediate: true,
		onSuccess(data) {
			const infoTargetUser = data;
			user.value = {
				age: moment().diff(activeUser.date_of_birth, 'years'),
				info : [
					likedInfo(infoTargetUser),
					viewedProfileInfo(infoTargetUser),
					getGenderInfo(activeUser),
					getLocationInfo(activeUser),
				].filter(isNotNull) as UserInfo[],
				actions: [
					unmatchInfo(user, infoTargetUser) ,
					unLikeInfo(user, infoTargetUser),
					reportInfo(user, infoTargetUser),
					blockInfo(user, infoTargetUser),
				].filter(isNotNull) as UserAction[],
				...activeUser,
			};
			isLoading.value = false;
			fetchViewedProfile(user.value.id);
		},
		onError(e) {
			isLoading.value = false;
		},
	});

}

function getGenderInfo(user: User) {
	return {
		icon: "venus-mars",
		text: getJeSuis(user) + ' ' + user.gender
	}
}

function getLocationInfo(user: User) {
	return {
		icon: "location-dot",
		text: user?.location?.split(',')?.slice(0, 2).join(', ') || 'Location not found',
	}
}

function getJeSuis(user: User) {
	if (user.interested_in === 'both')
		return 'Bisexual'
	else if (user.interested_in == user.gender)
		return 'Gay'
	else
		return 'Straight'
}

function viewedProfileInfo(infoTargetUser: any): UserInfo | null {
	if (!infoTargetUser.view_you) return null;

	return {
		icon: "eye",
		text: "Viewed your profile",
		color: "text-accent"
	}
}

function likedInfo(infoTargetUser: any): UserInfo | null {
	if (!infoTargetUser.like_you) return null;
	return {
		icon: "heart",
		text: "Liked you",
		color: "text-accent"
	}
}

function clickEventUnMatchOrUnLike(user: Ref<UserWithInfo | null>, actionId: 'unmatch' | 'unlike') {
	const {toast} = useToast();

	if (!user.value) return;
	fetchUnLikeUser(user.value.id)
	user.value.actions = user.value.actions?.filter(action => action.id !== actionId);
	toast({
		title: actionId
	})
}

function unmatchInfo(user: Ref<UserWithInfo | null>, infoTargetUser: any): UserAction | null {
	if (!infoTargetUser.is_match) return null;
	return {
		id: "unmatch",
		title: 'Unmatch',
		description: 'No longer interested ? Remove this profile from your matches',
		click: () => clickEventUnMatchOrUnLike(user, 'unmatch')
	}
}

function unLikeInfo(user: Ref<UserWithInfo | null>, infoTargetUser: any): UserAction | null {
	if (!infoTargetUser.you_like || infoTargetUser.is_match) return null;

	return {
		id: "unlike",
		title: 'Unlike',
		description: 'No longer interested ? Remove this profile from your likes',
		click: () => clickEventUnMatchOrUnLike(user, 'unlike')
	}
}

function blockInfo(user: Ref<UserWithInfo | null>, infoTargetUser: any): UserAction {
	const textUnblock = 'Unblock User'
	const textBlock = 'Block User'

	return {
		id: "block",
		title: infoTargetUser?.is_block ? textUnblock : textBlock,
		description: 'Block this user and prevent them from contacting you',
		click: () => toggleReportOrBlock(textBlock, textUnblock, user, 'block', fetchBlockUser, fetchUnBlockUser)
	}
}

function reportInfo(user: Ref<UserWithInfo | null>, infoTargetUser: any): UserAction {
	const textUnreport = 'Unreport User'
	const textReport = 'Report User'

	return {
		id: "report",
		title: infoTargetUser?.is_report ? textUnreport : textReport,
		description: 'Report this user for inappropriate behavior',
		click: () =>  toggleReportOrBlock(textReport, textUnreport, user, 'report', fetchReportUser, fetchUnReportUser)
	}
}

function toggleReportOrBlock(textPrimary: string, textSecondary: string, user: Ref<UserWithInfo | null>, id: 'report' | 'block', fetchPrimary: (id: string) => Promise<any>, fetchSecondary: (id: string) => Promise<any>) {
	const {toast} = useToast();
	const index = user?.value?.actions?.findIndex(action => action.id === id);
	if (index === -1 || index === undefined || index === null || user?.value?.actions?.[index] === undefined) return
	const is_primary = user?.value?.actions[index].title === textPrimary;

	is_primary ? fetchPrimary(user?.value?.id) : fetchSecondary(user?.value?.id)
	user.value.actions[index].title = is_primary ? textSecondary : textPrimary;
	toast({
		title: is_primary ? textPrimary : textSecondary,
	})
}