import { useCallback, useEffect, useRef, useState } from 'react';

const useLastChildObserver = (isEmpty, options) => {
	const [isLastChildIntersecting, setIsLastChildIntersecting] = useState(false);
	const ref = useRef();

	const callback = (entries, observer) => {
		if (!isEmpty) {
			const [entry] = entries;
			if (entry.isIntersecting) setIsLastChildIntersecting(true);
			if (!entry.isIntersecting) setIsLastChildIntersecting(false);
		} else {
			observer.unobserve(ref.current.lastChild);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(callback, options);
		if (!isEmpty) observer.observe(ref.current.lastChild);
	}, [ref.current, isEmpty]);

	return [ref, isLastChildIntersecting];
};

export default useLastChildObserver;
