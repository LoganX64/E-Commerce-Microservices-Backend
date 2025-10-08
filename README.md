# Microservices Backend

This repository contains a microservices-based backend for the \*\*Microservices. It includes:

- **Products Service** – CRUD operations for products.
- **Orders Service** – Create and view orders.
- **API Gateway** – Single entry point exposing REST APIs to the frontend.
- **PostgreSQL** – Database for services.
- **Docker Compose** – Containerized services.
- **Optional Frontend** – NextJS/ReactJS UI to interact with the services.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running with Docker](#running-with-docker)
- [API Endpoints](#api-endpoints)
- [Sample Queries / Payloads](#sample-queries--payloads)
- [Swagger / Postman](#swagger--postman)
- [Notes](#notes)

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Optional: [Git](https://git-scm.com/)

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

- Ensure **DB_HOST / DB_PORT / DB_USER / DB_PASS / DB_NAME** are consistent between `.env` and `docker-compose.yml`.
- API Gateway uses the `.env` file for service URLs and API_KEY authentication.
- Containers wait for PostgreSQL health before connecting to avoid `ECONNREFUSED`.
- Commit regularly with descriptive messages for better tracking.

---

## Context

> Microservices-based backend with NestJS, PostgreSQL, API Gateway, Swagger, Docker Compose, and optional ReactJS frontend.
