import api from './api';

export const fetchLikeUser = async (target_user_id: string) => {
	const response = await api.post('/actions/like', {target_user_id});
	return response.data;
}

export const fetchUnLikeUser = async (target_user_id: string) => {
	const response = await api.delete('/actions/like', {
		data: {target_user_id}
	});
	return response.data;
}

export const fetchDislikeUser = async (target_user_id: string) => {
	const response = await api.post('/actions/dislike', {target_user_id});
	return response.data;
}

export const fetchReportUser = async (target_user_id: string) => {
	const response = await api.post('/actions/report', {target_user_id});
	return response.data;
}

export const fetchUnReportUser = async (target_user_id: string) => {
	const response = await api.delete('/actions/report?', {
		data: {target_user_id}
	});
	return response.data;
}

export const fetchBlockUser = async (target_user_id: string) => {
	const response = await api.post('/actions/block', {target_user_id});
	return response.data;
}

export const fetchUnBlockUser = async (target_user_id: string) => {
	const response = await api.delete('/actions/block', {
		data: {target_user_id}
	});
	return response.data;
}

export const fetchInteractions = async () => {
	const response = await api.post('/actions/me');
	return response.data;
}

export const fetchTargetInteractions = async (target_user_id: string) => {
	const response = await api.get('/actions/' + target_user_id);
	return response.data;
}
