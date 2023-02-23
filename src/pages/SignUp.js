import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef, useState } from "react";
import {
    Form,
    Link,
    redirect,
    useActionData,
    useNavigate,
    useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import createUser from "../auth/sign-up";
import GoogleSignInButton from "../components/GoogleSignInButton";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState("password");
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const navigation = useNavigation();
    const navigate = useNavigate();
    const isSubmitting = navigation.state === "submitting";
    const submitMessage = useActionData();

    function eyeClick(e) {
        e.preventDefault();
        setShowPassword((prev) => (prev === "password" ? "text" : "password"));
    }

    useEffect(() => {
        if (submitMessage === "success") {
            toast.success("Signed up successfully");
            navigate(-2);
        }
    }, [submitMessage]);

    //prettier-ignore
    return (
		<section className='container lg:px-3 md:py-12 h-full max-w-7xl mx-auto'>
			<h1 className='text-2xl font-bold pt-2 pb-6 text-center'>Sign up as a new user</h1>

			<div className='flex flex-wrap justify-center items-center m-6 lg:m-12 gap-8 md:m-8'>
				<div className='w-[85%] md:w-[67%] lg:w-[50%] md:mb-6 md:max-h-[500px!important] object-cover'>
					<img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?w=740&t=st=1675021204~exp=1675021804~hmac=460d5c75c7cf0422475368d5601f8cb522a3ba3e9d74dc5208e0f60545f18ca2" alt="sign-in" defer className='w-full rounded-2xl md:max-h-[500px!important] object-contain'/>
				</div>

					<Form method='post' className='w-[85%] xsm:w-[95%] md:w-[67%] lg:w-[40%] flex flex-col justify-center items-center relative'>
						{submitMessage && <p className='w-full text-left text-red-600 h- pb-6'>{submitMessage.message}</p>}
						<input name='name' ref={nameRef} id='name' placeholder='Full name' type='text' className='w-full h-12 pl-2 rounded-md mb-5 border-slate-400 border focus:outline-0 focus:border-2 placeholder:text-xl' />
						
						<input name='email' ref={emailRef} id='email' placeholder='Email address' type='email' className='w-full h-12 pl-2 rounded-md mb-5 border-slate-400 border focus:outline-0 focus:border-2 placeholder:text-xl'/>
						
					<div className='w-full relative'>
						<input name='password' ref={passwordRef} id='password' placeholder='Password' type={showPassword} className='w-full h-12 pl-2 rounded-md mb-10 border-slate-400 border focus:outline-0 focus:border-2 placeholder:text-xl '/>
						<button type='button' className='absolute top-[17.5%] right-4 text-xl' onClick={eyeClick}>{showPassword==='password'?<FaEye/>:<FaEyeSlash/>}</button>
					</div>
					<div className='md:flex justify-between w-full mb-5'>
						<span className='flex items-center gap-2 md: mb-4 text-sm'> <p>Already have an account? </p> <Link to='/sign-in'> <p className='text-red-700 font-medium'> Login here</p></Link> </span>
						<span> <Link to='/forgot-password'><p className='text-red-700 text-sm font-medium'>Forgot password?</p></Link> </span>
					</div>

					<button className={`bg-red-700 text-white w-full h-10 text-medium ${isSubmitting?'opacity-80 cursor-not-allowed':''}`} disabled={isSubmitting}>{isSubmitting? 'Submitting': 'Sign Up'}</button>
					<div className='w-full flex items-center my-4 before:flex-1 before:border-t before:border-gray-400 before:mt-0.5 after:flex-1 after:border-t after:border-gray-400 after:mt-0.5'>
						<p className='text-center font-semibold mx-4 mb-0'>OR</p>
					</div>
					
					<GoogleSignInButton/>
				</Form>
			</div>
			
		</section>
	);
};

export default SignUp;

export async function action({ request, params }) {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("name");

    //Invoking createUser function to create new user
    const authResponse = await createUser(email, password, name);

    if (authResponse === "name")
        return { res: "name", message: "Invalid Name Input" };
    if (authResponse === "email")
        return { res: "email", message: "Invalid Email Input" };
    if (authResponse === "emailExist")
        return {
            res: "emailExist",
            message: "Email already Exist. Please try to login.",
        };
    if (authResponse === "password" || password.length < 6)
        return {
            res: "password",
            message: "Invalid password input. Try a different password",
        };

    if (authResponse && authResponse === "added") return "success";

    toast.error("Something went wrong. Please try to use a strong password.");
    return null;
}
