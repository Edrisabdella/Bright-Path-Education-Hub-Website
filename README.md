# Bright-Path-Education-Hub-Website

Bright Path Education Hub is an official online and face to face tutor and training center  Services

## Bright Path Education Hub – Official Platform

**Learn Smarter • Achieve Higher**

Bright Path Education Hub is a fully functional online learning platform that bridges academic tutoring, exam preparation, language training, and professional skill development. It enables learners to access resources, submit assignments/projects/quizzes, and receive feedback – all in one place.

> **Live Demo**: Deploy this repository as a static site on Render, Vercel, or Netlify.  
> **Admin Credentials**: `admin123` (password for admin panel)

---

## 📚 Table of Contents

- [Features](#-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Local Setup](#️-installation--local-setup)
- [Deployment on Render](#deployment-on-render)
- [How to Use](#how-to-use)
  - [For Learners](#for-learners)
  - [For Admins / Instructors](#for-admins--instructors)
- [Data Persistence](#data-persistence)
- [Contact & Support](#contact-support)
- [License](#license)

---

## ✨ Features

### Core Functionality

- **User Authentication** – Learners sign up with name & email; their submissions are linked to their account.
- **Service‑Based Resource Access** – 19+ educational services (K‑12 tutoring, entrance/exit exams, IELTS/TOEFL/SAT, programming, languages, Quran, etc.)
- **Resource Download** – Admins upload PDFs, documents, or any files per service; learners can download them instantly.
- **Assignment / Quiz / Project Submission** – Learners submit work with title, description, and optional file attachment.
- **Personal Submission History** – Each learner sees only their own past submissions for every service.
- **Admin Dashboard** – Upload resources to any service, view **all** submissions from all learners, and download attached files.
- **Email Notification** – Every learner submission triggers a `mailto:` link to notify the hub (`nejat.mahammednur@aau.edu.et`).
- **Responsive Design** – Works flawlessly on desktop, tablet, and mobile.

### Additional Content

- Dynamic hero background slider (3 rotating images)
- Rotating logo interchange (brand showcase)
- Founder & director section with LinkedIn & email links
- Social media integration (YouTube, LinkedIn, WhatsApp, Telegram)
- Clickable phone number (`+251911870215`) for direct calls

---

## 🛠 Technology Stack

| Layer       | Technology                                                   |
|-------------|-------------------------------------------------------------|
| Frontend    | HTML5, Tailwind CSS, JavaScript (ES6+)                      |
| Icons       | Font Awesome 6                                              |
| Storage     | **IndexedDB** (via localForage) – persists data in browser  |
| Hosting     | Any static hosting (Render, Netlify, Vercel, GitHub Pages)  |
| No Backend  | Fully client‑side; no server required                       |

> All user data, resources, and submissions are stored locally in the learner’s browser using IndexedDB. This makes the platform zero‑cost and instantly deployable.

---

## 📁 Project Structure

/
├── index.html # Complete single‑page application
├── README.md # This file
The entire application is contained in one HTML file – easy to deploy, modify, and distribute.

---

## ⚙️ Installation & Local Setup

1. **Clone or download** this repository.
2. Open the folder and double‑click `index.html` – it will run directly in your browser.
   - No build steps, no dependencies to install.
3. For a better experience, serve it with a local web server:

   ```bash
   npx serve .
   # or use Python: python -m http.server 8000
   Open http://localhost:8000 and start using the platform.

🚀 Deployment on Render (Free Static Site)
Render is recommended because it provides free HTTPS, continuous deployment from Git, and global CDN.

Step‑by‑Step
Push the code to a GitHub repository (public or private).

Log in to Render.com.

Click New + → Static Site.

Connect your GitHub repository.

Configure:

Name: bright-path-education-hub (or any)

Branch: main

Build Command: leave empty (or echo "no build required")

Publish Directory: . (root folder)

Click Create Static Site.

In a few seconds, your live URL will be ready (e.g., <https://bright-path-education-hub.onrender.com>).

No environment variables or database setup needed – everything runs client‑side.

Alternative Hosting
Netlify: Drag & drop the index.html file.

Vercel: vercel --prod

GitHub Pages: Push to a gh-pages branch.

👥 How to Use
For Learners
Login / Register – Click the Login button in the navbar. Enter your full name and email address.

Browse Services – Scroll to the Our Comprehensive Services section. Each card represents a subject or training area.

Access Resources – Click Resources & Submit on any service card.

View and download materials uploaded by admins.

Submit your own assignment, quiz, or project by filling the form.

Attach a file (optional) and click Submit Work.

Track Your Submissions – Re‑open the same service modal to see your previous submissions listed under Your Submissions.

Contact the Hub – Use the footer or contact section to call, email, or join WhatsApp/Telegram groups.

For Admins / Instructors
Open Admin Panel – Click the floating yellow Admin button at the bottom‑right corner.

Enter Password – Use admin123 (case‑sensitive).

Upload Resources – Select a service from the dropdown, choose a file, give it a name, and click Upload Resource.

The resource becomes instantly available to all learners.

View All Submissions – The admin panel shows every submission from every learner, including file attachments that can be downloaded.

Manage Content – You can upload as many resources as needed; each service maintains its own list.

💡 Tip: To change the admin password, edit the line if (pwd === 'admin123') in the JavaScript section of index.html.

💾 Data Persistence
IndexedDB (via localforage) stores:

All uploaded resources (file name + dataURL)

All learner submissions (text + optional file attachments)

No external database required.

Data remains in the browser even after closing or refreshing the page.

Clearing browser cache / site data will erase all information. For production use with multiple users, consider a backend (but the current design is ideal for a single organization or classroom setting where each device is shared).

📞 Contact & Support
Founder & Director: Nejat Mahammednur

Phone / WhatsApp: +251911870215

Email: <nejat.mahammednur@aau.edu.et>

YouTube: Education Hub Academy

LinkedIn: Nejat Mehammednur

WhatsApp Group: Join here

Telegram: Join here

For technical issues or feature requests, please open an issue in this repository or contact the hub directly.

📄 License
This project is proprietary to Bright Path Education Hub. You may use and modify it for internal educational purposes. Redistribution or commercial resale is not permitted without explicit consent.

© 2026 Bright Path Education Hub – Empowering futures through accessible, high‑quality education.
