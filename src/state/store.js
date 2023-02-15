import { configureStore } from '@reduxjs/toolkit';
import homepageDataReducer from './homepageSlice';
import userDetailsReducer from './userDetailsSlice';

const store = configureStore({
	reducer: {
		userDetails: userDetailsReducer,
		homepageData: homepageDataReducer,
	},
});

export default store;
