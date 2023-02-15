import React from 'react';
import { useRouteError } from 'react-router-dom';
import Header from '../layout/Header';
import errorImg from '../assets/404Page.jpg';
import MobileBottomNav from '../components/MobileBottomNav';

const Error = () => {
	const error = useRouteError();
	//prettier-ignore
	return (
		<>
			<Header />
			<main className='mt-[60px] relative'>
				{error.status === 404 && <img src={errorImg} alt='404 error'/>}
				{error.status !== 404  && <h1 className='text-2xl font-bold pt-2 pb-6'>{error.statusText} ({error.status})</h1>}
			</main>
			<MobileBottomNav />
		</>
	);
};

export default Error;
