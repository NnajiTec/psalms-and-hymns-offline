# build_section_6_corrected.py
# Generates pristine, verified Section 6 files:
# 1. psalms_hymns_and_spiritual_songs_corrected.tex (updated)
# 2. arranged_clean_hymn_book_lyrics_corrected.txt (updated)
# 3. section_6_corrected.tex
# 4. section_6_corrected.txt

import os
import re
from section_6_data import SECTION_6_HYMNS

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
        
    out.append(r"\end{enumerate}")
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
        tune_clean = h['tune'].replace(r'\"{U}', 'Ü').replace(r'{\AE}', 'Æ').replace(r'\AE', 'Æ')
        meter_tune += f" {tune_clean}"
        
    out = []
    out.append("--------------------------------------------------")
    out.append(f"HYMN {num_str}{marks} - {meter_tune}")
    if h.get('notes'):
        out.append(f"[{h['notes']}]")
    out.append("--------------------------------------------------")
    
    v_daggers = h.get('verse_daggers', {})
    
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
                           .replace(r"\AE", "Æ"))
            out.append(f"   {clean_l}")
        out.append("")
        
    return "\n".join(out)

def build_section_6_tex_block():
    out = []
    out.append(r"\newpage")
    out.append(r"\thispagestyle{empty}")
    out.append(r"\vspace*{3.5cm}")
    out.append(r"\begin{center}")
    out.append(r"    {\LARGE \textbf{SECTION 6}}\\[0.8em]")
    out.append(r"    {\Large \textsc{God's Greatness and Goodness}}")
    out.append(r"\end{center}")
    out.append(r"\vspace{3.5cm}")
    out.append("")
    
    for h in SECTION_6_HYMNS:
        out.append(format_hymn_latex(h))
        
    return "\n".join(out)

def build_section_6_txt_block():
    out = []
    out.append("========================================================================")
    out.append("SECTION 6: GOD'S GREATNESS AND GOODNESS")
    out.append("========================================================================")
    out.append("")
    
    for h in SECTION_6_HYMNS:
        out.append(format_hymn_txt(h))
        
    return "\n".join(out)

def main():
    tex_block = build_section_6_tex_block()
    txt_block = build_section_6_txt_block()
    
    with open(r"E:\Hymn treatment\section_6_corrected.tex", "w", encoding="utf-8") as f:
        f.write(tex_block)
    print("Wrote section_6_corrected.tex")
    
    with open(r"E:\Hymn treatment\section_6_corrected.txt", "w", encoding="utf-8") as f:
        f.write(txt_block)
    print("Wrote section_6_corrected.txt")
    
    # Update master TeX file
    with open(CORRECTED_TEX, "r", encoding="utf-8") as f:
        tex_full = f.read()
        
    tex_s6_start = tex_full.find(r"{\LARGE \textbf{SECTION 6}}")
    if tex_s6_start == -1:
        raise ValueError("Could not find SECTION 6 in LaTeX master")
    # Back up to \newpage
    tex_replace_start = tex_full.rfind(r"\newpage", 0, tex_s6_start)
    
    tex_s7_start = tex_full.find(r"{\LARGE \textbf{SECTION 7}}")
    if tex_s7_start == -1:
        raise ValueError("Could not find SECTION 7 in LaTeX master")
    tex_replace_end = tex_full.rfind(r"\newpage", 0, tex_s7_start)
    
    new_tex = tex_full[:tex_replace_start] + tex_block + "\n" + tex_full[tex_replace_end:]
    with open(CORRECTED_TEX, "w", encoding="utf-8") as f:
        f.write(new_tex)
    print("Updated psalms_hymns_and_spiritual_songs_corrected.tex")
    
    # Update master TXT file
    with open(CORRECTED_TXT, "r", encoding="utf-8") as f:
        txt_full = f.read()
        
    txt_s6_start = txt_full.find("SECTION 6: GOD'S GREATNESS AND GOODNESS")
    if txt_s6_start == -1:
        raise ValueError("Could not find SECTION 6 in TXT master")
    # Back up to =====================
    txt_replace_start = txt_full.rfind("========================================================================", 0, txt_s6_start)
    
    txt_s7_start = txt_full.find("SECTION 7: DOXOLOGIES AND CHANTS")
    if txt_s7_start == -1:
        raise ValueError("Could not find SECTION 7 in TXT master")
    txt_replace_end = txt_full.rfind("========================================================================", 0, txt_s7_start)
    
    new_txt = txt_full[:txt_replace_start] + txt_block + "\n\n" + txt_full[txt_replace_end:]
    with open(CORRECTED_TXT, "w", encoding="utf-8") as f:
        f.write(new_txt)
    print("Updated arranged_clean_hymn_book_lyrics_corrected.txt")
    print("Section 6 successfully built and integrated!")

if __name__ == "__main__":
    main()
