<h1 align="left">ExploreWorld Tour App </h1>
<p>I have creafted this app from scratch. And This project is the first major project.</p>

<p>Live link: <a href='https://exploreworldreact.web.app/' target='_blank'>https://exploreworldreact.web.app/</a></p>

<h3 align="left">Tech used:</h3>
<ul>
   <li>React 18</li>
   <li>Tailwind CSS</li>
   <li>Redux Toolkit</li>
   <li>React router DOM</li>
   <li>Firebase auth</li>
   <li>Firebase Firestore DB - To store users and tour data</li>
   <li>Firebase Realtime DB - To store Header slider images for Home section</li>
   <li>Firebase Storage - To store images</li>
</ul>
<br/>

<h2>Features:</h2>
<ul>
  <li>Login/Sign up using Firebase Auth</li>
  <li>Storing tour listings, user data on Firebase Firestore DB</li>
  <li>Create & Update user accounts</li>
  <li>Create, Update, & Delete Tour listings (Admin only)</li>
  <li>Send enquiry as a visitor</li>
  <li>Get and Delete Enquiries as an Admin.</li>
  <li>Save tour listings</li>
  <li>Infinite scrolling using custom hooks and intersection observer to load tours</li>
  <li>Swiper Slider for Hero slider and Card Slider</li>
</ul>
<br/>

<h2>Note:</h2>
<p>I've used different concepts to achieve the same thing in different components. Because I have developed this project to learn React. Somewhere I've used React router DOM Form and somewhere I've used normal html form. Sometimes I've used useEffect to fetch some data and sometime I've used React router DOM Loader function.</p>
<br/>

<h2>Run this project on your machine:</h2>
<p>Before you can start running this project locally, Make sure you have Node installed.</p>

<h3>1. Install Requirred Packages:</h3>
<pre>npm i</pre>

<h3>2. Create firebase project and replace the following codes:</h3>
<p>Go to src > auth > firebase-config.js and replace this code with your own firebase config code:</p>
<pre>
   // Your web app's Firebase configuration
   const firebaseConfig = {
   	apiKey: process.env.REACT_APP_FIREBASE_API,
   	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
   	projectId: process.env.REACT_APP_PROJECT_ID,
   	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   	appId: process.env.REACT_APP_APP_ID,
   };
</pre>
<p>And to change Homescreen hero slider images, store the images in Firebase Realtime DB and Replace the API endpoint from "process.env.REACT_APP_HEADER_IMAGES_API" to your own Realtime DB endpoint:</p>
<p> Go to src > pages > Home.js > Then replace this line:</p>
<pre>
   const res = await fetch(process.env.REACT_APP_HEADER_IMAGES_API);
</pre> 
to
<pre>
   const res = await fetch(Your_Realtime_DB_Endpoint);
</pre>

<h3>3. Start Development Server</h3>
<p> Once all the dependencies are installed and Firebase config file is updated, you can start development server. To start a development server on http://localhost:3000 run:</p>
<pre>npm start</pre>
<br/>

<h2>Screenshots (as a visitor):</h2>

<h3>Homepage</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/homepage.png?alt=media&token=57483fd1-e3d8-4e7f-978b-d12351cc090d'/>

<h3>Tour Types Page (Domestic/International):</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/specific%20tour%20type%20page.png?alt=media&token=c6121aec-c5cf-4e0d-b2cd-062d16382b63'>

<h3>Specific Destination Page</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/specific%20destination%20page.png?alt=media&token=d68041e0-7c51-41b6-85c0-adf96fcfe864'>

<h3>Single tour page</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/single%20tour%20page.png?alt=media&token=091d4ed8-a780-4a0d-bc91-f1d7fe81ebcb'>

<h3>Sign up page</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/sign%20up%20page.png?alt=media&token=3b68c2a8-0933-4510-a87d-e54e41f225e7'>

<h3>Sign in page</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/sign%20in%20page.png?alt=media&token=aeedbb5a-8327-464d-8a06-48a83e305eec'>

<h3>Forgot password page</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/forgot%20password%20page.png?alt=media&token=a844115e-8172-44b1-b9f9-c5f91c9e9fe9'>

<h3>User profile dashboard</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/user%20profile%20dashboard.png?alt=media&token=e41b3706-4629-43f1-b86a-0bda53788cdc'>

<h3>Saved trips page</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/saved%20trips%20page.png?alt=media&token=7bca018c-4b7e-46ec-9f49-9ba24943097b'>

<br/>
<h2>Screenshots (as an admin):</h2>

<h3>Listed tours page (Admin Dashboard)</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/my%20listings%20page.png?alt=media&token=5f65314b-afce-4d41-9225-ee2e331e4a42'>

<h3>Tour listing page (Admin Dashboard)</h3>
<img src='https://firebasestorage.googleapis.com/v0/b/personal-84946.appspot.com/o/create%20trips%20page.png?alt=media&token=4f7c84a7-ddbb-4233-b507-d84e3810fc0a'>
