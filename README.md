# Medusa Vue E-commerce POC

This project is a Proof of Concept (POC) demonstrating a high-performance e-commerce marketplace built with **Medusa.js 2.0** and **Vue 3**.

## 🚀 Access Information

### Storefront (Vue 3)
*   **URL**: [http://127.0.0.1:5173](http://127.0.0.1:5173)
*   **Description**: Modern, flashy frontend with product listing, cart functionality, and premium animations.

### Admin Dashboard (Medusa built-in)
*   **URL**: [http://localhost:9000/app](http://localhost:9000/app)
*   **Login**: `admin@me.com` (if created)
*   **Password**: `password` (if created)
*   **Setup Note**: If you haven't created a user yet, run:
    ```powershell
    cd medusa-backend
    npx medusa user --email admin@me.com --password password
    ```

### Backend API
*   **Base URL**: `http://localhost:9000`
*   **CORS**: Configured to allow both `localhost` and `127.0.0.1`.

---

## 🗄️ Database Information (PostgreSQL 17)

*   **Host**: `localhost`
*   **Port**: `5432`
*   **User**: `postgres`
*   **Database Name**: `medusa-db`
*   **Connection URL**: `postgres://postgres@localhost:5432/medusa-db`

---

## 🛠️ Project Structure

*   `/medusa-backend`: Medusa.js 2.0 Core (Node.js)
*   `/vue-storefront`: Vite + Vue 3 Frontend
*   `task.md`: Development progress tracker

## ⚡ Quick Commands

**Starting the Backend:**
```powershell
cd medusa-backend
npm run dev
```

**Starting the Frontend:**
```powershell
cd vue-storefront
npm run dev
## 🐳 Docker Deployment

The entire stack can be launched using Docker Compose.

**Prerequisites:**
- Docker and Docker Compose installed.

**Steps:**
1. From the project root, run:
   ```bash
   docker-compose up --build
   ```
2. The services will be available at:
   - **Storefront**: [http://localhost:5173](http://localhost:5173)
   - **Backend/Admin**: [http://localhost:9000](http://localhost:9000)

**Note**: The first run will take a few minutes to build the images and initialize the database.

---
**Developed with Antigravity**
