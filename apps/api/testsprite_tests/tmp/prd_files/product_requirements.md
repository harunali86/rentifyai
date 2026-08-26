# RentifyAI Product Requirements

## Overview
RentifyAI is a comprehensive real estate marketplace application modeled after Zillow, designed to facilitate buying, selling, and renting properties. It features a robust backend API built with NestJS and a modern frontend interface using Next.js.

## Key Features

### 1. User Authentication
- **Register/Login**: Users can sign up and log in using email/password.
- **Roles**: Support for Users, Agents, and Admins.
- **Security**: JWT-based authentication.

### 2. Property Management
- **Listings**: Agents can create, update, and delete property listings.
- **Details**: Properties include price, address, bedrooms, bathrooms, area, and images.
- **Search**: Advanced search with filters for city, price range, and type (Rent/Sale).
- **Similar Homes**: AI-driven recommendations for similar properties.

### 3. User Engagement
- **Favorites**: Users can save properties to their dashboard.
- **Inquiries**: Users can send lead inquiries to agents.
- **Bookings**: Users can book viewings or pay token amounts.
- **Dashboard**: "My Zillow" dashboard for managing saved homes and searches.

### 4. Admin Panel
- **Overview**: Stats on total revenue, active users, and properties.
- **Management**: Admins can view and approve/reject property listings.
- **Mobile Support**: Responsive design for admin tasks on the go.

## Technical Architecture
- **Backend**: NestJS (Node.js framework)
- **Database**: PostgreSQL with Prisma ORM
- **Frontend**: Next.js (React)
- **Maps**: Leaflet/Mapbox integration
