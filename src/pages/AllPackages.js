import { collection, query, limit, startAfter, orderBy, getDocs, startAt, endAt } from 'firebase/firestore';
import { db } from '../auth/firebase-config';
import { useEffect, useState } from 'react';
import InfiniteScrollList from '../components/InfiniteScrollList';
import Spinner from '../components/Spinner';
import ListingCard from '../components/ListingCard';

const AllPackages = () => {
	const [isLoading, setIsLoading] = useState(null);
	const [list, setList] = useState([]);

	useEffect(() => {
		(async function () {
			setIsLoading(true);
			const listingsRef = collection(db, 'listings');
			const q = query(listingsRef, orderBy('createdAt', 'desc'), limit(20));
			const packagesSnap = await getDocs(q);
			const tours = [];
			packagesSnap.forEach((doc, index) => {
				const docData = { ...doc.data(), id: doc.id };
				tours.push(docData);
			});
			setList(tours);
			setIsLoading(false);
		})();
	}, []);

	const loadMore = async () => {
		if (list.length > 0) {
			const listingsRef = collection(db, 'listings');
			const q = query(listingsRef, orderBy('createdAt', 'desc'), limit(20), startAfter(list[list.length - 1].createdAt));
			const packagesSnap = await getDocs(q);
			const tours = [];
			packagesSnap.forEach((doc, index) => {
				const docData = { ...doc.data(), id: doc.id };
				tours.push(docData);
			});
			return tours;
		}
	};

	//prettier-ignore
	return (
      <>
      {isLoading && <Spinner/>}
		<section className='max-w-[1280px] p-[1rem] md:px-[3rem] md:mx-auto md:py-[2rem] overflow-hidden mt-[70px] min-h-[80vh]'>
         <h1 className='text-2xl font-bold pt-2 pb-6 text-center'>All Packages</h1>
			<InfiniteScrollList initList={list} loadMore={loadMore} setList={setList}>
            <ul className={`grid grid-cols-autoFit gap-2 sm:gap-8 mx-auto ${list && list.length < 3 ? 'sm:grid-cols-minMax' : 'sm:grid-cols-mobileFit'}`}>
               {list.map((a, i ,tot) => (<ListingCard listing={a} key={i}/>))}
            </ul>
         </InfiniteScrollList>
		</section>
      </>
	);
};

export default AllPackages;
