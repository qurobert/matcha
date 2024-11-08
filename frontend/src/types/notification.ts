export enum NotificationType {
	like = 'like',
	unlik = 'unlike',
	viewed = 'viewed',
	message = 'message',
	match = 'match'
}

export interface Notification {
	id: string,
	user_id: string,
	target_user_id: string,
	notification_type: NotificationType,
	is_read: boolean
}
