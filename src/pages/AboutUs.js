import React from 'react';

const AboutUs = () => {
	return (
		<section className='max-w-[1280px] p-[1rem] md:px-[3rem] md:mx-auto flex flex-col gap-4'>
			<h1 class='text-2xl font-bold mb-8'>About Us</h1>
			<p class='mb-8'>
				ExploreWorld is a leading tour company that offers unique travel experiences to adventurous souls around the
				world. Our team of expert travel advisors and experienced guides work tirelessly to create unforgettable tours
				that showcase the best that each destination has to offer.
			</p>
			<h2 class='text-2xl font-bold mb-4'>Our Mission</h2>
			<p class='mb-8'>
				Our mission at ExploreWorld is to provide our clients with the most authentic and immersive travel experiences
				possible. We believe that travel is more than just visiting a new place, it's about connecting with local
				cultures, learning about history and traditions, and stepping out of your comfort zone to try new things.
			</p>
			<h2 class='text-2xl font-bold mb-4'>Our Tours</h2>
			<p class='mb-8'>
				We offer a wide range of tours to destinations all over the world, from the bustling cities of Europe to the
				remote wilderness of Patagonia. Our tours are designed for travelers who want to experience the local culture,
				history, and natural beauty of each destination in a meaningful and authentic way.
			</p>
			<h2 class='text-2xl font-bold mb-4'>Our Team</h2>
			<p class='mb-8'>
				Our team is made up of travel experts, destination specialists, and experienced guides who share a passion for
				travel and adventure. We work together to create unique and memorable travel experiences for our clients, and
				we're always happy to share our knowledge and expertise with anyone who is interested in exploring the world.
			</p>
			<h2 class='text-2xl font-bold mb-4'>Contact Us</h2>
			<p class='mb-8'>
				If you have any questions or would like to learn more about our tours, please don't hesitate to contact us. You
				can reach us by phone, email, or through our website.
			</p>
			<ul class='list-disc list-inside mb-8'>
				<li>Phone: 012-36548987</li>
				<li>Email: info@demoemail.com</li>
				<li>Website: www.exploreworldreact.app.com</li>
			</ul>
		</section>
	);
};

export default AboutUs;
