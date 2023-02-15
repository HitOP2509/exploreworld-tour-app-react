import { doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../auth/firebase-config';

const dateTimeFormat = new Intl.DateTimeFormat('en-GB', {
	hourCycle: 'h12',
	hour: 'numeric',
	minute: 'numeric',
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
	weekday: 'long',
});
const currencyFormat = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

const BookingCard = ({ data }) => {
	const navigate = useNavigate();

	const enqId = data.id;
	const bookingDate = dateTimeFormat.format(new Date(data.createdAt));
	const journeyDate = dateTimeFormat
		.format(new Date(data.journeyDate))
		.split(',')
		.filter((time, index) => index < 2 && time)
		.join(', ');
	const totalValue = currencyFormat.format(data.totalBookingValue);

	async function onDeleteHandler() {
		await deleteDoc(doc(db, 'bookings', enqId));
		toast.success('Booking Deleted...');
		navigate(-1);
	}

	//prettier-ignore
	return (
		<div className='bg-gradient-to-tr from-pink-700 to-red-700 w-full md:flex items-end justify-between px-8 py-6 rounded-[5px] text-white'>
			<div>
        <h3 className='text-[1.75rem] tracking-widest	font-[600] t-shadow'>{data.packageName}</h3>
        <p className='my-3 text-md tracking-wide t-shadow'>Enquiry Date: {bookingDate}</p>
        <p className='my-3 text-md tracking-wide t-shadow'>Journey Date: {journeyDate}</p>
        <p className='my-3 text-md tracking-wide t-shadow'>Total Pax: {data.numberOfPeoples} Person</p>
        <p className='my-3 text-md tracking-wide t-shadow'>Customer Email: {data.customerEmail}</p>
        <p className='my-3 text-md tracking-wide t-shadow'>Customer Mobile: {data.customerMobile}</p>
        <p className='my-3 text-md tracking-wide t-shadow'>Total Booking Amount: {totalValue} for {data.numberOfPeoples} Person</p>
      </div>
      <button onClick={onDeleteHandler} className='mb-2 bg-gradient-to-tr from-gray-900 to-blue-900 px-8 py-2 text-md tracking-wider font-bold rounded-[4px]'>Delete</button>
		</div>
	);
};

export default BookingCard;
