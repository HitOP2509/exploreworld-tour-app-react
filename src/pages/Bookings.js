import { collection, getDocs, doc, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../auth/firebase-config';
import ProfileNav from '../components/ProfileNav';
import Spinner from '../components/Spinner';
import BookingCard from '../components/BookingCard';

const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(null);
	const { uid } = useSelector((state) => state.userDetails);

	useEffect(() => {
		try {
			async function fetchData() {
				setLoading(true);
				const bookingsRef = collection(db, 'bookings');
				const q = query(bookingsRef, where('ownerId', '==', uid), orderBy('createdAt', 'desc'));

				const querySnap = await getDocs(q);

				const docData = [];
				querySnap.forEach((doc) => {
					docData.push({
						...doc.data(),
						id: doc.id,
					});
				});
				setBookings(docData);
				setLoading(false);
			}
			fetchData();
		} catch (error) {
			console.log(error.message);
		}
	}, [uid]);

	//prettier-ignore
	return (
		<>
			<ProfileNav />
			{loading && <Spinner />}
			<div className='max-w-4xl mx-auto mt-6 min-h-[90vh] '>
            <h1 className='text-2xl font-bold pt-2 pb-6'>Enquiry Details</h1>
            {!loading && bookings.length < 1 && <h3 className='text-xl font-bold'>No bookings found...</h3>}
				{!loading && bookings.length>0 && 
            <ul> 
   				{bookings.map((booking, i) => <li className='mb-8' key={i}> <BookingCard data={booking} /></li>)}
   			</ul>}
			</div>
		</>
	);
};

export default Bookings;

export async function loader() {
	return null;
}
