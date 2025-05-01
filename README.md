# 🚀 Solita Dev Academy Spring 2025 Exercise

Welcome to the Solita Dev Academy Spring 2025 Exercise project! This repository contains a full-stack application built with modern technologies, including React for the frontend, Node.js for the backend, and PostgreSQL for the database. The application is containerized using Docker for easy setup and deployment.

## Getting Started

Follow the steps below to set up and run the application locally.

### Prerequisites

Ensure you have the following installed on your system:
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (for local frontend development)

---

### Running the Application with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/gittjar/solita-dev-academy-spring-2025-exercise.git
   cd solita-dev-academy-spring-2025-exercise
   docker-compose up --build
   ```

### Access the services:

* Backend API: http://localhost:3001
* Adminer (Database Management): http://localhost:8088

- cd frontend
- npm install
- npm run dev
- Local: http://localhost:5173

<hr>

solita-dev-academy-spring-2025-exercise/
├── backend/       # Backend service (Node.js + Express)
├── frontend/      # Frontend service (React + Vite)
├── db/            # Database initialization scripts
├── [docker-compose.yml]
└── [README.md]