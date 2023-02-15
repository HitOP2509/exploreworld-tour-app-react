import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper';
import 'swiper/css/bundle';
import ListingCard from './ListingCard';
import useWindowDimensions from '../hooks/useWindowDimesions';
import { useEffect, useState } from 'react';

const CardSlider = ({ listings, pc = 4.5, tab = 2.2, mob = 1.25 }) => {
	const { height, width } = useWindowDimensions();
	const [slidePerView, setSlidePerView] = useState(4.5);
	const [isNavigation, setIsNavigation] = useState(null);

	useEffect(() => {
		if (width > 999 && slidePerView !== pc) {
			setSlidePerView(pc);
			setIsNavigation(true);
		}
		if (width < 999 && width > 520 && slidePerView !== tab) {
			setSlidePerView(tab);
			setIsNavigation(false);
		}
		if (width < 520 && slidePerView !== mob) {
			setSlidePerView(mob);
			setIsNavigation(false);
		}
	}, [width]);
	// Pagination
	// pagination={isNavigation?{clickable:true, dynamicBullets:true}:false}
	// className="mySwiper"
	//prettier-ignore
	return (
		<Swiper modules={[Navigation]} spaceBetween={15} navigation={isNavigation ?? true} slidesPerView={slidePerView}>
			{listings.map((listing, index) => (
				<SwiperSlide  key={index} className='w-full'>
					<ListingCard listing={listing} className='select-none' />
				</SwiperSlide>
			))}
		</Swiper>

	);
};

export default CardSlider;
