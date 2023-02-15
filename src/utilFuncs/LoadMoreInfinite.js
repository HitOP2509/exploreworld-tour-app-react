import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { db } from '../auth/firebase-config';

const LoadMoreInfinite = async (list, fetchOption) => {
	if (list.length > 0) {
		const listingsRef = collection(db, 'listings');
		const q = query(
			listingsRef,
			orderBy('createdAt', 'desc'),
			where(fetchOption.name, fetchOption.operator, fetchOption.value),
			limit(20),
			startAfter(list[list.length - 1].createdAt)
		);
		const packagesSnap = await getDocs(q);
		const tours = [];
		packagesSnap.forEach((doc) => {
			const docData = { ...doc.data(), id: doc.id };
			tours.push(docData);
		});
		return tours;
	}
};

export default LoadMoreInfinite;
