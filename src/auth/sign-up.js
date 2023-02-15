import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase-config';
import { setDoc, doc } from 'firebase/firestore';
import { db } from './firebase-config';

const createUser = async function (email, password, name) {
	try {
		if (!name) return 'name';
		if (!email) return 'email';
		if (!password) return 'password';

		const userCredentials = createUserWithEmailAndPassword(auth, email, password);

		const { user } = await userCredentials;

		await updateProfile(auth.currentUser, { displayName: name }); //Updating users Display Name

		const userData = {
			name: user.displayName,
			email: user.email,
			uid: user.uid,
			metadata: { ...user.metadata },
		};

		//Adding user to firestore db
		setDoc(doc(db, 'users', userData.uid), userData, { merge: true });
		return 'added';
	} catch (error) {
		if (error.code.includes('email-already-in-use')) return 'emailExist';
		if (error.code.includes('email')) return 'email';
		if (error.code.includes('error')) return 'password';
	}
};

export default createUser;
