WTWR (What to Wear) Back-End Server
Welcome to the What to Wear back-end server! This project provides the foundation for a weather-based clothing recommendation application, helping users decide what to wear based on current weather conditions.
📌 Main Purpose
This server enables users to store clothing items, categorize them by weather type, and interact with other users' items through likes. It is built using Node.js, Express.js, and MongoDB for efficient and scalable data management.
🔑 Key Features
User Management

- Allows users to create and manage their profiles, including names and avatars.
- Provides API endpoints for handling user data.
  Clothing Items Management
- Stores clothing items with details like name, weather type (hot/warm/cold), and images.
- Each item is associated with an owner (user).
- Enables users to "like" clothing items.
- Tracks item creation dates.
  Database Integration
- Utilizes MongoDB to store all user and clothing data.
- Connects to a local MongoDB instance for data persistence.
  API Structure
- Implements RESTful routes for users and clothing items.
- Includes proper error handling to ensure reliability.
- Runs an Express.js server on port 3001.
  🛠️ Technologies Used
  Core Technologies
- Node.js – JavaScript runtime environment.
- Express.js – Web framework for creating the server and API routes.
- MongoDB – NoSQL database for storing user and clothing item data.
- Mongoose – ODM (Object Document Mapper) for MongoDB, version 8.9.5+.
  Development Tools
- ESLint – Code linting and formatting tool.
- Nodemon – Development tool for hot reload (auto-restart server on file changes).
- Validator – Package for URL validation in schemas.
  Project Structure
- MVC Architecture – Models, Views (routes), Controllers pattern.
- RESTful API – Following REST principles for API endpoints.
  Key Packages
- mongoose@^8.9.5 – For database connection and schemas.
- validator – For URL validation.
- nodemon – As a dev dependency for hot reload.
- eslint – For code quality.
  ⚡ Server Configuration
- The server runs on port 3001.
- Connects to a local MongoDB instance at: mongodb://127.0.0.1:27017/wtwr_db.
