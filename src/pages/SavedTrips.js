import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListingCard from '../components/ListingCard';
import Spinner from '../components/Spinner';
import { useAuthStatus } from '../hooks/useAuthStatus';

const SavedTrips = () => {
	const { likedTrips } = useSelector((state) => state.userDetails);
	const [isLoggedIn, isLoading] = useAuthStatus();
	const navigate = useNavigate();

	const fitGrid = likedTrips && likedTrips.length < 3 ? 'sm:grid-cols-minMax' : 'sm:grid-cols-mobileFit';

	useEffect(() => {
		if (!isLoggedIn && !isLoading) {
			toast.info('Please sign in to continue');
			navigate('/sign-in');
		}
	}, [isLoggedIn, isLoading]);

	// if (isLoading) return <Spinner />;

	// if (!isLoading && isLoggedIn && (!likedTrips || likedTrips.length <= 0)) return <h1>No saved trips.</h1>;
	//prettier-ignore
	return (
		<div className='max-w-[1280px] w-[90%] mx-auto sm:px-3 pt-3 lg:pt-10 sm:pt-6 min-h-[80vh]'>
         <h1 className='text-2xl font-bold pt-2 pb-6'>Saved Trips</h1>
            {(!isLoading && isLoggedIn && (!likedTrips || likedTrips.length <= 0)) && <h2 className='text-xl'>No saved trips.</h2>}
      		<ul className={`grid grid-cols-autoFit gap-2 sm:gap-8 mx-auto ${fitGrid}`}>
      			{likedTrips && likedTrips.map((listing) => <ListingCard listing={listing} key={listing.id} />)}
      		</ul>
		</div>
	);
};

export default SavedTrips;
