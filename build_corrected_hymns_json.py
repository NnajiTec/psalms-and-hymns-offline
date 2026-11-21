import json
import re
import os

INPUT_TXT = r"E:\Hymn treatment\arranged_clean_hymn_book_lyrics_corrected.txt"
OUTPUT_ROOT_JSON = r"E:\Hymn treatment\hymns.json"
OUTPUT_APP_JSON = r"E:\Hymn treatment\hymn-app\src\data\hymns.json"

SECTIONS = [
    (1, 37, 1, "SECTION 1", "The Incarnation and Sufferings of the Son of God"),
    (38, 66, 2, "SECTION 2", "The Lord's Resurrection and Triumph"),
    (67, 84, 3, "SECTION 3", "The Excellencies of the Lord Jesus Christ"),
    (85, 88, 4, "SECTION 4", "The Fruits of the Accomplished Work"),
    (89, 101, 5, "SECTION 5", "Our Access into the Holies"),
    (102, 123, 6, "SECTION 6", "God's Greatness and Goodness"),
    (124, 145, 7, "SECTION 7", "Doxologies and Chants"),
    (146, 152, 8, "SECTION 8", "Closing Hymns"),
    (153, 202, 9, "SECTION 9", "God and His Grace"),
    (203, 266, 10, "SECTION 10", "Our Lord Jesus Christ"),
    (267, 304, 11, "SECTION 11", "Praise to, and Communion with the Lord Jesus Christ"),
    (305, 311, 12, "SECTION 12", "Christ and His Church"),
    (312, 316, 13, "SECTION 13", "The Holy Spirit"),
    (317, 394, 14, "SECTION 14", "The Christian's Life and Service"),
    (395, 404, 15, "SECTION 15", "For Young Disciples"),
    (405, 414, 16, "SECTION 16", "The Place of the Name"),
    (415, 464, 17, "SECTION 17", "The Lord's Future Purposes"),
    (465, 484, 18, "SECTION 18", "For Prayer and Ministry Meetings"),
    (485, 495, 19, "SECTION 19", "For Various Special Occasions"),
    (496, 500, 20, "SECTION 20", "Closing and Farewell Hymns"),
]

def get_sec(n):
    for s, e, sid, sname, stitle in SECTIONS:
        if s <= n <= e:
            return sid, sname, stitle
    return 1, "SECTION 1", ""

def build():
    with open(INPUT_TXT, "r", encoding="utf-8") as f:
        text = f.read()

    matches = list(re.finditer(r"(?:^|\n)(?:-{30,}|=+\nSECTION[^\n]*\n=+)?\n*(?:HYMN|Hymn)\s+(\d+)([*†]*)\s*(?:[-–.]*\s*([^\n]*))?\n", text))

    hymns_list = []
    
    for i in range(len(matches)):
        start_pos = matches[i].end()
        end_pos = matches[i+1].start() if i+1 < len(matches) else len(text)
        
        h_num = int(matches[i].group(1))
        marks = matches[i].group(2)
        meter_raw = (matches[i].group(3) or "").strip()
        body_raw = text[start_pos:end_pos].strip()
        
        sid, sname, stitle = get_sec(h_num)
        
        lines = body_raw.splitlines()
        scripture = None
        tempo_note = None
        
        verses = []
        chorus = []
        cur_v_num = 1
        cur_lines = []
        in_chorus = False
        
        for raw_line in lines:
            l = raw_line.strip()
            if not l or l.startswith("---") or l.startswith("===") or re.match(r"^(?:SECTION|Section|PART|Part)\s+\d+", l):
                continue
                
            # Scripture reference before first verse (e.g. [From Psalm 113.] or From Psalm 113.)
            if not verses and not cur_lines:
                if (l.startswith("[From ") and l.endswith("]")) or re.match(r"^From\s+(?:Psalm|\d?\s*[A-Z][a-z]+|\d\s*Cor|Rom|Heb|Rev|1\s*Tim)", l):
                    scripture = l.strip("[]")
                    continue
                
            # Tempo / performance note before first verse
            if not verses and not cur_lines and l.startswith("[") and l.endswith("]") and not l.startswith("[Chorus]") and not l.startswith("[Refrain]"):
                tempo_note = l.strip("[]")
                continue
                
            m_num = re.match(r"^(\d+)[*†]*\.?[*†]*$", l)
            if m_num:
                if cur_lines:
                    if in_chorus:
                        chorus.extend(cur_lines)
                    else:
                        verses.append({"number": cur_v_num, "lines": cur_lines})
                cur_v_num = int(m_num.group(1))
                cur_lines = []
                in_chorus = False
            elif l.startswith("[Chorus]") or l.startswith("[Refrain]"):
                if cur_lines:
                    if in_chorus:
                        chorus.extend(cur_lines)
                    else:
                        verses.append({"number": cur_v_num, "lines": cur_lines})
                cur_lines = []
                in_chorus = True
            elif l.startswith("[") and l.endswith("]"):
                # End notes or directives
                pass
            else:
                cur_lines.append(l)
                
        if cur_lines:
            if in_chorus:
                chorus.extend(cur_lines)
            else:
                verses.append({"number": cur_v_num, "lines": cur_lines})
                
        title = ""
        if verses and verses[0]["lines"]:
            title = verses[0]["lines"][0].rstrip(".,;:!?")
        elif lines:
            title = lines[0].rstrip(".,;:!?")
            
        first_line = title
        
        # search tokens
        all_lyric_lines = []
        for v in verses:
            all_lyric_lines.extend(v["lines"])
        if chorus:
            all_lyric_lines.extend(chorus)
        full_lyrics_str = " ".join(all_lyric_lines)
        
        search_tokens = f"{h_num} {title} {meter_raw} {full_lyrics_str}".lower()
        search_tokens = re.sub(r"[^a-z0-9\s]", " ", search_tokens)
        search_tokens = " ".join(search_tokens.split())
        
        h_obj = {
            "id": h_num,
            "number": h_num,
            "title": title,
            "firstLine": first_line,
            "meter": meter_raw,
            "sectionId": sid,
            "sectionName": sname,
            "sectionTitle": stitle,
            "scripture": scripture,
            "verseCount": len(verses),
            "verses": verses,
            "chorus": chorus if chorus else None,
            "searchText": search_tokens
        }
        hymns_list.append(h_obj)

    # Save to root hymns.json
    with open(OUTPUT_ROOT_JSON, "w", encoding="utf-8") as f:
        json.dump(hymns_list, f, ensure_ascii=False, indent=2)
    print(f"[OK] Generated {OUTPUT_ROOT_JSON} with {len(hymns_list)} hymns.")

    # Save to hymn-app src data hymns.json
    with open(OUTPUT_APP_JSON, "w", encoding="utf-8") as f:
        json.dump(hymns_list, f, ensure_ascii=False, indent=2)
    print(f"[OK] Generated {OUTPUT_APP_JSON} with {len(hymns_list)} hymns.")

if __name__ == "__main__":
    build()
