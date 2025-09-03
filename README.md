Restaurant Management System
Project Objective

The Restaurant Management System aims to build a robust, scalable, and user-friendly full-stack web application to optimize restaurant operations, including order management, customer management, and menu display. The system provides an efficient interface for staff and a smooth experience for end-users through a responsive frontend.

Currently, the project has a basic foundation with Japanese documentation (README.ja.md) and a simple CI/CD pipeline for the frontend. The long-term goal is to integrate Docker, Storybook for component documentation, and Jest for testing, in order to enhance code quality and deployment efficiency.

Project Description

The Restaurant Management System is a full-stack web application designed to support restaurant management, consisting of two main modules:

Frontend (restaurant-frontend/): Built with Next.js, TypeScript, and React, providing an interactive interface to create, view, and manage orders, customers, and menus.

Backend (restaurant-backend/): Developed with Spring Boot, Java 17, and Maven, handling business logic, data persistence, and REST APIs (e.g., POST /orders, GET /orders), connected to MySQL.

Key Features

Create and manage orders with real-time updates.

Manage customer information.

Display and manage menus.

Modular, easily extensible UI.

Testing and documentation plans to ensure quality.

Technology Used
Frontend

Next.js: Framework supporting SSR and SSG.

React.js: Library for building component-based UIs.

TypeScript: Ensures type safety.

npm: Frontend package manager.

Node.js (18): Runtime for build and development.

Planned:

Storybook (8.6.14): Component documentation and testing.

Jest & React Testing Library: Unit testing.

ESLint: Code linting.

Backend

Spring Boot (3.5.5): Framework for REST APIs and business logic.

Java (17.0.12): Backend programming language.

Maven (3.9.6): Dependency management and build.

Hibernate (6.6.26): ORM for database operations.

Spring Data JPA: Repository-based data access.

Spring Security: Authentication and authorization.

HikariCP: Connection pool management.

Database

MySQL: Stores orders, customers, and menu data.

Infrastructure & DevOps

GitLab CI: Basic pipeline for frontend build.

Git: Version control.

Installation Guide
Requirements

Node.js (18): For frontend.

Java (17): For backend.

Maven (3.9.6): For backend build.

Git: Version control.

MySQL (8.0): For local testing.

Frontend Setup
# Navigate to frontend directory
cd D:\workspace\restaurant\restaurant-frontend

# Install dependencies
npm install

# Run development server
npm run dev


Access the app at http://localhost:3000
.

Backend Setup
# Navigate to backend directory
cd D:\workspace\restaurant\restaurant-backend

# Build application
mvn clean package -DskipTests

# Run application
java -jar target/restaurant-backend.jar


Access API at http://localhost:8081
 (e.g., POST /orders, GET /orders).

CI/CD

.gitlab-ci.yml automatically builds the frontend.

Planned: Add jobs for testing, building Storybook, and building the backend.

Expansion Plan

Docker: Add Dockerfile to containerize the frontend.

Storybook: Document components (e.g., OrderForm).

Testing: Add Jest and React Testing Library.

CI/CD Backend: Add job to build .jar.

AWS: Deploy frontend on S3/CloudFront and backend on ECS.

License

This project is licensed under the MIT License.