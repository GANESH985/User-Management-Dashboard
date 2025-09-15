# User Management System

A full-stack **User Management System** built with **React (frontend)** and **Node.js + Express + MongoDB (backend)**.  
This project demonstrates authentication, CRUD operations, and a responsive UI styled with **TailwindCSS**.

---

## 📂 Project Structure

user-management-with-tailwind/
│
├── backend/ # Backend (Node.js + Express + MongoDB)
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── controllers/ # Business logic
│ ├── server.js # Entry point for backend
│ └── package.json
│
├── frontend/ # Frontend (React + TailwindCSS)
│ ├── src/ # React components, pages, utils
│ ├── public/ # index.html
│ └── package.json
│
└── README.md # Project documentation

yaml
Copy code

---

## 🚀 Tech Stack

### Frontend
- **React.js (CRA)** – UI library
- **TailwindCSS** – Styling
- **Axios** – API calls
- **React Router** – Routing

### Backend
- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB + Mongoose** – Database & ORM
- **Cors & dotenv** – Middleware and environment config

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/user-management-with-tailwind.git
cd user-management-with-tailwind
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file inside backend/:

ini
Copy code
MONGO_URI=mongodb://127.0.0.1:27017/user_management
PORT=5000
Run the backend:

bash
Copy code
npm start
Backend runs on 👉 http://localhost:5000

3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
Run the frontend:

bash
Copy code
npm start
Frontend runs on 👉 http://localhost:3000

🌐 API Endpoints
User Routes
Method	Endpoint	Description
GET	/api/users	Fetch all users
GET	/api/users/:id	Fetch user by ID
POST	/api/users	Create new user
PUT	/api/users/:id	Update user details
DELETE	/api/users/:id	Delete user

🖥️ Features
Add, update, delete, and list users

Responsive design with TailwindCSS

Backend API integration with MongoDB

Input validations and error handling

Modular folder structure (controllers, routes, models)
