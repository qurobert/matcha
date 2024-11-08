import type {Request, Response} from "express";
import NotificationModel from "../models/notificationModel.ts";
import {NotificationType} from "../types/enumNotificationType.ts";

export default class NotificationController {
	static async getNotifications(req: Request, res: Response) {
		const user = req.user;
		if (!user) throw new Error("User not connected");
		const notifications = await NotificationModel.getNotifications(user.id)
		return res.json({
			status: 200,
			message: "Get notifications successful",
			notifications
		})
	}
	static async viewedTargetProfile(req: Request, res: Response) {
		const user = req.user;
		if (!user) throw new Error("User not connected");
		const {target_user_id} = req.body;
		const notifications = await NotificationModel.getNotifications(target_user_id);
		const alreadyViewed = notifications.findIndex((notif) => notif.target_user_id == user.id && notif.notification_type == NotificationType.viewed) !== -1
		if (alreadyViewed) {
			return res.json({
				status: 200,
				message: "already view profile"
			})
		} else {
			await NotificationModel.createNotification(target_user_id, user.id, NotificationType.viewed);
			return res.json({
				status: 200,
				message: "viewed profile"
			})

		}
	}

	static async markAllAsRead(req: Request, res: Response) {
		const user = req.user;
		if (!user) throw new Error("User not connected");
		await NotificationModel.markAllAsRead(user.id)
		return res.json({
			status: 200,
			message: "All notifications are marked as read"
		})
	}
}