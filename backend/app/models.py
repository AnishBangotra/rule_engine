from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base

class Node:
    def __init__(self, node_type, value=None, left=None, right=None):
        self.type = node_type  # 'operator' or 'operand'
        self.value = value      # The actual value (like a comparison or string)
        self.left = left        # Left child (for operators)
        self.right = right  
        
class Rule(Base):
    __tablename__ = "rules"
    id = Column(Integer, primary_key=True, index=True)
    rule_string = Column(String, nullable=False)  # Ensure this matches the error message