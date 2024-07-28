import {validationResult} from "express-validator";
import type {NextFunction} from "express";

export const globalHandleValidationResult = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
	{
		// @ts-ignore
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};