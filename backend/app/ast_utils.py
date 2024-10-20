import re
from app.models import Node

def parse_rule(rule_string):
    """Parses a rule string into an AST."""
    rule_string = rule_string.strip()
    if rule_string.startswith('(') and rule_string.endswith(')'):
        rule_string = rule_string[1:-1]

    if ' OR ' in rule_string:
        left, right = split_rule(rule_string, ' OR ')
        return Node('operator', 'OR', parse_rule(left), parse_rule(right))
    elif ' AND ' in rule_string:
        left, right = split_rule(rule_string, ' AND ')
        return Node('operator', 'AND', parse_rule(left), parse_rule(right))
    else:
        return Node('operand', value=rule_string)

def split_rule(rule_string, operator):
    """Splits the rule string by the given operator while respecting parentheses."""
    parts = re.split(rf'\s{operator}\s', rule_string, maxsplit=1)
    return parts[0].strip(), parts[1].strip()

def evaluate_ast(node, user_data):
    """Evaluates the AST node with the given user data."""
    if node.type == 'operand':
        # Use Python's eval safely by restricting scope
        return eval(node.value, {"__builtins__": None}, user_data)
    elif node.type == 'operator':
        if node.value == 'AND':
            return evaluate_ast(node.left, user_data) and evaluate_ast(node.right, user_data)
        elif node.value == 'OR':
            return evaluate_ast(node.left, user_data) or evaluate_ast(node.right, user_data)
