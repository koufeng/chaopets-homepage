// English translations.
// 标记为 TODO(brand) 的文案是诗意/品牌核心句子，机翻为草稿，请由品牌方/英文文案润色。

const dict = {
  brand: {
    name: "Wǔ Xíng Beasts",
    nameLatin: "Wǔ Xíng Beasts",
    tagline: "A breathing oriental-fantasy digital sanctuary",
    slogan: "Call with sincerity, and the spirit will appear.", // TODO(brand): refine
    publisher: "by Shanhaiji",
  },

  meta: {
    homeTitle: "Wǔ Xíng Beasts · A breathing oriental-fantasy digital sanctuary",
    homeDesc:
      "Metal · Wood · Water · Fire · Earth, plus Xuan, Yao, Hundun. Eight elemental beasts hidden between heaven and earth, awaiting their bond with your fate. Take the Resonance ritual to find your guardian.",
    originTitle: "Origin · Call with sincerity, and the spirit will appear",
    originDesc:
      "When heaven and earth first parted, the five qi—Metal, Wood, Water, Fire, Earth—gave rise to all things. When the stars cross and the spirit veins tremble, the beasts hidden among the elements awaken.",
    beastsTitle: "Archive · The Codex of Eight Spirits",
    beastsDesc:
      "Five beasts carrying the source of the five elements, three drifting between yin and yang. Open any one to read its story fragments and discover its sensory easter eggs.",
    seriesTitle: "Ancient Spirits, Reborn · Debut Series",
    seriesDesc:
      "The debut series centers on the eight Wǔ Xíng Beasts: 5 standard + 3 hidden. Soft fur, expressive faces, sealed inside a blind box.",
    resonanceTitle: "Resonance · Find your guardian",
    resonanceDesc:
      "Three ancient sigils, forty-two seconds. We will summon your guardian beast and create a personal share card for you.",
    notFoundTitle: "Lost · 404",
    notFoundDesc: "This page does not exist · but the beasts are still waiting between the five elements.",
  },

  nav: {
    home: "Home",
    origin: "Origin",
    beasts: "Archive",
    series: "Series",
    resonance: "Resonance",
    homeAria: "Wǔ Xíng Beasts home",
    primaryAria: "Primary navigation",
    mobileToggleOpen: "Open menu",
    mobileToggleClose: "Close menu",
    headerCta: "Resonance",
    switcherAria: "Switch language",
  },

  footer: {
    explore: "Explore",
    resonate: "Resonate",
    company: "Company",
    homeLink: "Five Qi in Flow",
    originLink: "Origin Tale",
    beastsLink: "Archive",
    seriesLink: "Ancient Spirits, Reborn",
    resonanceLink: "Resonance ritual",
    purchaseLink: "Buy a blind box ↗",
    xhsLink: "Xiaohongshu ↗",
    weiboLink: "Weibo ↗",
    emailLink: "Partnerships",
    rights: "by Shanhaiji",
    rightsPrefix: "© {year} Wǔ Xíng Beasts · ",
    nowLabel: "Now",
  },

  home: {
    eyebrow: "Wǔ Xíng Beasts · by Shanhaiji",
    titleParts: ["Wǔ", "Xíng", "Beasts"], // TODO(brand): keep romanized or replace with "Five", "Element", "Beasts"
    sub: "Five qi take form. The spirits resonate.",
    tag: "Metal · Wood · Water · Fire · Earth, with Xuan, Yao, Hundun.",
    tag2: "Eight elemental beasts wait to bond with your fate.",
    ctaPrimary: "Resonance · find your guardian",
    ctaArchive: "Open the Archive",
    hintNow: "Now ·",
    hintFlow: "Five Qi flowing",
    scroll: "Scroll · enter the tale",

    heroLabel: "BEAST",
    heroExplore: "EXPLORE ALL",
    heroPrev: "Previous",
    heroNext: "Next",
    heroSocial: "@shanhaiji",
    heroFiltersAll: "Five Qi",
    heroFiltersTrio: "Three Forms",
    heroCopyright: "© {year} Wǔ Xíng Beasts · by Shanhaiji",

    originEyebrow: "Prologue · Origin",
    originTitle: "Heaven parts. Five qi take form.", // TODO(brand): refine
    originDesc:
      "In ancient times, the five qi—Metal, Wood, Water, Fire, Earth—gave rise to all things. When the stars cross and the spirit veins tremble, the beasts hidden among the elements awaken, settling into the seals of mortals to bond with their fates.",
    originVow: "“Call with sincerity, and the spirit will appear.”", // TODO(brand): refine
    originMeta:
      "They are small and soft to the touch, yet each carries the source of an element. Shanhaiji and ancient codex scholars have unsealed their record—now these millennium-old spirits return to the human world.",
    originMore: "Read the full origin",

    archiveEyebrow: "Archive · Codex of Eight",
    archiveTitle: "Five pillars of qi. Three drifting forms.",
    archiveDesc:
      "Five beasts carrying the source of the elements, and three drifting between yin and yang. Open any one to meet it face to face.",
    archiveTrioDivider: "Three Forms",
    archiveAll: "Open the full Archive →",

    seriesEyebrow: "Debut Series · Ancient Spirits, Reborn",
    seriesTitle: "Hold the millennium-old spirits in your palm.", // TODO(brand): refine
    seriesDesc:
      "The debut series centers on the eight beasts: soft fur, expressive faces, sealed inside a blind box. Each carries its own elemental sigil and signature line.",
    seriesPoints: [
      "5 standard + 3 hidden + 1 super-rare",
      "Display piece · keychain · car charm · multi-scene companion",
      "Future-ready for the AI companion app and interactive comic",
    ],
    seriesCtaPrimary: "Open a box on lulumart",
    seriesCtaSecondary: "Learn the series",
    seriesCaption: "Ancient Spirits, Reborn · Eight Gathered",

    finalEyebrow: "Resonance · A reading",
    finalTitle: "Which spirit shares your frequency?",
    finalTag:
      "Three ancient sigils, forty-two seconds. We will summon your guardian beast and craft a personal share card for you.",
    finalCta: "Summon my guardian",
  },

  origin: {
    eyebrow: "Origin · Origin Tale",
    introTitle: ["Heaven and earth parted.", "The five qi took form."], // TODO(brand): refine cadence
    intro:
      "In a time before time, heaven and earth were one—chaotic as an egg. Then a cracking sound: the clear rose to become the sky, the heavy fell to become the earth, and between them moved a primordial breath we call wǔ xíng, the five qi.",

    fiveQiEyebrow: "Volume One · The Five Qi",
    fiveQiTitle: "Metal · Wood · Water · Fire · Earth.",
    fiveQiDesc:
      "Metal hides its edge in softness. Wood spreads through every field. Water flows close to all warmth and cold. Fire burns brief and bright. Earth holds the deepest weight, where everything returns. When the stars cross and the spirit veins tremble, these five take form.",
    fiveQiList: [
      { c: "Metal", t: "Edge",   d: "Edge hidden in softness" },
      { c: "Wood",  t: "Growth", d: "Spreads through every field" },
      { c: "Water", t: "Yield",  d: "Closest to warmth and cold" },
      { c: "Fire",  t: "Blaze",  d: "Brief and bright" },
      { c: "Earth", t: "Hold",   d: "Where all things return" },
    ],

    callingEyebrow: "Volume Two · The Pact",
    callingTitle: "Call with sincerity, and the spirit will appear.", // TODO(brand): refine
    callingVow1: "Where the heart is true, the five qi gather into a small beast,",
    callingVow2: "settling into the seals of mortals to bond with their fates.",
    callingMeta: [
      "They are small. They are soft.",
      "Each carries the source of an element.",
      "They can hear what is deepest in you.",
    ],

    trioEyebrow: "Volume Three · Three Forms",
    trioTitle: "Yin · Yang · Hundun.",
    trioDesc:
      "Beyond the five elements, three forms drift between yin and yang: Xuan, Yao, and Hundun. They belong to no element, yet they live within them all.",
    trioCards: [
      { name: "Xuan",   tag: "Yin · Inward",       desc: "The night runs deep, and the night understands. Born where every lamp goes out, it hears what you keep deepest." },
      { name: "Yao",    tag: "Yang · Manifest",    desc: "It awakens in the first thread of dawn, illuminating everything that wishes to be seen." },
      { name: "Hundun", tag: "Unbound · All-form", desc: "Before heaven and earth divided, the five qi rested in a single body. It is that body." },
    ],

    unsealEyebrow: "Final Volume · Unsealed",
    unsealTitle: "Crossing a thousand years, returning to the human world.",
    unsealDesc:
      "Shanhaiji and ancient codex scholars have unsealed the record. These millennium-old spirits now return to you, soft and small. They remember you.",
    unsealCtaPrimary: "Open the Archive · meet them",
    unsealCtaSecondary: "Take a Resonance first →",
  },

  beasts: {
    eyebrow: "Archive · Codex of Eight",
    title: "They hide among the five elements, waiting to be recognized.",
    desc:
      "Each beast has its own elemental sigil, signature line, and emotional spectrum. Open any card to meet it face to face and listen to its story fragments.",
    filterAll: "All · 8",
    filterWuxing: "Five Elements · 5",
    filterSpecial: "Three Forms · 3",
    groupWuxing: "Five Elements · Five Pillars of Qi",
    groupSpecial: "Three Forms · Beyond Yin and Yang",
    groupDivider: "Three Forms",
  },

  beast: {
    archive: "Archive",
    element: "Element",
    emotion: "Resonance",
    hour: "Hour",
    sigPrefix: "“",
    sigSuffix: "”",
    storyPrologue: "Volume One · Prologue",
    rotateHint: "↻ Move the cursor · it will meet your eyes",
    ctaResonance: "Summon my guardian",
    ctaPurchase: "Find it · open a box on lulumart ↗",
    navPrev: "Previous",
    navNext: "Next",
    navBack: "Back to Archive",
  },

  series: {
    eyebrow: "Debut Series · Ancient Spirits, Reborn",
    title: "Eight gathered, sealed in a box.",
    desc:
      "Ancient Spirits, Reborn is the first physical series of the Wǔ Xíng Beasts. It hides millennium-old spirits inside a small blind box—the moment you open it is the moment you meet them.",
    bullets: [
      "5 standard · Metal, Wood, Water, Fire, Earth",
      "3 hidden · Xuan, Yao, Hundun",
      "Each carries its own elemental sigil and signature line",
      "Future-ready for the AI companion app and interactive comic",
    ],
    ctaPrimary: "Open a box on lulumart",
    ctaSecondary: "Read the Archive first",
    lineupEyebrow: "Lineup · The Roster",
    lineupTitle: "8 spirits · 8 ways to resonate.",
    lineupDesc: "Tap any one to enter its dedicated archive.",
    futureEyebrow: "Coming Soon · Online Box Machine",
    futureTitle1: "The feel of shaking a box,",
    futureTitle2: "soon faithfully recreated here.",
    futureTag1: "Shake · weigh · peek · full-screen reveal. The online box machine is in the works.",
    futureTag2: "Until then, open your first one on lulumart.",
    futureCta: "Open a box on lulumart ↗",
    caption: "Ancient Spirits, Reborn · Eight Gathered",
  },

  resonance: {
    eyebrow: "Resonance · Resonance",
    title: "Three ancient sigils · find your guardian",
    subtitle: "Answer with intuition.",
    progressLabel: "Progress",
    backStep: "← Previous sigil",
    resultEyebrow: "Your guardian · Resonance complete",
    resultDownload: "Download share card · PNG",
    resultCopy: "Copy personal link",
    resultCopied: "Copied ✓",
    resultArchive: "View full archive →",
    resultRetake: "Take it again",
    cardWatermark: "WǓ XÍNG BEASTS · Resonance",
  },

  notFound: {
    eyebrow: "404 · Lost between the five elements",
    title: "This page does not exist · but the spirits are still waiting.",
    meta: "Sometimes the wrong road is the start of another one.",
    ctaPrimary: "Back to Five Qi in Flow",
    ctaSecondary: "Open the Archive",
  },
} as const;

export default dict;
