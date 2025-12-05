# 📦 GiftLink – IBM Full Stack JavaScript Capstone Project

GiftLink is a full-stack JavaScript application built as part of the **IBM Full Stack JavaScript Developer Professional Certificate**.  
The project demonstrates backend + frontend development, MongoDB database integration, REST API creation, JWT authentication, and GitHub project management practices.

---

## 🚀 Features

### 👤 User Authentication
- User registration with hashed passwords
- Login system using JWT tokens
- Display logged-in username
- Logout functionality

### 🎁 Gift Management
- Fetch all gifts (protected route)
- Add new gifts (protected route)
- MongoDB Atlas database integration
- Gift listing in frontend UI

### 🌐 Frontend (EJS + Express)
- EJS templating engine for pages
- Pages include Home, Register, Login, Gifts
- Navbar with dynamic username
- Clean and simple styled UI

---

## 🗂️ Project Structure

giftlink-project/
│
├── giftlink-backend/
│ ├── config/db.js
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
├── giftlink-frontend/
│ ├── public/style.css
│ ├── views/
│ │ ├── home.ejs
│ │ ├── login.ejs
│ │ ├── register.ejs
│ │ ├── gifts.ejs
│ │ └── partials/navbar.ejs
│ ├── server.js
│ └── package.json
│
└── README.md


---

## 🛢️ MongoDB Setup

MongoDB Atlas is used to store users and gifts.

Environment variable:



MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/giftlink


Included:
- Imported `gifts.json` dataset with 16 gift documents.

---

## 🔐 JWT Authentication

JWT token contains the user ID and name:

```javascript
const token = jwt.sign(
  {
    userId: user._id,
    name: user.name
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


Frontend stores JWT in localStorage.

🧪 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and receive JWT
Gifts
Method	Endpoint	Description
GET	/api/gifts	Get all gifts (requires token)
POST	/api/gifts	Add a gift (requires token)
🖥️ Running the Project Locally
1️⃣ Start Backend
cd giftlink-backend
npm install
nodemon server.js


Runs on: http://localhost:5000

2️⃣ Start Frontend
cd giftlink-frontend
npm install
nodemon server.js


Runs on: http://localhost:3000
