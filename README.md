<div align="center">
🛡️ Shakti Shield
Your Personal Safety Companion
Show Image
Show Image
Show Image
Show Image
Show Image
<br/>

One tap. Your location. Your people. Instantly.
Shakti Shield is a full-stack women's safety platform that sends real-time SOS alerts with live GPS location to emergency contacts — in under 3 seconds.

<br/>
Show Image
Show Image
Show Image
</div>

✨ Features
🚨 Emergency SOS

One-tap SHAKTI button sends instant SMS alerts
Shares live GPS coordinates via Google Maps link
Works even without internet using IP-based location fallback
Confirmation dialog shows contact count, GPS status, and readiness
SOS activity log records every alert with timestamp and location

📍 Live Location Map

Real-time GPS tracking with Leaflet.js
Satellite and standard map views
Re-center button snaps map to your current position
Accuracy indicator shows GPS precision in meters

👥 Emergency Contacts

Add up to 10 trusted contacts with photos
Cloudinary-powered photo upload
One-tap delete with Cloudinary cleanup
Contacts displayed with live status indicators

🔐 Authentication

Email/password signup & login with JWT
Google OAuth 2.0 one-click login
Secure HTTP-only cookies
Protected routes for all private pages

📝 Safety Reviews

Community-driven location safety reviews
1–5 star rating system
Filter by Positive / Critical reviews
Search by location, title, or username
Users can delete their own reviews

👤 Profile Management

Profile photo upload via Cloudinary
Edit username and email in-place
Real SOS alert count from database
Live contact count display
Google accounts show "Managed by Google" for password

📊 Admin Dashboard

Overview with total users, SOS alerts, Google users
Full user management with join date and contact count
All SOS logs with clickable Google Maps links
Status badges (success/failed) for each alert
Admin-only access via isAdmin flag

📈 SOS Activity Log

Personal history of all SOS alerts triggered
Shows alert number, timestamp, GPS coordinates, contacts alerted
Success/failure status for each alert


🛠️ Tech Stack
LayerTechnologyFrontendReact 18, Vite, TailwindCSS, Framer MotionBackendNode.js, Express.js, ES ModulesDatabaseMongoDB Atlas, Mongoose ODMAuthJWT, Google OAuth 2.0, Passport.jsSMSTwilio APIMediaCloudinary, MulterMapsLeaflet.js, React-LeafletFontsSyne (display), DM Sans (body)

🚀 Getting Started
Prerequisites

Node.js v18+
MongoDB Atlas account
Twilio account
Cloudinary account
Google Cloud Console project

Installation
bash# Clone the repository
git clone https://github.com/your-username/Shakti--Shield.git
cd Shakti--Shield

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
Environment Variables
Create server/.env:
envPORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shakti-shield

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
Create client/.env:
envVITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
Running the App
bash# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
Frontend: http://localhost:5173
Backend: http://localhost:5000

📁 Project Structure
Shakti--Shield/
├── client/                          # React frontend (Vite)
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Home/
│   │   │   │   ├── AfterLogin.jsx   # Main home with SOS button
│   │   │   │   ├── BottomNav.jsx    # Mobile navigation
│   │   │   │   └── Loader.jsx
│   │   │   ├── AdminDashboard.jsx   # Admin panel
│   │   │   ├── Login.jsx            # Auth - login
│   │   │   ├── Signup.jsx           # Auth - register
│   │   │   ├── Map.jsx              # Live location map
│   │   │   ├── Profile.jsx          # User profile & settings
│   │   │   ├── Progress.jsx         # SOS activity log
│   │   │   ├── Reviews.jsx          # Community reviews
│   │   │   └── ShaktiButton.jsx     # Dedicated SOS page
│   │   └── Context/
│   │       └── AuthContext.jsx
│   └── URL/
│       ├── Config.js                # API endpoints
│       └── CustomApi.js             # Axios instance
│
└── server/                          # Node.js + Express backend
    ├── Controllers/
    │   ├── Admin.Controller.js
    │   ├── Contacts.Controller.js   # SOS + contacts
    │   ├── Profile.Controller.js
    │   ├── Review.Controller.js
    │   ├── SOSLog.Controller.js
    │   └── User.Controller.js
    ├── Models/
    │   ├── User.Model.js            # User + contacts + reviews schema
    │   └── SOSLog.Model.js          # SOS alert logs
    ├── Routes/
    │   ├── Admin.Routes.js
    │   ├── Auth.js
    │   ├── Contacts.Routes.js
    │   ├── Profile.Routes.js
    │   ├── Review.Routes.js
    │   ├── SOSLog.Routes.js
    │   └── User.Routes.js
    ├── Middlewares/
    │   ├── admin.Middleware.js
    │   ├── auth.Middleware.js
    │   └── Multer.js
    ├── Utils/
    │   ├── Cloudinary.Utils.js
    │   └── getPublicIdFromUrl.Utils.js
    └── config/
        ├── db.js
        └── passport.js

📱 Screenshots
HomeSOS ActiveMapDark premium UI with SOS buttonConfirmation dialog with GPS statusLive satellite/street view
ProfileAdmin DashboardReviewsStats, settings, navigationUser management & SOS logsCommunity safety reviews

🔐 Admin Access
To grant admin access to a user:

Go to MongoDB Atlas → Collections → users
Find the user document
Add field: "isAdmin": true
Visit http://your-domain/admin


⚡ API Endpoints
Auth
MethodEndpointDescriptionPOST/api/user/signupRegister new userPOST/api/user/loginLogin with email/passwordPOST/api/user/googleLoginGoogle OAuth loginGET/api/user/auth-checkVerify sessionPOST/api/user/logoutLogout
Contacts & SOS
MethodEndpointDescriptionPOST/api/contacts/addcontactAdd emergency contactDELETE/api/contacts/delete-contactRemove contactPOST/api/contacts/emergencySend SOS alert via Twilio
SOS Logs
MethodEndpointDescriptionPOST/api/soslogs/addSave SOS logGET/api/soslogs/getGet user's SOS history
Admin
MethodEndpointDescriptionGET/api/admin/statsDashboard stats + recent SOSGET/api/admin/usersAll users list

🌟 Impact

🛡️ Real protection — SMS alerts reach contacts in under 3 seconds
📍 Precise location — GPS coordinates shared as a Google Maps link
👥 Community safety — Reviews help others identify safe/unsafe areas
🔒 Privacy-first — JWT auth, encrypted passwords, secure cookies
📊 Transparent — Full audit trail of every SOS alert in the admin dashboard


🚧 Future Roadmap

 🌐 Deploy to Vercel + Render (online hosting)
 📱 Progressive Web App (installable on phones)
 📞 Emergency calling directly from app
 🤖 AI threat detection from review patterns
 📵 Offline SOS mode (queue and send when reconnected)
 🔔 Push notifications for SOS acknowledgments
 🗺️ Heatmap of unsafe areas from community reviews


👨‍💻 Author
Srajal Thakur
NIET, Noida Institute of Engineering and Technology
B.Tech CSE — 2025

<div align="center">
Built with 🛡️ for personal safety
Shakti Shield — Stay Safe. Stay Connected.
</div>