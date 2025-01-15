# About this repo 
This repository provides a simple boilerplate for implementing user authentication using Express.js and Passport JWT. It includes both backend and frontend components, with JWT-based authentication for protected routes.

This project is designed as a starting point for future projects, providing the essential setup for secure user authentication and a basic frontend interface.

# Logic

- User authentication is verified using Passport JWT.
- Upon successful login, a JWT is generated and sent to the client.
- The JWT is stored in the client's localStorage to maintain authentication until the user logs out.
- The token is attached as a Bearer Token in request headers for accessing protected routes.


# Technologies Used

## Backend
- Node.js with Express.js
- Passport.js with passport-jwt
- PostgreSQL for user data management
- jsonwebtoken for creating and verifying JWTs

## Frontend
- React.js (built with Vite)
- React Router for navigation