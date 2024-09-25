import type {Request, Response} from "express";
import UserModel from "../models/userModel.ts";
import ErrorMiddleware from "../middlewares/errorMiddleware.ts";

export default class ProfileController {

	static async updateUserProfile(req: Request, res: Response) {
		if (!req.user) throw new ErrorMiddleware(404, "User not found");

		// const { firstname, last_name, date_of_birth, gender, interested_in, biography, location_lat, location_lng, interests, pictures } = req.body;
		console.log(req.body);
		await UserModel.updateProfile(req.user.id, req.body);
		res.status(200).json({ message: 'User profile updated', user: req.body });
	}
}