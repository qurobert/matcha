import api from './api';

export const fetchLikeUser = async (target_user_id: string) => {
	try {
		const response = await api.post('/actions/like', {target_user_id});
		return response.data;
	} catch(error) {
	}
}

export const fetchUnLikeUser = async (target_user_id: string) => {
	try {
		const response = await api.delete('/actions/like', {
			data: {target_user_id}
		});
		return response.data;
	}
	catch (error) {
	}
}

export const fetchDislikeUser = async (target_user_id: string) => {
	try {
		const response = await api.post('/actions/dislike', {target_user_id});
		return response.data;
	} catch (error) {
	}
}

export const fetchReportUser = async (target_user_id: string) => {
	try {
		const response = await api.post('/actions/report', {target_user_id});
		return response.data;
	} catch (error) {
	}
}

export const fetchUnReportUser = async (target_user_id: string) => {
	try {
		const response = await api.delete('/actions/report?', {
			data: {target_user_id}
		});
		return response.data;
	} catch (error) {}
}

export const fetchBlockUser = async (target_user_id: string) => {
	try {
		const response = await api.post('/actions/block', {target_user_id});
		return response.data;
	} catch (error) {}
}

export const fetchUnBlockUser = async (target_user_id: string) => {
	try {
		const response = await api.delete('/actions/block', {
			data: {target_user_id}
		});
		return response.data;
	} catch (error) {}
}

export const fetchInteractions = async () => {
	try {
		const response = await api.get('/actions/me');
		return response.data;
	} catch (error) {}
}

export const fetchMatches = async () => {
	try {
		const response = await api.get('/actions/matches');
		return response.data;
	} catch (error) {}
}
export const fetchInfoTargetUser = async(target_user_id: string) => {
	try {
		const response = await api.get(`/actions/${target_user_id}`);
		return response.data;
	} catch (error) {}
}