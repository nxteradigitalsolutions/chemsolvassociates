/**
 * CHEMSOLV ASSOCIATES - RAG KNOWLEDGE BASE
 * Compiled strictly from approved Project Description & Requirements Specification
 * Location: Ariyalur, Tamil Nadu, India — PIN 621715
 */

const CHEMSOLV_KB = [
  {
    id: "company-overview",
    title: "About Chemsolv Associates",
    category: "company",
    keywords: ["who", "about", "company", "chemsolv", "location", "ariyalur", "tamil nadu", "what do you do", "business"],
    summary: "Chemsolv Associates is a specialized corporate enterprise based in Ariyalur, Tamil Nadu, India (PIN 621715), focused on comprehensive water and wastewater treatment solutions, equipment supply, and technical engineering services.",
    content: "Chemsolv Associates is based in Ariyalur, Tamil Nadu, India — PIN 621715. The company specializes in water and wastewater treatment systems, treatment products, process monitoring instruments, swimming pool accessories, and HVAC spares, alongside expert technical services such as Planning & Design, Equipment Supply, and Annual Maintenance Contracts (AMC). In accordance with corporate standards, all claims and technical specifications reflect verified engineering data.",
    link: "about.html"
  },
  {
    id: "water-treatment-systems",
    title: "Water Treatment Systems",
    category: "products",
    keywords: ["water treatment", "ro", "reverse osmosis", "water softener", "softening", "iron removal", "demineralization", "dm plant", "ultrafiltration", "drinking water", "purification"],
    summary: "Comprehensive water purification systems including Reverse Osmosis (RO), Water Softeners, Iron Removal Systems, Demineralization (DM) plants, and Ultrafiltration (UF) systems.",
    content: "Chemsolv Associates provides advanced Water Treatment Systems tailored to commercial and industrial demands:\n• **Reverse Osmosis (RO) Systems**: High-recovery brackish and industrial RO plants for TDS reduction.\n• **Water Softeners**: Ion-exchange systems eliminating calcium and magnesium hardness.\n• **Iron Removal Systems**: Catalytic oxidation and media filtration for high iron content removal.\n• **Demineralization (DM) Plants**: Two-bed and mixed-bed ion-exchange for ultra-pure industrial water.\n• **Ultrafiltration (UF) Systems**: Hollow-fiber membrane filtration removing suspended solids and colloidal turbidity.",
    link: "products.html#water-treatment"
  },
  {
    id: "wastewater-treatment-systems",
    title: "Wastewater Treatment (STP & ETP)",
    category: "products",
    keywords: ["wastewater", "sewage", "stp", "effluent", "etp", "mbbr", "mbr", "sludge", "dewatering", "zero liquid discharge", "treatment plant"],
    summary: "Modern wastewater engineering solutions including Sewage Treatment Plants (STP), Effluent Treatment Plants (ETP), MBBR, MBR, and Sludge Dewatering equipment.",
    content: "Chemsolv Associates offers specialized Wastewater Treatment Systems for residential complexes, hospitality, pharmaceuticals, and manufacturing sectors:\n• **Sewage Treatment Plants (STP)**: Compact, odor-controlled biological wastewater treatment.\n• **Effluent Treatment Plants (ETP)**: Chemical and biological treatment neutralizing industrial trade effluents.\n• **MBBR Systems**: Moving Bed Biofilm Reactor technology for high-efficiency BOD/COD removal.\n• **MBR Systems**: Membrane Bioreactor systems combining biological treatment with microfiltration for reusable quality effluent.\n• **Sludge Dewatering Equipment**: High-pressure filter presses and centrifuges for solid-liquid separation.",
    link: "products.html#wastewater-treatment"
  },
  {
    id: "water-treatment-components",
    title: "Water & Wastewater Treatment Products & Spares",
    category: "products",
    keywords: ["components", "accessories", "dosing pumps", "membranes", "filter media", "sand", "carbon", "resin", "diffusers", "valves", "cartridges"],
    summary: "Individual treatment components, consumables, filter media, dosing pumps, aeration diffusers, filter cartridges, and multiport valves.",
    content: "Chemsolv Associates supplies high-grade individual treatment components:\n• High-performance RO Membranes (4-inch & 8-inch)\n• Chemical Dosing Pumps (diaphragm and electronic dosing)\n• Multi-port Control Valves (manual and automatic)\n• Aeration Fine Bubble Diffusers (tubular and disc)\n• Premium Filter Media (Activated Carbon, Quartz Sand, Anthracite, and Ion-Exchange Resins)\n• Micron Sediment and Wound Cartridges.",
    link: "products.html#water-wastewater-products"
  },
  {
    id: "pool-accessories",
    title: "Swimming Pool Accessories",
    category: "products",
    keywords: ["swimming pool", "pool", "accessories", "pool filtration", "sand filter", "pool pump", "skimmer", "pool lights", "chlorinator"],
    summary: "Commercial and residential swimming pool equipment including filtration pumps, top-mount sand filters, surface skimmers, and underwater LED lights.",
    content: "Our Swimming Pool product range encompasses reliable circulation and hygiene systems:\n• Heavy-duty self-priming pool filtration pumps\n• Fiberglass top-mount and side-mount sand filters\n• Heavy-duty ABS surface skimmers, main drains, and return inlets\n• Telescopic cleaning equipment, vacuum heads, and leaf rakes\n• Underwater IP68 LED illumination systems.",
    link: "products.html#swimming-pool-accessories"
  },
  {
    id: "process-monitoring",
    title: "Process Monitoring & Instrumentation",
    category: "products",
    keywords: ["monitoring", "process monitoring", "flowmeter", "flow meter", "ph meter", "conductivity", "tds", "sensors", "transmitters", "instruments"],
    summary: "Industrial online analytical instruments including digital flowmeters, online pH/ORP controllers, conductivity monitors, and level transmitters.",
    content: "Chemsolv Associates delivers precision instrumentation for real-time water quality monitoring:\n• **Electromagnetic & Ultrasonic Flowmeters**: Accurate pipe flow measurement with digital telemetry options.\n• **Online pH & ORP Controllers**: Continuous process monitoring with temperature compensation.\n• **Conductivity / TDS Transmitters**: Critical for RO permeate monitoring and boiler feed water.\n• **Differential Pressure Transmitters** for filter backwash optimization.",
    link: "products.html#process-monitoring"
  },
  {
    id: "hvac-spares",
    title: "HVAC Spares & Cooling Water Spares",
    category: "products",
    keywords: ["hvac", "cooling tower", "chiller", "condenser", "hvac spares", "cooling water", "valves", "dosing", "strainers"],
    summary: "HVAC cooling tower spares, condenser water valves, inline Y-strainers, and automated chemical dosing units.",
    content: "We supply essential HVAC & cooling water circuit spares:\n• Cooling tower drift eliminators, fill media, and spray nozzles\n• Condenser and chilled water balancing and butterfly valves\n• Heavy-duty inline Y-strainers and basket strainers\n• Cooling tower biocides and corrosion inhibitor dosing systems.",
    link: "products.html#hvac-spares"
  },
  {
    id: "services-all",
    title: "Engineering Services & AMC",
    category: "services",
    keywords: ["services", "amc", "annual maintenance", "maintenance", "repair", "refurbishment", "planning", "design", "retrofitting", "consultancy"],
    summary: "Full lifecycle water engineering services: Planning & Design, Equipment Supply, Annual Maintenance Contracts (AMC), Repair & Refurbishment, Retrofitting, and Consultancy.",
    content: "Chemsolv Associates provides verified engineering and operational services:\n1. **Planning & Design**: Water quality assessments and process sizing for STPs, ETPs, and RO plants.\n2. **Equipment Supply**: Certified component sourcing and on-schedule delivery.\n3. **Annual Maintenance Contracts (AMC)**: Scheduled preventive maintenance, water analysis, and round-the-clock breakdown support.\n4. **Repair & Refurbishment**: Pump overhauls, membrane descaling, media replacement, and automation re-calibration.\n5. **Upgradation & Retrofitting**: Converting legacy systems to modern energy-efficient MBBR/MBR technology.\n6. **Consultancy**: Regulatory compliance audits and water conservation planning.",
    link: "services.html"
  },
  {
    id: "contact-info",
    title: "Contact Details & Location",
    category: "contact",
    keywords: ["contact", "phone", "number", "email", "address", "location", "ariyalur", "whatsapp", "reach", "office", "working hours"],
    summary: "Chemsolv Associates is located in Ariyalur, Tamil Nadu (PIN 621715). Reach us via contact form, email, or direct WhatsApp message.",
    content: "Here is our verified contact information:\n• **Location**: Ariyalur, Tamil Nadu, India — PIN 621715.\n• **Business Hours**: Monday to Saturday: 9:00 AM – 6:30 PM (IST).\n• **Enquiries**: You can submit a request through our Contact Page or start a WhatsApp chat for immediate assistance with technical sales and service scheduling.",
    link: "contact.html"
  }
];

// Fallback message when user query does not match verified knowledge base
const CHATBOT_FALLBACK = {
  message: "I could not find verified documentation directly matching your query. To ensure accurate technical specifications, pricing, and project feasibility, please speak directly with our engineering team.",
  actions: [
    { label: "Chat on WhatsApp", action: "whatsapp", url: "https://wa.me/919876543210?text=Hello%20Chemsolv%20Associates,%20I%20have%20an%20enquiry%20regarding%20water%20treatment%20solutions." },
    { label: "Go to Contact Page", action: "link", url: "contact.html" }
  ]
};
