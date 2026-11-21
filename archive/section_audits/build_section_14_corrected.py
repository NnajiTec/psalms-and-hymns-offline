# build_section_14_corrected.py
# Generates pristine, verified Section 14 files:
# 1. psalms_hymns_and_spiritual_songs_corrected.tex (updated)
# 2. arranged_clean_hymn_book_lyrics_corrected.txt (updated)
# 3. section_14_corrected.tex
# 4. section_14_corrected.txt

import os
import re
from section_14_data import SECTION_14_HYMNS

CORRECTED_TEX = r"E:\Hymn treatment\psalms_hymns_and_spiritual_songs_corrected.tex"
CORRECTED_TXT = r"E:\Hymn treatment\arranged_clean_hymn_book_lyrics_corrected.txt"

def format_hymn_latex(h):
    num_str = str(h['num'])
    marks = ''
    if h.get('star'):
        marks += '*'
    if h.get('dagger'):
        marks += r'\textdagger{}'
    
    header = f"HYMN {num_str}{marks}"
    
    meter_line = h['meter']
    if h.get('tune'):
        meter_line += f" {h['tune']}"
    
    out = []
    out.append(r"\newpage")
    out.append(r"\begin{center}")
    out.append(f"    {{\\Large \\textbf{{{header}}}}}")
    out.append(r"    \\")
    out.append(f"    \\textit{{{meter_line}}}")
    if h.get('notes'):
        out.append(r"    \\")
        out.append(f"    \\textit{{\\small [{h['notes']}]}}")
    out.append(r"\end{center}")
    out.append(r"\vspace{1em}")
    out.append("")
    out.append(r"\begin{enumerate}")
    
    v_daggers = h.get('verse_daggers', {})
    has_chorus = bool(h.get('chorus'))
    has_end_chorus = bool(h.get('end_chorus'))
    
    for v_idx, v_lines in enumerate(h['verses'], 1):
        if v_daggers.get(v_idx):
            item_cmd = f"\\item[\\textbf{{{v_idx}.\\textdagger{{}}}}]"
        else:
            item_cmd = f"\\item"
            
        out.append(f"    {item_cmd} {v_lines[0]} \\\\")
        for line in v_lines[1:-1]:
            out.append(f"        {line} \\\\")
        if len(v_lines) > 1:
            out.append(f"        {v_lines[-1]}")
        out.append("")
        
        # Place standard chorus after verse 1
        if has_chorus and v_idx == 1:
            out.append(r"    \item[] \vspace{0.4em}")
            out.append(r"    \textbf{\textit{[Chorus]}} \\")
            chorus_lines = h['chorus']
            for c_line in chorus_lines[:-1]:
                out.append(f"    \\textit{{{c_line}}} \\\\")
            out.append(f"    \\textit{{{chorus_lines[-1]}}}")
            out.append(r"    \vspace{0.4em}")
            out.append("")
            
    # Place end_chorus after all verses
    if has_end_chorus:
        out.append(r"    \item[] \vspace{0.4em}")
        out.append(r"    \textbf{\textit{[Chorus]}} \\")
        end_chorus_lines = h['end_chorus']
        for c_line in end_chorus_lines[:-1]:
            out.append(f"    \\textit{{{c_line}}} \\\\")
        out.append(f"    \\textit{{{end_chorus_lines[-1]}}}")
        out.append(r"    \vspace{0.4em}")
        out.append("")
        
    out.append(r"\end{enumerate}")
    if h.get('footnote'):
        out.append(r"\vspace{1em}")
        out.append(f"\\noindent {h['footnote']}")
    out.append("")
    return "\n".join(out)

def format_hymn_txt(h):
    num_str = str(h['num'])
    marks = ''
    if h.get('star'):
        marks += '*'
    if h.get('dagger'):
        marks += '†'
    
    meter_tune = h['meter']
    if h.get('tune'):
        tune_clean = h['tune'].replace(r'\"{U}', 'Ü').replace(r'\^{A}', 'Â').replace(r'{\AE}', 'Æ').replace(r'\AE', 'Æ')
        meter_tune += f" {tune_clean}"
        
    out = []
    out.append("--------------------------------------------------")
    out.append(f"HYMN {num_str}{marks} - {meter_tune}")
    if h.get('notes'):
        out.append(f"[{h['notes']}]")
    out.append("--------------------------------------------------")
    
    v_daggers = h.get('verse_daggers', {})
    has_chorus = bool(h.get('chorus'))
    has_end_chorus = bool(h.get('end_chorus'))
    
    for v_idx, v_lines in enumerate(h['verses'], 1):
        v_mark = '†' if v_daggers.get(v_idx) else ''
        out.append(f"{v_idx}.{v_mark}")
        for line in v_lines:
            clean_l = (line.replace(r"\`e", "è")
                           .replace(r"\`o", "ò")
                           .replace(r"---", "—")
                           .replace(r"``", '"')
                           .replace(r"''", '"')
                           .replace(r"{\AE}", "Æ")
                           .replace(r"\AE", "Æ")
                           .replace(r"\^{A}", "Â"))
            out.append(f"   {clean_l}")
        out.append("")
        
        # Place standard chorus after verse 1
        if has_chorus and v_idx == 1:
            out.append("[Chorus]")
            for c_line in h['chorus']:
                clean_c = (c_line.replace(r"\`e", "è")
                                 .replace(r"\`o", "ò")
                                 .replace(r"---", "—")
                                 .replace(r"``", '"')
                                 .replace(r"''", '"')
                                 .replace(r"{\AE}", "Æ")
                                 .replace(r"\AE", "Æ")
                                 .replace(r"\^{A}", "Â"))
                out.append(f"   {clean_c}")
            out.append("")
            
    # Place end_chorus after all verses
    if has_end_chorus:
        out.append("[Chorus]")
        for c_line in h['end_chorus']:
            clean_c = (c_line.replace(r"\`e", "è")
                             .replace(r"\`o", "ò")
                             .replace(r"---", "—")
                             .replace(r"``", '"')
                             .replace(r"''", '"')
                             .replace(r"{\AE}", "Æ")
                             .replace(r"\AE", "Æ")
                             .replace(r"\^{A}", "Â"))
            out.append(f"   {clean_c}")
        out.append("")
        
    if h.get('footnote'):
        clean_fn = h['footnote'].replace(r'\textit{', '').replace('}', '').replace('---', '—')
        out.append(f"[{clean_fn}]")
        out.append("")
        
    return "\n".join(out)

def build_section_14_tex_block():
    out = []
    out.append(r"\newpage")
    out.append(r"\thispagestyle{empty}")
    out.append(r"\vspace*{3.5cm}")
    out.append(r"\begin{center}")
    out.append(r"    {\LARGE \textbf{SECTION 14}}\\[0.8em]")
    out.append(r"    {\Large \textsc{The Christian's Life and Service}}")
    out.append(r"\end{center}")
    out.append(r"\vspace{3.5cm}")
    out.append("")
    
    for h in SECTION_14_HYMNS:
        out.append(format_hymn_latex(h))
        
    return "\n".join(out)

def build_section_14_txt_block():
    out = []
    out.append("========================================================================")
    out.append("SECTION 14: THE CHRISTIAN'S LIFE AND SERVICE")
    out.append("========================================================================")
    out.append("")
    
    for h in SECTION_14_HYMNS:
        out.append(format_hymn_txt(h))
        
    return "\n".join(out)

def main():
    tex_block = build_section_14_tex_block()
    txt_block = build_section_14_txt_block()
    
    with open(r"E:\Hymn treatment\section_14_corrected.tex", "w", encoding="utf-8") as f:
        f.write(tex_block)
    print("Wrote section_14_corrected.tex")
    
    with open(r"E:\Hymn treatment\section_14_corrected.txt", "w", encoding="utf-8") as f:
        f.write(txt_block)
    print("Wrote section_14_corrected.txt")
    
    # Update master TeX file
    with open(CORRECTED_TEX, "r", encoding="utf-8") as f:
        tex_full = f.read()
        
    tex_s14_start = tex_full.find(r"{\LARGE \textbf{SECTION 14}}")
    if tex_s14_start == -1:
        raise ValueError("Could not find SECTION 14 in LaTeX master")
    tex_replace_start = tex_full.rfind(r"\newpage", 0, tex_s14_start)
    
    tex_s15_start = tex_full.find(r"{\LARGE \textbf{SECTION 15}}")
    if tex_s15_start == -1:
        raise ValueError("Could not find SECTION 15 in LaTeX master")
    tex_replace_end = tex_full.rfind(r"\newpage", 0, tex_s15_start)
    
    new_tex = tex_full[:tex_replace_start] + tex_block + "\n" + tex_full[tex_replace_end:]
    with open(CORRECTED_TEX, "w", encoding="utf-8") as f:
        f.write(new_tex)
    print("Updated psalms_hymns_and_spiritual_songs_corrected.tex")
    
    # Update master TXT file
    with open(CORRECTED_TXT, "r", encoding="utf-8") as f:
        txt_full = f.read()
        
    txt_s14_start = txt_full.find("SECTION 14: THE CHRISTIAN'S LIFE AND SERVICE")
    if txt_s14_start == -1:
        raise ValueError("Could not find SECTION 14 in TXT master")
    txt_replace_start = txt_full.rfind("========================================================================", 0, txt_s14_start)
    
    txt_s15_start = txt_full.find("SECTION 15: FOR YOUNG DISCIPLES")
    if txt_s15_start == -1:
        raise ValueError("Could not find SECTION 15 in TXT master")
    txt_replace_end = txt_full.rfind("========================================================================", 0, txt_s15_start)
    
    new_txt = txt_full[:txt_replace_start] + txt_block + "\n\n" + txt_full[txt_replace_end:]
    with open(CORRECTED_TXT, "w", encoding="utf-8") as f:
        f.write(new_txt)
    print("Updated arranged_clean_hymn_book_lyrics_corrected.txt")
    print("Section 14 successfully built and integrated!")

if __name__ == "__main__":
    main()
