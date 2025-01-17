![image](https://github.com/user-attachments/assets/dbf464a2-4349-4331-99b7-8d133bb468f8)
# Documentation for Angular Role-Based Admin Panel Application
This application is a role-based Admin Panel built with Angular. It features a modular structure and leverages Angular Material for UI components. The app uses the DummyJSON API for data retrieval and demonstrates essential functionalities such as user authentication, role-based authorization, and product management (CRUD operations).

# Sample Credentials
To test the application, you can use the following sample credentials based on the roles available:

| **Role**   | **Username** | **Password**    |
|------------|--------------|-----------------|
| **Admin**  | `emilys`     | `emilyspass`    |
| **Moderator** | `oliviaw`     | `oliviawpass`    |
| **User**   | `averyp`       | `averyppass`      |

# Features
User Authentication

Token-based session management (JWT simulation).
Token storage and validation after a successful login.
Role-Based Authorization

Admin: Full access to product management (Create, Read, Update, Delete).
Editor: Allowed to create and update products.
User: Read-only access to product listings.
Product Management

CRUD Operations:
Product creation and updates are restricted to Admin and Editor roles.
Product deletion is restricted to Admin.
All roles can view product listings.
Features:
Search functionality within product listings.
Pagination for efficient data navigation.
Filtering options for specific data retrieval.
Modular Architecture

Code is organized into feature modules for better scalability and maintainability.
API Integration

Utilizes the DummyJSON API for fetching and managing product data.
Angular Guards and Interceptors

AuthGuard: Ensures authentication for accessing specific routes.
RoleGuard: Enforces role-based access control for various features.
HTTP Interceptor: Automatically attaches the token to outgoing requests.
Responsive UI with Angular Material

Includes tables, forms, and modals styled with Angular Material.

# Technical Details
Framework: Angular
API Source: DummyJSON API
Styling Library: Angular Material
Routing: Role-based route protection implemented with Angular Guards.
Authentication: Simulated JWT authentication with local storage for token management.
Data Handling: HTTP Client for API communication and interceptors for token management.
Search and Pagination:
Search: Users can search for products within the listings.
Pagination: Listings are paginated to improve usability and performance.

# How to Run the Application

Install Dependencies

Run npm install to install all required packages.

Start the Application

Run ng serve to start the development server.
Access the app at http://localhost:4200.

# Code Structure
Modules:
Authentication Module
Product Management Module
Shared Module for reusable components
Services:
AuthService for authentication and role management
ProductService for handling API communication
