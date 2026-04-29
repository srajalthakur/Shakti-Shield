<div align="center">

# 🛡️ Shakti Shield

### *Your Personal Safety Companion*

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Twilio](https://img.shields.io/badge/Twilio-SMS-F22F46?style=for-the-badge&logo=twilio&logoColor=white)](https://twilio.com)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com)

<br/>

> **One tap. Your location. Your people. Instantly.**
> Shakti Shield is a full-stack women's safety platform that sends real-time SOS alerts with live GPS location to emergency contacts — in under 3 seconds.

<br/>

![Hero](https://img.shields.io/badge/Status-Live%20%26%20Working-22c55e?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)
![Made with Love](https://img.shields.io/badge/Made%20with-❤️-ef4444?style=for-the-badge)

</div>

---

## ✨ Features

### 🚨 Emergency SOS
- One-tap SHAKTI button sends instant SMS alerts
- Shares live GPS coordinates via Google Maps link
- Works even without internet using IP-based location fallback
- Confirmation dialog shows contact count, GPS status, and readiness
- SOS activity log records every alert with timestamp and location

### 📍 Live Location Map
- Real-time GPS tracking with Leaflet.js
- Satellite and standard map views
- Re-center button snaps map to your current position
- Accuracy indicator shows GPS precision in meters

### 👥 Emergency Contacts
- Add up to 10 trusted contacts with photos
- Cloudinary-powered photo upload
- One-tap delete with Cloudinary cleanup
- Contacts displayed with live status indicators

### 🔐 Authentication
- Email/password signup & login with JWT
- Google OAuth 2.0 one-click login
- Secure HTTP-only cookies
- Protected routes for all private pages

### 📝 Safety Reviews
- Community-driven location safety reviews
- 1–5 star rating system
- Filter by Positive / Critical reviews
- Search by location, title, or username
- Users can delete their own reviews

### 👤 Profile Management
- Profile photo upload via Cloudinary
- Edit username and email in-place
- Real SOS alert count from database
- Live contact count display
- Google accounts show "Managed by Google" for password

### 📊 Admin Dashboard
- Overview with total users, SOS alerts, Google users
- Full user management with join date and contact count
- All SOS logs with clickable Google Maps links
- Status badges (success/failed) for each alert
- Admin-only access via `isAdmin` flag

### 📈 SOS Activity Log
- Personal history of all SOS alerts triggered
- Shows alert number, timestamp, GPS coordinates, contacts alerted
- Success/failure status for each alert

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, TailwindCSS, Framer Motion |
| **Backend** | Node.js, Express.js, ES Modules |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Auth** | JWT, Google OAuth 2.0, Passport.js |
| **SMS** | Twilio API |
| **Media** | Cloudinary, Multer |
| **Maps** | Leaflet.js, React-Leaflet |
| **Fonts** | Syne (display), DM Sans (body) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Twilio account
- Cloudinary account
- Google Cloud Console project

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Shakti--Shield.git
cd Shakti--Shield

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create `server/.env`:

```env
PORT=5000
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
```

Create `client/.env`:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Running the App

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

---

## 📁 Project Structure

```
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
```

---

## 📱 Screenshots

| Home | SOS Active | Map |
|---|---|---|
| <img width="600" src="https://github.com/user-attachments/assets/2ffc5b4e-1e9d-4823-b437-20ddb0b9fa6a" /> | <img width="600" src="https://github.com/user-attachments/assets/a7f75a01-d5cc-41b3-a2d4-943e0435d545" /> | <img width="600" src="https://github.com/user-attachments/assets/76385b62-b8f2-4d11-a182-d020893341a7" /> |

| Profile | Admin Dashboard | Reviews |
|---|---|---|
| <img width="600" src="https://github.com/user-attachments/assets/694becb2-bea0-45db-b723-ab3da902628b" /> | <img width="600" src="https://github.com/user-attachments/assets/43197858-8050-4201-b78a-6eff0baf8bd2" /> | <img width="600" src="https://github.com/user-attachments/assets/40d7ce6f-2e4e-4ddc-8cb6-f39d1f9d86bc" /> |

---

## 🔐 Admin Access

To grant admin access to a user:

1. Go to **MongoDB Atlas** → Collections → `users`
2. Find the user document
3. Add field: `"isAdmin": true`
4. Visit `http://your-domain/admin`

---

## ⚡ API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/signup` | Register new user |
| POST | `/api/user/login` | Login with email/password |
| POST | `/api/user/googleLogin` | Google OAuth login |
| GET | `/api/user/auth-check` | Verify session |
| POST | `/api/user/logout` | Logout |

### Contacts & SOS
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contacts/addcontact` | Add emergency contact |
| DELETE | `/api/contacts/delete-contact` | Remove contact |
| POST | `/api/contacts/emergency` | Send SOS alert via Twilio |

### SOS Logs
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/soslogs/add` | Save SOS log |
| GET | `/api/soslogs/get` | Get user's SOS history |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/stats` | Dashboard stats + recent SOS |
| GET | `/api/admin/users` | All users list |

---

## 🌟 Impact

- 🛡️ **Real protection** — SMS alerts reach contacts in under 3 seconds
- 📍 **Precise location** — GPS coordinates shared as a Google Maps link
- 👥 **Community safety** — Reviews help others identify safe/unsafe areas
- 🔒 **Privacy-first** — JWT auth, encrypted passwords, secure cookies
- 📊 **Transparent** — Full audit trail of every SOS alert in the admin dashboard

---

## 🚧 Future Roadmap

- [ ] 🌐 Deploy to Vercel + Render (online hosting)
- [ ] 📱 Progressive Web App (installable on phones)
- [ ] 📞 Emergency calling directly from app
- [ ] 🤖 AI threat detection from review patterns
- [ ] 📵 Offline SOS mode (queue and send when reconnected)
- [ ] 🔔 Push notifications for SOS acknowledgments
- [ ] 🗺️ Heatmap of unsafe areas from community reviews

---

## 👨‍💻 Author

**Srajal Singh**
NIET, Noida Institute of Engineering and Technology
B.Tech CSE — 2025

---

<div align="center">

**Built with 🛡️ for personal safety**

*Shakti Shield — Stay Safe. Stay Connected.*

</div>
