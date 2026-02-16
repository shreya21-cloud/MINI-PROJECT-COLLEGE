# Student Attendance Portal (Full Stack)

## 📌 Overview

The **Student Attendance Portal** is a full stack web application designed to manage student attendance records efficiently.
This system allows users to register, login, and manage attendance data through a user-friendly frontend connected to a secure backend.

The project demonstrates full stack development using **Node.js, Express.js, MongoDB**, and frontend technologies.

---

## 🛠️ Tech Stack

### 🔹 Frontend

* HTML
* CSS / Tailwind CSS (if used)
* JavaScript
* EJS (if using server-side rendering)

### 🔹 Backend

* Node.js
* Express.js
* REST APIs

### 🔹 Database

* MongoDB
* Mongoose

### 🔹 Security & Tools

* bcrypt (Password Hashing)
* Nodemon
* Postman (API Testing)

---

## ✨ Features

### 👨‍🎓 Student Side

* User Registration & Login
* View Attendance Records
* Dashboard Interface

### 👨‍🏫 Admin / Teacher Side

* Add Students
* Mark Attendance
* Update Attendance
* Delete Attendance Records

### 🔐 Authentication

* Secure password hashing using bcrypt
* Login validation
* Protected backend logic

---

## 📂 Project Structure (Example)

```
student-attendance-portal/
│
├── frontend/
│   ├── views/ (EJS / HTML)
│   ├── public/
│   │   ├── css/
│   │   └── js/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── config/
│
├── app.js / server.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone <repository-link>
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Start the server

```
npm run dev
```

or

```
node app.js
```

---

## 🗄️ Database Configuration

MongoDB connection example:

```
mongodb://localhost:27017/student-attendance
```

---

## 📡 Main Functionalities

* User authentication (Register/Login)
* Attendance marking system
* Attendance record management
* Data storage using MongoDB
* Frontend–Backend integration

---

## 🎯 Learning Outcomes

This project helped in learning:

* Full stack application structure
* Frontend and backend integration
* REST API creation
* MongoDB database operations
* Authentication using bcrypt
* MVC-style folder organization

---

## 🚀 Future Improvements

* JWT Authentication
* Role-based Authorization
* Attendance Reports & Charts
* Responsive UI Improvements
* Deployment (Render / Vercel / Railway)

---


