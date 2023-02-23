import { auth, db } from "../auth/firebase-config";
import { updateProfile, updateEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import {
    Form,
    redirect,
    useActionData,
    useNavigate,
    useNavigation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

import { FaLock } from "react-icons/fa";
import ProfileNav from "../components/ProfileNav";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../components/Spinner";

const Profile = () => {
    const actionData = useActionData();
    const navigation = useNavigation();
    const navigate = useNavigate();

    const [isLoggedIn, isLoading] = useAuthStatus();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [showError, setShowError] = useState(null);

    const emailDisabled =
        auth?.currentUser?.providerData[0]?.providerId !== "password";

    const [inputDisabled, setInputDisabled] = useState(true);
    const isSubmitting = navigation.state === "submitting";

    const editClick = () => setInputDisabled(false);
    const cancelClick = () => setInputDisabled(true);

    const existingName = auth?.currentUser?.displayName;
    const existingEmail = auth?.currentUser?.email;

    useEffect(() => {
        if (!isLoading && !isLoggedIn) navigate("/sign-in");
    }, [isLoading, isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            setName(existingName);
            setEmail(existingEmail);
        }
    }, [existingName, existingEmail, isLoggedIn]);

    useEffect(() => {
        if (actionData === "success") {
            setInputDisabled(true);
            toast.success("Profile updated successfully");
        }
        if (actionData?.type === "password-error") {
            setShowError(true);
        }
    }, [actionData]);

    function inputChangeHandler(e) {
        if (e.target.id === "name") {
            setName(e.target.value);
            setShowError(false);
        }
        if (e.target.id === "email") {
            setEmail(e.target.value);
            setShowError(false);
        }
    }

    if (isLoading) return <Spinner />;

    //prettier-ignore
    return (
		<>
		<ProfileNav/>
		<section className='max-w-[550px] w-[90%] mx-auto px-3 lg:pt-10 sm:pt-6'>
			<h1 className='text-2xl font-bold pt-2 pb-6'>My Profile</h1>
			<Form method='post' className='max-w-[550px] mx-auto mt-6 w-full '>
				{showError && actionData==='name' && <p>Name can't be empty</p>}
				<input name='name' value={name} onChange={inputChangeHandler} id='name' type='text' className='w-full h-10 pl-2 rounded-md mb-5 text-gray-700 text-l font-[500] border-slate-400 border  focus:outline-0 focus:border-2 placeholder:text-xl' disabled={inputDisabled}/>
				{actionData==='email' && <p>Email can't be empty</p>}
				{showError && actionData?.type==='password-error' &&
					<p>Can't update the email as you're signed in using {actionData.provider}</p>}
				<div className='relative h-10 mb-4'>
					<input name='email' value={email} onChange={inputChangeHandler} id='email' type='email' disabled={inputDisabled || emailDisabled}
					className={`${emailDisabled?'opacity-70 cursor-not-allowed':'opacity-100'} w-full h-full pl-2 rounded-md mb-5 text-gray-700 text-l font-[500] border-slate-400 border  focus:outline-0 focus:border-2 placeholder:text-xl`}/>
					<FaLock className={`absolute right-5 top-3 ${emailDisabled?'opacity-70 cursor-not-allowed text-gray-700':'hidden'}`}/>
				</div>

				<div className='text-right'>
					{inputDisabled && <button type='button' onClick={editClick} className='bg-red-700 text-white rounded-[3px] px-6 py-1.5 text-md'>Edit details</button>}
					{!inputDisabled && <button onClick={cancelClick} className={`bg-red-700 text-white rounded-[3px] px-8 py-1.5 text-md ${isSubmitting && 'cursor-not-allowed'}`}>Cancel</button>}
					{(!inputDisabled) && <button className={` text-white rounded-[3px] px-8 py-1.5 ml-4 text-md ${(isSubmitting) ? 'cursor-not-allowed bg-red-400' : 'bg-red-700 cursor-pointer'}`}  disabled={isSubmitting}>{isSubmitting? 'Updating...':'Update'}</button>}
				</div>
			</Form>
		</section>
		</>
	);
};

export default Profile;

export async function action({ request }) {
    try {
        const data = await request.formData();
        const name = data.get("name");
        const email = data.get("email");

        if (
            auth.currentUser.providerData[0].providerId !== "password" &&
            email !== auth.currentUser.email
        )
            return {
                type: "password-error",
                provider: auth.currentUser.providerData[0].providerId,
            };

        if (!name) return "name";
        if (!email) return "email";
        const newDetails = {
            displayName: name,
        };

        if (auth.currentUser.displayName.trim() !== name.trim())
            await updateProfile(auth.currentUser, newDetails);
        if (
            auth.currentUser.providerData[0].providerId === "password" &&
            auth.currentUser.email.trim() !== email.trim()
        )
            await updateEmail(auth.currentUser, email);

        const updatedData = {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
        };

        setDoc(doc(db, "users", auth.currentUser.uid), updatedData, {
            merge: true,
        });
        return "success";
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
