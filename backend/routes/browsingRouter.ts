import express from "express";
import BrowsingController from "../controllers/browsingController.ts";
import {verifyAuth} from "../middlewares/authMiddleware.ts";

const browsingRouter = express.Router();

browsingRouter.get('/', verifyAuth, BrowsingController.browse);
browsingRouter.get('/create-fake-users', BrowsingController.createFakeUser);

export default browsingRouter;