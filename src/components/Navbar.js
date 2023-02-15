import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CssMod from '../styles/Navbar.module.css';
import logo from '../assets/logo.png';
import { FaHeart, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../auth/firebase-config';

const Navbar = () => {
	const [isLoggedIn] = useAuthStatus();
	const navigate = useNavigate();
	// if (isValidating) return;

	const logout = async function () {
		try {
			await signOut(auth);
			toast.success('Signed out successfully');

			navigate('/');
		} catch (error) {
			console.log(error.code);
		}
	};

	//prettier-ignore
	return (
		<div className='bg-white shadow-nav max-w-full fixed inset-x-0 top-0 h-[60px] z-[999]'>
			<nav className={`${CssMod.navbar} ml-auto mr-auto max-w-[1280px] md:mx-auto sm:px-[4rem] md:px-0`}>
				<NavLink to='/' className={CssMod.logo}><img src={logo} alt="logo" /></NavLink>
				
				<ul className={`${CssMod.navlinks}`}>

					<li className={`${CssMod.list} ${CssMod.hover}`}>
						<NavLink to='/' className={({isActive})=> isActive ? `${CssMod.navlink} ${CssMod.active}`: CssMod.navlink}> Home </NavLink>
					</li>


					{!isLoggedIn && <li className={`${CssMod.list} ${CssMod.hover}`}>
						<NavLink to='/sign-in' className={({isActive})=> isActive ? `${CssMod.navlink} ${CssMod.active}`: CssMod.navlink}> Sign In </NavLink>
					</li>}
					{isLoggedIn && <li className='flex justify-center items-center cursor-pointer'>
						<NavLink to='/saved-trips' className='flex justify-center items-center text-xl'> <FaHeart/> </NavLink>
					</li> }
					{isLoggedIn && <li className='flex justify-center items-center cursor-pointer'>
						<NavLink to='/profile' className='flex justify-center items-center text-xl'> <FaUserAlt/></NavLink>
					</li>}
					
					{isLoggedIn && <li className='flex justify-center items-center cursor-pointer'>
						<button type='button' onClick={logout} className='flex justify-center items-center text-xl'> <FaSignOutAlt/></button>
					</li>}

				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
