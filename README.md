# 📚 Bright Path Education Hub – Complete Platform

**Bright Path Education Hub** is a modern, full‑featured online learning platform that offers:

- 📘 **Tutoring** for Grade 1–12, university, and professional courses  
- 🌍 **International exam preparation** – IELTS, TOEFL, SAT, GAT, DELF, Goethe, Duolingo English Test  
- 💻 **Digital skills training** – Full‑stack development, digital marketing, video editing, Forex, ICT, etc.  
- 🕌 **Quranic studies** with Tajwid and Hifz  
- 🌐 **Online & face‑to‑face** learning options  

The platform includes **user authentication, course enrollment, resource sharing, tutoring session booking, assignment submissions, and an admin dashboard**.

It is available in two variants:

1. **Standalone HTML/CSS/JS version** – fully functional single‑page application (SPA) with localStorage persistence.  
2. **Full‑stack version** – production‑ready backend (Node.js + Express + MongoDB + JWT + Cloudinary) and frontend (React + Redux Toolkit + Tailwind CSS).

---

## 🚀 Live Demo (Standalone HTML)

Just open the `index.html` file in any modern browser – no installation required.  
Admin password: `admin123`

---

## 📁 Project Structure (Full‑Stack Version)

Bright-Path-Education-Hub-Website/
├── server/ # Backend (Node.js + Express)
│ ├── config/ # DB, Cloudinary, email config
│ ├── controllers/ # Business logic (auth, courses, resources, tutoring)
│ ├── models/ # Mongoose models (User, Course, Resource, etc.)
│ ├── routes/ # API endpoints
│ ├── middleware/ # Auth, errorHandler, validation, rateLimiter
│ ├── utils/ # JWT, catchAsync, AppError, email templates
│ ├── validations/ # Express-validator schemas
│ ├── services/ # Email, Cloudinary, payment (stripe placeholder)
│ ├── tests/ # Unit & integration tests
│ ├── .env # Environment variables
│ ├── server.js # Entry point
│ └── package.json
│
└── client/ # Frontend (React + Vite + Redux)
├── public/ # Static assets (index.html, favicon, manifest)
├── src/
│ ├── components/ # Reusable UI (Navbar, Footer, Modals, Forms)
│ ├── pages/ # All views (Home, About, Courses, Dashboard, etc.)
│ ├── hooks/ # Custom hooks (useAuth, useApi, useForm)
│ ├── context/ # React contexts (Auth, Theme, Loading)
│ ├── redux/ # Redux store, slices, and API services
│ ├── services/ # Axios API calls
│ ├── utils/ # Constants, formatters, validators
│ ├── assets/ # Images, styles, icons
│ ├── routes/ # AppRouter.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── .env
├── vite.config.js
├── tailwind.config.js
└── package.json

text

---

## 🧰 Tech Stack

### Backend

- **Runtime**: Node.js  
- **Framework**: Express.js  
- **Database**: MongoDB + Mongoose ODM  
- **Authentication**: JWT (JSON Web Tokens)  
- **File Storage**: Cloudinary (via Multer)  
- **Email**: Nodemailer (SMTP)  
- **Security**: bcryptjs, express-rate-limit, helmet, cors  
- **Validation**: express-validator  
- **Logging**: morgan  

### Frontend (full‑stack version)

- **Library**: React 18  
- **Build tool**: Vite  
- **State Management**: Redux Toolkit  
- **Routing**: React Router v6  
- **Styling**: Tailwind CSS  
- **HTTP client**: Axios  

### Standalone HTML version

- **HTML5 / CSS3 (Tailwind CDN)**  
- **Vanilla JavaScript** (ES6)  
- **localStorage** for data persistence  

---

## ✨ Features

### User Features

- ✅ Register / Login with JWT (or email/password in standalone)  
- ✅ View all courses and enroll  
- ✅ Access learning resources (PDFs, videos)  
- ✅ Submit assignments / projects (with file upload)  
- ✅ Book one‑on‑one tutoring sessions  
- ✅ View personal submissions and enrollment history  

### Admin Features

- ✅ View all registered users  
- ✅ Create new courses  
- ✅ Upload resources (files to Cloudinary)  
- ✅ Monitor all submissions  

### General

- ✅ Fully responsive design (mobile, tablet, desktop)  
- ✅ Interactive service cards with submission modals  
- ✅ Background slideshow on hero section  
- ✅ Email notifications to founder on new registrations & submissions  

---

## ⚙️ Installation & Setup (Full‑Stack Version)

### Prerequisites

- Node.js (v16+)  
- MongoDB (local or Atlas)  
- Cloudinary account (for file uploads)  
- Gmail / SMTP credentials (for email notifications)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Bright-Path-Education-Hub.git
cd Bright-Path-Education-Hub
2. Backend setup
bash
cd server
npm install
Create a .env file in the server folder with the following variables:

env
PORT=5000
PORT=5000
MONGO_URI=mongodb://localhost:27017/mongodb+srv://brightpatheducation:<admin***>@brightpathapp.kvip71a.mongodb.net/brightpathapp?appName=brightpathapp
JWT_SECRET=9f3c7e6a2b8d4f1a5c0e7b9d2a6f3c8e1b4d7a9c5e2f8a1d6c3b9e7f0a2d4c6
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=brightpathapp
CLOUDINARY_API_KEY=admin123
CLOUDINARY_API_SECRET=brightpathapp
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=nejat.mahammednur@aau.edu.et
EMAIL_PASS=admin***
CLIENT_URL=http://localhost:5173
Start the backend server:

bash
npm run dev
3. Frontend setup
bash
cd ../client
npm install
Create a .env file in the client folder:

env
VITE_API_URL=http://localhost:5000/api
Start the development server:

bash
npm run dev
The application will open at http://localhost:5173.

📡 API Endpoints (Backend)
Method Endpoint Description Access
POST /api/auth/register User registration Public
POST /api/auth/login User login Public
POST /api/auth/forgot-password Send reset email Public
POST /api/auth/reset-password Reset password Public
GET /api/users/profile Get current user profile Private
PATCH /api/users/profile Update profile Private
GET /api/users List all users (admin only) Admin
GET /api/courses Get all published courses Public
GET /api/courses/:id Get a single course Public
POST /api/courses Create a course (admin/tutor) Private
POST /api/courses/:id/enroll Enroll in a course Private
GET /api/resources Get resources (public + user’s) Private
POST /api/resources Upload a resource (admin/tutor) Private
POST /api/tutoring/request Request a tutoring session Private
GET /api/tutoring/my-sessions Get user’s sessions Private
POST /api/uploads/image Upload an image (Cloudinary) Private
🧪 Testing
Unit and integration tests are placed in server/tests/.
Run backend tests:

bash
cd server
npm test
🌟 Standalone HTML Version (No Backend Required)
If you prefer a single‑file solution that works immediately:

Copy the complete HTML code provided in the final answer into a file named index.html.

Open it directly in your browser.

Use the following demo credentials:

Admin – email: admin@brightpath.com, password: admin123

New user – register via the modal.

All data (users, submissions) are stored in the browser’s localStorage.
The Google Form link is available as a secondary registration option.

📞 Contact & Support
Founder & CEO: Nejat Mahammednur
📧 Email: nejat.mahammednur@aau.edu.et
📞 Phone: +251911870215

Social Media

YouTube

LinkedIn

WhatsApp Group

Telegram

📄 License
This project is proprietary and intended for educational/demo purposes. For commercial use, please contact the founder.

🙏 Acknowledgements
Tailwind CSS for rapid styling

Font Awesome for icons

Cloudinary for file hosting

All contributors and early adopters
