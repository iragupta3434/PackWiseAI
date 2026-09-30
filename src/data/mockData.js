// ============================================================
// PackWise AI — Mock / Demo Data
// ============================================================
// ALL VALUES ARE DEMO DATA ONLY.
// These are NOT laboratory-validated or scientifically certified figures.
// They are structural placeholders to be replaced by the backend API.
// Do NOT present these as validated material specifications.
// ============================================================

// ----- Packaging Materials Database (Demo Records) -----
export const MATERIALS_DB = [
  {
    id: 'mat-001',
    material: 'BOPP/LDPE Laminate',
    structure: 'BOPP 20µm / Adhesive / LDPE 50µm',
    thicknessMicron: 70,
    otr: '1800–2200', // cc/m²/day/atm — demo estimate
    wvtr: '6–10',     // g/m²/day — demo estimate
    costPerSqm: '₹28–35',
    sustainabilityScore: 3,
    recyclable: false,
    compostable: false,
    evidenceStatus: 'demo-record',
    applications: ['Dry snacks', 'Spices', 'Flour', 'Sugar'],
    barrierClass: 'low',
    notes: 'General-purpose laminate. Suitable for low-moisture, low-fat products.',
    color: 'amber',
  },
  {
    id: 'mat-002',
    material: 'PET/Al Foil/PE Laminate',
    structure: 'PET 12µm / Al Foil 9µm / PE 60µm',
    thicknessMicron: 81,
    otr: '0.01–0.05',
    wvtr: '0.01–0.05',
    costPerSqm: '₹75–95',
    sustainabilityScore: 2,
    recyclable: false,
    compostable: false,
    evidenceStatus: 'demo-record',
    applications: ['High-fat foods', 'Ready-to-eat', 'Retort pouches', 'Coffee'],
    barrierClass: 'ultra-high',
    notes: 'High-barrier laminate. Suitable for moisture and oxygen sensitive products.',
    color: 'green',
  },
  {
    id: 'mat-003',
    material: 'PET/LLDPE Laminate',
    structure: 'PET 12µm / Adhesive / LLDPE 60µm',
    thicknessMicron: 72,
    otr: '50–80',
    wvtr: '4–8',
    costPerSqm: '₹38–48',
    sustainabilityScore: 4,
    recyclable: true,
    compostable: false,
    evidenceStatus: 'demo-record',
    applications: ['Dairy', 'Bakery', 'Fresh pasta', 'Chilled products'],
    barrierClass: 'medium',
    notes: 'Medium-barrier option. Better recyclability profile than foil laminates.',
    color: 'blue',
  },
  {
    id: 'mat-004',
    material: 'EVOH-Based Multilayer Film',
    structure: 'PA 15µm / EVOH 5µm / PE 60µm',
    thicknessMicron: 80,
    otr: '0.1–1.0',
    wvtr: '2–5',
    costPerSqm: '₹85–110',
    sustainabilityScore: 3,
    recyclable: false,
    compostable: false,
    evidenceStatus: 'demo-record',
    applications: ['Processed meat', 'Cheese', 'Oxygen-sensitive products'],
    barrierClass: 'high',
    notes: 'EVOH provides excellent O₂ barrier. Moisture and humidity sensitive.',
    color: 'purple',
  },
  {
    id: 'mat-005',
    material: 'Micro-perforated PP Film',
    structure: 'BOPP 25µm with micro-perforations',
    thicknessMicron: 25,
    otr: '10,000–50,000',
    wvtr: '100–400',
    costPerSqm: '₹20–30',
    sustainabilityScore: 6,
    recyclable: true,
    compostable: false,
    evidenceStatus: 'demo-record',
    applications: ['Fresh vegetables', 'Salad greens', 'Herbs', 'MAP produce'],
    barrierClass: 'permeable-controlled',
    notes: 'For fresh produce requiring controlled gas exchange. High OTR is intentional.',
    color: 'emerald',
  },
  {
    id: 'mat-006',
    material: 'PLA Compostable Film',
    structure: 'PLA 30µm / PBAT 20µm',
    thicknessMicron: 50,
    otr: '200–500',
    wvtr: '80–150',
    costPerSqm: '₹55–75',
    sustainabilityScore: 8,
    recyclable: false,
    compostable: true,
    evidenceStatus: 'demo-record',
    applications: ['Short shelf-life products', 'Retail/eco-market', 'Fresh baked goods'],
    barrierClass: 'low',
    notes: 'Compostable option. Lower barrier properties; suitable only for short-life products.',
    color: 'teal',
  },
  {
    id: 'mat-007',
    material: 'Metallised BOPP',
    structure: 'BOPP 20µm / SiO₂ / BOPP 20µm',
    thicknessMicron: 40,
    otr: '10–30',
    wvtr: '0.5–2',
    costPerSqm: '₹45–60',
    sustainabilityScore: 4,
    recyclable: true,
    compostable: false,
    evidenceStatus: 'demo-record',
    applications: ['Chips', 'Crackers', 'Namkeen', 'Dry snacks'],
    barrierClass: 'medium-high',
    notes: 'Better recyclability than foil. Good moisture barrier. Moderate oxygen barrier.',
    color: 'slate',
  },
  {
    id: 'mat-008',
    material: 'BOPP/BOPP (Seal Grade)',
    structure: 'BOPP 20µm / Adhesive / BOPP 20µm',
    thicknessMicron: 40,
    otr: '3000–4000',
    wvtr: '3–6',
    costPerSqm: '₹18–25',
    sustainabilityScore: 5,
    recyclable: true,
    compostable: false,
    evidenceStatus: 'demo-record',
    applications: ['Sugar', 'Flour', 'Pulses', 'Dry goods'],
    barrierClass: 'low',
    notes: 'Low-cost, recyclable option for moisture-insensitive dry products.',
    color: 'amber',
  },
];

// ----- Commodity Options -----
export const COMMODITIES = [
  { value: 'fresh-vegetables', label: 'Fresh Vegetables', isFreshProduce: true },
  { value: 'fresh-fruits', label: 'Fresh Fruits', isFreshProduce: true },
  { value: 'leafy-greens', label: 'Leafy Greens / Salad', isFreshProduce: true },
  { value: 'mushrooms', label: 'Mushrooms', isFreshProduce: true },
  { value: 'dry-snacks', label: 'Dry Snacks (Chips, Namkeen)', isFreshProduce: false },
  { value: 'spices-masala', label: 'Spices & Masala', isFreshProduce: false },
  { value: 'flour-grains', label: 'Flour & Grains', isFreshProduce: false },
  { value: 'processed-meat', label: 'Processed Meat', isFreshProduce: false },
  { value: 'dairy', label: 'Dairy Products', isFreshProduce: false },
  { value: 'ready-to-eat', label: 'Ready-to-Eat Meals', isFreshProduce: false },
  { value: 'bakery', label: 'Bakery / Baked Goods', isFreshProduce: false },
  { value: 'coffee-tea', label: 'Coffee / Tea', isFreshProduce: false },
  { value: 'cooking-oil', label: 'Cooking Oil / Ghee', isFreshProduce: false },
  { value: 'pulses-legumes', label: 'Pulses & Legumes', isFreshProduce: false },
  { value: 'other', label: 'Other Food Product', isFreshProduce: false },
];

// ----- Packaging Format Options -----
export const PACKAGING_FORMATS = [
  { value: 'pouch-pillow', label: 'Pillow Pouch (Form-Fill-Seal)' },
  { value: 'pouch-standup', label: 'Stand-Up Pouch (Doypack)' },
  { value: 'pouch-retort', label: 'Retort Pouch' },
  { value: 'tray-lidding', label: 'Tray with Lidding Film (MAP)' },
  { value: 'flow-wrap', label: 'Flow Wrap / Horizontal FFS' },
  { value: 'bag-paper', label: 'Paper Bag / Kraft Bag' },
  { value: 'rigid-container', label: 'Rigid Container / Jar' },
  { value: 'clamshell', label: 'Clamshell / Clam Pack' },
  { value: 'bulk-liner', label: 'Bulk Liner / FIBC' },
  { value: 'other', label: 'Other / To Be Decided' },
];

// ----- Storage Type Options -----
export const STORAGE_TYPES = [
  { value: 'ambient', label: 'Ambient / Room Temperature' },
  { value: 'refrigerated', label: 'Refrigerated (0–8°C)' },
  { value: 'frozen', label: 'Frozen (<–18°C)' },
  { value: 'controlled-atmosphere', label: 'Controlled Atmosphere (CA) Storage' },
  { value: 'cold-chain', label: 'Cold Chain (Variable)' },
];

// ----- Demo Recommendation Results -----
// These are structural demo outputs only. NOT real analysis results.
export const DEMO_RECOMMENDATIONS = {
  product: 'Dry Snacks (Chips, Namkeen)',
  conditions: {
    temperature: '25°C',
    humidity: '60% RH',
    shelfLife: '6 months',
    storageType: 'Ambient',
  },
  analysisNote: 'DEMO OUTPUT — Not a real analysis. Structure awaiting backend integration.',
  recommendations: [
    {
      id: 'rec-001',
      priority: 'performance',
      label: 'Performance Priority',
      tagline: 'Maximum barrier protection for extended shelf life.',
      material: 'PET/Al Foil/PE Laminate',
      structure: 'PET 12µm / Al Foil 9µm / PE 60µm',
      thicknessMicron: 81,
      otr: '0.01–0.05 cc/m²/day/atm',
      wvtr: '0.01–0.05 g/m²/day',
      estimatedCost: '₹75–95 per m²',
      sustainability: 'Low recyclability; aluminium not easily separated.',
      barrierClass: 'Ultra-High',
      compatibility: 'High',
      evidenceStatus: 'Demo record — pending real source connection',
      pros: ['Excellent O₂ and moisture barrier', 'Protects high-fat products from oxidation', 'Industry-standard for long shelf life'],
      cons: ['Non-recyclable laminate', 'Higher material cost', 'Not suitable for transparent windows'],
      riskScore: 8.5,
      sustainabilityScore: 2,
      color: 'green',
    },
    {
      id: 'rec-002',
      priority: 'balanced',
      label: 'Balanced Configuration',
      tagline: 'Practical trade-off between performance, cost and recyclability.',
      material: 'Metallised BOPP',
      structure: 'BOPP 20µm / SiO₂ Metallisation / BOPP 20µm',
      thicknessMicron: 40,
      otr: '10–30 cc/m²/day/atm',
      wvtr: '0.5–2 g/m²/day',
      estimatedCost: '₹45–60 per m²',
      sustainability: 'Improved recyclability vs foil; mono-material potential.',
      barrierClass: 'Medium-High',
      compatibility: 'High',
      evidenceStatus: 'Demo record — pending real source connection',
      pros: ['Better recyclability than foil', 'Good moisture barrier', 'Widely available in India', 'Cost-effective'],
      cons: ['Moderate O₂ barrier vs foil', 'Opacity — no product visibility', 'Metalization may vary by supplier'],
      riskScore: 6.0,
      sustainabilityScore: 4,
      color: 'blue',
    },
    {
      id: 'rec-003',
      priority: 'cost-sustainability',
      label: 'Cost & Sustainability Priority',
      tagline: 'Lower cost, higher recyclability — accepts moderate barrier trade-off.',
      material: 'BOPP/BOPP Seal Grade',
      structure: 'BOPP 20µm / Adhesive / BOPP 20µm',
      thicknessMicron: 40,
      otr: '3000–4000 cc/m²/day/atm',
      wvtr: '3–6 g/m²/day',
      estimatedCost: '₹18–25 per m²',
      sustainability: 'Recyclable mono-material; lower environmental impact.',
      barrierClass: 'Low',
      compatibility: 'Moderate — reduced shelf life at this barrier level',
      evidenceStatus: 'Demo record — pending real source connection',
      pros: ['Lowest cost option', 'Recyclable', 'Good for short shelf life', 'Wide availability'],
      cons: ['High OTR — not suitable for oxidation-sensitive products', 'Shorter effective shelf life', 'Requires low-humidity storage'],
      riskScore: 3.5,
      sustainabilityScore: 6,
      color: 'amber',
    },
  ],
};

// ----- Demo Explainability Chain -----
export const DEMO_EXPLANATION_CHAIN = [
  {
    step: 1,
    input: 'High Fat Content',
    icon: 'droplets',
    reasoning: 'Product contains >15% fat/oil. Fat oxidation is the primary quality degradation pathway for this product type.',
    riskFlag: 'Oxidation Risk',
    riskLevel: 'high',
  },
  {
    step: 2,
    input: 'Oxidation Risk Identified',
    icon: 'zap',
    reasoning: 'Lipid oxidation requires oxygen. A high oxygen barrier (low OTR) is needed to limit O₂ ingress through packaging.',
    riskFlag: 'High O₂ Barrier Requirement',
    riskLevel: 'high',
  },
  {
    step: 3,
    input: 'Ambient Storage, 6 Month Shelf Life',
    icon: 'thermometer',
    reasoning: 'Long ambient shelf life increases cumulative O₂ and moisture exposure. High WVTR also affects crispness and texture.',
    riskFlag: 'WVTR Constraint Added',
    riskLevel: 'medium',
  },
  {
    step: 4,
    input: 'Constraints Defined',
    icon: 'filter',
    reasoning: 'Material database filtered for OTR < 50 cc/m²/day and WVTR < 5 g/m²/day. This eliminates low-barrier materials.',
    riskFlag: 'Candidate Filtering Applied',
    riskLevel: 'low',
  },
  {
    step: 5,
    input: 'Filtered Candidates Scored',
    icon: 'award',
    reasoning: 'Remaining candidates scored on barrier performance, cost index and sustainability profile. Trade-off configurations generated.',
    riskFlag: 'Recommendation Generated',
    riskLevel: 'none',
  },
];

// ----- What-If Demo Scenarios -----
export const DEMO_WHATIF_SCENARIOS = {
  baseline: {
    label: 'Baseline Scenario',
    temperature: 4,
    humidity: 85,
    film: 'PET/Al Foil/PE Laminate',
    thicknessMicron: 81,
    otr: 0.03,
    wvtr: 0.03,
    shelfLifeEstimate: '180–210 days',
    qualityIndex: 92,
    oxidationRisk: 'Very Low',
    moistureRisk: 'Very Low',
    estimatedCost: '₹85/m²',
    note: 'DEMO/MODEL-ESTIMATE — not laboratory validated',
  },
  modified: {
    label: 'Modified Scenario',
    temperature: 8,
    humidity: 85,
    film: 'PET/LLDPE Laminate',
    thicknessMicron: 72,
    otr: 65,
    wvtr: 6,
    shelfLifeEstimate: '90–120 days',
    qualityIndex: 71,
    oxidationRisk: 'Moderate',
    moistureRisk: 'Low',
    estimatedCost: '₹43/m²',
    note: 'DEMO/MODEL-ESTIMATE — not laboratory validated',
  },
};

// ----- MAP / Fresh Produce Demo Data -----
export const DEMO_MAP_CALCULATION = {
  produceType: 'Baby Spinach',
  packWeight: 150, // grams
  filmArea: 0.04, // m²
  targetO2: 5,    // %
  targetCO2: 10,  // %
  respirationRate: 45, // ml O₂/kg/h at 4°C
  recommendedOTR: '5000–15000 cc/m²/day/atm',
  recommendedFilm: 'Micro-perforated BOPP or Cling Film with OTR tuned to respiration rate',
  note: 'DEMO MODEL OUTPUT — For fresh produce, a higher OTR is required to match respiration rate. Standard barrier films are NOT appropriate.',
  reasoning: 'Baby spinach has a high respiration rate. If OTR is too low, CO₂ accumulates causing anaerobic respiration (fermentation/off-flavour). If OTR is too high, O₂ excess continues aerobic deterioration. Target O₂ of 5% and CO₂ of 10% delays senescence without anaerobic stress.',
};

// ----- Problem Cards -----
export const PROBLEM_CARDS = [
  {
    id: 1,
    icon: 'shield-off',
    title: 'Wrong Barrier Selection',
    description: 'Selecting packaging with incorrect OTR/WVTR leads to premature quality loss, oxidation, and moisture damage.',
    severity: 'high',
  },
  {
    id: 2,
    icon: 'droplets',
    title: 'Moisture Damage',
    description: 'Inadequate WVTR allows moisture ingress in hygroscopic products, causing caking, texture loss, and microbial risk.',
    severity: 'high',
  },
  {
    id: 3,
    icon: 'flame',
    title: 'Lipid Oxidation',
    description: 'High-fat products without proper O₂ barrier develop rancidity, off-flavours and reduced nutritional value.',
    severity: 'high',
  },
  {
    id: 4,
    icon: 'wind',
    title: 'Fresh Produce Respiration',
    description: 'Fresh produce requires controlled gas exchange. A standard low-OTR film creates anaerobic conditions causing fermentation.',
    severity: 'medium',
  },
  {
    id: 5,
    icon: 'indian-rupee',
    title: 'High Consultation Cost',
    description: 'Small businesses lack access to food packaging expertise. External consultants are expensive and not always accessible.',
    severity: 'medium',
  },
  {
    id: 6,
    icon: 'repeat',
    title: 'Trial and Error',
    description: 'Without a structured decision framework, packaging selection involves costly trials with no systematic guidance.',
    severity: 'medium',
  },
];

// ----- Feature Cards -----
export const FEATURE_CARDS = [
  {
    id: 1,
    icon: 'file-check',
    title: 'Evidence-Based Recommendations',
    description: 'Recommendations anchored to a material knowledge base and scientific rule engine — not black-box outputs.',
    color: 'green',
  },
  {
    id: 2,
    icon: 'brain',
    title: 'Explainable AI',
    description: 'Every recommendation includes a step-by-step reasoning chain linking food properties → risk → packaging constraint → solution.',
    color: 'blue',
  },
  {
    id: 3,
    icon: 'sliders',
    title: 'Multi-Objective Optimization',
    description: 'Simultaneously optimizes for barrier performance, cost and sustainability. Three trade-off configurations generated per query.',
    color: 'purple',
  },
  {
    id: 4,
    icon: 'leaf',
    title: 'Fresh Produce MAP',
    description: 'Dedicated module for Modified Atmosphere Packaging. Matches film OTR to produce respiration rate — a fundamentally different logic.',
    color: 'emerald',
  },
  {
    id: 5,
    icon: 'flask-conical',
    title: 'What-If Simulation',
    description: 'Simulate packaging performance under changed conditions — temperature, humidity, film choice — and see projected quality impact.',
    color: 'amber',
  },
  {
    id: 6,
    icon: 'recycle',
    title: 'Sustainability Intelligence',
    description: 'Evaluates recyclability, compostability and environmental profile of candidate materials alongside technical performance.',
    color: 'teal',
  },
];

// ----- Impact Cards -----
export const IMPACT_CARDS = [
  { id: 1, icon: 'trending-down', title: 'Reduce Trial-and-Error', description: 'Replace costly guess-and-test packaging selection with a structured, evidence-anchored workflow.' },
  { id: 2, icon: 'target', title: 'Improve Packaging Selection', description: 'Match food product properties to appropriate barrier requirements using a systematic decision framework.' },
  { id: 3, icon: 'calendar', title: 'Support Shelf-Life Planning', description: 'Understand how packaging barrier properties interact with storage conditions to plan shelf life more effectively.' },
  { id: 4, icon: 'users', title: 'Democratise Packaging Knowledge', description: 'Give farmers, FPOs and MSMEs access to the same structured packaging logic available to large food enterprises.' },
  { id: 5, icon: 'leaf', title: 'Support Sustainable Alternatives', description: 'Identify where sustainable packaging options are technically feasible alongside conventional materials.' },
];

// ----- Workflow Steps -----
export const WORKFLOW_STEPS = [
  { id: 1, label: 'Food Data Input', description: 'Moisture, fat, pH, water activity, oxidation sensitivity', icon: 'database' },
  { id: 2, label: 'Risk Profiling', description: 'Identify primary degradation pathways', icon: 'activity' },
  { id: 3, label: 'Scientific Rules', description: 'Apply food-packaging compatibility rules', icon: 'book-open' },
  { id: 4, label: 'Material Database', description: 'Filter candidate materials by barrier constraints', icon: 'layers' },
  { id: 5, label: 'Optimization', description: 'Multi-objective scoring across performance, cost, sustainability', icon: 'sliders' },
  { id: 6, label: 'Recommendations', description: 'Three trade-off configurations generated', icon: 'package' },
  { id: 7, label: 'What-If Simulation', description: 'Explore alternative scenarios interactively', icon: 'flask-conical' },
];
