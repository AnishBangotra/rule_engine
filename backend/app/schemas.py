from pydantic import BaseModel
class RuleCreate(BaseModel):
    rule_string: str
class RuleResponse(BaseModel):
    id: int
    rule_string: str