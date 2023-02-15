import { FaUserAlt, FaHome, FaPlaneDeparture, FaPhoneAlt, FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const MobileBottomNav = () => {
	const [isSignedIn] = useAuthStatus();

	//prettier-ignore
	return (
		<div className='fixed h-14 left-0 right-0 bottom-0 bg-gradient-to-t from-red-700 to-red-900 flex justify-between items-center gap-2 md:hidden px-4 z-[99] pt-2 pb-1 xsm:px-2'>
			<NavLink to='/' className={({isActive})=>isActive?'text-white' : 'text-white opacity-50'}end>
				<span className='flex flex-col justify-center items-center gap-0.5 relative z-[100000000]'>
					<FaHome className='text-xl' />
					<p className='text-sm xsm:text-[0.75rem]'>Home</p>
				</span>
			</NavLink>

			<NavLink to='/packages' className={({isActive})=>isActive?'text-white' : 'text-white opacity-50'}end>
				<span className='flex flex-col justify-center items-center gap-0.5 relative z-[100000000]'>
					<FaPlaneDeparture className='text-xl' />
					<p className='text-sm xsm:text-[0.75rem]'>Packages</p>
				</span>
			</NavLink>

			<NavLink to='/contact-us' className={({isActive})=>isActive?'text-white' : 'text-white opacity-50'}end>
				<span className='flex flex-col justify-center items-center gap-0.5 relative z-[100000000]'>
					<FaPhoneAlt className='text-xl' />
					<p className='text-sm xsm:text-[0.75rem]'>Contact</p>
				</span>
			</NavLink>

			<NavLink to='/saved-trips' className={({isActive})=>isActive?'text-white' : 'text-white opacity-50'}end>
				<span className='flex flex-col justify-center items-center gap-0.5 relative z-[100000000]'>
					<FaHeart className='text-xl' />
					<p className='text-sm xsm:text-[0.75rem]'>Saved</p>
				</span>
			</NavLink>

			{!isSignedIn && <NavLink to='/sign-in' className={({isActive})=>isActive?'text-white' : 'text-white opacity-50'}end>
				<span className='flex flex-col justify-center items-center gap-0.5 relative z-[100000000]'>
					<FaUserAlt className='text-xl' />
					<p className='text-sm xsm:text-[0.75rem]'>Sign in</p>
				</span>
			</NavLink>}

			{isSignedIn && <NavLink to='/profile' className={({isActive})=>isActive?'text-white' : 'text-white opacity-50'}end>
			<span className='flex flex-col justify-center items-center gap-0.5 relative z-[100000000]'>
					<FaUserAlt className='text-xl' />
					<p className='text-sm '>Profile</p>
				</span>
			</NavLink>}
		</div>
	);
};

export default MobileBottomNav;
