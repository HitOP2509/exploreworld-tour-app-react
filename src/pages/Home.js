import { useEffect, useState } from "react";
import SwiperSlider from "../components/SwiperSlider";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

import {
    query,
    orderBy,
    limit,
    collection,
    getDocs,
    where,
} from "firebase/firestore";
import { db } from "../auth/firebase-config";
import CardSlider from "../components/CardSlider";
import { homepageSliceAction } from "../state/homepageSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClampText from "../components/ClampText";

const Home = () => {
    const dispatch = useDispatch();
    const { headerImages, domesticTours, internationalTours, trendingTours } =
        useSelector((state) => state.homepageData);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        async function fetchHomepageData() {
            try {
                setIsLoading(true);
                const headerImages = [];
                const domesticTours = [];
                const internationalTours = [];
                const trendingTours = [];

                //Fetching header images from realtime database
                const res = await fetch(
                    process.env.REACT_APP_HEADER_IMAGES_API
                );
                const data = await res.json();
                headerImages.push(...Object.values(data));

                const listingsRef = collection(db, "listings");

                const trendingQ = query(
                    listingsRef,
                    where("type", "array-contains-any", ["trending"]),
                    orderBy("createdAt", "desc"),
                    limit(7)
                );
                const domesticQ = query(
                    listingsRef,
                    where("type", "array-contains-any", ["domestic"]),
                    orderBy("createdAt", "desc"),
                    limit(7)
                );
                const internationalQ = query(
                    listingsRef,
                    where("type", "array-contains-any", ["international"]),
                    orderBy("createdAt", "desc"),
                    limit(7)
                );

                const trendingQuerySnap = await getDocs(trendingQ);
                const domesticQuerySnap = await getDocs(domesticQ);
                const internationalQuerySnap = await getDocs(internationalQ);

                domesticQuerySnap.forEach((doc) => {
                    const docData = { ...doc.data(), id: doc.id };
                    domesticTours.push(docData);
                });
                internationalQuerySnap.forEach((doc) => {
                    const docData = { ...doc.data(), id: doc.id };
                    internationalTours.push(docData);
                });
                trendingQuerySnap.forEach((doc) => {
                    const docData = { ...doc.data(), id: doc.id };
                    trendingTours.push(docData);
                });

                dispatch(
                    homepageSliceAction.setTours({
                        headerImages,
                        domesticTours,
                        internationalTours,
                        trendingTours,
                    })
                );
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error.message);
                toast.error("Something went wrong...");
            }
        }
        if (
            (!headerImages || headerImages.length <= 0) &&
            (!domesticTours || domesticTours.length <= 0) &&
            (!internationalTours || internationalTours.length <= 0) &&
            (!trendingTours || trendingTours.length <= 0)
        )
            fetchHomepageData();
    }, [
        headerImages,
        domesticTours,
        internationalTours,
        trendingTours,
        dispatch,
    ]);

    if (isLoading) return <Spinner />;
    //prettier-ignore
    return (
		<>
			<SwiperSlider imagesArray={headerImages} title='header-image' />
			<div className='max-w-[1280px] p-[1rem] md:mx-auto md:p-[3rem]'>
			{/* Trending Packages */}
				<div className='mt-6 mb-12'>
					<div className='flex justify-between items-center '>
						<h2 className='text-xl md:text-2xl font-bold'>Trending Packages</h2>
						<Link to='/packages/trending' className='flex items-center text-sm md:text-md text-red-700 font-bold'>View all <MdKeyboardArrowRight className='text-xl'/></Link>
					</div>
					<ClampText>
                  <p>
                     Join the travel trend with our trending tour packages! Experience the hottest destinations and create memories that will last a lifetime. From the tropical paradise of Bali to the bustling cities of Tokyo and Paris, our tour packages offer a diverse range of experiences for every type of traveler.
                  </p>
                  <p>
                     Embark on an adventure in New Zealand or Costa Rica, or relax and unwind in the Maldives. With our comprehensive packages, you'll be able to fully immerse yourself in your destination and make the most of your travels. Don't miss out on the opportunity to explore the trendiest destinations with our trending tour packages. Book your next adventure today!
                  </p>
               </ClampText>
					<ul className='mt-4'>
						<CardSlider listings={trendingTours} pc={4.5}/>
					</ul>
				</div>

         {/* Domestic Packages */}
				<div className='sm:mt-4 mb-12'>
					<div className='flex justify-between items-center '>
						<h2 className='text-xl md:text-2xl font-bold'>Domestic Packages</h2>
						<Link to='/packages/domestic' className='flex items-center text-sm md:text-md text-red-700 font-bold'>View all <MdKeyboardArrowRight className='text-xl'/></Link>
					</div>

					<ClampText>
						<p>
							Escape the hustle and bustle of daily life with our domestic tour packages! Experience the diverse cultures, landscapes, and rich heritage of India with ease and comfort. From the snow-capped mountains of the north to the sun-kissed beaches of the south, our tour packages offer something for every traveler. Immerse yourself in the spirituality of Varanasi, the vibrant energy of Mumbai, or the charm of Udaipur.	
						</p>
						<p>
							Whether you're looking for adventure, relaxation, or a mix of both, our domestic tour packages are the perfect way to discover the beauty of India. Book your next journey today and get ready to create memories that will last a lifetime!
						</p>
					</ClampText>
					<ul className='mt-4'>
						<CardSlider listings={domesticTours}/>
					</ul>
				</div>

         {/* International Packages */}
				<div className='sm:mt-4 mb-12'>
					<div className='flex justify-between items-center '>
						<h2 className='text-xl md:text-2xl font-bold'>International Packages</h2>
						<Link to='/packages/international' className='flex items-center text-sm md:text-md text-red-700 font-bold'>View all <MdKeyboardArrowRight className='text-xl'/></Link>
					</div>
					<ClampText>
                  <p>
							Embark on a journey of a lifetime with our international tour packages! Discover the wonders of the world and create memories that will last forever. From the vibrant cities of Europe to the scenic landscapes of Australia, our tour packages offer a diverse range of experiences for every type of traveler.
						</p>
						<p>
							Explore the rich history of Greece, the stunning beauty of New Zealand, or the vibrant culture of Thailand. With our comprehensive packages, you'll be able to fully immerse yourself in your destination and make the most of your travels. Book your international tour package today and get ready for an adventure like never before!
						</p>
               </ClampText>
					<ul className='mt-4'>
						<CardSlider listings={internationalTours}/>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Home;
