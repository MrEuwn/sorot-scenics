export const LIGHTING_CUES = [
  {
    id: 'vermilion',
    code: '01',
    name: 'VERMILION ARENA',
    shortName: 'Vermilion Arena',
    polarity: 'vermilion',
    heroBg: '#D9381E',
    heroInk: '#FFFFFF',
    heroSecondaryInk: '#111214',
    accentHex: '#FF573B',
    beamColorA: '#FFFFFF',
    beamColorB: '#CFF4FF',
    prismTint: '#F25335',
    prismEdge: '#FFF2EB',
    prismOpacity: 0.34,
    spec: '3200K TUNGSTEN + 6500K BEAM',
    lumens: '148,000 LM',
    dmx: '512 CH · UNIVERSE 01-08',
    rigLoad: '14.2 TONS',
    timecodeStart: '01:14:22:08',
    description:
      'High-output Signal Vermilion arena keylight rig with beveled borosilicate Fresnel louvers and tight specular rim wash.',
  },
  {
    id: 'daylight',
    code: '02',
    name: 'DAYLIGHT GALLERY',
    shortName: 'Daylight Gallery',
    polarity: 'light',
    heroBg: '#F6F5F0',
    heroInk: '#111214',
    heroSecondaryInk: '#B72A13',
    accentHex: '#B72A13',
    beamColorA: '#111214',
    beamColorB: '#D9381E',
    prismTint: '#DCE4EC',
    prismEdge: '#FFFFFF',
    prismOpacity: 0.42,
    spec: '5600K MUSEUM CRI 98+',
    lumens: '84,000 LM',
    dmx: '256 CH · UNIVERSE 01-04',
    rigLoad: '6.8 TONS',
    timecodeStart: '02:08:41:16',
    description:
      'Architectural chalk daylight pavilion calibration using neutral glass diffusers, softbox sky bays, and crisp silver bevel refraction.',
  },
  {
    id: 'chiaroscuro',
    code: '03',
    name: 'CHIAROSCURO RIG',
    shortName: 'Chiaroscuro Rig',
    polarity: 'dark',
    heroBg: '#111214',
    heroInk: '#FFFFFF',
    heroSecondaryInk: '#CFF4FF',
    accentHex: '#CFF4FF',
    beamColorA: '#CFF4FF',
    beamColorB: '#FF573B',
    prismTint: '#161C24',
    prismEdge: '#CFF4FF',
    prismOpacity: 0.56,
    spec: '8200K LASER EDGE + ICE RIM',
    lumens: '210,000 LM',
    dmx: '1024 CH · UNIVERSE 01-16',
    rigLoad: '18.6 TONS',
    timecodeStart: '03:42:09:24',
    description:
      'Carbon Obsidian broadcast blackout cue driven by dichroic ice-cyan edge lasers, optical louvers, and zero-drift SMPTE timecode lock.',
  },
];

export const STAGE_WORKS = [
  {
    id: 'monolith-jakarta',
    title: 'MONOLITH SYMPHONY ARENA',
    client: 'Istora Senayan Live · Jakarta',
    category: 'ARENA SCENOGRAPHY',
    year: '2026',
    dmx: '640 DMX CH',
    lumens: '185K LUMENS',
    rigLoad: '16.4T RIG',
    image: './media/concert-crowd.jpg',
    alt: 'Monumental overhead truss rig projecting synchronized architectural light beams across a packed live arena',
    summary:
      '14-meter motorized overhead truss with 96 synced narrow-beam fixtures and custom borosilicate Fresnel lenses running at 60fps timecode lock.',
  },
  {
    id: 'solaris-laser',
    title: 'SOLARIS DICHROIC DOME',
    client: 'Ariake Arena Broadcast · Tokyo',
    category: 'KINETIC RIGGING',
    year: '2026',
    dmx: '960 DMX CH',
    lumens: '240K LUMENS',
    rigLoad: '19.0T RIG',
    image: './media/ballroom-optics.jpg',
    alt: 'Crisp cyan and sapphire geometric laser beams fanning across a dark architectural concert hall',
    summary:
      'Full-arena optical laser lattice synchronized with live camera tracking and overhead mirror pods sculpting architectural light planes.',
  },
  {
    id: 'sant-pau-optics',
    title: 'FACADE REFRACTION PAVILION',
    client: 'Biennale of Light · Barcelona',
    category: 'MUSEUM PAVILIONS',
    year: '2025',
    dmx: '384 DMX CH',
    lumens: '140K LUMENS',
    rigLoad: '7.4T RIG',
    image: './media/projection-pavilion.jpg',
    alt: 'Heritage architectural facade drenched in vermilion light with precision blue geometric projection mapping at night',
    summary:
      'Sub-millimeter architectural projection mapping across 62 meters of heritage stonework with calibrated weatherproof laser projectors.',
  },
  {
    id: 'konzerthaus-console',
    title: 'TIMECODE COMMAND DECK',
    client: 'Kraftwerk Live Forum · Berlin',
    category: 'REALTIME DMX + XR',
    year: '2026',
    dmx: '1024 DMX CH',
    lumens: '95K LUMENS',
    rigLoad: '9.5T RIG',
    image: './media/foh-grandma.jpg',
    alt: 'Lighting director operating an illuminated dual-screen front-of-house DMX console displaying live 3D stage pre-visualization',
    summary:
      'Redundant dual-fiber grandMA console architecture and custom SMPTE LTC distribution engineered for zero-frame drift across 16 universes.',
  },
  {
    id: 'lumina-domes',
    title: 'HEMISPHERE OPTICS PAVILION',
    client: 'National Gallery Wing · Singapore',
    category: 'MUSEUM PAVILIONS',
    year: '2025',
    dmx: '480 DMX CH',
    lumens: '120K LUMENS',
    rigLoad: '6.2T RIG',
    image: './media/light-sculpture.jpg',
    alt: 'Architectural glowing translucent hemisphere light domes calibrated in a dark museum exhibition gallery',
    summary:
      'Custom-molded frosted optical hemisphere arrays powered by CRI 98+ dimmable LED drivers reacting subtly to visitor acoustics.',
  },
  {
    id: 'meridian-broadcast',
    title: 'MERIDIAN LIVE BROADCAST',
    client: 'Asia Pacific Live Awards · Jakarta',
    category: 'BROADCAST VISUALS',
    year: '2026',
    dmx: '720 DMX CH',
    lumens: '165K LUMENS',
    rigLoad: '15.8T RIG',
    image: './media/concert-camera.jpg',
    alt: 'Live broadcast framing capturing symmetrical overhead beam lines with embedded timecode overlay in a concert arena',
    summary:
      'Camera-calibrated illumination and flicker-free 25kHz PWM beam arrays engineered specifically for live 8K HDR global broadcast switchers.',
  },
];

export const MARQUEE_TOKENS = [
  'SINCE 2016',
  '140+ ARENAS',
  '0ms SYNC DRIFT',
  'TUV RIGGING',
  '98.4% SAFETY MARGIN',
  '60FPS DMX LOCK',
];

export const PROOF_METRICS = [
  {
    value: '0ms',
    label: 'TIMECODE SYNC DRIFT',
    detail:
      'Hardware-locked SMPTE LTC and PTPv2 network distribution linking lighting desks, winches, lasers, and broadcast switchers.',
    tag: 'SMPTE 12M / PTPv2',
  },
  {
    value: '140+',
    label: 'GLOBAL LIVE PRODUCTIONS',
    detail:
      'Arena world tours, televised awards broadcasts, biennial light pavilions, and touring symphonic residencies across four continents.',
    tag: 'JKT · SGP · TYO · BER',
  },
  {
    value: '98.4%',
    label: 'RIG LOAD SAFETY MARGIN',
    detail:
      'Every suspended truss, glass louver pod, and kinetic hoist passes dual structural finite-element verification before load-in.',
    tag: 'TUV / BGV-C1 SPEC',
  },
];

export const DISCIPLINES = [
  {
    id: 'kinetic-rigging',
    index: '01',
    title: 'KINETIC RIGGING',
    spec: 'BGV-C1 WINCHES · 0.5MM POSITIONING',
    summary:
      'Automated multi-axis hoists, counterweighted Fresnel glass louvers, and sculpted steel gantries that reshape venue architecture mid-performance.',
    image: './media/ballroom-optics.jpg',
    alt: 'Collimated cyan laser beams cutting crisp geometry across an arena ceiling',
  },
  {
    id: 'arena-scenography',
    index: '02',
    title: 'ARENA SCENOGRAPHY',
    spec: '360° SIGHTLINES · 180K+ LUMENS',
    summary:
      'Full spatial direction for 10,000 to 65,000 seat arenas, unifying scenic steelwork, atmospheric optics, and touring pack-down efficiency.',
    image: './media/concert-crowd.jpg',
    alt: 'Wide overhead concert truss projecting symmetrical golden-white beam arrays',
  },
  {
    id: 'broadcast-visuals',
    index: '03',
    title: 'BROADCAST VISUALS',
    spec: 'FLICKER-FREE 120HZ · REC.2020',
    summary:
      'Camera-calibrated illumination, anti-moire LED fascia architecture, and studio look-dev built specifically for live global television lenses.',
    image: './media/concert-camera.jpg',
    alt: 'Broadcast live monitor capturing symmetrical arena beam geometry with timecode',
  },
  {
    id: 'museum-pavilions',
    index: '04',
    title: 'MUSEUM PAVILIONS',
    spec: 'CRI 98+ OPTICS · PROJECTION MAPPING',
    summary:
      'Permanent and biennial architectural light installations pairing custom beveled optics with precision facade mapping and tactile spatial sound.',
    image: './media/neon-pavilion.jpg',
    alt: 'Minimalist architectural gallery corridor illuminated by linear sculptural light fixtures',
  },
  {
    id: 'realtime-dmx-xr',
    index: '05',
    title: 'REALTIME DMX + XR',
    spec: '16 UNIVERSES · SUB-FRAME TRACKING',
    summary:
      'Live console programming, pre-visualization twins, and optical camera-tracked XR stages where physical fixtures react to virtual shaders in real time.',
    image: './media/foh-grandma.jpg',
    alt: 'Front-of-house lighting console operator managing live DMX universes in 3D pre-vis',
  },
];

export const STANDARDS_CARDS = [
  {
    code: 'CERT // 01',
    title: 'TUV RIGGING CERTIFIED',
    metric: '10:1 STATIC LOAD FACTOR',
    description:
      'All kinetic winches, overhead truss nodes, and suspended optical glass frames comply with EN 17206 and DIN BGV-C1 overhead safety mandates.',
  },
  {
    code: 'CERT // 02',
    title: 'SMPTE TIMECODE LOCK',
    metric: '0.00ms SUB-FRAME DRIFT',
    description:
      'Dual-redundant optical fiber rings synchronize MA3 consoles, media servers, pyrotechnics, and broadcast cameras with automatic failover.',
  },
  {
    code: 'CERT // 03',
    title: 'ECO-LED POWER SPEC',
    metric: '-42% PEAK KVA DRAW',
    description:
      'High-efficacy laser-phosphor and narrow-beam LED arrays slash generator diesel burn while delivering museum-grade CRI 97+ camera skin tones.',
  },
];

export const CLIENT_REVIEWS = [
  {
    id: 'rev-1',
    initials: 'RK',
    name: 'Rendra Kusuma',
    role: 'Executive Show Director · Nusantara Live',
    project: 'Monolith Symphony Arena',
    quote:
      'SOROT walked into a 14,000-seat hall with tight roof weight limits and delivered the sharpest architectural beam rig we have ever put on camera. Load-in finished four hours ahead of cue rehearsal.',
  },
  {
    id: 'rev-2',
    initials: 'ML',
    name: 'Mei-Ling Tan',
    role: 'Head of Technical Production · Esplanade',
    project: 'Hemisphere Optics Pavilion',
    quote:
      'Their pre-visualization twin matched the live Fresnel refraction down to the exact beam angle. Every symphonic cue locked to the millisecond without a single flicker artifact on our 4K broadcast feed.',
  },
  {
    id: 'rev-3',
    initials: 'KH',
    name: 'Kenji Hasegawa',
    role: 'Broadcast Director · NHK Event Unit',
    project: 'Solaris Dichroic Dome',
    quote:
      'Few scenography studios truly understand camera sensors. SOROT balanced intense vermilion arena drama with clean keylight skin fidelity so our live switcher needed zero emergency color correction.',
  },
  {
    id: 'rev-4',
    initials: 'AB',
    name: 'Anja Bergmann',
    role: 'Curator of Spatial Media · Berlin Light Forum',
    project: 'Facade Refraction Pavilion',
    quote:
      'Their beveled optical glass louvers turned raw industrial steel into a living instrument. Visitors spent hours watching the light shift as the overhead hoists reconfigured the room.',
  },
  {
    id: 'rev-5',
    initials: 'DV',
    name: 'Diego Valdes',
    role: 'Tour Production Manager · Meridian Touring',
    project: 'Timecode Command Deck',
    quote:
      'Twenty-two cities, zero dropped DMX universes, and truck-pack engineering that actually respects crew turnaround time. SOROT designs spectacles that survive real touring.',
  },
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'How early should we engage SOROT before arena load-in or broadcast day?',
    answer:
      'For custom kinetic rigging and bespoke Fresnel louver fabrication, we recommend 8 to 14 weeks prior to load-in. For rapid touring adaptations or broadcast lighting direction using rental house inventories, our studio can pre-vis and deliver complete CAD + DMX showfiles in 3 weeks.',
  },
  {
    id: 'faq-2',
    question: 'Do you engineer and stamp structural rigging plots for international venues?',
    answer:
      'Yes. Every production ships with weight-load spreadsheets, CAD/Vectorworks rigging plots, power distribution schematics, and TUV / BGV-C1 structural sign-off coordinated with local venue engineers across Jakarta, Singapore, Tokyo, Berlin, and touring territories.',
  },
  {
    id: 'faq-3',
    question: 'How do you guarantee flicker-free lighting for high-frame-rate broadcast cameras?',
    answer:
      'We specify PWM-tunable high-frequency fixtures (up to 25kHz refresh) and run physical camera-sensor tests during pre-production so slow-motion replays and Rec.2020 HDR feeds show zero banding or color shift.',
  },
  {
    id: 'faq-4',
    question: 'Can we review the entire cue list in 3D before booking venue rehearsal days?',
    answer:
      'Every SOROT engagement includes a real-time pre-visualization twin wired directly to our MA3 console. Directors can walk camera angles, adjust cue timing, and sign off on every scene before a single truss is flown.',
  },
  {
    id: 'faq-5',
    question: 'Do you travel with your own show-calling crew and fiber networking racks?',
    answer:
      'Yes. We supply our own redundant dual-fiber control racks, SMPTE timecode splitters, lighting directors, and automation operators, or integrate seamlessly alongside your existing touring production crew.',
  },
  {
    id: 'faq-6',
    question: 'What is the typical production budget range for a SOROT stage or pavilion?',
    answer:
      'Museum light pavilions and studio broadcast packages start around USD 45K for design, pre-vis, and programming. Full arena kinetic scenography with custom fabricated optics and multi-city touring support scales from USD 120K to USD 650K+ depending on rigging volume.',
  },
];

export const STUDIO_LOCATIONS = ['Jakarta', 'Singapore', 'Tokyo', 'Berlin'];
