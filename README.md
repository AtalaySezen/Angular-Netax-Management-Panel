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
<br>
Moderator: Allowed to create and update products.
<br>
User: Read-only access to product listings.
Product Management

CRUD Operations:
Product creation and updates are restricted to Admin and Moderator roles.
<br>
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
<br>
RoleGuard: Enforces role-based access control for various features.
<br>
HTTP Interceptor: Automatically attaches the token to outgoing requests.
<br>
<br>
Responsive UI with Angular Material

Includes tables, forms, and modals styled with Angular Material.

# Technical Details
Framework: Angular
<br>
API Source: DummyJSON API
<br>
Styling Library: Angular Material
<br>
Routing: Role-based route protection implemented with Angular Guards.
<br>
Authentication: Simulated JWT authentication with local storage for token management.
<br>
Data Handling: HTTP Client for API communication and interceptors for token management.
<br>
<br>
Search and Pagination:
Search: Users can search for products within the listings.
<br>
Pagination: Listings are paginated to improve usability and performance.

## API Documentation

The API endpoints used in this project are documented in Postman. You can view the full documentation at the link below:

[View API Documentation on Postman](https://documenter.getpostman.com/view/28053393/2sAYQajqdG)


# How to Run the Application

Install Dependencies

Run npm install to install all required packages.

Start the Application

Run ng serve to start the development server.
Access the app at http://localhost:4200.
