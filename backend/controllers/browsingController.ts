import type {Request, Response} from "express";
// import {getMatchingUsersForUser} from "../services/browsingService.ts";
import {faker} from "@faker-js/faker";
import UserModel from "../models/userModel.ts";
import bcrypt from "bcryptjs";
import UserController from "./userController.ts";
import BrowsingService from "../services/browsingService.ts";

export default class BrowsingController {
	static async browse(req: Request, res: Response) {
		const user = req.user;
		const limit = Number(req.query.n) || 10;
		if (limit > 30) throw new Error('Number of users to browse must be less than 30');
		if (!user || !user.id) throw new Error('User not found');

		const matchingUsers: User[] = await BrowsingService.getMatchingUsersForUser(user.id, true);

		const formattedUsers = [];

		for (const user of matchingUsers) {
			formattedUsers.push(await UserController._responseUser(user));
		}
		res.status(200).json({status: 200, message: 'Browsing', users: formattedUsers});
	}

	static async createFakeUser(req: Request, res: Response) {
		const numbers = Number(req.query.n) || 1;
		const allInterests = [
			'rock', 'electro', 'cooking', 'video games', 'science fiction',
			'book', 'drawing', 'yoga', 'jazz', 'comedy', 'gardening', 'politic',
			'museum', 'humor', 'history', 'mode', 'trip', 'action movie', 'boards games', 'horror', 'pop', 'painting', 'documentary'
		];
		const gender = ["woman", "man"]
		const interested_in = ["man", "woman", "both"]
		for (let i = 0; i < numbers; i++) {
			const age_preference_min = faker.number.int({ min: 18, max: 100 });
			const fame_rating_preference_min = faker.number.int({max: 100 });
			// @ts-ignore
			const user : User = {
				first_name: faker.person.firstName(),
				last_name: faker.person.lastName(),
				password: bcrypt.hashSync("qwerty2@W", 10),
				username: faker.internet.username(),
				biography: faker.lorem.sentence(),
				email: faker.internet.email(),
				gender: gender[faker.number.int({ min: 0, max: 1 })],
				date_of_birth: faker.date.between({ from: '1970-01-01', to: '2006-01-01' }),

				// id: faker.string.uuid(),
				pictures: [
					faker.image.urlPicsumPhotos({ width: 1920, height: 1080, blur: 0, grayscale: false }),
					faker.image.urlPicsumPhotos({ width: 1920, height: 1080, blur: 0, grayscale: false }),
					faker.image.urlPicsumPhotos({ width: 1920, height: 1080, blur: 0, grayscale: false }),
					faker.image.urlPicsumPhotos({ width: 1920, height: 1080, blur: 0, grayscale: false }),
				],
				interests: allInterests.slice(0, faker.number.int({ min: 1, max: 8 })),
				location_lat: 48.85206549830759,
				location_lng: 2.3483276367187504,

				interests_preference: allInterests.slice(0, faker.number.int({ min: 1, max: 8 })),
				interested_in: interested_in[faker.number.int({ min: 0, max: 1 })],
				age_preference_min,
				age_preference_max: faker.number.int({ min: Math.max(90, age_preference_min), max: 100 }),
				fame_rating_preference_min,
				fame_rating_preference_max: faker.number.int({ min: Math.max(90, fame_rating_preference_min), max: 100 }),
				distance_preference: faker.number.int({ min: 0, max: 300 }),

				is_online: faker.datatype.boolean(),
				last_connection: faker.date.between({ from: '2020-01-01', to: Date.now() }),
				verify_email: true,
				notification: true,
			}
			await UserModel.createFakeUser(user);
		}
		res.status(200).json({status: 200, message: `Created ${numbers} fake user(s)`,});
	}
}