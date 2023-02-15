import React, { useEffect, useState } from 'react';
import BookingForm from './BookingForm';
import ReactDOM from 'react-dom';

const Backdrop = function (props) {
	//prettier-ignore
	return (
		<div className={`fixed inset-0 bg-black bg-opacity-70 px-2 z-[999] w-full h-[100vh] ${props.show?'block':'hidden'}`}>
			<BookingForm className={`absolute z-[10000] inset-0 top-[10%] p-4 ${props.show?'block':'hidden'}`} closeModal={props.closeModal}/>
			<div onClick={props.closeModal} className='absolute top-[10.5%] right-1 z-[1000001] bg-white text-black text-xl mr-3 p-2 rounded-full bg-opacity-50 backdrop-blur-md' style={{textShadow:'0px 0px 10px -5px black'}}>❌</div>
		</div>

	)
};

const modalRoot = document.getElementById('modalRoot');

const ModalBookingForm = (props) => {
	//prettier-ignore
	return (
		<>
			{ReactDOM.createPortal(<Backdrop openModal={props.openModal} closeModal={props.closeModal} show={props.show}/>, modalRoot)}
		</>
	);
};

export default ModalBookingForm;
