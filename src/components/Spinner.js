import React from 'react';
import spinner from '../assets/loader.svg';

const Spinner = () => {
	//prettier-ignore
	return (
		<div className='fixed inset-0 z-[999] flex justify-center backdrop-blur-[1px] bg-opacity-50 bg-black'>
			<img src={spinner} alt='' className='m-auto lg:max-w-[5%] sm:max-w-[10%] max-w-[15%]' />
		</div>
	);
};

export default Spinner;
