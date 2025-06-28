# 🏢 Storage-Park

**Storage-Park** is an innovative B2B2C platform for modern warehouse management and e-commerce. It connects **sellers (partners)**, **buyers (customers)**, and **warehouse admins**, enabling partners to store and manage goods, sell them online, and allow customers to track and purchase products — all from one integrated system.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Business Flow](#-business-flow)
- [User Roles](#-user-roles)
- [System Architecture](#-system-architecture)
  - [Frontend](#-frontend)
  - [Backend](#-backend)
  - [Database](#-database)
  - [External Services](#-external-services)
- [API Overview](#-api-overview)
- [Tech Stack](#-tech-stack)
- [Installation & Running](#-installation--running)

---

## 📦 Overview

Storage-Park acts as a three-sided marketplace with full warehouse integration:

- 🧾 **Partners** store their products in managed warehouses and list them for online sale.
- 🛍️ **Customers** browse and purchase available products.
- 🧑‍💼 **Admins** and **employees** manage operations, from product validation to delivery tracking.

---

## 🔁 Business Flow

1. Partner registers on the platform.
2. Admin reviews and approves the application.
3. Partner is allocated warehouse space.
4. Partner adds/manages products.
5. Customers browse and purchase.
6. Orders are processed and delivered.
7. Admins and partners monitor operations via dashboards.

---

## 👥 User Roles

| Role        | Description |
|-------------|-------------|
| **Customer** | Browse products, manage cart/wishlist, place and track orders. |
| **Partner**  | Manage products, view sales analytics, monitor inventory. |
| **Admin**    | Oversee users, approve partners, control the system. |
| **Employee** | Support warehouse operations with restricted access. |

---

## 🏗️ System Architecture

### 🖼️ Frontend

- **React 18** with **React Router DOM v7.1.1** for routing.
- **Zustand** for state management (`useUserStore`, `useCartStore`).
- **Tailwind CSS** for responsive design.

**Public Pages:**
- Home (`/`)
- Login (`/login`)
- Register Customer (`/register-customer`)
- E-commerce Shop (`/ecommerce`)

**Protected Pages:**
- Admin Dashboard (`/admin/*`)
- Partner Dashboard (`/partner/*`)
- User Profile (`/profile`)
- Cart (`/cart`)
- Payment (`/payment-form`)

---

### 🛠️ Backend

- **Express.js** server initialized in `server.js`
- **CORS**, **cookie parser**, **body parser**, and custom **role-based middleware**
- **JWT-based Authentication**

**API Routes:**

```
/api/auth         # Login, signup, logout, verification
/api/partners     # Partner info, documents, approval
/api/customers    # Customer profiles
/api/products     # Add, update, delete, list
/api/cart         # Manage cart items
/api/wishlist     # Manage wishlist
/api/orders       # Create and track orders
/api/admins       # Admin operations
/api/warehouse    # Stock, inventory, location
/api/reviews      # Product reviews
```

---

### 🗃️ Database

- **MongoDB** with **Mongoose ODM**
- `User` model supports embedded partner/customer data with roles
- Cart, wishlist, and order history are embedded in user data
- Passwords hashed with bcrypt

---

### 🌐 External Services

- **ImageKit** – for image upload and CDN
- **Google Maps API** – for delivery & warehouse location integration
- **Redis** – for performance and caching
- **Email service** – for password resets, confirmation emails, etc.

---

## 📡 API Overview

The backend follows a RESTful structure:

- 🔐 JWT Authentication with refresh tokens
- 🔍 Role verification middleware
- 🧪 Robust error handling
- ✅ Email verification and password reset flows

---

## 🧰 Tech Stack

| Layer       | Tech Used |
|-------------|-----------|
| Frontend    | React 18, Zustand, Tailwind CSS |
| Backend     | Node.js, Express.js |
| Database    | MongoDB + Mongoose |
| Auth        | JWT (access + refresh tokens) |
| Cache       | Redis (optional) |
| External APIs | ImageKit, Google Maps, Email Provider |

---

## ⚙️ Installation & Running

### ✅ Prerequisites
- Node.js v18+
- MongoDB (local or Atlas cloud)
- Redis *(optional, if enabled in backend)*

---

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbedalazizMostpha/Storage-Park.git
   cd Storage-Park
   ```

2. **Install backend dependencies (from project root)**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**

   Create `.env` files in both the root and `frontend/` directories. Example for backend:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   IMAGEKIT_PUBLIC_KEY=...
   IMAGEKIT_PRIVATE_KEY=...
   REDIS_URL=redis://localhost:6379
   ```

---

### ▶️ Run the App

Start **backend** from root:
```bash
npm run dev
```

Start **frontend** from `frontend/`:
```bash
cd frontend
npm run dev
```

> Frontend: http://localhost:5173  
> Backend: http://localhost:3000 (depending on your `.env`)

---

## 🔗 Links

- 🔗 [DeepWiki Overview](https://deepwiki.com/AbedalazizMostpha/Storage-Park)
- 🛠️ [GitHub Repository](https://github.com/AbedalazizMostpha/Storage-Park)
- 🖼️ Demo GIFs and screenshots: Coming soon...
