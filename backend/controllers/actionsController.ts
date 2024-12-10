import type {Request, Response} from "express";
import ActionsModel from "../models/actionsModel.ts";
import {ActionType} from "../types/enumActionType.ts";
import {NotificationType} from "../types/enumNotificationType.ts";
import NotificationModel from "../models/notificationModel.ts";
import UserModel from "../models/userModel.ts";
import UserController from "./userController.ts";

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
		const matches = await ActionsModel.getMatches(user.id);
		const is_match = matches.findIndex((match) => match.target_user_id == target_user_id);
		if (is_match !== -1) {
			await NotificationModel.createNotification(target_user_id, user.id, NotificationType.unmatch);
		}
		await ActionsModel.deleteInteractionIfExist(user.id, target_user_id, ActionType.like)
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

	static async getMatches(req: Request, res: Response) {
		const user = req.user;
		if (!user) throw new Error("Not connected")
		const matches = await ActionsModel.getMatches(user.id);
		const final_matches = [];
		for (let i = 0; i < matches.length; i++) {
			const user	= await UserModel.findById(matches[i].target_user_id);
			final_matches.push({
				...matches[i],
				user,
			});
		}
		res.json({
			status: 200,
			message: "Get matches",
			matches: final_matches
		})
	}

	static async getInteractionsMe(req: Request, res: Response) {
		const user = req.user;
		if (!user) throw new Error("Not connected")
		const interactions = (await ActionsModel.getAllTargetInteractionsByTargetUserId(user.id)).map((interaction) => ({
				...interaction,
				user_id: interaction.target_user_id,
				target_user_id: interaction.user_id,
			}));
		const viewNotifications = (await NotificationModel.getNotifications(user.id))
		.filter((notification) => notification.notification_type === NotificationType.viewed)
			.map((notification) => ({
				...notification,
				action_type: notification.notification_type,
			}))
		const matches = await ActionsModel.getMatches(user.id);
		const finalInteractions = [
			...viewNotifications,
			...interactions,
			...matches
		];
		for (let i = 0; i < finalInteractions.length; i++) {
			const user	= await UserModel.findById(finalInteractions[i].target_user_id);
			finalInteractions[i].user = await UserController._responseUser(user);
		}
		res.json({
			status: 200,
			message: "Get interaction successful",
			interactions: finalInteractions
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

	static async infoTargetUser(req: Request, res: Response) {
		const user = req.user;
		const {target_user_id} = req.params;
		if (!user) throw new Error("Not connected")
		if (user.id == target_user_id) throw new Error("Can't have same user_id and target_user_id")
		const interactions = await ActionsModel.getInteractions(user.id);
		const notifications = await NotificationModel.getNotifications(target_user_id);

		const likeYou = interactions.findIndex((interaction) =>
			interaction.user_id == target_user_id
			&& interaction.target_user_id == user.id
			&& interaction.action_type == ActionType.like
		);
		const youLike = interactions.findIndex((interaction) =>
			interaction.user_id == user.id
			&& interaction.target_user_id == target_user_id
			&& interaction.action_type == ActionType.like
		);
		const viewYou = notifications.findIndex((notification) =>
			notification.user_id == user.id
			&& notification.target_user_id == target_user_id
			&& notification.notification_type == NotificationType.viewed
		);
		const youView = notifications.findIndex((notification) =>
			notification.user_id == target_user_id
			&& notification.target_user_id == user.id
			&& notification.notification_type == NotificationType.viewed);
		res.json({
			status: 200,
			message: "Check info target user",
			is_match: likeYou !== -1 && youLike !== -1,
			like_you: likeYou !== -1,
			you_like: youLike !== -1,
			view_you: viewYou !== -1,
			you_view: youView !== -1,
			is_block: ActionsController._hasActionType(interactions, user.id, target_user_id, ActionType.block),
			is_report: ActionsController._hasActionType(interactions, user.id, target_user_id, ActionType.report),
		})
	}

	static _hasActionType(interactions: any[], user_id: string, target_user_id: string, action_type: ActionType) {
		return interactions.findIndex((interaction) =>
				interaction.user_id == user_id
			&& interaction.target_user_id == target_user_id
			&& interaction.action_type == action_type)
			!== -1;
	}
}