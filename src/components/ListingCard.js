import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userDetailsAction } from '../state/userDetailsSlice.js';
import Moment from 'react-moment';
import { MdLocationOn, MdDelete } from 'react-icons/md';
import { FaHeart, FaPencilAlt, FaRegHeart } from 'react-icons/fa';
import onTripDelete from '../utilFuncs/onTripDelete';
import onTripLike from '../utilFuncs/onTripLike';
import { toast } from 'react-toastify';
import { useAuthStatus } from '../hooks/useAuthStatus.js';

export default function ListingCard({ listing, className }) {
	const { uid, likedTrips } = useSelector((state) => state.userDetails);
	const [isLoggedIn] = useAuthStatus();
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const formatCurrency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

	const { id, destination, name, regularPrice, discountedPrice, createdAt, imagesUrl, inclusions, maxTourist, type } =
		listing;
	// const tourType = `${type[0].slice(0, 1).toUpperCase()}${type.slice(1)}`;

	const hotel = inclusions.includes('Hotel');
	const meals = inclusions.includes('Meals');
	const tickets = inclusions.includes('Train/Air Tickets');
	const activities = inclusions.includes('Activities');
	const sightseeing = inclusions.includes('Sightseeing');
	const [isLiked, setIsLiked] = useState(null);

	useEffect(() => {
		const isLiked = likedTrips ? likedTrips.filter((trips) => trips.id === id) : [];
		isLoggedIn ? setIsLiked(isLiked.length >= 1) : setIsLiked(false);
	}, [likedTrips, id, isLoggedIn]);

	function onDeleteHandler() {
		const isDeleted = onTripDelete(id);
		if (isDeleted) {
			toast.success('Trip Deleted Succesfully.');
			navigate('/profile');
		}
		if (!isDeleted) toast.error('Something went wrong.');
	}

	async function onLikeHandler() {
		if (!isLoggedIn) {
			toast.info('Please sign in to continue');
			navigate('/sign-in');
		}
		if (isLoggedIn) {
			const updatedLikedListings = await onTripLike(likedTrips, listing);
			dispatch(userDetailsAction.setLikedTrips({ likedTrips: updatedLikedListings }));
		}
	}

	//prettier-ignore
	return (
		<li className={`bg-white hover:shadow-xl rounded-md overflow-hidden shadow-inner transition-shadow duration-150 relative mb-4 list-none ${className} `}>
			<div className='relative'>
        <Link to={`/packages/${type[0]}/${destination.toLowerCase()}/${id}`}>

          <img src={imagesUrl[0]??'https://cdn.dribbble.com/users/310943/screenshots/2281993/empty-state-illustrations_still_2x.gif?compress=1&resize=400x300'} alt={name} className='rounded-customMb w-full max-h-[300px] object-cover aspect-video' loading='lazy'/>

          <Moment fromNow className='absolute top-2 left-2 text-white bg-red-700 rounded-md px-2 py-1 text-xs text-center shadow-lg'>{createdAt}</Moment>
          
          <div className='px-4 py-2'>
            <div className='flex justify-between'>
              <div className='flex justify-start pb-4'>
                <div className='flex items-center justify-center'>
                  <MdLocationOn className='text-red-700 text-md -ml-1 -mt-[0.05rem] mr-[.15rem]'/>
                  <p className='text-[0.85rem] text-gray-800 line-clamp-1 font-[700]'>{destination}</p>
                </div>
                {/* <div className='flex items-center justify-center px-3 sm:px-[1rem]'>
                  <MdMap className='text-red-700 text-md sm:text-xl mr-1 '/>
                  <p className='text-[0.75rem] sm:text-sm text-gray-800 font-medium'>{tourType}</p>
                </div> */}
              </div>
            
            </div>
            <h3 className='text-lg font-bold mb-5 line-clamp-1'>{name}</h3>
            <div className='flex gap-3 mb-4 xsm:text-[0.75rem] text-[0.85rem] font-bold text-gray-900'>
              {discountedPrice && <p>{formatCurrency.format(discountedPrice)}</p>}
              {discountedPrice ? <s className='text-gray-600'>{formatCurrency.format(regularPrice)}</s>:<p>{formatCurrency.format(regularPrice)}</p>}
            </div>

            {/* <div className='border-t-2 border-[#ccc] pt-2 pb-0 -mx-4'>
              <div className='flex max-w-full justify-start items-end gap-4 px-3'>
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
            </div> */}
          </div>
        </Link>
        {pathname!=='/listings' && <>
          <button className='absolute top-0 right-0 text-red-700 text-2xl p-3' onClick={onLikeHandler}>{isLiked?<FaHeart/>:<FaRegHeart/>}</button>
        </>}
        {pathname==='/listings' && <>
          <button className='absolute top-2 right-2 bg-white bg-opacity-40 backdrop-blur-sm p-1 text-red-700 text-2xl mr-1 rounded-full' onClick={onDeleteHandler}><MdDelete/></button>
          <Link to={`/listings/edit/${id}`}>
            <button className='absolute top-2 right-12 bg-white bg-opacity-40 backdrop-blur-sm p-1.5 text-red-700 text-xl mr-1 rounded-full'><FaPencilAlt/></button>
          </Link>
        </>}
      </div>
		</li>
	);
}
