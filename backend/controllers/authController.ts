import UserModel from "../models/userModel.ts";
import {JWT, JWTAccessToken, JWTRefreshToken} from "../helpers/jwt.ts";
import ErrorMiddleware from "../middlewares/errorMiddleware.ts";
import {sendMail} from "../mail/sendMail.ts";
import type {Request, Response} from "express";

export default class AuthController {
    static async register(req: Request, res: Response) {
        const {email, password, username} = req.body;
        await AuthController._checkUserExist(email);

        const user = await UserModel.create(email, username, password);
        if (!user) throw new Error("User not created");

        await AuthController.sendEmailLink(email);

        return res.json({
            status: 200,
            message: "User created successfully",
        // @ts-ignore
            access_token: JWTAccessToken.sign({email, id: user[0]}),
        // @ts-ignore
            refresh_token: JWTRefreshToken.sign({id: user[0]}),
        });
    }


    static async login(req: Request, res: Response) {
        const {username, password} = req.body;
        const user = await UserModel.login(username, password);

        return res.json({
            status: 200,
            message: "User logged in successfully",
        // @ts-ignore
            accessToken: JWTAccessToken.sign({email: user.email, id: user.id}),
        // @ts-ignore
            refreshToken: JWTRefreshToken.sign({id: user.id}),
        });
    }

    static async verifyEmail(req: Request, res: Response) {
        const {token} = req.query;
        // @ts-ignore
        JWTAccessToken.verify(token, async (err, emailTokenInfo) => {
            console.log(emailTokenInfo, err);
            if (err) return res.sendStatus(403);

            const user = await UserModel.findById(emailTokenInfo.id);
            if (!user) return res.sendStatus(403);
            await UserModel.validate_email(user.email);
            return res.redirect('http://localhost/verify-email');
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
        const refreshToken = req.body.refreshToken;

        JWTRefreshToken.verify(refreshToken, async (err, refreshTokenInfo) => {
            if (err) return res.sendStatus(403);

            const user = await UserModel.findById(refreshTokenInfo.id);
            if (!user) return res.sendStatus(403);
        // @ts-ignore
            const accessToken = JWTAccessToken.sign({email: user.email, id: user.id});
        // @ts-ignore
            const refreshToken = JWTRefreshToken.sign({id: user.id});
            res.json({
                status: 200,
                message: "User reauthenticated",
                accessToken,
                refreshToken
            });
        })
    }

    static async _checkUserExist(email: string) {
        const userExist = await UserModel.findOneByEmail(email);
        console.log(userExist);
        if (userExist) throw new ErrorMiddleware(400, "User already exists");
    }

    static async sendEmailLink(email: string) {
        const user = await UserModel.findOneByEmail(email);
        if (!user)
            throw new ErrorMiddleware(404, "User not found");
        // @ts-ignore
        const token = JWTAccessToken.sign({id: user.id});
        const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`;
        const emailContent = `<p>Please verify your email by clicking on the following <a href="${verificationLink}">link</a></p>`;
        await sendMail(email, "Verify your email - Matcha", emailContent);
    }
}