import React, { useState } from 'react';

const ClampText = (props) => {
	const [textExpanded, setTextExpanded] = useState(false);

	function manageLineClamp() {
		setTextExpanded((prev) => !prev);
	}

	//prettier-ignore
	return (
		<div className='my-4'>
			<span className={`${!textExpanded && 'line-clamp-2'}`}>{props.children}</span>
			<button onClick={manageLineClamp} className='text-red-700'>
				{!textExpanded ? 'read more +' : 'read less -'}
			</button>
		</div>
	);
};

export default ClampText;
