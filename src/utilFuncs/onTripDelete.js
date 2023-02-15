import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../auth/firebase-config';

async function onTripDelete(id) {
	try {
		await deleteDoc(doc(db, 'listings', id));
		return true;
	} catch (error) {
		return false;
	}
}

export default onTripDelete;
