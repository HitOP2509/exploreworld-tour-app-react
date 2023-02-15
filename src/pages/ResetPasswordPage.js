import { verifyPasswordResetCode } from 'firebase/auth';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Form, useNavigation } from 'react-router-dom';

import { auth } from '../auth/firebase-config';

const ResetPasswordPage = () => {
	const [show, setShow] = useState('password');
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting' ? true : false;

	function showPassword(e) {
		setShow((prev) => (prev === 'password' ? 'text' : 'password'));
	}
	//prettier-ignore
	return (
    <section className='container px-4 py-12 h-full max-w-xl mx-auto'>
      <Form method='post'>
			<div className='w-full relative'>
				<input name='password' placeholder='Password' type={show} className='w-full h-12 pl-2 rounded-md mb-10 border-slate-400 border focus:outline-0 focus:border-2 placeholder:text-xl relative' />
        
				<button type='button' className='absolute top-[17.5%] right-4 text-xl' onClick={showPassword} >
					{show === 'password' ? <FaEye /> : <FaEyeSlash />}
				</button>
			</div>
			<div className='w-full relative'>
      <input name='confirmpassword' placeholder='Confirm Password' type={show} className='w-full h-12 pl-2 rounded-md mb-10 border-slate-400 border focus:outline-0 focus:border-2 placeholder:text-xl relative' />
        
				<button type='button' className='absolute top-[17.5%] right-4 text-xl' onClick={showPassword} >
					{show === 'password' ? <FaEye /> : <FaEyeSlash />}
				</button>
			</div>
      <button className={`bg-red-700 text-white w-full h-10 text-medium ${isSubmitting?'opacity-80 cursor-not-allowed':''}`} disabled={isSubmitting}>{isSubmitting? 'Resetting': 'Reset password'}</button>
					
		</Form>

    </section>
		
	);
};

export default ResetPasswordPage;

export const action = async function ({ request, params }) {
	const data = await request.formData();
	const pass = data.get('password');
	const confirmPass = data.get('confirmpassword');
	// if (pass === confirmPass) verifyPasswordResetCode(auth, code);
	return null;
};
