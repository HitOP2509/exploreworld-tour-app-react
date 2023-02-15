import React, { useRef, useState } from 'react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { toast } from 'react-toastify';
import { db } from '../auth/firebase-config';

const BookingForm = (props) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');

	const params = useParams();
	const tripId = params.id;

	const year = new Date().getFullYear();
	const month = `${new Date().getMonth() + 1}`.padStart(2, 0);
	const date = `${new Date().getDate()}`.padStart(2, 0);
	const today = `${year + '-' + month + '-' + date}`;

	const dateRef = useRef('');
	const emailRef = useRef('');
	const mobileRef = useRef('');
	const peoplesRef = useRef('');

	async function onSubmitHandler(e) {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const date = dateRef.current.value;
			const email = emailRef.current.value;
			const mobile = mobileRef.current.value;
			const peoples = peoplesRef.current.value;
			const bookingId = uuidV4();
			const createdAt = new Date().toISOString();
			const emailCheck = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
			const mobileCheck = new RegExp('[6-9]{1}[0-9]{9}');

			if (!email || !emailCheck.test(email)) {
				setError('email-error');
				return null;
			}
			if (!mobile || !mobileCheck.test(mobile)) {
				setError('mobile-error');
				return null;
			}

			const listingRef = doc(db, 'listings', tripId);
			const listingSnap = await getDoc(listingRef);

			if (!listingSnap.data()) {
				toast.error('Booking failed. Please refresh the page and try again.');
				//Close modalForm on Mobile
				props.closeModal && props.closeModal();
				return null;
			}

			const tripDetails = listingSnap.data();
			const tripPrice = +tripDetails.discountedPrice || +tripDetails.regularPrice;

			const bookingDetails = {
				packageName: tripDetails.name,
				journeyDate: date,
				customerEmail: email,
				customerMobile: mobile,
				numberOfPeoples: peoples,
				ownerId: tripDetails.userRef,
				totalBookingValue: tripPrice * +peoples,
				createdAt,
				bookingId,
			};

			await addDoc(collection(db, 'bookings'), bookingDetails);
			toast.success("Enquiry submitted. We'll responsd you within 24 hours.");
			setIsSubmitting(false);
			//Close modalForm on Mobile
			props.closeModal && props.closeModal();
			//Resettting Form Data
			e.target.reset();
		} catch (error) {
			setIsSubmitting(false);
			toast.error('Something went wrong...');
			return null;
		}
	}

	//prettier-ignore
	return (
			<form onSubmit={onSubmitHandler} className={`${props.className} bg-gradient-to-tr from-pink-700 to-red-700 w-full p-2 rounded-[5px] h-[fit-content] sticky top-[65px]`}>
				<h3 className='text-xl text-white font-bold mb-4 text-center'>Enquiry Form</h3>
				<label htmlFor="date" className='text-white text-md font-medium text-left'>Journey Date</label>
				<input type="date" name='date' id='date' defaultValue={today} min={today} ref={dateRef} required className='text-md uppercase font-bold text-red-700 w-full h-10 mt-1 mb-4 px-2 flex items-center'/>

				{error==='email-error' && <p className='text-red-300 drop-shadow-md text-sm'>Invalid email</p>}
				<label htmlFor="email" className='text-white text-md font-medium text-left'>Your email</label>
				<input type="email" name='email' id='email' placeholder='someone@example.com' ref={emailRef} required className='w-full h-10 mt-1 mb-4 px-2 block text-red-700 font-bold tracking-wide	placeholder:text-gray-400/80'/>
				
				{error==='mobile-error' && <p className='text-red-300 drop-shadow-md text-sm'>Invalid Mobile Number</p>}
				<label htmlFor="mobile" className='text-white text-md font-medium text-left'>Mobile number</label>
				<input type="tel" name='mobile' id='mobile' placeholder='9874563210' minLength='10' maxLength='10' ref={mobileRef} required className='w-full h-10 mt-1 mb-4 px-2 block text-red-700 font-bold tracking-wider	placeholder:text-gray-400/80'/>

				<label htmlFor="person" className='text-white text-md font-medium text-left'>Number of Person</label>
				<input type="number" name='person' id='person' minLength='3' min='1' defaultValue='1' ref={peoplesRef} required className='w-full h-10 mt-1 mb-4 px-2 block text-red-700 font-bold tracking-wider'/>

				<button className={`w-full h-10 text-lg mt-4 bg-white shadow-md text-red-700 font-[900] ${isSubmitting && 'opacity-30 cursor-not-allowed'}`} disabled={isSubmitting}>{isSubmitting? 'Submitting' :'Submit'}</button>
		</form>

	);
};

export default BookingForm;
