interface User extends Profile, TMPProfile {
	id: string;
	email: string;
	username: string;
	verify_email: boolean;
	create_profile: boolean;
	preferences: Preferences;
	is_online: boolean;
	last_connection: Date;
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
	fame_rating?: number;
}

interface Preferences {
	age: number;
	fame_rating: number;
	distance: number;
	interests: InterestsPreferences;
}

interface TMPProfile {
	location: string;
}