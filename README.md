# BidNow — Online Auction Platform

A full-stack online auction platform built as a Final Year Project for a Bachelor of Computer Science degree. The platform allows users to list items for auction, place bids, manage watchlists, and complete trades — with a recommendation engine that surfaces relevant listings based on user behaviour.

## Features

**Buyers**
- Browse and search item listings with category and keyword filters
- Place bids on active auctions with real-time bid tracking
- Add items to a personal watchlist
- Receive notifications on bid activity and auction outcomes
- Submit and receive feedback after completed transactions
- Get personalised item recommendations based on browsing history (SlopeOne collaborative filtering)

**Sellers**
- Create and manage item listings with photo uploads
- Set auction duration and starting price
- Initiate trade requests for direct item exchanges
- View transaction history and analytics for your listings

**Admin**
- Dashboard with platform-wide statistics
- User account management (suspend, activate)
- Listing moderation
- Feedback and system management

**System**
- JWT-based authentication with protected routes
- Automated background jobs: auction winner determination, listing expiry, trade request lifecycle
- Role-based access control (User / Admin)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Spring Boot 3.2.6, Java 21 |
| Database | MySQL (AWS RDS) |
| Auth | JWT (JJWT), Spring Security |
| ORM | Spring Data JPA / Hibernate |
| HTTP Client | Axios |
| Hosting | AWS Elastic Beanstalk |

## Prerequisites

- [Node.js / NVM](https://github.com/coreybutler/nvm-windows#readme)
- [Java 21 JDK](https://adoptium.net/)
- [MySQL 8](https://dev.mysql.com/downloads/mysql/)
- [Git](https://git-scm.com/downloads)
- IntelliJ IDEA (recommended for backend)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/JC-prog/AuctionSiteTest.git
cd AuctionSiteTest
```

### 2. Database setup

Create a MySQL database named `auctionapp`, then update the connection details in:

```
auction-app/src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/auctionapp
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Backend

```bash
cd auction-app
./mvnw spring-boot:run      # macOS / Linux
mvnw.cmd spring-boot:run    # Windows
```

The API server starts at `http://localhost:8080`. Hibernate will auto-create the schema on first run.

### 4. Frontend

Update the API base URL in `frontend/src/config/baseUrl.tsx` and `frontend/src/config/Api.tsx` to point to your local backend:

```ts
baseURL: "http://localhost:8080"
```

Then install dependencies and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
AuctionSiteTest/
├── frontend/          # React + TypeScript client
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/  # API call layer
└── auction-app/       # Spring Boot server
    └── src/main/java/com/fyp/auction_app/
        ├── controllers/
        ├── services/
        ├── repositories/
        ├── models/
        ├── schedulers/  # Background jobs
        └── algorithm/   # SlopeOne recommendation engine
```
