module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				nav: '0 2px 3px rgb(0 0 0 / 0.25);',
				outer: '0px 0px 2px 1px rgb(0 0 0/0.15)',
				inner: '5px 5px 15px #D1D9E6, -5px -5px 15px rgb(0 0 0/0.1)',
			},
			bg: {
				primary: '#D92228',
			},
			screens: {
				xsm: { max: '320px' },
			},
			colors: {
				cust1: '#e2e8ec',
			},
			borderRadius: {
				customPc: '5px 0 0 5px',
				customMb: '5px 5px 0 0',
				bottomNav: '10px 10px 0 0',
			},
			gridTemplateColumns: {
				autoFit: 'repeat(auto-fit, minmax(250px, 1fr))',
				minMax: 'repeat(auto-fit, minmax(250px, 275px))',
				mobileFit: 'repeat(auto-fit, minmax(250px, 1fr))',
				colOneFourth: '3fr 1.15fr',
				btnFit: 'repeat(2, minmax(0, 10rem))',
			},
		},
	},
	plugins: [],
};
