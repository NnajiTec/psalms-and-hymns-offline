# create_section_10_data.py
# Constructs section_10_data.py with all 64 hymns (203 to 266) verified against PDF scans.

import os

H = []

# 203
H.append({
    'num': 203,
    'meter': 'C. M.',
    'tune': 'ATHERTON',
    'notes': 'Moderately fast',
    'verses': [
        [
            "AND did the Holy and the Just,",
            "The Sovereign of the skies,",
            "Stoop down to man's estate and dust,",
            "That guilty worms might rise?"
        ],
        [
            "Yes, the Redeemer left the throne,",
            "The radiant throne on high,",
            "(Surprising mercy, love unknown)",
            "To suffer, bleed and die."
        ],
        [
            "He took the rebel sinner's place,",
            "And suffered in his stead;",
            "For man, oh, miracle of grace!",
            "For sinful man He bled."
        ],
        [
            "What heavenly truths and wonders dwell",
            "In that atoning blood!",
            "By this are sinners saved from hell,",
            "And reconciled to God."
        ]
    ]
})

# 204
H.append({
    'num': 204,
    'meter': '7.7.',
    'tune': 'WHO IS HE?',
    'notes': 'Slow. Softly',
    'chorus': [
        "'Tis the Lord, oh wondrous story!",
        "'Tis the Lord, the King of glory!",
        "At His feet we humbly fall,",
        "Laud Him, own Him Lord of all."
    ],
    'verses': [
        [
            "WHO is He in yonder stall,",
            "At whose feet the shepherds fall?"
        ],
        [
            "Who is He in deep distress,",
            "Fasting in the wilderness?"
        ],
        [
            "Who is He the people bless",
            "For His words of gentleness?"
        ],
        [
            "Who is He to whom they bring",
            "All the sick and sorrowing?"
        ],
        [
            "Who is He who stands and weeps",
            "At the grave where Lazarus sleeps?"
        ],
        [
            "Who is He the gathering throng",
            "Greet with loud triumphant song?"
        ],
        [
            "Lo at midnight, who is He",
            "Prays in dark Gethsemane?"
        ],
        [
            "Who is He on yonder tree",
            "Dies in grief and agony?"
        ],
        [
            "Who is He who from the grave",
            "Rises glorious, strong to save?"
        ],
        [
            "Who is He who on the throne",
            "Sits till all His sway shall own?"
        ]
    ]
})

# 205
H.append({
    'num': 205,
    'meter': '5.6.6.5.',
    'tune': 'EXULTATE',
    'notes': 'Moderately fast',
    'chorus': [
        "Sound His praises, tell the story",
        "    Of Him who was slain.",
        "Sound His praises, tell with gladness,",
        "    He liveth again!"
    ],
    'end_chorus': [
        "Sound His praises, tell the story",
        "    Of Him who was slain.",
        "Sound His praises, tell with gladness,",
        "    He cometh again!"
    ],
    'verses': [
        [
            "REJOICE and be glad!",
            "The Redeemer hath come!",
            "Go, look on His cradle,",
            "His cross and His tomb."
        ],
        [
            "Rejoice and be glad!",
            "It is sunshine at last!",
            "The clouds have departed,",
            "The shadows are past."
        ],
        [
            "Rejoice and be glad!",
            "For the blood hath been shed;",
            "Redemption is finished,",
            "The price hath been paid."
        ],
        [
            "Rejoice and be glad!",
            "Now the pardon is free!",
            "The Just for the unjust",
            "Hath died on the tree."
        ],
        [
            "Rejoice and be glad!",
            "For the Lamb who was slain",
            "O'er death is triumphant,",
            "And liveth again."
        ],
        [
            "Rejoice and be glad!",
            "For the Lord is on high;",
            "Christ pleadeth for us on",
            "God's throne in the sky."
        ],
        [
            "Rejoice and be glad!",
            "For He cometh again;",
            "He cometh in glory,",
            "The Lamb who was slain."
        ]
    ]
})

# 206
H.append({
    'num': 206,
    'meter': '8.5.8.5. D.',
    'tune': 'SONG OF THE BRIDE',
    'notes': 'Moderate',
    'verses': [
        [
            "GENTLENESS and tender feeling,",
            "    Pity too and grace,",
            "Softly lustred all Thy dealing",
            "    With our stricken race.",
            "Thou with sympathy and healing",
            "    'Mid our woes didst move,",
            "Every gracious deed revealing",
            "    Thou, O Lord, art love."
        ],
        [
            "E'en when in Thy poignant anguish,",
            "    Dying on the tree,",
            "When men left Thee there to languish,",
            "    Full of hate to Thee,",
            "When our sins and judgment bearing,",
            "    Smitten from above,",
            "Every cry was then declaring,",
            "    Thou, O Lord, art love."
        ],
        [
            "Seated in triumphant glory",
            "    On the Father's throne,",
            "Still we read the self-same story",
            "    That on earth was known;",
            "Changeless in Thy holy dwelling",
            "    Thou dost ever prove;",
            "There Thy wound-prints aye are telling",
            "    Thou, O Lord, art love."
        ],
        [
            "Thou, Lord, in Thy heart's affection",
            "    Pleadest for us there;",
            "Knowing well our imperfection,",
            "    Thou our woes canst share;",
            "Thou canst succour in temptation,",
            "    Strengthen from above,",
            "Comfort give and consolation;",
            "    Thou, O Lord, art love."
        ],
        [
            "Payment meet for all we owe Thee,",
            "    We, O Lord, have none;",
            "But we long still more to know Thee",
            "    Who our hearts hast won.",
            "May we here, Thy love compelling,",
            "    Ever grateful prove;",
            "Walk and word and action telling,",
            "    Thou, O Lord, art love."
        ],
        [
            "Soon, enraptured we shall meet Thee;",
            "    Thou for us wilt come;",
            "Face to face with joy we'll greet Thee",
            "    In that heavenly home.",
            "There, where angel-throngs are praising",
            "    We with Thee shall move,",
            "This eternal anthem raising---",
            "    Thou, O Lord, art love."
        ]
    ]
})

# 207
H.append({
    'num': 207,
    'meter': 'C. M.',
    'tune': 'SAWLEY',
    'notes': 'Moderate',
    'verses': [
        [
            "O LORD, when we the path retrace",
            "Which Thou on earth hast trod,",
            "To man Thy wondrous love and grace,",
            "Thy faithfulness to God;"
        ],
        [
            "Thy love to man, so sorely tried,",
            "Proved stronger than the grave;",
            "The very spear that pierced Thy side",
            "Drew forth the blood to save;"
        ],
        [
            "Faithful amidst unfaithfulness,",
            "'Midst darkness only light,",
            "Thou didst Thy Father's name confess,",
            "And in His will delight;"
        ],
        [
            "Unmoved by Satan's subtle wiles,",
            "By suffering, shame and loss;",
            "Thy path, uncheered by earthly smiles,",
            "Led only to the cross;"
        ],
        [
            "O Lord, with sorrow and with shame,",
            "We meekly would confess",
            "How little we, who bear Thy name,",
            "Thy mind, Thy will express."
        ],
        [
            "Give us Thy meek, Thy lowly mind;",
            "We would obedient be,",
            "And all our rest and pleasure find",
            "In fellowship with Thee."
        ]
    ]
})

# 208
H.append({
    'num': 208,
    'meter': 'C. M.',
    'tune': 'SAWLEY',
    'notes': 'Moderate',
    'verses': [
        [
            "WHAT grace, O Lord, and beauty shone",
            "Around Thy steps below!",
            "What patient love was seen in all",
            "Thy life and death of woe!"
        ],
        [
            "For ever on Thy burdened heart",
            "A weight of sorrow hung;",
            "Yet no ungentle, murmuring word",
            "Escaped Thy silent tongue."
        ],
        [
            "Thy foes might hate, despise, revile,",
            "Thy friends unfaithful prove;",
            "Unwearied in forgiveness still,",
            "Thy heart could only love."
        ],
        [
            "Oh, give us hearts to love like Thee,",
            "Like Thee, O Lord, to grieve",
            "Far more for others' sins, than all",
            "The wrongs that we receive."
        ],
        [
            "One with Thyself, may every eye",
            "In us, Thy brethren, see",
            "That gentleness and grace that spring",
            "From union, Lord, with Thee."
        ]
    ]
})

# 209
H.append({
    'num': 209,
    'meter': 'Irregular',
    'tune': 'PEACE! BE STILL!',
    'notes': 'Moderate',
    'chorus': [
        "The winds and the waves shall obey My will,",
        "    Peace, be still!",
        "Whether the wrath of the storm-tossed sea,",
        "Or demons, or men, or whatever it be,",
        "No waters can swallow the ship where lies",
        "The Master of ocean, and earth, and skies;",
        "They all shall sweetly obey My will,",
        "    Peace, be still!"
    ],
    'verses': [
        [
            "MASTER, the tempest is raging,",
            "    The billows are tossing high,",
            "The sky is o'ershadowed with blackness,",
            "    No shelter or help is nigh.",
            "Carest Thou not that we perish?",
            "    How canst Thou lie asleep,",
            "When each moment so madly is threatening",
            "    A grave in the angry deep?"
        ],
        [
            "Master, the terror is over,",
            "    The elements sweetly rest.",
            "In calmness the lake now reposes,",
            "    And peacefulness fills each breast.",
            "Master, almighty Peacegiver,",
            "    Speak to the sin-tossed soul",
            "Who cries to Thee, \"Save, or I perish,\"",
            "    Deliver and take control."
        ]
    ]
})

# 210
H.append({
    'num': 210,
    'meter': '11.10.11.10.',
    'tune': 'STRENGTH AND STAY',
    'notes': 'Moderately fast',
    'verses': [
        [
            "PROPITIOUS seemed the gentle waters laving",
            "    Gennes'ret's shore when first the little band,",
            "All thought for coming storm and danger waiving,",
            "    Set forth to cross it at their Lord's command."
        ],
        [
            "But soon the scene in tempest darkness merges,",
            "    The water rages, torn by shrieking winds;",
            "Faith staggers with the boat, and upmost surges",
            "    O'erwhelming fear within the tremblers' minds."
        ],
        [
            "\"Dost Thou not care, O Master, that we perish,",
            "    Who at Thy word embarked upon this sea?",
            "Canst Thou at such a moment slumber cherish,",
            "    Indifferent, though we die because of Thee?\""
        ],
        [
            "Calm and majestic rises from His pillow",
            "    Sea's mighty Lord, commanding, \"Peace, be still!\"",
            "Sink then to rest, with troubled wind and billow,",
            "    Their tossing minds, soothed by His potent will."
        ],
        [
            "Disciples all! The Lord Himself has set us",
            "    The course by which we voyage to our home;",
            "Here lies our confidence whate'er beset us,",
            "    We sail with One whose power must overcome."
        ],
        [
            "'Tis easy when o'er stilly waters gliding,",
            "    In peaceful faith upon the Lord to rest;",
            "But when our bark on troublous waves is riding,",
            "    Will faith triumphant issue through the test?"
        ],
        [
            "Calm mid surrounding turmoil, mighty Master,",
            "    Teach us to rest secure beneath Thy wing;",
            "Thine arm will guard Thy weak ones from disaster,",
            "    And safely to their longed-for haven bring."
        ]
    ]
})

# 211
H.append({
    'num': 211,
    'meter': 'L. M.',
    'tune': 'GIESSEN',
    'notes': 'Moderately fast',
    'verses': [
        [
            "RIDE on, ride on, in majesty;",
            "Hark! all the tribes \"Hosanna\" cry.",
            "O Saviour meek, pursue Thy road",
            "With palms and scattered garments strewed.",
            "    Ride on, ride on, in majesty,",
            "    In lowly pomp ride on to die."
        ],
        [
            "Ride on, ride on, in majesty;",
            "The angel armies of the sky",
            "Look down with sad and wondering eyes,",
            "To see th'approaching sacrifice."
        ],
        [
            "Ride on, ride on, in majesty;",
            "The last and fiercest strife is nigh;",
            "The Father on His sapphire throne",
            "Awaits His own anointed Son."
        ],
        [
            "Ride on, ride on, in majesty,",
            "In lowly pomp ride on to die;",
            "Bow Thy meek head to mortal pain,",
            "Then take, O God, Thy power, and reign."
        ]
    ]
})

# 212
H.append({
    'num': 212,
    'meter': '8.3.8.3.8.8.8.3.',
    'tune': 'GOLGOTHA',
    'notes': 'Moderate',
    'verses': [
        [
            "BEHOLD, behold the Lamb of God,",
            "    On the cross.",
            "For us He shed His precious blood,",
            "    On the cross.",
            "Oh, hear His awful, anguished cry,",
            "\"Eli, lama sabachthani;\"",
            "Draw near and see the Saviour die",
            "    On the cross."
        ],
        [
            "Behold His arms extended wide,",
            "    On the cross.",
            "Behold His bleeding hands and side,",
            "    On the cross.",
            "The sun withholds its rays of light,",
            "The heavens are clothed in shades of night,",
            "While Jesus fights the dreadful fight",
            "    On the cross."
        ],
        [
            "By faith we see Him lifted up,",
            "    On the cross.",
            "He drinks for us the bitter cup,",
            "    On the cross.",
            "The rocks are rent, the mountains quake,",
            "While Jesus doth atonement make,",
            "While Jesus suffers for our sake",
            "    On the cross."
        ],
        [
            "And now the mighty deed is done,",
            "    On the cross.",
            "The battle's fought, the victory won,",
            "    On the cross.",
            "To heaven He turns His holy eyes,",
            "\"'Tis finished,\" now the Conqueror cries,",
            "Then bows His sacred head and dies",
            "    On the cross."
        ],
        [
            "Where'er I go, I'll tell the story",
            "    Of the cross.",
            "In nothing else my soul shall glory,",
            "    Save the cross.",
            "Yes, this my constant theme shall be,",
            "Through time and in eternity---",
            "How Jesus conquered death for me",
            "    On the cross."
        ]
    ]
})

# 213
H.append({
    'num': 213,
    'meter': '8.7.8.7. D.',
    'tune': 'AUSTRIA',
    'notes': 'Moderate',
    'verses': [
        [
            "SWEET the moments, rich in blessing,",
            "    Which before the cross we spend,",
            "Life and health and peace possessing,",
            "    From the sinner's dying Friend.",
            "Here we rest, in wonder viewing",
            "    All our sins on Jesus laid,",
            "And a full redemption flowing",
            "    From the sacrifice He made."
        ],
        [
            "Truly bless\\`ed is the station,",
            "    Low before the cross to lie,",
            "And behold the great salvation",
            "    To rebellious man brought nigh.",
            "Here we find the dawn of heav\\`en,",
            "    While upon the cross we gaze,",
            "See our trespasses forgiv\\`en,",
            "    And our songs of triumph raise."
        ],
        [
            "Oh that near the cross abiding",
            "    We may to the Saviour cleave,",
            "Nought from Him our hearts dividing,",
            "    All for Him content to leave.",
            "May we still, the cross discerning,",
            "    There for peace and comfort go,",
            "There new wonders daily learning,",
            "    All the depths of mercy know."
        ]
    ]
})

# 214
H.append({
    'num': 214,
    'meter': 'C. M.',
    'tune': 'HORSLEY',
    'notes': 'Moderate',
    'verses': [
        [
            "THERE is a green hill far away,",
            "    Outside a city wall,",
            "Where Christ the Lord was crucified,",
            "    Who died to save us all."
        ],
        [
            "We do not know, we cannot tell",
            "    The pains He had to bear;",
            "But this we know, it was for us",
            "    He bled and suffered there."
        ],
        [
            "He died that we might be forgiven,",
            "    That we so void of good",
            "Might ever be with Him in heaven,",
            "    Saved by His precious blood."
        ],
        [
            "There was no other good enough",
            "    To pay the price of sin;",
            "He only could unlock the gate",
            "    Of heaven, to let us in."
        ],
        [
            "Oh dearly, dearly has He loved!",
            "    Shall we not love Him too,",
            "Who trust in His redeeming blood,",
            "    And seek His will to do?"
        ]
    ]
})

# 215
H.append({
    'num': 215,
    'meter': 'C. M.',
    'tune': 'STRACATHRO',
    'notes': 'Moderate',
    'verses': [
        [
            "ALAS, and did my Saviour bleed,",
            "    And did my Sovereign die?",
            "Did He devote that sacred head",
            "    For such a worm as I?"
        ],
        [
            "Was it for sins that I had done",
            "    He groaned upon the tree?",
            "Amazing pity, grace unknown,",
            "    And love beyond degree!"
        ],
        [
            "Well might the sun in darkness hide,",
            "    And shut its glories in,",
            "When the incarnate Maker died",
            "    For man, His creature's sin."
        ],
        [
            "Thus might I hide my blushing face",
            "    While Calvary's cross appears;",
            "Dissolve my heart in thankfulness,",
            "    And melt mine eyes to tears."
        ],
        [
            "But drops of grief can ne'er repay",
            "    The debt of love I owe;",
            "Fain would I give myself away;",
            "    'Tis all that I can do."
        ]
    ]
})

# 216
H.append({
    'num': 216,
    'meter': '7.6.7.6. D.',
    'tune': 'PASSION CHORALE',
    'notes': 'Slow',
    'verses': [
        [
            "O SACRED Head once wounded,",
            "    With grief and pain weighed down,",
            "How scornfully surrounded",
            "    With thorns, Thine only crown!",
            "How art Thou pale with anguish,",
            "    With sore abuse and scorn!",
            "How does that visage languish,",
            "    Which once was bright as morn!"
        ],
        [
            "O sacred Head, what glory,",
            "    What bliss till now was Thine!",
            "Yet, though despised and gory,",
            "    I joy to call Thee mine.",
            "Thy grief and Thy compassion",
            "    Were all for sinners' gain;",
            "Mine, mine was the transgression,",
            "    But Thine the deadly pain."
        ],
        [
            "What language shall I borrow,",
            "    To praise Thee, heavenly Friend,",
            "For this Thy dying sorrow,",
            "    Thy pity without end?",
            "Lord, I am Thine for ever,",
            "    Ne'er let me faithless prove;",
            "Oh, let me never, never,",
            "    Forget such dying love! Amen."
        ]
    ]
})

# 217
H.append({
    'num': 217,
    'meter': 'C. M.',
    'tune': 'ST. VALENTINE',
    'notes': 'Moderate',
    'verses': [
        [
            "TO Calvary, Lord, in spirit oft",
            "    Our weary souls repair,",
            "To dwell upon Christ's dying love,",
            "    And taste its sweetness there."
        ],
        [
            "Sweet resting place of every heart",
            "    That feels the plague of sin,",
            "Yet knows that deep mysterious joy,",
            "    The peace of God within."
        ],
        [
            "There, through that hour of deepest woe,",
            "    His suffering spirit passed;",
            "Grace there its wondrous victory gained,",
            "    And love endured its last."
        ],
        [
            "Dear suffering Lamb! His grievous wounds",
            "    Have drawn, with cords of love,",
            "Our willing hearts to Him, and linked",
            "    Our life with His above."
        ],
        [
            "His sympathies and hopes are ours;",
            "    O God, we wait to see",
            "Creation all, below, above,",
            "    By Him redeemed and free."
        ],
        [
            "Our longing eyes would fain behold",
            "    That bright and bless\\`ed brow,",
            "Once wrung with bitterest anguish, wear",
            "    Its crown of glory now."
        ],
        [
            "Why linger then? Come, Saviour come,",
            "    Responsive to our call;",
            "Come, claim Thy rightful power and reign,",
            "    The Heir and Lord of all."
        ]
    ]
})

# 218
H.append({
    'num': 218,
    'meter': 'Irregular',
    'tune': 'HE DIES!',
    'notes': 'Moderately fast',
    'chorus': [
        "I am He that liveth, that liveth and was dead;",
        "I am He that liveth, that liveth and was dead;",
        "    And behold! I am alive for evermore,",
        "    Behold! I am alive for evermore.",
        "I am He that liveth, that liveth and was dead;",
        "    And behold! I am alive for evermore."
    ],
    'verses': [
        [
            "HE dies! He dies! the lowly Man of Sorrows,",
            "On whom were laid our many griefs and woes;",
            "Our sins He bore beneath God's awful billows,",
            "And He hath triumphed over all our foes."
        ],
        [
            "He lives! He lives! what glorious consolation!",
            "Exalted at His Father's own right hand",
            "He pleads for us, and by His intercession",
            "Enables all His saints by grace to stand."
        ],
        [
            "He comes! He comes! Oh, blest anticipation!",
            "In keeping with His true and faithful word,",
            "To call us to our heavenly consummation---",
            "Caught up, to be for ever with the Lord."
        ]
    ]
})

# 219
H.append({
    'num': 219,
    'meter': 'C. M.',
    'tune': 'ALLHALLOWS',
    'notes': 'Slow',
    'verses': [
        [
            "WHAT sacred fountain yonder springs",
            "    Out from God's throne above,",
            "And all our covenant blessing brings?",
            "    'Tis God's unbounded love."
        ],
        [
            "What mighty sum paid all my debt",
            "    When charged with guilt I stood,",
            "And hath my soul at freedom set?",
            "    'Tis Jesus' precious blood."
        ],
        [
            "What stream of light doth now dispel",
            "    My terror of the rod?",
            "Forth from the cross my fears to quell",
            "    Shines bright the love of God."
        ],
        [
            "What voice is that which speaks for me",
            "    In heaven's high court for good,",
            "And from the curse hath set me free?",
            "    'Tis Jesus' precious blood."
        ],
        [
            "What themes will fill our hearts above",
            "    When praise we sing to God?",
            "His own surpassing boundless love",
            "    And Jesus' precious blood."
        ]
    ]
})

# 220
H.append({
    'num': 220,
    'meter': 'S. M.',
    'tune': 'SWABIA',
    'notes': 'Moderately fast',
    'verses': [
        [
            "CHRIST'S grave is vacant now,",
            "    Left for the throne above;",
            "His cross asserts God's right to bless",
            "    In His own boundless love."
        ],
        [
            "'Twas there the blood was shed,",
            "    'Twas there the life was poured;",
            "There Mercy gained her diadem,",
            "    While Justice sheathed her sword."
        ],
        [
            "And thence the child of faith",
            "    Sees judgment all gone by,",
            "Perceives the sentence fully met,",
            "    \"The soul that sins shall die;\""
        ],
        [
            "Learns how that God in love",
            "    Gave Christ, the sins to bear",
            "Of all who own His lordship now,",
            "    That they His place may share;"
        ],
        [
            "And cries with wondering joy,",
            "    \"As He is, so am I---",
            "Pure, holy, loved as Christ Himself;",
            "    Who shall my peace destroy?"
        ],
        [
            "\"Reach my blest Saviour first,",
            "    Take Him from God's esteem;",
            "Prove Jesus bears one spot of sin,",
            "    Then tell me I'm unclean."
        ],
        [
            "\"Nay, for He purged my guilt",
            "    With His own precious blood;",
            "And such its virtue, not a stain",
            "    E'er meets the eye of God.\""
        ]
    ]
})

# 221
H.append({
    'num': 221,
    'meter': 'L. M.',
    'tune': 'MARYTON',
    'notes': 'Moderately fast',
    'verses': [
        [
            "HE lives, the great Redeemer lives",
            "    (What joy the blest assurance gives!)",
            "And now before His Father, God,",
            "    Pleads the full merit of His blood."
        ],
        [
            "Great Advocate, almighty Friend,",
            "    On Him do all our hopes depend;",
            "Our cause can never, never fail,",
            "    For He doth plead, and must prevail."
        ],
        [
            "In every dark, distressing hour,",
            "    When sin and Satan join their power,",
            "Let this blest truth repel each dart---",
            "    That Christ doth bear us on His heart."
        ]
    ]
})

# 222
H.append({
    'num': 222,
    'meter': 'C. M.',
    'tune': 'ARNOLD.',
    'notes': 'Moderately fast',
    'verses': [
        [
            "IN heaven, before God's holy face,",
            "    Behold an Advocate",
            "Who intercedes for us in grace,",
            "    With power divinely great."
        ],
        [
            "He loves us deeply, this we know",
            "    By tokens that He wears;",
            "Pierced hands and feet and side, all show",
            "    The matchless love He bears."
        ],
        [
            "He died to ransom us from sin,",
            "    He lives to save us still",
            "From every power without, within,",
            "    That seeks to work us ill."
        ],
        [
            "He, touched with trials that attend",
            "    The weakness of our frame,",
            "Can sympathetic succour lend,",
            "    For He has known the same."
        ],
        [
            "He overcame His mightiest foe,",
            "    When He earth's pathway trod;",
            "And victory we may also know,",
            "    Who come through Him to God."
        ],
        [
            "Fear not to come, if sin o'ertake,",
            "    Confessing all to God,",
            "Who will forgive us for His sake,",
            "    And cleanse us by His blood."
        ],
        [
            "Christ will fresh strength for conflict give,",
            "    The needed grace impart,",
            "That each below for Him may live,",
            "    And He live in each heart."
        ]
    ]
})

# 223
H.append({
    'num': 223,
    'meter': 'C. M.',
    'tune': 'ST. AGNES, DURHAM.',
    'notes': 'Moderate',
    'verses': [
        [
            "WITH joy we meditate the grace",
            "    Of our High Priest above;",
            "His heart is filled with tenderness,",
            "    His very name is Love."
        ],
        [
            "Touched with a sympathy within,",
            "    He knows our feeble frame;",
            "He knows what sore temptations are,",
            "    For He has felt the same."
        ],
        [
            "But spotless, undefiled and pure,",
            "    Our great Redeemer stood;",
            "While Satan's fiery darts He bore,",
            "    And did resist to blood."
        ],
        [
            "He in the days of lowly flesh",
            "    Poured out His cries and tears;",
            "And, though exalted, feels afresh",
            "    What every member bears."
        ],
        [
            "Then boldly let our faith address",
            "    His mercy and His power;",
            "We shall obtain delivering grace",
            "    In each distressing hour."
        ]
    ]
})

# 224
H.append({
    'num': 224,
    'meter': 'L. M.',
    'tune': 'TRURO.',
    'notes': 'Moderate',
    'verses': [
        [
            "THE Saviour lives, no more to die;",
            "He lives, our Head, enthroned on high;",
            "He lives triumphant o'er the grave;",
            "He lives eternally to save."
        ],
        [
            "He lives to still His people's fears;",
            "He lives to wipe away their tears;",
            "He lives their mansions to prepare;",
            "He lives to bring them safely there."
        ],
        [
            "Then let our souls in Him rejoice,",
            "And sing His praise with cheerful voice;",
            "Our doubts and fears for ever gone,",
            "For Christ is on the Father's throne."
        ],
        [
            "The chief of sinners He receives,",
            "His saints He loves and never leaves;",
            "He'll guard us safe from every ill,",
            "And all His promises fulfil."
        ],
        [
            "Abundant grace He will afford",
            "Till we are present with the Lord,",
            "And prove what we have sung before,",
            "Christ Jesus lives for evermore."
        ]
    ]
})

# 225
H.append({
    'num': 225,
    'meter': 'L. M.',
    'tune': 'DUKE STREET.',
    'notes': 'Fast',
    'verses': [
        [
            "WHERE high the heavenly temple stands,",
            "The house of God not made with hands,",
            "A great High Priest true manhood wears,",
            "And there before our God appears."
        ],
        [
            "He, who for us as surety stood,",
            "Yielding on earth His precious blood,",
            "Pursues in heaven His gracious plan,",
            "The Saviour and the Friend of man."
        ],
        [
            "Partaker of the human name,",
            "He knows the frailty of our frame,",
            "And still remembers in the skies",
            "His tears and griefs and agonies."
        ],
        [
            "In every pang that rends the heart",
            "The Man of Sorrows bears a part;",
            "He knows and feels our every grief,",
            "And gives the suffering saint relief."
        ],
        [
            "With boldness therefore at the throne",
            "Let us make all our sorrows known,",
            "And seek the aid of heavenly power",
            "To help us in each trying hour."
        ]
    ]
})

# 226
H.append({
    'num': 226,
    'meter': 'L. M.',
    'tune': 'SILVER HILL.',
    'notes': 'Moderately fast',
    'verses': [
        [
            "BEFORE the throne of God above",
            "I have a strong, a perfect plea---",
            "A great High Priest, whose name is Love,",
            "Who ever lives and pleads for me."
        ],
        [
            "My name is graven on His hands;",
            "My name is written on His heart;",
            "I know that while in heaven He stands,",
            "No tongue can bid me hence depart."
        ],
        [
            "When Satan tempts me to despair",
            "And tells me of the guilt within,",
            "Upward I look and see Him there",
            "Who made an end of all my sin."
        ],
        [
            "Because the sinless Saviour died",
            "My sinful soul is counted free,",
            "For God, the Just, is satisfied",
            "To look on Him and pardon me."
        ],
        [
            "Behold Him there, the risen Lamb,",
            "My perfect, spotless righteousness;",
            "The great unchangeable I AM,",
            "The King of glory and of grace."
        ],
        [
            "One with Himself, I cannot die;",
            "My soul is purchased with His blood;",
            "My life is hid with Christ on high,",
            "With Christ my Saviour, and my God."
        ]
    ]
})

# 227
H.append({
    'num': 227,
    'meter': '8.7.8.7. D.',
    'tune': 'ST. WINIFRED',
    'notes': 'Moderate',
    'verses': [
        [
            "LAMB of God, Thou now art seated",
            "    High upon Thy Father's throne,",
            "All Thy gracious work completed,",
            "    All Thy mighty victory won.",
            "Every knee in heaven is bending",
            "    To the Lamb for sinners slain;",
            "Every voice and harp is swelling,",
            "    \"Worthy is the Lamb to reign.\""
        ],
        [
            "Lord, in all Thy power and glory,",
            "    Still Thy thoughts and eyes are here,",
            "Watching o'er Thy ransomed people,",
            "    To Thy gracious heart so dear;",
            "Thou for us art interceding",
            "    (Everlasting is Thy love),",
            "And a bless\\`ed rest preparing",
            "    In our Father's house above."
        ],
        [
            "Lamb of God, Thou soon in glory",
            "    Wilt to this sad earth return;",
            "All Thy foes shall quake before Thee,",
            "    All that now despise Thee, mourn.",
            "Then Thy saints appearing with Thee,",
            "    With Thee in Thy kingdom reign;",
            "Thine the praise and Thine the glory,",
            "    Lamb of God for sinners slain! Amen."
        ]
    ]
})

# 228
H.append({
    'num': 228,
    'meter': 'C. M.',
    'tune': 'WARWICK.',
    'notes': 'Moderate',
    'verses': [
        [
            "O GOD, 'tis joy to look above",
            "    And see Christ on Thy throne;",
            "To search the heights and depths of love",
            "    Which He to us has shown;"
        ],
        [
            "To look beyond the long dark night",
            "    And hail the coming day,",
            "When He to all the saints in light",
            "    His glories will display."
        ],
        [
            "And oh, 'tis joy the path to trace",
            "    By Him so meekly trod;",
            "Learning of Him to walk in grace,",
            "    In fellowship with God."
        ],
        [
            "Joy to confess His bless\\`ed name,",
            "    The virtues of His blood;",
            "And to the weary heart proclaim,",
            "    \"Behold the Lamb of God.\""
        ]
    ]
})

# 229
H.append({
    'num': 229,
    'meter': 'C. M.',
    'tune': 'JAZER.',
    'notes': 'Moderately fast',
    'verses': [
        [
            "O BLEST Lord Jesus, who but Thou",
            "    On earth, in heaven above,",
            "May claim from all our willing hearts",
            "    The full response of love?"
        ],
        [
            "We love Thy brethren, Lord, 'tis true,",
            "    Because in them we see",
            "Sweet traces of Thy bless\\`ed self,",
            "    As here they walk with Thee."
        ],
        [
            "But oh! Thou loving One, 'twas Thine,",
            "    Thine only, Lord, to part",
            "With life, and all that love could give,",
            "    To win the wandering heart."
        ],
        [
            "Thus, heirs of endless bliss with Thee,",
            "    We love Thee and adore,",
            "And ask Thee, Lord, that we may learn",
            "    To love Thee more and more."
        ]
    ]
})

# 230
H.append({
    'num': 230,
    'meter': 'C. M.',
    'tune': 'LYNTON.',
    'notes': 'Moderately fast',
    'verses': [
        [
            "O BLESS\\`ED Saviour, is Thy love",
            "    So vast, so full, so free?",
            "Fain would we give our hearts, our minds,",
            "    Our lives, our all, to Thee."
        ],
        [
            "We love Thee for the glorious worth",
            "    Which in Thyself we see;",
            "We love Thee for the shameful cross,",
            "    Endured so patiently."
        ],
        [
            "No man of greater love can boast",
            "    Than for his friend to die;",
            "Thou for Thine enemies wast slain;",
            "    What love with Thine can vie?"
        ],
        [
            "Though in the very form of God,",
            "    With heavenly glory crowned,",
            "Thou didst partake of blood and flesh,",
            "    Beset with sorrows round."
        ],
        [
            "Thou wouldst like sinful man be made,",
            "    In everything but sin,",
            "That we as like Thee might become,",
            "    As we unlike have been;"
        ],
        [
            "Like Thee in faith, in meekness, love,",
            "    In every heavenly grace;",
            "From glory unto glory changed",
            "    Till we behold Thy face."
        ],
        [
            "O Lord, we treasure in our hearts",
            "    The memory of Thy love;",
            "And ever may Thy name to us",
            "    A grateful odour prove. Amen."
        ]
    ]
})

# 231
H.append({
    'num': 231,
    'meter': 'L. M.',
    'tune': 'OTTERBOURNE',
    'notes': 'Moderate',
    'verses': [
        [
            "THY dying love, O Lord, I own,",
            "A love unfathomed and unknown;",
            "All other love can measured be,",
            "But not Thy boundless love to me."
        ],
        [
            "Oh, wonder to myself I am,",
            "That I can view the dying Lamb,",
            "Can scan the wondrous mystery o'er,",
            "And not be moved to love Him more!"
        ],
        [
            "'Tis well indeed that 'twas His love,",
            "Not mine, that brought Him from above;",
            "And well that 'twas His bitter grief,",
            "Not mine, that gave my soul relief."
        ],
        [
            "Oh, I am weary of my love,",
            "That doth so little towards Him move!",
            "Yet do I constant, inly groan",
            "To know the depths of all His own."
        ],
        [
            "Loved and for ever on the throne,",
            "Adored and loved, the timeless One",
            "Will through one long eternal day",
            "The height and depth of all display."
        ],
        [
            "Whilst here below meanwhile I'd be",
            "Content to have Him near to me;",
            "To know but this, His love alone,",
            "And count my love too mean to own."
        ]
    ]
})

# 232
H.append({
    'num': 232,
    'meter': '11.11.11.11.',
    'tune': 'SWEET IS THE PROMISE',
    'notes': 'Moderate',
    'chorus': [
        "\"I will not forget thee or leave thee;",
        "In My hands I'll hold thee, in My arms I'll fold thee;",
        "I will not forget thee or leave thee---",
        "I am thy Redeemer, I will care for thee.\""
    ],
    'verses': [
        [
            "SWEET is the promise, \"I will not forget thee;\"",
            "Nothing can molest or turn my soul away.",
            "E'en though the night be dark within the valley,",
            "Just beyond is shining an eternal day."
        ],
        [
            "How can I show my gratitude to Jesus",
            "For His love unfailing and His tender care?",
            "I will proclaim to others His salvation,",
            "That they may accept Him and His promise share."
        ],
        [
            "Trusting the promise, \"I will not forget thee,\"",
            "Onward will I go with songs of joy and praise.",
            "Though earth despise me, though my friends forsake me,",
            "Jesus will be near me, gladd\\`ening my days."
        ],
        [
            "When at the golden portals I am standing,",
            "All my tribulations, all my sorrows past,",
            "How sweet to hear the bless\\`ed proclamation---",
            "\"Enter faithful servant, welcome home at last!\""
        ]
    ]
})

# 233
H.append({
    'num': 233,
    'meter': '6.4.6.4.6.6.6.4.',
    'tune': 'WORSHIP',
    'notes': 'Moderate',
    'verses': [
        [
            "\"JESUS,\" that name we love,",
            "    Jesus our Lord;",
            "\"Jesus,\" all names above,",
            "    Jesus the Lord.",
            "Thou, Lord, our all must be,",
            "Nothing that's good have we,",
            "Nothing apart from Thee,",
            "    Jesus our Lord."
        ],
        [
            "As Son of Man it was,",
            "    Jesus the Lord,",
            "Thou gav'st Thy life for us,",
            "    Jesus our Lord.",
            "Great was indeed Thy love,",
            "All other love above,",
            "Love Thou didst dearly prove,",
            "    Jesus our Lord."
        ],
        [
            "Righteous alone in Thee,",
            "    Jesus our Lord;",
            "Thou wilt a refuge be,",
            "    Jesus the Lord.",
            "Whom then have we to fear,",
            "What trouble, grief or care,",
            "Since Thou art ever near,",
            "    Jesus our Lord?"
        ],
        [
            "Soon Thou wilt come again,",
            "    Jesus the Lord;",
            "We shall be happy then,",
            "    Jesus our Lord;",
            "When Thine own face we see,",
            "Then we shall like Thee be,",
            "Then evermore with Thee,",
            "    Jesus our Lord."
        ]
    ]
})

# 234
H.append({
    'num': 234,
    'meter': '7.6.7.6. D',
    'tune': 'PRYSGOL',
    'notes': 'Moderately fast',
    'verses': [
        [
            "LORD Jesus Christ, our Saviour,",
            "    We only look to Thee;",
            "'Tis in Thy love and favour",
            "    Our souls find liberty.",
            "Whilst Satan fiercely rages",
            "    And shipwreck oft we fear,",
            "'Tis this our grief assuages,",
            "    That Thou art always near."
        ],
        [
            "Yea, though the tempest round us",
            "    Seems safety to defy,",
            "Though rocks and shoals surround us,",
            "    And swell the billows high,",
            "Thou dost through all protect us",
            "    And cheer us by Thy love;",
            "Thy counsels too direct us",
            "    Safe to the rest above."
        ],
        [
            "There with what joy reviewing",
            "    Past conflicts, dangers, fears,",
            "Thy hand our foes subduing,",
            "    And drying all our tears;",
            "Our hearts with rapture burning,",
            "    The path we shall retrace,",
            "Where now our souls are learning",
            "    The riches of Thy grace."
        ],
        [
            "Oh, then how loud the chorus",
            "    Shall to Thy name resound,",
            "From all at rest before us,",
            "    From all Thy grace hath found!",
            "One joyful song for ever",
            "    Each heart, each lip, shall raise---",
            "The praise of our Redeemer,",
            "    Our God and Saviour's praise!"
        ]
    ]
})

# 235
H.append({
    'num': 235,
    'meter': '7.6.7.6. D',
    'tune': 'LYMINGTON',
    'notes': 'Moderately fast',
    'verses': [
        [
            "O LORD, who now art seated",
            "    Above the heavens on high,",
            "The gracious work completed,",
            "    For which Thou cam'st to die,",
            "To Thee our hearts are lifted,",
            "    While pilgrims wandering here,",
            "For Thou alone art gifted",
            "    Our every weight to bear."
        ],
        [
            "We know that Thou hast bought us",
            "    And cleansed us by Thy blood;",
            "We know Thy grace has brought us",
            "    As kings and priests to God:",
            "We know that soon the morning",
            "    Long looked for hasteth near,",
            "When we, at Thy returning,",
            "    In glory shall appear."
        ],
        [
            "O Lord, Thy love's unbounded,",
            "    So full, so vast, so free!",
            "Our thoughts are all confounded",
            "    Whene'er we think of Thee.",
            "For us Thou cam'st from heav\\`en,",
            "    For us to bleed and die;",
            "That, purchased and forgiv\\`en,",
            "    We might ascend on high."
        ],
        [
            "Oh, let this love constrain us",
            "    To give our hearts to Thee;",
            "Let nothing henceforth pain us",
            "    But that which paineth Thee;",
            "Our joy, our one endeavour,",
            "    Through suffering, conflict, shame,",
            "To serve Thee, gracious Saviour,",
            "    And magnify Thy name."
        ]
    ]
})

# 236
H.append({
    'num': 236,
    'meter': 'Irregular',
    'tune': 'YERBURY',
    'notes': 'Moderately fast',
    'verses': [
        [
            "THY love we own, Lord Jesus,",
            "In service unremitting;",
            "    Within the veil",
            "    Thou dost prevail,",
            "Each soul for service fitting.",
            "Encompassed here with failure,",
            "Each earthly refuge fails us;",
            "    Without, within,",
            "    Beset with sin,",
            "Thy name alone avails us."
        ],
        [
            "Thy love we own, Lord Jesus,",
            "For, though Thy toils are ended,",
            "    Thy tender heart",
            "    Doth take its part",
            "With those Thy grace befriended.",
            "Thy sympathy how precious!",
            "Thou succourest in sorrow,",
            "    And bid'st us cheer",
            "    While pilgrims here,",
            "And haste the hopeful morrow."
        ],
        [
            "Thy love we own, Lord Jesus;",
            "Thy way is traced before Thee---",
            "    Thou wilt descend",
            "    And we ascend",
            "To meet in heavenly glory.",
            "Soon shall the blissful morning",
            "Call forth Thy saints to meet Thee,",
            "    Our only Lord,",
            "    Alone adored;",
            "With gladness then we'll greet Thee."
        ],
        [
            "Thy love we own, Lord Jesus,",
            "And wait to see Thy glory;",
            "    To know as known",
            "    And fully own",
            "Thy perfect grace before Thee.",
            "We plead Thy parting promise,",
            "Come, Saviour, to release us;",
            "    Then endless praise",
            "    Our lips shall raise",
            "For love like Thine, Lord Jesus."
        ]
    ]
})

# 237
H.append({
    'num': 237,
    'meter': 'Irregular',
    'tune': 'BISHOPGARTH',
    'notes': 'Moderately fast',
    'verses': [
        [
            "THY name we bless, Lord Jesus---",
            "That name all names excelling.",
            "    How great Thy love",
            "    (All praise above)",
            "Should every tongue be telling.",
            "The Father's loving kindness",
            "In giving Thee was shown us,",
            "    Now by Thy blood",
            "    Redeemed to God,",
            "As children He doth own us."
        ],
        [
            "From that eternal glory",
            "Thou hadst with God the Father,",
            "    He sent His Son",
            "    That He in one",
            "His people all might gather.",
            "Our sins were all laid on Thee,",
            "God's wrath Thou hast endur\\`ed;",
            "    It was for us",
            "    Thou suffer'dst thus,",
            "And hast our peace secur\\`ed."
        ],
        [
            "Thou from the dead wast rais\\`ed,",
            "And from all condemnation",
            "    The Church is free,",
            "    As raised in Thee,",
            "Head of the new creation.",
            "On high Thou hast ascended",
            "To God's right hand in heav\\`en;",
            "    The Lamb once slain",
            "    Alive again,",
            "To Thee all power is given."
        ],
        [
            "Thou hast bestowed the earnest",
            "Of that we shall inherit;",
            "    Till Thou shalt come",
            "    To take us home",
            "We're sealed by God the Spirit.",
            "We wait for Thine appearing,",
            "When we shall know more fully",
            "    The grace divine",
            "    That made us Thine,",
            "Thou Lamb of God most holy."
        ]
    ]
})

# 238
H.append({
    'num': 238,
    'meter': '8.4.8.4.8.8.8.4.',
    'tune': 'CARITAS',
    'notes': 'Moderately fast',
    'verses': [
        [
            "ONE there is above all others,",
            "    Oh how He loves!",
            "His is love beyond a brother's,",
            "    Oh how He loves!",
            "Earthly friends may fail or leave us,",
            "One day soothe, the next day grieve us,",
            "But this Friend will ne'er deceive us;",
            "    Oh how He loves!"
        ],
        [
            "'Tis eternal life to know Him,",
            "    Oh how He loves!",
            "Think, oh think how much we owe Him,",
            "    Oh how He loves!",
            "With His precious blood He bought us,",
            "In the wilderness He sought us,",
            "To His fold He safely brought us;",
            "    Oh how He loves!"
        ],
        [
            "What a Friend is our Lord Jesus,",
            "    Oh how He loves!",
            "'Tis His great delight to bless us,",
            "    Oh how He loves!",
            "How our hearts delight to hear Him",
            "Bid us dwell in safety near Him!",
            "Why should we distrust or fear Him?",
            "    Oh how He loves!"
        ],
        [
            "Through His name we are forgiv\\`en,",
            "    Oh how He loves!",
            "Backward shall our foes be driv\\`en,",
            "    Oh how He loves!",
            "Best of blessings He'll provide us,",
            "Nought but good shall e'er betide us,",
            "Safe to glory He will guide us,",
            "    Oh how He loves!"
        ]
    ]
})

# 239
H.append({
    'num': 239,
    'meter': '8.7.8.7. D',
    'tune': 'ROOM FOR JESUS',
    'notes': 'Moderate',
    'verses': [
        [
            "SON of God, 'twas love that made Thee",
            "    Die, our ruined souls to save;",
            "'Twas our sins' vast load that laid Thee,",
            "    Lord of life, within the grave.",
            "But Thy glorious resurrection",
            "    Showed Thee conqueror o'er the tomb;",
            "So the saints, by Thy protection,",
            "    Through Thy work shall overcome."
        ],
        [
            "Thou to heaven hast now ascended,",
            "    Entering there by Thine own blood,",
            "All Thy work of suffering ended,",
            "    Fully wrought the will of God.",
            "For Thy saints Thou still art caring,",
            "    For us pleading in Thy love,",
            "And our place of rest preparing",
            "    In the Father's house above."
        ],
        [
            "Now the Paraclete doth gather",
            "    To Thy name Thy people here;",
            "So we worship God the Father,",
            "    Serve in love and holy fear.",
            "What a debt of love we owe Thee,",
            "    Love that we can ne'er express,",
            "Since we through the Spirit know Thee,",
            "    Christ the Lord, our righteousness!"
        ]
    ]
})

# 240
H.append({
    'num': 240,
    'meter': 'C. M.',
    'tune': 'ARTAXERXES',
    'notes': 'Moderate',
    'verses': [
        [
            "LORD Jesus Christ, the thought of Thee",
            "With sweetness fills my breast;",
            "But better far Thy face to see,",
            "And in Thy presence rest."
        ],
        [
            "Nor voice can sing, nor heart can frame,",
            "Nor can the memory find",
            "A sweeter sound than Thy blest name,",
            "O Saviour of mankind."
        ],
        [
            "O Hope of every contrite heart,",
            "Thou joy of all the meek,",
            "To those who fall how kind Thou art,",
            "How good to those who seek!"
        ],
        [
            "But what to those who find! Ah, this",
            "Nor tongue, nor pen can show;",
            "Thy love, Lord Jesus, what it is",
            "None but Thy loved ones know."
        ],
        [
            "Our only joy and strength be Thou,",
            "As Thou our crown wilt be;",
            "Be Thou, O Lord, our glory now",
            "And through eternity. Amen."
        ]
    ]
})

# 241
H.append({
    'num': 241,
    'meter': '7.7.7.7.',
    'tune': 'ST. BEES',
    'notes': 'Moderate',
    'verses': [
        [
            "HARK, my soul, it is the Lord,",
            "'Tis thy Saviour, hear His word;",
            "Now He speaks, and speaks to thee,",
            "\"Ransomed sinner, lovest thou Me?\""
        ],
        [
            "\"I delivered thee when bound,",
            "And when wounded healed thy wound,",
            "Sought thee wandering, set thee right,",
            "Turned thy darkness into light."
        ],
        [
            "\"Can a mother's tender care",
            "Cease toward the child she bare?",
            "Yes, she may forgetful be,",
            "Yet will I remember thee."
        ],
        [
            "\"Mine is an unchanging love,",
            "Higher than the heights above,",
            "Deeper than the depths beneath,",
            "Free and faithful, strong as death."
        ],
        [
            "\"Thou shalt see My glory soon,",
            "When the work of grace is done;",
            "Partner of My throne shalt be---",
            "Ransomed sinner, lovest thou Me?\""
        ],
        [
            "Lord, it is my chief complaint",
            "That my love is weak and faint,",
            "Yet I love Thee and adore;",
            "Oh for grace to love Thee more!"
        ]
    ]
})

# 242
H.append({
    'num': 242,
    'meter': 'Irregular',
    'tune': 'AGAPE',
    'notes': 'Moderately fast',
    'verses': [
        [
            "LORD Jesus, Lord Jesus,",
            "    How vast Thy love to me!",
            "I'll bathe in its full ocean",
            "    To all eternity,",
            "And wending on to glory",
            "    This all my song shall be,",
            "\"I was a guilty sinner,",
            "    But Thou hast died for me.\""
        ],
        [
            "Oh Calv'ry, oh Calv'ry,",
            "    The thorn-crown and the spear---",
            "'Tis here Thy love, Lord Jesus,",
            "    Thy grievous wounds appear.",
            "What depths of grace and mercy",
            "    So richly flow from Thee!",
            "I was a guilty sinner,",
            "    But Thou hast died for me."
        ],
        [
            "Adore Him, adore Him;",
            "    The glorious work is done.",
            "Sin's judgment ne'er will harm me;",
            "    'Twas laid upon God's Son.",
            "He suffering cried, \"'Tis finished,\"",
            "    And I my pardon see;",
            "I was a guilty sinner,",
            "    But Thou hast died for me."
        ],
        [
            "In glory, in glory,",
            "    For ever with the Lord,",
            "I with the heavenly chorus",
            "    Shall sing with sweet accord;",
            "And as I gaze upon Him,",
            "    My gladsome song shall be",
            "Melodious with the praises",
            "    Of Christ who died for me."
        ]
    ]
})

# 243
H.append({
    'num': 243,
    'meter': '7.6.7.6. D',
    'tune': 'SALVATORI',
    'notes': 'Moderately fast',
    'verses': [
        [
            "O LORD, Thy love's unbounded,",
            "    So sweet, so full, so free;",
            "My soul is all transported",
            "    Whene'er I think of Thee.",
            "Yet, Lord, alas! what weakness",
            "    Within myself I find;",
            "No infant's changing pleasure",
            "    Is like my wandering mind."
        ],
        [
            "And yet Thy love's unchanging,",
            "    And doth recall my heart",
            "To joy in all its brightness,",
            "    The peace its beams impart.",
            "Yet, sure, if in Thy presence",
            "    My soul still constant were,",
            "Mine eye would, more familiar,",
            "    Its brighter glories bear."
        ],
        [
            "And thus Thy deep perfections",
            "    Much better should I know,",
            "And with adoring fervour",
            "    In this Thy nature grow.",
            "Still sweet 'tis to discover,",
            "    If clouds have dimmed my sight,",
            "When passed, eternal Lover,",
            "    As ever, Thou art bright."
        ],
        [
            "Oh, keep my soul, Lord Jesus,",
            "    Abiding still with Thee;",
            "And if I wander, teach me",
            "    Soon back to Thee to flee.",
            "That all Thy gracious favour",
            "    May to my soul be known;",
            "And versed in this Thy goodness,",
            "    My hopes Thyself shalt crown."
        ]
    ]
})

# 244
H.append({
    'num': 244,
    'meter': '7.6.7.6. D',
    'tune': 'JOY IN SORROW',
    'notes': 'Moderate. The last two lines of each verse to be repeated.',
    'verses': [
        [
            "I'VE found a joy in sorrow,",
            "    A secret balm for pain,",
            "A beautiful to-morrow",
            "    Of sunshine after rain;",
            "I've found a branch of healing",
            "    Near every bitter spring,",
            "A whispered promise stealing",
            "    O'er every broken string."
        ],
        [
            "I've found a glad hosanna",
            "    For every woe and wail,",
            "A handful of sweet manna",
            "    When grapes of Eshcol fail;",
            "I've found a Rock of ages",
            "    When desert wells are dry,",
            "And after weary stages",
            "    I've found an Elim nigh;"
        ],
        [
            "An Elim with its coolness,",
            "    Its fountains and its shade;",
            "A blessing in its fulness,",
            "    When buds of promise fade.",
            "O'er tears of sweet contrition",
            "    I've seen a rainbow light,",
            "A glory and fruition,",
            "    So near though out of sight."
        ],
        [
            "Lord Jesus, Thee possessing,",
            "    I have the joy, the balm,",
            "The healing and the blessing,",
            "    The sunshine and the psalm,",
            "The promise for the fearful,",
            "    The Elim for the faint,",
            "The rainbow for the tearful,",
            "    The glory for the saint."
        ]
    ]
})

# 245
H.append({
    'num': 245,
    'meter': '7.7.7.7. D.',
    'tune': 'HOLLINGSIDE',
    'notes': 'Moderate',
    'verses': [
        [
            "JESUS, Lover of my soul,",
            "    Let me to Thy bosom fly,",
            "While the raging billows roll,",
            "    While the tempest still is high.",
            "Hide me, O my Saviour, hide,",
            "    Till the storm of life is o'er;",
            "Safe into the haven guide,",
            "    Where the tempest's heard no more."
        ],
        [
            "Other refuge have I none,",
            "    Hangs my helpless soul on Thee;",
            "Leave, ah, leave me not alone,",
            "    Still support and comfort me.",
            "All my trust on Thee is stayed,",
            "    All my help from Thee I bring;",
            "Cover my defenceless head",
            "    With the shadow of Thy wing."
        ],
        [
            "Thou, O Christ, art all I want,",
            "    More than all in Thee I find;",
            "Raise the fallen, cheer the faint,",
            "    Heal the sick and lead the blind.",
            "Just and holy is Thy name,",
            "    I am all unrighteousness,",
            "I am full of sin and shame,",
            "    Thou art full of truth and grace."
        ],
        [
            "Plenteous grace with Thee is found,",
            "    Grace to pardon all my sin;",
            "Let the healing streams abound,",
            "    Make and keep me pure within.",
            "Thou of life the fountain art,",
            "    Freely let me take of Thee;",
            "Spring Thou up within my heart,",
            "    Rise to all eternity."
        ]
    ]
})

# 246
H.append({
    'num': 246,
    'meter': '8.8.6.8.8.6.',
    'tune': 'PURLEIGH',
    'notes': 'Moderate',
    'verses': [
        [
            "O LOVE divine, how sweet thou art!",
            "When shall I find my willing heart",
            "    All taken up by thee?",
            "Oh, may I pant and thirst to prove",
            "The greatness of redeeming love,",
            "    The love of God to me!"
        ],
        [
            "God only knows the love of God;",
            "Oh, that it more were shed abroad",
            "    In this poor heart of mine!",
            "For love I sigh, for love I pine;",
            "This only portion, Lord, be mine,",
            "    Be mine the better part."
        ],
        [
            "Oh, that I may for ever sit,",
            "Like Mary, at the Master's feet---",
            "    Be this my happy choice;",
            "My only care, my only bliss,",
            "My joy, my heaven on earth be this,",
            "    To hear the Bridegroom's voice."
        ],
        [
            "Oh, that I may, like favoured John,",
            "Recline my wearied head upon",
            "    The great Redeemer's breast!",
            "From care and sin and sorrow free,",
            "Give me, O Lord, to find in Thee",
            "    My everlasting rest."
        ]
    ]
})

# 247
H.append({
    'num': 247,
    'meter': '8.8.8.8.8.8.',
    'tune': 'TRANQUILLITY',
    'notes': 'Moderate',
    'verses': [
        [
            "LORD Jesus, Thou who only art",
            "The endless source of purest joy,",
            "Oh come and fill this longing heart,",
            "May nought but Thou my thoughts employ.",
            "Teach me on Thee to fix mine eye,",
            "For none but Thou can satisfy."
        ],
        [
            "The joys of earth can never fill",
            "The heart that's tasted of Thy love;",
            "No portion would I seek until",
            "I reign with Thee, my Lord, above;",
            "When I shall gaze upon Thy face,",
            "And know more fully all Thy grace."
        ],
        [
            "When from the radiant throne on high",
            "Thou didst my fall and ruin see,",
            "Thou cam'st to earth for me to die",
            "That I might share Thy throne with Thee;",
            "Loved with an everlasting love,",
            "My hopes, my joys are all above."
        ],
        [
            "Oh what is all that earth can give?",
            "I'm called to share in God's own joy!",
            "Dead to the world, in Thee I live,",
            "In Thee I've bliss without alloy;",
            "Well may I earthly joys resign,",
            "All things are mine and I am Thine."
        ],
        [
            "Till Thou shalt come to take me home,",
            "Be this my one ambition, Lord,",
            "Self, sin, the world to overcome,",
            "Fast clinging to Thy faithful word;",
            "More of Thyself each day to know,",
            "And more into Thine image grow."
        ]
    ]
})

# 248
H.append({
    'num': 248,
    'meter': '8.8.8.8.8.8.',
    'tune': 'ST. CATHERINE',
    'notes': 'Moderately fast',
    'verses': [
        [
            "OH, draw me, Saviour, after Thee!",
            "So shall I run and never tire;",
            "With gracious words still comfort me,",
            "Be Thou my hope, my sole desire.",
            "Free me from every weight. Nor fear",
            "Nor sin can come if Thou art near."
        ],
        [
            "What in Thy love possess I not?",
            "My star by night, my sun by day,",
            "My spring of life when parched with drought,",
            "My wine to cheer, my bread to stay,",
            "My strength, my shield, my safe abode,",
            "My robe before the throne of God."
        ],
        [
            "From all eternity with love",
            "Unchangeable Thou hast me viewed;",
            "Ere knew this beating heart to move,",
            "Thy tender mercies me pursued;",
            "Ever with me may they abide,",
            "And close me in on every side. Amen."
        ]
    ]
})

# 249
H.append({
    'num': 249,
    'meter': '10.10.10.10.4.',
    'tune': 'IT PASSETH KNOWLEDGE',
    'notes': 'Moderate',
    'verses': [
        [
            "IT passeth knowledge, that dear love of Thine,",
            "Lord Jesus, Saviour; yet this soul of mine",
            "Would of Thy love, in all its breadth and length,",
            "Its height and depth, its everlasting strength,",
            "    Know more and more."
        ],
        [
            "It passeth telling, that dear love of Thine,",
            "Lord Jesus, Saviour; yet these lips of mine",
            "Would fain proclaim to sinners, far and near,",
            "A love which can remove all guilty fear,",
            "    And love beget."
        ],
        [
            "It passeth praises, that dear love of Thine,",
            "Lord Jesus, Saviour; yet this heart of mine",
            "Would sing that love, so full, so rich, so free,",
            "Which brings a rebel sinner, even me,",
            "    Nigh unto God."
        ],
        [
            "But though I cannot sing or tell or know",
            "The fulness of Thy love while here below,",
            "My empty vessel I may freely bring;",
            "O Thou, who art of love the living spring,",
            "    My vessel fill!"
        ],
        [
            "Oh, fill me, holy Saviour, with Thy love;",
            "Lead, lead me to the living fount above.",
            "Thither may I in simple faith draw nigh,",
            "And never to another fountain fly,",
            "    But unto Thee."
        ],
        [
            "And when, Lord Jesus, Thine own face I see,",
            "When at Thy lofty throne I bow the knee,",
            "Then of Thy love in all its breadth and length,",
            "Its height and depth, its everlasting strength,",
            "    My soul shall sing."
        ]
    ]
})

# 250
H.append({
    'num': 250,
    'meter': 'C. M.',
    'tune': 'BELMONT',
    'notes': 'Moderate',
    'verses': [
        [
            "HOW sweet the name of Jesus sounds",
            "    In a believer's ear!",
            "It soothes his sorrows, heals his wounds,",
            "    And drives away his fear."
        ],
        [
            "It makes the wounded spirit whole,",
            "    And calms the troubled breast;",
            "'Tis manna to the hungry soul,",
            "    And to the weary rest."
        ],
        [
            "Dear Name! the rock on which we build,",
            "    Our shield and hiding place;",
            "Our never-failing treasury, filled",
            "    With boundless stores of grace."
        ],
        [
            "Lord Jesus, Saviour, Shepherd, Friend,",
            "    Our Prophet, Priest and King,",
            "Our Lord, our Life, our Way, our End,",
            "    Accept the praise we bring."
        ],
        [
            "Weak is the effort of the heart,",
            "    And cold our warmest thought;",
            "But when we see Thee as Thou art,",
            "    We'll praise Thee as we ought."
        ],
        [
            "Till then we would Thy love proclaim",
            "    With every fleeting breath;",
            "And glory in Thy bless\\`ed name",
            "    That quells the power of death."
        ]
    ]
})

# 251
H.append({
    'num': 251,
    'meter': 'C. M.',
    'tune': 'LOUGHTON',
    'notes': 'Moderate',
    'verses': [
        [
            "THERE is a name I love to hear,",
            "    I love to speak its worth;",
            "It sounds like music in mine ear,",
            "    The sweetest name on earth."
        ],
        [
            "It tells me of a Saviour's love,",
            "    Who died to set me free;",
            "It tells me of His precious blood,",
            "    The sinner's only plea."
        ],
        [
            "It tells me of a Father's love",
            "    Beaming upon His child;",
            "It cheers me through this little while,",
            "    Through desert, waste and wild."
        ],
        [
            "It tells me what my Father hath",
            "    In store for me each day;",
            "And though I tread a darksome path,",
            "    Yields sunshine all the way."
        ],
        [
            "It tells of One whose loving heart",
            "    Can feel my every woe,",
            "Who in each sorrow bears a part",
            "    That none can bear below."
        ],
        [
            "It bids my trembling soul rejoice,",
            "    It dries each rising tear;",
            "It tells me in a still small voice,",
            "    To trust and not to fear."
        ],
        [
            "\"Jesus,\" the name I love so well,",
            "    The name I love to hear;",
            "No saint on earth its worth can tell,",
            "    No heart conceive how dear."
        ],
        [
            "This name shall shed its fragrance still",
            "    Along the thorny road,",
            "Shall sweetly smooth the rugged hill",
            "    That leads me up to God;"
        ],
        [
            "And there, with all the blood-bought throng,",
            "    From sin and sorrow free,",
            "I'll sing the new, eternal song,",
            "    His boundless love to me."
        ]
    ]
})

# 252
H.append({
    'num': 252,
    'meter': '7.6.7.6. D',
    'tune': 'MUNICH',
    'notes': 'Moderately fast',
    'verses': [
        [
            "LORD Jesus, Friend unfailing,",
            "    How dear Thou art to me!",
            "Are cares or fears assailing?",
            "    I find my strength in Thee.",
            "Why should my feet grow weary",
            "    Of this my pilgrim way?",
            "Rough though the path and dreary,",
            "    It ends in perfect day."
        ],
        [
            "Nought, nought I court as pleasure,",
            "    Compared, O Christ, with Thee.",
            "Thy sorrow without measure",
            "    Earned peace and joy for me.",
            "I love to own, Lord Jesus,",
            "    Thy claims o'er me divine;",
            "Bought with Thy blood most precious,",
            "    Whose can I be but Thine?"
        ],
        [
            "What fills my heart with gladness?",
            "    'Tis Thine abounding grace.",
            "Where can I look in sadness,",
            "    O Lord, but on Thy face?",
            "My all is Thy providing,",
            "    Thy love can ne'er grow cold.",
            "In Thee, my refuge, hiding,",
            "    No good wilt Thou withhold."
        ],
        [
            "Why should I droop in sorrow?",
            "    Thou'rt ever by my side.",
            "Why, trembling, dread the morrow,",
            "    What ill can e'er betide?",
            "If I my cross have taken,",
            "    'Tis but to follow Thee;",
            "If scorned, despised, forsaken,",
            "    Nought severs Thee from me."
        ],
        [
            "O worldly pomp and glory,",
            "    Your charms are spread in vain.",
            "I've heard a sweeter story,",
            "    I've found a truer gain.",
            "Where Christ a place prepareth,",
            "    There is my loved abode,",
            "There shall I gaze upon Him,",
            "    There ever dwell with God."
        ],
        [
            "For every tribulation,",
            "    For every sore distress,",
            "In Christ I've full salvation,",
            "    Sure help and quiet rest.",
            "No fear of foes prevailing,",
            "    I triumph, Lord, in Thee.",
            "Lord Jesus, Friend unfailing,",
            "    How dear Thou art to me!"
        ]
    ]
})

# 253
H.append({
    'num': 253,
    'meter': '8.7.8.7.',
    'tune': 'VAIL',
    'notes': 'Slow',
    'verses': [
        [
            "THOU, my everlasting portion,",
            "    More than friend or life to me,",
            "All along my pilgrim journey,",
            "    Saviour, let me walk with Thee,",
            "        Close to Thee.",
            "    All along my pilgrim journey,",
            "    Saviour, let me walk with Thee."
        ],
        [
            "Not for ease or worldly pleasure,",
            "    Not for fame my prayer shall be;",
            "Gladly would I toil and suffer,",
            "    Only let me walk with Thee,",
            "        Close to Thee.",
            "    Gladly would I toil and suffer,",
            "    Only let me walk with Thee."
        ],
        [
            "Lead me through the vale of shadows;",
            "    Bear me o'er life's fitful sea;",
            "Then the gate of life eternal",
            "    I shall enter, Lord, with Thee,",
            "        Close to Thee.",
            "    Then the gate of life eternal",
            "    I shall enter, Lord, with Thee."
        ]
    ]
})

# 254
H.append({
    'num': 254,
    'meter': '8.7.8.7. D',
    'tune': "I'VE FOUND A FRIEND",
    'notes': 'Moderate',
    'verses': [
        [
            "I'VE found a Friend, oh, such a Friend!",
            "    He loved me ere I knew Him;",
            "He drew me with the cords of love,",
            "    And thus He bound me to Him.",
            "And round my heart still closely twine",
            "    Those ties which nought can sever;",
            "For I am His and He is mine,",
            "    For ever and for ever."
        ],
        [
            "I've found a Friend, oh, such a Friend!",
            "    He bled, He died to save me;",
            "And not alone the gift of life,",
            "    But His own self He gave me.",
            "Nought that I have mine own I'd call,",
            "    I hold it for the Giver;",
            "My heart, my strength, my life, my all,",
            "    Are His, and His for ever."
        ],
        [
            "I've found a Friend, oh, such a Friend!",
            "    All power to Him is giv\\`en,",
            "To guard me on my onward course",
            "    And bring me safe to heav\\`en.",
            "Th'eternal glories gleam afar",
            "    To nerve my faint endeavour;",
            "So now to watch, to work, to war,",
            "    And then, to rest for ever."
        ],
        [
            "I've found a Friend, oh, such a Friend!",
            "    So kind, and true, and tender;",
            "So wise a Counsellor and Guide,",
            "    So mighty a Defender!",
            "From Him, who loves me now so well,",
            "    What power my soul shall sever?",
            "Shall life or death? Shall earth or hell?",
            "    No, I am His for ever."
        ]
    ]
})

# 255
H.append({
    'num': 255,
    'meter': '8.8.8.8.4.4.8.8.',
    'tune': 'I HAVE A FRIEND',
    'notes': 'Moderate',
    'verses': [
        [
            "I HAVE a Friend, whose faithful love",
            "Is more than all the world to me;",
            "'Tis higher than the heights above,",
            "And deeper than the soundless sea.",
            "    So old, so new,",
            "    So strong, so true;",
            "Before the earth received its frame",
            "He loved me. Bless\\`ed be His name!"
        ],
        [
            "He held the highest place above,",
            "Adored by all the sons of flame;",
            "Yet, such His self-denying love,",
            "He laid aside His crown and came",
            "    To seek the lost,",
            "    And, at the cost",
            "Of heavenly rank and earthly fame,",
            "He sought me. Bless\\`ed be His name!"
        ],
        [
            "It was a lonely path He trod,",
            "From every human soul apart;",
            "Known only to Himself and God",
            "Was all the grief that filled His heart;",
            "    Yet from the track",
            "    He turned not back",
            "Till, where I lay in want and shame,",
            "He found me. Bless\\`ed be His name!"
        ],
        [
            "Then dawned at last that day of dread",
            "When, desolate, yet undismayed,",
            "With wearied frame and thorn-crowned head",
            "He, now forsaken and betrayed,",
            "    Went up for me",
            "    To Calvary,",
            "And, dying there in grief and shame,",
            "He saved me. Bless\\`ed be His name!"
        ],
        [
            "Long as I live my soul shall tell",
            "The wonders of His matchless love;",
            "And when at last I rise to dwell",
            "In the bright home prepared above,",
            "    My joy shall be",
            "    His face to see,",
            "And, bowing then with loud acclaim,",
            "I'll praise Him. Bless\\`ed be His name!"
        ]
    ]
})

# 256
H.append({
    'num': 256,
    'meter': '11.11.11.11.',
    'tune': 'CLARENDON STREET',
    'notes': 'Moderately fast',
    'verses': [
        [
            "LORD Jesus, I love Thee, I know Thou art mine,",
            "My rock and my fortress, my surety divine;",
            "My gracious Redeemer, my Saviour art Thou;",
            "'Tis Thou who art worthy, Lord Jesus, 'tis Thou."
        ],
        [
            "I love Thee because Thou hast first lov\\`ed me,",
            "And purchased my pardon on Calv\\`ary's tree;",
            "I love Thee for wearing the thorns on Thy brow;",
            "'Tis Thou who art worthy, Lord Jesus, 'tis Thou."
        ],
        [
            "I will love Thee in life, I will love Thee in death,",
            "And praise Thee as long as Thou lendest me breath,",
            "And say if the death-dew lie cold on my brow,",
            "\" 'Tis Thou who art worthy, Lord Jesus, 'tis Thou.\""
        ],
        [
            "In mansions of glory and endless delight,",
            "I then will adore Thee in regions of light,",
            "And sing with the glitt\\`ering crown on my brow,",
            "\" 'Tis Thou who art worthy, Lord Jesus, 'tis Thou.\""
        ]
    ]
})

# 257
H.append({
    'num': 257,
    'meter': '6.4.6.4. D',
    'tune': 'VERONICA',
    'notes': 'Moderate',
    'verses': [
        [
            "CLING to the Mighty One,",
            "    Cling in thy grief;",
            "Cling to the Holy One,",
            "    He gives relief;",
            "Cling to the gracious One,",
            "    Cling in thy pain;",
            "Cling to the faithful One,",
            "    He will sustain."
        ],
        [
            "Cling to the Living One,",
            "    Cling in thy woe;",
            "Cling to the loving One,",
            "    Through all below;",
            "Cling to the pardoning One,",
            "    He speaketh peace;",
            "Cling to the healing One,",
            "    Anguish shall cease."
        ],
        [
            "Cling to the wounded One,",
            "    Cling to His side;",
            "Cling to the risen One,",
            "    In Him abide;",
            "Cling to the coming One,",
            "    Hope shall arise;",
            "Cling to the reigning One,",
            "    Joy lights thine eyes."
        ]
    ]
})

# 258
H.append({
    'num': 258,
    'meter': '8.5.8.3.',
    'tune': 'BULLINGER',
    'notes': 'Moderate',
    'verses': [
        [
            "ART thou weary, art thou languid,",
            "    Art thou sore distressed?",
            "\"Come to Me,\" saith One, \"and coming,",
            "    Be at rest!\""
        ],
        [
            "Hath He marks to lead me to Him,",
            "    He who is my guide?",
            "In His feet and hands are wound prints,",
            "    And His side."
        ],
        [
            "Hath He diadem, as monarch,",
            "    That His brow adorns?",
            "Yea, a crown in very surety,",
            "    But of thorns."
        ],
        [
            "If my Master close I follow,",
            "    What His guerdon here?",
            "Many a sorrow, many a labour,",
            "    Many a tear."
        ],
        [
            "If I still walk closely with Him,",
            "    What hath He at last?",
            "Sorrow vanquished, labour ended,",
            "    Jordan passed."
        ],
        [
            "If I ask Him to sustain me,",
            "    Will He say me Nay?",
            "Not though earth and not though heaven",
            "    Pass away."
        ],
        [
            "Finding, following, keeping, struggling---",
            "    Is He sure to bless?",
            "Saints, apostles, prophets, martyrs,",
            "    Answer, \"Yes.\""
        ]
    ]
})

# 259
H.append({
    'num': 259,
    'meter': '8.7.8.7.',
    'tune': 'PRECIOUS NAME',
    'notes': 'Moderate',
    'chorus': [
        "Precious name! oh, how sweet!",
        "Hope of earth and joy of heaven."
    ],
    'verses': [
        [
            "TAKE the name of Jesus with you",
            "    In your path of weal and woe;",
            "It will joy and comfort give you,",
            "    Take it then where'er you go."
        ],
        [
            "Take the name of Jesus ever,",
            "    As a shield from every snare.",
            "If temptations round you gather,",
            "    Breathe that holy name in prayer."
        ],
        [
            "Oh, the precious name of Jesus,",
            "    How it thrills our souls with joy!",
            "Let us tell of Him who guards us;",
            "    Let His songs our tongues employ."
        ],
        [
            "At the name of Jesus bowing,",
            "    Falling prostrate at His feet,",
            "King of kings in heaven we'll own Him,",
            "    When our journey is complete."
        ]
    ]
})

# 260
H.append({
    'num': 260,
    'meter': '8.8.8.8.',
    'tune': 'CELESTE',
    'notes': 'Fast',
    'verses': [
        [
            "WE'LL sing of the Shepherd that died,",
            "That died for the sake of the flock;",
            "His love to the utmost was tried,",
            "But firmly endured as a rock."
        ],
        [
            "When blood from a victim must flow,",
            "This Shepherd, by pity, was led",
            "To stand in our place and to know",
            "The suffering and death in our stead."
        ],
        [
            "Our song, then, for ever shall be",
            "Of the Shepherd who gave Himself thus;",
            "No subject's so glorious as He,",
            "Nor theme so affecting to us."
        ],
        [
            "We'd sing of such subjects alone,",
            "None other our tongues should employ,",
            "Till better His love becomes known",
            "In yonder bright regions of joy."
        ]
    ]
})

# 261
H.append({
    'num': 261,
    'meter': '8.8.8.8.8.8.',
    'tune': 'ST. MATTHIAS',
    'notes': 'Moderate',
    'verses': [
        [
            "LORD Jesus, teach us still to keep",
            "Our eyes on Thee, the living way;",
            "That we, once lost and wandering sheep,",
            "From Thee, our Lord, no more may stray;",
            "But wheresoe'er Thou leadest, we",
            "May follow on most cheerfully."
        ],
        [
            "Oh, that we never might forget",
            "What Thou hast suffered for our sake,",
            "To save our souls, and make us meet",
            "In all Thy glory to partake;",
            "But keeping this in sight, press on",
            "To glory and a victor's crown!"
        ],
        [
            "But, gracious Lord, when we reflect",
            "How oft we've turned our eye from Thee,",
            "Have treated Thee with sad neglect",
            "And listened to the enemy;",
            "And yet to find Thee still the same---",
            "'Tis this that humbles us with shame."
        ],
        [
            "Astonished at Thy feet we fall;",
            "Thy love exceeds our highest thought.",
            "Henceforth be Thou our all in all,",
            "Thou, who our souls with blood hast bought.",
            "May we henceforth more faithful prove,",
            "And ne'er forget Thy ceaseless love."
        ]
    ]
})

# 262
H.append({
    'num': 262,
    'meter': 'C. M.',
    'tune': 'CRIMOND',
    'notes': 'Moderate',
    'verses': [
        [
            "THE Lord's my Shepherd, I'll not want;",
            "    He makes me down to lie",
            "In pastures green; He leadeth me",
            "    The quiet waters by."
        ],
        [
            "My soul He doth restore again;",
            "    And me to walk doth make",
            "Within the paths of righteousness,",
            "    E'en for His own name's sake."
        ],
        [
            "Yea, though I walk in death's dark vale,",
            "    Yet will I fear none ill;",
            "For Thou art with me, and Thy rod",
            "    And staff me comfort still."
        ],
        [
            "My table Thou hast furnish\\`ed",
            "    In presence of my foes;",
            "My head Thou dost with oil anoint,",
            "    And my cup overflows."
        ],
        [
            "Goodness and mercy all my life",
            "    Shall surely follow me;",
            "And in God's house for evermore",
            "    My dwelling place shall be."
        ]
    ]
})

# 263
H.append({
    'num': 263,
    'meter': '8.7.8.7.',
    'tune': 'DOMINUS REGIT ME',
    'notes': 'Moderate',
    'verses': [
        [
            "THE King of love my Shepherd is,",
            "    Whose goodness faileth never;",
            "I nothing lack since I am His",
            "    And He is mine for ever."
        ],
        [
            "Where streams of living water flow",
            "    My ransomed soul He leadeth;",
            "And where the verdant pastures grow,",
            "    With food celestial feedeth."
        ],
        [
            "Perverse and foolish oft I strayed,",
            "    But yet in love He sought me,",
            "And on His shoulder gently laid",
            "    And home rejoicing brought me."
        ],
        [
            "In death's dark vale I fear no ill",
            "    With Thee, dear Lord, beside me;",
            "Thy rod and staff my comfort still,",
            "    Thy cross before to guide me."
        ],
        [
            "And so through all the length of days",
            "    Thy goodness faileth never;",
            "Good Shepherd, may I sing Thy praise",
            "    Within God's house for ever."
        ]
    ]
})

# 264
H.append({
    'num': 264,
    'meter': '11.11.11.11.',
    'tune': 'PROVIDENCE',
    'notes': 'Moderately fast',
    'verses': [
        [
            "JEHOVAH'S my Shepherd, no want shall I know,",
            "He maketh me lie down where green pastures grow;",
            "Beside the still waters He tenderly guides;",
            "My soul He restoreth by things He provides."
        ],
        [
            "He leadeth me then, for the sake of His name,",
            "In paths that are righteous, to walk in the same;",
            "E'en though through the valley, death's shadow, I tread,",
            "Because Thou art with me no ill will I dread."
        ],
        [
            "Thou comfortest me by Thy rod and Thy staff;",
            "With enemies nigh me, Thou, on my behalf,",
            "Preparest a table. Then doest Thou more---",
            "My head Thou anointest; my cup runneth o'er."
        ],
        [
            "I've nought, all the days of my life, to repine,",
            "Since goodness and mercy shall surely be mine;",
            "The house of Jehovah my dwelling shall be",
            "Both now and for ever. Praise be unto Thee."
        ]
    ]
})

# 265
H.append({
    'num': 265,
    'meter': 'C. M. D.',
    'tune': 'RECOMPENSE',
    'notes': 'Moderate',
    'verses': [
        [
            "OUR Lord His glory laid aside,",
            "    That He had known with God,",
            "Then came to earth as man and died",
            "    To cleanse us by His blood.",
            "Good Shepherd He, stray sheep He sought,",
            "    Stooped low and suffered loss;",
            "He bore the hiding of God's face,",
            "    A curse upon the cross."
        ],
        [
            "He's risen now, and lives on high,",
            "    Again He's glorified;",
            "And ever liveth there to save",
            "    His sheep for whom He died.",
            "As Shepherd Great, with crook in hand,",
            "    He tends them all with care;",
            "E'en through death's shadow, and midst foes,",
            "    He's present with them there."
        ],
        [
            "Soon, as Chief Shepherd, He will come",
            "    His loved ones home to take,",
            "When those who've served shall have reward,",
            "    Who wrought for His name's sake.",
            "Crowned King of glory then He'll be,",
            "    And Lord of Hosts beside;",
            "For Him the heads of lasting doors,",
            "    And gates will open wide."
        ],
        [
            "The Shepherd thus, Good, Great, and Chief,",
            "    By cross, and crook, and crown,",
            "Salvation threefold will have wrought",
            "    For those He calls His own.",
            "Our God, we're longing for that day",
            "    To see the Shepherd King,",
            "Who, with all gathered saints at home,",
            "    Will lead the song they sing."
        ]
    ]
})

# 266
H.append({
    'num': 266,
    'meter': '11.11.11.11.',
    'tune': 'GOSHEN',
    'notes': 'Moderately fast',
    'verses': [
        [
            "JESUS is our Shepherd, wiping every tear;",
            "Folded in His bosom, what have we to fear?",
            "Only let us follow whither He doth lead,",
            "To the thirsty desert or the dewy mead."
        ],
        [
            "Jesus is our Shepherd, well we know His voice;",
            "How its gentlest whisper makes our heart rejoice!",
            "Even when He chideth, tender is His tone;",
            "None but He shall guide us. We are His alone."
        ],
        [
            "Jesus is our Shepherd, for His sheep He bled;",
            "Every lamb is sprinkled with the blood He shed;",
            "Then on each He setteth His own secret sign,",
            "\"They that have My Spirit, these,\" saith He, \"are Mine.\""
        ],
        [
            "Jesus is our Shepherd, guarded by His arm,",
            "Though the wolves may ravin, none can do us harm.",
            "Should we tread death's valley, dark with fearful gloom,",
            "We will fear no evil, victors o'er the tomb."
        ],
        [
            "Jesus is our Shepherd, with His goodness now",
            "And His tender mercy, He doth us endow;",
            "Let us sing His praises with a gladsome heart,",
            "Very soon we'll meet Him, never more to part."
        ]
    ]
})

print(f"Total hymns collected: {len(H)}")
assert len(H) == 64, f"Expected 64 hymns, got {len(H)}"
assert [h['num'] for h in H] == list(range(203, 267)), "Hymn numbers mismatch"

# Write out section_10_data.py
import pprint
out_path = r"E:\Hymn treatment\section_10_data.py"
with open(out_path, "w", encoding="utf-8") as f:
    f.write("# section_10_data.py\n")
    f.write("# Pristine, verified data for Section 10: OUR LORD JESUS CHRIST (Hymns 203 to 266)\n")
    f.write("# Verified against scans p-042.png to p-095.png\n\n")
    f.write("SECTION_10_HYMNS = ")
    f.write(pprint.pformat(H, indent=4, width=120))
    f.write("\n")

print("Wrote section_10_data.py successfully!")
