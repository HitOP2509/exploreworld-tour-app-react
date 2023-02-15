import React, { useEffect, useState } from 'react';
import useLastChildObserver from '../hooks/useLastChildObserver';
import spinner from '../assets/loader.svg';

const InfiniteScrollList = ({ children, initList = [], loadMore, setList }) => {
	const [isEmpty, setIsEmpty] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const [ref, isLastChildIntersecting] = useLastChildObserver(isEmpty, { threshold: 0 });
	const [arr, setArr] = useState([...initList]);

	useEffect(() => {
		(async function () {
			setIsLoading(true);
			if (isLastChildIntersecting) {
				const newArr = await loadMore();
				if (newArr && newArr.length > 0) setArr((prev) => [...prev, ...newArr]);
				if (newArr && newArr.length < 1) setIsEmpty(true);
				setIsLoading(false);
			}
		})();
	}, [isLastChildIntersecting, loadMore]);

	useEffect(() => {
		setList((prev) => [...prev, ...arr]);
	}, [arr, setList]);

	//prettier-ignore
	return (
		<div ref={ref} className={``}>
			{children}
         {isLoading && !isEmpty ? <img src={spinner} className='mx-auto h-10 w-10'></img>:<></>}
         <span></span>
		</div>
	);
};

export default InfiniteScrollList;
