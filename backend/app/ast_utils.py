from app.models import Node
def create_ast(rule_string: str) -> Node:
    # Parse the rule string and build an AST (in real-world, use a proper parser)
    root = Node(type="operator", value="AND")
    root.left = Node(type="operand", value="age > 30")
    root.right = Node(type="operand", value="department = 'Sales'")
    return root
def evaluate_ast(node: Node, data: dict) -> bool:
    if node.type == "operand":
        return eval(node.value, {}, data)
    if node.type == "operator":
        if node.value == "AND":
            return evaluate_ast(node.left, data) and evaluate_ast(node.right, data)
        elif node.value == "OR":
            return evaluate_ast(node.left, data) or evaluate_ast(node.right, data)