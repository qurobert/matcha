import express from "express";
import {verifyAuth} from "../middlewares/authMiddleware.ts";
import NotificationController from "../controllers/notificationController.ts";

const notificationRouter = express.Router();

notificationRouter.get('/', verifyAuth, NotificationController.getNotifications);
notificationRouter.post('/mark_as_read', verifyAuth, NotificationController.markAllAsRead);

export default notificationRouter