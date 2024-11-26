import URL from "@/helpers/URL";
export const getSrcImageFromPicture = (picture: string | null | undefined) => {
	return picture
		? picture.startsWith('https')
			? picture
			: URL + "/uploads/" + picture
		: ''
}