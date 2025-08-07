# Elijeweb - Your AI Sales Assistant for Meta

This is a full-stack Next.js application designed to automate sales and manage orders, stock, and analytics for businesses selling on Meta platforms. It uses Next.js (App Router), TypeScript, Prisma (with SQLite), NextAuth.js for authentication, and Tailwind CSS for styling.

## Features

-   **User Authentication:** Secure login and registration using NextAuth.js with email/password credentials.
-   **Dark Mode:** Toggle between light and dark themes.
-   **Product Management:** (Backend API ready for CRUD operations)
-   **Order Management:** (Backend API ready for creating and listing orders)
-   **Dashboard:** Overview of sales performance, recent orders, stock levels, and key metrics.
-   **Responsive UI:** Built with Tailwind CSS for a modern, adaptive design.

## Technical Stack

-   **Framework:** Next.js 14 (App Router)
-   **Language:** TypeScript
-   **Database ORM:** Prisma
-   **Database:** SQLite (file-based, `dev.db`)
-   **Authentication:** NextAuth.js
-   **Styling:** Tailwind CSS

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd elijeweb
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root of your project based on the `.env.example` file:

```bash
cp .env.example .env
```

Open the newly created `.env` file and update the variables:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET_HERE" # Generate a strong secret, e.g., using `openssl rand -base64 32`
NEXTAUTH_URL="http://localhost:3000"
```

**Important:** Replace `YOUR_NEXTAUTH_SECRET_HERE` with a long, random string. You can generate one using `openssl rand -base64 32` in your terminal.

### 4. Database Setup

This project uses SQLite as its database, which is a file-based database. Prisma will create the `dev.db` file for you.

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

This command will:
-   Create the `dev.db` file in your `prisma` directory (if it doesn't exist).
-   Apply the schema defined in `prisma/schema.prisma` to your database.
-   Generate the Prisma Client.

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

-   `app/`: Next.js App Router pages and API routes.
    -   `api/auth/[...nextauth]/route.ts`: NextAuth.js API route for authentication.
    -   `api/register/route.ts`: API route for user registration.
    -   `api/products/route.ts`: API route for product management.
    -   `api/orders/route.ts`: API route for order management.
    -   `api/dashboard/route.ts`: API route for fetching dashboard analytics.
    -   `layout.tsx`: Root layout for the application.
    -   `page.tsx`: The main landing page.
    -   `login/page.tsx`: User login page.
    -   `register/page.tsx`: User registration page.
    -   `dashboard/page.tsx`: User dashboard (protected route).
-   `components/`: Reusable React components.
    -   `AuthProviders.tsx`: Wraps the application with NextAuth's SessionProvider.
    -   `DarkModeToggle.tsx`: Component for toggling dark/light mode.
    -   `Navbar.tsx`: The main navigation bar.
-   `lib/`: Utility functions and configurations.
    -   `auth.ts`: NextAuth.js configuration.
    -   `prisma.ts`: Prisma Client instance.
-   `prisma/`: Prisma schema and migrations.
    -   `schema.prisma`: Database schema definition.
-   `public/`: Static assets.
-   `styles/`: Global CSS styles.
-   `tailwind.config.ts`: Tailwind CSS configuration.

## Important Notes

-   **Authentication:** The dashboard page (`/dashboard`) is protected and requires a user to be logged in. If you try to access it without being authenticated, you will be redirected to the login page.
-   **API Routes:** The API routes (`/api/products`, `/api/orders`, `/api/dashboard`) are protected and require an authenticated session.
-   **Password Reset:** The `/reset-password` page is a placeholder. In a production application, you would integrate a robust email service to handle password reset links.
-   **Data Persistence:** Since SQLite is used, your data will be stored in the `dev.db` file. If you delete this file, your database will be reset.