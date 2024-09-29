import type {Request, Response} from "express";
import ErrorMiddleware from "../middlewares/errorMiddleware.ts";
import UserModel from "../models/userModel.ts";
import fs from "fs";
import path from "node:path";

export default class ImageController {
	static async updateUserImage(req: Request, res: Response) {
		if (!req.user) throw new ErrorMiddleware(404, "User not found");
		// @ts-ignore
		if (!req?.files?.pictures || req.files.pictures.length === 0) throw new ErrorMiddleware(500, "You need to upload at least 1 image");

		// DELETE OLD PICTURES
		try {
			const pictures = await UserModel.getPictures(req.user.id);
			if (pictures)
				for (const picture of pictures) {
					fs.unlinkSync(path.join(__dirname, '..', 'uploads', picture));
				}
		} catch (e) {

		}

		// SAVE NEW PICTURES
		// @ts-ignore
		await UserModel.updatePictures(req.user.id, req.files.pictures.map((file: any) => file.filename));
		res.status(200).json({status: 200, message: 'User profile image updated'});
	}

	static async getUserImage(req: Request, res: Response) {
		if (!req.user) throw new ErrorMiddleware(404, "User not found");
		const pictures = await UserModel.getPictures(req.user.id);
		if (!pictures) throw new ErrorMiddleware(404, "User doesn't have image");
		res.status(200).json({status: 200, message: 'User profile image found', pictures});
	}

	static async deleteUserImage(req: Request, res: Response) {
		if (!req.user) throw new ErrorMiddleware(404, "User not found");

		const pictures = await UserModel.getPictures(req.user.id);
		if (pictures)
			for (const picture of pictures) {
				try {
					fs.unlinkSync(path.join(__dirname, '..', 'uploads', picture));
				} catch (e) {

				}
			}
		await UserModel.updatePictures(req.user.id, null);

		res.status(200).json({status: 200, message: 'User profile image deleted'});
	}
}