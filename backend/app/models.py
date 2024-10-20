from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from app.db import Base
class Node(Base):
    __tablename__ = "nodes"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)  # 'operator' or 'operand'
    value = Column(String, nullable=True)  # Optional: e.g., "age > 30"
    
    # Self-referencing foreign keys for left and right child nodes
    left_id = Column(Integer, ForeignKey("nodes.id"), nullable=True)
    right_id = Column(Integer, ForeignKey("nodes.id"), nullable=True)
    # Relationships for recursive node structure
    left = relationship("Node", remote_side=[id], foreign_keys=[left_id], backref="parent_left")
    right = relationship("Node", remote_side=[id], foreign_keys=[right_id], backref="parent_right")
    def __repr__(self):
        return f"<Node(id={self.id}, type={self.type}, value={self.value})>"
class Rule(Base):
    __tablename__ = "rules"
    id = Column(Integer, primary_key=True, index=True)
    rule_string = Column(String, nullable=False)  # Ensure this matches the error message