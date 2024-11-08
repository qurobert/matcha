import type {Request, Response} from "express";
import NotificationModel from "../models/notificationModel.ts";

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