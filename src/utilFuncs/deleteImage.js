import { getStorage, ref, deleteObject } from 'firebase/storage';

const deleteImage = async (url) => {
	const storage = getStorage();
	const imageRef = ref(storage, url);
	try {
		await deleteObject(imageRef);
	} catch (error) {
		console.log(error.message);
	}
};

export default deleteImage;
