import React from 'react';
import { Link } from 'react-router-dom';

const FooterLinks = ({ title, linksArr, className }) => {
	if (!linksArr) return null;
	//prettier-ignore
	return(
      <div className={className}>
         <h3 className='text-white text-md sm:text-sm mb-2 font-bold tracking-wide'>{title}</h3>
         <div className='flex flex-col gap-[0.3rem]'>
            {linksArr.map((a, i)=>(
               <div className={a.icon&&'flex items-center gap-2'} key={i}>
                  {a.icon}
                  <Link to={a.link.toLowerCase()} className={`opacity-70 hover:opacity-100 active:opacity-100 ${a.icon?'text-[0.95rem] md:text-[0.85rem] font-[500] mb-1 ':'text-[0.9rem] md:text-[0.8rem] font-[400] leading-[0em]'}`}>
                     {a.name}
                  </Link>
               </div>
            ))}
         </div>
      </div>
   )
};

export default FooterLinks;
