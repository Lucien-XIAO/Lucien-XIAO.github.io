import json

with open("Measure_theory.tex", "r") as f:
    text = f.read()

# I will write a simple string replacement logic for all these chunks to avoid line number shifts.
chunks = json.load(open("chunks.json"))

for chunk in chunks:
    target = chunk["TargetContent"]
    rep = chunk["ReplacementContent"]
    # Fix the 940 chunk
    if target.startswith("(a) Consider"):
        target_fixed = target.split("\\begin{example}")[0]
        rep_fixed = "\\begin{itemize}\n\\item " + target_fixed.replace("(a) Consider", "Consider") + "\\end{itemize}\n\n"
        # actually, the target has "(a) Consider", and rep has "\item (a) Consider".
        # Let's cleanly replace it.
        target_fixed = "(a) Consider\n\\[\n\\sigma(\\mathscr C):=\\bigcap_{\\mathcal T\\ \\text{sigma-algebra},\\ \\mathscr C\\subset\\mathcal T}\\ \\mathcal T .\n\\]\nSince $\\mathcal P(X)$ is a sigma-algebra containing $\\mathscr C$, the index set is nonempty; by Examples above, $\\sigma(\\mathscr C)$ is indeed a sigma-algebra and is obviously the smallest one.\nThe points (b) and (c) follow immediately from the definition of a generated sigma-algebra.\n"
        rep_fixed = "\\begin{itemize}\n\\item (a) Consider\n\\[\n\\sigma(\\mathscr C):=\\bigcap_{\\mathcal T\\ \\text{sigma-algebra},\\ \\mathscr C\\subset\\mathcal T}\\ \\mathcal T .\n\\]\nSince $\\mathcal P(X)$ is a sigma-algebra containing $\\mathscr C$, the index set is nonempty; by Examples above, $\\sigma(\\mathscr C)$ is indeed a sigma-algebra and is obviously the smallest one.\nThe points (b) and (c) follow immediately from the definition of a generated sigma-algebra.\n\\end{itemize}\n"
        target = target_fixed
        rep = rep_fixed
        
    if target in text:
        text = text.replace(target, rep, 1)
    else:
        print("Failed to find target:\n", target[:100])

# Now remove the duplicated block at the end (lines 1313 to 1346).
# The duplicate text starts at "These properties can be summarized as follows:"
# and ends right before "\footnoterule" ? No, it ends right at \end{document}
dup_target = """These properties can be summarized as follows:
\\begin{proposition}
The set of measurable functions from $(X, \\mathscr{A})$ to $(\\mathbb{K}, \\mathscr{B}(\\mathbb{K}))$ equipped with the usual operations $+,\\cdot,\\times$ on functions is a $\\mathbb{K}$-algebra $(^1)$.
\\end{proposition}

\\begin{proposition}
Let $(f_n)_{n \\geq 1}$ be a sequence of measurable functions from $(X, \\mathscr{A})$ with values in $(\\overline{\\mathbb{R}}, \\mathscr{B}(\\overline{\\mathbb{R}}))$.
\\begin{itemize}
    \\item (a) $\\sup_n f_n$ and $\\inf_n f_n$ are measurable,
    \\item (b) $\\overline{\\lim}_n f_n$ and $\\underline{\\lim}_n f_n$ are measurable,
    \\item (c) If $f_n \\xrightarrow{S} f$ ("S" for "simply" [pointwise] i.e., $\\forall x \\in X, f_n(x) \\to f(x)$ in $\\overline{\\mathbb{R}}$), then $f$ is measurable.
\\end{itemize}
\\end{proposition}

\\begin{proof}
Since $\\mathscr{B}(\\overline{\\mathbb{R}}) = \\sigma((a, +\\infty], a \\in \\mathbb{R}) = \\sigma([a, +\\infty], a \\in \\mathbb{R})$, it suffices, to establish the measurability of a function $g$, to verify (\\textit{cf.} proposition 4.1) that
$$ \\forall a \\in \\mathbb{R}, \\quad \\{g > a\\} \\in \\mathscr{A} \\quad \\text{or} \\quad \\forall a \\in \\mathbb{R}, \\quad \\{g \\geq a\\} \\in \\mathscr{A}. $$
\\begin{itemize}
\\item $(a) \\ \\{\\sup_n f_n > a\\} = \\bigcup_{n \\geq 1} \\{f_n > a\\} \\in \\mathscr{A}$ and $\\{\\inf_n f_n \\geq a\\} = \\bigcap_{n \\geq 1} \\{f_n \\geq a\\} \\in \\mathscr{A}.$

\\item $(b)$ Recall that $\\underline{\\lim}_n f_n := \\sup_n (\\inf_{k \\geq n} f_k)$ and $\\overline{\\lim}_n f_n := \\inf_n (\\sup_{k \\geq n} f_k)$ and we apply point $(a)$.

\\item $(c)$ We know that a sequence $(x_n)_{n \\in \\mathbb{N}}$ converges in $\\overline{\\mathbb{R}}$ if and only if $\\underline{\\lim}_n x_n = \\overline{\\lim}_n x_n$, in which case $\\lim_n x_n = \\underline{\\lim}_n x_n = \\overline{\\lim}_n x_n$. Consequently, if $f_n \\xrightarrow{S} f$, $f = \\underline{\\lim}_n f_n$ is therefore measurable.
\\end{itemize}
\\end{proof}

\\vspace{0.5cm}
\\footnoterule
\\small
1. \\textit{i.e.}, a $\\mathbb{K}$-vector space for the operations $+,\\cdot$ and a ring for the operations $+,\\times$, these four operations verifying furthermore various natural compatibility relations trivially verified in the case of vector spaces of functions with values in $\\mathbb{K}$, for which we refer to an appropriate textbook.
\\normalsize
"""

if dup_target in text:
    text = text.replace(dup_target, "")
else:
    print("Failed to find duplication block")

with open("Measure_theory.tex", "w") as f:
    f.write(text)

print("Replacement complete.")
