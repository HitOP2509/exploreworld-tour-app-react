import React, { useCallback, useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../auth/firebase-config';
import { Link, useActionData, useNavigate, useParams } from 'react-router-dom';
import SwiperSlider from '../components/SwiperSlider';
import Spinner from '../components/Spinner';
import BookingForm from '../components/BookingForm';

import {
	MdLocationOn,
	MdOutlineFastfood,
	MdNearMe,
	MdSkateboarding,
	MdNightShelter,
	MdDirectionsTransitFilled,
	MdMap,
	MdSupportAgent,
} from 'react-icons/md';
import { FaHeart, FaRegHeart, FaRegQuestionCircle } from 'react-icons/fa';
import ModalBookingForm from '../components/ModalBookingForm';

const ListingDetails = (props) => {
	const params = useParams();
	const [modalOpen, setIsModalOpen] = useState(false);
	const [listingData, setListingData] = useState(undefined);
	const hotel = listingData && listingData.inclusions.includes('Hotel');
	const meals = listingData && listingData.inclusions.includes('Meals');
	const tickets = listingData && listingData.inclusions.includes('Train/Air Tickets');
	const activities = listingData && listingData.inclusions.includes('Activities');
	const sightseeing = listingData && listingData.inclusions.includes('Sightseeing');
	const navigate = useNavigate();

	useEffect(() => {
		(async function () {
			const docRef = doc(db, 'listings', params.id);
			const docSnap = await getDoc(docRef);
			const listingData = docSnap.data();
			if (!listingData) {
				setListingData('error');
				return null;
			}
			setListingData({
				id: params.id,
				...listingData,
			});
		})();
	}, [params.id]);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);
	const openModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);
	const onContanctClickHandler = useCallback(() => {
		navigate('/contact-us');
	}, []);
	const onEnquiryClickHandler = useCallback(() => {
		openModal();
	}, []);
	if (!listingData) return <Spinner />;
	if (listingData === 'error') return <h3 className='text-2xl pt-6 px-12'>Something went wrong!!!</h3>;

	//prettier-ignore
	if (listingData) return (
		<>
			{modalOpen && <ModalBookingForm openModal={openModal} closeModal={closeModal} show={modalOpen}/>}
			<SwiperSlider imagesArray={listingData.imagesUrl}/>
			<div className='relative max-w-[1280px] mx-auto pt-4 md:pt-8 md:grid md:grid-cols-colOneFourth md:px-[3rem] px-[1rem] gap-4'>
				<div className=''>
					<div className='xsm:block flex justify-between items-center'>
						<h1 className='text-2xl font-bold pt-2 pb-6'>{listingData.name}</h1>
						<p className='text-md sm:text-[1.25rem] font-bold'>Price: ₹{listingData.discountedPrice || listingData.regularPrice}</p>
					</div>
					<div className='flex justify-start items-center mt-6 gap-6 sm:gap-8 -ml-1'>
                  <Link to={`/packages/${listingData.type[0]}/${listingData.destination.toLowerCase()}`}>
   						<div className='flex items-center justify-center'>
   							<MdLocationOn className='text-red-700 text-xl -ml-1 mr-1'/>
   							<p className='text-red-700 text-[1rem] font-bold'>{listingData?.destination.slice(0,1).toUpperCase()+listingData?.destination.slice(1).toLowerCase()}</p>
   						</div>
                  </Link>
						<Link to={`/packages/${listingData.type[0].toLowerCase()}`}>
							<div className='flex items-center justify-center'>
								<MdMap className='text-red-700 text-xl -ml-1 mr-1'/>
								<p className='text-red-700 text-[1rem] font-bold'>{listingData.type[0].slice(0,1).toUpperCase()+listingData.type[0].slice(1).toLowerCase()}</p>
							</div>
						</Link>
					</div>
					<div className='border-y my-3 md:my-6 border-[#ccc] px-1'>
						<h3 className='pt-3 md:pt-4 text-lg font-bold'>Inclusions:</h3>
              <div className='flex max-w-full justify-start items-end gap-4 pt-2 pb-3 md:pb-4'>
                {hotel && <div className='flex flex-col items-center w-auto'>
                  <span className='bg-white hover:bg-red-700 cursor-pointer transition-all rounded-full shadow-outer hover:text-white'>
                    <MdNightShelter className='text-red-700 text-[2.5rem] hover:text-white p-2'/>
                  </span>
                  <p className='text-[0.7rem] sm:text-[0.7rem] tracking-wide font-[400] text-gray-700'>Hotel</p>
                  </div> }
                {tickets && <div className='flex flex-col items-center w-auto'>
                    <span className='bg-white hover:bg-red-700 cursor-pointer transition-all rounded-full shadow-outer hover:text-white'>
                      <MdDirectionsTransitFilled className='text-red-700 text-[2.5rem] hover:text-white p-2 transition-colors'/>
                    </span>
                    <p className='text-[0.7rem] sm:text-[0.7rem] tracking-wide font-[400] text-gray-700'>Tickets</p>
                  </div> }
                {meals && <div className='flex flex-col items-center w-auto'>
                    <span className='bg-white hover:bg-red-700 cursor-pointer transition-all rounded-full shadow-outer hover:text-white'>
                      <MdOutlineFastfood className='text-red-700 text-[2.5rem] hover:text-white p-2 transition-colors'/>
                    </span>
                    <p className='text-[0.7rem] sm:text-[0.7rem] tracking-wide font-[400] text-gray-700'>Meals</p>
                  </div> }
                {activities && <div className='flex flex-col items-center w-auto'>
                    <span className='bg-white hover:bg-red-700 cursor-pointer transition-all rounded-full shadow-outer hover:text-white'>
                      <MdSkateboarding className='text-red-700 text-[2.5rem] hover:text-white p-2 transition-colors'/>
                    </span>
                    <p className='text-[0.7rem] sm:text-[0.7rem] tracking-wide font-[400] text-gray-700'>Activities</p>
                </div>}
                {sightseeing && <div className='flex flex-col items-center w-auto'>
                    <span className='bg-white hover:bg-red-700 cursor-pointer transition-all rounded-full shadow-outer hover:text-white'>
                      <MdNearMe className='text-red-700 text-[2.5rem] hover:text-white p-2 transition-colors'/>
                    </span>
                    <p className='text-[0.7rem] sm:text-[0.7rem] tracking-wide font-[400] text-gray-700'>Sightseeing</p>
                </div> }
              </div>
          </div>
					<div className='px-1'>
						<h3 className='text-lg font-bold'>Description:</h3>
						<div className='mt-4'>{listingData.description.split('. ').map((p, i)=><p key={i}>{p}.<br/><br/></p>)}</div>
					</div>
				</div>
				<BookingForm className='hidden md:block relative' />
			</div>
			<div className='fixed grid grid-cols-2 justify-center items-center inset-x-0 bottom-0 h-16 bg-gradient-to-t from-red-700 to-red-900 gap-5 md:hidden z-[99999] p-2'>

				<button className='bg-white text-red-700 font-[500] h-full flex justify-center items-center gap-2 leading-none' onClick={onEnquiryClickHandler}>Enquiry <FaRegQuestionCircle className='text-lg'/></button>

				<button className='text-white border-[#ccc] font-[500] h-full border-2 flex justify-center items-center gap-2 leading-none' onClick={onContanctClickHandler}>Contact us <MdSupportAgent className='text-2xl'/></button>

			</div>
		</>
	);
};

export default ListingDetails;
