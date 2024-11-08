import express from "express";
import {verifyAuth} from "../middlewares/authMiddleware.ts";
import NotificationController from "../controllers/notificationController.ts";
import {TargetInteractionValidator} from "../validators/userActionValidator.ts";

const notificationRouter = express.Router();

notificationRouter.get('/', verifyAuth, NotificationController.getNotifications);
notificationRouter.post('/mark_as_read', verifyAuth, NotificationController.markAllAsRead);
notificationRouter.post('/viewed_profile', verifyAuth, TargetInteractionValidator(), NotificationController.viewedTargetProfile);

export default notificationRouter