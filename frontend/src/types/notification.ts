export enum NotificationType {
	like = 'like',
	unlike = 'unlike',
	viewed = 'viewed',
	message = 'message',
	match = 'match'
}

export interface Notification {
	id: string,
	user_id: string,
	target_user: Auth,
	target_user_id: string,
	notification_type: NotificationType,
	is_read: boolean
}
