import express from "express";
import {
	emailValidator,
	resetPassValidator,
	userProfileValidator,
	updateProfileValidator
} from "../validators/userValidator.ts";
import UserController from "../controllers/userController.ts";
import {verifyAuth} from "../middlewares/authMiddleware.ts";
import multer from "multer";
import * as path from "node:path";
import ProfileController from "../controllers/profileController.ts";
import ImageController from "../controllers/imageController.ts";

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


const userRouter = express.Router();

userRouter.get('/me', verifyAuth, UserController.getUserConnected);
userRouter.get('/status', UserController.userStatus);
userRouter.post('/forgot-password', emailValidator(), UserController.forgotPassword);
userRouter.post('/reset-password', resetPassValidator, UserController.resetPassword);
userRouter.post('/update', verifyAuth, updateProfileValidator(), UserController.updateUser);
userRouter.put('/profile', verifyAuth, userProfileValidator(), ProfileController.updateUserProfile);
userRouter.put('/images', verifyAuth, upload.fields([
	{ name: 'pictures', maxCount: 6 },
]), ImageController.updateUserImage);

userRouter.get('/images', verifyAuth, ImageController.getUserImage);
userRouter.delete('/images', verifyAuth, ImageController.deleteUserImage);
userRouter.get('/:id', verifyAuth, UserController.getUserById);

export default userRouter