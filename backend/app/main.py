from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from pydantic import BaseModel
from typing import Dict, Any, List
from app.db import engine, Base, SessionLocal
from app.models import Rule, Node
from app.ast_utils import parse_rule
from app.schemas import RuleCreate
import ast
import operator
from app.crud import create_rule, get_all_rules, get_rule_by_id
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

# Operator mapping to handle conditional logic
operators = {
    ast.Eq: operator.eq,
    ast.NotEq: operator.ne,
    ast.Lt: operator.lt,
    ast.LtE: operator.le,
    ast.Gt: operator.gt,
    ast.GtE: operator.ge,
    ast.And: lambda x, y: x and y,
    ast.Or: lambda x, y: x or y,
}

# Request model to match frontend payload
class RuleEvaluationRequest(BaseModel):
    rule_string: str
    user_data: dict

class CombineRulesRequest(BaseModel):
    rules: List[str]
    operator: str  


def evaluate_ast(node, data):
    """Recursively evaluate the AST node against the given data."""
    if isinstance(node, ast.BoolOp):
        values = [evaluate_ast(value, data) for value in node.values]
        return operators[type(node.op)](*values)

    elif isinstance(node, ast.Compare):
        left = evaluate_ast(node.left, data)
        comparisons = [
            operators[type(op)](left, evaluate_ast(comp, data))
            for op, comp in zip(node.ops, node.comparators)
        ]
        return all(comparisons)

    elif isinstance(node, ast.Name):
        return data.get(node.id)

    elif isinstance(node, ast.Constant):
        return node.value

    else:
        raise ValueError(f"Unsupported node type: {type(node)}")

def combine_asts(asts: List[ast.AST], operator: str) -> ast.BoolOp:
    """Combine multiple ASTs with a logical operator."""
    op_class = ast.And if operator == "AND" else ast.Or
    return ast.BoolOp(op=op_class(), values=asts)

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
   
@app.post("/evaluate")
async def evaluate_rule(request: RuleEvaluationRequest):
    try:
        # Parse the rule string into an AST
        tree = ast.parse(request.rule_string, mode='eval')

        # Evaluate the AST against user data
        result = evaluate_ast(tree.body, request.user_data)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/combine_rules")
async def combine_rules(request: CombineRulesRequest):
    # Parse each rule string into an AST
    asts = [parse_rule(rule) for rule in request.rules]

    # Combine the parsed ASTs using the given operator
    combined_ast = combine_asts(asts, request.operator)

    # Convert combined AST back to a string for confirmation (optional)
    combined_rule_string = ast.dump(combined_ast)

    return {"combined_ast": combined_rule_string}