import React, { useMemo } from 'react';

interface ScriptureTextProps {
  text: string;
  onSelectScripture: (reference: string) => void;
  className?: string;
}

// Regex matching common scripture citations e.g. Psalm 33:11, Acts 2:41-47, 1 Cor. 12:13
const SCRIPTURE_PATTERN =
  /\b((?:[1-3]\s+)?(?:Genesis|Gen\.?|Exodus|Exod?\.?|Leviticus|Lev\.?|Numbers|Num\.?|Deuteronomy|Deut\.?|Joshua|Josh\.?|Judges|Judg\.?|Ruth|Samuel|Sam\.?|Kings|Ki\.?|Chronicles|Chron?\.?|Ezra|Nehemiah|Neh\.?|Esther|Est\.?|Job|Psalms?|Ps\.?|Proverbs|Prov?\.?|Ecclesiastes|Eccl\.?|Song of Solomon|Song|Isaiah|Isa\.?|Jeremiah|Jer\.?|Lamentations|Lam\.?|Ezekiel|Ezek\.?|Daniel|Dan\.?|Hosea|Hos\.?|Joel|Amos|Obadiah|Obad\.?|Jonah|Micah|Mic\.?|Nahum|Nah\.?|Habakkuk|Hab\.?|Zephaniah|Zeph\.?|Haggai|Hag\.?|Zechariah|Zech\.?|Malachi|Mal\.?|Matthew|Matt?\.?|Mark|Mk\.?|Luke|Lk\.?|John|Jn\.?|Acts|Romans|Rom\.?|Corinthians|Cor\.?|Galatians|Gal\.?|Ephesians|Eph\.?|Philippians|Phil\.?|Colossians|Col\.?|Thessalonians|Thess?\.?|Timothy|Tim\.?|Titus|Tit\.?|Philemon|Phlm\.?|Hebrews|Heb\.?|James|Jas\.?|Peter|Pet\.?|Jude|Revelation|Rev\.?)\s+\d+(?::\d+(?:[-–]\d+)?)?)\b/gi;

export const ScriptureText: React.FC<ScriptureTextProps> = ({
  text,
  onSelectScripture,
  className = '',
}) => {
  const elements = useMemo(() => {
    if (!text) return null;

    const parts: (string | { ref: string; key: string })[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // Reset regex index
    SCRIPTURE_PATTERN.lastIndex = 0;

    while ((match = SCRIPTURE_PATTERN.exec(text)) !== null) {
      const matchStart = match.index;
      const matchEnd = SCRIPTURE_PATTERN.lastIndex;
      const refText = match[1];

      // Add text before match
      if (matchStart > lastIndex) {
        parts.push(text.substring(lastIndex, matchStart));
      }

      // Add match
      parts.push({ ref: refText, key: `${refText}-${matchStart}` });
      lastIndex = matchEnd;
    }

    // Add trailing text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.map((part, idx) => {
      if (typeof part === 'string') {
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      }

      return (
        <button
          key={part.key}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectScripture(part.ref);
          }}
          className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold underline decoration-emerald-500/40 hover:decoration-emerald-500 hover:text-emerald-500 transition-colors cursor-pointer px-0.5 rounded-sm"
          title={`View scripture: ${part.ref}`}
        >
          {part.ref}
        </button>
      );
    });
  }, [text, onSelectScripture]);

  return <span className={className}>{elements}</span>;
};

export default ScriptureText;
