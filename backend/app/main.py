from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from app.db import engine, Base, SessionLocal
from app.models import Rule
from app.schemas import RuleCreate
from app.crud import create_rule, get_all_rules
from app import models
# Check tables in the database
inspector = inspect(engine)
print("Tables in the database:", inspector.get_table_names())
# Create all tables in the database
models.Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any origin (frontend)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
# Define routes if needed (example)
@app.get("/")
def read_root():
    return {"message": "Welcome to the Rule Engine API"}
# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@app.post("/rules")
def create_new_rule(rule: RuleCreate, db: Session = Depends(get_db)):
    db_rule = create_rule(db=db, rule_string=rule.rule_string)
    return {"message": "Rule created successfully", "rule": db_rule}
@app.get("/rules")
def read_rules(db: Session = Depends(get_db)):
    """API endpoint to fetch all rules."""
    return get_all_rules(db)