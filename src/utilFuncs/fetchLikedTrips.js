import { doc, getDoc } from 'firebase/firestore';
import { db } from '../auth/firebase-config';

const fetchLikedTrips = async (uid) => {
	if (uid) {
		const docRef = doc(db, 'users', uid);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) return [];

		const likedListings = docSnap.data().likedListings;

		if (!likedListings) return [];
		if (likedListings) return likedListings;
	}
};

export default fetchLikedTrips;
