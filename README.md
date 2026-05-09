# PetStore E-commerce Site

A functional e-commerce platform for pets built with a modern tech stack.

## Tech Stack
- **Backend**: Java 17, Spring Boot 3, Spring Data JPA, PostgreSQL.
- **Frontend**: React (Vite), Tailwind CSS, Material UI (MUI).

## Features
- **REST API**: Full CRUD operations for pet management.
- **Persistent Storage**: Data stored in a PostgreSQL database.
- **Product Gallery**: Responsive grid view of pets with search and category filters.
- **Premium UI**: Modern design using Material UI components and Tailwind CSS.

## Getting Started

### Prerequisites
- Java 17+
- Node.js & npm
- PostgreSQL

### Running the Backend
1. Configure your PostgreSQL credentials in `backend/src/main/resources/application.properties`.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Run the application (using Maven):
   ```bash
   mvn spring-boot:run
   ```

### Running the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints
- `GET /api/pets`: Get all pets (supports `category` query param).
- `GET /api/pets/{id}`: Get pet by ID.
- `POST /api/pets`: Create a new pet.
- `PUT /api/pets/{id}`: Update an existing pet.
- `DELETE /api/pets/{id}`: Delete a pet.
