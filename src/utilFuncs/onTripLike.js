import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../auth/firebase-config';
import { auth } from '../auth/firebase-config';

const onTripLike = async (likedTrips, listing) => {
	try {
		const userRef = doc(db, 'users', auth.currentUser.uid);
		const alreadyExisting = likedTrips && likedTrips.filter((trip) => trip.id === listing.id);

		if (likedTrips && likedTrips.length >= 1 && alreadyExisting.length >= 1) {
			const updatedLikedListings = likedTrips.filter((trip) => trip.id !== listing.id);
			await updateDoc(userRef, { likedListings: updatedLikedListings });
			return updatedLikedListings;
		}

		const updatedLikedListings = likedTrips ? [listing, ...likedTrips] : [listing];
		await updateDoc(userRef, { likedListings: updatedLikedListings });
		return updatedLikedListings;
	} catch (error) {
		toast.error('Something went wrong');
		console.log(error.message);
	}
};

export default onTripLike;
