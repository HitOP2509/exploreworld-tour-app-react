import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { MdDelete } from 'react-icons/md';
import { v4 as uuidV4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { Form, useActionData, useNavigation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../auth/firebase-config';

import deleteImage from '../utilFuncs/deleteImage';

const CreateListing = () => {
	const actionData = useActionData();

	const [images, setImages] = useState(null);
	const [imagesUrl, setImagesUrl] = useState(null);
	const [uploadStatus, setUploadStatus] = useState('');
	const [uploadError, setUploadError] = useState('');
	const [hideUpload, setHideUpload] = useState(false);

	const imageRef = useRef(null);

	const navigate = useNavigate();
	const navigation = useNavigation();

	useEffect(() => {
		if (actionData?.type === 'error') toast.error(actionData?.message);
	}, [actionData?.type]);

	//Image change handler
	function onImageChange(image) {
		const selectedImages = [...image.target.files];

		const oversizedImages = selectedImages.filter((img) => {
			if (Math.ceil(img.size / 1024) > 2045) return img;
		});

		if (oversizedImages.length > 0) {
			setUploadError('Error. Upload images smaller than 2MB');
			return;
		}
		if (oversizedImages.length === 0) {
			setUploadError('');
			setImages([...selectedImages]);
			if (selectedImages.length >= 5) setHideUpload(true);
			imageRef.current.value = null;
		}
	}

	//Uploading images to firestore after image change validation
	useEffect(() => {
		function uploadHandle() {
			const storage = getStorage();

			if (images)
				images.forEach((image) => {
					const fileName = `${auth.currentUser.uid}-${image.name}-${uuidV4()}`;
					const storageRef = ref(storage, fileName);
					const uploadTask = uploadBytesResumable(storageRef, image);

					//prettier-ignore
					uploadTask.on( 'state_changed', (snapshot) => {
							const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							if(progress === 100) setImages(null) //resetting images back to null to stop reuploading the same image

							if(snapshot.state === 'paused') setUploadStatus(`Paused (${progress}% done)`);
							else if(snapshot.state === 'running') {
								if(progress<100)setUploadStatus('Upload is ' + progress + '% done');
								if(progress===100)setUploadStatus('Uploaded successfully');
							};
					
						},
						(error) => {
							toast.error('Failed to upload images. Please try other images.');
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
								setImagesUrl(prev=>{
									if (prev) return [...prev, downloadURL]
									if(!prev) return [downloadURL]
								});
							});
						}
					);
				});
		}
		uploadHandle();
	}, [images]);

	//Form data submission to firestore db
	useEffect(() => {
		const tourId = auth.currentUser.uid;
		//Getting form data and Image urls
		const formData = actionData &&
			imagesUrl &&
			actionData.type === 'success' && {
				...actionData.data,
				userRef: tourId,
				imagesUrl: imagesUrl ?? [],
				createdAt: new Date().toISOString(),
			};

		//Adding form data to database
		if (formData) {
			const submitData = async function () {
				try {
					//Adding to listings Collection
					const docRef = await addDoc(collection(db, 'listings'), formData);
					toast.success('Tour added successfully');
					// navigate(-1);
				} catch (error) {
					console.log(error);
					toast.error('Something went wrong...');
				}
			};
			submitData();
		}
	}, [actionData]);

	//Updating Image URLs after image delete
	function imageDeleteHandler(url) {
		deleteImage(url);
		const updatedImages = imagesUrl.filter((imgUrl) => imgUrl !== url);
		setImagesUrl(updatedImages);
	}

	//prettier-ignore
	return (
		<section className="max-w-screen-2xl mx-auto lg:px-[3rem] px-4 py-8">
			<h1 className="text-3xl text-center font-[500]">Create your trip</h1>
			<div className='max-w-[750px] mx-auto my-10'>
				<div className='w-full px-6 py-3 mt-5 mb-10 shadow-inner'>
						<p className='text-lg mb-3 font-[500] px-1'>Images for gallery</p>
						{actionData==='inclusion' && <p className='text-red-700 my-2'>Atleast one images should be added**</p>}
						{uploadStatus && !uploadError && <p className='text-red-700 my-2'>{uploadStatus}</p>}
						{uploadError && <p className='text-red-700 my-2'>{uploadError}</p>}
						{imagesUrl && 
							<div className='flex gap-4 max-h-[5rem] shadow-inner px-1 py-4 mb-2'> {imagesUrl.map(url=> (
								<div key={url} className='relative'>
									<img src={url} className='max-w-[3rem] w-full aspect-square object-cover relative'/>
									<button className='absolute z-20 text-red-700 text-xl -top-2 -right-2' onClick={()=>{imageDeleteHandler(url)}}><MdDelete/></button>
								</div>
							))} </div>
						}
						{!hideUpload && <>
							<p className='text-sm mb-3 px-1 text-gray-600'>You can submit upto 5 images. First image will be the cover photo</p>
						
							<input type="file" ref={imageRef} name='images' onChange={onImageChange} accept='.jpg,.png,.jpeg,.webp' multiple required
							className='w-full h-12 px-1 text-md'/>
						</>}
					</div>
			</div>
			
			<Form method='post' className='max-w-[750px] mx-auto my-10'> 
				<div className='px-6'>
					<p className='text-lg mb-3 font-[500] px-1'>Package Name <sup>*</sup></p>
					{actionData==='name' && <p className='text-red-700 my-2'>Required Field**</p>}
					<input type="text" name='package-name' id='package-name' placeholder='e.g: Mesmerizing Uttarakhand' maxLength='75' required className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'/>
				</div>
				<div className='w-full px-6 my-10'>
					<p className='text-lg mb-3 font-[500] px-1'>Description <sup>*</sup></p>
					{actionData==='description' && <p className='text-red-700 my-2'>Required Field**</p>}
					<textarea type="text" name='description' id='description' placeholder='Type trip details here...' required className='w-full h-[10rem] rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'/>
				</div>
				<div className='w-full px-6 my-10'>
					<p className='text-lg mb-3 font-[500] px-1'>Destination <sup>*</sup></p>
					{actionData==='destination' && <p className='text-red-700 my-2'>Required Field**</p>}
					<input type="text" name='destination' id='destination' placeholder='e.g: Uttarakhand' maxLength='50' required className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'/>
				</div>
				<div className='w-full px-6 my-10'>
					<p className='text-lg mb-3 font-[500] px-1'>Tour type <sup>*</sup></p>
					{actionData==='type' && <p className='text-red-700 my-2'>Required Field**</p>}
					<select name="type" id="type" required className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'>
						<option value=''> -- select an option -- </option>
						<option value="domestic">Domestic</option>
						<option value="international">International</option>
					</select>
				</div>
				<div className='w-full px-6 my-10'>
					<p className='text-lg mb-3 font-[500] px-1'>Max Tourist <sup>*</sup></p>
					{actionData==='maxTourist' && <p className='text-red-700 my-2'>Required Field**</p>}
					<select name="max-tourist" id="max-tourist" required className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'>
						<option disabled value> -- select an option -- </option>
						<option value="1-10">1-10</option>
						<option value="11-30">11-30</option>
						<option value="31-50">31-50</option>
						<option value="50-99">50-99</option>
						<option value="99+">99+</option>
					</select>
				</div>
				<div className='w-full px-6 my-10'>
					<p className='text-lg mb-3 font-[500] px-1'>{'Regular Price per person (In ₹)'} <sup>*</sup></p>
					{actionData==='regularPrice' && <p className='text-red-700 my-2'>Invalid input**</p>}
					<input type="number" name='regular-price' id='regular-price' placeholder='e.g. 9999' defaultValue='1000' min='1' required className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'/>
				</div>
				<div className='w-full px-6 my-10'>
						<p className='text-lg mb-3 font-[500] px-1'>{'Discounted Price per person (In ₹) - If any'}</p>
						{actionData==='discountedPrice' && <p className='text-red-700 my-2'>Invalid input**</p>}
						<input type="number" name='discounted-price' id='discounted-price' placeholder='e.g. 9999' className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'/>
				</div>
				<div className='w-full px-6 my-10'>
						<p className='text-lg mb-3 font-[500] px-1'>Inclusions<sup>*</sup></p>
						{actionData==='inclusion' && <p className='text-red-700 my-2'>Atleast one box should be checked**</p>}
					<div className='sm:flex gap-5 items-start px-1 h-12'>
						<div className='flex items-center gap-2 text-md font-[500] text-gray-800'>
							<label>Hotel</label>
							<input type="checkbox" name='inclusions' id='Hotel' value='Hotel' className='w-4 h-4'/>
						</div>
						<div className='flex items-center gap-2 text-md font-[500] text-gray-800'>
							<label>Sideseeing</label>
							<input type="checkbox" name='inclusions' id='sightseeing' value='Sightseeing' className='w-4 h-4'/>
						</div>
						<div className='flex items-center gap-2 text-md font-[500] text-gray-800'>
							<label>Meals</label>
							<input type="checkbox" name='inclusions' id='Meals' value='Meals' className='w-4 h-4'/>
						</div>
						<div className='flex items-center gap-2 text-md font-[500] text-gray-800'>
							<label>Train/Air Tickets</label>
							<input type="checkbox" name='inclusions' id='Train/Air Tickets' value='Train/Air Tickets' className='w-4 h-4'/>
						</div>
					</div>
				</div>
				<div className='w-full px-6'>
					<button type='submit' className={`w-full h-12 text-lg text-white font-medium ${!imagesUrl ? 'bg-red-400 cursor-not-allowed' : 'bg-red-700 cursor-pointer'}`} disabled={!imagesUrl}>Submit</button>
				</div>
			</Form>			
		</section>
	);
};

export default CreateListing;

//Form submit action and form data validation
export async function action({ request }) {
	const data = await request.formData();

	const name = data.get('package-name').trim();
	const description = data.get('description').trim();
	const destination = data.get('destination').trim();
	const type = data.get('type');
	const maxTourist = data.get('max-tourist');
	const regularPrice = data.get('regular-price');
	const discountedPrice = data.get('discounted-price');
	const inclusions = data.getAll('inclusions');

	if (!name) return { type: 'error', name: 'name', message: 'Invalid Name' };
	if (!description) return { type: 'error', name: 'description', message: 'Invalid Description' };
	if (!destination) return { type: 'error', name: 'destination', message: 'Invalid Destination' };
	if (!type) return { type: 'error', name: 'type', message: 'Invalid Tour type' };
	if (!maxTourist) return { type: 'error', name: 'maxTourist', message: 'Invalid Max number of tourist' };
	if (regularPrice < 1) return { type: 'error', name: 'regularPrice', message: 'Invalid Regualr price' };
	if (discountedPrice < 0) return { type: 'error', name: 'discountedPrice', message: 'Invalid Discounted Price' };
	if (inclusions.length < 1) return { type: 'error', name: 'inclusion', message: 'Invalid Inclusions' };

	const tripData = {
		name,
		description,
		destination: destination.split(' ').join('-').toLowerCase(),
		type: [type.toLowerCase()],
		maxTourist,
		regularPrice,
		discountedPrice,
		inclusions,
	};
	return { type: 'success', data: tripData };
}
