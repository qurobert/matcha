interface PayloadAccessToken {
	id: string;
	email: string;
	iat?: number;
	exp?: number;
}

interface PayloadRefreshToken {
	id: string;
	iat?: number;
	exp?: number;
}