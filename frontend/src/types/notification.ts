export enum NotificationType {
	like = 'like',
	unlike = 'unlike',
	viewed = 'viewed',
	message = 'message',
	match = 'match',
	unmatch = 'unmatch'
}

export interface Notification {
	id: string,
	user_id: string,
	target_user: User,
	target_user_id: string,
	notification_type: NotificationType,
	is_read: boolean
}
