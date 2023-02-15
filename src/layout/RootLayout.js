import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import MobileBottomNav from '../components/MobileBottomNav';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Header from '../layout/Header';
import { userDetailsAction } from '../state/userDetailsSlice';
import fetchLikedTrips from '../utilFuncs/fetchLikedTrips';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../auth/firebase-config';
import Footer from './Footer';

const RootLayout = () => {
	const { uid } = useSelector((state) => state.userDetails);
	const [isLoggedIn, isLoading] = useAuthStatus();
	const [isListingPage, setIsListingPage] = useState(null);
	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {
		if (params.id) setIsListingPage(true);
		if (!params.id) setIsListingPage(false);
	}, [params.id]);

	useEffect(() => {
		async function fetchData() {
			const likedListings = await fetchLikedTrips(uid);
			dispatch(userDetailsAction.setLikedTrips({ likedTrips: likedListings }));
		}
		if (isLoggedIn) fetchData();
	}, [uid, isLoggedIn]);

	useEffect(() => {
		if (isLoggedIn && !isLoading && auth.currentUser) {
			async function fetchUser() {
				const usersRef = doc(db, 'users', auth.currentUser.uid);
				const docSnap = await getDoc(usersRef);
				const data = docSnap.data();
				if (data) {
					dispatch(
						userDetailsAction.setUserDetails({
							name: data.name,
							email: data.email,
							uid: data.uid,
							isAdmin: data.isAdmin,
						})
					);
				}
			}
			fetchUser();
		}
	}, [isLoggedIn, isLoading, auth.currentUser]);

	return (
		<>
			<Header />
			<main className='mb-16'>
				<Outlet />
			</main>
			<Footer />
			{!isListingPage && <MobileBottomNav />}
		</>
	);
};

export default RootLayout;
