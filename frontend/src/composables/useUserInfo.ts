import {useUserStore} from "@/stores/userStore";
import {useToast} from "@/components/ui/toast";
import {
	fetchBlockUser,
	fetchInfoTargetUser,
	fetchReportUser,
	fetchUnBlockUser,
	fetchUnLikeUser,
	fetchUnReportUser
} from "@/api/actions";
import {reactive, watch, type Reactive, type Ref} from "vue";
import moment from "moment";
import { useAsyncState } from '@vueuse/core'

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

export const useUserInfo = (): {user: Reactive<UserWithInfo>, isLoading: Ref<Boolean>} => {
	const userStore = useUserStore();
	const user : Reactive<UserWithInfo> = reactive(userStore.getUser);
	const {state, isReady, isLoading} = useAsyncState(fetchInfoTargetUser(user.id), null);
	user.age = moment().diff(user.date_of_birth, 'years');

	user.info = [
		getGenderInfo(user),
		getLocationInfo(user),
	] as UserInfo[];
	user.actions = [] as UserAction[];

	watch(isReady, () => {
		if (!state || !state.value) return;
		const infoTargetUser = state.value;

		user.info = [
			likedInfo(infoTargetUser),
			viewedProfileInfo(infoTargetUser),
			...user.info ?? []
		].filter(isNotNull);

		user.actions = [
			unmatchInfo(user, infoTargetUser),
			unLikeInfo(user, infoTargetUser),
			reportInfo(user, infoTargetUser),
			blockInfo(user, infoTargetUser),
			...user.actions ?? []
		].filter(isNotNull)
	})

	return {
		user,
		isLoading
	};
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
		text: user.location.split(',').slice(0, 2).join(', ')
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

function clickEventUnMatchOrUnLike(user: Reactive<UserWithInfo>, actionId: 'unmatch' | 'unlike') {
	const {toast} = useToast();

	fetchUnLikeUser(user.id)
	user.actions = user.actions?.filter(action => action.id !== actionId);
	toast({
		title: actionId
	})
}

function unmatchInfo(user: Reactive<UserWithInfo>, infoTargetUser: any): UserAction | null {
	if (!infoTargetUser.is_match) return null;
	return {
		id: "unmatch",
		title: 'Unmatch',
		description: 'No longer interested ? Remove this profile from your matches',
		click: () => clickEventUnMatchOrUnLike(user, 'unmatch')
	}
}

function unLikeInfo(user: Reactive<UserWithInfo>, infoTargetUser: any): UserAction | null {
	if (!infoTargetUser.you_like || infoTargetUser.is_match) return null;

	return {
		id: "unlike",
		title: 'Unlike',
		description: 'No longer interested ? Remove this profile from your likes',
		click: () => clickEventUnMatchOrUnLike(user, 'unlike')
	}
}

function blockInfo(user: Reactive<UserWithInfo>, infoTargetUser: any): UserAction {
	const textUnblock = 'Unblock User'
	const textBlock = 'Block User'

	return {
		id: "block",
		title: infoTargetUser?.is_block ? textUnblock : textBlock,
		description: 'Block this user and prevent them from contacting you',
		click: () => toggleReportOrBlock(textBlock, textUnblock, user, 'block', fetchBlockUser, fetchUnBlockUser)
	}
}

function reportInfo(user: Reactive<UserWithInfo>, infoTargetUser: any): UserAction {
	const textUnreport = 'Unreport User'
	const textReport = 'Report User'

	return {
		id: "report",
		title: infoTargetUser?.is_report ? textUnreport : textReport,
		description: 'Report this user for inappropriate behavior',
		click: () =>  toggleReportOrBlock(textReport, textUnreport, user, 'report', fetchReportUser, fetchUnReportUser)
	}
}

function toggleReportOrBlock(textPrimary: string, textSecondary: string, user: UserWithInfo, id: 'report' | 'block', fetchPrimary: (id: string) => Promise<any>, fetchSecondary: (id: string) => Promise<any>) {
	const {toast} = useToast();
	const index = user.actions?.findIndex(action => action.id === id);
	if (index === -1 || !index || user.actions?.[index] === undefined) return
	const is_primary = user.actions[index].title === textPrimary;

	is_primary ? fetchPrimary(user.id) : fetchSecondary(user.id)
	user.actions[index].title = is_primary ? textSecondary : textPrimary;
	toast({
		title: is_primary ? textPrimary : textSecondary,
	})
}