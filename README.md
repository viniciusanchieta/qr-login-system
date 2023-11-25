<img width="1129" alt="Screenshot 2023-11-25 at 11 23 31" src="https://github.com/viniciusanchieta/qr-login-system/assets/31235308/1ff10313-1860-4166-a3a3-e7cae8310336">

<h1 align="center">QR Login System</h1>

<p align="center" margin-top="25px" >
  <img src="https://img.shields.io/badge/Status-Completed-green" alt="Status" />
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/viniciusanchieta/qr-login-system?color=green">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/viniciusanchieta/qr-login-system?color=green">

  <img alt="GitHub" src="https://img.shields.io/github/license/viniciusanchieta/qr-login-system?color=green">
</p>

This is a monorepo for a QR code-based authentication system, designed to allow users to log in to a web application by scanning a QR code using a mobile app. The structure of the repository includes three main directories: `web/`, `mobile/`, and `server/`.

## Technologies Used

- **Mobile (React Native with Expo)**

  - React Native
  - Expo

- **Web (Next.js)**

  - Next.js
  - React

- **Server (Fastify with Prisma)**
  - Fastify
  - Prisma

## Project Overview

The project aims to create a seamless authentication experience where users can log in to the web application by scanning a QR code displayed on the web interface using the mobile app. The primary technologies used in each component are listed above.

## Project Structure

- `web/`: Contains the Next.js web application code.
- `mobile/`: Houses the React Native mobile app developed with Expo.
- `server/`: Holds the Fastify server code, integrating Prisma for database operations.

## How It Works

1. **Web Application (Next.js)**

   - Generates a unique QR code for user authentication.
   - Displays the QR code on the web interface.

2. **Mobile App (React Native with Expo)**

   - Scans the QR code displayed on the web interface.
   - Authenticates the user on the mobile app.

3. **Server (Fastify with Prisma)**
   - Manages the authentication process.
   - Interacts with the database (Prisma) for user-related operations.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/viniciusanchieta/qr-login-system.git
   cd qr-login-system

   ```

2. **Install Dependencies**

   ```bash
   # Install dependencies for the web application
   cd web
   npm install

   # Install dependencies for the mobile app
   cd ../mobile
   npm install

   # Install dependencies for the server
   cd ../server
   npm install

   ```

3. **Set Up the Database**

   ```bash
   # Add the database URL to the .env file
    cd server

    # Replace <DATABASE_URL> with the URL of your database
    echo DATABASE_URL="<DATABASE_URL>" >> .env

   ```

4. **Run the Project**

   ```bash
   # Run the web application
   cd web
   npm run dev

   # Run the mobile app
   cd ../mobile
   npm start

   # Run the server
   cd ../server
   npm run dev
   ```

## Contributors

- [Vinicius Anchieta](https://qr-login-system)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
