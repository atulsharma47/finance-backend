# 📊 Finance Backend API

## 🚀 Live Project

* 🌐 **Live API:** https://finance-backend-3ycy.onrender.com/
* 💻 **GitHub Repo:** https://github.com/atulsharma47/finance-backend

---

## 📌 Overview

This project is a **Finance Backend System** built using **Node.js, Express, and MongoDB**.

It provides a complete backend solution for managing financial records such as income and expenses, with secure access using JWT authentication and role-based authorization.

---

## 🎯 Key Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access control (Admin, Analyst, Viewer)
* Protected routes using middleware

---

### 👤 User Management

* Create users
* Assign roles
* Update and delete users
* Manage user status (active/inactive)

---

### 💰 Financial Records

* Create, read, update, delete records
* Each record contains:

  * amount
  * type (income/expense)
  * category
  * date
  * notes

---

### 🔍 Advanced Query Features

* Filtering (type, category, date)
* Search (category & notes)
* Pagination (`page`, `limit`)
* User-specific data access

---

### 📊 Dashboard & Analytics

* Total income
* Total expense
* Net balance
* Category-wise totals
* Recent activity
* Monthly trends

---

### 🗑 Soft Delete

* Records are not permanently deleted
* Marked using `isDeleted = true`
* Prevents accidental data loss

---

### 🧪 Testing

* Unit testing using **Jest + Supertest**
* Tested:

  * Create record
  * Get records
* Includes proper DB connection cleanup

---

## 🔐 Authentication Flow

### Login

POST `/api/users/login`

```json
{
  "email": "atul@gmail.com"
}
```

### Response

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

### Usage

```http
Authorization: Bearer JWT_TOKEN
```

---

## 📡 API Endpoints

### 👤 User Routes

| Method | Endpoint         | Description |
| ------ | ---------------- | ----------- |
| POST   | /api/users       | Create user |
| POST   | /api/users/login | Login       |
| GET    | /api/users       | Get users   |
| PUT    | /api/users/:id   | Update user |
| DELETE | /api/users/:id   | Delete user |

---

### 💰 Record Routes

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/records     | Create record |
| GET    | /api/records     | Get records   |
| PUT    | /api/records/:id | Update record |
| DELETE | /api/records/:id | Soft delete   |

---

### 📊 Dashboard APIs

| Endpoint                 | Description       |
| ------------------------ | ----------------- |
| GET /api/records/summary | Summary analytics |
| GET /api/records/trends  | Monthly trends    |

---

## 🔍 Query Examples

### Pagination

```http
/api/records?page=1&limit=2
```

### Search

```http
/api/records?search=food
```

### Filtering

```http
/api/records?type=income&category=salary
```

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Token (JWT)
* Jest & Supertest

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

---

## ▶️ Run Locally

```bash
npm install
npx nodemon server.js
```

---

## 🚀 Deployment

This project is deployed on **Render**.

Steps followed:

* Connected GitHub repository
* Configured environment variables
* Deployed Node.js service
* Connected MongoDB Atlas

---

## 📈 Project Highlights

* Full backend architecture
* Secure authentication system
* Scalable API design
* Real-world features (pagination, search, analytics)
* Clean and modular code structure
* Fully deployed and tested

---

## 🔮 Future Improvements

* Swagger API documentation
* Rate limiting
* Frontend integration
* Role-based dashboards

---

## 🏁 Conclusion

This project demonstrates a **production-ready backend system** with real-world features, security, and scalability.

---
