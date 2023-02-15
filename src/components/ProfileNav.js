import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function ProfileNav() {
	const { isAdmin } = useSelector((state) => state.userDetails);

	//prettier-ignore
	return (
		<section className='sticky flex justify-center items-center shadow-inner'>
      <div className='max-w-[550px] w-[90%] mx-auto py-3 flex gap-4 items-center'>
        <NavLink to='/profile' className={({isActive})=> isActive ? `text-md font-medium border-b-2 border-red-600`: `text-md font-medium`}end>
          Details
        </NavLink>
        {isAdmin && <NavLink to='/listings' className={({isActive})=> isActive ? `text-md font-medium border-b-2 border-red-600`: `text-md font-medium`} end>My Listings</NavLink>}
        {isAdmin && <NavLink to='/my-bookings' className={({isActive})=> isActive ? `text-md font-medium border-b-2 border-red-600`: `text-md font-medium`} end>All Bookings</NavLink>}
		</div>
    </section>
	);
}
