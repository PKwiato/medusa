# Medusa Vue E-commerce POC

This project is a Proof of Concept (POC) demonstrating a high-performance e-commerce marketplace built with **Medusa.js 2.0** and **Vue 3**.

## 🚀 Correct Access Information

### Storefront (Vue 3)
*   **URL**: [http://localhost:5173](http://localhost:5173)
*   **Description**: Modern frontend with product listing, cart, and checkout.
*   **Note**: If products are missing, ensure the backend has finished its "v5" seeding process.

### Admin Dashboard (Medusa built-in)
*   **URL**: [http://localhost:9000/app](http://localhost:9000/app)
*   **Login**: `admin@me.com`
*   **Password**: `password`
*   **Note**: The first login might take a moment as the app initializes.

### Backend API
*   **Base URL**: `http://localhost:9000`
*   **Health Check**: [http://localhost:9000/health](http://localhost:9000/health)

---

## ⚡ Fresh Setup (Recommended)

To ensure all fixes (API key synchronization, Admin panel access) are applied, use the following commands to start the project from a clean state:

```powershell
# Stop existing containers and remove volumes (optional but recommended for fresh start)
docker-compose down -v

# Rebuild and start the containers
docker-compose up --build
```

**What to expect:**
1.  **Build Phase**: Docker will build the `medusa-backend` and `medusa-frontend` images. This may take 2-3 minutes.
2.  **Startup Phase**: The backend container will run a startup script (`startup.sh`).
    *   It will run database migrations.
    *   It will seed the database with demo data (Regions, Products, etc.).
    *   **Crucially**, it will force-sync the Publishable API Key to match the frontend hardcoded key (`pk_04...`).
    *   It will ensure the Admin User (`admin@me.com`) exists.

Watch the logs for: `First time setup (v5): Initializing data...` and `Forced API Key token to match frontend default.`

---

## 🛠️ Recent Fixes & Troubleshooting

### 1. Storefront "Publishable Key" Error
**Issue:** The Storefront was expecting a hardcoded API key (`pk_04...`) but the backend was generating a random one on each startup.
**Fix:** The `seed.ts` script now includes a raw SQL command to **force update** the generated key to match the frontend expectation. This ensures products load immediately without manual configuration.

### 2. Admin Panel "401 Unauthorized"
**Issue:** The Admin panel requires "Secure" cookies by default, which fails on `http://localhost`.
**Fix:** We added `NODE_ENV=development` to the backend environment in `docker-compose.yml`. This relaxes the cookie security requirements for local development.

### 3. Admin Build Failures
**Issue:** The Admin panel build was failing with Vite import errors (`Failed to resolve import "/src/admin/i18n/index.ts"`).
**Fix:** We removed the corrupt `src/admin` scaffold directory, allowing Medusa to use its default, working Admin panel build.

### 4. Idempotent Startup
**Issue:** Restarting the container would sometimes crash or duplicate data.
**Fix:** We implemented a versioned flag system (`.medusa_seeded_v5`). The startup script checks for this flag and only runs the heavy seeding logic if it hasn't run for this version.

---

## 🗄️ Database Information (PostgreSQL 17)

*   **Host**: `localhost`
*   **Port**: `5432`
*   **User**: `postgres`
*   **Database Name**: `medusa-db`
*   **Connection URL**: `postgres://postgres@localhost:5432/medusa-db`

---

## 🐳 Docker Deployment

The entire stack is containerized.
-   **Backend**: Node 20, Medusa 2.0
-   **Frontend**: Nginx serving built Vue 3 static assets
-   **Database**: PostgreSQL 17

### Common Docker Issues

**"bind: Only one usage of each socket address is normally permitted"**
-   **Solution**: Stop any local instances of Node/Medusa running on your machine (ports 9000 or 5173).

**"The server does not support SSL connections"**
-   **Solution**: This is handled by `?sslmode=disable` in the connection string. Ensure you are using the latest `docker-compose.yml`.

---
**Developed with Antigravity**
