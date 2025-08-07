# Carthus Project Guide

## 1. Project Overview

Carthus, branded as "Elijeweb," is a web application designed to serve as an AI sales assistant primarily for businesses operating via Meta platforms (Facebook, Instagram). It aims to automate customer interactions, manage sales, orders, and product stock, and provide a comprehensive dashboard for business analytics. The application features a robust user authentication system, product and order management capabilities, and a dashboard to track key sales metrics, ultimately streamlining e-commerce operations and reducing manual effort.

## 2. Key Technologies & Dependencies

The project leverages a modern web development stack, primarily focused on the Next.js framework for a full-stack TypeScript application.

*   **Framework**: Next.js (React)
*   **Language**: TypeScript
*   **Authentication**: NextAuth.js (with Credentials provider for email/password, and Prisma Adapter for database integration)
*   **Database ORM**: Prisma
*   **Database**: SQLite (for development/local environments, configurable via `DATABASE_URL` for production)
*   **Password Hashing**: bcrypt
*   **Styling**: Tailwind CSS, PostCSS, Autoprefixer
*   **Linting**: ESLint

## 3. File Structure Analysis

The project follows the standard Next.js App Router structure, with clear separation of concerns:

*   `app/`: The root directory for Next.js App Router.
    *   `api/`: Contains API routes, serving as backend endpoints for data operations and authentication.
        *   `auth/[...nextauth]/route.ts`: Handles NextAuth.js authentication flows (login, logout, session management).
        *   `dashboard/route.ts`: API for fetching aggregated sales data, recent orders, and low stock product information for the dashboard.
        *   `orders/route.ts`: API for retrieving and creating customer orders, including stock updates.
        *   `products/route.ts`: API for retrieving and creating product listings.
        *   `register/route.ts`: API for new user registration.
    *   `dashboard/page.tsx`: The main user dashboard interface, displaying analytics and key business metrics.
    *   `login/page.tsx`: User login interface.
    *   `register/page.tsx`: User registration interface.
    *   `reset-password/page.tsx`: Placeholder for password reset functionality.
    *   `layout.tsx`: The root layout component, wrapping the entire application with global styles, navigation (`Navbar`), and authentication providers (`AuthProviders`).
    *   `page.tsx`: The public-facing landing page of the application, showcasing features and pricing.
    *   `globals.css`: Global CSS styles, including Tailwind CSS imports.
*   `components/`: Houses reusable React components used across different pages.
    *   `AuthProviders.tsx`: Integrates NextAuth's `SessionProvider` to manage user sessions globally.
    *   `DarkModeToggle.tsx`: A UI component for switching between light and dark themes.
    *   `Navbar.tsx`: The main navigation bar, dynamically displaying links based on user authentication status.
*   `lib/`: Contains utility functions and core configurations.
    *   `auth.ts`: NextAuth.js configuration, defining providers, session strategy, and callbacks.
    *   `prisma.ts`: Initializes and exports the Prisma Client instance, ensuring a single instance across the application.
*   `prisma/`: Prisma ORM configuration and database schema definitions.
    *   `schema.prisma`: Defines the application's database models (User, Product, Order, OrderItem, Account, Session, VerificationToken) and their relationships.
*   `auth.d.ts`: TypeScript declaration file extending NextAuth types to include custom user properties (e.g., `id` in session and JWT).
*   `package.json`: Project metadata, scripts for development and build, and dependency declarations.
*   `postcss.config.js`: Configuration for PostCSS plugins, specifically Tailwind CSS and Autoprefixer.

## 4. Setup & Build Instructions

To set up and run the Carthus project locally:

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd elijeweb # Or your project directory name
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root of the project and add the following:
    ```env
    DATABASE_URL="file:./dev.db"
    NEXTAUTH_SECRET="YOUR_SUPER_SECRET_KEY_HERE" # Generate a strong, random string
    ```
    *   `DATABASE_URL`: Specifies the database connection string. For SQLite, it points to a local file.
    *   `NEXTAUTH_SECRET`: A secret key used by NextAuth.js for signing and encrypting tokens. **Crucial for security.**

4.  **Setup Database**:
    Run Prisma migrations to create the database schema:
    ```bash
    npx prisma migrate dev --name init
    ```
    This command will create the `dev.db` file (for SQLite) and apply the schema defined in `prisma/schema.prisma`.

5.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

6.  **Build for production**:
    ```bash
    npm run build
    ```
    This command compiles the Next.js application for production deployment.

7.  **Start production server**:
    ```bash
    npm run start
    ```
    This command runs the built application in a production environment.

## 5. Proposed CI/CD Pipeline

A simple CI/CD pipeline using GitHub Actions can ensure code quality and automate deployments.

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20' # Use a specific Node.js version

      - name: Install dependencies
        run: npm ci # Use npm ci for clean installs in CI environments

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          # Dummy values for build-time environment variables in CI
          # Real values should be configured in deployment environment
          DATABASE_URL: 'file:./test.db'
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }} # Use GitHub Secrets for sensitive data

      # Optional: Add a test step if unit/integration tests are implemented
      # - name: Run tests
      #   run: npm test

  # deploy:
  #   needs: build
  #   if: github.ref == 'refs/heads/main'
  #   runs-on: ubuntu-latest
  #   environment: production # Define a production environment in GitHub
  #   steps:
  #     - name: Deploy to Vercel (Example)
  #       uses: vercel/actions@v1
  #       with:
  #         vercel-token: ${{ secrets.VERCEL_TOKEN }}
  #         vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
  #         vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
  #         # Add other environment variables required for Vercel deployment
  #       env:
  #         DATABASE_URL: ${{ secrets.DATABASE_URL }}
  #         NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
```

## 6. Architecture Diagram

The Carthus application follows a typical client-server architecture, leveraging Next.js's full-stack capabilities.

```mermaid
graph TD
    A[User] --> B(Browser/Client)
    B -- Renders UI --> C{Next.js Pages}
    C -- API Requests (HTTP/S) --> D[Next.js API Routes]
    D -- ORM Queries --> E(Prisma ORM)
    E -- SQL Commands --> F[Database (SQLite/PostgreSQL)]

    subgraph Authentication Flow
        A -- Login/Register --> C
        C -- Credentials --> D[app/api/auth & app/api/register]
        D -- Hashing & DB Ops --> E
        E -- Stores User/Session --> F
        D -- Session Token --> B
    end

    subgraph Data Management & Analytics
        D -- "/api/products" --> E
        D -- "/api/orders" --> E
        D -- "/api/dashboard" --> E
    end

    F -- Data Retrieval --> E
    E -- Data to API --> D
    D -- JSON Response --> C
    C -- Displays Data --> B
```

## 7. Potential Improvements

1.  **Implement Comprehensive Testing**:
    *   **Unit Tests**: Add unit tests for critical utility functions (`lib/auth.ts`, date calculations in `app/api/dashboard/route.ts`) and individual API route handlers to ensure their logic is sound.
    *   **Integration Tests**: Write integration tests for API routes to verify that they correctly interact with the Prisma ORM and return expected responses, covering various scenarios (e.g., valid/invalid input, unauthorized access).
    *   **End-to-End (E2E) Tests**: Utilize tools like Playwright or Cypress to simulate user flows (e.g., registration, login, viewing dashboard, creating an order) to ensure the entire application functions correctly from the user's perspective.

2.  **Enhance Server-Side Input Validation**:
    *   While basic checks exist (e.g., `if (!name || !price || !stock)`), implement more robust and granular server-side validation for all incoming API request bodies (e.g., using libraries like Zod or Joi). This ensures data integrity, prevents malformed requests, and significantly improves security by guarding against injection attacks or unexpected data types. For instance, validate email formats, password strength, numeric ranges for price/stock, and string lengths.

3.  **Optimize Database Performance and Scalability**:
    *   **Indexing**: Add database indexes to frequently queried columns, especially `userId` and `createdAt` on `Order` and `Product` models, and `productId` on `OrderItem`. This will drastically speed up read operations, particularly for dashboard analytics and order/product listings.
    *   **Query Optimization**: Review and optimize Prisma queries, especially in the dashboard API, to minimize the number of database calls or use more efficient aggregations where possible.
    *   **Database Migration**: For production environments and anticipated growth, consider migrating from SQLite to a more robust and scalable relational database like PostgreSQL or MySQL, which offer better concurrency, performance, and management tools.