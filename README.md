# E-Commerce Website Backend

This project is the backend for an e-commerce website, developed using the latest technologies to ensure competitiveness in the market. It provides a functional Express.js API with Sequelize for database management.

## Features

- **Functional Express.js API:** Provides a robust API for interacting with the e-commerce website.
- **Database Connection:** Ability to connect to a MySQL database using Sequelize.
- **Schema and Seed Commands:** Creation of a development database seeded with test data.
- **Server Invocation:** Start the server and sync Sequelize models with the MySQL database.
- **API Routes Testing:** Use Insomnia Core to test API routes for categories, products, or tags, displaying data in formatted JSON.
- **CRUD Operations:** Test API POST, PUT, and DELETE routes in Insomnia Core to successfully create, update, and delete data in the database.

## Technologies Used

- **Node.js:** Backend server environment.
- **Express:** Web application framework for Node.js.
- **MySQL:** Relational database for storing product, user, and order information.
- **Sequelize:** ORM for Node.js, used for database management.
- **JWT:** JSON Web Tokens for authentication and authorization.
- **Stripe:** Payment gateway integration for processing payments.
- **Other Libraries:** Additional libraries and packages as needed for specific features.

## Getting Started

1. Clone the repository: `git clone https://github.com/Nurshat01/E-commerce-API.git
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
     ```
     DB_NAME=your_database_name
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     ```
4. Run database schema and seed commands:
   - To create the development database and seed it with test data, run: `npm run seed`
5. Start the server: `npm start`
6. Access the API endpoints using a tool like Postman or Insomnia Core.

## Testing

- Use Insomnia Core to test the API routes:
  - GET routes for categories, products, or tags should display data in formatted JSON.
  - POST, PUT, and DELETE routes should allow you to create, update, and delete data in the database.
