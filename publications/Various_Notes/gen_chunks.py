import re
import json

with open("Measure_theory.tex", "r") as f:
    lines = f.readlines()

chunks = []
in_list = False
current_chunk = None

def starts_list_item(line):
    m = re.match(r'^(\s*)(\$?\([a-zA-Z]\)\$?)(.*)', line)
    return m

for i, line in enumerate(lines):
    m = starts_list_item(line)
    
    if in_list:
        if re.match(r'^\s*\\end{(proof|application|definition|proposition|remark|notation)}', line):
            # close the list before this line
            if current_chunk is not None:
                current_chunk["ReplacementContent"] += "\\end{itemize}\n"
                current_chunk["EndLine"] = i
                chunks.append(current_chunk)
                current_chunk = None
            in_list = False
    
    if m:
        indent = m.group(1)
        if not in_list:
            if current_chunk is not None:
                current_chunk["EndLine"] = i
                chunks.append(current_chunk)
            current_chunk = {
                "StartLine": i + 1,
                "TargetContent": "",
                "ReplacementContent": indent + "\\begin{itemize}\n",
                "AllowMultiple": False
            }
            in_list = True
            
        current_chunk["TargetContent"] += line
        current_chunk["ReplacementContent"] += f"{indent}\\item {line.lstrip()}"
    else:
        if in_list:
            current_chunk["TargetContent"] += line
            current_chunk["ReplacementContent"] += line

if in_list and current_chunk is not None:
    current_chunk["ReplacementContent"] += "\\end{itemize}\n"
    current_chunk["EndLine"] = len(lines)
    chunks.append(current_chunk)

print(json.dumps(chunks, indent=2))
