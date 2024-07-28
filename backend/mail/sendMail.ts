import {config} from './configMail.ts';
import nodemailer from "nodemailer";

export const sendMail = async (to: string, subject: string, html: string) => {
	const transporter = nodemailer.createTransport(config);

	const mailOptions = {
		from: process.env.GMAIL_USER,
		to,
		subject,
		html
	};

	return transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.error(error);
		}
	});
}