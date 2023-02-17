import { auth } from './firebase-config';
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase-config';

const provider = new GoogleAuthProvider();

export async function googleAuth() {
	try {
		await setPersistence(auth, browserSessionPersistence);
		const response = await signInWithPopup(auth, provider);
		GoogleAuthProvider.credentialFromResult(response);
		const { user } = response;
		const userData = {
			name: user.displayName,
			email: user.email,
			uid: user.uid,
			metadata: { ...user.metadata },
		};

		//Check if user already exist
		const docRef = doc(db, 'users', user.uid);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			setDoc(docRef, userData);
		}

		return docSnap;
	} catch (error) {
		console.log(error.message);
		toast.error('Authentication failed...');
	}
}
