import express from "express";
import ActionsController from "../controllers/actionsController.ts";
import {TargetInteractionValidator} from "../validators/userActionValidator.ts";
import {verifyAuth} from "../middlewares/authMiddleware.ts";

const actionsRouter = express.Router();

actionsRouter.post('/like', verifyAuth, TargetInteractionValidator(), ActionsController.likeUser)
actionsRouter.delete('/like', verifyAuth, TargetInteractionValidator(), ActionsController.unLikeUser)
actionsRouter.post('/dislike', verifyAuth, TargetInteractionValidator(), ActionsController.dislikeUser)
actionsRouter.post('/report', verifyAuth, TargetInteractionValidator(), ActionsController.reportUser)
actionsRouter.delete('/report', verifyAuth, TargetInteractionValidator(), ActionsController.unReportUser)
actionsRouter.post('/block', verifyAuth, TargetInteractionValidator(), ActionsController.blockUser)
actionsRouter.delete('/block', verifyAuth, TargetInteractionValidator(), ActionsController.unBlockUser)
actionsRouter.get('/me', verifyAuth, ActionsController.getInteractionsMe)
actionsRouter.get('/:target_user_id', verifyAuth, ActionsController.infoTargetUser)

export default actionsRouter