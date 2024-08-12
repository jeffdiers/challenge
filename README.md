# Welcome to the People Directory

## Overview

This project is a simple directory application built with React and TypeScript. It includes a caching fetch library (in progress) and a server-side rendering framework. The setup is minimal, with an emphasis on completing the caching fetch library and configuring the project for production use.

## Code Formatting with Prettier

This project uses Prettier for consistent code formatting.

### VSCode Users

- Search and install "Prettier - Code formatter" from the Extensions.
- Configuration can be found in `.prettierrc`, and VSCode settings can be found in `.vscode/settings.json`.

### IntelliJ IDEA Users

- The project includes a `.idea/prettier.xml` file for integration.

## Project Setup

### Running the Project

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start Development Server:**

   ```bash
   npm run dev
   ```

   - Access the app at [http://localhost:3000](http://localhost:3000).

### Building the Project

1. **Build for Production:**

   ```bash
   npm run build
   ```

   - Bundles and minifies code, outputting to `dist/`.

2. **Start Production Server:**

   ```bash
   npm start
   ```

   - Runs the production build of the server.

### Running Tests

This project includes a testing setup using Jest.

1. **Run All Tests:**

   ```bash
   npm test
   ```

2. **Watch Tests:**

   ```bash
   npm run test:watch
   ```

   - Watches for file changes and runs relevant tests.

## Type Checking with TypeScript

TypeScript is used to ensure type safety throughout the codebase.

### Running Type Checks

1. **Type Check:**

   ```bash
   npm run type-check
   ```

   - This command checks the entire codebase for type errors without generating output files.

## Next Steps

### Project Configuration

- **CI/CD Pipeline:** Consider setting up a CI/CD pipeline (e.g., GitHub Actions, CircleCI) to automate testing and deployment processes.
- **Production Readiness:** Additional steps may be required to make the project fully production-ready, such as setting up logging, monitoring, and error tracking.
- **Creating a Docker Container:** Containerize the application using Docker to ensure consistent environments across development, staging, and production. Docker allows you to package the application along with its dependencies, making it easier to deploy and run the application anywhere.
