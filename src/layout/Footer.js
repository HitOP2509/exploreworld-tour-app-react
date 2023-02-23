import React from "react";
import FooterLinks from "../components/FooterLinks";
import { MdFacebook } from "react-icons/md";
import {
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaYoutube,
} from "react-icons/fa";

const Footer = () => {
    const linksArr1 = [
        { name: "Hotel Booking", link: "/" },
        { name: "Car rentals", link: "/" },
        { name: "Holidays package - India", link: "/packages/domestic" },
        { name: "Holiday packages - Intl.", link: "/packages/international" },
        {
            name: "Honeymoon packages - India",
            link: "/packages/honeymoon-india",
        },
        {
            name: "Honeymoon packages - Intl.",
            link: "/packages/honeymoon-international",
        },
        { name: "Customized packages", link: "/packages" },
        { name: "Escorted holiday packages", link: "/packages/escorted" },
        { name: "Incentive tour packages", link: "/packages/incentive" },
        { name: "Short distance packages", link: "/packages/short" },
    ];
    const linksArr2 = [
        { name: "Home", link: "/" },
        { name: "Domestic tours", link: "/packages/domestic" },
        { name: "International tours", link: "/packages/international" },
        { name: "Contact us", link: "/contact-us" },
        { name: "About us", link: "/about-us" },
    ];
    const linksArr3 = [
        { name: "Terms & conditions", link: "/terms" },
        { name: "Privacy policy", link: "/privacy-policy" },
        { name: "Disclaimer", link: "/disclaimer" },
    ];
    const linksArr4 = [
        { name: "Sikkim tour packages", link: "/packages/domestic/sikkim" },
        { name: "Goa tour packages", link: "/packages/domestic/goa" },
        { name: "Shimla tour packages", link: "/packages/domestic/shimla" },
        { name: "Srinagar tour packages", link: "/packages/domestic/srinagar" },
        { name: "Himachal tour packages", link: "/packages/domestic/himachal" },
        {
            name: "Uttarakhand tour packages",
            link: "/packages/domestic/uttarakhand",
        },
        {
            name: "Rajasthan tour packages",
            link: "/packages/domestic/rajasthan",
        },
        { name: "Gujrat tour packages", link: "/packages/domestic/gujrat" },
        { name: "Andaman tour packages", link: "/packages/domestic/andaman" },
        { name: "Ladakh tour packages", link: "/packages/domestic/ladakh" },
        { name: "Jammu tour packages", link: "/packages/domestic/jammu" },
        // { name: 'Kerala tour packages', link: '/packages/domestic/kerala' },
        // { name: 'Karnataka tour packages', link: '/packages/domestic/karnataka' },
        // { name: 'Tamilnadu tour packages', link: '/packages/domestic/tamilnadu' },
    ];
    const linksArr5 = [
        { name: "Dubai tour packages", link: "/packages/international/dubai" },
        {
            name: "Sri Lanka tour packages",
            link: "/packages/international/srilanka",
        },
        {
            name: "Bhutan tour packages",
            link: "/packages/international/bhutan",
        },
        {
            name: "Mauritius tour packages",
            link: "/packages/international/mauritius",
        },
        {
            name: "Singapore tour packages",
            link: "/packages/international/singapore",
        },
        {
            name: "Maldives tour packages",
            link: "/packages/international/maldives",
        },
        {
            name: "Thailand tour packages",
            link: "/packages/international/thailand",
        },
        {
            name: "Indonesia tour packages",
            link: "/packages/international/indonesia",
        },
        {
            name: "Switzerland tour packages",
            link: "/packages/international/switzerland",
        },
        {
            name: "Bangkok tour packages",
            link: "/packages/international/bangkok",
        },
        // {
        //     name: "Australia tour packages",
        //     link: "/packages/international/australia",
        // },
        // { name: "USA tour packages", link: "/packages/international/usa" },
        // {
        //     name: "Europe tour packages",
        //     link: "/packages/international/europe",
        // },
    ];

    const socialLinks = [
        {
            name: "Facebook",
            icon: <MdFacebook className="bg-blue-600 rounded-full text-xl" />,
            link: "https://www.facebook.com/",
        },
        {
            name: "Instagram",
            icon: (
                <FaInstagram className="bg-gradient-to-br from-[#8a3ab9] to-[#bc2a8d] rounded-full text-xl p-[0.1rem]" />
            ),
            link: "https://www.instagram.com/",
        },
        {
            name: "YouTube",
            icon: (
                <FaYoutube className="bg-red-600 rounded-full text-xl p-[0.1rem]" />
            ),
            link: "https://www.youtube.com/",
        },
        {
            name: "LinkedIn",
            icon: (
                <FaLinkedinIn className="bg-blue-800 rounded-full text-xl p-[0.1rem]" />
            ),
            link: "https://www.linkedin.com.com/",
        },
        {
            name: "Pinterest",
            icon: (
                <FaPinterest className="bg-white text-[#E60023] rounded-full text-xl p-[0rem]" />
            ),
            link: "https://www.pinterest.com/",
        },
    ];

    //prettier-ignore
    return (
      <>
         <footer className=' bg-gradient-to-b from-red-800 to-[#611010] mb-14 md:mb-0'>
      		<div className='max-w-[1280px] p-[1rem] md:mx-auto md:p-[3rem] text-white lg:flex'>
               <div className='text-white grid xsm:grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-4 basis-[80%]'>
         			<div className='mt-6 lg:mt-0'>
                     <FooterLinks title='Navigations' linksArr={linksArr2}/>
                     <FooterLinks title='Important links' linksArr={linksArr3} className='mt-6'/>
         		   </div>
                  <FooterLinks title='Product offerings' linksArr={linksArr1} className='mt-6 lg:mt-0'/>
                  <FooterLinks title='India Holidays' linksArr={linksArr4} className='mt-6 lg:mt-0'/>
                  <FooterLinks title='International Holidays' linksArr={linksArr5} className='mt-6 lg:mt-0'/>
               </div>
               <div className='mt-10 lg:mt-0 basis-[20%] lg:block grid grid-cols-2 gap-4 xsm:grid-cols-1'>
                  <div>
                     <h3 className='text-white mb-2 font-bold tracking-wide'>ExploreWorld Ltd.</h3>
                     <div className='text-[0.9rem] my-3'>
                        <p>Registered office:</p>
                        <p>123 No real address, dummy city, dummy state, 123456, India.</p>
                     </div>
                     <div className='text-[0.9rem] my-2'>
                        <p>Tel: 012-36548987</p>
                        <p>Mob: +91-1236547890</p>
                     </div>
                  </div>
                  <FooterLinks title='Social Links' linksArr={socialLinks} className='lg:mt-4'/>
         		</div>
            </div>
            <div className='max-w-[1280px] text-white mx-auto px-[1rem] md:mx-auto md:px-[3rem] border-t border-[#aaa]'>
               <p className='text-sm py-4 tracking-wider opacity-70'>copyright 2023 &copy; ExploreWorld LTD. &nbsp; {' (Corporate ID No.:XYZ1236554789DUMMY)'}</p>
            </div>
   		</footer>
      </>
	);
};

export default Footer;
