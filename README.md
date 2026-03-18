# Item Manager — Full-Stack Application

A modern, premium full-stack application for managing and sharing items, built with **React (Next.js)**, **Node.js (Express)**, and **MySQL**.

## Features

- **Home Dashboard**: Displays a responsive grid of items with real-time search.
- **Item Management**: Securely add new items with full form validation.
- **Authentication**: JWT-based user registration and login system.
- **Premium UI**: Custom-built Light Mode design with a focus on high contrast, solid borders, and a professional aesthetic.
- **Search**: Debounced server-side search functionality.
- **Database**: Persistent storage using MySQL with advanced pooling for performance.

---

## Tech Stack

- **Frontend**: React 19, Next.js 15 (App Router), Tailwind CSS v4, Axios.
- **Backend**: Node.js, Express, MySQL (mysql2/promise), JWT, Bcrypt.js.
- **Validation**: Express Validator (Backend), React Form State (Frontend).

---

## Prerequisites

- **Node.js** (v18 or higher)
- **MySQL Server**
- **NPM** or **Yarn**

---

## Local Setup

### 1. Database Configuration
1. Create a MySQL database named `item_manager`.
2. Run the provided schema script to create the necessary tables:
   ```bash
   mysql -u your_user -p item_manager < server/schema.sql
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
3. Create a `.env` file in the `server` directory and configure your credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=item_manager
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

## Demo Account
If you used the `npm run seed` command, you can log in with:
- **Email**: `demo@itemmanager.com`
- **Password**: `password123`

---

## Project Structure

- `/client`: Next.js application (App Router).
- `/server`: Node.js Express API.
- `/server/schema.sql`: Database schema definition.
- `/server/seed.ts`: Scripts for populating sample data.
- `/client/context/AuthContext.tsx`: State management for authentication.
