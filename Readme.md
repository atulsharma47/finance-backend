# 📊 Finance Backend API

## 🚀 Overview

A **Node.js + Express backend system** for managing financial records with:

* 🔐 JWT Authentication
* 👥 Role-based access control
* 📊 Financial analytics dashboard
* 🔍 Filtering, search, and pagination
* 🗑 Soft delete for data safety
* 🧪 Unit testing using Jest

---

## 🧠 Key Features

* User management with roles (Admin, Analyst, Viewer)
* Secure API access using JWT
* Full CRUD operations for financial records
* Advanced querying (filter + search + pagination)
* Dashboard with aggregated insights
* Monthly trends analysis
* Soft delete implementation
* Automated API testing

---

## 🔐 Authentication

### Login

POST `/api/users/login`

```json id="a1"
{
  "email": "atul@gmail.com"
}
```

### Response

```json id="a2"
{
  "token": "JWT_TOKEN"
}
```

### Usage

```http id="a3"
Authorization: Bearer JWT_TOKEN
```

---

## 👤 User APIs

| Method | Endpoint         | Description |
| ------ | ---------------- | ----------- |
| POST   | /api/users       | Create user |
| POST   | /api/users/login | Login user  |
| GET    | /api/users       | Get users   |
| PUT    | /api/users/:id   | Update user |
| DELETE | /api/users/:id   | Delete user |

---

## 💰 Record APIs

### Create Record (Admin)

POST `/api/records`

### Get Records

GET `/api/records`

#### Query Params:

* `type`
* `category`
* `search`
* `startDate`
* `endDate`
* `page`
* `limit`

Example:

```http id="a4"
/api/records?search=food&page=1&limit=2
```

---

### Update Record

PUT `/api/records/:id`

---

### Delete Record (Soft Delete)

DELETE `/api/records/:id`

---

## 📊 Dashboard APIs

### Summary

GET `/api/records/summary`

Includes:

* Total income
* Total expense
* Balance
* Category totals
* Recent activity

---

### Monthly Trends

GET `/api/records/trends`

---

## 🔍 Advanced Features

### ✔ Filtering

Filter by type, category, and date

### ✔ Pagination

```http id="a5"
?page=1&limit=5
```

### ✔ Search

```http id="a6"
?search=salary
```

### ✔ Soft Delete

* Records are not permanently deleted
* Stored with `isDeleted = true`

---

## 🧪 Testing

Implemented using:

* Jest
* Supertest

Run tests:

```bash id="a7"
npm test
```

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Token (JWT)
* Jest + Supertest

---

## ▶️ Run Locally

```bash id="a8"
npm install
npx nodemon server.js
```

---

## ⚠️ Environment Variables

Create `.env` file:

```env id="a9"
MONGO_URI=your_mongodb_connection_string
```

---

## 📈 Project Highlights

* Clean architecture
* Secure authentication
* Scalable API design
* Real-world backend practices
* Fully tested endpoints

---

## 🚀 Future Improvements

* API documentation with Swagger
* Rate limiting
* Deployment (Render / Railway)
* Frontend integration

---
