import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidV4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { Form, useActionData, useNavigation, useNavigate, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../auth/firebase-config';

import { MdDelete } from 'react-icons/md';
import deleteImage from '../utilFuncs/deleteImage';
import updateImagesUrl from '../utilFuncs/updateImagesUrl';

const EditListing = function () {
	const data = useLoaderData();
	const loaderData = data.data;
	const listingId = data.id;
	const actionData = useActionData();

	const navigate = useNavigate();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	const [images, setImages] = useState(null);
	const [imagesUrl, setImagesUrl] = useState(loaderData.imagesUrl);

	const imageRef = useRef(null);

	const hotel = loaderData.inclusions.includes('Hotel');
	const meals = loaderData.inclusions.includes('Meals');
	const tickets = loaderData.inclusions.includes('Train/Air Tickets');
	const activities = loaderData.inclusions.includes('Activities');
	const sightseeing = loaderData.inclusions.includes('Sightseeing');

	//Image change handler
	function onImageChange(image) {
		const selectedImages = [...image.target.files];

		const oversizedImages = selectedImages.filter((img) => {
			if (Math.ceil(img.size / 1024) > 2045) return img;
		});

		if (oversizedImages.length === 0) {
			setImages([...selectedImages]);
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

							// if(snapshot.state === 'paused') console.log(`Paused (${progress}% done)`);
							// else if(snapshot.state === 'running') {
							// 	if(progress<100)console.log('Upload is ' + progress + '% done');
							// 	if(progress===100)console.log('Uploaded successfully');
							// };

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

	//Updating Listing
	useEffect(() => {
		(async function () {
			if (actionData) {
				const updatedData = {
					...actionData,
					imagesUrl: imagesUrl ?? [],
				};
				const listingRef = doc(db, 'listings', listingId);
				await updateDoc(listingRef, updatedData);
				toast.success('Listing Updated...');
				navigate('/listings');
			}
		})();
	}, [actionData]);

	//Updating Image URLs after image delete
	function imageDeleteHandler(url) {
		deleteImage(url);
		const updatedImages = imagesUrl.filter((imgUrl) => imgUrl !== url);
		updatedImages ? setImagesUrl(updatedImages) : setImagesUrl([]);
		updateImagesUrl(listingId, updatedImages);
	}

	//prettier-ignore
	return (
				<section className="max-w-[1280px] p-[1rem] md:mx-auto md:py-[3rem]">
					<h1 className='text-2xl font-bold pt-2 pb-6'>Edit your listed trip</h1>
					<div className='max-w-[750px] mx-auto my-10'>
						<div className='w-full px-6 py-3 mt-5 mb-10 shadow-inner'>
							<p className='text-lg mb-3 font-[500] px-1'>Images for gallery</p>
							{imagesUrl && <div className='flex gap-4 max-h-[5rem] shadow-inner px-1 py-4 mb-2'>
								{imagesUrl.map(url=> <div key={url} className='relative'>
									<img src={url} className='max-w-[3rem] w-full aspect-square object-cover relative'/>
									<button className='absolute z-20 text-red-700 text-xl -top-2 -right-2' onClick={()=>{imageDeleteHandler(url)}}><MdDelete/></button>
								</div>)} </div> }
							
							<p className='text-sm mb-3 px-1 text-gray-600'>You can submit upto 5 images. First image will be the cover photo</p>
							<input type="file" ref={imageRef} name='images' onChange={onImageChange} accept='.jpg,.png,.jpeg,.webp' multiple required
									className='w-full h-12 px-1 text-md'/>
						</div>
					</div>
					<Form method='post' className='max-w-[750px] mx-auto my-10'>
						<div className='px-6'>
							<p className='text-lg mb-3 font-[500] px-1'>Package Name <sup>*</sup></p>
							<input type="text" name='package-name' id='package-name' placeholder='e.g: Mesmerizing Uttarakhand' defaultValue={loaderData.name} maxLength='75' required className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'/>
						</div>

						<div className='w-full px-6 my-10'>
							<p className='text-lg mb-3 font-[500] px-1'>Description <sup>*</sup></p>
							{actionData==='description' && <p className='text-red-700 my-2'>Required Field**</p>}
							<textarea type="text" name='description' id='description' defaultValue={loaderData.description} placeholder='Type trip details here...' required className='w-full h-[10rem] rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'/>
						</div>
						<div className='w-full px-6 my-10'>
							<p className='text-lg mb-3 font-[500] px-1'>Destination <sup>*</sup></p>
							<input type="text" name='destination' id='destination' defaultValue={loaderData.destination} placeholder='e.g: Uttarakhand' maxLength='50' required className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'/>
						</div>
						<div className='w-full px-6 my-10'>
							<p className='text-lg mb-3 font-[500] px-1'>Tour type <sup>*</sup></p>
							<select name="type" id="type" defaultValue={loaderData.type[0]} required className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'>
								<option disabled value> -- select an option -- </option>
								<option value="domestic">Domestic</option>
								<option value="international">International</option>
							</select>
						</div>
						<div className='w-full px-6 my-10'>
							<p className='text-lg mb-3 font-[500] px-1'>Max Tourist <sup>*</sup></p>
							<select name="max-tourist" id="max-tourist" defaultValue={loaderData.maxTourist} required className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'>
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
							<input type="number" name='regular-price' id='regular-price' placeholder='e.g. 9999' defaultValue={loaderData.regularPrice} min='1' required className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'/>
						</div>
						<div className='w-full px-6 my-10'>
								<p className='text-lg mb-3 font-[500] px-1'>{'Discounted Price per person (In ₹) - If any'}</p>
								<input type="number" name='discounted-price' id='discounted-price' defaultValue={loaderData.discountedPrice ?? ''} placeholder='e.g. 9999' className='w-full h-12 rounded-md text-black px-4 text-lg bg-gradient-[145deg] from-cust1 to-white shadow-inner placeholder:text-md focus:outline-0'/>
						</div>
						<div className='w-full px-6 my-10'>
								<p className='text-lg mb-3 font-[500] px-1'>Inclusions<sup>*</sup></p>
							<div className='sm:flex gap-5 items-start px-1 h-12'>
								<div className='flex items-center gap-2 text-md font-[500] text-gray-800'>
									<label>Hotel</label>
									<input type="checkbox" name='inclusions' defaultChecked={hotel}  id='Hotel' value='Hotel' className='w-4 h-4'/>
								</div>
								<div className='flex items-center gap-2 text-md font-[500] text-gray-800'>
									<label>Sideseeing</label>
									<input type="checkbox" name='inclusions' id='sightseeing' defaultChecked={sightseeing} value='Sightseeing' className='w-4 h-4'/>
								</div>
								<div className='flex items-center gap-2 text-md font-[500] text-gray-800'>
									<label>Meals</label>
									<input type="checkbox" name='inclusions' id='Meals' defaultChecked={meals} value='Meals' className='w-4 h-4'/>
								</div>
								<div className='flex items-center gap-2 text-md font-[500] text-gray-800'>
									<label>Train/Air Tickets</label>
									<input type="checkbox" name='inclusions' id='Train/Air Tickets' defaultChecked={tickets} value='Train/Air Tickets' className='w-4 h-4'/>
								</div>
							</div>
						</div>
						<div className='w-full px-6'>
						{imagesUrl.length<1 && <p className='text-red-700 mb-4'>Upload atleast 1 Image**</p>}
							<button type='submit' className={`w-full h-12 text-lg text-white font-medium ${imagesUrl.length<1 ? 'bg-red-400 cursor-not-allowed' : 'bg-red-700 cursor-pointer'}`} disabled={imagesUrl.length<1 || isSubmitting}>{isSubmitting? 'Updating': 'Update'}</button>
						</div>
					</Form>
		
				</section>
			);
};

export default EditListing;

export async function loader({ request, params }) {
	try {
		const docRef = doc(db, 'listings', params.id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) return { data: docSnap.data(), id: params.id };
	} catch (error) {
		console.log(error.message);
	}
}

export async function action({ request, params }) {
	const data = await request.formData();

	const name = data.get('package-name').trim();
	const destination = data.get('destination').trim();
	const description = data.get('description');
	const type = data.get('type');
	const maxTourist = data.get('max-tourist');
	const regularPrice = data.get('regular-price');
	const discountedPrice = data.get('discounted-price');
	const inclusions = data.getAll('inclusions');

	const updatedData = {
		name,
		destination: destination.split(' ').join('-').toLowerCase(),
		type: type.toLowerCase(),
		maxTourist,
		regularPrice,
		discountedPrice,
		inclusions,
		description,
	};
	return updatedData;
}
