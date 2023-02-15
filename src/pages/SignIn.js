import React, { useEffect, useState } from 'react';
import { Form, Link, redirect, useActionData, useNavigation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebase-config';
import { toast } from 'react-toastify';

const SignIn = () => {
	const [show, setShow] = useState('password');
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const actionData = useActionData();

	function showPassword(e) {
		setShow((prev) => (prev === 'password' ? 'text' : 'password'));
	}

	//prettier-ignore
	return (
		<section className='container py-2 lg:px-4 md:py-12 h-full max-w-7xl mx-auto'>
			<h1 className='text-2xl font-bold pt-2 pb-6 text-center'>Sign in to your account</h1>

			<div className='flex flex-wrap justify-center items-center m-3 lg:m-12 gap-8 md:m-8'>
				<div className='w-[85%] md:w-[67%] lg:w-[50%] md:mb-6 md:max-h-[500px!important] object-cover'>
					<img src="https://img.freepik.com/free-vector/my-password-concept-illustration_114360-3864.jpg?w=740&t=st=1675021594~exp=1675022194~hmac=4898a4d02369a809e1c91d790cec5c188b62c3c3947386042de91fd9112dbdc3" alt="sign in header" defer className='w-full rounded-2xl md:max-h-[500px!important] object-contain'/>
				</div>

				<Form method='post' action='/sign-in' className='w-[85%] xsm:w-[95%] md:w-[67%] lg:w-[40%] flex flex-col justify-center items-center'>
					{actionData === 'wrongEmail' && <p className='w-full text-left text-red-600 mb-3'>No user found with this email.</p>}
					<input name='email' placeholder='Email address' type='email' className='w-full h-12 pl-2 rounded-md mb-5 border-slate-400 border focus:outline-0 focus:border-2 placeholder:text-xl'/>
					{actionData === 'wrongPassword' && <p className='w-full text-left text-red-600 mb-3'>Invalid password.</p>}
					<div className='w-full relative'>
					<input name='password' placeholder='Password' type={show} className='w-full h-12 pl-2 rounded-md mb-4 md:mb-10 border-slate-400 border focus:outline-0 focus:border-2 placeholder:text-xl relative'/>

					<button type='button' className='absolute top-[17.5%] right-4 text-xl' onClick={showPassword}>{show==='password'?<FaEye/>:<FaEyeSlash/>}</button>
					</div>

					<div className='md:flex justify-between w-full mb-5'>
						<span className='flex items-center gap-2 md: mb-4 text-sm'> <p>Don't have an account? </p> <Link to='/sign-up'><p className='text-red-700 font-medium'> Register</p></Link> </span>
						<span> <Link to='/forgot-password'><p className='text-red-700 text-sm font-medium'>Forgot password?</p></Link> </span>
					</div>

					<button className={`bg-red-700 text-white w-full h-10 text-medium ${isSubmitting?'opacity-80 cursor-not-allowed':''}`} disabled={isSubmitting}>{isSubmitting? 'Submitting': 'Sign in'}</button>
					<div className='w-full flex items-center my-4 before:flex-1 before:border-t before:border-gray-400 before:mt-0.5 after:flex-1 after:border-t after:border-gray-400 after:mt-0.5'>
						<p className='text-center font-semibold mx-4 mb-0'>OR</p>
					</div>
					<GoogleSignInButton/>
				</Form>
			</div>

		</section>
	);
};

export default SignIn;

export const action = async function ({ request }) {
	try {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			toast.info('Invalid sign-in details');
			return null;
		}

		//Sign in function
		await setPersistence(auth, browserSessionPersistence);
		const userCredentials = await signInWithEmailAndPassword(auth, email, password);

		if (userCredentials.user) {
			toast.success('Signed in successfully');
			return redirect('/');
		}
		return null;
	} catch (error) {
		if (error.message.includes('user-not-found')) {
			toast.error('Invalid Email');
			return 'wrongEmail';
		}
		if (error.message.includes('wrong-password')) {
			toast.error('Invalid Password');
			return 'wrongPassword';
		}
		console.log(error.message);
		return null;
	}
};
