import {body, type ValidationChain} from "express-validator";
import {globalHandleValidationResult} from "./handleValidationResult.js";

export const registerValidator = () => [
	body('email').isEmail().withMessage('Email is not valid'),
	body('password')
		.isLength({min: 8}).withMessage('Password must be at least 8 characters')
		.matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
		.matches(/\W/).withMessage('Password must contain at least one special character'),
	body('username').isLength({min: 6, }).withMessage('Username must be at least 6 characters'),
	globalHandleValidationResult
]

export const updateProfileValidator = () => [
	body('email').optional().isEmail().withMessage('Email is not valid'),
	body('password').optional().isLength({min: 8}).withMessage('Password must be at least 8 characters')
	.matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
	.matches(/\W/).withMessage('Password must contain at least one special character'),
	globalHandleValidationResult
]
export const refreshTokenValidator = () => [
	body('refresh_token').isString().withMessage('Refresh token must be a string'),
	globalHandleValidationResult
]
export const codeEmailValidator = () => [
	body('code').isString().withMessage('Code must be a non-empty string'),
	globalHandleValidationResult
]

export const emailValidator = () => [
	body('email').isEmail().withMessage('Email is not valid'),
	globalHandleValidationResult
]

export const resetPassValidator = () => [
	body('email').isEmail().withMessage('Email is not valid'),
	body('code').isString().withMessage('Code must be a non-empty string'),
	body('password').isString()
	.isLength({min: 8}).withMessage('Password must be at least 8 characters')
	.matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
	.matches(/\W/).withMessage('Password must contain at least one special character'),,
	globalHandleValidationResult
]

export const userProfileValidator = () => [
	body('fist_name').optional().isString().withMessage('First name must be a string'),
	body('last_name').optional().isString().withMessage('Last name must be a string'),
	body('date_of_birth').optional().isDate().withMessage('Date of birth must be a date'),
	body('gender').optional().isString().withMessage('Gender must be a string'),
	body('interested_in').optional().isString().withMessage('Interested in must be a string'),
	body('biography').optional().isString().withMessage('Biography must be a string'),
	body('location_lat').optional().isFloat().withMessage('Location latitude must be a float'),
	body('location_lng').optional().isFloat().withMessage('Location longitude must be a float'),
	body('interests').optional().isArray().withMessage('Interests must be an array'),
	globalHandleValidationResult
]