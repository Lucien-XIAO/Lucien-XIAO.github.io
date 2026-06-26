import re

with open("Measure_theory.tex", "r") as f:
    lines = f.readlines()

new_lines = []
in_list = False

def starts_list_item(line):
    # Matches (a) or (b) or $(a)$ or $(a) etc at the start of a line
    # Must be followed by space or something, but actually we just match:
    # optional spaces, optional $, (, single letter, ), optional $, optional spaces
    m = re.match(r'^(\s*)(\$?\([a-zA-Z]\)\$?)(.*)', line)
    return m

for i, line in enumerate(lines):
    m = starts_list_item(line)
    
    # Check if we should end the list before processing this line
    if in_list:
        if re.match(r'^\s*\\end{(proof|application|definition|proposition|remark|notation)}', line):
            new_lines.append("\\end{itemize}\n")
            in_list = False
    
    if m:
        indent = m.group(1)
        # We just keep the original text of the list marker but prepend \item
        
        if not in_list:
            new_lines.append(indent + "\\begin{itemize}\n")
            in_list = True
            
        new_lines.append(f"{indent}\\item {line.lstrip()}")
    else:
        new_lines.append(line)

if in_list:
    new_lines.append("\\end{itemize}\n")

with open("Measure_theory.tex", "w") as f:
    f.writelines(new_lines)
