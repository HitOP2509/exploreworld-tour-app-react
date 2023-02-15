import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { db } from '../auth/firebase-config';
import React, { useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
import LoadMoreInfinite from '../utilFuncs/LoadMoreInfinite';
import InfiniteScrollList from '../components/InfiniteScrollList';
import ListingCard from '../components/ListingCard';
import Spinner from '../components/Spinner';

const TourType = () => {
	const [isLoading, setIsLoading] = useState(null);
	const [list, setList] = useState([]);
	const params = useParams();

	useEffect(() => {
		(async function () {
			setIsLoading(true);
			const listingsRef = collection(db, 'listings');
			const q = query(
				listingsRef,
				orderBy('createdAt', 'desc'),
				where('type', 'array-contains-any', [params.type]),
				limit(20)
			);
			const packagesSnap = await getDocs(q);
			const tours = [];
			packagesSnap.forEach((doc, index) => {
				const docData = { ...doc.data(), id: doc.id };
				tours.push(docData);
			});
			setList(tours);
			setIsLoading(false);
		})();
	}, [params.type]);

	const loadMore = async () => {
		const tours = await LoadMoreInfinite(list, { name: 'type', operator: 'array-contains-any', value: [params.type] });
		return tours;
	};

	//prettier-ignore
	return (
		<div className='max-w-[1280px] p-[1rem] md:mx-auto md:px-[3rem]'>
			<h1 className='text-2xl pt-3 pb-6 font-medium'> {params.type.slice(0,1).toUpperCase()+params.type.slice(1)} Holiday Packages</h1>
         {isLoading && <Spinner/>}
         {list.length<1 && <h3> No {params.type.slice(0,1).toUpperCase()+params.type.slice(1)} trips found...</h3>}
         {list.length>0 && <InfiniteScrollList initList={list} loadMore={loadMore} setList={setList}>
            <ul className={`grid grid-cols-autoFit gap-2 sm:gap-8 mx-auto ${list && list.length < 3 ? 'sm:grid-cols-minMax' : 'sm:grid-cols-mobileFit'}`}>
               {list.map((a, i ,tot) => (<ListingCard listing={a} key={i}/>))}
            </ul>
         </InfiniteScrollList>}
		</div>
	);
};

export default TourType;
