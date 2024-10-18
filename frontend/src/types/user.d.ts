interface User extends Profile {
	id: string;
	email: string;
	username: string;
	verify_email: boolean;
	create_profile: boolean;
	preferences: Preferences;
}

interface Profile {
	first_name?: string;
	last_name?: string;
	date_of_birth?: Date
	gender?: string;
	interested_in?: string;
	biography?: string;
	location_lat?: number;
	location_lng?: number;
	interests?: string[];
	pictures?: string[];
}

interface Preferences {
	age: number;
	fame_rating: number;
	distance: number;
	interests: InterestsPreferences;
}
