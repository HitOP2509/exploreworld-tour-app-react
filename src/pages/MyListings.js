import React, { useCallback, useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../auth/firebase-config';
import Spinner from '../components/Spinner';
import ListingCard from '../components/ListingCard';
import { FcHome } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useAuthStatus } from '../hooks/useAuthStatus';

export default function MyListings() {
	const { isAdmin, uid } = useSelector((state) => state.userDetails);
	const [isLoggedIn, isLoading] = useAuthStatus();
	const navigate = useNavigate();
	const [userListings, setUserListings] = useState([]);
	const [loading, setLoading] = useState(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		const listingsRef = collection(db, 'listings');
		const q = query(listingsRef, where('userRef', '==', uid), orderBy('createdAt', 'desc'));

		const querySnap = await getDocs(q);

		querySnap.forEach((doc) => {
			const docData = { ...doc.data(), id: doc.id };
			setUserListings((prev) => [...prev, docData]);
		});
		setLoading(false);
	}, [uid]);

	useEffect(() => {
		if (isLoggedIn && isAdmin) fetchData();
	}, [isAdmin, isLoggedIn]);

	useEffect(() => {
		if (!isLoggedIn && !isAdmin && !isLoading) navigate('/saved-trips');
	}, [isAdmin, isLoading, isLoggedIn]);

	if (!isAdmin) {
		return null;
	}

	//prettier-ignore
	return (
		<div className='max-w-[1280px] w-[90%] mx-auto sm:px-3 lg:pt-10 sm:pt-6 mt-4 min-h-[90vh] min-h-[80vh]'>
			<div className='flex justify-between items-center mb-8 gap-4'>
				<h1 className='text-2xl font-bold pt-2 pb-6'>My Listings</h1>
				<Link to='/listings/create' className='flex justify-center items-center gap-2'> 
					<p className='text-red-700 text-[1rem] font-bold'>Add New</p>
					<FaPlusCircle className='text-red-700'/>
				</Link>
			</div>
			{loading && <Spinner />}
			<ul className={`grid grid-cols-autoFit gap-2 sm:gap-8 mx-auto ${userListings && userListings.length < 3 ? 'sm:grid-cols-minMax' : 'sm:grid-cols-mobileFit'}`}>
        {userListings && userListings.map((listing) => (
					<ListingCard listing={listing} key={listing.id} />
			  ))}
        {userListings.length<1 && <p>No listings created by you...</p>}
      </ul>
		</div>
	);
}
