export const fetchReverseGeocoding = async (latitude: number, longitude: number)  => {
	const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
	const response = await fetch(url);
	return response.json();
}