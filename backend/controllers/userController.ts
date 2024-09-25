import UserModel from "../models/userModel.ts";
import ErrorMiddleware from "../middlewares/errorMiddleware.ts";
import {sendMail} from "../mail/sendMail.ts";
import {generateVerificationCode} from "../helpers/generateVerificationCode.ts";
import type {NextFunction, Request, Response} from "express";
import {JWTAccessToken} from "../helpers/jwt.ts";

export default class UserController {
	static async getUserConnected (req: Request, res: Response) {
		if (!req.user) throw new ErrorMiddleware(404, "User not found");
		const {email} = req.user;
		const user = await UserModel.findOneByEmail(email);
		if (!user) throw new ErrorMiddleware(404, "User not found");

		return res.json({
			status: 200,
			message: "User connected",
			user: UserController._responseUser(user),
		});
	}

	static async verifyTokenAsync(token: string): Promise<PayloadAccessToken> {
		return new Promise((resolve, reject) => {
			JWTAccessToken.verify(token, (err, decoded) => {
				if (err) {
					return reject(err);
				}
				resolve(decoded);
			});
		});
	}

	static async userStatus (req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (token == null) {
			return res.json({
				connected: false,
			});
		}
		try {
			const user = await UserController.verifyTokenAsync(token);

			const userDb = await UserModel.findOneByEmail(user.email);
			return res.json({
				connected: true,
				user: UserController._responseUser(userDb),
			});

		} catch(err) {
			return res.json({
				connected: false,
				token_expired: true,
			});
		}
	}

	static async getUserById (req: Request, res: Response) {
		const {id} = req.params;
		const user = await UserModel.findById(id);
		if (!user) throw new ErrorMiddleware(404, "User not found");

		return res.status(200).json({
			status: 200,
			message: "User found",
			user: UserController._responseUser(user),
		});
	}

	static async forgotPassword(req: Request, res: Response) {
		const {email} = req.body;
		const code = generateVerificationCode(6);
		await sendMail(email, "Reset your password - Matcha", "<p>Code verification: " + code + "</p>");
		await UserModel.updatePasswordCode(email, code);
		res.json({
			status: 200,
			message: "Email sent",
		});
	}

	static async resetPassword(req: Request, res: Response) {
		const {email, code, password} = req.body;
		const user = await UserModel.findOneByEmail(email);
		if (user.code_password_reset !== code) throw new ErrorMiddleware(400, "Code verification is not valid");
		await UserModel.updatePassword(email, password);
		res.json({
			status: 200,
			message: "Password reset",
		});
	}

	static async updateUser(req: Request, res: Response) {
		if (!req.user) throw new ErrorMiddleware(404, "User not found");
		const { email, username, password, confirm_password, notification } = req.body;
		await UserModel.updateEmail(req.user.id, email);
		await UserModel.updateUsername(req.user.id, username);
		await UserModel.updateNotification(req.user.id, notification);
		if (password !== confirm_password) throw new ErrorMiddleware(400, "Passwords do not match");
			await UserModel.updatePassword(req.user.email, password);
		res.json({
			status: 200,
			message: "User updated",
		});
	}

	static _responseUser(user: User) {
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			verify_email: user.verify_email,
			create_profile: false,
		};
	}
}