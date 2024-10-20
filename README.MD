# Build Instructions

# Rule Engine with AST
This project is a simple 3-tier rule engine application that determines user eligibility based on various attributes like age, department, income, and spend. The system uses an Abstract Syntax Tree (AST) to represent conditional rules and allows for dynamic creation, combination, and modification of these rules.
## Prerequisites

## Tech Stack

### Frontend

- **React.js** - v18.2.0  
  A JavaScript library for building user interfaces, especially for dynamic and interactive UIs.
- **Axios** - v1.4.0  
  Used for making HTTP requests from the frontend to the backend.
- **CSS** - Styling for UI components.

### Backend

- **Python** - v3.9.0  
  Language used to implement backend logic for creating, combining, and evaluating rules.
- **FastAPI** - v0.95.2  
  A modern, fast (high-performance) web framework for building APIs with Python 3.6+ based on standard Python type hints.
- **Uvicorn** - v0.22.0  
  ASGI server for serving FastAPI applications.

### Database

- **SQLite** - v3.x  
  A lightweight relational database used for storing rules and metadata.

---
Before setting up the project, ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (if not included with your Docker installation)
## Getting Started
Follow these steps to set up and run the project using Docker:
### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/AnishBangotra/rule_engine.git
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


## API Endpoints

1. **POST** `/create_rule`  
   - Create a new rule from a rule string and store it in the database.  
   - **Payload Example:**
     ```json
     {
       "rule_string": "(age > 30 and department == 'Sales')"
     }
     ```

2. **POST** `/combine_rules`  
   - Combine multiple rules using logical operators (`AND` / `OR`).  
   - **Payload Example:**
     ```json
     {
       "rules": [1, 2], 
       "operator": "AND"
     }
     ```

3. **POST** `/evaluate`  
   - Evaluate the combined AST using user attributes to check eligibility.  
   - **Payload Example:**
     ```json
     {
       "combined_ast": {
         "op": "Or",
         "values": [
           {"left": "age", "operator": ">", "right": 30},
           {"left": "age", "operator": "<", "right": 25}
         ]
       },
       "user_data": {
         "age": 28,
         "department": "Sales",
         "salary": 54332,
         "experience": 1
       }
     }
     ```

---
