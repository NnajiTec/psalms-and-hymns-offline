# build_section_9_data_draft.py
import sys
import re
from test_part2_parser import get_docx_paragraphs

if sys.stdout.encoding != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

paras = get_docx_paragraphs(r"E:\Xfolders\hymns\psalms-hymns-and-spiritual-songs-part-2.docx")

# Let's find paras for Section 9 (Hymns 153 to 202)
# Look for where 153 starts
start_idx = None
end_idx = None
for i, p in enumerate(paras):
    if "153" in p and "MARCHING TO ZION" in p:
        start_idx = i
        break
    elif p.startswith("153"):
        start_idx = i
        break

for i, p in enumerate(paras):
    if "203" in p and ("ATHERTON" in p or "Our Lord Jesus Christ" in p or p.startswith("203")):
        end_idx = i
        break

print(f"Section 9 paras: start_idx={start_idx}, end_idx={end_idx}")

# Let's write out all paragraphs between start_idx and end_idx to a text file for review
s9_paras = paras[start_idx:end_idx]
with open("s9_docx_paras.txt", "w", encoding="utf-8") as f:
    for idx, p in enumerate(s9_paras):
        f.write(f"[{idx}] {p}\n")

print(f"Wrote {len(s9_paras)} paragraphs to s9_docx_paras.txt")
