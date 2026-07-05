# CATFIT Website – User + Admin Panel

A full-stack website inspired by [catfit.in](https://catfit.in/) with a public user-facing site and a complete admin CMS to edit all content.

## Features

### Public Website (User Side)
- Homepage with hero, statistics, mission/vision, about
- Security Solutions pages
- M.A.S.T.S program pages
- Sports, Team, Panelists sections
- Student testimonials
- Partner institutions
- Contact form with message storage

### Admin Panel
- **Site Settings** – site name, tagline, hero, about, mission, vision, contact info
- **Statistics** – homepage counter numbers
- **Navigation Menu** – edit all menu items and submenus
- **Services** – security & M.A.S.T.S programs (add/edit/delete)
- **Panelists** – manage all panelist profiles
- **Testimonials** – student reviews
- **Institutions** – partner logos/names
- **Messages** – view contact form submissions

## Quick Start

```bash
# Install dependencies
npm install

# Setup database (first time only)
npm run db:setup

# Start development server
npm run dev
```

Open:
- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

## Admin Login

| Field    | Value            |
|----------|------------------|
| Email    | admin@catfit.in  |
| Password | admin123         |

Change credentials in `.env` before deploying to production.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Prisma + SQLite
- JWT authentication

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
ADMIN_EMAIL="admin@catfit.in"
ADMIN_PASSWORD="admin123"
```

## Project Structure

```
src/
  app/
    (public)/     → User-facing pages
    admin/        → Admin CMS panel
    api/          → REST API routes
  components/
    public/       → Header, Footer, Hero, etc.
    admin/        → Admin forms and tables
  lib/            → Database, auth, settings
prisma/
  schema.prisma   → Database models
  seed.ts         → Initial CATFIT data
```
