# Rule Engine with AST
This project is a simple 3-tier rule engine application that determines user eligibility based on various attributes like age, department, income, and spend. The system uses an Abstract Syntax Tree (AST) to represent conditional rules and allows for dynamic creation, combination, and modification of these rules.
## Prerequisites
Before setting up the project, ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (if not included with your Docker installation)
## Getting Started
Follow these steps to set up and run the project using Docker:
### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone <repository-url>
cd rule_engine
```
### 2. Build and Start the Services
Use Docker Compose to build and start the backend and frontend services:
```bash
docker-compose up --build
```
### 3. Access the Application
Once the containers are up and running, you can access the application using the following URLs:
Backend (FastAPI): http://localhost:8000
Frontend (React): http://localhost:3000
### 4. Stop the Services
To stop the running services, press CTRL+C in the terminal where Docker Compose is running, or run:
```bash
docker-compose down
```
### 5. Additional Commands
To view logs from the backend service, run:
```bash
docker-compose logs backend
```
To view logs from the frontend service, run:
```bash
docker-compose logs frontend
```