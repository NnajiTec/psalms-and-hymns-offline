# build_section_2_corrected.py
# Generates pristine, verified Section 2 files:
# 1. psalms_hymns_and_spiritual_songs_corrected.tex (updated)
# 2. arranged_clean_hymn_book_lyrics_corrected.txt (updated)
# 3. section_2_corrected.tex
# 4. section_2_corrected.txt

import os
import re
from section_2_data import SECTION_2_HYMNS

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

def build_section_2_tex_block():
    out = []
    out.append(r"\newpage")
    out.append(r"\thispagestyle{empty}")
    out.append(r"\vspace*{3.5cm}")
    out.append(r"\begin{center}")
    out.append(r"    {\LARGE \textbf{SECTION 2}}\\[0.8em]")
    out.append(r"    {\Large \textsc{The Lord's Resurrection and Triumph}}")
    out.append(r"\end{center}")
    out.append(r"\vspace{3.5cm}")
    out.append("")
    
    for h in SECTION_2_HYMNS:
        out.append(format_hymn_latex(h))
        
    return "\n".join(out)

def build_section_2_txt_block():
    out = []
    out.append("========================================================================")
    out.append("SECTION 2: THE LORD'S RESURRECTION AND TRIUMPH")
    out.append("========================================================================")
    out.append("")
    
    for h in SECTION_2_HYMNS:
        out.append(format_hymn_txt(h))
        
    return "\n".join(out)

def main():
    print("[*] Generating verified Section 2 files...")
    sec2_tex = build_section_2_tex_block()
    sec2_txt = build_section_2_txt_block()
    
    # Standalone files
    with open(r"E:\Hymn treatment\section_2_corrected.tex", "w", encoding="utf-8") as f:
        f.write(sec2_tex)
    with open(r"E:\Hymn treatment\section_2_corrected.txt", "w", encoding="utf-8") as f:
        f.write(sec2_txt)
    print(" -> Created section_2_corrected.tex & section_2_corrected.txt")
    
    # Replace in corrected .tex
    if os.path.exists(CORRECTED_TEX):
        with open(CORRECTED_TEX, "r", encoding="utf-8") as f:
            full_tex = f.read()
            
        # Pattern matching from SECTION 2 header page to right before SECTION 3 header page
        pattern = r"(\\newpage\s*\\thispagestyle\{empty\}\s*\\vspace\*\{3\.5cm\}\s*\\begin\{center\}\s*\{\\LARGE\s+\\textbf\{SECTION 2\}\}.*?)(?=\\newpage\s*\\thispagestyle\{empty\}\s*\\vspace\*\{3\.5cm\}\s*\\begin\{center\}\s*\{\\LARGE\s+\\textbf\{SECTION 3\}\})"
        m = re.search(pattern, full_tex, re.DOTALL)
        if m:
            new_full_tex = full_tex[:m.start(1)] + sec2_tex + full_tex[m.end(1):]
            with open(CORRECTED_TEX, "w", encoding="utf-8") as f:
                f.write(new_full_tex)
            print(f" -> Updated {CORRECTED_TEX} with Section 2 fully rectified!")
        else:
            print(" [!] Could not locate exact Section 2 regex in corrected .tex")

    # Replace in corrected .txt
    if os.path.exists(CORRECTED_TXT):
        with open(CORRECTED_TXT, "r", encoding="utf-8") as f:
            full_txt = f.read()
            
        pattern_txt = r"(={50,}\s*\nSECTION 2:.*?\n={50,}\s*\n.*?)(?=\n={50,}\s*\nSECTION 3:)"
        m_txt = re.search(pattern_txt, full_txt, re.DOTALL)
        if m_txt:
            new_full_txt = full_txt[:m_txt.start(1)] + sec2_txt + "\n" + full_txt[m_txt.end(1):]
            with open(CORRECTED_TXT, "w", encoding="utf-8") as f:
                f.write(new_full_txt)
            print(f" -> Updated {CORRECTED_TXT} with Section 2 fully rectified!")
        else:
            print(" [!] Could not locate exact Section 2 regex in corrected .txt")

if __name__ == "__main__":
    main()
