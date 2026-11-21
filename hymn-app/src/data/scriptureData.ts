export interface ScripturePassage {
  id: string;
  reference: string;
  book: string;
  chapter: number;
  verses: { verse: number; text: string }[];
  category: 'Worship' | 'Doctrine' | 'Church Order' | 'Fellowship' | 'Devotional';
  theme: string;
}

export const curatedScriptures: ScripturePassage[] = [
  {
    id: 'acts-2-41-47',
    reference: 'Acts 2:41-47',
    book: 'Acts',
    chapter: 2,
    category: 'Church Order',
    theme: 'The Apostles\' Doctrine and Fellowship',
    verses: [
      { verse: 41, text: 'Then they that gladly received his word were baptized: and the same day there were added unto them about three thousand souls.' },
      { verse: 42, text: 'And they continued stedfastly in the apostles\' doctrine and fellowship, and in breaking of bread, and in prayers.' },
      { verse: 43, text: 'And fear came upon every soul: and many wonders and signs were done by the apostles.' },
      { verse: 44, text: 'And all that believed were together, and had all things common;' },
      { verse: 45, text: 'And sold their possessions and goods, and parted them to all men, as every man had need.' },
      { verse: 46, text: 'And they, continuing daily with one accord in the temple, and breaking bread from house to house, did eat their meat with gladness and singleness of heart,' },
      { verse: 47, text: 'Praising God, and having favour with all the people. And the Lord added to the church daily such as should be saved.' },
    ],
  },
  {
    id: 'col-3-12-17',
    reference: 'Colossians 3:12-17',
    book: 'Colossians',
    chapter: 3,
    category: 'Worship',
    theme: 'Psalms, Hymns and Spiritual Songs',
    verses: [
      { verse: 12, text: 'Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering;' },
      { verse: 13, text: 'Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.' },
      { verse: 14, text: 'And above all these things put on charity, which is the bond of perfectness.' },
      { verse: 15, text: 'And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.' },
      { verse: 16, text: 'Let the word of Christ dwell in you richly in all wisdom; teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord.' },
      { verse: 17, text: 'And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him.' },
    ],
  },
  {
    id: 'eph-5-18-21',
    reference: 'Ephesians 5:18-21',
    book: 'Ephesians',
    chapter: 5,
    category: 'Worship',
    theme: 'Filled with the Spirit in Song',
    verses: [
      { verse: 18, text: 'And be not drunk with wine, wherein is excess; but be filled with the Spirit;' },
      { verse: 19, text: 'Speaking to yourselves in psalms and hymns and spiritual songs, singing and making melody in your heart to the Lord;' },
      { verse: 20, text: 'Giving thanks always for all things unto God and the Father in the name of our Lord Jesus Jesus Christ;' },
      { verse: 21, text: 'Submitting yourselves one to another in the fear of God.' },
    ],
  },
  {
    id: '1cor-11-23-26',
    reference: '1 Corinthians 11:23-26',
    book: '1 Corinthians',
    chapter: 11,
    category: 'Church Order',
    theme: 'The Breaking of the Bread & Remembrance',
    verses: [
      { verse: 23, text: 'For I have received of the Lord that which also I delivered unto you, that the Lord Jesus the same night in which he was betrayed took bread:' },
      { verse: 24, text: 'And when he had given thanks, he brake it, and said, Take, eat: this is my body, which is broken for you: this do in remembrance of me.' },
      { verse: 25, text: 'After the same manner also he took the cup, when he had supped, saying, This cup is the new testament in my blood: this do ye, as oft as ye drink it, in remembrance of me.' },
      { verse: 26, text: 'For as often as ye eat this bread, and drink this cup, ye do shew the Lord\'s death till he come.' },
    ],
  },
  {
    id: 'john-1-1-14',
    reference: 'John 1:1-14',
    book: 'John',
    chapter: 1,
    category: 'Doctrine',
    theme: 'The Eternal Word and Deity of Christ',
    verses: [
      { verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
      { verse: 2, text: 'The same was in the beginning with God.' },
      { verse: 3, text: 'All things were made by him; and without him was not any thing made that was made.' },
      { verse: 4, text: 'In him was life; and the life was the light of men.' },
      { verse: 14, text: 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.' },
    ],
  },
  {
    id: 'phil-2-5-11',
    reference: 'Philippians 2:5-11',
    book: 'Philippians',
    chapter: 2,
    category: 'Doctrine',
    theme: 'The Mind of Christ & His Exaltation',
    verses: [
      { verse: 5, text: 'Let this mind be in you, which was also in Christ Jesus:' },
      { verse: 6, text: 'Who, being in the form of God, thought it not robbery to be equal with God:' },
      { verse: 7, text: 'But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men:' },
      { verse: 8, text: 'And being found in fashion as a man, he humbled himself, and became obedient unto death, even the death of the cross.' },
      { verse: 9, text: 'Wherefore God also hath highly exalted him, and given him a name which is above every name:' },
      { verse: 10, text: 'That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth;' },
      { verse: 11, text: 'And that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father.' },
    ],
  },
  {
    id: 'heb-10-19-25',
    reference: 'Hebrews 10:19-25',
    book: 'Hebrews',
    chapter: 10,
    category: 'Worship',
    theme: 'Boldness to Enter the Holiest',
    verses: [
      { verse: 19, text: 'Having therefore, brethren, boldness to enter into the holiest by the blood of Jesus,' },
      { verse: 20, text: 'By a new and living way, which he hath consecrated for us, through the veil, that is to say, his flesh;' },
      { verse: 21, text: 'And having an high priest over the house of God;' },
      { verse: 22, text: 'Let us draw near with a true heart in full assurance of faith, having our hearts sprinkled from an evil conscience, and our bodies washed with pure water.' },
      { verse: 23, text: 'Let us hold fast the profession of our faith without wavering; (for he is faithful that promised;)' },
      { verse: 24, text: 'And let us consider one another to provoke unto love and to good works:' },
      { verse: 25, text: 'Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching.' },
    ],
  },
  {
    id: '1tim-3-14-16',
    reference: '1 Timothy 3:14-16',
    book: '1 Timothy',
    chapter: 3,
    category: 'Church Order',
    theme: 'The Pillar and Ground of the Truth (Veritas)',
    verses: [
      { verse: 14, text: 'These things write I unto thee, hoping to come unto thee shortly:' },
      { verse: 15, text: 'But if I tarry long, that thou mayest know how thou oughtest to behave thyself in the house of God, which is the church of the living God, the pillar and ground of the truth.' },
      { verse: 16, text: 'And without controversy great is the mystery of godliness: God was manifest in the flesh, justified in the Spirit, seen of angels, preached unto the Gentiles, believed on in the world, received up into glory.' },
    ],
  },
  {
    id: '1pet-2-4-9',
    reference: '1 Peter 2:4-9',
    book: '1 Peter',
    chapter: 2,
    category: 'Doctrine',
    theme: 'Lively Stones & A Holy Priesthood',
    verses: [
      { verse: 4, text: 'To whom coming, as unto a living stone, disallowed indeed of men, but chosen of God, and precious,' },
      { verse: 5, text: 'Ye also, as lively stones, are built up a spiritual house, an holy priesthood, to offer up spiritual sacrifices, acceptable to God by Jesus Christ.' },
      { verse: 9, text: 'But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.' },
    ],
  },
  {
    id: 'rev-5-9-14',
    reference: 'Revelation 5:9-14',
    book: 'Revelation',
    chapter: 5,
    category: 'Worship',
    theme: 'The Song of the Redeemed: Worthy is the Lamb',
    verses: [
      { verse: 9, text: 'And they sung a new song, saying, Thou art worthy to take the book, and to open the seals thereof: for thou wast slain, and hast redeemed us to God by thy blood out of every kindred, and tongue, and people, and nation;' },
      { verse: 10, text: 'And hast made us unto our God kings and priests: and we shall reign on the earth.' },
      { verse: 11, text: 'And I beheld, and I heard the voice of many angels round about the throne and the beasts and the elders: and the number of them was ten thousand times ten thousand, and thousands of thousands;' },
      { verse: 12, text: 'Saying with a loud voice, Worthy is the Lamb that was slain to receive power, and riches, and wisdom, and strength, and honour, and glory, and blessing.' },
      { verse: 13, text: 'And every creature which is in heaven, and on the earth, and under the earth, and such as are in the sea, and all that are in them, heard I saying, Blessing, and honour, and glory, and power, be unto him that sitteth upon the throne, and unto the Lamb for ever and ever.' },
      { verse: 14, text: 'And the four beasts said, Amen. And the four and twenty elders fell down and worshipped him that liveth for ever and ever.' },
    ],
  },
];

export function findScriptureByQuery(query: string): ScripturePassage[] {
  if (!query.trim()) return curatedScriptures;
  const q = query.toLowerCase();
  return curatedScriptures.filter(
    (s) =>
      s.reference.toLowerCase().includes(q) ||
      s.theme.toLowerCase().includes(q) ||
      s.book.toLowerCase().includes(q) ||
      s.verses.some((v) => v.text.toLowerCase().includes(q))
  );
}

export function findScriptureByReference(ref: string): ScripturePassage | undefined {
  const norm = ref.toLowerCase().replace(/\s+/g, '');
  return curatedScriptures.find(
    (s) => s.reference.toLowerCase().replace(/\s+/g, '') === norm || norm.includes(s.book.toLowerCase())
  );
}
