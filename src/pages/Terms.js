import React from 'react';

const Terms = () => {
	return (
		<section className='max-w-[1280px] p-[1rem] md:px-[3rem] md:mx-auto flex flex-col gap-4'>
			<h1 class='text-2xl font-bold mb-8'>Terms and Conditions</h1>
			<p class='mb-8'>By using the ExploreWorld website, you agree to the following terms and conditions:</p>

			<h2 class='text-2xl font-bold mb-4'>Use of Content</h2>
			<p class='mb-8'>
				All content on the ExploreWorld website is the property of ExploreWorld and is protected by international
				copyright laws. You may not reproduce, distribute, or use any content from this site without the express written
				consent of ExploreWorld.
			</p>

			<h2 class='text-2xl font-bold mb-4'>Booking and Payment</h2>
			<p class='mb-8'>
				All bookings made through the ExploreWorld website are subject to availability and confirmation. Payment for
				tours is due at the time of booking, and all prices are quoted in US dollars.
			</p>

			<h2 class='text-2xl font-bold mb-4'>Cancellations and Refunds</h2>
			<p class='mb-8'>
				ExploreWorld reserves the right to cancel or modify tours due to unforeseen circumstances, such as weather or
				natural disasters. In the event of a cancellation, clients will receive a full refund of their tour fees.
			</p>

			<h2 class='text-2xl font-bold mb-4'>Liability</h2>
			<p class='mb-8'>
				ExploreWorld is not liable for any personal injury, property damage, or other loss or damage that may result from
				participation in our tours. Clients are advised to purchase travel insurance to cover any potential losses or
				damages.
			</p>

			<h2 class='text-2xl font-bold mb-4'>Governing Law</h2>
			<p class='mb-8'>
				These terms and conditions are governed by the laws of the State of California, and any disputes arising from the
				use of the ExploreWorld website will be resolved in the courts of California.
			</p>

			<h2 class='text-2xl font-bold mb-4'>Contact Us</h2>
			<p class='mb-8'>
				If you have any questions or concerns about these terms and conditions, please contact us by phone, email, or
				postal mail:
			</p>
			<ul class='list-disc ml-8 mb-8'>
				<li>Phone: 012-36548987</li>
				<li>Email: info@demoemail.com</li>
				<li>Postal Mail: 123 No real address, dummy city, dummy state, 123456, India.</li>
			</ul>

			<p class='mb-8'>Thank you for choosing ExploreWorld for your travel needs.</p>
		</section>
	);
};

export default Terms;
