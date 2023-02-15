import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { googleAuth } from '../auth/google-auth';

const GoogleSignInButton = () => {
	const navigate = useNavigate();
	async function googleSignIn() {
		const data = await googleAuth();
		if (data) {
			toast.success('User authenticated');
			navigate(-1);
		}
	}
	//prettier-ignore
	return (
		<button type='button' onClick={googleSignIn} className='bg-blue-900 text-white w-full h-10 text-medium flex justify-center items-center gap-2'> Continue with <FcGoogle className='bg-white text-xl rounded-full	' />
		</button>
	);
};

export default GoogleSignInButton;
