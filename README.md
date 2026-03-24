# Item Manager — Full-Stack Application

A modern, premium full-stack application for managing and sharing items, built with **React (Next.js)**, **Node.js (Express)**, and **PostgreSQL**.

## Features

- **Home Dashboard**: Displays a responsive grid of items with real-time search.
- **Item Management**: Securely add new items with full form validation.
- **Authentication**: JWT-based user registration and login system.
- **Premium UI**: Custom-built Light Mode design with a focus on high contrast, solid borders, and a professional aesthetic.
- **Search**: Debounced server-side search functionality.
- **Database**: Persistent storage using PostgreSQL with advanced pooling for performance.
- **Mobile Optimized**: Fully responsive design for mobile, tablet, and desktop devices with PWA support.

---

## Tech Stack

- **Frontend**: React 19, Next.js 15 (App Router), Tailwind CSS v4, Axios.
- **Backend**: Node.js, Express, PostgreSQL (pg), JWT, Bcrypt.js.
- **Validation**: Express Validator (Backend), React Form State (Frontend).
- **Deployment Ready**: Mobile optimizations, PWA support, Render PostgreSQL compatible.

---

## Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL Server** (v12 or higher)
- **NPM** or **Yarn**

---

## Local Setup

### 1. Database Configuration
1. Create a PostgreSQL database named `item_manager`:
   ```bash
   psql -U postgres -c "CREATE DATABASE item_manager;"
   ```
2. Run the provided schema script to create the necessary tables:
   ```bash
   psql -U postgres -d item_manager -f server/schema.sql
   ```
3. (Optional) Seed the database with sample items:
   ```bash
   cd server
   npm run seed
   ```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and configure your PostgreSQL credentials:
   
   **Option A: Using CONNECTION STRING (Recommended for cloud/production)**
   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/item_manager
   JWT_SECRET=your_secret_key_here
   ```

   **Option B: Using individual environment variables (Local development)**
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   DB_NAME=item_manager
   DB_PORT=5432
   JWT_SECRET=your_secret_key_here
   ```

4. Start the server (Development Mode):
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `client` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

---

## Deployment

### Production Build
1. **Backend**:
   ```bash
   cd server
   npm run build
   npm start
   ```

2. **Frontend**:
   ```bash
   cd client
   npm run build
   npm start
   ```

### Environment Variables for Production
- Use `DATABASE_URL` with your cloud PostgreSQL provider (e.g., Render, Railway, Heroku)
- Ensure `JWT_SECRET` is a strong, unique string
- Set `CLIENT_URL` to your frontend domain for CORS configuration

---

## Demo Account
If you used the `npm run seed` command, you can log in with:
- **Email**: `demo@itemmanager.com`
- **Password**: `password123`

---

## Project Structure

- `/client`: Next.js application (App Router) with responsive mobile design.
- `/server`: Node.js Express API with PostgreSQL integration.
- `/server/schema.sql`: Database schema definition for PostgreSQL.
- `/server/seed.ts`: Scripts for populating sample data.
- `/client/context/AuthContext.tsx`: State management for authentication.
- `MOBILE_OPTIMIZATION.md`: Detailed documentation of mobile and performance optimizations.
