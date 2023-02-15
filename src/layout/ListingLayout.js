import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from '../components/Spinner';
import ProfileNav from '../components/ProfileNav';

const ListingLayout = () => {
	const [isLoggedIn, isLoading] = useAuthStatus();
	if (isLoading) return <Spinner />;
	return isLoggedIn ? (
		<>
			<ProfileNav />
			<Outlet />
		</>
	) : (
		<Navigate to='/sign-in' />
	);
};

export default ListingLayout;
