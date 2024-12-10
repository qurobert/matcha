interface User extends Profile, Preferences {
	id: string;
	email: string;
	username: string;
	password?: string;
	verify_email: boolean;
	create_profile?: boolean;
	notification: boolean;
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
	age_preference_min: number;
	age_preference_max: number;
	fame_rating_preference_min: number;
	fame_rating_preference_max: number;
	distance_preference: number;
	interests_preference: string[];
}