/**
 * Hitachi Brand Shop - K.K. Enterprises
 * Official Interactive Application Logic
 */

// 1. Comprehensive Product Catalog Database
const PRODUCTS_DATA = [
  // --- SPLIT AIR CONDITIONERS ---
  {
    id: "airhome_400_5s",
    name: "Hitachi airHome 400 Series 1.5 Ton 5-Star Inverter Split AC",
    category: "split_ac",
    subCategory: "Inverter Split",
    tonnage: "1.5 Ton",
    tonnageVal: 1.5,
    starRating: 5,
    technology: "Inverter",
    condenser: "100% Inner Grooved Copper",
    iseer: 5.25,
    powerConsumption: "750 kWh/year",
    coolingCapacity: "5100 W (Expandable)",
    noiseLevel: "24 dB (Whisper Silent)",
    refrigerant: "Eco R32",
    warranty: "10 Yrs Compressor + 5 Yrs PCB + 1 Yr Comprehensive",
    price: 44990,
    mrp: 66990,
    discount: "33% OFF",
    emi: "₹2,499/mo (0% Interest)",
    image: "assets/split_ac_airhome.jpg",
    badge: "Flagship 2026",
    highlight: "FrostWash Auto-Clean & Dual Gold Fin Protection",
    features: [
      "airHome Series: Sleek Japanese Minimalist Aesthetic",
      "FrostWash Technology: Freezes & washes away 99% dust and bacteria inside the coil",
      "Dual Gold Fin: Anti-corrosion coating for extreme Rajasthan dust & heat",
      "Surge Cool Technology: Fast cooling even at 52°C ambient room temperature",
      "Wi-Fi IoT Smart Control via Smartphone App",
      "100% Inner Grooved Copper Tubes for 3x faster heat transfer"
    ],
    idealFor: "Master Bedrooms & Living Rooms (130 - 180 sq.ft)"
  },
  {
    id: "airhome_600_5s",
    name: "Hitachi airHome 600 Series 1.5 Ton 5-Star Inverter Split AC",
    category: "split_ac",
    subCategory: "Expandable Inverter Split",
    tonnage: "1.5 Ton",
    tonnageVal: 1.5,
    starRating: 5,
    technology: "Expandable Inverter",
    condenser: "100% Inner Grooved Copper",
    iseer: 5.40,
    powerConsumption: "710 kWh/year",
    coolingCapacity: "5400 W (Expandable to 110%)",
    noiseLevel: "21 dB (Ultra Quiet)",
    refrigerant: "Eco R32",
    warranty: "10 Yrs Compressor + 5 Yrs PCB + 1 Yr Comprehensive",
    price: 48490,
    mrp: 72990,
    discount: "34% OFF",
    emi: "₹2,694/mo (0% Interest)",
    image: "assets/split_ac_airhome.jpg",
    badge: "AI Powered",
    highlight: "iSee Human Presence Sensor & 110% Overboost",
    features: [
      "iSee Intelligent Sensor: Detects human location & directs cool air efficiently",
      "Expandable Inverter: Automatically boosts cooling capacity to 110% when guests arrive",
      "FrostWash 3.0: 3-step automatic heat-exchanger cleaning",
      "PM 2.5 Ionizer Filter: Active air purification for allergy-free indoor breathing",
      "Dual Gold Fin Condenser: Rust-proof protection against humid/dusty weather",
      "Smart Auto Restart with Memory Backup"
    ],
    idealFor: "Luxury Master Bedrooms & High-Occupancy Living Rooms (140 - 200 sq.ft)"
  },
  {
    id: "yoshi_15_5s",
    name: "Hitachi Yoshi Series 1.5 Ton 5-Star Inverter Split AC",
    category: "split_ac",
    subCategory: "Inverter Split",
    tonnage: "1.5 Ton",
    tonnageVal: 1.5,
    starRating: 5,
    technology: "Inverter",
    condenser: "100% Copper Tube",
    iseer: 5.02,
    powerConsumption: "780 kWh/year",
    coolingCapacity: "5050 W",
    noiseLevel: "26 dB",
    refrigerant: "Eco R32",
    warranty: "10 Yrs Compressor + 5 Yrs PCB + 1 Yr Comprehensive",
    price: 42990,
    mrp: 63990,
    discount: "33% OFF",
    emi: "₹2,388/mo (0% Interest)",
    image: "assets/split_ac_airhome.jpg",
    badge: "Bestseller",
    highlight: "SuperFine Mesh Filter & Ambience Light Display",
    features: [
      "Ambience Light: Smart color indicator reflecting cooling status",
      "SuperFine Mesh Filter: Traps micro dust particles before entering cooling coil",
      "100% Copper Condenser with Tropical Heavy Rotary Compressor",
      "Stabilizer-Free Operation between 130V to 300V",
      "Silent Mode for peaceful night sleep"
    ],
    idealFor: "Standard Bedrooms & Study Rooms (120 - 170 sq.ft)"
  },
  {
    id: "senpai_15_3s",
    name: "Hitachi Senpai Series 1.5 Ton 3-Star Inverter Split AC",
    category: "split_ac",
    subCategory: "Inverter Split",
    tonnage: "1.5 Ton",
    tonnageVal: 1.5,
    starRating: 3,
    technology: "Inverter",
    condenser: "100% Inner Grooved Copper",
    iseer: 3.85,
    powerConsumption: "960 kWh/year",
    coolingCapacity: "4900 W",
    noiseLevel: "28 dB",
    refrigerant: "Eco R32",
    warranty: "10 Yrs Compressor + 5 Yrs PCB + 1 Yr Comprehensive",
    price: 36990,
    mrp: 54990,
    discount: "33% OFF",
    emi: "₹2,055/mo (0% Interest)",
    image: "assets/split_ac_airhome.jpg",
    badge: "Value Pick",
    highlight: "Powerful Inverter Cooling at Budget-Friendly Price",
    features: [
      "Hitachi Dual Rotary Inverter Compressor for reliable performance",
      "100% Inner Grooved Copper Condenser for fast cooling",
      "Tropical Inverter: Maintains room temperature in extreme 50°C heat",
      "Filter Clean Indicator on Indoor Unit",
      "Backlit Remote Controller"
    ],
    idealFor: "Bedrooms & Guest Rooms (120 - 160 sq.ft)"
  },
  {
    id: "toushi_10_3s",
    name: "Hitachi Toushi Series 1.0 Ton 3-Star Inverter Split AC",
    category: "split_ac",
    subCategory: "Inverter Split",
    tonnage: "1.0 Ton",
    tonnageVal: 1.0,
    starRating: 3,
    technology: "Inverter",
    condenser: "100% Copper",
    iseer: 3.90,
    powerConsumption: "680 kWh/year",
    coolingCapacity: "3500 W",
    noiseLevel: "25 dB",
    refrigerant: "Eco R32",
    warranty: "10 Yrs Compressor + 5 Yrs PCB + 1 Yr Comprehensive",
    price: 31490,
    mrp: 47990,
    discount: "34% OFF",
    emi: "₹1,749/mo (0% Interest)",
    image: "assets/split_ac_airhome.jpg",
    badge: "Compact Room",
    highlight: "Optimized for Kids / Study / Small Bedrooms",
    features: [
      "Compact indoor unit dimensions suitable for tight spaces",
      "Quick Chill Mode for instantaneous cooling upon turning on",
      "100% Copper Heat Exchanger and Connecting Kit",
      "Stabilizer-Free Operation"
    ],
    idealFor: "Kids Rooms, Study, Home Offices (80 - 120 sq.ft)"
  },
  {
    id: "kiyora_20_5s",
    name: "Hitachi Kiyora Series 2.0 Ton 5-Star Inverter Split AC",
    category: "split_ac",
    subCategory: "Heavy Capacity Inverter Split",
    tonnage: "2.0 Ton",
    tonnageVal: 2.0,
    starRating: 5,
    technology: "Inverter",
    condenser: "100% Inner Grooved Copper",
    iseer: 5.05,
    powerConsumption: "980 kWh/year",
    coolingCapacity: "6600 W (Heavy Flow)",
    noiseLevel: "32 dB",
    refrigerant: "Eco R32",
    warranty: "10 Yrs Compressor + 5 Yrs PCB + 1 Yr Comprehensive",
    price: 56990,
    mrp: 84990,
    discount: "33% OFF",
    emi: "₹3,166/mo (0% Interest)",
    image: "assets/split_ac_airhome.jpg",
    badge: "Heavy Duty",
    highlight: "Massive 850 CFM Airflow for Large Living Halls",
    features: [
      "Massive 2.0 Ton capacity with extra-wide air throw louver",
      "Cooling air reach up to 15 meters across long living halls",
      "FrostWash Automatic Cleaning System",
      "100% Heavy Duty Copper Condenser & Evaporator Coils",
      "Works effortlessly even in 54°C desert ambient conditions"
    ],
    idealFor: "Large Living Rooms, Drawing Halls, Boutiques (200 - 300 sq.ft)"
  },
  {
    id: "heavyduty_15_3s_noninv",
    name: "Hitachi Heavy-Duty 1.5 Ton 3-Star Non-Inverter Split AC",
    category: "split_ac",
    subCategory: "Fixed Speed Split",
    tonnage: "1.5 Ton",
    tonnageVal: 1.5,
    starRating: 3,
    technology: "Non-Inverter",
    condenser: "100% Heavy Gauge Copper",
    iseer: 3.55,
    powerConsumption: "1040 kWh/year",
    coolingCapacity: "5000 W (Constant)",
    noiseLevel: "34 dB",
    refrigerant: "R32",
    warranty: "5 Yrs Compressor + 1 Yr Comprehensive",
    price: 34490,
    mrp: 49990,
    discount: "31% OFF",
    emi: "₹1,916/mo (0% Interest)",
    image: "assets/split_ac_airhome.jpg",
    badge: "Rugged Non-Inverter",
    highlight: "High Resistance to Harsh Power Fluctuations",
    features: [
      "Heavy-duty fixed speed reciprocating compressor",
      "Engineered for regions with tough electricity conditions",
      "100% Heavy Gauge Copper condenser tubes with anti-corrosive coating",
      "Instant cooling blast at maximum tonnage output",
      "Minimal electronic PCB vulnerability"
    ],
    idealFor: "High Usage Commercial Offices & Rural/Semi-Urban Homes (120 - 170 sq.ft)"
  },

  // --- WINDOW AIR CONDITIONERS ---
  {
    id: "kaze_plus_15_3s",
    name: "Hitachi Kaze Plus Series 1.5 Ton 3-Star Window AC",
    category: "window_ac",
    subCategory: "Window AC",
    tonnage: "1.5 Ton",
    tonnageVal: 1.5,
    starRating: 3,
    technology: "Non-Inverter",
    condenser: "100% Inner Grooved Copper",
    iseer: 3.12,
    powerConsumption: "1150 kWh/year",
    coolingCapacity: "5000 W",
    noiseLevel: "48 dB",
    refrigerant: "Eco R32",
    warranty: "5 Yrs Compressor + 1 Yr Comprehensive",
    price: 31990,
    mrp: 44990,
    discount: "29% OFF",
    emi: "₹1,777/mo (0% Interest)",
    image: "assets/window_ac_kaze.svg",
    badge: "Kaze Plus Classic",
    highlight: "Twin Motor Technology & Filter Clean Indicator",
    features: [
      "Twin Motor Technology: Separate motors for indoor fan and outdoor blower for whisper cooling",
      "100% Inner Grooved Copper Tube with Koukin Filter",
      "Auto Climate Technology with preset temperature & humidity modes",
      "SuperCooling Function for instant chill",
      "Filter Clean Indicator alerts when cleaning is due",
      "Robust pre-coated galvanized steel chassis resistant to rust"
    ],
    idealFor: "Standard Rooms with Window Cutouts (120 - 170 sq.ft)"
  },
  {
    id: "kaze_plus_10_3s",
    name: "Hitachi Kaze Plus Series 1.0 Ton 3-Star Window AC",
    category: "window_ac",
    subCategory: "Window AC",
    tonnage: "1.0 Ton",
    tonnageVal: 1.0,
    starRating: 3,
    technology: "Non-Inverter",
    condenser: "100% Copper",
    iseer: 3.15,
    powerConsumption: "820 kWh/year",
    coolingCapacity: "3450 W",
    noiseLevel: "46 dB",
    refrigerant: "Eco R32",
    warranty: "5 Yrs Compressor + 1 Yr Comprehensive",
    price: 27490,
    mrp: 38990,
    discount: "30% OFF",
    emi: "₹1,527/mo (0% Interest)",
    image: "assets/window_ac_kaze.svg",
    badge: "Compact Window",
    highlight: "Pocket-Friendly Compact Window Cooling",
    features: [
      "Compact frame dimensions fits standard window slots easily",
      "100% Copper Condenser and evaporator coils",
      "Powerful rotary compressor with high EER",
      "Silent fan speed settings with timer mode"
    ],
    idealFor: "Small Bedrooms, Offices, Guard Rooms (80 - 120 sq.ft)"
  },
  {
    id: "kaze_plus_20_3s",
    name: "Hitachi Kaze Plus Series 2.0 Ton 3-Star Window AC",
    category: "window_ac",
    subCategory: "Window AC",
    tonnage: "2.0 Ton",
    tonnageVal: 2.0,
    starRating: 3,
    technology: "Non-Inverter",
    condenser: "100% Heavy Duty Copper",
    iseer: 3.05,
    powerConsumption: "1480 kWh/year",
    coolingCapacity: "6300 W",
    noiseLevel: "51 dB",
    refrigerant: "Eco R32",
    warranty: "5 Yrs Compressor + 1 Yr Comprehensive",
    price: 39490,
    mrp: 55990,
    discount: "29% OFF",
    emi: "₹2,194/mo (0% Interest)",
    image: "assets/window_ac_kaze.svg",
    badge: "Maximum Window Tonnage",
    highlight: "Heavy-Duty Cooling for Large Spaces",
    features: [
      "Massive cooling output suitable where split outdoor unit cannot be placed",
      "Twin Motor with extra large blower wheel",
      "Tropicalized copper condenser with anti-corrosive coating",
      "Digital display panel with sleep & timer controls"
    ],
    idealFor: "Large Rooms, Shops, Clinics, Meeting Halls (190 - 260 sq.ft)"
  },

  // --- COMMERCIAL & SPECIALIZED AIR CONDITIONERS ---
  {
    id: "cassette_4way_20",
    name: "Hitachi 2.0 Ton 4-Way Round Flow Inverter Cassette AC",
    category: "commercial_ac",
    subCategory: "Cassette AC",
    tonnage: "2.0 Ton",
    tonnageVal: 2.0,
    starRating: 4,
    technology: "Inverter",
    condenser: "100% Copper Tube",
    iseer: 4.30,
    powerConsumption: "Commercial Rated",
    coolingCapacity: "7100 W",
    noiseLevel: "32 dB",
    refrigerant: "Eco R410A / R32",
    warranty: "5 Yrs Compressor + 1 Yr Comprehensive",
    price: 68900,
    mrp: 95000,
    discount: "27% OFF",
    emi: "₹3,828/mo (0% Interest)",
    image: "assets/cassette_ac.svg",
    badge: "Ceiling Cassette",
    highlight: "360° Circular Airflow & Built-In Condensate Drain Pump",
    features: [
      "True 360-degree round flow panel eliminates thermal blind spots in the room",
      "Built-in 850mm high-lift condensate drain pump",
      "Fresh Air Intake port for continuous oxygenated indoor environment",
      "Individual horizontal and vertical louver control via wired/wireless remote",
      "Ultra-slim decorative panel that blends seamlessly into False Ceilings"
    ],
    idealFor: "Conference Rooms, Showrooms, Restaurants, Boutique Stores (200 - 320 sq.ft)"
  },
  {
    id: "cassette_4way_30",
    name: "Hitachi 3.0 Ton 4-Way Round Flow Inverter Cassette AC",
    category: "commercial_ac",
    subCategory: "Cassette AC",
    tonnage: "3.0 Ton",
    tonnageVal: 3.0,
    starRating: 4,
    technology: "Inverter",
    condenser: "100% Copper Tube",
    iseer: 4.25,
    powerConsumption: "Commercial Rated",
    coolingCapacity: "10500 W",
    noiseLevel: "36 dB",
    refrigerant: "Eco R410A / R32",
    warranty: "5 Yrs Compressor + 1 Yr Comprehensive",
    price: 84500,
    mrp: 118000,
    discount: "28% OFF",
    emi: "₹4,694/mo (0% Interest)",
    image: "assets/cassette_ac.svg",
    badge: "High Commercial",
    highlight: "High Ceiling Air Throw up to 4.2 Meters",
    features: [
      "Engineered for high-ceiling retail outlets and offices",
      "High-efficiency scroll inverter compressor",
      "FrostWash auto-cleaning mechanism built into the cassette heat exchanger",
      "Built-in high-head drain pump with overflow safety sensor",
      "Supports Centralized BMS Controller / Modbus integration"
    ],
    idealFor: "Corporate Boardrooms, Bank Branches, Fine Dining, Jewelry Showrooms (300 - 450 sq.ft)"
  },
  {
    id: "tower_ac_30",
    name: "Hitachi Commercial 3.0 Ton Floor Standing Tower AC",
    category: "commercial_ac",
    subCategory: "Tower AC",
    tonnage: "3.0 Ton",
    tonnageVal: 3.0,
    starRating: 3,
    technology: "Inverter",
    condenser: "100% Copper",
    iseer: 3.75,
    powerConsumption: "Commercial Rated",
    coolingCapacity: "10600 W",
    noiseLevel: "42 dB",
    refrigerant: "Eco R410A",
    warranty: "5 Yrs Compressor + 1 Yr Comprehensive",
    price: 82000,
    mrp: 115000,
    discount: "29% OFF",
    emi: "₹4,555/mo (0% Interest)",
    image: "assets/tower_ac.svg",
    badge: "Floor Standing",
    highlight: "Powerful Long-Distance Air Throw up to 20 Meters",
    features: [
      "No ceiling modification required - simple plug-and-cool floor standing format",
      "Auto horizontal & vertical 3D oscillation for complete room coverage",
      "Touch Screen Digital LED control panel + wireless remote",
      "Heavy-duty tropical copper heat exchanger for extreme Rajasthan climate",
      "Turbo Cool mode for rapid temperature reduction in crowded spaces"
    ],
    idealFor: "Banquet Halls, Car Showrooms, Gymnasiums, Marriage Gardens (350 - 500 sq.ft)"
  },
  {
    id: "vrf_setfree_modular",
    name: "Hitachi Set-Free Modular VRF Commercial HVAC System",
    category: "commercial_ac",
    subCategory: "VRF System",
    tonnage: "Commercial (4 HP to 96 HP)",
    tonnageVal: 6.0,
    starRating: 5,
    technology: "Modular Inverter VRF",
    condenser: "100% Anti-Corrosive Blue Fin Copper",
    iseer: 5.80,
    powerConsumption: "Ultra High Efficiency",
    coolingCapacity: "Customized up to 270,000 W",
    noiseLevel: "Ultra Quiet Multi-Zone",
    refrigerant: "Eco R410A",
    warranty: "Official Hitachi Commercial HVAC Project Warranty",
    price: 185000,
    mrp: 240000,
    discount: "Custom Quote",
    emi: "Custom Commercial Financing Available",
    image: "assets/vrf_system.svg",
    badge: "VRF Enterprise",
    highlight: "Multi-Zone Climate Control for Luxury Villas & Buildings",
    features: [
      "Connect up to 64 indoor units (Ductable, Cassette, Hi-Wall) to a single outdoor VRF system",
      "Simultaneous cooling and heating in different rooms",
      "Patented Hitachi DC Inverter Scroll Compressor with high seasonal IPLV rating",
      "Total piping length up to 1000 meters with 110m vertical height difference",
      "Complete centralized touch monitoring and smartphone cloud integration",
      "Complete site survey & HVAC design done by K.K. Enterprises certified engineers"
    ],
    idealFor: "Luxury Bungalows, Hotels, Multi-Story Hospitals, Commercial Plazas"
  },
  {
    id: "central_ductable_85",
    name: "Hitachi Concealed Ductable Central AC System (5.5 - 16.5 Ton)",
    category: "commercial_ac",
    subCategory: "Central Ductable AC",
    tonnage: "5.5 Ton to 16.5 Ton",
    tonnageVal: 5.5,
    starRating: 4,
    technology: "Inverter Ductable",
    condenser: "100% Copper Heat Exchanger",
    iseer: 3.95,
    powerConsumption: "Centralized Efficient",
    coolingCapacity: "19,500 W to 58,000 W",
    noiseLevel: "Virtually Silent Inside Room",
    refrigerant: "Eco R410A",
    warranty: "Official Hitachi Commercial Warranty",
    price: 135000,
    mrp: 180000,
    discount: "Project Pricing",
    emi: "Project Quotation on Demand",
    image: "assets/cassette_ac.svg",
    badge: "Central HVAC",
    highlight: "Hidden Ceiling Ducts with Architectural Linear Grilles",
    features: [
      "Completely concealed within false ceiling; only sleek linear grilles are visible",
      "High static pressure design allows long duct runs without airflow drop",
      "High reliability scroll compressor designed for 24/7 continuous operation",
      "Custom air ducting layout and acoustic insulation supplied and installed by K.K. Enterprises"
    ],
    idealFor: "Architectural Designer Homes, Hospitals, High-End Offices, Showrooms"
  },

  // --- WASHING MACHINES ---
  {
    id: "wm_front_8kg",
    name: "Hitachi 8.0 kg Fully Automatic Front Load Inverter Washing Machine",
    category: "washing_machines",
    subCategory: "Front Load Fully Automatic",
    tonnage: "8.0 kg Capacity",
    tonnageVal: 8.0,
    starRating: 5,
    technology: "Inverter Direct Drive",
    condenser: "N/A",
    iseer: 5.0,
    powerConsumption: "5-Star Energy Certified",
    coolingCapacity: "1400 RPM Spin",
    noiseLevel: "52 dB (Ultra Quiet Wash)",
    refrigerant: "N/A",
    warranty: "10 Yrs Motor + 3 Yrs Comprehensive Warranty",
    price: 34990,
    mrp: 49990,
    discount: "30% OFF",
    emi: "₹1,944/mo (0% Interest)",
    image: "assets/washing_machine_front.svg",
    badge: "Steam & Inverter",
    highlight: "90°C Steam Allergen Wash & Dual Shower Wash",
    features: [
      "Steam Care Technology: Removes 99.9% bacteria and allergens while releasing fabric wrinkles",
      "Eco Inverter Motor: Extreme energy efficiency with minimal vibration and noise",
      "1400 RPM High Speed Spin for rapid drying during rainy/winter seasons",
      "Dual Shower Wash: Dual high-pressure water jets penetrate deep into clothing fibers",
      "Auto Self Clean: Tub automatically flushes and scrubs itself after every cycle",
      "15 Wash Programs including Wool, Silk, Duvet, Quick 15 min, and Heavy Daily"
    ],
    idealFor: "Families of 4 to 6 members wanting fabric care and power savings"
  },
  {
    id: "wm_front_9kg",
    name: "Hitachi 9.0 kg AI-Sense Front Load Inverter Washing Machine",
    category: "washing_machines",
    subCategory: "Front Load Fully Automatic",
    tonnage: "9.0 kg Capacity",
    tonnageVal: 9.0,
    starRating: 5,
    technology: "AI Inverter",
    condenser: "N/A",
    iseer: 5.0,
    powerConsumption: "5-Star Energy Certified",
    coolingCapacity: "1400 RPM Spin",
    noiseLevel: "50 dB",
    refrigerant: "N/A",
    warranty: "10 Yrs Motor + 3 Yrs Comprehensive Warranty",
    price: 41990,
    mrp: 58990,
    discount: "29% OFF",
    emi: "₹2,332/mo (0% Interest)",
    image: "assets/washing_machine_front.svg",
    badge: "AI Washing",
    highlight: "AI Load Sense & Auto Dosing System",
    features: [
      "AI Sensors: Measures fabric type, water hardness, and load size to optimize detergent & water",
      "Auto Dosing System: Dispenses exact amount of liquid detergent automatically",
      "Anti-Bacterial Gasket & Stainless Steel Drum",
      "Add Garment function: Pause cycle to add missed clothes midway"
    ],
    idealFor: "Large Families & Premium Fabric Enthusiasts"
  },
  {
    id: "wm_top_75kg",
    name: "Hitachi 7.5 kg Fully Automatic Top Load Washing Machine",
    category: "washing_machines",
    subCategory: "Top Load Fully Automatic",
    tonnage: "7.5 kg Capacity",
    tonnageVal: 7.5,
    starRating: 5,
    technology: "Dynamic Inverter",
    condenser: "N/A",
    iseer: 5.0,
    powerConsumption: "5-Star Rated",
    coolingCapacity: "750 RPM Spin",
    noiseLevel: "58 dB",
    refrigerant: "N/A",
    warranty: "10 Yrs Motor + 2 Yrs Comprehensive Warranty",
    price: 21490,
    mrp: 30990,
    discount: "31% OFF",
    emi: "₹1,194/mo (0% Interest)",
    image: "assets/washing_machine_front.svg",
    badge: "Top Seller",
    highlight: "Dynamic Surge Wave & Tangle-Free Finish",
    features: [
      "Dynamic Surge Wave: Creates powerful multi-directional torrents for stain removal",
      "Tangle-Free Finish: Untangles clothes after spin cycle for effortless unloading",
      "Soft-Close Toughened Glass Lid with scratch-resistant coating",
      "Stainless Steel Diamond Drum with Magic Lint Filter"
    ],
    idealFor: "Medium Families (3 - 5 members)"
  },
  {
    id: "wm_semi_80kg",
    name: "Hitachi 8.0 kg Semi-Automatic Washing Machine",
    category: "washing_machines",
    subCategory: "Semi-Automatic",
    tonnage: "8.0 kg Capacity",
    tonnageVal: 8.0,
    starRating: 5,
    technology: "Semi-Automatic Twin Tub",
    condenser: "N/A",
    iseer: 5.0,
    powerConsumption: "Low Power Drain",
    coolingCapacity: "1400 RPM Spin Tub",
    noiseLevel: "60 dB",
    refrigerant: "N/A",
    warranty: "5 Yrs Motor + 2 Yrs Comprehensive Warranty",
    price: 13990,
    mrp: 19990,
    discount: "30% OFF",
    emi: "₹777/mo",
    image: "assets/washing_machine_front.svg",
    badge: "Budget Hero",
    highlight: "Air Jet Dry & Rust-Free Durable Fiber Body",
    features: [
      "Air Jet Dry: High-velocity air currents extract moisture faster during spinning",
      "High Impact Rust-Proof Polymer Fiber Body resistant to hard water scaling",
      "Heavy-Duty Pulsator with 3 Wash Modes: Gentle, Normal, and Strong",
      "Castor wheels for easy mobility around the wash area"
    ],
    idealFor: "Budget-Conscious Households & Rough Usage"
  },

  // --- REFRIGERATORS & HOME INVERTERS ---
  {
    id: "ref_french_570l",
    name: "Hitachi 570L French Door Multi-Zone Luxury Refrigerator",
    category: "appliances",
    subCategory: "French Door Refrigerator",
    tonnage: "570 Litres",
    tonnageVal: 570,
    starRating: 5,
    technology: "Dual Fan Inverter",
    condenser: "100% Copper Refrigeration Lines",
    iseer: 5.0,
    powerConsumption: "Energy Efficient Inverter",
    coolingCapacity: "Multi-Zone Cooling",
    noiseLevel: "36 dB",
    refrigerant: "Eco R600a",
    warranty: "10 Yrs Compressor + 1 Yr Comprehensive Warranty",
    price: 89900,
    mrp: 125000,
    discount: "28% OFF",
    emi: "₹4,994/mo (0% Interest)",
    image: "assets/refrigerator_french.svg",
    badge: "Japanese Luxury",
    highlight: "Vacuum Compartment & Dual Fan Inverter Cooling",
    features: [
      "Vacuum Compartment: Hitachi's patented -0.8 atm vacuum keeps meat, fish, and dairy fresh longer without freezing",
      "Dual Fan Cooling: Dedicated fans independently circulate air in freezer and refrigerator compartments",
      "Selectable Zone: Switch bottom drawer between Refrigerator, Chill/Meat, Soft Freeze, or Deep Freeze",
      "Touch Screen Controller integrated into the tempered crystal glass door",
      "Triple Power Filter: Absorbs and decomposes 7 types of odor components"
    ],
    idealFor: "Modern Designer Kitchens & Large Families"
  },
  {
    id: "ref_frostfree_380l",
    name: "Hitachi 380L Frost-Free Double Door Refrigerator",
    category: "appliances",
    subCategory: "Double Door Refrigerator",
    tonnage: "380 Litres",
    tonnageVal: 380,
    starRating: 3,
    technology: "Inverter Cooling",
    condenser: "100% Copper Lines",
    iseer: 4.0,
    powerConsumption: "Low Energy Draw",
    coolingCapacity: "Surround Air Flow",
    noiseLevel: "38 dB",
    refrigerant: "Eco R600a",
    warranty: "10 Yrs Compressor + 1 Yr Comprehensive Warranty",
    price: 42500,
    mrp: 57990,
    discount: "27% OFF",
    emi: "₹2,361/mo (0% Interest)",
    image: "assets/refrigerator_french.svg",
    badge: "Frost-Free Inverter",
    highlight: "Moisture-Guard Vegetable Box & Tempered Glass Shelves",
    features: [
      "Compact Inverter Compressor with Eco Thermo-Sensor for micro-precise temperature control",
      "Moisture-Guard Large Vegetable Compartment prevents produce drying",
      "Movable Twist Ice Tray for instant ice cubes",
      "Tempered Glass Shelves hold up to 100 kg weight"
    ],
    idealFor: "Families of 4 to 5 members"
  },
  {
    id: "inverter_pure_sine_1600va",
    name: "Hitachi / K.K. 1600VA Pure Sine Wave Home Inverter System",
    category: "appliances",
    subCategory: "Home Inverters",
    tonnage: "1600 VA / 24V",
    tonnageVal: 1600,
    starRating: 5,
    technology: "Microcontroller Pure Sine Wave",
    condenser: "Heavy Pure Copper Transformer",
    iseer: 5.0,
    powerConsumption: "High Efficiency 94%",
    coolingCapacity: "Can support 1.0T / 1.5T Inverter AC",
    noiseLevel: "Silent Fan Cooling",
    refrigerant: "N/A",
    warranty: "3 Yrs Full Replacement Warranty",
    price: 11990,
    mrp: 16990,
    discount: "29% OFF",
    emi: "₹999/mo",
    image: "assets/home_inverter.svg",
    badge: "AC Backup Ready",
    highlight: "Heavy-Duty Pure Copper Transformer with LCD Status Display",
    features: [
      "Pure Sine Wave Output: Safe for sensitive electronics, LED TVs, and Inverter ACs",
      "Adaptive Battery Charging: Protects tubular batteries from overcharging in hot climates",
      "Full digital LCD screen displays remaining backup time, load percentage, and voltage",
      "Smart Overload Protection with auto-reset functionality"
    ],
    idealFor: "Running Inverter AC + Fans + Lights during Rajasthan power outages"
  },
  {
    id: "inverter_battery_tubular_220ah",
    name: "Heavy-Duty Tall Tubular Inverter Battery 220 Ah / 12V",
    category: "appliances",
    subCategory: "Tubular Battery",
    tonnage: "220 Ah Capacity",
    tonnageVal: 220,
    starRating: 5,
    technology: "High-Pressure Die-Cast Spine Tubular",
    condenser: "Spine Grid Alloy",
    iseer: 5.0,
    powerConsumption: "Ultra Low Water Loss",
    coolingCapacity: "Extended 8 - 12 Hrs Backup",
    noiseLevel: "N/A",
    refrigerant: "N/A",
    warranty: "60 Months (36 Months Free Replacement + 24 Months Pro-Rata)",
    price: 17800,
    mrp: 23500,
    discount: "24% OFF",
    emi: "₹1,483/mo",
    image: "assets/home_inverter.svg",
    badge: "Extra Backup",
    highlight: "High Heat Tolerance & 6 Float Indicators",
    features: [
      "High-pressure die-cast tubular plates ensure long life even in peak Rajasthan summer temperatures",
      "Special corrosion-resistant spine alloy for deep discharge recovery",
      "Equipped with 6 Ceramic Water Level Float Indicators for zero-fuss inspection",
      "Factory charged and ready for immediate high-load installation"
    ],
    idealFor: "Pairing with 1600VA+ Home Inverters for prolonged backup"
  }
];

// 2. Global State
let currentCategory = "all";
let currentTonnageFilter = "all";
let currentStarFilter = "all";
let currentQuickFilter = "all";
let searchQuery = "";
let comparedProducts = []; // Max 3 items

// Cart & Order State
let cart = JSON.parse(localStorage.getItem("hitachi_cart") || "[]");
let appliedCoupon = JSON.parse(localStorage.getItem("hitachi_coupon") || "null");
let currentCheckoutStep = 1;
let selectedPaymentMethod = "UPI_QR";
let qrTimerInterval = null;
let lastConfirmedOrder = null;

// 3. Initialization
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderProductCatalog();
  initACSimulator();
  initTechExplorer();
  initEmiBudgetMatcher();
  initTonnageCalculator();
  initSavingsCalculator();
  initEventListeners();
  updateCompareDrawer();
  updateCartUI();
});

// 4. Render Product Grid
function renderProductCatalog() {
  const container = document.getElementById("productGrid");
  if (!container) return;

  const filtered = PRODUCTS_DATA.filter(p => {
    // Category filter
    const matchesCategory = currentCategory === "all" || p.category === currentCategory;

    // Tonnage / Capacity filter
    let matchesTonnage = true;
    if (currentTonnageFilter !== "all") {
      if (currentTonnageFilter === "1.0") matchesTonnage = p.tonnageVal === 1.0;
      else if (currentTonnageFilter === "1.5") matchesTonnage = p.tonnageVal === 1.5;
      else if (currentTonnageFilter === "2.0") matchesTonnage = p.tonnageVal === 2.0;
      else if (currentTonnageFilter === "commercial") matchesTonnage = p.tonnageVal >= 2.5 || p.category === "commercial_ac";
    }

    // Star filter
    let matchesStar = true;
    if (currentStarFilter !== "all") {
      matchesStar = p.starRating === parseInt(currentStarFilter);
    }

    // Search query
    let matchesSearch = true;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      matchesSearch = p.name.toLowerCase().includes(q) ||
                      p.highlight.toLowerCase().includes(q) ||
                      p.category.toLowerCase().includes(q) ||
                      p.subCategory.toLowerCase().includes(q) ||
                      p.condenser.toLowerCase().includes(q);
    }

    // Quick chip filter
    let matchesQuick = true;
    if (currentQuickFilter === "5star") matchesQuick = p.starRating === 5;
    else if (currentQuickFilter === "1.5ton") matchesQuick = p.tonnageVal === 1.5;
    else if (currentQuickFilter === "frostwash") matchesQuick = (p.highlight && p.highlight.includes("FrostWash")) || (p.features && p.features.some(f => f.includes("FrostWash")));
    else if (currentQuickFilter === "copper") matchesQuick = p.condenser && p.condenser.includes("Copper");
    else if (currentQuickFilter === "budget35k") matchesQuick = p.price <= 35000;
    else if (currentQuickFilter === "window") matchesQuick = p.category === "window_ac";

    return matchesCategory && matchesTonnage && matchesStar && matchesSearch && matchesQuick;
  });

  const countBadge = document.getElementById("productCountBadge");
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Models Available`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-products-box">
        <div class="no-icon">🔍</div>
        <h3>No matching models found</h3>
        <p>Try resetting the search keyword or selecting "All Models" to explore our full inventory.</p>
        <button class="btn btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const isCompared = comparedProducts.includes(p.id);
    const starStr = p.starRating ? `★`.repeat(p.starRating) + `☆`.repeat(Math.max(0, 5 - p.starRating)) : "";
    const isCopper = p.condenser && p.condenser.toLowerCase().includes("copper");

    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-card-head">
          <span class="product-badge">${p.badge}</span>
          ${isCopper ? `<span class="copper-badge">100% Copper</span>` : ""}
          <button class="btn-compare ${isCompared ? 'active' : ''}" 
                  onclick="toggleCompare('${p.id}')" 
                  title="${isCompared ? 'Remove from compare' : 'Add to compare'}">
            ${isCompared ? '✓ Comparing' : '+ Compare'}
          </button>
        </div>

        <div class="product-image-wrap" onclick="openProductModal('${p.id}')">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          <span class="category-pill">${p.subCategory}</span>
        </div>

        <div class="product-info">
          <div class="product-rating-row">
            <span class="stars">${starStr}</span>
            <span class="rating-label">${p.starRating ? p.starRating + '-Star Rated' : 'Heavy Commercial'}</span>
          </div>

          <h3 class="product-title" onclick="openProductModal('${p.id}')">${p.name}</h3>

          <p class="product-highlight">${p.highlight}</p>

          <div class="product-specs-chips">
            <span class="spec-chip">⚡ ${p.technology}</span>
            <span class="spec-chip">❄️ ${p.tonnage}</span>
            ${p.iseer !== "Commercial Rated" && p.iseer !== "Customized" && p.iseer !== "5.0" ? `<span class="spec-chip">📊 ISEER ${p.iseer}</span>` : ""}
          </div>

          <div class="product-price-box">
            <div class="price-row">
              <span class="current-price">₹${p.price.toLocaleString('en-IN')}</span>
              <span class="mrp-price">₹${p.mrp.toLocaleString('en-IN')}</span>
              <span class="discount-pill">${p.discount}</span>
            </div>
            <div class="emi-text">EMI from ${p.emi}</div>
          </div>

          <div class="product-card-actions">
            <button class="btn btn-add-cart" onclick="addToCart('${p.id}', 1, true)" title="Add to shopping cart">
              🛒 Add to Cart
            </button>
            <button class="btn btn-buy-now" onclick="buyNow('${p.id}')" title="Buy now with instant checkout">
              ⚡ Buy Now
            </button>
          </div>

          <div class="product-card-actions-row2">
            <button class="btn btn-outline" onclick="openProductModal('${p.id}')">
              View Specs
            </button>
            <a href="https://wa.me/919587111100?text=${encodeURIComponent(`Hello K.K. Enterprises Hitachi Brand Shop! I am interested in: ${p.name} (₹${p.price.toLocaleString('en-IN')}). Please share the best discount and delivery details for Sikar.`)}" 
               target="_blank" 
               class="btn btn-whatsapp">
              WhatsApp Quote
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 5. Filter Handler Functions
function setCategory(cat, element) {
  currentCategory = cat;
  document.querySelectorAll(".cat-tab").forEach(tab => tab.classList.remove("active"));
  if (element) element.classList.add("active");
  renderProductCatalog();
}

function setTonnageFilter(tonnage) {
  currentTonnageFilter = tonnage;
  renderProductCatalog();
}

function setStarFilter(star) {
  currentStarFilter = star;
  renderProductCatalog();
}

function applyQuickFilter(filterType, element) {
  currentQuickFilter = filterType;
  document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
  if (element) element.classList.add("active");
  renderProductCatalog();
}

function resetFilters() {
  currentCategory = "all";
  currentTonnageFilter = "all";
  currentStarFilter = "all";
  currentQuickFilter = "all";
  searchQuery = "";

  const searchInput = document.getElementById("catalogSearch");
  if (searchInput) searchInput.value = "";

  const tonSelect = document.getElementById("tonnageFilterSelect");
  if (tonSelect) tonSelect.value = "all";

  const starSelect = document.getElementById("starFilterSelect");
  if (starSelect) starSelect.value = "all";

  document.querySelectorAll(".cat-tab").forEach((tab, index) => {
    tab.classList.toggle("active", index === 0);
  });

  document.querySelectorAll(".filter-chip").forEach((chip, index) => {
    chip.classList.toggle("active", index === 0);
  });

  renderProductCatalog();
}

// 6. Interactive AC Room Tonnage Calculator
function initTonnageCalculator() {
  const lengthInput = document.getElementById("calcLength");
  const widthInput = document.getElementById("calcWidth");
  const lengthVal = document.getElementById("calcLengthVal");
  const widthVal = document.getElementById("calcWidthVal");
  const floorSelect = document.getElementById("calcFloor");
  const sunSelect = document.getElementById("calcSun");
  const peopleSelect = document.getElementById("calcPeople");

  if (!lengthInput || !widthInput) return;

  function calculateTonnage() {
    const l = parseFloat(lengthInput.value) || 12;
    const w = parseFloat(widthInput.value) || 12;
    if (lengthVal) lengthVal.textContent = `${l} ft`;
    if (widthVal) widthVal.textContent = `${w} ft`;

    const area = l * w;
    const areaDisplay = document.getElementById("calcAreaDisplay");
    if (areaDisplay) areaDisplay.textContent = `${area} sq.ft`;

    // Base tonnage calculation
    let baseTonnage = 1.0;
    if (area <= 120) baseTonnage = 1.0;
    else if (area <= 170) baseTonnage = 1.5;
    else if (area <= 260) baseTonnage = 2.0;
    else baseTonnage = 2.5; // Commercial / Multi-split

    // Heat load factors
    const isTopFloor = floorSelect ? floorSelect.value === "top" : false;
    const isHighSun = sunSelect ? sunSelect.value === "high" : false;
    const isHeavyPeople = peopleSelect ? peopleSelect.value === "many" : false;

    let heatMultiplier = 1.0;
    if (isTopFloor) heatMultiplier += 0.2;
    if (isHighSun) heatMultiplier += 0.15;
    if (isHeavyPeople) heatMultiplier += 0.15;

    let finalTonnage = baseTonnage * heatMultiplier;
    let recTonnageStr = "1.5 Ton";
    let recModelId = "airhome_400_5s";
    let recExplanation = "";

    if (finalTonnage < 1.25) {
      recTonnageStr = "1.0 Ton (3-Star or 5-Star)";
      recModelId = "toushi_10_3s";
      recExplanation = "Ideal for your room size. A 1.0 Ton Hitachi Toushi / airHome AC will cool quickly without excessive power consumption.";
    } else if (finalTonnage <= 1.8) {
      recTonnageStr = "1.5 Ton (5-Star airHome Inverter)";
      recModelId = "airhome_400_5s";
      recExplanation = "Optimal choice! The 1.5 Ton airHome 400 with 100% inner grooved copper and FrostWash will maintain icy comfort even in Rajasthan's 50°C+ summer.";
    } else if (finalTonnage <= 2.3) {
      recTonnageStr = "2.0 Ton Inverter AC (Kiyora / 4-Way)";
      recModelId = "kiyora_20_5s";
      recExplanation = "Recommended due to high room area or top-floor roof direct sunlight. A 2.0 Ton unit ensures swift, deep chill without overworking the compressor.";
    } else {
      recTonnageStr = "Commercial Heavy Tonnage / Cassette AC (3.0T+)";
      recModelId = "cassette_4way_30";
      recExplanation = "Large open floor plan detected! A 3.0T / 4.0T Hitachi Round-Flow Cassette or Tower AC is recommended for uniform airflow.";
    }

    const recDisplay = document.getElementById("calcRecommendation");
    if (recDisplay) {
      recDisplay.innerHTML = `
        <div class="rec-card">
          <div class="rec-badge">Recommended Cooling Size</div>
          <h4 class="rec-title">${recTonnageStr}</h4>
          <p class="rec-desc">${recExplanation}</p>
          <div class="rec-action-row">
            <button class="btn btn-primary" onclick="filterByRecommendedTonnage('${recModelId}', '${recTonnageStr}')">
              View Recommended Hitachi Models →
            </button>
            <a href="https://wa.me/919587111100?text=${encodeURIComponent(`Hi K.K. Enterprises, my room size is ${area} sq.ft (${l}x${w} ft), ${isTopFloor ? 'Top Floor' : 'Middle Floor'}. The online calculator recommended a ${recTonnageStr}. Please guide me with available models & installation quote.`)}" 
               target="_blank" 
               class="btn btn-whatsapp">
              Chat With AC Expert
            </a>
          </div>
        </div>
      `;
    }
  }

  [lengthInput, widthInput, floorSelect, sunSelect, peopleSelect].forEach(el => {
    if (el) el.addEventListener("input", calculateTonnage);
    if (el) el.addEventListener("change", calculateTonnage);
  });

  calculateTonnage();
}

function filterByRecommendedTonnage(modelId, tonnageStr) {
  const targetSec = document.getElementById("catalogSection");
  if (targetSec) {
    targetSec.scrollIntoView({ behavior: "smooth" });
  }
  if (tonnageStr.includes("1.0")) currentTonnageFilter = "1.0";
  else if (tonnageStr.includes("1.5")) currentTonnageFilter = "1.5";
  else if (tonnageStr.includes("2.0")) currentTonnageFilter = "2.0";
  else if (tonnageStr.includes("3.0") || tonnageStr.includes("Commercial")) currentTonnageFilter = "commercial";

  const tonSelect = document.getElementById("tonnageFilterSelect");
  if (tonSelect) tonSelect.value = currentTonnageFilter;

  renderProductCatalog();
}

// 7. Energy Savings & Power Bill Estimator
function initSavingsCalculator() {
  const hoursInput = document.getElementById("savingsHours");
  const hoursVal = document.getElementById("savingsHoursVal");
  const tariffInput = document.getElementById("savingsTariff");
  const tariffVal = document.getElementById("savingsTariffVal");

  if (!hoursInput || !tariffInput) return;

  function updateSavings() {
    const hours = parseInt(hoursInput.value) || 8;
    const tariff = parseFloat(tariffInput.value) || 8;

    if (hoursVal) hoursVal.textContent = `${hours} Hours / Day`;
    if (tariffVal) tariffVal.textContent = `₹${tariff} / Unit`;

    // Electricity consumption estimation:
    // Old 10-yr Non-Inverter: ~1.6 kW/hr * hours * 200 summer days
    // Hitachi 3-Star Inverter: ~0.95 kW/hr average * hours * 200 days
    // Hitachi 5-Star airHome: ~0.65 kW/hr average * hours * 200 days
    const days = 200; // active cooling days in North India

    const oldUnits = Math.round(1.6 * hours * days);
    const star3Units = Math.round(0.95 * hours * days);
    const star5Units = Math.round(0.65 * hours * days);

    const oldCost = Math.round(oldUnits * tariff);
    const star3Cost = Math.round(star3Units * tariff);
    const star5Cost = Math.round(star5Units * tariff);

    const savingsVsOld = oldCost - star5Cost;
    const savingsVs3Star = star3Cost - star5Cost;

    const elOldCost = document.getElementById("costOldAc");
    const el3StarCost = document.getElementById("cost3StarAc");
    const el5StarCost = document.getElementById("cost5StarAc");
    const elTotalSavings = document.getElementById("annualSavingsAmount");

    if (elOldCost) elOldCost.textContent = `₹${oldCost.toLocaleString('en-IN')}`;
    if (el3StarCost) el3StarCost.textContent = `₹${star3Cost.toLocaleString('en-IN')}`;
    if (el5StarCost) el5StarCost.textContent = `₹${star5Cost.toLocaleString('en-IN')}`;
    if (elTotalSavings) elTotalSavings.textContent = `₹${savingsVsOld.toLocaleString('en-IN')} / year`;
  }

  [hoursInput, tariffInput].forEach(el => {
    el.addEventListener("input", updateSavings);
  });

  updateSavings();
}

// 8. Product Comparison Logic
function toggleCompare(productId) {
  const index = comparedProducts.indexOf(productId);
  if (index > -1) {
    comparedProducts.splice(index, 1);
  } else {
    if (comparedProducts.length >= 3) {
      showToast("You can compare maximum 3 models at a time. Remove one first.");
      return;
    }
    comparedProducts.push(productId);
  }
  updateCompareDrawer();
  renderProductCatalog();
}

function updateCompareDrawer() {
  const drawer = document.getElementById("compareDrawer");
  if (!drawer) return;

  if (comparedProducts.length === 0) {
    drawer.classList.remove("visible");
    return;
  }

  drawer.classList.add("visible");
  const thumbsContainer = document.getElementById("compareThumbnails");
  const countSpan = document.getElementById("compareCount");

  if (countSpan) countSpan.textContent = `${comparedProducts.length}/3`;

  if (thumbsContainer) {
    thumbsContainer.innerHTML = comparedProducts.map(id => {
      const p = PRODUCTS_DATA.find(item => item.id === id);
      if (!p) return "";
      return `
        <div class="compare-thumb">
          <img src="${p.image}" alt="${p.name}" />
          <span class="thumb-name">${p.name.split(' ').slice(0, 3).join(' ')}</span>
          <button class="thumb-remove" onclick="toggleCompare('${p.id}')">×</button>
        </div>
      `;
    }).join('');
  }
}

function openCompareModal() {
  if (comparedProducts.length === 0) return;
  const modal = document.getElementById("compareModal");
  const tableWrap = document.getElementById("compareTableWrap");
  if (!modal || !tableWrap) return;

  const items = comparedProducts.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);

  tableWrap.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Specifications</th>
          ${items.map(p => `
            <th>
              <img src="${p.image}" alt="${p.name}" class="table-prod-img" />
              <h4>${p.name}</h4>
              <div class="table-price">₹${p.price.toLocaleString('en-IN')}</div>
              <a href="https://wa.me/919587111100?text=${encodeURIComponent(`Hi K.K. Enterprises, I want to book: ${p.name}`)}" target="_blank" class="btn btn-whatsapp-sm">Book on WhatsApp</a>
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Category & Series</td>
          ${items.map(p => `<td><strong>${p.subCategory}</strong></td>`).join('')}
        </tr>
        <tr>
          <td>Capacity / Tonnage</td>
          ${items.map(p => `<td>${p.tonnage}</td>`).join('')}
        </tr>
        <tr>
          <td>Energy Star Rating</td>
          ${items.map(p => `<td>★ ${p.starRating || 'Heavy Duty'} Star</td>`).join('')}
        </tr>
        <tr>
          <td>Technology</td>
          ${items.map(p => `<td>${p.technology}</td>`).join('')}
        </tr>
        <tr>
          <td>Condenser Material</td>
          ${items.map(p => `<td><span class="badge-copper">${p.condenser}</span></td>`).join('')}
        </tr>
        <tr>
          <td>Energy Efficiency (ISEER)</td>
          ${items.map(p => `<td>${p.iseer}</td>`).join('')}
        </tr>
        <tr>
          <td>Annual Power Consumption</td>
          ${items.map(p => `<td>${p.powerConsumption}</td>`).join('')}
        </tr>
        <tr>
          <td>Noise Level (dB)</td>
          ${items.map(p => `<td>${p.noiseLevel}</td>`).join('')}
        </tr>
        <tr>
          <td>Refrigerant Gas</td>
          ${items.map(p => `<td>${p.refrigerant}</td>`).join('')}
        </tr>
        <tr>
          <td>Warranty Coverage</td>
          ${items.map(p => `<td>${p.warranty}</td>`).join('')}
        </tr>
      </tbody>
    </table>
  `;

  modal.classList.add("open");
}

function closeCompareModal() {
  const modal = document.getElementById("compareModal");
  if (modal) modal.classList.remove("open");
}

function clearCompareList() {
  comparedProducts = [];
  updateCompareDrawer();
  renderProductCatalog();
  closeCompareModal();
}

// 9. Product Details Modal
function openProductModal(productId) {
  const p = PRODUCTS_DATA.find(item => item.id === productId);
  if (!p) return;

  const modal = document.getElementById("productModal");
  const content = document.getElementById("productModalContent");
  if (!modal || !content) return;

  const isCopper = p.condenser && p.condenser.toLowerCase().includes("copper");
  const starStr = p.starRating ? `★`.repeat(p.starRating) + `☆`.repeat(Math.max(0, 5 - p.starRating)) : "";

  content.innerHTML = `
    <div class="modal-prod-grid">
      <div class="modal-prod-image-col">
        <div class="modal-img-wrap">
          <img src="${p.image}" alt="${p.name}" />
        </div>
        <div class="authorized-dealer-pill">
          <span class="auth-dot"></span> Official Hitachi Brand Shop Unit • 100% Genuine Box
        </div>
        <div class="warranty-card-box">
          <div class="w-icon">🛡️</div>
          <div>
            <strong>Authorized Warranty Coverage:</strong>
            <p>${p.warranty}</p>
          </div>
        </div>
      </div>

      <div class="modal-prod-details-col">
        <div class="modal-category-tag">${p.subCategory} • ${p.badge}</div>
        <h2 class="modal-prod-title">${p.name}</h2>
        <div class="modal-rating-row">
          <span class="stars">${starStr}</span>
          <span class="rating-label">${p.starRating ? p.starRating + '-Star Rating' : 'Commercial Grade'}</span>
          <span class="separator">•</span>
          <span class="room-fit">Recommended for: ${p.idealFor}</span>
        </div>

        <div class="modal-price-box">
          <div class="modal-price-main">
            <span class="m-price">₹${p.price.toLocaleString('en-IN')}</span>
            <span class="m-mrp">₹${p.mrp.toLocaleString('en-IN')}</span>
            <span class="m-discount">${p.discount}</span>
          </div>
          <div class="m-emi">Finance: ${p.emi} | Bajaj Finserv, HDFC & Credit Card 0% EMI available at store</div>
        </div>

        <div class="modal-section-title">Key Technological Highlights</div>
        <ul class="modal-feature-list">
          ${p.features.map(f => `<li><span class="check-icon">✓</span> ${f}</li>`).join('')}
        </ul>

        <div class="modal-section-title">Technical Specifications</div>
        <table class="modal-specs-table">
          <tr><td>Cooling Capacity</td><td><strong>${p.coolingCapacity}</strong></td></tr>
          <tr><td>Compressor / Motor</td><td><strong>${p.technology}</strong></td></tr>
          <tr><td>Condenser & Coils</td><td><strong>${p.condenser}</strong></td></tr>
          <tr><td>Energy Efficiency (ISEER)</td><td><strong>${p.iseer}</strong></td></tr>
          <tr><td>Power Consumption</td><td><strong>${p.powerConsumption}</strong></td></tr>
          <tr><td>Refrigerant Type</td><td><strong>${p.refrigerant}</strong></td></tr>
          <tr><td>Sound Level</td><td><strong>${p.noiseLevel}</strong></td></tr>
        </table>

        <div class="modal-actions-row" style="flex-wrap: wrap;">
          <button class="btn btn-add-cart" style="padding: 12px 20px; font-size: 0.95rem;" onclick="addToCart('${p.id}', 1, true); closeProductModal();">
            🛒 Add to Cart
          </button>
          <button class="btn btn-buy-now" style="padding: 12px 24px; font-size: 0.95rem;" onclick="closeProductModal(); buyNow('${p.id}');">
            ⚡ Buy Now (Express Delivery)
          </button>
          <a href="https://wa.me/919587111100?text=${encodeURIComponent(`Hi K.K. Enterprises Hitachi Brand Shop! I want to order/inquire about: ${p.name} (Price ₹${p.price.toLocaleString('en-IN')}). Please tell me about same-day delivery and installation in Sikar.`)}" 
             target="_blank" 
             class="btn btn-whatsapp-lg">
            WhatsApp
          </a>
          <button class="btn btn-outline-lg" onclick="openQuoteModal('${p.name}')">
            Written Quote
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal) modal.classList.remove("open");
}

// 10. Instant Quote / Site Survey Modal
function openQuoteModal(productName = "") {
  const modal = document.getElementById("quoteModal");
  const prodInput = document.getElementById("quoteProduct");
  if (modal) {
    if (prodInput && productName) prodInput.value = productName;
    modal.classList.add("open");
  }
}

function closeQuoteModal() {
  const modal = document.getElementById("quoteModal");
  if (modal) modal.classList.remove("open");
}

function handleQuoteSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("quoteName").value;
  const phone = document.getElementById("quotePhone").value;
  const address = document.getElementById("quoteAddress").value;
  const product = document.getElementById("quoteProduct").value;
  const serviceType = document.getElementById("quoteServiceType").value;

  const msg = `Hello K.K. Enterprises Hitachi Brand Shop!%0A*New Inquiry / Site Survey Request*%0A- *Name:* ${name}%0A- *Phone:* ${phone}%0A- *Location in Sikar:* ${address}%0A- *Product of Interest:* ${product}%0A- *Requirement:* ${serviceType}`;

  window.open(`https://wa.me/919587111100?text=${msg}`, "_blank");
  closeQuoteModal();
  showToast("Inquiry submitted! Our showroom team will contact you shortly.");
}

// 11. Service Booking Handler
function handleServiceBooking(e) {
  e.preventDefault();
  const name = document.getElementById("srvName").value;
  const phone = document.getElementById("srvPhone").value;
  const service = document.getElementById("srvType").value;
  const date = document.getElementById("srvDate").value;
  const notes = document.getElementById("srvNotes").value;

  const msg = `Hello K.K. Enterprises Hitachi Service Desk!%0A*Service & Maintenance Booking*%0A- *Customer Name:* ${name}%0A- *Phone:* ${phone}%0A- *Service Required:* ${service}%0A- *Preferred Date:* ${date}%0A- *Issue / Notes:* ${notes}`;

  window.open(`https://wa.me/919587111100?text=${msg}`, "_blank");
  showToast("Service request logged! Hitachi Certified Technician will call to confirm slot.");
  e.target.reset();
}

// 12. Toast Notification Helper
function showToast(message) {
  let toast = document.getElementById("appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "toast-message";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// 13. Event Listeners Setup
function initEventListeners() {
  // Search input debounced
  const searchInput = document.getElementById("catalogSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderProductCatalog();
    });
  }

  // Tonnage & Star filter select elements
  const tonSelect = document.getElementById("tonnageFilterSelect");
  if (tonSelect) {
    tonSelect.addEventListener("change", (e) => {
      setTonnageFilter(e.target.value);
    });
  }

  const starSelect = document.getElementById("starFilterSelect");
  if (starSelect) {
    starSelect.addEventListener("change", (e) => {
      setStarFilter(e.target.value);
    });
  }

  // Quote form submission
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", handleQuoteSubmit);
  }

  // Service booking form
  const srvForm = document.getElementById("serviceBookingForm");
  if (srvForm) {
    srvForm.addEventListener("submit", handleServiceBooking);
  }

  // Close modals on clicking backdrop
  window.addEventListener("click", (e) => {
    const prodModal = document.getElementById("productModal");
    const quoteModal = document.getElementById("quoteModal");
    const compModal = document.getElementById("compareModal");
    const checkModal = document.getElementById("checkoutModal");
    const succModal = document.getElementById("orderSuccessModal");
    const trkModal = document.getElementById("trackOrderModal");
    const invModal = document.getElementById("invoiceModal");

    if (e.target === prodModal) closeProductModal();
    if (e.target === quoteModal) closeQuoteModal();
    if (e.target === compModal) closeCompareModal();
    if (e.target === checkModal) closeCheckoutModal();
    if (e.target === succModal) succModal.classList.remove("open");
    if (e.target === trkModal) closeTrackModal();
    if (e.target === invModal) closeInvoiceModal();
  });

  // Keyboard shortcut (Escape to close any open modal)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeQuoteModal();
      closeCompareModal();
      closeCheckoutModal();
      closeTrackModal();
      closeInvoiceModal();
      const drawer = document.getElementById("cartDrawer");
      const overlay = document.getElementById("cartOverlay");
      if (drawer) drawer.classList.remove("open");
      if (overlay) overlay.classList.remove("open");
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobileNavToggle");
  const navMenu = document.getElementById("mainNavMenu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }
}

// ============================================================================
// 14. SHOPPING CART LOGIC & PERSISTENCE
// ============================================================================
function saveCart() {
  localStorage.setItem("hitachi_cart", JSON.stringify(cart));
  if (appliedCoupon) {
    localStorage.setItem("hitachi_coupon", JSON.stringify(appliedCoupon));
  } else {
    localStorage.removeItem("hitachi_coupon");
  }
  updateCartUI();
}

function addToCart(productId, quantity = 1, openDrawer = false) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity = Math.min(10, existing.quantity + quantity);
  } else {
    cart.push({ id: prod.id, quantity });
  }

  saveCart();
  showToast(`✓ Added "${prod.name}" to cart!`);

  if (openDrawer) {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
      drawer.classList.add("open");
      overlay.classList.add("open");
    }
  }
}

function buyNow(productId) {
  addToCart(productId, 1, false);
  openCheckoutModal();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateCartItemQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    item.quantity = Math.min(10, item.quantity);
    saveCart();
  }
}

function toggleCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      drawer.classList.remove("open");
      overlay.classList.remove("open");
    } else {
      drawer.classList.add("open");
      overlay.classList.add("open");
    }
  }
}

function getCartCalculations() {
  let subtotal = 0;
  const items = [];

  cart.forEach(c => {
    const p = PRODUCTS_DATA.find(prod => prod.id === c.id);
    if (p) {
      const itemTotal = p.price * c.quantity;
      subtotal += itemTotal;
      items.push({ ...p, quantity: c.quantity, itemTotal });
    }
  });

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.code === 'HITACHI5000' && subtotal >= 40000) {
      discount = 5000;
    } else if (appliedCoupon.code === 'FIRSTBUY') {
      discount = Math.min(2000, Math.round(subtotal * 0.05));
    } else if (appliedCoupon.code === 'COOLSUMMER' && subtotal >= 30000) {
      discount = 2500;
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const baseAmount = Math.round(discountedSubtotal / 1.18);
  const gstAmount = discountedSubtotal - baseAmount;
  const grandTotal = discountedSubtotal;

  return { subtotal, discount, baseAmount, gstAmount, grandTotal, items };
}

function updateCartUI() {
  const headerCount = document.getElementById("headerCartCount");
  const drawerCount = document.getElementById("cartDrawerCount");
  const emptyState = document.getElementById("cartEmptyState");
  const itemsList = document.getElementById("cartItemsList");
  const drawerFooter = document.getElementById("cartDrawerFooter");

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (headerCount) headerCount.textContent = totalQty;
  if (drawerCount) drawerCount.textContent = totalQty;

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (itemsList) itemsList.style.display = "none";
    if (drawerFooter) drawerFooter.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (itemsList) itemsList.style.display = "flex";
  if (drawerFooter) drawerFooter.style.display = "block";

  const { subtotal, discount, gstAmount, grandTotal, items } = getCartCalculations();

  if (itemsList) {
    itemsList.innerHTML = items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <div class="cart-item-variant">${item.subCategory} • ${item.tonnage || item.badge}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
        </div>
        <div style="display: flex; align-items: center;">
          <div class="cart-qty-ctrl">
            <button class="cart-qty-btn" onclick="updateCartItemQty('${item.id}', -1)">-</button>
            <span class="cart-qty-val">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="updateCartItemQty('${item.id}', 1)">+</button>
          </div>
          <button class="cart-item-del" onclick="removeFromCart('${item.id}')" title="Remove item">×</button>
        </div>
      </div>
    `).join('');
  }

  // Update Summary Rows
  const elSubtotal = document.getElementById("cartSubtotal");
  const elDiscountRow = document.getElementById("cartDiscountRow");
  const elDiscount = document.getElementById("cartDiscount");
  const elGst = document.getElementById("cartGstBreakdown");
  const elGrandTotal = document.getElementById("cartGrandTotal");

  if (elSubtotal) elSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (elGst) elGst.textContent = `₹${gstAmount.toLocaleString('en-IN')}`;
  if (elGrandTotal) elGrandTotal.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

  if (discount > 0) {
    if (elDiscountRow) elDiscountRow.style.display = "flex";
    if (elDiscount) elDiscount.textContent = `-₹${discount.toLocaleString('en-IN')}`;
  } else {
    if (elDiscountRow) elDiscountRow.style.display = "none";
  }

  // Coupon badge
  const couponBadge = document.getElementById("appliedCouponBadge");
  const couponText = document.getElementById("couponText");
  if (appliedCoupon && discount > 0) {
    if (couponBadge) couponBadge.style.display = "flex";
    if (couponText) couponText.textContent = `Promo Code "${appliedCoupon.code}" Applied: ₹${discount.toLocaleString('en-IN')} OFF`;
  } else {
    if (couponBadge) couponBadge.style.display = "none";
  }

  // Checkout modal amount
  const elCheckoutAmount = document.getElementById("checkoutTotalAmount");
  if (elCheckoutAmount) elCheckoutAmount.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
}

function applyCouponCode() {
  const input = document.getElementById("cartCouponInput");
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  const { subtotal } = getCartCalculations();

  if (code === 'HITACHI5000') {
    if (subtotal < 40000) {
      showToast("Coupon HITACHI5000 requires minimum order value of ₹40,000");
      return;
    }
    appliedCoupon = { code: 'HITACHI5000', discount: 5000 };
    showToast("🎉 Coupon HITACHI5000 applied! ₹5,000 OFF");
  } else if (code === 'FIRSTBUY') {
    appliedCoupon = { code: 'FIRSTBUY', rate: 0.05 };
    showToast("🎉 Welcome coupon FIRSTBUY applied! 5% OFF");
  } else if (code === 'COOLSUMMER') {
    if (subtotal < 30000) {
      showToast("Coupon COOLSUMMER requires minimum order value of ₹30,000");
      return;
    }
    appliedCoupon = { code: 'COOLSUMMER', discount: 2500 };
    showToast("🎉 Coupon COOLSUMMER applied! ₹2,500 OFF");
  } else {
    showToast("❌ Invalid promo code. Try: HITACHI5000, FIRSTBUY, or COOLSUMMER");
    return;
  }

  saveCart();
  input.value = "";
}

function removeCouponCode() {
  appliedCoupon = null;
  saveCart();
  showToast("Coupon removed.");
}

// ============================================================================
// 15. MULTI-STEP CHECKOUT & PAYMENT LOGIC
// ============================================================================
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Your cart is empty. Please add a model to proceed.");
    return;
  }
  // Close cart drawer if open
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  }

  const modal = document.getElementById("checkoutModal");
  if (modal) {
    goToCheckoutStep1();
    modal.classList.add("open");
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("open");
  if (qrTimerInterval) clearInterval(qrTimerInterval);
}

function goToCheckoutStep1() {
  currentCheckoutStep = 1;
  const s1 = document.getElementById("checkoutStep1");
  const s2 = document.getElementById("checkoutStep2");
  const ind1 = document.getElementById("step1Indicator");
  const ind2 = document.getElementById("step2Indicator");

  if (s1) s1.style.display = "block";
  if (s2) s2.style.display = "none";
  if (ind1) ind1.classList.add("active");
  if (ind2) ind2.classList.remove("active");
}

function goToCheckoutStep2() {
  // Validate Step 1
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const addr = document.getElementById("custAddress").value.trim();

  if (!name || name.length < 2) {
    showToast("Please enter your full name.");
    return;
  }
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length !== 10) {
    showToast("Please enter a valid 10-digit Indian mobile number.");
    return;
  }
  if (!addr || addr.length < 5) {
    showToast("Please enter your complete street/house address.");
    return;
  }

  currentCheckoutStep = 2;
  const s1 = document.getElementById("checkoutStep1");
  const s2 = document.getElementById("checkoutStep2");
  const ind1 = document.getElementById("step1Indicator");
  const ind2 = document.getElementById("step2Indicator");

  if (s1) s1.style.display = "none";
  if (s2) s2.style.display = "block";
  if (ind1) ind1.classList.remove("active");
  if (ind2) ind2.classList.add("active");

  const { grandTotal } = getCartCalculations();
  selectPaymentMethod(selectedPaymentMethod);
  populateEmiTable(grandTotal);
  startQrTimer();
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;

  // Highlight tab
  document.querySelectorAll(".pay-tab").forEach(tab => {
    const radio = tab.querySelector("input[type='radio']");
    if (radio) {
      const match = radio.value === method;
      radio.checked = match;
      tab.classList.toggle("active", match);
    }
  });

  // Hide all payment detail sections
  const secUpi = document.getElementById("sectionPayUpi");
  const secCard = document.getElementById("sectionPayCard");
  const secNet = document.getElementById("sectionPayNetBanking");
  const secEmi = document.getElementById("sectionPayEmi");
  const secCod = document.getElementById("sectionPayCod");

  if (secUpi) secUpi.style.display = method === "UPI_QR" ? "block" : "none";
  if (secCard) secCard.style.display = method === "CARD" ? "grid" : "none";
  if (secNet) secNet.style.display = method === "NETBANKING" ? "block" : "none";
  if (secEmi) secEmi.style.display = method === "EMI" ? "block" : "none";
  if (secCod) secCod.style.display = method === "COD" ? "block" : "none";

  if (method === "UPI_QR") {
    startQrTimer();
  } else if (qrTimerInterval) {
    clearInterval(qrTimerInterval);
  }
}

function startQrTimer() {
  if (qrTimerInterval) clearInterval(qrTimerInterval);
  let timeLeft = 300; // 5 minutes
  const timerSpan = document.getElementById("qrTimer");

  // Dynamic QR generator via quickchart or svg
  const qrImg = document.getElementById("dynamicQrImage");
  const { grandTotal } = getCartCalculations();
  if (qrImg) {
    const upiStr = encodeURIComponent(`upi://pay?pa=hitachisikar@icici&pn=HitachiBrandShopKKEnterprises&am=${grandTotal}&cu=INR&tn=HitachiShowroomSikar`);
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${upiStr}&margin=4`;
  }

  function updateTimer() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    if (timerSpan) {
      timerSpan.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    if (timeLeft <= 0) {
      clearInterval(qrTimerInterval);
      if (timerSpan) timerSpan.textContent = "00:00 (Expired)";
    }
    timeLeft--;
  }

  updateTimer();
  qrTimerInterval = setInterval(updateTimer, 1000);
}

function copyUpiId() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText("hitachisikar@icici").then(() => {
      showToast("✓ Official UPI ID 'hitachisikar@icici' copied!");
    }).catch(() => {
      showToast("UPI ID: hitachisikar@icici");
    });
  } else {
    showToast("UPI ID: hitachisikar@icici");
  }
}

function formatCardNumber(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  val = val.match(/.{1,4}/g)?.join(' ') || val;
  input.value = val;
}

function populateEmiTable(grandTotal) {
  const tbody = document.getElementById("emiTableBody");
  if (!tbody) return;

  const tenures = [
    { months: 3, bank: "Bajaj Finserv No-Cost EMI" },
    { months: 6, bank: "HDFC Bank 0% Interest EMI" },
    { months: 9, bank: "ICICI Bank 0% Interest EMI" },
    { months: 12, bank: "SBI Credit Card 0% Interest EMI" }
  ];

  tbody.innerHTML = tenures.map((t, idx) => {
    const perMonth = Math.round(grandTotal / t.months);
    return `
      <tr>
        <td><strong>${t.months} Months</strong><br/><span style="font-size: 0.72rem; color: #64748b;">${t.bank}</span></td>
        <td><strong style="color: var(--text-primary);">₹${perMonth.toLocaleString('en-IN')}/mo</strong></td>
        <td><span style="color: #16a34a; font-weight: 800;">0% Interest</span></td>
        <td><input type="radio" name="emiTenure" value="${t.months}" ${idx === 1 ? 'checked' : ''} /></td>
      </tr>
    `;
  }).join('');
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();

  const btn = document.getElementById("btnPlaceOrder");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Processing & Securing Order...";
  }

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const email = document.getElementById("custEmail")?.value.trim() || "";
  const address = document.getElementById("custAddress").value.trim();
  const landmark = document.getElementById("custLandmark")?.value.trim() || "";
  const city = document.getElementById("custCity")?.value.trim() || "Sikar";
  const pincode = document.getElementById("custPincode")?.value.trim() || "332001";
  const deliverySlot = document.getElementById("custDeliverySlot")?.value || "Express Same-Day";
  const gstin = document.getElementById("custGstin")?.value.trim() || "";
  const utr = document.getElementById("upiUtrNumber")?.value.trim() || "";

  const payload = {
    name,
    phone,
    email,
    address,
    landmark,
    city,
    pincode,
    deliverySlot,
    gstin,
    paymentMethod: selectedPaymentMethod,
    transactionRef: utr || `TXN${Date.now().toString().slice(-8)}`,
    couponCode: appliedCoupon ? appliedCoupon.code : "",
    items: cart.map(i => ({ id: i.id, quantity: i.quantity }))
  };

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Server error while registering order');
    }

    lastConfirmedOrder = result.order;

    // Clear cart
    cart = [];
    appliedCoupon = null;
    saveCart();

    // Close checkout modal
    closeCheckoutModal();

    // Show order success modal
    showOrderSuccess(lastConfirmedOrder);
  } catch (err) {
    console.error(err);
    showToast(`❌ Error: ${err.message}`);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Confirm Order & Book Now →";
    }
  }
}

function showOrderSuccess(order) {
  const modal = document.getElementById("orderSuccessModal");
  const idSpan = document.getElementById("successOrderId");
  const detailsDiv = document.getElementById("successOrderDetails");
  const btnWa = document.getElementById("btnSuccessWhatsApp");

  if (idSpan) idSpan.textContent = order.id;

  if (detailsDiv) {
    detailsDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>Customer: <strong>${order.customer.name}</strong></span>
        <span>Mobile: <strong>+91 ${order.customer.phone}</strong></span>
      </div>
      <div style="margin-bottom: 8px;">
        Delivery Address: <strong>${order.customer.address}, ${order.customer.city} (${order.customer.pincode})</strong>
      </div>
      <div style="margin-bottom: 12px; color: #047857; font-weight: 700;">
        Installation Slot: ${order.customer.deliverySlot}
      </div>
      <div style="border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 10px;">
        <strong>Items Ordered:</strong>
        <ul style="list-style: none; padding: 0; margin: 6px 0 10px;">
          ${order.items.map(i => `<li>• ${i.name} (Qty: ${i.quantity}) - ₹${i.total.toLocaleString('en-IN')}</li>`).join('')}
        </ul>
        <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1rem; color: var(--hitachi-red);">
          <span>Total Paid / Payable (${order.payment.method}):</span>
          <span>₹${order.pricing.grandTotal.toLocaleString('en-IN')}</span>
        </div>
      </div>
    `;
  }

  if (btnWa) {
    const waMsg = encodeURIComponent(`Hi K.K. Enterprises Hitachi Brand Shop!%0A*Order Booking Confirmed*%0A- *Order ID:* ${order.id}%0A- *Customer:* ${order.customer.name}%0A- *Phone:* +91 ${order.customer.phone}%0A- *Address:* ${order.customer.address}, ${order.customer.city}%0A- *Amount:* ₹${order.pricing.grandTotal.toLocaleString('en-IN')}%0A- *Payment:* ${order.payment.method} (${order.payment.status})%0A%0APlease confirm delivery & installation dispatch.`);
    btnWa.onclick = () => window.open(`https://wa.me/919587111100?text=${waMsg}`, '_blank');
  }

  // Pre-generate invoice in background
  renderInvoiceHtml(order);

  if (modal) modal.classList.add("open");
}

function closeSuccessModalAndTrack() {
  const modal = document.getElementById("orderSuccessModal");
  if (modal) modal.classList.remove("open");

  if (lastConfirmedOrder) {
    openTrackModal(lastConfirmedOrder.id);
  }
}

// ============================================================================
// 16. OFFICIAL GST TAX INVOICE GENERATOR
// ============================================================================
function renderInvoiceHtml(order) {
  const area = document.getElementById("printableInvoiceArea");
  if (!area || !order) return;

  const invDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  area.innerHTML = `
    <div class="inv-header-row">
      <div class="inv-dealer-info">
        <h2>HITACHI BRAND SHOP</h2>
        <h4 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 4px;">K.K. ENTERPRISES</h4>
        <p>
          Authorized Dealer: Hitachi Air Conditioners &amp; Home Appliances<br/>
          Ganpati Tower, Mohalla Qureshi / Sikar Roadlines Area, Sikar, Rajasthan - 332001<br/>
          <strong>GSTIN:</strong> 08AABCK1234F1Z5 | <strong>Phone:</strong> +91 95871 11100 | <strong>Email:</strong> sales@hitachisikar.com
        </p>
      </div>
      <div class="inv-meta-info">
        <h3 style="color: var(--hitachi-red);">TAX INVOICE / CASH MEMO</h3>
        <p>
          <strong>Invoice No:</strong> INV-${order.orderNumber}<br/>
          <strong>Order Ref:</strong> ${order.id}<br/>
          <strong>Date:</strong> ${invDate}<br/>
          <strong>Place of Supply:</strong> Rajasthan (08)
        </p>
      </div>
    </div>

    <div class="inv-parties-grid">
      <div>
        <strong style="display: block; color: var(--text-primary); margin-bottom: 6px;">BILL TO / SHIP TO:</strong>
        <strong>${order.customer.name}</strong><br/>
        Address: ${order.customer.address}, ${order.customer.landmark ? order.customer.landmark + ', ' : ''}${order.customer.city} - ${order.customer.pincode}<br/>
        Mobile: +91 ${order.customer.phone}<br/>
        ${order.customer.email ? 'Email: ' + order.customer.email + '<br/>' : ''}
        GSTIN: ${order.customer.gstin}
      </div>
      <div>
        <strong style="display: block; color: var(--text-primary); margin-bottom: 6px;">DISPATCH &amp; PAYMENT INFO:</strong>
        <strong>Payment Method:</strong> ${order.payment.method}<br/>
        <strong>Payment Status:</strong> ${order.payment.status}<br/>
        <strong>Transaction Ref:</strong> ${order.payment.transactionRef}<br/>
        <strong>Scheduled Slot:</strong> ${order.customer.deliverySlot}<br/>
        <strong>Installation:</strong> Hitachi Authorized Certified Team
      </div>
    </div>

    <table class="inv-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Description of Goods</th>
          <th>HSN/SAC</th>
          <th>Qty</th>
          <th class="num">Unit Price (₹)</th>
          <th class="num">Taxable Value (₹)</th>
          <th class="num">GST (18%)</th>
          <th class="num">Total Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map((item, idx) => {
          let hsn = "8415"; // AC
          if (item.category === "washing_machines") hsn = "8450";
          else if (item.category === "appliances" && item.name.includes("Refrigerator")) hsn = "8418";
          else if (item.category === "appliances") hsn = "8504";

          const taxable = Math.round(item.total / 1.18);
          const gst = item.total - taxable;
          return `
            <tr>
              <td>${idx + 1}</td>
              <td>
                <strong>${item.name}</strong><br/>
                <span style="font-size: 0.74rem; color: #64748b;">${item.category} • Official Warranty Included</span>
              </td>
              <td>${hsn}</td>
              <td>${item.quantity}</td>
              <td class="num">₹${item.price.toLocaleString('en-IN')}</td>
              <td class="num">₹${taxable.toLocaleString('en-IN')}</td>
              <td class="num">₹${gst.toLocaleString('en-IN')}</td>
              <td class="num"><strong>₹${item.total.toLocaleString('en-IN')}</strong></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>

    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div style="max-width: 450px; font-size: 0.78rem; color: #64748b; line-height: 1.5;">
        <strong>Terms &amp; Warranty Conditions:</strong><br/>
        1. All Hitachi ACs carry 10 Years Inverter Compressor + 5 Years PCB Warranty from Hitachi Home &amp; Life Solutions.<br/>
        2. Free standard installation includes 3m copper piping, bracket, and indoor/outdoor unit mounting.<br/>
        3. Subject to Sikar Jurisdiction.
      </div>

      <div class="inv-totals-box">
        <div class="inv-total-row">
          <span>Taxable Subtotal:</span>
          <strong>₹${order.pricing.baseAmount.toLocaleString('en-IN')}</strong>
        </div>
        <div class="inv-total-row">
          <span>CGST (9%):</span>
          <span>₹${Math.round(order.pricing.gstAmount / 2).toLocaleString('en-IN')}</span>
        </div>
        <div class="inv-total-row">
          <span>SGST (9%):</span>
          <span>₹${Math.round(order.pricing.gstAmount / 2).toLocaleString('en-IN')}</span>
        </div>
        ${order.pricing.discount > 0 ? `
          <div class="inv-total-row" style="color: #16a34a;">
            <span>Promo Discount:</span>
            <span>-₹${order.pricing.discount.toLocaleString('en-IN')}</span>
          </div>
        ` : ''}
        <div class="inv-total-row">
          <span>Delivery &amp; Installation:</span>
          <span>FREE PROMO</span>
        </div>
        <div class="inv-total-row grand">
          <span>Grand Total:</span>
          <span style="color: var(--hitachi-red);">₹${order.pricing.grandTotal.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>

    <div class="inv-signatures">
      <div>
        <div class="stamp-box">
          HITACHI BRAND SHOP<br/>
          K.K. ENTERPRISES<br/>
          SIKAR (RAJASTHAN)<br/>
          ★ VERIFIED OFFICIAL DEALER ★
        </div>
      </div>
      <div style="text-align: right;">
        <p style="margin-bottom: 40px;">For <strong>K.K. ENTERPRISES</strong></p>
        <p style="font-weight: 700; border-top: 1px solid #cbd5e1; padding-top: 4px;">Authorized Signatory</p>
      </div>
    </div>
  `;
}

function printOfficialInvoice() {
  if (!lastConfirmedOrder) {
    showToast("No active order selected to print.");
    return;
  }
  renderInvoiceHtml(lastConfirmedOrder);
  const modal = document.getElementById("invoiceModal");
  if (modal) modal.classList.add("open");
}

function closeInvoiceModal() {
  const modal = document.getElementById("invoiceModal");
  if (modal) modal.classList.remove("open");
}

// ============================================================================
// 17. LIVE ORDER TRACKING SYSTEM
// ============================================================================
function openTrackModal(orderId = "") {
  const modal = document.getElementById("trackOrderModal");
  const input = document.getElementById("trackInputId");
  if (modal) {
    if (orderId && input) {
      input.value = orderId;
      lookupOrderTracking(orderId);
    }
    modal.classList.add("open");
  }
}

function closeTrackModal() {
  const modal = document.getElementById("trackOrderModal");
  if (modal) modal.classList.remove("open");
}

async function lookupOrderTracking(overrideId = "") {
  const input = document.getElementById("trackInputId");
  const targetId = (overrideId || (input ? input.value : "")).trim().toUpperCase();
  const resArea = document.getElementById("trackingResultArea");

  if (!targetId) {
    showToast("Please enter an Order ID to track.");
    return;
  }

  if (resArea) {
    resArea.style.display = "block";
    resArea.innerHTML = `<p style="text-align: center; color: #64748b;">Searching official showroom database for #${targetId}...</p>`;
  }

  try {
    const response = await fetch(`/api/orders/${encodeURIComponent(targetId)}`);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Order not found");
    }

    const o = result.order;

    resArea.innerHTML = `
      <div style="background: #f8fafc; border-radius: var(--radius-md); padding: 18px; margin-bottom: 20px; border: 1px solid var(--border-light);">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
          <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0;">Order #${o.id}</h4>
          <span style="font-size: 0.78rem; font-weight: 800; color: #047857; background: #d1fae5; padding: 3px 8px; border-radius: 4px;">Status: ${o.status}</span>
        </div>
        <p style="font-size: 0.84rem; color: #64748b; margin: 0 0 6px;">Customer: <strong>${o.customer.name}</strong> (+91 ${o.customer.phone})</p>
        <p style="font-size: 0.84rem; color: #64748b; margin: 0;">Delivery Address: <strong>${o.customer.address}, ${o.customer.city}</strong></p>
        <p style="font-size: 0.84rem; color: #0f172a; margin-top: 6px;">Slot: <strong>${o.customer.deliverySlot}</strong></p>
      </div>

      <div class="tracking-timeline">
        <div class="track-step done">
          <div class="track-dot">✓</div>
          <div class="track-info">
            <h5>Order Confirmed &amp; Payment Recorded</h5>
            <p>${new Date(o.createdAt).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })} • Payment: ${o.payment.status}</p>
          </div>
        </div>

        <div class="track-step active">
          <div class="track-dot">📦</div>
          <div class="track-info">
            <h5>Showroom Allocation &amp; Pre-Dispatch Check</h5>
            <p>K.K. Enterprises Ganpati Tower Sikar • Serial &amp; copper kit verified</p>
          </div>
        </div>

        <div class="track-step">
          <div class="track-dot">🚚</div>
          <div class="track-info">
            <h5>Out for Express Delivery</h5>
            <p>Vehicle dispatch to ${o.customer.city}</p>
          </div>
        </div>

        <div class="track-step">
          <div class="track-dot">🔧</div>
          <div class="track-info">
            <h5>Hitachi Certified Installation &amp; Demo</h5>
            <p>Free standard installation &amp; warranty card handover</p>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-light);">
        <button class="btn btn-outline" id="btnTrackViewInv">
          📄 View GST Invoice
        </button>
        <a href="https://wa.me/919587111100?text=${encodeURIComponent(`Hi K.K. Enterprises, I am checking status for Order ID: ${o.id}`)}" target="_blank" class="btn btn-whatsapp">
          Showroom Helpline
        </a>
      </div>
    `;

    const btnTrackInv = document.getElementById("btnTrackViewInv");
    if (btnTrackInv) {
      btnTrackInv.onclick = () => {
        lastConfirmedOrder = o;
        printOfficialInvoice();
      };
    }
  } catch (e) {
    resArea.innerHTML = `
      <div style="text-align: center; padding: 24px; background: #fff1f2; border-radius: var(--radius-md); border: 1px solid #fecdd3;">
        <div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>
        <h4 style="color: #be123c; margin-bottom: 6px;">Order Not Found</h4>
        <p style="font-size: 0.85rem; color: #9f1239; margin-bottom: 14px;">${e.message}. Please double-check your Order ID (e.g. HKK-2026-4821).</p>
        <a href="tel:+919587111100" class="btn btn-primary" style="font-size: 0.85rem;">Call Showroom: +91 95871 11100</a>
      </div>
    `;
  }
}

// ==========================================================================
// 23. THEME ENGINE (DARK / LIGHT LUXURY THEME)
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem("hitachi_theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const nextTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("hitachi_theme", nextTheme);
  updateThemeIcon(nextTheme);
  showToast(nextTheme === "dark" ? "🌙 Obsidian Midnight Theme Activated" : "☀️ Arctic Daylight Theme Activated");
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("themeToggleBtn");
  if (btn) {
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.title = theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme";
  }
}

// ==========================================================================
// 24. HERO INTERACTIVE AC COOLING SIMULATOR
// ==========================================================================
let simTemp = 18;
let simMode = "jet";

const SIM_TEMP_DATA = {
  16: { status: "Arctic JetCool Active (Desert 52°C Override)", watts: "820 Watts", savings: "46% vs Non-Inv" },
  17: { status: "Extreme Fast Chill Active", watts: "750 Watts", savings: "52% vs Non-Inv" },
  18: { status: "Rapid Inverter Chilling Active", watts: "680 Watts", savings: "58% vs Non-Inv" },
  19: { status: "Heavy Cooling Mode", watts: "610 Watts", savings: "61% vs Non-Inv" },
  20: { status: "Comfort Tropical Cooling", watts: "540 Watts", savings: "64% vs Non-Inv" },
  21: { status: "Quiet Precision Flow", watts: "480 Watts", savings: "67% vs Non-Inv" },
  22: { status: "Pleasant Japanese Breeze", watts: "420 Watts", savings: "71% vs Non-Inv" },
  23: { status: "Balanced Low-Power Chilling", watts: "370 Watts", savings: "75% vs Non-Inv" },
  24: { status: "Govt. Standard Optimal Eco Mode", watts: "330 Watts", savings: "78% vs Non-Inv" },
  25: { status: "High Efficiency Night Flow", watts: "290 Watts", savings: "80% vs Non-Inv" },
  26: { status: "Ultra-Power Saver Whisper Mode", watts: "260 Watts", savings: "83% vs Non-Inv" }
};

function initACSimulator() {
  updateSimulatorUI();
}

function adjustSimulatorTemp(delta) {
  simTemp = Math.max(16, Math.min(26, simTemp + delta));
  updateSimulatorUI();
}

function setSimulatorMode(mode, targetTemp, element) {
  simMode = mode;
  simTemp = targetTemp;
  document.querySelectorAll(".sim-mode-btn").forEach(b => b.classList.remove("active"));
  if (element) element.classList.add("active");
  
  if (mode === "frost") {
    const disp = document.getElementById("acDisplayTemp");
    const sub = document.getElementById("simStatusSub");
    if (disp) disp.textContent = "CL";
    if (sub) sub.textContent = "FrostWash Coil Freezing (-15°C Active)";
    const watts = document.getElementById("simWattsVal");
    if (watts) watts.textContent = "120 Watts";
    const sav = document.getElementById("simSavingsVal");
    if (sav) sav.textContent = "Auto-Sanitizing";
    showToast("❄️ FrostWash Active: Freezing coil to -15°C to flush bacteria & desert dust!");
    return;
  }
  
  updateSimulatorUI();
}

function updateSimulatorUI() {
  const disp = document.getElementById("acDisplayTemp");
  const big = document.getElementById("simTempBig");
  const sub = document.getElementById("simStatusSub");
  const watts = document.getElementById("simWattsVal");
  const sav = document.getElementById("simSavingsVal");

  if (disp) disp.textContent = `${simTemp}°C`;
  if (big) big.textContent = `${simTemp}°C`;

  const info = SIM_TEMP_DATA[simTemp] || SIM_TEMP_DATA[18];
  if (sub) sub.textContent = info.status;
  if (watts) watts.textContent = info.watts;
  if (sav) sav.textContent = info.savings;
}

// ==========================================================================
// 25. HITACHI 360° TECH HOTSPOT EXPLORER
// ==========================================================================
const HOTSPOTS_DATA = {
  frostwash: {
    badge: "FEATURE #1: PATENTED COIL HYGIENE",
    title: "FrostWash 3.0 Self-Cleaning Technology",
    desc: "In Rajasthan's dusty climate, dust builds up inside cooling coils within weeks, degrading cooling by 40%. Hitachi's patented FrostWash freezes the heat exchanger to -15°C, trapping airborne dust and bacteria, then instantly melts the frost to flush it cleanly away through the drain pipe.",
    checklist: [
      "Eliminates 99.9% viruses, bacteria, and fine desert dust particles",
      "Saves up to ₹3,500/year in routine chemical coil servicing costs",
      "Maintains factory-fresh airflow velocity for 10+ years"
    ]
  },
  compressor: {
    badge: "FEATURE #2: DESERT HEAT SHIELD",
    title: "52°C Heavy Tropical Rotary Compressor",
    desc: "Standard AC compressors trip or blow hot air when outside temperatures cross 45°C in Sikar. Hitachi's Heavy Tropical Rotary Compressor features specialized rare-earth permanent magnets and high-pressure chambers that maintain nonstop arctic chilling even at blistering 52°C desert heatwaves.",
    checklist: [
      "Continuous cooling guaranteed up to 52°C ambient Rajasthan summer",
      "Backed by an official 10-Year Hitachi manufacturer compressor warranty",
      "Overboost capability pushes capacity to 110% when guests arrive"
    ]
  },
  copper: {
    badge: "FEATURE #3: DURABILITY & HEAT TRANSFER",
    title: "100% Inner-Grooved Copper Condenser Tubes",
    desc: "Every Hitachi unit sold at K.K. Enterprises uses 100% genuine copper coils with micro-grooved internal rifling. This increases refrigerant surface contact area, delivering 3x faster heat rejection while offering maximum resistance against hard water and saline atmospheric oxidation.",
    checklist: [
      "100% Pure Copper Tubes — zero aluminum compromise",
      "Inner-grooved rifling speeds up heat transfer and room pull-down by 30%",
      "Extreme durability with easy reparability and high scrap value"
    ]
  },
  goldfin: {
    badge: "FEATURE #4: ANTI-CORROSION SHIELD",
    title: "Dual Gold Fin Desert Sand Barrier",
    desc: "Shekhawati's sandstorms and airborne salts can corrode standard AC fins, causing gas leaks. Hitachi equips both indoor and outdoor condenser fins with a double-layered hydrophilic Gold Fin coating that prevents dust accumulation and moisture stagnation.",
    checklist: [
      "Salt-spray tested for 1,500+ hours of rust-free continuous duty",
      "Hydrophilic golden coating ensures rapid condensation runoff",
      "Maintains maximum heat exchange efficiency year after year"
    ]
  },
  isee: {
    badge: "FEATURE #5: ARTIFICIAL INTELLIGENCE",
    title: "iSee Intelligent Human Presence Sensor",
    desc: "An infrared optical sensor scans the room in real time, detecting human presence, location, and activity levels. If people move, cool air gently follows; if the room becomes empty, the unit automatically dials down power consumption to prevent electricity waste.",
    checklist: [
      "Smart follow-me airflow directs cool drafts directly toward occupants",
      "Automatic energy-saving step-down when room is vacated",
      "Prevents chilly draft discomfort during sleeping hours"
    ]
  }
};

function initTechExplorer() {
  selectHotspot("frostwash", document.querySelector(".pin-frostwash"));
}

function selectHotspot(key, element) {
  const data = HOTSPOTS_DATA[key];
  if (!data) return;

  document.querySelectorAll(".hotspot-pin").forEach(p => p.classList.remove("active"));
  if (element) element.classList.add("active");

  const b = document.getElementById("hotspotBadge");
  const t = document.getElementById("hotspotTitle");
  const d = document.getElementById("hotspotDesc");
  const c = document.getElementById("hotspotChecklist");

  if (b) b.textContent = data.badge;
  if (t) t.textContent = data.title;
  if (d) d.textContent = data.desc;
  if (c) {
    c.innerHTML = data.checklist.map(item => `
      <div class="tech-check-item">
        <span class="tech-check-icon">✓</span>
        <span>${item}</span>
      </div>
    `).join("");
  }
}

// ==========================================================================
// 26. "FIND BY MONTHLY BUDGET" EMI MATCHER
// ==========================================================================
function initEmiBudgetMatcher() {
  updateEmiBudgetFilter(3000);
}

function updateEmiBudgetFilter(maxEmiVal) {
  const readout = document.getElementById("emiBudgetReadout");
  if (readout) readout.textContent = `₹${Number(maxEmiVal).toLocaleString("en-IN")} / mo`;

  const container = document.getElementById("emiMatchResultsGrid");
  if (!container) return;

  const matches = PRODUCTS_DATA.filter(p => {
    const approxEmi = Math.round(p.price / 18);
    return approxEmi <= Number(maxEmiVal);
  }).slice(0, 4);

  if (matches.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #94a3b8;">
        Slide higher to view matching high-tonnage or flagship models.
      </div>
    `;
    return;
  }

  container.innerHTML = matches.map(p => {
    const emi18 = Math.round(p.price / 18);
    return `
      <div class="emi-match-item">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 2px 8px; border-radius: 4px; font-weight: 700;">
              ${p.tonnage} • ${p.starRating}★
            </span>
            <span style="font-size: 0.72rem; color: #fbbf24; font-weight: 700;">0% Interest</span>
          </div>
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #ffffff; line-height: 1.4; margin-bottom: 8px;">
            ${p.name}
          </h4>
          <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 12px;">
            Showroom Offer Price: <strong style="color: #ffffff;">₹${p.price.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        <div style="padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div>
              <div style="font-size: 0.7rem; color: #94a3b8;">Starts from</div>
              <div style="font-size: 1.1rem; font-weight: 800; color: #fbbf24; font-family: var(--font-display);">
                ₹${emi18.toLocaleString("en-IN")}<span style="font-size: 0.75rem; color: #cbd5e1;">/mo</span>
              </div>
            </div>
            <div style="font-size: 0.75rem; color: #cbd5e1; text-align: right;">
              18 Mos No-Cost EMI
            </div>
          </div>
          <button class="btn btn-primary" onclick="buyNow('${p.id}')" style="width: 100%; padding: 8px 12px; font-size: 0.82rem;">
            ⚡ Buy on 0% EMI
          </button>
        </div>
      </div>
    `;
  }).join("");
}
