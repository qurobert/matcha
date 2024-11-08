import type {NotificationType} from "../types/enumNotificationType.ts";
import NotificationModel from "../models/notificationModel.ts";

export async function createNotification(user_id: string, target_user_id: string, notification_type: NotificationType) {
	await NotificationModel.createNotification(user_id, target_user_id, notification_type);
	// TODO: IO SOCKET TO USER ID
}