# E-Commerce Microservices Backend

A complete microservices-based backend built with NestJS, Docker, PostgreSQL, API Gateway, GitHub Actions CI/CD, and a Next.js frontend.

---

## Demo

<p align="center">
  <a href="https://youtu.be/GYEdDsn8QDs">
    <img src="https://img.youtube.com/vi/GYEdDsn8QDs/maxresdefault.jpg" alt="Video Demo" width="700">
  </a>
</p>

---

## Table of Contents

- **Features**
- **Architecture**
- **Tech Stack**
- **Prerequisites**
- **Setup**
- **Running with Docker**
- **Running Locally**
- **Environment Variables**
- **API Endpoints**
- **Sample Payloads**
- **Testing (Jest)**
- **CI/CD Pipelines**
- **Frontend**
- **Notes**

---

## Features

### Backend
- **Products Service** – CRUD operations
- **Orders Service** – Create orders & view orders
- **API Gateway** – Routes requests to microservices
- **PostgreSQL** database
- **Docker Compose** for service orchestration
- **Jest Testing** preconfigured for every service
- **CI Pipeline** (Lint → Test → Build)
- **CD Pipeline** (Build & Push Docker images to Docker Hub)
- **TurboRepo** for monorepo task orchestration

### Frontend
- **Next.js 16** with App Router
- **Tailwind CSS v4** for styling
- **shadcn/ui** components
- **Aceternity UI** animated components
- **TanStack Query** for server state
- **Zustand** for cart state
- **Zod** for form validation
- **Price range slider** with compact filter bar
- **Docker** support with standalone output

---

## Architecture

```
├── apps/
│   ├── api-gateway/        # HTTP REST → gRPC router (port 3001)
│   ├── orders-service/     # gRPC microservice (port 50052)
│   ├── products-service/   # gRPC microservice (port 50051)
│   └── web/                # Next.js frontend (port 3000)
├── docker-compose.yml
├── turbo.json
└── .github/workflows/
    ├── ci.yml
    └── cd-dockerhub.yml
```

```
Browser
  │
  ▼
Next.js (port 3000) ──HTTP──▶ API Gateway (port 3001) ──gRPC──▶ Products Service (port 50051)
                                                    │
                                                    └────────gRPC──▶ Orders Service (port 50052)
```

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Backend Framework | NestJS |
| Frontend Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Aceternity UI |
| Server State | TanStack Query |
| Client State | Zustand (cart) |
| Validation | Zod |
| Database | PostgreSQL |
| Containerization | Docker + Docker Compose |
| Monorepo | TurboRepo |

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)
- Docker Hub account for CD (optional)

---

## Setup

1. Clone the repository:

```bash
git clone <repo_url>
cd E-Commerce-Microservices-Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment files (see [Environment Variables](#environment-variables)).

---

## Running with Docker

Spin up all services (PostgreSQL, microservices, API Gateway, and frontend):

```bash
docker-compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API Gateway | http://localhost:3001 |
| Swagger UI | http://localhost:3001/api-docs |

To stop services:

```bash
docker-compose down
```

---

## Running Locally

1. Start the backend services:

```bash
npm run dev
```

This runs all backend services in parallel via TurboRepo.

2. In a separate terminal, start the frontend:

```bash
npm run dev:web
```

Or run everything together:

```bash
npm run dev
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all services (backend + frontend) |
| `npm run dev:web` | Start frontend only |
| `npm run build` | Build all services |
| `npm run build:web` | Build frontend only |
| `npm run lint` | Lint all services |
| `npm run test` | Run all tests |

---

## Environment Variables

### API Gateway (`apps/api-gateway/.env`)

```env
PORT=3001
PRODUCTS_SERVICE_URL=http://products-service:50051
ORDERS_SERVICE_URL=http://orders-service:50052
FRONTEND_SERVICE_URL=http://web:3000
API_KEY=supersecret123
```

### Products / Orders Service

```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres123
DB_NAME=procura_db
```

### Frontend (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=supersecret123
```

---

## API Endpoints

**API Gateway routes all requests under `/api-docs`**

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api-docs/products | Get all products |
| GET | /api-docs/products/:id | Get product by ID |
| POST | /api-docs/products | Create new product |
| PATCH | /api-docs/products/:id | Update product |
| DELETE | /api-docs/products/:id | Delete product |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api-docs/orders | Get all orders |
| GET | /api-docs/orders/:id | Get order by ID |
| POST | /api-docs/orders | Create new order |

---

## Sample Payloads

### Create Product

```json
POST /api-docs/products
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
POST /api-docs/orders
{
  "customer": {
    "name": "John Doe",
    "phone": "1234567890"
  },
  "products": [
    {
      "id": 1,
      "name": "Smartphone",
      "rate": 499.99,
      "qty": 2
    }
  ],
  "totalAmount": 999.98
}
```

---

## Testing (Jest)

Run tests across all microservices:

```bash
npm run test
```

Or via TurboRepo directly:

```bash
npx turbo run test
```

---

## CI/CD Pipelines

### CI Pipeline (`.github/workflows/ci.yml`)

Runs automatically on pushes to `master`.

- Checkout repository
- Setup Node.js
- Install dependencies
- Run linting
- Run Jest tests
- Run build

### CD Pipeline (`.github/workflows/cd-dockerhub.yml`)

Triggered on push to `master`.

- Logs in to Docker Hub
- Builds each microservice image
- Pushes images with tags: `latest` and git commit SHA

---

## Frontend

The Next.js frontend provides:

- **Storefront** (`/`) – Homepage, product listing, product detail, cart
- **Dashboard** (`/dashboard`) – Admin panel for managing products and orders

### Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured products |
| `/products` | Product listing with filters |
| `/products/[id]` | Product detail page |
| `/cart` | Shopping cart |
| `/dashboard` | Admin dashboard |
| `/dashboard/products` | Product management |
| `/dashboard/products/new` | Create product |
| `/dashboard/products/[id]` | Edit product |
| `/dashboard/orders` | Order management |
| `/dashboard/orders/[id]` | Order detail |
| `/dashboard/orders/new` | Create order |

### Deploying to Vercel

The frontend is Vercel-ready. Connect your Git repository to Vercel and it will auto-detect Next.js.

---

## Notes

- Works with TurboRepo monorepo architecture
- Docker Compose ensures each service waits for PostgreSQL
- CI pipeline ensures only tested and passing code is deployed
- CD pipeline always pushes fresh Docker images to Docker Hub
- Jest ensures microservices behavior remains stable
- Frontend uses standalone output for Docker deployment
