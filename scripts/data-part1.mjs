export const S01_S06 = [
  // ------------------------------------------------------------
  // STRATUM 01: LITHOSPHERE
  // ------------------------------------------------------------
  {
    i: "ndpr", L: 1, n: "Neodymium & praseodymium",
    s: "The light rare earths behind motor power density",
    w: "Permanent-magnet brushless motors in robotic joints require high-remanence NdFeB magnets. Neodymium (Nd) and praseodymium (Pr) provide the magnetic field strength needed to achieve high torque within compact joint dimensions. Mined primarily from bastnäsite and monazite deposits.",
    h: [
      "Bastnäsite and monazite ores are mined, crushed, and concentrated via froth flotation.",
      "Acid baking and leaching convert rare earth minerals into soluble sulfate salts.",
      "Multi-stage solvent extraction separates light rare earth elements (Nd, Pr) to 99.5%+ purity.",
      "Molten salt electrolysis reduces neodymium/praseodymium fluoride or oxide into metallic NdPr alloy."
    ],
    k: [
      ["~70%", "of global NdPr mining in China"],
      ["~30 kg/t", "NdPr oxide yield from typical bastnäsite ore"],
      ["~0.3–0.8 kg", "NdPr required per humanoid robot (30–45 actuators)"]
    ],
    c: 3,
    x: "China controls over 70% of upstream NdPr mining and roughly 85% of refining capacity. Qualifying alternative supply chains takes 3–5 years due to solvent extraction environmental permitting.",
    co: [
      ["China Northern Rare Earth", "World's largest light rare earth miner and refiner (Bayan Obo deposit)", "chinanre.com", "CN"],
      ["MP Materials", "Operates Mountain Pass rare earth mine and refining facility in California", "mpmaterials.com", "US"],
      ["Lynas Rare Earths", "Mt Weld mine in Western Australia and Kalgoorlie/Kuantan cracking plants", "lynasrareearths.com", "AU"],
      ["Shenghe Resources", "Global rare earth extraction, trading, and overseas project investment", "shenghe.com.cn", "CN"],
      ["Energy Fuels", "Uranium and rare earth carbonate processing at White Mesa Mill", "energyfuels.com", "US"],
      ["Iluka Resources", "Eneabba rare earth refinery processing mineral sands in Western Australia", "iluka.com", "AU"]
    ]
  },
  {
    i: "heavyre", L: 1, n: "Dysprosium & terbium",
    s: "The heavy rare earths that keep hot motors from demagnetizing",
    w: "When robotic joint actuators operate at high torque or in stall conditions, internal motor temperatures rise past 100 °C. Standard NdFeB magnets lose coercivity and demagnetize under high thermal stress. Dysprosium (Dy) and Terbium (Tb) substitute into the NdFeB crystal lattice to dramatically elevate high-temperature coercivity.",
    h: [
      "Extracted predominantly from ion-adsorption clay deposits in southern China and northern Myanmar.",
      "In-situ ammonium sulfate leaching strips rare-earth ions directly from weathered granite clays.",
      "Complex organic solvent extraction separates trace Dy/Tb (often <1% of total rare earth content in ore).",
      "High-purity dysprosium/terbium metals are refined via vacuum induction melting."
    ],
    k: [
      [">90%", "of heavy rare earth separation capacity located in China"],
      ["<0.5%", "typical Dy/Tb concentration in ion-adsorption clay deposits"],
      ["120–180 °C", "maximum operating temperature enabled by Dy/Tb doping"]
    ],
    c: 3,
    x: "Extreme geographic concentration: heavy rare earth ion-adsorption clays are virtually absent in operating Western hard-rock mines. Export restrictions on heavy rare earth processing technology create an absolute single point of failure.",
    co: [
      ["China Rare Earth Group", "Consolidated state enterprise controlling Southern China ion-adsorption heavy rare earth assets", "regroup.cn", "CN"],
      ["Guangdong Rare Earths", "Heavy rare earth mining, separation, and downstream alloy production", "gdre.com.cn", "CN"],
      ["Ganzhou Rare Earth", "Historic center of ionic clay heavy rare earth processing in Jiangxi", "ganzhoure.cn", "CN"],
      ["Neo Performance Materials", "Silmet rare earth processing facility in Estonia and European magnetics", "neomaterials.com", "CA"],
      ["Northern Minerals", "Browns Range heavy rare earth project in Australia", "northernminerals.com.au", "AU"],
      ["Arafura Rare Earths", "Nolans project developing integrated NdPr and heavy rare earth extraction", "ararafura.com.au", "AU"]
    ]
  },
  {
    i: "li", L: 1, n: "Lithium ore & brine",
    s: "Electrochemical feedstock for mobile untethered runtime",
    w: "Every mobile robot, AMR, and autonomous humanoid carries an untethered chemical battery pack. Lithium provides the highest electrochemical potential and energy density per unit weight, enabling 2–6 hours of continuous robotic operation.",
    h: [
      "Hard-rock pegmatite deposits (spodumene) are blasted, crushed, and concentrated via dense media separation.",
      "Lithium continental brines in high-altitude salt flats are pumped into solar evaporation ponds.",
      "Concentrated brines undergo fractional crystallization, chemical purification, and precipitation as lithium carbonate or hydroxide.",
      "Direct Lithium Extraction (DLE) adsorption columns process brine directly, reducing land and water footprints."
    ],
    k: [
      ["~50%", "of global lithium from Australian spodumene hard rock"],
      ["~40%", "of global lithium from South American salar brines"],
      ["~1.2–2.5 kWh", "typical battery pack capacity on autonomous humanoid platforms"]
    ],
    c: 2,
    x: "Concentrated extraction and refining across Australia, Chile, and China. Refining to battery-grade lithium hydroxide for high-nickel cathode chemistry is geographically concentrated.",
    co: [
      ["Albemarle", "Global lithium extraction across Salar de Atacama and Greenbushes", "albemarle.com", "US"],
      ["SQM", "Major brine extraction operator in the Atacama basin", "sqm.com", "CL"],
      ["Tianqi Lithium", "Hard-rock spodumene mining and lithium hydroxide chemical refining", "tianqilithium.com", "CN"],
      ["Ganfeng Lithium", "Integrated global lithium resource extraction, brine operations, and recycling", "ganfenglithium.com", "CN"],
      ["Pilbara Minerals", "Operates the Pilgangoora hard-rock spodumene asset in Western Australia", "pilbaraminerals.com.au", "AU"],
      ["Arcadium Lithium", "Global lithium chemicals producer across Argentina and Australia", "arcadiumlithium.com", "US"]
    ]
  },
  {
    i: "cu", L: 1, n: "Copper cathode",
    s: "Conductive metal for high-density motor windings and power harnesses",
    w: "Electromagnetic motors convert electrical current into mechanical torque according to Lorentz force laws. Copper's low electrical resistivity minimizes resistive I²R heat dissipation in tightly packed stator coils, fieldbus cables, and high-current power buses.",
    h: [
      "Porphyry copper ores are extracted via open-pit mining and milled into fine slurries.",
      "Froth flotation concentrates chalcopyrite copper sulfides to ~25–30% Cu content.",
      "Smelting and converter furnaces blow oxygen to produce 99% pure blister copper.",
      "Electro-refining in sulfuric acid baths produces 99.99% pure Grade A copper cathodes (LME registered)."
    ],
    k: [
      ["1.68×10⁻⁸ Ω·m", "electrical resistivity of pure annealed copper at 20 °C"],
      ["~15–25 kg", "total copper content inside an industrial 6-axis articulated arm"],
      ["~4–8 kg", "copper in a humanoid robot (motor windings, internal power buses, harness)"]
    ],
    c: 1,
    x: "Broad global mining base (Chile, Peru, DRC, China, US), though smelting and refining capacity is over 45% concentrated in East Asia.",
    co: [
      ["Codelco", "World's largest copper mining corporation operating Chilean porphyry deposits", "codelco.com", "CL"],
      ["BHP", "Operates Escondida copper mine in Chile and Olympic Dam in Australia", "bhp.com", "AU"],
      ["Freeport-McMoRan", "Operates Grasberg in Indonesia and large open-pit copper mines in the Americas", "fcx.com", "US"],
      ["Glencore", "Global copper mining, smelting, refining, and commodities trading", "glencore.com", "CH"],
      ["Jiangxi Copper", "Largest integrated copper producer and smelter in China", "jxcc.com", "CN"],
      ["Southern Copper", "Major low-cost copper extraction and smelting operations in Peru and Mexico", "southernperu.com", "MX"]
    ]
  },
  {
    i: "feal", L: 1, n: "Iron ore & bauxite",
    s: "Raw materials for high-rigidity chassis, arms, and precision gears",
    w: "Robotic arms and humanoids require high structural stiffness to resist dynamic deflection under acceleration. Cast iron and structural steel provide vibration damping and wear resistance in bases and gearboxes, while bauxite yields lightweight aluminium for high-speed limb links.",
    h: [
      "Hematite and magnetite iron ores are extracted, pelletized, and smelted in blast furnaces.",
      "Bauxite is mined via surface methods and refined via the Bayer chemical process into alumina (Al₂O₃).",
      "Hall-Héroult molten salt electrolysis smelts alumina into primary aluminium ingots.",
      "Electric Arc Furnaces (EAF) recycle scrap steel with virgin iron for clean metallurgical grades."
    ],
    k: [
      ["~2.7 g/cm³", "density of aluminium vs 7.85 g/cm³ for structural steel"],
      ["~70 GPa", "Young's modulus of aluminium alloys vs 210 GPa for alloy steel"],
      ["~60–75%", "of robot chassis mass made of structural aluminium and cast alloys"]
    ],
    c: 1,
    x: "Widely distributed global resource base; high energy intensity at the primary smelting stage.",
    co: [
      ["Rio Tinto", "Global iron ore producer in the Pilbara and integrated aluminium smelter", "riotinto.com", "GB"],
      ["Vale", "Major high-grade iron ore miner operating Carajás and Minas Gerais complexes", "vale.com", "BR"],
      ["Alcoa", "Bauxite mining, alumina refining, and primary aluminium smelting", "alcoa.com", "US"],
      ["EGA (Emirates Global Aluminium)", "Primary aluminium smelter operating high-efficiency electrolytic reduction", "ega.ae", "AE"],
      ["Norsk Hydro", "Low-carbon primary aluminium production and recycled extrusion ingots", "hydro.com", "NO"],
      ["Baowu Steel", "World's largest steelmaking conglomerate producing specialized engineering steels", "baowugroup.com", "CN"]
    ]
  },
  {
    i: "graphite", L: 1, n: "Natural & synthetic graphite",
    s: "Carbon anode active material for continuous robot power delivery",
    w: "Graphite forms the layered crystal structure of battery anodes where lithium ions intercalate during charging. High tap density and uniform crystalline orientation are required to support high-C discharge rates during rapid robot joint acceleration.",
    h: [
      "Natural flake graphite is mined, floated, micronized, and rounded into spherical graphite (SPG).",
      "Synthetic graphite is produced by graphitizing petroleum needle coke in Acheson furnaces at >2,800 °C.",
      "Chemical or thermal vapor pitch coating is applied to form an amorphous protective surface layer.",
      "Final anode active material is mixed with conductive additives and binders for slurry coating."
    ],
    k: [
      ["~90%", "of global battery anode graphite processing located in China"],
      ["372 mAh/g", "theoretical maximum specific capacity of graphite"],
      ["~1.0–1.8 kg", "graphite anode material per kWh of robot battery pack"]
    ],
    c: 2,
    x: "Refining spherical graphite and synthetic graphitization are heavily concentrated in China, creating supply vulnerabilities for battery-grade anode materials.",
    co: [
      ["BTR New Material", "World's leading producer of natural and synthetic graphite battery anode materials", "btrchina.com", "CN"],
      ["Shanshan Technology", "Synthetic graphite anode development and mass production", "shanshan.com", "CN"],
      ["Putailai (Zindn)", "High-performance synthetic graphite anode materials and coating equipment", "putailai.com", "CN"],
      ["Syrah Resources", "Balama graphite mine in Mozambique and Vidalia AAM facility in the US", "syrahresources.com.au", "AU"],
      ["Novonix", "Synthetic graphite manufacturing and battery testing technology in North America", "novonixgroup.com", "US"],
      ["SGL Carbon", "Specialty carbon and graphite synthetic components and industrial precursors", "sglcarbon.com", "DE"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 02: FEEDSTOCK
  // ------------------------------------------------------------
  {
    i: "ndfeb", L: 2, n: "Sintered NdFeB magnets",
    s: "High-energy-density sintered permanent magnet blocks",
    w: "NdFeB sintered magnets provide remanence up to 1.45 Tesla and energy products (BH)max exceeding 50 MGOe. Modern robotic actuators utilize grain-boundary diffused (GBD) sintered NdFeB magnets, where Dy or Tb is selectively infused along grain boundaries to maximize thermal coercivity while minimizing heavy rare earth consumption.",
    h: [
      "NdPr, Fe, and B are induction melted under vacuum into master alloy ingots.",
      "Strip casting produces fine crystalline alloy ribbons, followed by hydrogen decrepitation.",
      "Jet milling with inert gas pulverizes the alloy into 3–5 micron single-crystal powders.",
      "Powder is aligned under a 2-Tesla magnetic field and pressed into shape, then vacuum sintered at ~1,080 °C.",
      "Grain boundary diffusion (GBD) vaporizes Dy/Tb compounds onto magnet surfaces during secondary heat treatment."
    ],
    k: [
      ["35–52 MGOe", "maximum energy product (BH)max of commercial robotic magnet grades"],
      ["up to 1.45 T", "magnetic remanence (Br) in high-performance N52/N54 grades"],
      ["~85%", "of global sintered NdFeB magnet production in China"]
    ],
    c: 3,
    x: "Sintered NdFeB with grain boundary diffusion is the core chokepoint of high-torque robotic actuators. Over 80% of patented GBD mass-production capacity is in China and Japan.",
    co: [
      ["JL MAG Rare-Earth", "Major supplier of high-end sintered NdFeB magnets for robotics and EVs", "jlmag.com.cn", "CN"],
      ["Ningbo Yunsheng", "Precision sintered NdFeB magnets and automated magnetic assemblies", "yunsheng.com", "CN"],
      ["Shin-Etsu Chemical", "High-coercivity rare earth magnets with advanced GBD technology", "shinetsu.co.jp", "JP"],
      ["TDK Corporation", "High-performance NEOREC sintered NdFeB magnets for servo motors", "tdk.com", "JP"],
      ["Proterial (Hitachi Metals)", "Pioneered NEOMAX sintered NdFeB magnet formulations and IP", "proterial.com", "JP"],
      ["Vacuumschmelze (VAC)", "High-performance VACODYM rare earth magnets and European manufacturing", "vacuumschmelze.com", "DE"]
    ]
  },
  {
    i: "smco", L: 2, n: "SmCo & specialty magnetics",
    s: "High-curie-point magnetic alloys for extreme thermal environments",
    w: "Samarium-Cobalt (SmCo₅ and Sm₂Co₁₇) magnets retain magnetic remanence at temperatures up to 350 °C with near-zero reversible temperature coefficients. Used in extreme-duty robot end-effectors, aerospace actuators, and high-radiation robotic systems.",
    h: [
      "Samarium, cobalt, iron, copper, and zirconium are vacuum induction melted into ingot form.",
      "Ingots are crushed and jet-milled into fine particles under dry nitrogen.",
      "Magnetic field orientation and isostatic pressing form compacted green blocks.",
      "Sintering at 1,170–1,220 °C is followed by cellular precipitation heat treatment to pin magnetic domains."
    ],
    k: [
      ["up to 350 °C", "continuous operating temperature without irreversible demagnetization"],
      ["~800 °C", "Curie temperature of Sm₂Co₁₇ alloys"],
      ["-0.03%/°C", "exceptionally low temperature coefficient of remanence"]
    ],
    c: 2,
    x: "Relies on cobalt and samarium supply chains. Processing yields are lower and material is more brittle than NdFeB, requiring precision diamond grinding.",
    co: [
      ["Arnold Magnetic Technologies", "Specialty SmCo and ultra-thin precision magnetic components", "arnoldmagnetics.com", "US"],
      ["Electron Energy Corporation (EEC)", "Specialized SmCo rare earth magnets for defense and high-temp robotics", "electronenergy.com", "US"],
      ["Vacuumschmelze", "VACOMAX 170/225 high-temperature samarium-cobalt magnets", "vacuumschmelze.com", "DE"],
      ["Ningbo Yunsheng", "High-energy Sm₂Co₁₇ magnet block and ring manufacturing", "yunsheng.com", "CN"],
      ["TDK Corporation", "SmCo servo magnetics for high-reliability robotic joints", "tdk.com", "JP"],
      ["Shin-Etsu Chemical", "Rare earth magnet division producing specialized SmCo alloys", "shinetsu.co.jp", "JP"]
    ]
  },
  {
    i: "cathode", L: 2, n: "High-power cathode active materials",
    s: "Chemically engineered NMC and LFP powders for high-C discharge",
    w: "Cathode active materials dictate the energy density, cycle life, and thermal safety of a robot's battery pack. Mobile robots require high-nickel NMC (e.g., NMC 811) for maximum energy density or customized LFP for high thermal stability and 3,000+ cycle durability under rapid opportunity charging.",
    h: [
      "Transition metal sulfates (Ni, Mn, Co) are co-precipitated into uniform precursor hydroxides.",
      "Precursor is blended with lithium hydroxide or lithium carbonate in precise stoichiometric ratios.",
      "High-temperature calcination in oxygen-enriched roller hearth kilns forms crystalline layered oxide.",
      "Surface coating with metal oxides (Al, Zr, Ti) and single-crystal doping mitigates microcracking under rapid discharge."
    ],
    k: [
      [">200 mAh/g", "specific capacity of high-nickel single-crystal NMC cathodes"],
      ["3,000+ cycles", "endurance of customized LFP cells under 1C/3C robotic duty cycles"],
      ["up to 5C", "continuous discharge rate capability in power-optimized formulations"]
    ],
    c: 2,
    x: "Precursor synthesis and high-nickel single-crystal calcination require specialized rotary kilns and tight impurity controls (<10 ppb magnetic impurities).",
    co: [
      ["Umicore", "Global battery materials producer with high-nickel cathode technology", "umicore.com", "BE"],
      ["Ecopro BM", "Leading high-nickel NCA and NCM cathode material manufacturer in South Korea", "ecoprobm.co.kr", "KR"],
      ["POSCO Future M", "Integrated cathode and anode active materials supplier", "poscofuturem.com", "KR"],
      ["BASF Toda Battery Materials", "High-energy cathode active materials for mobile energy storage", "basf.com", "DE"],
      ["Ningbo Ronbay New Energy", "High-nickel single-crystal NCM cathode manufacturing", "ronbaymat.com", "CN"],
      ["Hunan Yuneng", "World's largest lithium iron phosphate (LFP) cathode producer", "hunanyuneng.com", "CN"]
    ]
  },
  {
    i: "steels", L: 2, n: "Bearing & gear steels",
    s: "Vacuum-degassed ultra-clean alloy steels for sub-micron raceways",
    w: "The flexspline of a strain-wave gear flexes millions of times under high torsional fatigue, while crossed-roller bearing raceways endure extreme Hertzian contact stresses (>2,500 MPa). High-cleanliness 100Cr6 (SAE 52100) bearing steel, vacuum-arc remelted (VAR) alloys, and nitriding steels prevent subsurface micro-inclusions that cause premature pitting.",
    h: [
      "Electric arc furnace melting is followed by vacuum degassing (VD/VOD) to eliminate dissolved hydrogen and oxygen.",
      "Vacuum Arc Remelting (VAR) or Electro-Slag Remelting (ESR) eliminates non-metallic oxide inclusions.",
      "Controlled hot rolling and spheroidizing annealing create a uniform carbide microstructure.",
      "Precision quench and tempering or case-carburizing yield surface hardness of 58–64 HRC with tough core ductility."
    ],
    k: [
      ["<5 ppm", "total oxygen content in premium vacuum-degassed bearing steels"],
      ["60–64 HRC", "surface hardness achieved on bearing raceways and gear teeth"],
      ["2,500+ MPa", "peak Hertzian contact stress endured without subsurface shear failure"]
    ],
    c: 2,
    x: "High-end vacuum remelted ESR/VAR steels for sub-micron bearing raceways and flexsplines are concentrated among specialty metallurgical mills in Europe and Japan.",
    co: [
      ["Ovako", "Ultra-clean BQ-Steel and bearing steel manufacturer in Scandinavia", "ovako.com", "SE"],
      ["Sanyo Special Steel", "World leader in high-cleanliness bearing steel and ESR/VAR processing", "sanyo-steel.co.jp", "JP"],
      ["Daido Steel", "Specialty structural steels for automotive and robotic precision gearing", "daido.co.jp", "JP"],
      ["Sandvik Materials Technology (Alleima)", "Advanced alloy steels and precision strip for flexing components", "alleima.com", "SE"],
      ["Böhler Edelstahl (voestalpine)", "High-performance tool and bearing steels for precision mechanical tooling", "bohler-edelstahl.com", "AT"],
      ["TimkenSteel (Metallus)", "High-cleanliness special bar quality alloy steels for bearings and gears", "metallus.com", "US"]
    ]
  },
  {
    i: "polymers", L: 2, n: "Engineering polymers & PEEK",
    s: "Low-friction high-modulus polymers and synthetic elastomers",
    w: "Robotic systems leverage high-performance thermoplastic polymers like Polyetheretherketone (PEEK), Polyoxymethylene (POM), and Polytetrafluoroethylene (PTFE) for lightweight gear retainers, low-friction dynamic seals, and self-lubricating joint bushings. Thermoplastic polyurethanes (TPU) form compliant gripper pads and human-contact skins.",
    h: [
      "Step-growth polymerization of 4,4'-difluorobenzophenone and hydroquinone produces semi-crystalline PEEK.",
      "Compounding with carbon fibre, PTFE, or graphite additives optimizes dry sliding wear coefficients.",
      "Injection moulding or precision extrusion forms stock rods, seal profiles, and cable carriers.",
      "Dynamic seals are surface-treated to minimize stick-slip friction during slow joint velocity reversals."
    ],
    k: [
      ["~1.3 g/cm³", "density of unreinforced PEEK vs 2.7 g/cm³ for aluminium"],
      ["<0.15", "coefficient of dynamic friction against polished steel in dry contact"],
      ["up to 250 °C", "continuous service temperature of PEEK components"]
    ],
    c: 1,
    x: "High-temperature aromatic polymer synthesis (PEEK/PEI) is concentrated among specialty chemical producers with proprietary compounding IP.",
    co: [
      ["Victrex", "Global leader in high-performance PEEK polymer solutions and composites", "victrex.com", "GB"],
      ["Solvay (Syensqo)", "Specialty polymers including KetaSpire PEEK and Torlon PAI", "syensqo.com", "BE"],
      ["Evonik", "High-performance VESTAKEEP PEEK and engineering polymers", "evonik.com", "DE"],
      ["DuPont", "Vespel polyimide and Delrin acetal resin for precision mechatronics", "dupont.com", "US"],
      ["Igus", "Engineered self-lubricating tribo-polymers, plain bearings, and cable carriers", "igus.com", "DE"],
      ["Freudenberg Sealing Technologies", "Elastomer and PTFE dynamic seals for robotic joint gearboxes", "fst.com", "DE"]
    ]
  },
  {
    i: "lube", L: 2, n: "Precision gearbox lubricants",
    s: "High-shear synthetic greases formulated for strain-wave flexsplines",
    w: "In a strain-wave gear, teeth engage with continuous sliding and micro-deflection under extreme Hertzian contact pressure. Standard EP greases break down rapidly or channel away from tooth flanks. Specialized PFPE, synthetic hydrocarbon (PAO), and organic molybdenum greases provide boundary lubrication across millions of oscillation cycles without oil separation or leakage.",
    h: [
      "Synthetic polyalphaolefin (PAO) or perfluoropolyether (PFPE) base oils are blended with calcium sulfonate or urea thickeners.",
      "Organo-molybdenum (MoDTC) and extreme-pressure (EP) boundary lubrication additives are homogenized at high shear.",
      "Rheological properties are tailored for low starting torque at -20 °C and high film strength at +100 °C.",
      "Grease undergoes vacuum degassing and micron filtration to remove abrasive particulate matter."
    ],
    k: [
      ["10,000+ hours", "L10 operating life enabled by specialized harmonic drive greases"],
      ["<1%", "oil separation (bleeding) after 168 hours at 100 °C"],
      ["-40 to +140 °C", "wide operating temperature range maintaining elastohydrodynamic film"]
    ],
    c: 3,
    x: "Harmonic Drive Systems and Nabtesco specify proprietary formulated greases (e.g., Harmonic Grease SK-1A/4B1X, Molywhite RE00). Using unauthorized grease voids warranty and reduces gearbox service life by over 70%.",
    co: [
      ["Harmonic Drive Systems (Lubricant Div)", "Proprietary formulated SK-1A, SK-2, and 4B1X flexspline greases", "harmonicdrive.net", "JP"],
      ["Klüber Lubrication (Freudenberg)", "Specialty synthetic greases for precision robotic gears and cleanrooms", "klueber.com", "DE"],
      ["Nye Lubricants (FUCHS)", "Synthetic lubricants and damping greases for precision electro-mechanical joints", "nyelubricants.com", "US"],
      ["Kyodo Yushi", "Manufacturer of Molywhite RE00 and high-load robot reducer greases", "kyodoyushi.co.jp", "JP"],
      ["FUCHS SE", "Global specialty lubricant formulator for industrial robot gearboxes", "fuchs.com", "DE"],
      ["Idemitsu Kosan", "Formulator of advanced synthetic lubricants for Asian robotics OEMs", "idemitsu.com", "JP"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 03: STOCK
  // ------------------------------------------------------------
  {
    i: "billet", L: 3, n: "Alloy billet, plate & extrusion",
    s: "High-strength aerospace aluminium and alloy stock for CNC machining",
    w: "Structural robotic limb links, motor housings, and mounting flanges are machined from high-strength 6061-T6, 7075-T651, and cast aluminium tooling plates. High dimensional stability, low residual internal stress, and ultrasonic soundness prevent warping during multi-axis CNC milling.",
    h: [
      "Direct chill (DC) casting produces continuous cylindrical billets and rectangular rolling ingots.",
      "Homogenization heat treatment dissolves segregated alloying phases and relieves casting stress.",
      "Hot rolling and extrusion produce structural plate, bars, and customized hollow profiles.",
      "Solution heat treatment, controlled stretching (T651 temper), and artificial aging achieve peak yield strength."
    ],
    k: [
      ["500+ MPa", "yield strength of aerospace-grade 7075-T6 aluminium alloy"],
      ["<0.5 mm/m", "flatness tolerance on precision cast aluminium tooling plate"],
      ["~15–30 kg", "structural aluminium billet consumed per machined humanoid robot"]
    ],
    c: 1,
    x: "Competitive global market; key requirement is stress-relieved T651 temper to prevent dimensional distortion during thin-wall CNC machining.",
    co: [
      ["Constellium", "Aerospace aluminium plate and engineered structural extrusions", "constellium.com", "FR"],
      ["Kaiser Aluminum", "High-strength plate and extruded round rod for robotics and aerospace", "kaiseraluminum.com", "US"],
      ["Aleris (Novelis)", "Precision aluminium rolled products and cast tooling plates", "novelis.com", "US"],
      ["UACJ Corporation", "Major Japanese aluminium rolling and extrusion corporation", "uacj.co.jp", "JP"],
      ["AMAG Austria Metall", "Specialty cast plates and rolled aluminium with low carbon footprint", "amag-al4u.com", "AT"],
      ["China Hongqiao Group", "World's largest primary aluminium smelting and fabrication conglomerate", "hongqiaochina.com", "CN"]
    ]
  },
  {
    i: "cfrp", L: 3, n: "Carbon fibre prepreg & weaves",
    s: "High-modulus composite weaves for inertia-critical robot limbs",
    w: "In high-speed delta robots, picking arms, and bipedal humanoid legs, minimizing rotational inertia ($I = m r^2$) is paramount. Carbon Fibre Reinforced Polymer (CFRP) prepregs offer 4–5× higher specific stiffness than aluminium, enabling rapid acceleration without structural vibration.",
    h: [
      "Polyacrylonitrile (PAN) precursor fibers are stabilized, carbonized at 1,500 °C, and surface-treated.",
      "Continuous carbon fiber tows (3k, 6k, 12k) are woven into unidirectional or bi-axial fabric sheets.",
      "Fabrics are impregnated with toughened epoxy resin under precise temperature control to form prepreg.",
      "Prepregs are vacuum-bagged and autoclave-cured at 120–180 °C under 6–7 bar pressure."
    ],
    k: [
      [">230 GPa", "tensile modulus of standard high-strength carbon fiber"],
      ["~1.5 g/cm³", "density of finished CFRP composite vs 2.7 g/cm³ for aluminium"],
      [">60%", "reduction in joint rotational inertia achieved by carbon fiber limb links"]
    ],
    c: 2,
    x: "High-modulus aerospace-grade PAN precursor and carbonization technology are heavily concentrated in Japan and the US, subject to export controls.",
    co: [
      ["Toray Industries", "World leader in TORAYCA high-performance carbon fiber and prepreg", "toray.com", "JP"],
      ["Hexcel", "Advanced composites, carbon fiber fabrics, and structural prepregs", "hexcel.com", "US"],
      ["Teijin (Tenax)", "High-performance carbon fiber filaments and thermoplastic composites", "teijin.com", "JP"],
      ["Mitsubishi Chemical", "Carbon fiber tow, prepregs, and structural composite shapes", "m-chem.co.jp", "JP"],
      ["SGL Carbon", "SIGRAFIL carbon fibers and composite materials for industrial automation", "sglcarbon.com", "DE"],
      ["Zhongfu Shenying", "Major Chinese producer of high-strength aerospace-grade carbon fiber", "zfsy.com.cn", "CN"]
    ]
  },
  {
    i: "castings", L: 3, n: "Ductile iron & aluminium castings",
    s: "High-vibration-damping cast bases and heavy robot shoulders",
    w: "Industrial robots handling 50–500 kg payloads require heavy, vibration-absorbing cast iron bases (EN-GJS-400 / ductile iron) and low-pressure cast aluminium shoulder housings. Sand casting and die casting create complex hollow geometries with internal ribbing that cannot be machined from solid block.",
    h: [
      "3D CAD models are used to create reusable wooden/metal patterns or 3D-printed sand molds.",
      "Molten ductile iron or aluminium alloy is treated with nodulizing agents to form spheroidal graphite.",
      "Low-pressure or gravity sand casting fills thin-wall rib sections without porosity or air entrapment.",
      "Castings undergo stress-relief annealing and shot blasting prior to finish CNC machining."
    ],
    k: [
      ["400–700 MPa", "tensile strength of ductile spheroidal cast iron (EN-GJS)"],
      ["3–5× higher", "vibration damping capacity in cast iron compared to structural steel"],
      ["up to 500 kg", "single-piece casting mass for heavy automotive spot-welding robot bases"]
    ],
    c: 1,
    x: "Specialized heavy foundry operations with clean ductile iron metallurgy and large-envelope multi-axis CNC capability.",
    co: [
      ["Georg Fischer (GF Casting Solutions)", "Precision ductile iron and aluminium castings for industrial machinery", "georgfischer.com", "CH"],
      ["Linamar", "Advanced casting, light metal forging, and precision CNC machining", "linamar.com", "CA"],
      ["Ryobi Limited", "High-pressure aluminium die casting for complex mechatronic housings", "ryobi-group.co.jp", "JP"],
      ["Nemak", "High-integrity aluminium structural components and complex castings", "nemak.com", "MX"],
      ["Ahresty Corporation", "Precision die-casting for industrial equipment and robotic housings", "ahresty.co.jp", "JP"],
      ["Fuchunjiang Foundry", "Large-scale ductile iron casting and machining for industrial robot bases", "fcjfoundry.com", "CN"]
    ]
  },
  {
    i: "powder", L: 3, n: "Metal additive powders",
    s: "Gas-atomized spherical powders for 3D-printed bionic limbs",
    w: "Next-generation humanoid skeletons and hydraulic manifold blocks utilize Laser Powder Bed Fusion (LPBF) 3D printing. Gas-atomized Ti6Al4V, AlSi10Mg, and Scalmalloy powders with high sphericity and controlled particle size distribution (15–53 µm) enable lightweight topology-optimized bionic joints with internal fluid channels.",
    h: [
      "Vacuum Induction Melting (VIM) melts high-purity alloy ingots under argon atmosphere.",
      "High-pressure inert gas (argon/nitrogen) atomization jets break liquid metal into micro-droplets.",
      "Droplets solidify in free fall into highly spherical powder particles.",
      "Air classification and precision sieving isolate the 15–53 µm powder fraction for LPBF printers."
    ],
    k: [
      ["15–53 µm", "standard particle size distribution for laser powder bed fusion (LPBF)"],
      [">95%", "powder sphericity required for smooth recoater blade spreading"],
      ["40–60%", "mass reduction achieved in topology-optimized 3D printed bionic robot links"]
    ],
    c: 2,
    x: "Tight satellite-free spherical morphology, low oxygen pickup (<0.1% O₂ in titanium), and strict batch recycling limits are required to prevent print porosity.",
    co: [
      ["Höganäs", "World leader in metal powders and additive manufacturing alloy feedstocks", "hoganas.com", "SE"],
      ["Carpenter Additive", "Gas-atomized titanium, nickel, and steel powders for high-integrity AM", "carpenteradditive.com", "US"],
      ["Sandvik Osprey", "Gas-atomized spherical metal powders for additive manufacturing", "materials.sandvik", "SE"],
      ["AP&C (GE Additive / Colibrium)", "Plasma atomized spherical titanium and aluminium powders", "ge.com", "CA"],
      ["Oerlikon AM", "Metal additive manufacturing powders, materials, and printing services", "oerlikon.com", "CH"],
      ["Avimetal Powder Metallurgy", "High-performance gas-atomized titanium and aluminium additive powders", "avimetal.com", "CN"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 04: FABRICATION
  // ------------------------------------------------------------
  {
    i: "grind", L: 4, n: "Precision grinding & superfinishing",
    s: "Sub-micron surface finishing for bearing raceways and gear teeth",
    w: "A robot's position repeatability and acoustic noise are determined by the micro-geometry of its rotating contact surfaces. CNC internal/external cylindrical grinding, profile grinding, and superfinishing hold surface roughness down to Ra < 0.05 µm, eliminating asperities that cause wear and torque ripple.",
    h: [
      "CBN (Cubic Boron Nitride) and diamond grinding wheels rotate at surface speeds up to 120 m/s.",
      "In-process acoustic emission sensors and laser gauging monitor micron-level stock removal in real time.",
      "Superfinishing with oscillating abrasive stones removes amorphous grinding layers.",
      "Form accuracy and profile crowning are controlled within ±0.5 µm across the entire contact width."
    ],
    k: [
      ["Ra < 0.05 µm", "surface roughness achieved on superfinished bearing raceways"],
      ["±0.5 µm", "form tolerance on high-precision ground gear tooth profiles"],
      ["<1 arc-min", "transmission error achieved through precision profile grinding"]
    ],
    c: 2,
    x: "Ultra-precision grinding machine tools and dressing systems are concentrated among Swiss, German, and Japanese machine builders.",
    co: [
      ["Studer (United Grinding Group)", "World leader in high-precision CNC universal cylindrical grinding machines", "studer.com", "CH"],
      ["Kellenberger (Hardinge)", "High-precision CNC cylindrical and universal grinding systems", "hardinge.com", "CH"],
      ["Danobat Group", "High-precision hard turning, internal grinding, and superfinishing machine tools", "danobatgroup.com", "ES"],
      ["Toyoda (JTEKT Machinery)", "High-speed CBN cylindrical grinding machines for precision bearings and shafts", "toyoda-machinery.co.jp", "JP"],
      ["Nagase Integrex", "Ultra-precision surface and profile grinding machines with sub-micron accuracy", "nagase-i.jp", "JP"],
      ["Kapp Niles", "Precision profile and continuous generating gear grinding machines", "kapp-niles.com", "DE"]
    ]
  },
  {
    i: "hobbing", L: 4, n: "Gear hobbing & tooth shaping",
    s: "High-precision multi-axis cutting of flexsplines and cycloidal pinions",
    w: "Strain-wave flexsplines feature 200–400 micro-teeth on a thin-walled elastic steel cup, while cycloidal drives require complex non-involute epicycloidal tooth profiles. High-speed multi-axis CNC hobbing, shaping, and power skiving machine tools cut these micro-teeth without thermal deformation.",
    h: [
      "Carbide or cermet multi-thread hobs synchronize electronically with workpiece direct-drive spindles.",
      "High-speed dry hobbing at 400+ m/min cutting speeds prevents thermal growth in thin-wall cups.",
      "Power skiving combines hobbing and shaping kinematics to cut internal spline teeth in a single setup.",
      "Gear measuring centers inspect pitch deviation, profile error, and radial runout against DIN Class 3."
    ],
    k: [
      ["DIN Quality 3–4", "gear accuracy class achieved on robotic precision reducers"],
      ["0.2–0.8 mm", "module pitch range for high-ratio strain-wave flexspline teeth"],
      ["<5 µm", "cumulative pitch error across 200+ teeth on a flexspline ring"]
    ],
    c: 3,
    x: "Cutting flexsplines requires ultra-rigid CNC machine tools with electronic gearbox synchronization (EGB) and specialized skiving/hobbing cutters produced by a handful of tooling specialists.",
    co: [
      ["Gleason Corporation", "Global leader in gear manufacturing technology, hobbing, and measuring machines", "gleason.com", "US"],
      ["Klingelnberg", "Precision gear hobbing machines, measuring centers, and closed-loop gear software", "klingelnberg.com", "DE"],
      ["Liebherr-Verzahntechnik", "High-precision CNC gear hobbing, shaping, and automation systems", "liebherr.com", "DE"],
      ["Mitsubishi Heavy Industries Machine Tool (Nidec)", "High-speed CNC gear hobbing and skiving machine tools", "nidec.com", "JP"],
      ["Kashifuji Works", "Specialized CNC gear hobbing machines for precision automotive and robot gears", "kashifuji.co.jp", "JP"],
      ["Chongqing Machine Tool (CHMTI)", "Major manufacturer of CNC gear hobbing and gear shaving machinery", "chmti.com", "CN"]
    ]
  },
  {
    i: "hardturn", L: 4, n: "5-axis hard turning & milling",
    s: "Ultra-precision multi-axis machining of bionic joint housings",
    w: "Modern robot joint housings integrate stator mounts, bearing seats, and encoder flanges into a single monocoque frame. 5-axis simultaneous CNC machining centers hard-turn and mill pre-hardened steels and aerospace aluminium in a single clamping to eliminate stack-up errors.",
    h: [
      "Direct-drive rotary tables and high-torque motor spindles (20,000–40,000 RPM) execute 5-axis toolpaths.",
      "PCBN (Polycrystalline Cubic Boron Nitride) inserts hard-turn case-hardened steel (>60 HRC) directly.",
      "Thermal compensation algorithms with distributed temperature probes mitigate machine frame thermal drift.",
      "High-pressure through-spindle coolant (70+ bar) clears chips from deep pockets and thin-wall ribs."
    ],
    k: [
      ["±2 µm", "linear positioning repeatability across 500 mm machine axis travels"],
      ["60+ HRC", "hardness of steel turned directly without secondary cylindrical grinding"],
      ["1 clamping", "complete machining of complex joint housings to eliminate datum transfer error"]
    ],
    c: 2,
    x: "High-end 5-axis machine tools with thermal stability and sub-micron positioning are subject to strict multilateral export controls (Wassenaar Arrangement).",
    co: [
      ["DMG MORI", "Global leader in 5-axis simultaneous CNC machining centers and mill-turn machines", "dmgmori.com", "DE"],
      ["Yamazaki Mazak", "Advanced multi-tasking CNC machine tools and integrated factory automation", "mazak.com", "JP"],
      ["Okuma Corporation", "Thermal-friendly 5-axis CNC machining centers with proprietary OSP controls", "okuma.co.jp", "JP"],
      ["Makino Milling Machine", "Ultra-high-precision horizontal and 5-axis machining centers", "makino.com", "JP"],
      ["GF Machining Solutions", "High-speed milling, wire EDM, and laser texturing machine tools", "gfms.com", "CH"],
      ["Hermle AG", "Specialist manufacturer of high-precision 5-axis machining centers", "hermle.de", "DE"]
    ]
  },
  {
    i: "mim", L: 4, n: "Metal injection moulding (MIM)",
    s: "Net-shape mass production of intricate steel finger joints and linkages",
    w: "Dexterous robot hands contain 15–25 small mechanical phalanges, tendon pulleys, and miniature linkages that are too complex to machine cost-effectively from billet. Metal Injection Moulding (MIM) blends fine alloy powders with polymer binders to injection-mould complex 3D metal parts with 97%+ sintered density.",
    h: [
      "Gas-atomized metal powders (<15 µm) are mixed with a thermoplastic binder system to form feedstock pellets.",
      "Heated feedstock is injection moulded into multi-cavity precision steel tooling.",
      "Catalytic or thermal debinding removes the polymer binder matrix to produce a porous 'brown part'.",
      "Vacuum sintering at ~1,300 °C shrinks the part by 15–20% uniformly to achieve 97–99% theoretical density."
    ],
    k: [
      [">97%", "sintered density relative to wrought steel alloy"],
      ["±0.3%", "as-sintered dimensional tolerance on complex 3D features"],
      ["50,000+ parts/month", "mass-production throughput for miniature robotic finger phalanges"]
    ],
    c: 1,
    x: "Tooling design requires precise shrink-factor prediction (15–20% shrinkage during sintering); high upfront tooling cost.",
    co: [
      ["Indo-MIM", "World's largest metal injection moulding (MIM) manufacturer and precision fabricator", "indo-mim.com", "IN"],
      ["GKN Sinter Metals", "Global powder metallurgy and precision metal injection moulding for automotive/industrial", "gknpm.com", "GB"],
      ["ARC Group Worldwide", "Precision metal injection moulding and custom component fabrication", "arcgroupworldwide.com", "US"],
      ["Schunk Sintermetalltechnik", "Sintered mechanical parts and MIM components for precision mechatronics", "schunk-group.com", "DE"],
      ["Future High-Tech (Dongguan)", "High-volume MIM component manufacturing for consumer electronics and robotics", "future-mim.com", "CN"],
      ["Dou Yee Technologies", "Precision metal and ceramic injection moulding for micro-actuators", "douyee.com.sg", "SG"]
    ]
  },
  {
    i: "am", L: 4, n: "Metal additive manufacturing",
    s: "LPBF 3D printing of topology-optimized bionic skeletons and hydraulic blocks",
    w: "Additive manufacturing allows structural humanoid limbs and hydraulic valve manifolds to be grown additively using organic, bone-like geometry. Laser Powder Bed Fusion (LPBF) eliminates joint assemblies, integrates conformal cooling channels directly into motor brackets, and reduces moving mass by up to 50%.",
    h: [
      "Topology optimization software removes stress-free material to create minimum-mass bionic CAD geometries.",
      "Multi-laser systems (4–12 fiber lasers) scan metal powder beds at up to 15 m/s layer by layer.",
      "Layer thicknesses of 30–60 µm are melted under strict inert argon shielding (<100 ppm O₂).",
      "Hot Isostatic Pressing (HIP) at 1,000 bar and 900 °C eliminates internal microporosity and microcracks."
    ],
    k: [
      ["up to 12 lasers", "synchronized in modern multi-laser production LPBF platforms"],
      ["40–55%", "mass reduction compared to conventional CNC-machined aluminium limbs"],
      ["100% dense", "post-HIP mechanical properties matching or exceeding wrought Ti6Al4V"]
    ],
    c: 2,
    x: "Laser scanning calibration across multi-laser overlap zones and post-print Hot Isostatic Pressing (HIP) are critical to ensure fatigue endurance under cyclic dynamic loads.",
    co: [
      ["EOS GmbH", "Pioneer and global leader in industrial metal laser powder bed fusion (LPBF) systems", "eos.info", "DE"],
      ["SLM Solutions (Nikon SLM)", "Multi-laser selective laser melting additive manufacturing systems", "slm-solutions.com", "DE"],
      ["3D Systems", "Direct metal printing (DMP) platforms and metal healthcare/aerospace manufacturing", "3dsystems.com", "US"],
      ["Farsoon Technologies", "Industrial metal LPBF and polymer 3D printing machinery", "farsoon.com", "CN"],
      ["BLT (Bright Laser Technologies)", "Large-format metal additive manufacturing equipment and printing services", "xa-blt.com", "CN"],
      ["Velo3D", "Support-free metal additive manufacturing with advanced integrated quality validation", "velo3d.com", "US"]
    ]
  },
  {
    i: "metrol", L: 4, n: "Dimensional metrology & CMM",
    s: "Sub-micron coordinate measuring machines and laser trackers",
    w: "A robot's ISO 9283 positioning accuracy depends on verifying that machined joint centerlines and bearing bores match nominal CAD geometry within microns. High-precision bridge CMMs, multi-sensor optical scanners, and laser trackers certify kinematic link dimensions prior to cleanroom assembly.",
    h: [
      "Granite bridge coordinate measuring machines (CMM) utilize air bearings for friction-free motion.",
      "Scanning tactile probes and laser line sensors capture millions of 3D surface points in seconds.",
      "Laser trackers with absolute distance meters (ADM) measure 6-DoF end-effector poses across large envelopes.",
      "Form and roundness testers evaluate bearing raceway roundness down to 0.02 µm."
    ],
    k: [
      ["E₀ < 0.3 + L/1000 µm", "length measurement error on ultra-high-precision bridge CMMs"],
      ["0.02 µm", "spindle accuracy on dedicated roundness and form measurement systems"],
      ["100% inspection", "of critical gearbox bearing bore diameters to guarantee bearing pre-loads"]
    ],
    c: 2,
    x: "Dimensional verification is dominated by a few metrology groups; sensor calibration artifacts and probe calibration software are heavily protected IP.",
    co: [
      ["Zeiss Industrial Metrology", "World leader in high-precision bridge CMMs, optical sensors, and metrology software", "zeiss.com", "DE"],
      ["Hexagon Manufacturing Intelligence", "Coordinate measuring machines, Leica laser trackers, and industrial scanning", "hexagonmi.com", "SE"],
      ["Renishaw", "CMM touch-trigger probes, 5-axis scanning heads, and laser calibration interferometers", "renishaw.com", "GB"],
      ["Mitutoyo Corporation", "Precision measuring instruments, 3D coordinate measuring machines, and vision systems", "mitutoyo.co.jp", "JP"],
      ["Keyence Corporation", "High-speed 3D optical profilometers, digital microscopes, and laser metrology", "keyence.com", "JP"],
      ["Faro Technologies", "Portable 3D measurement arms, laser trackers, and spatial metrology solutions", "faro.com", "US"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 05: BEARINGS & GUIDES
  // ------------------------------------------------------------
  {
    i: "xroller", L: 5, n: "Crossed-roller & thin-section bearings",
    s: "High-rigidity compact bearings supporting radial, axial, and moment loads",
    w: "Every robotic joint pivot must support high bending moments and axial forces while rotating freely with minimal radial runout. Crossed-roller bearings alternate cylindrical rollers at 90° in a single V-groove raceway, delivering the moment stiffness of a two-row bearing in the footprint of a single thin ring.",
    h: [
      "Cylindrical rollers are arranged perpendicularly in a 90° V-raceway with synthetic spacers.",
      "Internal clearance is preloaded (negative clearance) to eliminate joint play and maximize rigidity.",
      "Split inner or outer rings are clamped with precision shims to set factory preload torque precisely.",
      "Integrated mounting holes allow direct bolt-down to motor housings and harmonic drive flexsplines."
    ],
    k: [
      ["3–4× higher", "moment rigidity compared to conventional single-row ball bearings"],
      ["<2 µm", "radial and axial runout on precision Grade P2/P4 crossed-roller rings"],
      ["90° crossed", "roller orientation resisting combined radial, thrust, and moment loads simultaneously"]
    ],
    c: 3,
    x: "Crucial joint component. THK, IKO, and NSK hold major market share in high-precision preloaded crossed-roller rings. Chinese manufacturers (Luoyang LYC, Luoyang Bearing Research) are expanding capacity rapidly.",
    co: [
      ["THK Co., Ltd.", "Pioneered RB/RE crossed-roller rings and LM linear guides for robotics", "thk.com", "JP"],
      ["IKO / Nippon Thompson", "CRB/CRBF crossed roller bearings and high-rigidity needle roller assemblies", "ikont.co.jp", "JP"],
      ["NSK Ltd.", "High-precision thin-section crossed roller bearings and robotic robot components", "nsk.com", "JP"],
      ["Schaeffler (INA/FAG)", "SX crossed roller bearings and high-precision rotary table mechatronics", "schaeffler.com", "DE"],
      ["Kaydon (SKF Group)", "Reali-Slim thin-section bearings for space-constrained robotic joint wrists", "kaydonbearings.com", "US"],
      ["Luoyang LYC Bearing", "Major Chinese bearing manufacturer expanding high-precision crossed-roller capacity", "lycbearing.com", "CN"]
    ]
  },
  {
    i: "linrail", L: 5, n: "Linear guides & profile rails",
    s: "Recirculating ball and roller rails for Cartesian gantries and linear axes",
    w: "Autonomous Mobile Robots with lifting masts, 7th-axis linear transfer robots, and Cartesian pick-and-place machines move along precision linear guides. Recirculating ball or cylindrical roller blocks glide along surface-ground alloy steel profile rails with sub-micron straightness.",
    h: [
      "Ground steel profile rails feature four circular-arc or gothic-arch raceway grooves.",
      "Carriage blocks contain recirculating synthetic return channels guiding hardened steel balls or rollers.",
      "Preload classes (light, medium, heavy) adjust ball oversize to eliminate clearance under dynamic payload.",
      "Double-lip end seals and lubrication reservoirs maintain grease films over thousands of kilometers."
    ],
    k: [
      ["±1 µm/m", "parallelism running accuracy on precision class linear profile rails"],
      ["0.002–0.004", "coefficient of dynamic friction under full rated payload"],
      ["50,000+ km", "rated service life under rated dynamic load and proper lubrication"]
    ],
    c: 2,
    x: "THK, HIWIN, and Bosch Rexroth dominate precision profile rail production; high-precision grinding of 4-meter rail lengths requires specialized multi-head linear grinding machines.",
    co: [
      ["HIWIN Technologies", "Global leader in linear guideways, ballscrews, and industrial motion components", "hiwin.tw", "TW"],
      ["THK Co., Ltd.", "World market leader in caged-ball LM linear motion systems", "thk.com", "JP"],
      ["Bosch Rexroth", "High-precision profiled linear rails, ball runners, and factory automation guides", "boschrexroth.com", "DE"],
      ["NSK Ltd.", "Linear guide systems with high-load capacity for cleanrooms and machine tools", "nsk.com", "JP"],
      ["Schaeffler (INA)", "Linear recirculating ball and roller bearing units and monorail guidance", "schaeffler.com", "DE"],
      ["PMI Group", "Precision linear guideways and ground ballscrews for automated equipment", "pmi-amt.com", "TW"]
    ]
  },
  {
    i: "ballscrew", L: 5, n: "Ball & planetary roller screws",
    s: "Converting rotary motor torque into massive linear thrust",
    w: "Humanoid robot leg linear actuators, robotic injection moulding presses, and heavy-lift collaborative robots require high-efficiency mechanical conversion from motor rotation to linear force. Ground ball screws and planetary roller screws provide 90%+ mechanical efficiency and massive static load capacities (>100 kN).",
    h: [
      "Precision thread profiles are induction-hardened, precision-ground, or hard-whirled on alloy steel shafts.",
      "Ball screws recirculate bearing balls between shaft and nut grooves to minimize rolling friction.",
      "Planetary roller screws utilize threaded cylindrical rollers orbiting the central screw for 5–10× contact area.",
      "Preloaded double nuts or lead-offset single nuts eliminate axial backlash completely."
    ],
    k: [
      [">90%", "mechanical efficiency compared to <40% for conventional acme lead screws"],
      ["5–10× higher", "dynamic load rating in planetary roller screws vs ball screws of identical diameter"],
      ["0.003 mm", "lead accuracy per 300 mm travel on ISO Class 1/3 ground ball screws"]
    ],
    c: 3,
    x: "Planetary roller screws (critical for compact humanoid leg linear actuators) are highly concentrated among Rollvis, Ewellix (Schaeffler), Moog, and G步 (China), with severe lead-time bottlenecks.",
    co: [
      ["Rollvis Swiss", "World specialist in ultra-high-precision planetary roller screws", "rollvis.com", "CH"],
      ["Ewellix (Schaeffler Group)", "High-performance linear actuators, ball screws, and planetary roller screws", "ewellix.com", "SE"],
      ["HIWIN Technologies", "Precision ground and rolled ballscrews for robotics and machine tools", "hiwin.tw", "TW"],
      ["NSK Ltd.", "High-load ball screws and precision ground miniature screws for actuators", "nsk.com", "JP"],
      ["Moog Inc.", "High-force planetary roller screws and integrated electro-mechanical actuators", "moog.com", "US"],
      ["Nanjing Yigong (NJYG)", "Major Chinese precision ballscrew and linear rolling functional component maker", "njyg.com", "CN"]
    ]
  },
  {
    i: "bushings", L: 5, n: "Plain bearings, bushings & dynamic seals",
    s: "Self-lubricating tribo-bushings and low-friction rotary shaft seals",
    w: "Not every joint pivot justifies the weight and cost of rolling-element bearings. Dexterous fingers, gripper linkages, and suspension links use self-lubricating PTFE/polymer composite bushings that operate dry without maintenance. Rotary shaft seals protect joint interiors against dust and fluid ingress while minimizing stick-slip friction.",
    h: [
      "Sintered porous bronze or steel backing is lined with a PTFE-lead or polyacetal sliding layer.",
      "Embedded solid lubricants (graphite, MoS₂) transfer a micro-thin transfer film to the mating pin.",
      "Spring-energized PTFE rotary lip seals feature hydrodynamic pumping ribs to return oil into the gearbox.",
      "Low radial lip force minimizes parasitic friction torque that would corrupt joint torque sensing."
    ],
    k: [
      ["<0.08", "coefficient of dry sliding friction for self-lubricating metal-polymer bushings"],
      ["zero maintenance", "no grease replenishment required over the entire operating service life"],
      ["<0.1 Nm", "seal parasitic friction torque per joint seal to protect force sensitivity"]
    ],
    c: 1,
    x: "Broad supplier base, but precision spring-energized PTFE seals for low-friction force-torque joints are specialized.",
    co: [
      ["GGB Bearing Technology (Timken)", "Self-lubricating metal-polymer and engineered plastic plain bearings", "ggbearings.com", "US"],
      ["Igus", "iglidur polymer plain bearings, spherical bearings, and tribo-tape liners", "igus.com", "DE"],
      ["Saint-Gobain (Omniseal Solutions)", "Rulon fluoropolymer bushings and Omniseal spring-energized rotary seals", "omniseal.solutions", "FR"],
      ["Freudenberg Sealing Technologies", "Simmerring radial shaft seals and custom elastomer robotic joint seals", "fst.com", "DE"],
      ["Trelleborg Sealing Solutions", "Turcon low-friction PTFE rotary seals and engineered custom gaskets", "trelleborg.com", "SE"],
      ["Oiles Corporation", "Pioneered self-lubricating oilless bearings and solid lubricant composites", "oiles.co.jp", "JP"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 06: TRANSMISSION
  // ------------------------------------------------------------
  {
    i: "strainwave", L: 6, n: "Strain-wave (harmonic) gearing",
    s: "A hundred to one, near-zero backlash, two fingers thick",
    w: "Strain-wave gearing is robotics' deepest single mechanical moat. Invented by C.W. Musser, it uses an elliptical wave generator rotating inside a flexible steel cup (flexspline) to engage teeth with an outer circular spline. Because the flexspline has two fewer teeth than the circular spline, each full input rotation advances the output by exactly two teeth—yielding 30:1 to 160:1 single-stage reduction with zero backlash in an ultra-compact pancake.",
    h: [
      "An elliptical ball-bearing cam (Wave Generator) inserts into a thin-walled elastic steel cup (Flexspline).",
      "The flexspline elastically deforms into an ellipse, meshing its external teeth with the Circular Spline at the major axis.",
      "Teeth at the minor axis are completely disengaged, allowing smooth tooth entry and exit without jamming.",
      "As the wave generator turns 360°, the flexspline rotates relative to the circular spline by the difference in tooth count (typically 2 teeth).",
      "Multiple tooth pairs (typically 30% of all teeth) are in simultaneous mesh, providing high torsional stiffness and high torque capacity."
    ],
    k: [
      ["<1 arc-min", "backlash / lost motion achieved through elastic pre-meshing"],
      ["50:1 to 160:1", "single-stage reduction ratio in a 20–40 mm axial width package"],
      ["~70%", "historical global market share held by Harmonic Drive Systems (Japan/Germany)"]
    ],
    c: 3,
    x: "Absolute industry chokepoint. Flexspline fatigue design, proprietary tooth profile patents (S-tooth / double-circular arc), and flex-cup grinding metallurgy took decades to master. Harmonic Drive Systems and Leaderdrive together dominate worldwide humanoid and cobot supply.",
    co: [
      ["Harmonic Drive Systems (HDS)", "World leader and pioneer of precision strain-wave gearing technology (Hotaka & Limburg plants)", "harmonicdrive.net", "JP"],
      ["Leaderdrive (Suzhou Leader Harmonic)", "Major high-volume strain-wave gear manufacturer dominating Chinese robotics supply", "leaderdrive.com", "CN"],
      ["Nidec Drive Technology (Shimpo)", "FLEXWAVE precision strain-wave reducers and planetary gearheads", "nidec.com", "JP"],
      ["Spinea (Nabtesco)", "TwinSpin high-precision cycloidal-harmonic reducers developed in Slovakia", "spinea.com", "SK"],
      ["Zhejiang Shuanghuan Driveline", "Automotive and precision robotic gear manufacturer expanding harmonic lines", "gears.com.cn", "CN"],
      ["Beijing Harmonic Drive", "Specialized harmonic gear manufacturer supplying domestic Chinese automation", "bjdrive.com", "CN"]
    ]
  },
  {
    i: "cycloid", L: 6, n: "Cycloidal & RV reducers",
    s: "Extreme shock-load tolerance for heavy robot base joints",
    w: "While harmonic drives dominate wrists and lightweight arms, heavy articulated industrial robots (50–1,000 kg payload) rely on RV (Rotate Vector) cycloidal reducers in their first three base joints. Cycloidal discs rolling against circular pins distribute shock loads across dozens of pin teeth simultaneously, withstanding 500% peak shock loads without tooth breakage.",
    h: [
      "An input shaft drives dual or triple eccentric cams 180° out of phase to balance dynamic centrifugal forces.",
      "Eccentric cams drive cycloidal discs whose epitrochoidal curved teeth roll over internal stationary pins.",
      "The planetary orbital motion of the cycloid discs is transferred to output drive pins through needle rollers.",
      "Preloaded angular contact taper roller bearings integrated into the casing provide extreme tipping moment rigidity."
    ],
    k: [
      ["500%", "shock-load overload capacity relative to rated continuous output torque"],
      ["<1 arc-min", "lost motion / angular backlash on precision RV gearheads"],
      ["~60%", "of global industrial robot heavy base joint reducers supplied by Nabtesco"]
    ],
    c: 3,
    x: "Nabtesco (Japan) holds dominant global market share in heavy-duty RV reducers. Multi-axis grinding of cycloidal cam profiles with zero backlash requires proprietary CNC pin-grinding machines.",
    co: [
      ["Nabtesco Corporation", "World undisputed leader in RV precision cycloidal speed reducers (Tsu plant)", "nabtesco.com", "JP"],
      ["Sumitomo Heavy Industries", "Fine Cyclo precision cycloidal reducers and motion control gearboxes", "cyclo.shi.co.jp", "JP"],
      ["Spinea", "High-precision TwinSpin reduction gears integrating cycloidal drive and radial-axial bearings", "spinea.com", "SK"],
      ["Zhejiang Shuanghuan Driveline", "High-volume precision RV reducer manufacturing for industrial robot OEMs", "gears.com.cn", "CN"],
      ["Nantong Zhenkang", "Chinese manufacturer of high-torque RV reducers for industrial articulated robots", "zhenkang.cn", "CN"],
      ["Wittenstein SE", "High-precision Galaxie drive systems and low-backlash planetary-cycloidal reducers", "wittenstein.de", "DE"]
    ]
  },
  {
    i: "planetary", L: 6, n: "Precision planetary gearboxes",
    s: "High-efficiency low-backlash gearheads for mobile wheel drives and wrists",
    w: "Autonomous Mobile Robots (AMRs), AGV drive wheels, and high-speed robotic delta wrists use precision planetary gearboxes. Coaxial sun, planet, and ring gears provide 95%+ high mechanical efficiency, high input speed capability (up to 10,000 RPM), and compact inline packaging.",
    h: [
      "A high-speed central sun gear drives multiple planet gears mounted on a floating carrier cage.",
      "Planet gears mesh with an internal ring gear cut into the gearbox housing.",
      "Helical gear tooth geometry increases contact ratio, reducing noise and increasing torque density.",
      "Planetary carriers utilize preloaded taper or needle bearings to maintain sub-3 arc-min backlash under reversing torque."
    ],
    k: [
      [">95%", "mechanical efficiency per reduction stage at full rated speed"],
      ["<1 to 3 arc-min", "backlash in precision-ground helical planetary gearboxes"],
      ["up to 10,000 RPM", "allowable input motor speed on compact planetary units"]
    ],
    c: 2,
    x: "Highly competitive global supply base with stringent requirements for low acoustic noise (<60 dBA) in mobile hospital and warehouse AMR environments.",
    co: [
      ["Wittenstein SE", "World benchmark for low-backlash alpha planetary gearboxes and mechatronics", "wittenstein.de", "DE"],
      ["Neugart GmbH", "High-precision planetary gearboxes and custom motor mounting gearheads", "neugart.com", "DE"],
      ["Apex Dynamics", "High-volume planetary and spiral bevel gearheads with patented planet carrier design", "apexdyna.com", "TW"],
      ["Harmonic Drive Systems (Planetary Div)", "HPG and HarmonicPlanetary high-precision low-backlash planetary series", "harmonicdrive.net", "JP"],
      ["Stöber Antriebstechnik", "Precision servo planetary gearboxes and integrated geared motors", "stober.com", "DE"],
      ["Bonfiglioli", "Precision planetary gearheads and heavy-duty AMR wheel drive gearboxes", "bonfiglioli.com", "IT"]
    ]
  },
  {
    i: "qdd", L: 6, n: "Quasi-direct drive (QDD) transmissions",
    s: "Low-ratio high-transparency transmissions for dynamic legged locomotion",
    w: "Quadruped and bipedal legged robots (MIT Cheetah, Boston Dynamics Spot, Unitree) experience violent ground impact shocks that would shatter the fragile teeth of a 100:1 strain-wave gear. Quasi-Direct Drive (QDD) pairs large-diameter high-torque-density outrunner motors with low-ratio (3:1 to 10:1) planetary gearheads, providing high mechanical backdriveability so ground reaction forces can be directly sensed via motor current.",
    h: [
      "Low gear reduction (typically 5:1 to 9:1 single-stage planetary) keeps reflected rotor inertia (I_ref = I_rotor × N²) low.",
      "High backdriveability allows ground impact energy to back-drive the motor into regeneration rather than shattering teeth.",
      "High mechanical transparency enables direct joint torque estimation from phase current ($τ = K_t · I_q$) without expensive joint torque sensors.",
      "Large-diameter thin-gap outrunner motors generate high direct air-gap shear stress ($σ > 40\text{ kPa}$)."
    ],
    k: [
      ["<10:1", "gear ratio preserving high mechanical backdriveability"],
      ["<0.05 kg·m²", "low reflected inertia enabling high-frequency compliance loops (>500 Hz)"],
      ["30–50 kHz", "current loop bandwidth required to emulate virtual springs and dampers"]
    ],
    c: 2,
    x: "Requires customized large-diameter frameless motors with high pole counts (>20 poles) and custom single-stage planetary gearheads; key IP sits in motor-gear co-design.",
    co: [
      ["Unitree Robotics (Actuator Div)", "High-volume proprietary QDD joint modules for quadruped and humanoid robots", "unitree.com", "CN"],
      ["T-Motor (Tiger Motor)", "AK-series high-torque quasi-direct drive actuator modules for legged robotics", "tmotor.com", "CN"],
      ["Deep Robotics", "Custom high-torque QDD actuator modules for industrial quadruped platforms", "deeprobotics.cn", "CN"],
      ["MyActuator (Suzhou)", "Integrated RMD-series low-ratio quasi-direct drive servo actuators", "myactuator.com", "CN"],
      ["maxon motor", "High-efficiency flat brushless motors paired with low-ratio planetary gearheads", "maxongroup.com", "CH"],
      ["Dephy Inc.", "Ankle and knee QDD exoskeleton actuators with integrated motor drivers", "dephy.com", "US"]
    ]
  },
  {
    i: "tendon", L: 6, n: "Cable, tendon & belt drives",
    s: "Ultra-lightweight remote actuation for dexterous fingers and wrists",
    w: "Packing 15–20 active electric motors directly inside a humanoid hand would make the hand impossibly heavy and bulky. Cable and tendon drives route high-strength synthetic polyethylene (Spectra/Dyneema) or stainless steel aircraft cables over miniature capstan pulleys, allowing heavy motors to sit remotely in the forearm while transmitting smooth, backlash-free motion to delicate finger phalanges.",
    h: [
      "Ultra-high-molecular-weight polyethylene (UHMWPE) or multi-strand steel cables route through low-friction bowden conduits.",
      "Motorized capstan drums wind and unwind opposing agonist-antagonist tendon pairs.",
      "In-line miniature load cells or spring tensioners maintain active tendon pre-tension, preventing cable derailment.",
      "Tendon elasticity provides passive mechanical compliance, absorbing shock when fingers strike hard surfaces."
    ],
    k: [
      ["10–15× higher", "strength-to-weight ratio in UHMWPE synthetic tendon fibres than steel wire"],
      ["zero backlash", "achieved through continuous capstan cable friction drive"],
      ["<15 mm", "pulley diameter enabling multi-articulated finger joints inside human-scale envelopes"]
    ],
    c: 1,
    x: "Tendon creep, cable fraying, and friction hysteresis in multi-bend bowden sheaths require active software tension compensation and periodic recalibration.",
    co: [
      ["Carl Stahl Sava Industries", "High-precision miniature mechanical cable assemblies and capstan fittings", "savacable.com", "US"],
      ["Shadow Robot Company", "Pioneered tendon-driven anthropomorphic dexterous robotic hands", "shadowrobot.com", "GB"],
      ["Sanctuary AI", "Hydraulic and tendon-driven bimanual manipulation systems and robotic hands", "sanctuary.ai", "CA"],
      ["Asahi Intecc", "Ultra-fine medical and robotic stainless steel micro-cables and braided ropes", "asahi-intecc.co.jp", "JP"],
      ["Gates Corporation", "Precision polyurethane synchronous timing belts for robotic arm drive transfers", "gates.com", "US"],
      ["Brecoflex Co.", "High-precision timing belts and zero-backlash polyurethane drive pulleys", "brecoflex.com", "US"]
    ]
  },
  {
    i: "linact", L: 6, n: "Integrated linear electro-mechanical actuators",
    s: "High-power-density electric cylinders replacing hydraulic rams",
    w: "Modern bipedal humanoids (e.g., Tesla Optimus, Figure) replace bulky rotary joint hips and knees with linear electric actuators. An inverted planetary roller screw or high-lead ball screw is integrated directly inside a high-speed frameless motor rotor, providing linear thrust up to 10,000 Newtons in a sleek, lightweight cylinder.",
    h: [
      "A frameless brushless motor rotor is hollowed out to house the nut of a planetary roller screw.",
      "As the motor turns, the stationary roller screw translates linearly out of the housing.",
      "Integrated linear position sensors (inductive or optical scale) measure rod extension with micron precision.",
      "Spherical rod-end bearings mount the cylinder between adjacent kinematic limbs, creating a high-leverage moment arm."
    ],
    k: [
      ["up to 10 kN", "linear thrust output delivered by compact humanoid knee/hip actuators"],
      [">80%", "electrical-to-mechanical efficiency vs <40% for hydraulic systems"],
      ["<1.5 kg", "total actuator mass including motor, roller screw, housing, and driver"]
    ],
    c: 3,
    x: "Critical architectural battleground for humanoid robots. Co-axial integration of planetary roller screws inside high-speed motor rotors requires micron-level concentricity machining.",
    co: [
      ["Tesla (Optimus Actuator Div)", "Internal development and high-volume production of custom humanoid linear actuators", "tesla.com", "US"],
      ["Moog Inc.", "High-performance electro-mechanical linear actuators and aerospace servocylinders", "moog.com", "US"],
      ["Schaeffler (Industrial Actuation)", "Integrated CASM-series electro-mechanical cylinders with planetary roller screws", "schaeffler.com", "DE"],
      ["Exlar (Curtiss-Wright)", "Integrated brushless motor and inverted roller screw linear electric actuators", "curtisswright.com", "US"],
      ["Tolomatic", "High-force electric linear actuators and rod-style roller screw cylinders", "tolomatic.com", "US"],
      ["Sanhua Intelligent Controls", "Major automotive/HVAC supplier developing mass-production humanoid linear actuators", "sanhuagroup.com", "CN"]
    ]
  }
];
