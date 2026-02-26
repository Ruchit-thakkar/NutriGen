# 🍏 NutriGen

A full‑stack **MERN** (MongoDB, Express, React, Node.js) application that helps users manage nutrition plans, track progress, and provides administration tools for support and analytics.

---

## 📌 Project Overview

NutriGen is designed as a responsive web platform where users can:

- Create and follow daily meal/exercise plans  
- Monitor progress and profile information  
- Communicate with support through tickets  
- For administrators: view user statistics, manage users, and respond to support requests  

The frontend is built with **React** (Vite) as a single‑page application. The backend is a RESTful API powered by **Node.js** and **Express**, with **MongoDB** as the data store.

---

## ⚙️ Key Features

- **User authentication & JWT protection**
- Daily meal/exercise planner
- Progress tracking and dashboard
- Admin panel with user management, charts, and support tickets
- Support ticket system
- PWA ready (service worker included)
- Modular codebase with clear separation of concerns

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)  
- npm / yarn  
- MongoDB instance (local or Atlas)

### Environment Variables

Create a `.env` file in the `backend/` folder with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nutrigen
JWT_SECRET=your_jwt_secret_here
```

Adjust values for production or remote databases as needed.

### Installation & Running Locally

1. **Backend**

   ```bash
   cd backend
   npm install
   npm run seed    # optional, populate with sample data
   npm start       # or `node server.js` / `npm run dev` with nodemon
   ```

2. **Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev    # starts Vite dev server (usually http://localhost:5173)
   ```

3. Open your browser:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api/...`

---

## 📁 File Structure

```
.
├── backend/                   # Express API
│   ├── .env
│   ├── server.js
│   ├── reset.js, seed.js
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── Middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── public/                # served static React build in production
└── frontend/                  # React (Vite) app
    ├── index.html
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── utils/
    ├── package.json
    └── vite.config.js
```

> The backend’s `public/` folder is where the production build of the React app is deployed.

---

## 🛠️ Additional Notes

- **Seeding**: `backend/seed.js` resets data for testing or development.
- **API base path**: `/api` (e.g. `/api/auth/login`, `/api/food`)
- **PWA support**: service worker registration in `public/registerSW.js`.
- **ESLint configuration** exists in `frontend/eslint.config.js`.

---

## 📄 License

This project is open source—feel free to fork, modify, and contribute.

---

Happy coding! 🎉  
Let me know if you need help deploying or extending any feature.
