import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../auth/firebase-config';

export const useAuthStatus = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isValidating, setIsValidating] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, function (user) {
			if (user) {
				setIsLoggedIn(true);
			}
			if (!user) {
				setIsLoggedIn(false);
			}
			setIsValidating(false);
		});
	}, [auth]);

	return [isLoggedIn, isValidating];
};
