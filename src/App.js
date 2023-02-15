import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import RootLayout from './layout/RootLayout';
import ListingLayout from './layout/ListingLayout';
import Home from './pages/Home';
import SignIn, { action as signInAction } from './pages/SignIn';
import SignUp, { action as signUpAction } from './pages/SignUp';
import ForgotPassword, { action as forgotPasswordAction } from './pages/ForgotPassword';
import ResetPasswordPage, { action as resetPasswordAction } from './pages/ResetPasswordPage';
import Error from './pages/Error';
import Profile, { action as profileAction } from './pages/Profile';
import CreateListing, { action as createListingAction } from './pages/CreateListing';
import EditListing, { loader as editListingLoader, action as editListingAction } from './pages/EditListing';
import MyListings from './pages/MyListings';
import DestinationDetails from './pages/DestinationDetails';
import ListingDetails from './pages/ListingDetails';
import Bookings, { loader as bookingsLoader } from './pages/Bookings';
import SavedTrips from './pages/SavedTrips';
import ContactUs from './pages/ContactUs';
import AllPackages from './pages/AllPackages';
import PackagesLayout from './layout/PackagesLayout';
import TourType from './pages/TourType';

function App() {
	//prettier-ignore
	const ROUTER = createBrowserRouter([
		{ path: '/', element: <RootLayout />, errorElement:<Error/>,
			children: [
				{ index: true, element: <Home />},
				{path:'contact-us', element:<ContactUs/>},
				{path:'sign-in', element:<SignIn/>, action:signInAction},
				{path:'sign-up', element: <SignUp/>, action:signUpAction},
				{path:'forgot-password', element: <ForgotPassword/>, action:forgotPasswordAction},
				{path:'reset-password', element: <ResetPasswordPage/>, action: resetPasswordAction},
				{path:'profile', element: <Profile/>, action: profileAction},
				{path:'my-bookings', element:<Bookings/>, loader: bookingsLoader},
				{path:'saved-trips', element:<SavedTrips/>},
				{path:'packages', element:<PackagesLayout/>, children:[
               {index:true, element: <AllPackages/>},
               {path: ':type', children:[
                  {index: true,element: <TourType/>},
                  {path:':place', children:[
                     {index: true, element:<DestinationDetails/>},
                     {path:':id', element:<ListingDetails/>}
                  ]}
               ]},
            ]},
				{path:'listings', element:<ListingLayout/>,
					children:[
						{index:true, element:<MyListings/>,},
						{path:'create', element:<CreateListing/>, action:createListingAction},
						{path:'edit/:id', element:<EditListing/>, loader: editListingLoader, action: editListingAction},
				]},
			],
		}
	]);

	//prettier-ignore
	return (
		<>
			<RouterProvider router={ROUTER}/>
			<ToastContainer pauseOnHover={false} autoClose={2500} theme='dark' pauseOnFocusLoss={false} position="top-right" className='relative z-[99999999999999999]'/>
		</>
	)
}

export default App;
