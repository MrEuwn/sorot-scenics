export const LIGHTING_CUES = [
  {
    id: 'vermilion',
    code: '01',
    name: 'VERMILION ARENA',
    shortName: 'Vermilion Arena',
    director: 'Rendra · Lead LD',
    reelCaption: '0.00ms lock',
    reelImage: './media/concert-crowd.jpg',
    polarity: 'vermilion',
    heroBg: '#D9381E',
    heroInk: '#FFFFFF',
    heroSecondaryInk: '#111214',
    accentHex: '#FF573B',
    spec: '3200K TUNGSTEN + 6500K BEAM',
    lumens: '148,000 LM',
    dmx: '512 CH · UNIVERSE 01-08',
    rigLoad: '14.2 TONS',
    timecodeStart: '01:14:22:08',
    description:
      'High-output Signal Vermilion arena keylight rig with beveled borosilicate Fresnel prisms and tight specular rim wash.',
  },
  {
    id: 'daylight',
    code: '02',
    name: 'DAYLIGHT GALLERY',
    shortName: 'Daylight Gallery',
    director: 'Mei-Ling · Optics',
    reelCaption: 'CRI 98+ pure',
    reelImage: './media/neon-pavilion.jpg',
    polarity: 'light',
    heroBg: '#ECEAE4',
    heroInk: '#111214',
    heroSecondaryInk: '#D9381E',
    accentHex: '#D9381E',
    spec: '5600K MUSEUM CRI 98+',
    lumens: '84,000 LM',
    dmx: '256 CH · UNIVERSE 01-04',
    rigLoad: '6.8 TONS',
    timecodeStart: '02:08:41:16',
    description:
      'Architectural studio daylight calibration using optical glass prisms, sky-bay diffusers, and silver chamfer refraction.',
  },
  {
    id: 'chiaroscuro',
    code: '03',
    name: 'CHIAROSCURO RIG',
    shortName: 'Chiaroscuro Rig',
    director: 'Kenji · Broadcast',
    reelCaption: '25kHz HDR',
    reelImage: './media/ballroom-optics.jpg',
    polarity: 'dark',
    heroBg: '#0E1015',
    heroInk: '#FFFFFF',
    heroSecondaryInk: '#29DAFF',
    accentHex: '#29DAFF',
    spec: '8200K LASER EDGE + ICE RIM',
    lumens: '210,000 LM',
    dmx: '1024 CH · UNIVERSE 01-16',
    rigLoad: '18.6 TONS',
    timecodeStart: '03:42:09:24',
    description:
      'Carbon Obsidian broadcast blackout cue driven by dichroic ice-cyan edge lasers and zero-drift SMPTE timecode lock.',
  },
];

export const STAGE_WORKS = [
  {
    id: 'monolith-jakarta',
    title: 'ISTORA SYMPHONY ARENA',
    tag: 'Arena Tour',
    client: 'Nusantara Live · Jakarta',
    year: '2026',
    dmx: '640 DMX CH',
    lumens: '185K LUMENS',
    rigLoad: '16.4T RIG',
    image: './media/concert-crowd.jpg',
    cropPos: '50% 42%',
    alt: 'Monumental overhead truss rig projecting synchronized architectural light beams across a packed live arena',
    summary:
      '14-meter motorized overhead truss with 96 synced narrow-beam fixtures and custom borosilicate Fresnel prisms running at 60fps timecode lock.',
  },
  {
    id: 'solaris-laser',
    title: 'ARIAKE DICHROIC DOME',
    tag: 'Kinetic Rig',
    client: 'Tokyo Broadcast Unit',
    year: '2026',
    dmx: '960 DMX CH',
    lumens: '240K LUMENS',
    rigLoad: '19.0T RIG',
    image: './media/ballroom-optics.jpg',
    cropPos: '50% 50%',
    alt: 'Crisp cyan and sapphire geometric laser beams fanning across a dark architectural concert hall',
    summary:
      'Full-arena optical laser lattice synchronized with live camera tracking and overhead mirror pods sculpting architectural light planes.',
  },
  {
    id: 'sant-pau-optics',
    title: 'BIENNALE REFRACTION FACADE',
    tag: 'Projection',
    client: 'Light Forum · Barcelona',
    year: '2025',
    dmx: '384 DMX CH',
    lumens: '140K LUMENS',
    rigLoad: '7.4T RIG',
    image: './media/projection-pavilion.jpg',
    cropPos: '50% 35%',
    alt: 'Heritage architectural facade drenched in vermilion light with precision geometric projection mapping at night',
    summary:
      'Sub-millimeter architectural projection mapping across 62 meters of heritage stonework with calibrated weatherproof laser projectors.',
  },
  {
    id: 'konzerthaus-console',
    title: 'KRAFTWERK COMMAND DECK',
    tag: 'Timecode XR',
    client: 'Berlin Spatial Stage',
    year: '2026',
    dmx: '1024 DMX CH',
    lumens: '95K LUMENS',
    rigLoad: '9.5T RIG',
    image: './media/foh-grandma.jpg',
    cropPos: '52% 48%',
    alt: 'Lighting director operating an illuminated dual-screen front-of-house DMX console displaying live 3D stage pre-visualization',
    summary:
      'Redundant dual-fiber grandMA3 console architecture and custom SMPTE LTC distribution engineered for zero-frame drift across 16 universes.',
  },
  {
    id: 'lumina-domes',
    title: 'ESPLANADE HEMISPHERE HALL',
    tag: 'Pavilion',
    client: 'National Gallery · Singapore',
    year: '2025',
    dmx: '480 DMX CH',
    lumens: '120K LUMENS',
    rigLoad: '6.2T RIG',
    image: './media/light-sculpture.jpg',
    cropPos: '50% 50%',
    alt: 'Architectural glowing translucent hemisphere light domes calibrated in a dark museum exhibition gallery',
    summary:
      'Custom-molded frosted optical hemisphere arrays powered by CRI 98+ dimmable LED drivers reacting subtly to visitor acoustics.',
  },
  {
    id: 'meridian-broadcast',
    title: 'MERIDIAN 8K LIVE AWARDS',
    tag: 'Broadcast',
    client: 'APAC Television · Jakarta',
    year: '2026',
    dmx: '720 DMX CH',
    lumens: '165K LUMENS',
    rigLoad: '15.8T RIG',
    image: './media/concert-camera.jpg',
    cropPos: '48% 45%',
    alt: 'Live broadcast framing capturing symmetrical overhead beam lines with embedded timecode overlay in a concert arena',
    summary:
      'Camera-calibrated illumination and flicker-free 25kHz PWM beam arrays engineered specifically for live 8K HDR global broadcast switchers.',
  },
  {
    id: 'linear-gallery',
    title: 'KUNSTHALLE LIGHT CORRIDOR',
    tag: 'Architecture',
    client: 'Museum Wing · Berlin',
    year: '2025',
    dmx: '312 DMX CH',
    lumens: '78K LUMENS',
    rigLoad: '4.8T RIG',
    image: './media/neon-pavilion.jpg',
    cropPos: '50% 55%',
    alt: 'Minimalist architectural gallery corridor illuminated by linear sculptural light tubes',
    summary:
      'Suspended anodized optical louvers and tunable daylight tubes programmed to follow solar elevation across museum galleries.',
  },
  {
    id: 'zenith-finale',
    title: 'ZENITH STADIUM FINALE',
    tag: 'Live Finale',
    client: ' Marina Bay Bowl · Singapore',
    year: '2026',
    dmx: '1536 DMX CH',
    lumens: '310K LUMENS',
    rigLoad: '24.5T RIG',
    image: './media/concert-crowd.jpg',
    cropPos: '65% 22%',
    alt: 'High-elevation stadium roof truss firing concentrated white and vermilion searchlight columns into the night sky',
    summary:
      'Thirty-two universes of weather-sealed IP65 sky-trackers and counterweighted scenic portals synchronized to live symphonic stems.',
  },
];

export const MARQUEE_TOKENS = [
  'SINCE 2016',
  'TUV BGV-C1',
  '5.0 DIRECTOR RATING',
  '+140 LIVE ARENAS',
  '94% REPEAT TOURS',
  '0.00MS SMPTE LOCK',
];

export const DISCIPLINES = [
  {
    id: 'arena-scenography',
    index: '01',
    title: 'ARENA SCENOGRAPHY',
    titleId: 'SKENOGRAFI ARENA',
    spec: '360° SIGHTLINES · 180K+ LUMENS',
    summary:
      'Full spatial direction for 10,000 to 65,000 seat arenas, unifying scenic steelwork, beveled Fresnel optics, and touring pack-down speed.',
    image: './media/concert-crowd.jpg',
    alt: 'Wide overhead concert truss projecting symmetrical golden-white beam arrays',
  },
  {
    id: 'kinetic-rigging',
    index: '02',
    title: 'KINETIC RIGGING',
    titleId: 'RIGGING KINETIK',
    spec: 'BGV-C1 WINCHES · 0.5MM POSITIONING',
    summary:
      'Automated multi-axis hoists, counterweighted glass prism louvers, and sculpted gantries that reshape venue architecture mid-song.',
    image: './media/ballroom-optics.jpg',
    alt: 'Collimated cyan laser beams cutting crisp geometry across an arena ceiling',
  },
  {
    id: 'broadcast-visuals',
    index: '03',
    title: 'BROADCAST OPTICS',
    titleId: 'OPTIK BROADCAST',
    spec: 'FLICKER-FREE 25KHZ · REC.2020',
    summary:
      'Camera-calibrated keylight, anti-moire LED fascia architecture, and studio look-dev built specifically for live global television sensors.',
    image: './media/concert-camera.jpg',
    alt: 'Broadcast live monitor capturing symmetrical arena beam geometry with timecode',
  },
  {
    id: 'museum-pavilions',
    index: '04',
    title: 'MUSEUM PAVILIONS',
    titleId: 'PAVILIUN MUSEUM',
    spec: 'CRI 98+ OPTICS · FACADE MAPPING',
    summary:
      'Permanent and biennial architectural light installations pairing custom beveled optics with sub-millimeter stone projection mapping.',
    image: './media/neon-pavilion.jpg',
    alt: 'Minimalist architectural gallery corridor illuminated by linear sculptural light fixtures',
  },
  {
    id: 'realtime-dmx-xr',
    index: '05',
    title: 'REALTIME DMX + XR',
    titleId: 'DMX REALTIME + XR',
    spec: '16 UNIVERSES · SUB-FRAME TRACKING',
    summary:
      'Live MA3 console programming, interactive 3D pre-vis twins, and camera-tracked XR stages where physical fixtures react to shaders live.',
    image: './media/foh-grandma.jpg',
    alt: 'Front-of-house lighting console operator managing live DMX universes in 3D pre-vis',
  },
];

export const SPHERE_SCREENS = [
  { image: './media/concert-crowd.jpg', cue: 'CUE 01', tc: '01:04:12' },
  { image: './media/ballroom-optics.jpg', cue: 'CUE 04', tc: '01:18:09' },
  { image: './media/projection-pavilion.jpg', cue: 'CUE 07', tc: '01:29:44' },
  { image: './media/foh-grandma.jpg', cue: 'CUE 11', tc: '01:42:00' },
  { image: './media/light-sculpture.jpg', cue: 'CUE 15', tc: '02:03:18' },
  { image: './media/concert-camera.jpg', cue: 'CUE 19', tc: '02:17:51' },
  { image: './media/neon-pavilion.jpg', cue: 'CUE 22', tc: '02:34:06' },
];

export const RESOURCE_CARDS = [
  {
    id: 'res-1',
    type: 'Technical Note',
    typeId: 'Catatan Teknis',
    date: '12/01/2026',
    variant: 'dark',
    title: '25KHZ PWM & ZERO-FLICKER 8K BROADCAST OPTICS!',
    titleId: 'PWM 25KHZ & OPTIK SIARAN 8K TANPA FLICKER!',
  },
  {
    id: 'res-2',
    type: 'Case Dossier',
    typeId: 'Studi Panggung',
    date: '18/03/2026',
    variant: 'dark',
    title: 'ISTORA 16-TON KINETIC TRUSS LOAD-IN',
    titleId: 'LOAD-IN TRUSS KINETIK 16 TON ISTORA',
  },
  {
    id: 'res-3',
    type: 'White Paper',
    typeId: 'Buku Panduan',
    date: '27/01/2026',
    variant: 'book',
    title: 'MASTERING SMPTE LTC & MA3 FIBER RINGS',
    titleId: 'PANDUAN RING FIBER SMPTE LTC & MA3',
  },
];

export const STANDARDS_FLYING_CARDS = [
  {
    id: 'cert-1',
    iconType: 'stars',
    title: '5.0 SHOW DIRECTOR RATING',
    titleId: '5.0 PENILAIAN SUTRADARA PANGGUNG',
    badge: 'Simulated Benchmark 2026 [Hypothesis]',
    badgeId: 'Tolok Ukur Simulasi 2026 [Hypothesis]',
    offsetX: '14%',
    tilt: 2.8,
  },
  {
    id: 'cert-2',
    iconType: 'iso',
    title: 'CERTIFIED EN 17206 & DIN BGV-C1 RIGGING',
    titleId: 'SERTIFIKASI RIGGING EN 17206 & DIN BGV-C1',
    badge: 'Structural Rigging 2026',
    badgeId: 'Standar Struktur 2026',
    offsetX: '-15%',
    tilt: -3.2,
  },
  {
    id: 'cert-3',
    iconType: 'smpte',
    title: 'SMPTE ST 2110 & DUAL-FIBER MA3 LOCK',
    titleId: 'KUNCI FIBER GANDA SMPTE ST 2110 & MA3',
    badge: 'Since 2019',
    badgeId: 'Sejak 2019',
    offsetX: '10%',
    tilt: 2.1,
  },
];

export const CLIENT_REVIEWS = [
  {
    id: 'rev-1',
    badge: 'NL',
    badgeBg: '#111214',
    name: 'Rendra K.',
    role: 'Executive Show Director',
    quote:
      'SOROT walked into a 14,000-seat hall with tight roof weight limits and delivered the sharpest architectural beam rig we have ever put on camera. Load-in finished four hours ahead of cue rehearsal.',
  },
  {
    id: 'rev-2',
    badge: 'ES',
    badgeBg: '#D9381E',
    name: 'Mei-Ling T.',
    role: 'Head of Technical Production',
    quote:
      'Their 3D pre-visualization twin matched the live Fresnel refraction down to the exact beam angle. Every symphonic cue locked to the millisecond without a single flicker artifact on our 4K feed.',
  },
  {
    id: 'rev-3',
    badge: 'TY',
    badgeBg: '#0B5FFF',
    name: 'Kenji H.',
    role: 'Live Broadcast Director',
    quote:
      'Few scenography studios truly understand camera sensors. SOROT balanced intense vermilion arena drama with clean keylight skin fidelity so our live switcher needed zero emergency color grading.',
  },
  {
    id: 'rev-4',
    badge: 'BL',
    badgeBg: '#1D222B',
    name: 'Anja B.',
    role: 'Curator of Spatial Media',
    quote:
      'Their beveled optical glass louvers turned raw industrial steel into a living optical instrument. Visitors stayed for hours watching the light geometry shift across the hall.',
  },
  {
    id: 'rev-5',
    badge: 'MT',
    badgeBg: '#B72A13',
    name: 'Diego V.',
    role: 'Tour Production Manager',
    quote:
      'Twenty-two cities, zero dropped DMX universes, and truck-pack engineering that genuinely respects crew turnaround windows. SOROT designs spectacles built for real touring.',
  },
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'How does a stage collaboration with SOROT unfold from brief to show night?',
    questionId: 'Bagaimana alur kolaborasi panggung bersama SOROT sejak brief hingga malam pertunjukan?',
    answer:
      'Every project moves through four locked gates: architectural & camera brief, structural CAD + finite-element weight plot, interactive real-time 3D pre-visualization wired to our MA3 desk, and on-site fiber commissioning + show-calling.',
    answerId:
      'Setiap produksi melewati empat tahap terkunci: brief arsitektur & kamera, gambar kerja struktur CAD + beban atap, pra-visualisasi 3D real-time terhubung ke konsol MA3, serta instalasi fiber & show-calling di lokasi.',
  },
  {
    id: 'faq-2',
    question: 'What should we send you to receive an accurate rigging & lighting quote quickly?',
    questionId: 'Apa saja data yang perlu dikirim agar kami mendapat estimasi rigging & lampu dengan cepat?',
    answer:
      'Send your venue DWG/PDF ceiling grid (or city + capacity if unconfirmed), target load-in dates, and whether broadcast cameras are filming. We return a preliminary rig concept and budget envelope within 48 hours.',
    answerId:
      'Cukup kirimkan denah plafon gedung DWG/PDF (atau kota + kapasitas penonton), jadwal load-in, serta kebutuhan kamera siaran. Kami mengirimkan konsep awal rigging dan estimasi anggaran dalam 48 jam.',
  },
  {
    id: 'faq-3',
    question: 'Which types of productions and venues do you engineer stages for?',
    questionId: 'Jenis produksi dan gedung apa saja yang biasa ditangani oleh studio SOROT?',
    answer:
      'We design for stadium & arena music tours, televised awards broadcasts, symphony halls, brand keynote arenas, museum light pavilions, and architectural projection facades across Asia-Pacific and Europe.',
    answerId:
      'Kami merancang panggung untuk tur konser arena & stadion, siaran langsung penghargaan televisi, gedung simfoni, keynote peluncuran produk, paviliun cahaya museum, hingga pemetaan fasad arsitektur.',
  },
  {
    id: 'faq-4',
    question: 'What are your typical lead times from concept sign-off to venue load-in?',
    questionId: 'Berapa lama waktu pengerjaan ideal sejak konsep disetujui hingga load-in?',
    answer:
      'Custom kinetic hoists and bespoke beveled glass louvers require 8 to 12 weeks. Touring adaptations or broadcast lighting direction utilizing local rental inventories can be pre-visualized and showfile-ready in 2 to 3 weeks.',
    answerId:
      'Rigging kinetik kustom dan fabrikasi kisi kaca bevel memerlukan 8 hingga 12 minggu. Untuk adaptasi tur atau tata cahaya siaran memakai inventaris vendor lokal, pra-visualisasi dan showfile siap dalam 2 hingga 3 minggu.',
  },
  {
    id: 'faq-5',
    question: 'How do you structure production pricing and touring day-rates?',
    questionId: 'Bagaimana skema biaya desain skenografi dan dukungan teknis tur dihitung?',
    answer:
      'We separate creative-technical design + 3D pre-vis into a fixed transparent studio fee, while specialty optics, kinetic winches, and touring crew days are itemized at zero-surprise line-item rates.',
    answerId:
      'Biaya desain kreatif-teknis dan pra-visualisasi 3D ditetapkan secara transparan di awal, sedangkan fabrikasi optik khusus, winch kinetik, dan kru show-calling dirinci per item tanpa biaya tersembunyi.',
  },
  {
    id: 'faq-6',
    question: 'How do you protect unreleased stage designs, setlists, and broadcast embargoes?',
    questionId: 'Bagaimana SOROT menjaga kerahasiaan desain panggung, setlist, dan materi peluncuran?',
    answer:
      'All CAD plots, pre-vis renders, timecode audio stems, and run-of-show scripts live on air-gapped studio storage under strict mutual NDA, with watermarked review links expiring immediately after rehearsal sign-off.',
    answerId:
      'Seluruh file CAD, render pre-vis, audio timecode, dan naskah acara disimpan pada penyimpanan terisolasi berikat NDA ketat, dengan tautan review ber-watermark yang otomatis kedaluwarsa seusai gladi bersih.',
  },
  {
    id: 'faq-7',
    question: 'Can we walk the stage cues in 3D before paying for arena rehearsal hours?',
    questionId: 'Bisakah sutradara meninjau seluruh cue lampu secara 3D sebelum sewa hari latihan gedung?',
    answer:
      'Yes. Our interactive 3D stage twin runs live DMX universes at 60fps so show directors and camera operators can approve every angle and transition in our studio or remotely before trucks roll.',
    answerId:
      'Tentu. Kembaran panggung 3D kami menjalankan sinyal DMX 60fps secara langsung sehingga sutradara acara dan tim kamera dapat menyetujui setiap sudut sorot sebelum truk produksi berangkat.',
  },
  {
    id: 'faq-8',
    question: 'Do you guarantee flicker-free performance on slow-motion broadcast cameras?',
    questionId: 'Apakah tata cahaya SOROT dijamin bebas kedip (flicker-free) pada kamera slow-motion?',
    answer:
      'Every broadcast rig specifies 25kHz high-frequency PWM drivers and undergoes physical shutter-angle testing prior to show day so 120fps replays and HDR feeds remain razor-clean.',
    answerId:
      'Setiap rig siaran wajib memakai driver PWM frekuensi tinggi 25kHz dan diuji langsung terhadap sudut rana kamera sebelum hari-H agar tayangan ulang 120fps maupun feed HDR tetap bersih.',
  },
];

export const UI_COPY = {
  en: {
    menuBtn: 'Menu',
    closeBtn: 'Close',
    ctaTop: 'Request a Quote',
    heroBlockLeft: ['GREAT STAGES', 'SHAPE THE', 'FUTURE'],
    heroBlockRight: ['WHEN LIGHT', 'COMMANDS', 'EVERY CUE'],
    heroThesis:
      'SOROT® : the independent BGV-C1 certified scenography studio transforming architectural light into a decisive live impact instrument for arenas and broadcasts',
    taglineTitle:
      'Our kinetic stage studio amplifies the emotional scale of flagship productions for visionary directors. We equip teams ready to move audiences across every live discipline',
    taglineBody:
      'Showrunners carry bold scores, spatial narratives, and high-stakes broadcast moments. With beveled optical glass, automated hoists, and millisecond cue lock, we turn raw venues into unmistakable visual evidence.',
    worksTitleTop: 'ONE LIGHT RIG,',
    worksTitleAccent: 'INFINITE SPACES',
    methodTitle:
      'Harnessing kinetic rigging, beveled borosilicate Fresnel optics, and real-time pre-visualization twins to elevate your most critical live stages',
    methodBody:
      'At SOROT, we engineer audience immersion down to the subframe. We push beyond conventional truss grids to give directors sharper sightlines, faster load-ins, and effortless show-calling.',
    methodChecks: [
      'Independent scenography studio certified TUV EN 17206 / BGV-C1',
      '94% repeat commissioning across touring & broadcast directors [Hypothesis]',
      '0.00ms dual-fiber SMPTE LTC timecode synchronization',
      '25kHz PWM flicker-free 8K HDR camera calibration',
    ],
    skills: [
      {
        align: 'left',
        text: '0 delayed opening cues across +140 arena productions [Hypothesis]. We apply TUV BGV-C1 engineering rigor to lock in every load-in minute.',
        chips: ['0ms', '16U', '10:1'],
      },
      {
        align: 'right',
        text: '96% rigging & truck-pack budget stability [Hypothesis]. Our 3D digital twin pre-vis resolves sightlines and roof loads right from day one.',
        chips: ['96%', 'CAD', 'MA3'],
      },
      {
        align: 'left',
        text: 'The ultimate proof of mastered stagecraft? A 94% repeat booking rate [Hypothesis] from show directors and executive producers season after season.',
        cta: 'See selected productions',
      },
    ],
    expertisesEyebrow: 'OUR DISCIPLINES',
    vrTitleTop: 'PUSH BEYOND EVERY',
    vrTitleMidPrefix: 'LIMIT OF ',
    vrTitleMidAccent: 'LIVE',
    vrTitleBotAccent: 'STAGECRAFT',
    vrLead:
      'A spatial optical experience this visceral stays with you. Neither your camera crew nor forty thousand spectators will forget it.',
    vrCta: 'Discover 3D Pre-Vis',
    spotlightTop: 'ALWAYS RIGGED.',
    spotlightMidPrefix: 'NEVER ',
    spotlightMidAccent: 'GENERIC',
    spotlightBotAccent: 'STAGES.',
    spotlightBody:
      'A specialist ensemble uniting structural precision with a taste for theatrical surprise. Creating Southeast Asia and Europe’s sharpest kinetic scenography practice.',
    spotlightCta: 'About the studio',
    resourcesTop: 'LATEST FIELD',
    resourcesAccent: 'RESOURCES',
    resourcesCta: 'View all field notes',
    qualityTop: 'ENGINEERED FOR',
    qualityAccent: 'LIVE PRECISION',
    reviewsTop: 'TRUSTED ON',
    reviewsAccent: 'LIVE CUE',
    faqEyebrow: 'FAQ',
    faqTop: 'QUESTIONS?',
    faqAccent: 'WE ANSWER',
    faqMore: 'See more questions',
    faqLess: 'Show fewer questions',
    footerTop: 'READY TO TRANSFORM',
    footerBotWhite: 'YOUR ',
    footerBotDark: 'IMPACT?',
    footerCta: 'Contact studio',
  },
  id: {
    menuBtn: 'Menu',
    closeBtn: 'Tutup',
    ctaTop: 'Minta Estimasi',
    heroBlockLeft: ['PANGGUNG BESAR', 'MEMBENTUK', 'MASA DEPAN'],
    heroBlockRight: ['SAAT CAHAYA', 'MENGUASAI', 'SETIAP CUE'],
    heroThesis:
      'SOROT® : studio skenografi kinetik tersertifikasi BGV-C1 yang mengubah cahaya arsitektural menjadi instrumen dampak panggung bagi arena dan siaran langsung',
    taglineTitle:
      'Studio arsitektur panggung kami melipatgandakan skala emosional pertunjukan utama bagi para sutradara visioner. Kami membekali tim yang siap menggerakkan ribuan penonton',
    taglineBody:
      'Setiap sutradara membawa aransemen kuat, narasi ruang, dan momen siaran krusial. Lewat kisi kaca optik bevel, winch otomatis, dan penguncian milidetik, kami menyulap ruang mentah menjadi bukti visual tak terlupakan.',
    worksTitleTop: 'SATU RIG CAHAYA,',
    worksTitleAccent: 'RUANG TAK TERBATAS',
    methodTitle:
      'Memadukan rigging kinetik, optik Fresnel borosilikat bevel, serta kembaran pra-visualisasi 3D real-time untuk mengangkat panggung terpenting Anda',
    methodBody:
      'Di SOROT, kami merancang imersi penonton hingga presisi sub-frame. Kami melampaui kisi truss standar demi garis pandang tajam, load-in cepat, dan kendali show-calling penuh.',
    methodChecks: [
      'Studio skenografi dengan standar struktur TUV EN 17206 / BGV-C1',
      '94% penugasan berulang dari sutradara tur & siaran [Hypothesis]',
      'Sinkronisasi timecode fiber ganda SMPTE LTC 0.00ms',
      'Kalibrasi kamera 8K HDR bebas flicker PWM 25kHz',
    ],
    skills: [
      {
        align: 'left',
        text: '0 keterlambatan cue pembuka pada +140 panggung arena [Hypothesis]. Disiplin rekayasa TUV BGV-C1 mengamankan setiap menit jadwal load-in Anda.',
        chips: ['0ms', '16U', '10:1'],
      },
      {
        align: 'right',
        text: '96% stabilitas anggaran rigging & kargo tur [Hypothesis]. Pra-visualisasi kembaran digital 3D kami menuntaskan hitung beban atap sejak hari pertama.',
        chips: ['96%', 'CAD', 'MA3'],
      },
      {
        align: 'left',
        text: 'Bukti tertinggi penguasaan panggung? Tingkat kolaborasi ulang 94% [Hypothesis] dari para sutradara pertunjukan dan produser eksekutif.',
        cta: 'Lihat karya panggung',
      },
    ],
    expertisesEyebrow: 'KEAHLIAN KAMI',
    vrTitleTop: 'LAMPAUI SEMUA',
    vrTitleMidPrefix: 'BATAS ',
    vrTitleMidAccent: 'TATA',
    vrTitleBotAccent: 'PANGGUNG',
    vrLead:
      'Pengalaman optik spasial sehidup ini tak mudah dilupakan. Baik kru kamera maupun puluhan ribu penonton Anda akan terus mengingatnya.',
    vrCta: 'Jelajahi Pre-Vis 3D',
    spotlightTop: 'SELALU PRESISI.',
    spotlightMidPrefix: 'TANPA ',
    spotlightMidAccent: 'KOMPROMI',
    spotlightBotAccent: 'FORMAT.',
    spotlightBody:
      'Tim spesialis yang menyatukan ketelitian rekayasa struktur dengan keberanian kejutan teatrikal untuk panggung arena dan instalasi cahaya.',
    spotlightCta: 'Kenali studio kami',
    resourcesTop: 'CATATAN RISET',
    resourcesAccent: 'TERBARU',
    resourcesCta: 'Lihat semua riset',
    qualityTop: 'DIRANCANG DEMI',
    qualityAccent: 'PRESISI LIVE',
    reviewsTop: 'DIPERCAYA DI',
    reviewsAccent: 'ATAS PANGGUNG',
    faqEyebrow: 'FAQ',
    faqTop: 'ADA PERTANYAAN?',
    faqAccent: 'KAMI JAWAB',
    faqMore: 'Lihat pertanyaan lain',
    faqLess: 'Ringkas pertanyaan',
    footerTop: 'SIAP MENGUBAH',
    footerBotWhite: 'DAMPAK ',
    footerBotDark: 'PANGGUNG?',
    footerCta: 'Hubungi studio',
  },
};

export const STUDIO_LOCATIONS = ['Jakarta', 'Singapore', 'Tokyo', 'Berlin'];
