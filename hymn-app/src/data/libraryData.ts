import type { Book, BibleStudySeries, MagazineIssue, DailyDevotion } from '../types/library';

export const freeBooks: Book[] = [
  {
    id: 'book-fellowship',
    title: 'The Fellowship of Scriptural Assemblies',
    author: 'J. Miller & G. Prasher',
    category: 'Church Order',
    description: 'A biblical examination of the collective fellowship of autonomous assemblies linked together under the Headship of Christ, following the Apostolic pattern.',
    year: 1968,
    pages: 142,
    fileSize: '1.2 MB',
    isFree: true,
    coverColor: '#1e3a8a',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Divine Calling of the Remnant',
        content: `The divine calling to fellowship is grounded not in human tradition or denominational convenience, but in the living Word of the Living God.

When we survey the apostolic scriptures, particularly the Acts of the Apostles and the Pauline Epistles, we observe an unmistakable unity of collective testimony. The gathered assemblies in Judaea, in Galatia, in Macedonia, and in Achaia were not isolated independent units acting as laws unto themselves, nor were they sub-branches of an earthly hierarchy. They were united in the "Apostles' doctrine and fellowship, and in breaking of bread, and in prayers" (Acts 2:42).

To understand fellowship is to perceive that our communion begins vertically with the Father and His Son Jesus Christ (1 John 1:3), and overflows horizontally into concrete, disciplined corporate obedience among gathered disciples.`
      },
      {
        id: 'c2',
        title: 'Chapter 2: The Autonomy and Unity of the Assemblies',
        content: `Scripture presents a sublime harmony between local assembly responsibility and collective unity across the wider Community.

Each local scriptural assembly possessed its own overseers (elders) raised up by the Holy Spirit (Acts 20:28; Titus 1:5). Yet, when fundamental questions of doctrine and practice arose—as recorded in Acts 15 at Jerusalem—the Apostles and elders gathered to seek the mind of the Lord through the Holy Scriptures. The resulting decree was delivered to all the churches for to keep (Acts 16:4).

Thus, true biblical fellowship preserves both individual oversight in local matters and collective faithfulness in divine doctrine.`
      },
      {
        id: 'c3',
        title: 'Chapter 3: The Preserving of the Testimony',
        content: `Holding fast the faithful word is the paramount solemn charge laid upon every succeeding generation of disciples.

Paul exhorted Timothy: "Hold fast the form of sound words, which thou hast heard of me, in faith and love which is in Christ Jesus" (2 Timothy 1:13). In an age marked by moral relativism and theological compromise, the preservation of sound doctrine requires steadfast conviction, spiritual vigilance, and deep fraternal love.`
      }
    ]
  },
  {
    id: 'book-pattern',
    title: 'The Pattern of Sound Words',
    author: 'Dr. J. Luxmoore',
    category: 'Doctrine',
    description: 'A study of the fundamental doctrines delivered once for all to the saints, emphasizing the verbal inspiration of Scripture and the deity of our Lord.',
    year: 1974,
    pages: 198,
    fileSize: '1.6 MB',
    isFree: true,
    coverColor: '#065f46',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Integrity of Divine Revelation',
        content: `"All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness" (2 Tim. 3:16).

The word rendered 'inspired of God' is Theopneustos—God-breathed. It signifies that the sacred scriptures do not merely contain the Word of God as gold in sand, but are in their entirety the very utterance of the Almighty. The Holy Spirit moved holy men of God so that their distinct vocabularies and personal characteristics were preserved, while producing an infallible transcript of Divine truth.`
      },
      {
        id: 'c2',
        title: 'Chapter 2: The Eternal Sonship of the Lord Jesus',
        content: `From everlasting to everlasting, Christ is the Son in the bosom of the Father. He did not become the Son at His incarnation, nor at His baptism, nor upon His glorious resurrection.

"In the beginning was the Word, and the Word was with God, and the Word was God" (John 1:1). His Sonship is the foundation of His eternal relationship in the Blessed Trinity. To dilute His essential eternal Deity or Sonship is to strike at the heart of our salvation.`
      }
    ]
  },
  {
    id: 'book-house',
    title: 'The House of God & The Holy Priesthood',
    author: 'A. T. Doodson',
    category: 'Ministry',
    description: 'An illuminating exposition of 1 Peter 2 and 1 Timothy 3, unfolding the spiritual architecture of the House of God and the offering of spiritual sacrifices.',
    year: 1959,
    pages: 110,
    fileSize: '950 KB',
    isFree: true,
    coverColor: '#7c2d12',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Ye Also as Lively Stones',
        content: `Believers in the Lord Jesus Christ are not detached fragments scattered in the desert; they are "lively stones" built up a spiritual house, an holy priesthood, to offer up spiritual sacrifices acceptable to God by Jesus Christ.

The metaphor of living stones reminds us that each redeemed soul is shaped by the master Craftsman to fit into a collective sanctuary. When gathered in the Name of the Lord Jesus according to divine order, the Lord walks in the midst of the golden lampstands.`
      },
      {
        id: 'c2',
        title: 'Chapter 2: The Spiritual Sacrifices of Praise',
        content: `Under the Old Covenant, the sons of Aaron brought physical bulls and lambs to the altar of burnt offering. Under the New Covenant, the holy priesthood of all believers enters into the Holiest of all through the blood of Jesus.

"By him therefore let us offer the sacrifice of praise to God continually, that is, the fruit of our lips giving thanks to his name" (Hebrews 13:15). In the Remembrance service, the heart is lifted up in unfeigned adoration as we worship the Father in spirit and in truth.`
      }
    ]
  },
  {
    id: 'book-breaking-bread',
    title: 'The Breaking of the Bread',
    author: 'G. Prasher',
    category: 'Church Order',
    description: 'A devotional guide on the significance, order, and reverence of the Lord’s Supper on the first day of the week.',
    year: 1982,
    pages: 88,
    fileSize: '780 KB',
    isFree: true,
    coverColor: '#4c1d95',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: This Do in Remembrance of Me',
        content: `The Lord Jesus, the same night in which He was betrayed, took bread. How deeply solemn are those words! Facing the agony of Gethsemane and the unspeakable suffering of Golgotha, His thoughts were for His disciples and for the remembrance of His self-giving love.

The loaf represents His sacred body given for us; the cup represents the New Covenant ratified in His precious blood. When we assemble on the first day of the week, the central object is not preaching or human performance, but Christ Himself exalted in the midst of His worshippers.`
      }
    ]
  }
];

export const bibleStudySeries: BibleStudySeries[] = [
  {
    id: 'series-church-pattern',
    title: 'The New Testament Church Pattern',
    author: 'Biblical Study Fellowship',
    targetAudience: 'Assemblies & Bible Classes',
    description: 'A 4-part systematic study examining the origin, governance, ordinances, and discipline of New Testament assemblies.',
    lessons: [
      {
        id: 'l1',
        lessonNumber: 1,
        title: 'The Origin of the Church: The Body and the Local Assembly',
        scriptureReferences: ['Matthew 16:16-18', 'Ephesians 1:22-23', 'Acts 2:41-47', '1 Cor. 1:2'],
        aim: 'To distinguish clearly between the Church which is Christ’s Body (comprising all believers of this dispensation) and a local scriptural assembly (a gathered company of baptized disciples in a specific locality).',
        content: `The word 'Ecclesia' is used in two primary senses in the New Testament:

1. The Church the Body of Christ: Built by Christ Himself ("Upon this rock I will build my church"). Every believer in the Lord Jesus is baptized into this Body by the Holy Spirit upon regeneration (1 Cor. 12:13). Its completion will be manifested at the Rapture.

2. The Local Scriptural Assembly: A visible, organized, gathered company of disciples who have repented, believed, been immersed in water, and added together to continue steadfastly in apostolic doctrine (Acts 2:41-42).

The confusion between these two distinct biblical usages has led many Christians either into unscriptural institutionalism or into loose individualism.`,
        discussionQuestions: [
          'What are the scriptural qualifications for being added to a local assembly?',
          'How does the local assembly reflect the heavenly realities of the Body of Christ?',
          'Why is baptism by immersion essential before being added to fellowship?'
        ]
      },
      {
        id: 'l2',
        lessonNumber: 2,
        title: 'Assembly Oversight: Elders, Deacons, and Ministry',
        scriptureReferences: ['1 Timothy 3:1-13', 'Titus 1:5-9', 'Acts 20:17-28', '1 Peter 5:1-4'],
        aim: 'To understand the divine structure of plurality of elders and deacon service in the local church.',
        content: `God's pattern for church governance is never a one-man pastorate or democratic majority voting.

1. Plurality of Elders: In every city where an assembly was planted, the apostles ordained elders (plural). These men are shepherds who feed, protect, and guide the flock not by constraint, but willingly; not for filthy lucre, but of a ready mind.

2. Moral and Spiritual Qualifications: The qualifications listed in 1 Timothy 3 and Titus 1 pertain to character, domestic faithfulness, soberness, and hospitality, proving that spiritual leadership flows from a holy life.

3. Deacons (Servants): Appointed to minister in temporal and administrative affairs so the oversight can give themselves to prayer and the ministry of the Word (Acts 6:1-4).`,
        discussionQuestions: [
          'Why did the early churches always have a plurality of elders rather than a single minister?',
          'What is the biblical relationship between elders and the members of the assembly?',
          'How should young men in the church prepare for future spiritual responsibility?'
        ]
      },
      {
        id: 'l3',
        lessonNumber: 3,
        title: 'The Ordinances: Baptism and the Breaking of the Bread',
        scriptureReferences: ['Romans 6:3-4', '1 Corinthians 11:23-29', 'Acts 20:7'],
        aim: 'To explore the deep significance of the two continuing ordinances committed to the churches.',
        content: `The Lord Jesus instituted two sacred outward ordinances to be observed by His disciples until He comes:

1. Believer’s Baptism: An act of outward identification with Christ in His death, burial, and resurrection. It is reserved exclusively for those who have made a personal confession of faith in Jesus Christ. Immersion in water is the only scriptural mode.

2. The Lord’s Supper: Observed on the first day of the week. It is a thanksgiving commemoration ("Do this in remembrance of Me"), a proclamation of His death ("Ye do show the Lord’s death till He come"), and a testimony of fellowship in the one loaf.`,
        discussionQuestions: [
          'What does immersion symbolize in Romans 6?',
          'What does "discerning the Lord’s body" mean in 1 Corinthians 11?',
          'Why is the Remembrance Feast observed every Lord\'s Day?'
        ]
      }
    ]
  },
  {
    id: 'series-person-of-christ',
    title: 'The Glory of the Person and Offices of Christ',
    author: 'J. Luxmoore',
    targetAudience: 'Bible Students & Teachers',
    description: 'An advanced doctrinal study of Christ as Prophet, Priest, King, and Head of the Church.',
    lessons: [
      {
        id: 'p1',
        lessonNumber: 1,
        title: 'The Great High Priest of Our Confession',
        scriptureReferences: ['Hebrews 4:14-16', 'Hebrews 7:23-28', 'Hebrews 8:1-2'],
        aim: 'To appreciate the unchanging, sympathetic high priesthood of the Ascended Lord.',
        content: `Hebrews presents Christ as superior to all typical shadows of the Levitical order.

He is a Priest forever after the order of Melchizedek:
- Eternal in His person: having neither beginning of days nor end of life.
- Sinless in His character: holy, harmless, undefiled, separate from sinners.
- Effective in His sacrifice: He entered once into the Holy place, having obtained eternal redemption for us.
- Constant in His intercession: Wherefore He is able also to save them to the uttermost that come unto God by Him, seeing He ever liveth to make intercession for them.`,
        discussionQuestions: [
          'How does Christ’s high priestly empathy encourage believers in trials?',
          'What distinguishes the Aaronic order from the Melchizedek order?'
        ]
      }
    ]
  }
];

export const magazineIssues: MagazineIssue[] = [
  {
    id: 'nt-2024-10',
    publicationName: 'Needed Truth',
    volume: '132',
    issue: '10',
    year: 2024,
    month: 'October',
    theme: 'Standing Fast in the Faith',
    fileSize: '1.8 MB',
    articles: [
      {
        id: 'art-1',
        title: 'The Headship of Christ in Current Days',
        author: 'Editorial Committee',
        subtitle: 'Maintaining Divine Order Amidst Modern Secular Pressures',
        scriptureAnchor: 'Colossians 1:18',
        content: `In an era where organizational efficiency often replaces spiritual dependency, we do well to recall that Christ alone is the Head of the body, the church. 

Headship is not an abstract theological honorific; it is living executive lordship. When the local church gathers to worship, to deliberate on assembly discipline, or to send forth workers into the gospel harvest, every decision must submit to the revealed commandments of Scripture. When human committees supplant the authority of the Word, spiritual power departs. Let our cry remain: "To the law and to the testimony: if they speak not according to this word, it is because there is no light in them."`
      },
      {
        id: 'art-2',
        title: 'Holding Fast the Faithful Word',
        author: 'E. J. Davies',
        subtitle: 'Exhortation to Young Disciples',
        scriptureAnchor: 'Titus 1:9',
        content: `The pressures upon young believers today in universities and corporate life are intense. Skepticism questions the inspiration of Scripture, and moral permissiveness mocks biblical purity. Yet remember: "The foundation of God standeth sure, having this seal, The Lord knoweth them that are his." Anchor your soul in the daily study of the sacred text.`
      }
    ]
  },
  {
    id: 'nt-2024-05',
    publicationName: 'Needed Truth',
    volume: '132',
    issue: '5',
    year: 2024,
    month: 'May',
    theme: 'Worship in Spirit and Truth',
    fileSize: '1.6 MB',
    articles: [
      {
        id: 'art-3',
        title: 'The Sanctuary of Praise',
        author: 'A. H. Bowman',
        subtitle: 'The Lord’s Day Morning Remembrance Service',
        scriptureAnchor: 'Hebrews 10:19-22',
        content: `What a privilege is ours! As morning dawns upon the Lord’s day, disciples across the earth converge to sit around the simple emblems of bread and wine. No liturgy is needed, no clerical robes, no theatrical entertainment. The Holy Spirit moves hearts to rise in prayer, praise, and thanksgiving as we contemplate the love of Calvary.`
      }
    ]
  },
  {
    id: 'ss-2024-04',
    publicationName: 'Search and See',
    volume: '76',
    issue: '4',
    year: 2024,
    month: 'Autumn',
    theme: 'Heroes of Faith for Young People',
    fileSize: '1.4 MB',
    articles: [
      {
        id: 'art-4',
        title: 'Daniel’s Purpose of Heart',
        author: 'Youth Ministry Team',
        subtitle: 'Saying No in Babylon',
        scriptureAnchor: 'Daniel 1:8',
        content: `Daniel was a teenager when taken captive to the imperial court of Babylon. Everything around him urged him to conform—the language, the culture, the royal food. Yet Daniel purposed in his heart that he would not defile himself. True strength is not loud aggression; it is calm, unwavering loyalty to God.`
      }
    ]
  }
];

export const dailyDevotions: DailyDevotion[] = [
  {
    id: 'dev-1',
    date: '2026-10-15',
    title: 'The Unchanging Anchor',
    scriptureReading: 'Hebrews 6:13-20',
    keyVerse: 'Which hope we have as an anchor of the soul, both sure and stedfast, and which entereth into that within the veil.',
    keyVerseCitation: 'Hebrews 6:19',
    exposition: `In maritime navigation, an anchor is cast downward into the shifting sand or rock beneath the sea. But in the spiritual realm, the Christian's anchor is cast upward! It has entered into the heavenly sanctuary, fastened within the veil where Jesus our Forerunner has for us entered.

No storm on earth can dislodge an anchor fastened in the eternal presence of God. When waves of trial, sickness, or uncertainty buffet your soul today, remember where your hope is moored. You are as safe as the Throne to which your Anchor is secured.`,
    reflectionQuestion: 'What storm in your life right now needs the reassurance of Christ’s steadfast anchor?',
    prayer: 'Loving Heavenly Father, I thank Thee that my salvation and security rest not upon my fluctuating feelings, but upon the finished work of Christ my Anchor within the veil. Grant me peace and courage to walk faithfully today. Amen.',
    relatedHymnNumber: 42,
    author: 'Morning Manna'
  },
  {
    id: 'dev-2',
    date: '2026-10-16',
    title: 'The Greatness of His Mercy',
    scriptureReading: 'Psalm 103:8-18',
    keyVerse: 'For as the heaven is high above the earth, so great is his mercy toward them that fear him.',
    keyVerseCitation: 'Psalm 103:11',
    exposition: `Astronomers continually discover that the heavens extend farther than our greatest telescopes can measure. The psalmist selects this vast, fathomless expanse as the only fitting measurement of God’s mercy toward His children.

"As far as the east is from the west, so far hath he removed our transgressions from us." East and west never meet! Our sins have not simply been covered; through the blood of the Lamb, they have been removed forever. Let gratitude overflow in your heart this morning.`,
    reflectionQuestion: 'How does meditating upon the infinite distance between east and west liberate your conscience from guilt?',
    prayer: 'O God of all grace, my heart overflows with thanksgiving for Thy boundless mercy. Help me to show the same mercy and forbearance to others today that Thou hast so lavishly bestowed upon me. In Jesus’ Name, Amen.',
    relatedHymnNumber: 3,
    author: 'Morning Manna'
  },
  {
    id: 'dev-3',
    date: '2026-10-17',
    title: 'The Fellowship of His Sufferings',
    scriptureReading: 'Philippians 3:7-14',
    keyVerse: 'That I may know him, and the power of his resurrection, and the fellowship of his sufferings, being made conformable unto his death.',
    keyVerseCitation: 'Philippians 3:10',
    exposition: `The apostle Paul counted all his earthly pedigree, academic achievements, and religious status as loss compared to the excellency of knowing Christ. Notice the divine sequence: first the power of His resurrection, then the fellowship of His sufferings.

It requires the power of the risen Life within us to endure suffering for His Name with joyful patience. Suffering for Christ is not a mark of divine rejection, but an intimate fellowship with our Lord.`,
    reflectionQuestion: 'Are you seeking to know Christ more intimately in the mundane trials of your day?',
    prayer: 'Lord Jesus, draw my heart closer to Thyself today. Teach me to value Thy presence above all earthly gain, and give me grace to reflect Thy meekness in every trial. Amen.',
    relatedHymnNumber: 88,
    author: 'Morning Manna'
  },
  {
    id: 'dev-4',
    date: '2026-10-18',
    title: 'Gathered in His Name',
    scriptureReading: 'Matthew 18:15-20; 1 Cor. 11:23-26',
    keyVerse: 'For where two or three are gathered together in my name, there am I in the midst of them.',
    keyVerseCitation: 'Matthew 18:20',
    exposition: `On this Lord’s Day morning, believers gather around the Lord’s Table. The promise of His presence is not contingent on magnificent cathedrals or large numbers; "where two or three are gathered together in My Name, there am I in the midst."

To gather in His Name means to gather under His supreme authority, according to His revealed principles. Let us draw near with true hearts in full assurance of faith to worship Him who loved us and washed us from our sins in His own blood.`,
    reflectionQuestion: 'How can you prepare your heart to offer acceptable spiritual praise at the Remembrance service today?',
    prayer: 'Heavenly Father, as we gather around Thy beloved Son today to remember His death and celebrate His resurrection, fill our hearts with reverent adoration. May our sacrifice of praise be pleasing in Thy sight. Amen.',
    relatedHymnNumber: 126,
    author: 'Morning Manna'
  }
];

export const bookstoreBooks: Book[] = [
  {
    id: 'book-commentary-pauline',
    title: 'The Pauline Epistles: An In-Depth Exposition',
    author: 'Dr. J. Luxmoore',
    category: 'Commentary',
    description: 'A masterwork covering Romans through Philemon with comprehensive Greek exegesis, doctrinal outlines, and assembly applications.',
    year: 1989,
    pages: 480,
    fileSize: '3.8 MB',
    isFree: false,
    price: '$12.00',
    coverColor: '#831843',
    chapters: [
      {
        id: 'sample-1',
        title: 'Preview: Romans Chapter 8 — Life in the Spirit',
        content: `There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.

In this sublime chapter, the Apostle leads the believer from the struggle of Romans 7 to the heights of triumph. The chapter opens with 'no condemnation', continues through 'no defeat' in the daily warfare, and closes with 'no separation' from the love of God which is in Christ Jesus our Lord.

[To read all 24 chapters covering Galatians, Ephesians, Philippians, and Colossians, unlock this volume using your Church Literature Voucher or direct unlock code.]`
      }
    ]
  },
  {
    id: 'book-daniel-revelation',
    title: 'Prophetic Foundations: Daniel & Revelation',
    author: 'G. Prasher & F. W. Grant',
    category: 'Doctrine',
    description: 'A verse-by-verse dispensational harmony of Old Testament prophecy with the Apocalypse of John, outlining the Times of the Gentiles and the Millennial Kingdom.',
    year: 1992,
    pages: 360,
    fileSize: '2.9 MB',
    isFree: false,
    price: '$9.50',
    coverColor: '#0f766e',
    chapters: [
      {
        id: 'sample-2',
        title: 'Preview: The Seventy Weeks of Daniel',
        content: `Daniel 9:24-27 forms the chronological backbone of biblical eschatology. 

Seventy weeks (four hundred and ninety prophetic years of 360 days each) are determined upon Daniel's people and the holy city Jerusalem. From the decree of Artaxerxes to restore and build Jerusalem unto Messiah the Prince was exactly 69 weeks (483 years). The prophetic clock paused at the Cross, opening the present mystery dispensation of the Church. The 70th week awaits future fulfillment.

[Unlock the full book to access comprehensive charts, verse-by-verse exposition of the Apocalypse, and prophetic timelines.]`
      }
    ]
  },
  {
    id: 'book-century-testimony',
    title: 'The Testimony of Jesus: A Century of Faith',
    author: 'Historical Research Group',
    category: 'History',
    description: 'An inspiring historical chronicle of the recovery of New Testament church truth from 1892 to the present, detailing the global spread of assemblies.',
    year: 2002,
    pages: 310,
    fileSize: '2.4 MB',
    isFree: false,
    price: '$14.00',
    coverColor: '#1e1b4b',
    chapters: [
      {
        id: 'sample-3',
        title: 'Preview: The Early Years of Recovery (1892-1914)',
        content: `In the closing decade of the 19th century, a growing number of earnest Christians were exercised concerning the widespread departure from the simplicity of New Testament church order.

Led by men like Dr. J. Luxmoore and brethren in Scotland and Northern England, they searched the Scriptures to see whether the church pattern given by inspiration remained binding upon disciples in every age. Their rediscovery of collective assembly responsibility ignited a quiet, faithful movement that soon spread across continents.

[Unlock the full edition to read historical photos, assembly registers, and eyewitness accounts.]`
      }
    ]
  }
];
