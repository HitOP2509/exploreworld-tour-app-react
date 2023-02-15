import { createSlice } from '@reduxjs/toolkit';

const homepageSlice = createSlice({
	name: 'homepageData',
	initialState: {
		headerImages: [],
		domesticTours: [],
		internationalTours: [],
		trendingTours: [],
	},
	reducers: {
		setTours(state, action) {
			state.headerImages = action?.payload?.headerImages || [];
			state.domesticTours = action?.payload?.domesticTours || [];
			state.internationalTours = action?.payload?.internationalTours || [];
			state.trendingTours = action?.payload?.trendingTours || [];
		},
	},
});

export const homepageSliceAction = homepageSlice.actions;
export default homepageSlice.reducer;
