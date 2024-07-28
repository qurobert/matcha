import type {Request, Response, NextFunction} from "express";

export default class ErrorMiddleware extends Error implements CustomError{
	public status: number;
	public statusCode: number;

  constructor(status: number, message: string) {
		super(message);
		this.message = message;
		this.status = status;
		this.statusCode = status;
  }
}

interface CustomError extends Error {
	status?: number;
	statusCode?: number;
}

export const globalErrorMiddleware = (err: ErrorMiddleware, req: Request, res: Response, next: NextFunction) => {
	const message = err.message || 'Something went wrong';
	const status = err.status || 500;

	res.status(status).json({
		status,
		message
	});
};

export const globalErrorLogger = (err: ErrorMiddleware, req: Request, res: Response, next: NextFunction) => {
	console.error('>>>>>>>>>>>>>>>>>>');
	console.error(err);
	console.error('<<<<<<<<<<<<<<<<<<');
	next(err);
};

export const error404 = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error('Not found') as ErrorMiddleware;
	error.status = 404;
	next(error);
}