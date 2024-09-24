import express from "express";
import {
	emailValidator,
	resetPassValidator,
	userProfileValidator
} from "../validators/userValidator.ts";
import UserController from "../controllers/userController.ts";
import {verifyAuth} from "../middlewares/authMiddleware.ts";
import multer from "multer";
import * as path from "node:path";
import {verify} from "jsonwebtoken";
// Configurer Multer pour stocker les fichiers
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/'); // Répertoire où les fichiers seront enregistrés
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
	}
});

const upload = multer({ storage: storage });

// const upload = multer({ dest: 'uploads/', limits: { fileSize: 50 * 1024 * 1024 }});

const userRouter = express.Router();

// @ts-ignore
userRouter.get('/me', verifyAuth, UserController.getUserConnected);
userRouter.get('/status', UserController.userStatus);
// @ts-ignore
userRouter.get('/:id', verifyAuth, UserController.getUserById);
// @ts-ignore
userRouter.post('/forgot-password', emailValidator(), UserController.forgotPassword);
// @ts-ignore
userRouter.post('/reset-password', resetPassValidator(), UserController.resetPassword);
userRouter.post('/update', verifyAuth, UserController.updateUser);
// @ts-ignore
userRouter.post('/update-user-profile', verifyAuth, userProfileValidator(), UserController.updateUserProfile);
// @ts-ignore
userRouter.post('/update-user-image', verifyAuth, upload.fields([
	{ name: 'pictures', maxCount: 6 },
// @ts-ignore
]), UserController.updateUserImage);

userRouter.get('/images', verifyAuth, UserController.getUserImage);
userRouter.post('/delete-user-image', verifyAuth, UserController.deleteUserImage);
export default userRouter