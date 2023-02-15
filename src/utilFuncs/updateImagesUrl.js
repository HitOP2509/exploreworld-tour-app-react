import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../auth/firebase-config';

export default async function updateImagesUrl(listingId, imagesUrl) {
	const listingRef = doc(db, 'listings', listingId);

	await updateDoc(listingRef, {
		imagesUrl: imagesUrl,
	});
}
