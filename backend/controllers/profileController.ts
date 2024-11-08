import type {Request, Response} from "express";
import UserModel from "../models/userModel.ts";
import ErrorMiddleware from "../middlewares/errorMiddleware.ts";

export default class ProfileController {

	static async updateUserProfile(req: Request, res: Response) {
		if (!req.user) throw new ErrorMiddleware(404, "Auth not found");

		console.log(req.body);
		await UserModel.updateProfileOrPreferences(req.user.id, req.body);
		res.status(200).json({ message: 'Auth profile updated', user: req.body });
	}

	static async updateUserPreferences(req: Request, res: Response) {
		if (!req.user) throw new ErrorMiddleware(404, "Auth not found");

		const {
			age,
			fame_rating,
			distance,
			interests_preferences
		} = req.body;

		const preferences : Preferences = {
			age_preference_min: age?.[0],
			age_preference_max: age?.[1],
			fame_rating_preference_min: fame_rating?.[0],
			fame_rating_preference_max: fame_rating?.[1],
			distance_preference: distance?.[0],
			interests_preference: interests_preferences
		}
		await UserModel.updateProfileOrPreferences(req.user.id, preferences);
		res.status(200).json({ message: 'Auth preferences updated', user: req.body });
	}
}