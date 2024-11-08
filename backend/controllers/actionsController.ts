import type {Request, Response} from "express";
import ActionsModel from "../models/actionsModel.ts";
import {ActionType} from "../types/enumActionType.ts";
import {createNotification} from "../helpers/createNotification.ts";
import {NotificationType} from "../types/enumNotificationType.ts";

export default class ActionsController {
	static async likeUser(req: Request, res: Response) {
		const user = req.user;
		const {target_user_id} = req.body;
		if (!user) throw new Error("Not connected")
		if (user.id == target_user_id) throw new Error("Can't have same user_id and target_user_id")
		await ActionsModel.deleteInteractionIfExist(user.id, target_user_id, ActionType.dislike)
		await ActionsModel.createInteraction(user.id, target_user_id, ActionType.like)
		await createNotification(target_user_id, user.id, NotificationType.like)
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

		res.json({
			status: 200,
			message: "Get interaction successful",
			interactions
		})
	}

	static async getTargetInteractions(req: Request, res: Response) {
		const user = req.user;
		const {target_user_id} = req.params;
		if (!user) throw new Error("Not connected")
		console.log(target_user_id)
		if (user.id == target_user_id) throw new Error("Can't have same user_id and target_user_id")
		const interactions = await ActionsModel.getTargetInteraction(user.id, target_user_id);
		res.json({
			status: 200,
			message: "Get interaction successful",
			interactions
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