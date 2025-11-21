# Microservices Backend

## This repository contains a complete microservices-based backend built with NestJS, Docker, PostgreSQL, API Gateway, GitHub Actions CI/CD, and optional ReactJS frontend.

---

## 📑 Table of Contents

- **Features**
- **Architecture**
- **Prerequisites**
- **Setup**
- **Running with Docker**
- **Environment Variables**
- **Testing (Jest)**
- **CI Pipeline (GitHub Actions)**
- **CD Pipeline (Docker Hub Deployment)**
- **API Endpoints**
- **Sample Payloads**
- **Notes**
- **Context**

---

## 🚀 Features

- **Products Service** – CRUD operations
- **Orders Service** – Create orders & view orders
- **API Gateway** – Routes requests to microservices
- **PostgreSQL** database
- **Docker Compose** for service orchestration
- **Jest Testing** preconfigured for every service
- **CI Pipeline** (Lint → Test → Build)
- **CD Pipeline** (Build & Push Docker images to Docker Hub)
- **TurboRepo** for monorepo task orchestration

---

## 🏗 Architecture

```
├── apps/
│   ├── api-gateway/
│   ├── orders-service/
│   ├── products-service/
├── docker-compose.yml
├── turbo.json
└── .github/workflows/
    ├── ci.yml
    └── cd-dockerhub.yml
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)
- Docker Hub account for CD

---

## Setup

1. Clone the repository:

```bash
git clone <repo_url>
cd E-Commerce-Microservices-Backend
```

2. Copy `.env.example` to `.env` (or create `.env` in each service if needed):

```env
# api-gateway/.env
API_KEY=supersecret123
PRODUCTS_SERVICE_URL=http://product-service:3001/products
ORDERS_SERVICE_URL=http://order-service:3002/orders
PORT=3000
```

```env
# product-service/.env & order-service/.env
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres123
DB_NAME=procura_db
```

3. Install dependencies (if running services locally without Docker):

```bash
cd api-gateway
npm install
cd ../products-service
npm install
cd ../orders-service
npm install
```

---

## Running with Docker

Spin up **PostgreSQL**, microservices, and API Gateway with Docker Compose:

```bash
docker-compose up --build
```

- **API Gateway:** http://localhost:3000
- **Products Service:** http://localhost:3001/products
- **Orders Service:** http://localhost:3002/orders

To stop services:

```bash
docker-compose down
```

---

## 🔐 Environment Variables

### API Gateway

```
PORT=3000
PRODUCTS_SERVICE_URL=http://products-service:3001/products
ORDERS_SERVICE_URL=http://orders-service:3002/orders
API_KEY=supersecret123

```

---

### Orders / Products Service

```
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres123
DB_NAME=micro_db

```

---

## 🧪 Testing (Jest)

This monorepo uses NestJS + Jest for unit testing.

Run tests across all microservices:

```
npm run test
```

TurboRepo maps this to:

```
npx turbo run test
```

---

## ⚙️ CI Pipeline (GitHub Actions)

**Location:**  
`.github/workflows/ci.yml`

Runs automatically on pushes to `master`.

### Pipeline Steps

- Checkout repository
- Setup Node.js
- Install dependencies
- Run linting
- Run Jest tests
- Run build

A full CI workflow file is included in the repo.

## 🚀 CD Pipeline (Docker Hub Deployment)

**Location:**  
`.github/workflows/cd-dockerhub.yml`

Triggered on push to `master`.

### This pipeline:

- Logs in to Docker Hub
- Builds each microservice image
- Pushes images with tags:
  - `latest`
  - Git commit SHA

### Example Pushed Images

- `loganx64/orders-service:latest`
- `loganx64/products-service:latest`
- `loganx64/api-gateway:latest`

## 🔒 Make Docker Hub Repository Private

To make your Docker Hub container/image private:

---

## API Endpoints

**API Gateway routes all requests under `/api`**

### Products

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /api/products     | Get all products     |
| GET    | /api/products/:id | Get product by ID    |
| POST   | /api/products     | Create new product   |
| DELETE | /api/products/:id | Delete product by ID |

### Orders

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | /api/orders     | Get all orders   |
| GET    | /api/orders/:id | Get order by ID  |
| POST   | /api/orders     | Create new order |

---

## Sample Queries / Payloads

### Create Product

```json
POST /api/products
{
  "code": "P001",
  "name": "Smartphone",
  "description": "Latest model",
  "price": 499.99,
  "image": "https://example.com/smartphone.jpg"
}
```

### Create Order

```json
POST /api/orders
{
  "customer": {
    "name": "John Doe",
    "phone": "1234567890"
  },
  "products": [
    {
      "id": 1,
      "quantity": 2
    }
  ],
  "totalAmount": 999.98
}
```

---

## Swagger / Postman

- Swagger UI is available (if enabled) at:  
  `http://localhost:3000/api-docs`

- You can also import a Postman collection (optional) for testing APIs.

---

## Notes

- Works with TurboRepo monorepo architecture
- Docker Compose ensures each service waits for PostgreSQL
- CI pipeline ensures only tested and passing code is deployed
- CD pipeline always pushes fresh Docker images to Docker Hub
- Jest ensures microservices behavior remains stable

---

## Context

> This project demonstrates:

- Microservices architecture
- NestJS services
- API Gateway pattern
- Docker orchestration
- PostgreSQL integration
- Monorepo with TurboRepo
- Jest unit testing
- GitHub Actions CI & CD pipelines
- Docker Hub image deployment
