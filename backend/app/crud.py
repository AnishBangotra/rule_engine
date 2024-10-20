from sqlalchemy.orm import Session
from app.models import Rule

def create_rule(db: Session, rule_string: str):
    """Insert a new rule into the database."""
    new_rule = Rule(rule_string=rule_string)
    db.add(new_rule)
    db.commit()
    db.refresh(new_rule)  # Refresh to get the new rule with its ID
    return new_rule

def get_all_rules(db: Session):
    """Retrieve all rules from the database."""
    return db.query(Rule).all()

def get_rule_by_id(db: Session, rule_id: int):
    return db.query(Rule).filter(Rule.id == rule_id).first()