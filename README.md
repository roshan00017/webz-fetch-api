# Webz Fetch API

This project fetches news data from the Webz.io API, processes it, and saves it to a PostgreSQL database. It is built using TypeScript, Node.js, and TypeORM.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** (comes with Node.js)
- **Docker** (for running PostgreSQL in a container)
- **TypeScript** (installed globally or locally in the project)

---

## Setup Instructions

### 1. Clone the Repository

Clone tversion: "3.8"
services:
  postgres:
    image: postgres:14
    container_name: postgres_container
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: webz
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
he repository to your local machine:

```bash
git clone <repository-url>
cd webz-fetch-api
```

---

### 2. Start the Database with Docker Compose

Run the `docker-compose.yml` file to start the PostgreSQL database:

```bash
docker-compose up -d
```

This will start the database in a Docker container. Verify that the container is running:

```bash
docker ps
```

---

### 3. Install Dependencies

Install all required dependencies using npm:

```bash
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

````properties
# Webz.io API Key
WEBZ_API_KEY=your_webz_api_key_here

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=webz


Replace `your_webz_api_key_here`, `your_db_user`, and `your_db_password` with your actual API key and database credentials.

---

### 5. Compile TypeScript Files
Compile the TypeScript files to JavaScript:
```bash
npx tsc
````

---

### 6. Run Database Migrations

Run TypeORM migrations to set up the database schema:

```bash
npx typeorm migration:run -d dist/config/databse.config.js
```

---

### 7. Build and Run the Application

#### Build the Application

Build the application using TypeScript:

```bash
npx tsc
```

#### Run the Application

Start the application:

```bash
node dist/index.js "sagarmatha" "negative"
```
