import UserModel from "../models/userModel.ts";
import {JWTAccessToken, JWTRefreshToken} from "../helpers/jwt.ts";
import ErrorMiddleware from "../middlewares/errorMiddleware.ts";
import {sendMail} from "../mail/sendMail.ts";
import type {Request, Response} from "express";
import UserController from "./userController.ts";

export default class AuthController {
    static async register(req: Request, res: Response) {
        const {email, password, username} = req.body;
        await AuthController._checkUserExist(email);

        const user = await UserModel.create(email, username, password);
        if (!user) throw new Error("Auth not created");

        await AuthController.sendEmailLink(email);
        return res.json({
            status: 200,
            message: "Auth created successfully",
            user: await UserController._responseUser(user),
            access_token: JWTAccessToken.sign({
                email,
                id: user.id,
            }),
            refresh_token: JWTRefreshToken.sign({
                id: user.id
            }),
        });
    }


    static async login(req: Request, res: Response) {
        const {username, password} = req.body;
        const user = await UserModel.login(username, password);

        if (!user) throw new ErrorMiddleware(400, "Auth not found");
        return res.json({
            status: 200,
            message: "Auth logged in successfully",
            user: await UserController._responseUser(user),
            access_token: JWTAccessToken.sign({email: user.email, id: user.id}),
            refresh_token: JWTRefreshToken.sign({id: user.id}),
        });
    }

    static async verifyEmail(req: Request, res: Response) {
        const {token} = req.query;
        JWTAccessToken.verify(token, async (err, emailTokenInfo) => {
            if (err) return res.status(403).send("The link is invalid or has expired. Please request a new one");

            const user = await UserModel.findById(emailTokenInfo.id);
            if (!user) return res.status(403).send("Error refresh token");
            await UserModel.validate_email(user.email);
            return res.redirect('http://localhost:8080/mail-verify-email');
        })
    }

    static async sendVerificationEmail(req: Request, res: Response) {
        const {email} = req.body;
        await AuthController.sendEmailLink(email);
        res.json({
            status: 200,
            message: "Email sent",
        });

    }

    static async refreshAuth(req: Request, res: Response) {
        const refresh_token = req.body.refresh_token;

        JWTRefreshToken.verify(refresh_token, async (err, refresh_token_info) => {
            if (err) return res.sendStatus(403);

            const user = await UserModel.findById(refresh_token_info.id);
            if (!user) return res.sendStatus(403);
            const access_token = JWTAccessToken.sign({email: user.email, id: user.id});
            const refresh_token = JWTRefreshToken.sign({id: user.id});

            res.json({
                status: 200,
                message: "Auth reauthenticated",
                access_token,
                refresh_token
            });
        })
    }

    static async _checkUserExist(email: string) {
        const userExist = await UserModel.findOneByEmail(email);
        if (userExist) throw new ErrorMiddleware(400, "Auth already exists");
    }

    static async sendEmailLink(email: string) {
        const user = await UserModel.findOneByEmail(email);
        if (!user)
            throw new ErrorMiddleware(404, "Auth not found");
        const token = JWTAccessToken.sign({email: user.email, id: user.id});
        const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`;
        const emailContent = `<p>Please verify your email by clicking on the following <a href="${verificationLink}">link</a></p>`;
        await sendMail(email, "Verify your email - Matcha", emailContent);
    }
}