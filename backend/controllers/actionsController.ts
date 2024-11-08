import type {Request, Response} from "express";
import ActionsModel from "../models/actionsModel.ts";
import {ActionType} from "../types/enumActionType.ts";
import {NotificationType} from "../types/enumNotificationType.ts";
import NotificationModel from "../models/notificationModel.ts";

export default class ActionsController {
	static async likeUser(req: Request, res: Response) {
		const user = req.user;
		const {target_user_id} = req.body;
		if (!user) throw new Error("Not connected")
		if (user.id == target_user_id) throw new Error("Can't have same user_id and target_user_id")
		const interactions = await ActionsModel.getInteractions(user.id);
		if (interactions.find((interaction) => interaction.user_id == user.id &&
			interaction.target_user_id == target_user_id &&
			interaction.action_type == ActionType.like
		)) {
			return res.json({
				status: 200,
				message: "Already liked"
			})
		}
		await ActionsModel.deleteInteractionIfExist(user.id, target_user_id, ActionType.dislike)
		await ActionsModel.createInteraction(user.id, target_user_id, ActionType.like)
		await NotificationModel.createNotification(target_user_id, user.id, NotificationType.like);
		const matches = await ActionsModel.getMatches(user.id);
		const is_match = matches.findIndex((match) => match.target_user_id == target_user_id);
		if (is_match !== -1) {
			await NotificationModel.createNotification(user.id, target_user_id, NotificationType.match);
			await NotificationModel.createNotification(target_user_id, user.id, NotificationType.match);
		}
		res.json({
			status: 200,
			message: "Like user"
		})
	}

	static async unLikeUser(req: Request, res: Response) {
		const user = req.user;
		const {target_user_id} = req.body;
		if (!user) throw new Error("Not connected")
		if (user.id == target_user_id) throw new Error("Can't have same user_id and target_user_id")
		await ActionsModel.deleteInteractionIfExist(user.id, target_user_id, ActionType.like)
		await NotificationModel.createNotification(target_user_id, user.id, NotificationType.unlike);
		res.json({
			status: 200,
			message: "Unlike user"
		})
	}

	static async dislikeUser(req: Request, res: Response) {
		const user = req.user;
		const {target_user_id} = req.body;
		if (!user) throw new Error("Not connected")
		if (user.id == target_user_id) throw new Error("Can't have same user_id and target_user_id")
		await ActionsModel.deleteInteractionIfExist(user.id, target_user_id, ActionType.like)
		await ActionsModel.createInteraction(user.id, target_user_id, ActionType.dislike)
		res.json({
			status: 200,
			message: "Dislike user"
		})
	}

	static async getInteractions(req: Request, res: Response) {
		const user = req.user;
		if (!user) throw new Error("Not connected")
		const interactions = await ActionsModel.getInteractions(user.id)
		const matches = await ActionsModel.getMatches(user.id);
		res.json({
			status: 200,
			message: "Get interaction successful",
			interactions: interactions.concat(matches)
		})
	}

	static async blockUser(req: Request, res: Response) {
		const user = req.user;
		const {target_user_id} = req.body;
		if (!user) throw new Error("Not connected")
		if (user.id == target_user_id) throw new Error("Can't have same user_id and target_user_id")
		await ActionsModel.createInteraction(user.id, target_user_id, ActionType.block)
		res.json({
			status: 200,
			message: "User block",
		})
	}

	static async unBlockUser(req: Request, res: Response) {
		const user = req.user;
		const {target_user_id} = req.body;
		if (!user) throw new Error("Not connected")
		if (user.id == target_user_id) throw new Error("Can't have same user_id and target_user_id")
		await ActionsModel.deleteInteractionIfExist(user.id, target_user_id, ActionType.block)
		res.json({
			status: 200,
			message: "Remove block",
		})
	}

	static async reportUser(req: Request, res: Response) {
		const user = req.user;
		const {target_user_id} = req.body;
		if (!user) throw new Error("Not connected")
		if (user.id == target_user_id) throw new Error("Can't have same user_id and target_user_id")
		await ActionsModel.createInteraction(user.id, target_user_id, ActionType.report)
		res.json({
			status: 200,
			message: "User report",
		})
	}

	static async unReportUser(req: Request, res: Response) {
		const user = req.user;
		const {target_user_id} = req.body;
		if (!user) throw new Error("Not connected")
		if (user.id == target_user_id) throw new Error("Can't have same user_id and target_user_id")
		await ActionsModel.deleteInteractionIfExist(user.id, target_user_id, ActionType.report)
		res.json({
			status: 200,
			message: "Remove report",
		})
	}

}