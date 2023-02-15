import { useCallback, useEffect, useRef, useState } from 'react';

const useObserver = (options) => {
	const [isIntersecting, setIsIntersecting] = useState(null);
	const ref = useRef();

	const callback = useCallback((entries, observer) => {
		const [entry] = entries;
		if (entry.isIntersecting) {
			setIsIntersecting(true);
			observer.unobserve(ref.current);
		}
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(callback, options);
		observer.observe(ref.current);
	}, [ref.current]);

	return [ref, isIntersecting];
};

export default useObserver;
