
```markdown
# E-Commerce Project

## Overview

The E-Commerce Project is a web application designed for managing an online store. It includes functionalities for user management, product and category management, and order handling. The system supports role-based access with features for users and super-users.

## Features

- **User Management**
  - Users can register and log in with validation.
  - Authorized users can log in with a token-based authentication system.

- **Product Management**
  - Products can be inserted, edited, and deleted.
  - Products can have associated images.
  - Products are linked to categories.

- **Category Management**
  - Super-users can insert, update, and delete categories.
  - Categories are referenced by products.

- **Order Management**
  - Users can create and delete orders.
  - Orders can be viewed by user ID.
  - Users can get order items and cancel their order items.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (for running the application)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (for database management)

## Setup and Configuration

1. **Set Up MongoDB:**
   - Install and configure [MongoDB Compass](https://www.mongodb.com/products/compass).
   - Create a MongoDB database and collection for your project.

2. **Environment Configuration:**
   - Create a `.env` file in the root directory of the project.
   - Set the following environment variables in the `.env` file:
     ```env
     MONGO_URL=mongodb://localhost:27017/yourdatabase
     PORT=3000
     ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run the Application:**
   ```bash
   npm run start
   ```

5. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000` (or the port specified in your `.env` file).

---

Thank you for using the E-Commerce Project!
```
