## Request Form Management System 
## Other feature are still missing like notification of employee if there request was approved or rejected
## User profile page where employee or admins can see there own details

A Request Form Management System built with the MERN stack and following the MVC architecture with a dedicated service layer.
This project enables role-based login and online submission of leave forms with a **multi-step approval workflow**.

---

## Features

* **Role-based authentication & authorization**

  * Implemented using **JWT** for token-based sessions
  * Secure password hashing with **bcrypt**
* **Form Management**

  * Online submission of leave request forms
  * Validation using **express-validator**
* **Approval Workflow**

  * 4-level approval process:

    1. **Admin**
    2. **HR**
    3. **Program Head**
    4. **President**
* **Frontend**

  * Built with **React + TypeScript**
  * Modular UI with reusable components
  * Integration with backend REST APIs
    
  * MVC design pattern
  * Business logic separated into a service layer for maintainability and testability

---

## Tech Stack 


**Frontend**  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

* **Authentication:** JWT, bcrypt
* **Validation:** express-validator
* **Architecture:** MVC + Service Layer

---

## 📂 Project Structure

```
project-root/
│── backend/
│   ├── src/
│   │   ├── controllers/   # Handle requests & responses
│   │   ├── services/      # Business logic (separated from controllers)
│   │   ├── models/        # Database schemas with Mongoose
│   │   ├── routes/        # Express routes
│   │   ├── utils/         # Utility functions (e.g., JWT, error handling)
│   │   └── middlewares/   # Custom middlewares (auth, validation, checking user role)
│   └── config/            # Environment & database configs
│
│── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/ admin and client folder       # Page-level components
│   │   ├── utils/      # API calls using Axios 
│   │   
│   └── public/
│
├── package.json
└── README.md
```

---

## 🔐 Authentication & Security

* Users login with **email & password**
* Passwords are hashed using **bcrypt**
* On login, users receive a **JWT** for protected routes
* Role-based access ensures different approval flows (Admin, HR, Program Head, President)

---

## 📝 Approval Flow

1. **Employee submits a leave request** through the frontend form
2. Request is approved or reject sequentially by:

   * Admin → HR → Program Head → President
3. Each approver can **approve or reject**
4. Once approved/rejected, the request updates in the database and status reflects in frontend

---

## 🛠️ Installation & Setup

### Backend

1. Navigate to backend folder

   ```poweshell
   cd backend
   npm install
   ```
2. Set up environment variables in a `.env` file:

   ```
   MONGO_URI=your-mongo-connection
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=1d
   ```
3. Run backend server

   ```powershell
   npm run dev
   ```

### Frontend

1. Navigate to frontend folder

   ```powershell
   cd frontend
   npm install
   ```
2. Start frontend development server

   ```powershell
   npm run dev
   ```

---

## 📌 Future Improvements
* K A P O Y  P A G T I W A S
* Backend code convert to Typescript
* Added Notification every approver decide
* Add email notifications for each approval step
* Dashboard for employees and approvers
* Unit and integration tests for critical flows
* Role-based UI (different menus for Admin, HR, Program Head, President)

---
