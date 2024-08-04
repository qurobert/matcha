import express from "express";
import 'express-async-errors'
import cookieParser from "cookie-parser"
import morgan from "morgan"
import cors from 'cors'
const app = express();
const port = process.env.PORT || 3000;
import http from "http";
import UserRouter from "./routes/userRouter.ts";
import AuthRouter from "./routes/authRouter.ts";
import {error404, globalErrorLogger, globalErrorMiddleware} from "./middlewares/errorMiddleware.ts";
import IndexRouter from "./routes";

// Configuring the app
app.use(cors({
	origin: 'http://localhost',
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

app.use(
	error404,
	globalErrorLogger,
	globalErrorMiddleware,
)

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

