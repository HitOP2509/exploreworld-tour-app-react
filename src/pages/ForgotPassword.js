import React from 'react';
import { Form, Link, redirect, useNavigation } from 'react-router-dom';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { auth } from '../auth/firebase-config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting' ? true : false;

	//prettier-ignore
	return (
		<section className='container lg:px-4 md:py-12 h-full max-w-7xl mx-auto'>
			<h1 className='text-2xl font-bold pt-2 pb-6'>Reset your password</h1>

			<div className='flex flex-wrap justify-center items-center m-6 lg:m-12 gap-8 md:m-8 md:max-h-[500px!important] object-cover'>
				<div className='w-[85%] md:w-[67%] lg:w-[50%] md:mb-6'>
					<img src='https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7866.jpg?w=996&t=st=1675021436~exp=1675022036~hmac=1f69181d33f0b04c25656e84074df1f2c4b6697c1a6637e803446eaaaf33187b' alt='forgot password header' defer className='w-full rounded-2xl md:max-h-[500px!important] object-contain' />
				</div>

				<Form method='post' className='w-[85%] xsm:w-[95%] md:w-[67%] lg:w-[40%] flex flex-col justify-center items-center' >
					<input name='email' placeholder='Email address' type='email'
						className='w-full h-12 pl-2 rounded-md mb-5 border-slate-400 border focus:outline-0 focus:border-2 placeholder:text-xl'
					/>

					<div className='md:flex justify-between w-full mb-5'>
						<span className='flex items-center gap-2 md: mb-4 text-sm'>
							<p>Don't have an account? </p>
							<Link to='/sign-up'>
								<p className='text-red-700 font-medium'> Register</p>
							</Link>
						</span>
						
					</div>

					<button className={`bg-red-700 text-white w-full h-10 text-medium ${isSubmitting?'opacity-80 cursor-not-allowed':''}`} disabled={isSubmitting}>{isSubmitting? 'Submitting': 'Reset password'}</button>
					<div className='w-full flex items-center my-4 before:flex-1 before:border-t before:border-gray-400 before:mt-0.5 after:flex-1 after:border-t after:border-gray-400 after:mt-0.5'>
						<p className='text-center font-semibold mx-4 mb-0'>OR</p>
					</div>
					<GoogleSignInButton/>
				</Form>
			</div>
		</section>
	);
};

export default ForgotPassword;

export const action = async function ({ request, params }) {
	try {
		const data = await request.formData();
		const email = data.get('email');
		await sendPasswordResetEmail(auth, email);
		toast.success('Password reset instructions sent to your email.');
		return redirect('/');
	} catch (error) {
		if (error.message.includes('user-not-found')) toast.error('No account found with this email address.');
		return null;
	}
};
