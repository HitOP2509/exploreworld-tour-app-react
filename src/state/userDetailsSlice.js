import { createSlice } from '@reduxjs/toolkit';

const userDetailsSlice = createSlice({
	name: 'userDetails',
	initialState: {
		name: '',
		email: '',
		uid: '',
		isAdmin: null,
		likedTrips: [],
	},
	reducers: {
		setUserDetails(state, action) {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.uid = action.payload.uid;
			state.isAdmin = action.payload.isAdmin ?? null;
		},
		setLikedTrips(state, action) {
			state.likedTrips = action.payload.likedTrips;
		},
	},
});

export const userDetailsAction = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
