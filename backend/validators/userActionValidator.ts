import {globalHandleValidationResult} from "./handleValidationResult.ts";
import {body} from "express-validator";

export const TargetInteractionValidator = () => [
	body('target_user_id').isInt().withMessage("Target user id required"),
	globalHandleValidationResult
]