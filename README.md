# 🎯 Quiz Management System

A full-stack quiz platform built for **Sparkl Edventure** intern assignment. Features two separate interfaces — a **CMS dashboard** for admins/teachers to create and manage quizzes, and a **Student portal** for attempting quizzes and viewing results.

---

## 🌐 Live Demo

| Interface | URL |
|-----------|-----|
| Frontend (Vercel) | https://quiz-app-eta-livid-17.vercel.app |
| Backend (Render) | https://quiz-app-uw5i.onrender.com |

> ⚠️ Backend is hosted on Render's free tier — first request may take 50+ seconds to wake up.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Tokens) |
| Password Hashing | bcryptjs |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## ✨ Features

### CMS (Admin/Teacher)
- 🔐 Secure login with role-based access
- 📝 Create quizzes with title, duration, marks
- ➕ Add multiple questions with 4 options each
- 📊 View all quizzes on dashboard
- 👥 View participants and their scores

### Student
- 🔐 Secure login with role-based access
- 📋 View all available quizzes
- ▶️ Attempt quizzes with previous/next navigation
- ⏱️ Quiz timer displayed during attempt
- 📈 View detailed report with correct/wrong answers and score

---

## 📂 Project Structure

```
quiz-app/
├── client/                   # React frontend
│   └── src/
│       ├── api/
│       │   └── api.js        # Axios instance
│       ├── pages/
│       │   ├── Login.jsx         # Login (role-based redirect)
│       │   ├── Dashboard.jsx     # Student dashboard
│       │   ├── CMSDashboard.jsx  # Admin dashboard
│       │   ├── CreateQuiz.jsx    # Create quiz (2 steps)
│       │   ├── Quiz.jsx          # Quiz attempt screen
│       │   └── Report.jsx        # Score report screen
│       └── App.jsx           # Routes
│
└── server/                   # Node.js backend
    ├── controllers/
    │   ├── authController.js     # Login, Register
    │   ├── quizController.js     # Create, Get quizzes
    │   ├── attemptController.js  # Start, Save, Submit attempts
    │   └── questionController.js # Question management
    ├── models/
    │   ├── User.js           # User schema (cms/student roles)
    │   ├── Quiz.js           # Quiz schema (embedded questions)
    │   ├── Attempt.js        # Attempt schema (responses, score)
    │   └── Question.js       # Question schema
    ├── routes/
    │   ├── authRoutes.js
    │   ├── quizRoutes.js
    │   ├── attemptRoutes.js
    │   └── questionRoutes.js
    └── server.js             # Entry point
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/AmanSingh16072002/quiz-app.git
cd quiz-app
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend:
```bash
node server.js
```
Server runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 📡 API Documentation

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Quiz Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quizzes` | Get all quizzes |
| POST | `/api/quizzes` | Create a new quiz |

### Attempt Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/attempts/start` | Start a quiz attempt |
| POST | `/api/attempts/save` | Save a question response |
| POST | `/api/attempts/submit` | Submit and calculate score |
| GET | `/api/attempts/report/:id` | Get attempt report |

---

## 🧪 Sample Data

### Register Admin User
```json
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin"
}
```

### Register Student User
```json
POST /api/auth/register
{
  "name": "Student User",
  "email": "student@test.com",
  "password": "123456",
  "role": "student"
}
```

---

## 🧠 Assumptions Made

- A user's role (`admin` or `student`) is set at registration time
- Questions are embedded directly inside the Quiz document for simplicity
- Quiz timer is handled on the frontend
- No email verification is required for registration
- A student can attempt a quiz multiple times (last attempt is tracked)

---

## 📌 Future Improvements

- [ ] Backend timer sync to prevent cheating
- [ ] CMS participants view with detailed reports
- [ ] Password reset functionality
- [ ] Question bank (reusable questions across quizzes)
- [ ] Better UI with Tailwind CSS
- [ ] Protected routes (redirect if not logged in)

---

## 👨‍💻 Author

**Aman Singh**  
B.Tech — Mechanical Engineering + Minor in Computer Science  
NIT Uttarakhand  
GitHub: [@AmanSingh16072002](https://github.com/AmanSingh16072002)