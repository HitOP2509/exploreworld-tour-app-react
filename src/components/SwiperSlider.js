import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
import 'swiper/css/bundle';

const SwiperSlider = ({ imagesArray, title, slides = 1, className }) => {
	//
	//prettier-ignore
	return (
		<Swiper className={`h-[250px] md:h-[550px] select-none ${className}`}
			modules={[Navigation, Pagination, EffectFade, Autoplay]} watchSlidesProgress effect="fade" slidesPerView={slides} navigation  pagination={{clickable:true, dynamicBullets:true}}  autoplay={{delay:5000}} loop={true}>
			{imagesArray.map((image, index) => (
				<SwiperSlide  key={index} className='select-none'>
					<img src={image} alt={title} className='w-full h-full object-cover object-center' loading='lazy'/>
				</SwiperSlide>
			))}
		</Swiper>

	);
};

export default SwiperSlider;
