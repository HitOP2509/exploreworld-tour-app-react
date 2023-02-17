import React from 'react';
import { MdEmail, MdCall } from 'react-icons/md';
import { FaClock } from 'react-icons/fa';

const ContactUs = () => {
	//prettier-ignore
	return (
		<section className='max-w-[1280px] p-[1rem] md:px-[3rem] md:mx-auto'>
			<h1 className='text-2xl font-bold pt-2 pb-6'>Contact us</h1>
         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7367.682070119839!2d88.3379954088692!3d22.585048057188875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277bfbb1eeb1b%3A0xc9840aaa8c411199!2sHowrah%20Bridge!5e0!3m2!1sen!2sin!4v1676552780635!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full xsm:h-auto h-[350px] md:h-[450px]'/>
         

         <form action='https://formspree.io/f/xnqydqpe' method="POST" className='flex flex-col gap-8 shadow-inner mt-2 py-10 px-4 rounded-md'>
            <div className='flex flex-col gap-3'>
               <label htmlFor="name" className='text-md font-medium'>Full name</label>
               <input type="text" name='name' id='name' className='shadow-inner h-10 rounded-md' required/>
            </div>
            <div className='flex flex-col gap-3'>
               <label htmlFor="email" className='text-md font-medium'>Email</label>
               <input type="email" name='email' id='email' className='shadow-inner h-10 rounded-md' required/>
            </div>
            <div className='flex flex-col gap-3'>
               <label htmlFor="message" className='text-md font-medium'>Your message</label>
               <textarea type="text" name='message' id='message' className='shadow-inner min-h-[10rem] max-h-[10rem] rounded-md' required/>
            </div>
            <button className='bg-red-700 h-10 text-white text-xl w-full md:w-[10rem] self-end'>Submit</button>
         </form>
		</section>
	);
};

export default ContactUs;
