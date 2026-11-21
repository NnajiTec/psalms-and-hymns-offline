# -*- coding: utf-8 -*-
import json
import re

json_path = r"E:\Hymn treatment\hymns.json"
with open(json_path, "r", encoding="utf-8") as f:
    hymns = json.load(f)

print(f"Total hymns loaded: {len(hymns)}")

errors = []

# 1. Contiguous IDs 1 to 500
ids = [h["id"] for h in hymns]
if ids != list(range(1, 501)):
    errors.append(f"Hymn IDs are not strictly 1 to 500! Missing: {set(range(1, 501)) - set(ids)}")

# 2. Check each hymn fields
for h in hymns:
    num = h["id"]
    if not h.get("title"):
        errors.append(f"Hymn {num} has empty title")
    if not h.get("meter"):
        errors.append(f"Hymn {num} has empty meter")
    if not (1 <= h.get("sectionId", 0) <= 20):
        errors.append(f"Hymn {num} has invalid sectionId {h.get('sectionId')}")
    if not h.get("sectionTitle"):
        errors.append(f"Hymn {num} has empty sectionTitle")
    
    verses = h.get("verses", [])
    if not verses:
        errors.append(f"Hymn {num} has NO verses!")
    
    for v_idx, v in enumerate(verses):
        v_num = v.get("number")
        v_lines = v.get("lines", [])
        if not v_lines:
            errors.append(f"Hymn {num} verse {v_num} has no lines")
        for l_idx, l in enumerate(v_lines):
            if not l.strip():
                errors.append(f"Hymn {num} verse {v_num} line {l_idx+1} is empty")
            if "\\" in l:
                errors.append(f"Hymn {num} verse {v_num} has backslash: {l}")
            if "\ufffd" in l:
                errors.append(f"Hymn {num} verse {v_num} has replacement character: {l}")
                
    chorus = h.get("chorus")
    if chorus:
        if not isinstance(chorus, list) or len(chorus) == 0:
            errors.append(f"Hymn {num} chorus is invalid")
        for l in chorus:
            if not l.strip():
                errors.append(f"Hymn {num} chorus has empty line")
            if "\\" in l:
                errors.append(f"Hymn {num} chorus has backslash: {l}")
            if "\ufffd" in l:
                errors.append(f"Hymn {num} chorus has replacement character: {l}")

print(f"\nVerification Results:")
if not errors:
    print("[SUCCESS] ALL 500 HYMNS VERIFIED WITH 0 ERRORS!")
else:
    print(f"[FAIL] Found {len(errors)} errors:")
    for e in errors[:30]:
        print("  -", e)

# Summary statistics
total_verses = sum(len(h["verses"]) for h in hymns)
total_choruses = sum(1 for h in hymns if h.get("chorus"))
print(f"\nSummary:")
print(f"Total Hymns: {len(hymns)}")
print(f"Total Verses: {total_verses}")
print(f"Total Choruses: {total_choruses}")
print(f"Batch 5 (401-500) Verses: {sum(len(h['verses']) for h in hymns if 401 <= h['id'] <= 500)}")
print(f"Batch 5 (401-500) Choruses: {sum(1 for h in hymns if 401 <= h['id'] <= 500 and h.get('chorus'))}")
