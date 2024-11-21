import _ from 'lodash';
function createFakeUser(firstName: string, lastName: string, dateOfBirth: string, pictures: string) {
	return {
		first_name: firstName,
		last_name: lastName,
		biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		date_of_birth: dateOfBirth,
		pictures: [pictures],
		id: Math.random().toString(36).substr(2, 9)
	}
}

export const useFakeUser = (n: number) => {
	let allFakeUsers: any[] = [];
	for (let i = 0; i < n; i++) {
		const fakeUsers = [
			createFakeUser("Jenna", "Joseph", "1993-01-01", "jenna_5.jpg"),
			createFakeUser("Jenna", "Joseph", "1991-01-01", "jenna_2.jpg"),
			createFakeUser("Jenna", "Joseph", "1995-01-01", "jenna_3.jpg"),
			createFakeUser("Jenna", "Joseph", "2006-01-01", "jenna_4.jpg"),
			createFakeUser("Jenna", "Joseph", "2006-01-01", "jenna_1.jpg"),
			createFakeUser("Jenna", "Joseph", "1992-01-01", "jenna_6.jpg"),
		]
		_.shuffle(fakeUsers);
		allFakeUsers = allFakeUsers.concat(fakeUsers);
	}
	return allFakeUsers;
}