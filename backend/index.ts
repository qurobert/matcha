import express from "express";
import 'express-async-errors'
import cookieParser from "cookie-parser"
import morgan from "morgan"
import cors from 'cors'
const app = express();
const port = process.env.PORT || 3000;
const socketIo = require('socket.io');
import http from "http";

import UserRouter from "./routes/userRouter.ts";
import NotificationRouter from "./routes/notificationRouter.ts";
import AuthRouter from "./routes/authRouter.ts";
import UserActionRouter from "./routes/actionsRouter.ts";
import BrowsingRouter from "./routes/browsingRouter.ts";
import {error404, globalErrorLogger, globalErrorMiddleware} from "./middlewares/errorMiddleware.ts";
import IndexRouter from "./routes";
import path from "node:path";
import UserModel from "./models/userModel.ts";
import ChatRouter from "./routes/chatRouter.ts";

// Configuring the app
app.use(cors({
	origin: 'http://localhost:8080',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true,
	preflightContinue: false,
}))
app.use(morgan("dev"));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.options('*', cors());
app.use('/', IndexRouter);
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);
app.use('/actions', UserActionRouter);
app.use('/notifications', NotificationRouter);
app.use('/browse', BrowsingRouter);
app.use('/chat', ChatRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
	error404,
	globalErrorLogger,
	globalErrorMiddleware,
)

const server = http.createServer(app);

const activeUsers = new Map();
export const io = socketIo(server, {
	cors: {
		origin: "http://localhost:8080",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

io.on("connection", (socket: any) => {
	const user_id = socket?.handshake?.query?.user_id;
	if (user_id === null || user_id === undefined) return;
	if (!user_id) return;

	if (user_id)
		activeUsers.set(user_id, Date.now());
	if (user_id)
		UserModel.setStatusConnection(user_id, true);

	socket.on('client-ping', () => {
		if (user_id)
			activeUsers.set(user_id, Date.now()); // Met à jour le dernier ping reçu
	});

	socket.on("disconnect", () => {
		if (user_id)
			UserModel.setStatusConnection(user_id, false);
		if (user_id)
			activeUsers.delete(user_id);
	});
})

setInterval(() => {
	const now = Date.now();

	for (const [userId, lastPing] of activeUsers.entries()) {
		if (now - lastPing > 30000) {
			console.log(`User ${userId} is offline (ping timeout)`);
			if (userId)
				activeUsers.delete(userId);
			if (userId)
				UserModel.setStatusConnection(userId, false);
		}
	}
}, 10000); // Vérifie toutes les 10 secondes
server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

