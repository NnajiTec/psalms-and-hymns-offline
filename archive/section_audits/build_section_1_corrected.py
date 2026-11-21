# build_section_1_corrected.py
# Generates pristine, verified Section 1 files:
# 1. psalms_hymns_and_spiritual_songs_corrected.tex
# 2. arranged_clean_hymn_book_lyrics_corrected.txt
# 3. section_1_corrected.tex
# 4. section_1_corrected.txt

import os
import re
from section_1_data import SECTION_1_HYMNS

MASTER_TEX = r"E:\Hymn treatment\psalms_hymns_and_spiritual_songs.tex"
CORRECTED_TEX = r"E:\Hymn treatment\psalms_hymns_and_spiritual_songs_corrected.tex"
MASTER_TXT = r"E:\Hymn treatment\arranged_clean_hymn_book_lyrics.txt"
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
    
    for v_idx, v_lines in enumerate(h['verses']):
        out.append(f"    \\item {v_lines[0]} \\\\")
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
        meter_tune += f" {h['tune']}"
        
    out = []
    out.append("--------------------------------------------------")
    out.append(f"HYMN {num_str}{marks} - {meter_tune}")
    if h.get('notes'):
        out.append(f"[{h['notes']}]")
    out.append("--------------------------------------------------")
    
    for v_idx, v_lines in enumerate(h['verses'], 1):
        out.append(f"{v_idx}.")
        for line in v_lines:
            clean_l = line.replace(r"\`e", "è").replace(r"\`o", "ò").replace(r"---", "—").replace(r"``", '"').replace(r"''", '"')
            out.append(f"   {clean_l}")
        out.append("")
        
    return "\n".join(out)

def build_section_1_tex_block():
    out = []
    out.append(r"\newpage")
    out.append(r"\thispagestyle{empty}")
    out.append(r"\vspace*{3.5cm}")
    out.append(r"\begin{center}")
    out.append(r"    {\LARGE \textbf{SECTION 1}}\\[0.8em]")
    out.append(r"    {\Large \textsc{The Incarnation and Sufferings of the Son of God}}")
    out.append(r"\end{center}")
    out.append(r"\vspace{3.5cm}")
    out.append("")
    
    for h in SECTION_1_HYMNS:
        out.append(format_hymn_latex(h))
        
    return "\n".join(out)

def build_section_1_txt_block():
    out = []
    out.append("========================================================================")
    out.append("SECTION 1: THE INCARNATION AND SUFFERINGS OF THE SON OF GOD")
    out.append("========================================================================")
    out.append("")
    
    for h in SECTION_1_HYMNS:
        out.append(format_hymn_txt(h))
        
    return "\n".join(out)

def main():
    print("[*] Generating verified Section 1 files...")
    sec1_tex = build_section_1_tex_block()
    sec1_txt = build_section_1_txt_block()
    
    # Standalone files
    with open(r"E:\Hymn treatment\section_1_corrected.tex", "w", encoding="utf-8") as f:
        f.write(sec1_tex)
    with open(r"E:\Hymn treatment\section_1_corrected.txt", "w", encoding="utf-8") as f:
        f.write(sec1_txt)
    print(" -> Created section_1_corrected.tex & section_1_corrected.txt")
    
    # Replace in master .tex
    if os.path.exists(MASTER_TEX):
        with open(MASTER_TEX, "r", encoding="utf-8") as f:
            full_tex = f.read()
            
        # Pattern matching from SECTION 1 header page to right before SECTION 2 header page
        pattern = r"(\\newpage\s*\\thispagestyle\{empty\}\s*\\vspace\*\{3\.5cm\}\s*\\begin\{center\}\s*\{\\LARGE\s+\\textbf\{SECTION 1\}\}.*?)(?=\\newpage\s*\\thispagestyle\{empty\}\s*\\vspace\*\{3\.5cm\}\s*\\begin\{center\}\s*\{\\LARGE\s+\\textbf\{SECTION 2\}\})"
        m = re.search(pattern, full_tex, re.DOTALL)
        if m:
            new_full_tex = full_tex[:m.start(1)] + sec1_tex + full_tex[m.end(1):]
            with open(CORRECTED_TEX, "w", encoding="utf-8") as f:
                f.write(new_full_tex)
            print(f" -> Created {CORRECTED_TEX} with Section 1 fully rectified!")
        else:
            print(" [!] Could not locate exact Section 1 regex in master .tex")

    # Replace in master .txt
    if os.path.exists(MASTER_TXT):
        with open(MASTER_TXT, "r", encoding="utf-8") as f:
            full_txt = f.read()
            
        pattern_txt = r"(={50,}\s*\nSECTION 1:.*?\n={50,}\s*\n.*?)(?=\n={50,}\s*\nSECTION 2:)"
        m_txt = re.search(pattern_txt, full_txt, re.DOTALL)
        if m_txt:
            new_full_txt = full_txt[:m_txt.start(1)] + sec1_txt + "\n" + full_txt[m_txt.end(1):]
            with open(CORRECTED_TXT, "w", encoding="utf-8") as f:
                f.write(new_full_txt)
            print(f" -> Created {CORRECTED_TXT} with Section 1 fully rectified!")
        else:
            print(" [!] Could not locate exact Section 1 regex in master .txt")

if __name__ == "__main__":
    main()
