export const S07_S14 = [
  // ------------------------------------------------------------
  // STRATUM 07: MOTOR
  // ------------------------------------------------------------
  {
    i: "frameless", L: 7, n: "Frameless BLDC & PMSM motors",
    s: "Uncased rotor-stator kits integrated directly into robotic joint hubs",
    w: "To minimize joint mass and eliminate redundant bearings, modern collaborative and humanoid robots avoid packaged motors with separate shafts. Frameless motor kits supply bare stator laminations with precision copper windings and matching permanent-magnet rotors that bolt directly around the harmonic drive and joint bearing.",
    h: [
      "Segmented electrical steel laminations (0.1–0.2 mm thick) minimize eddy current core losses at high electrical frequencies.",
      "High-slot-fill needle or concentrated tooth winding maximizes copper packing density in small slots.",
      "Rotors carry high-coercivity NdFeB arc segments in Halbach or surface-mount configurations.",
      "Epoxy encapsulation under vacuum protects windings against vibration, moisture, and thermal shock."
    ],
    k: [
      [">5 Nm/kg", "continuous torque density achieved in high-performance frameless kits"],
      ["up to 92%", "electrical efficiency at nominal speed and load"],
      ["0.1–0.2 mm", "silicon steel lamination thickness to suppress eddy current losses at >500 Hz"]
    ],
    c: 2,
    x: "High-end frameless kits (Kollmorgen TBM2G, TQ Robodrive, Maxon, Allied Motion) require automated precision tooth winding and low-cogging slot-pole combinations (e.g., 12-slot 10-pole or 12-slot 14-pole).",
    co: [
      ["Kollmorgen (Regal Rexnord)", "TBM and TBM2G frameless brushless motor kits standard in cobots and surgical arms", "kollmorgen.com", "US"],
      ["TQ-Group (RoboDrive)", "ILM-series high-torque frameless servo kits developed with DLR for space robotics", "tq-group.com", "DE"],
      ["maxon motor", "EC-frameless flat and cylindrical brushless motors for precision joint modules", "maxongroup.com", "CH"],
      ["Allient (Allied Motion)", "Megaflux and KinetiMax frameless torque motor kits for robotics and AGVs", "allient.com", "US"],
      ["Faulhaber", "High-precision micro-brushless motors and frameless coil systems", "faulhaber.com", "DE"],
      ["Inovance Technology", "Leading Chinese industrial servo and frameless motor manufacturing group", "inovance.com", "CN"]
    ]
  },
  {
    i: "torquemotor", L: 7, n: "Direct-drive torque motors",
    s: "Large-diameter hollow-shaft motors eliminating gearboxes entirely",
    w: "In semiconductor wafer-handling robots, optical tracking gimbals, and ultra-high-speed delta robot bases, gear backlash and mechanical wear are unacceptable. Large-diameter, multi-pole direct-drive torque motors couple directly to the load, providing zero-backlash, infinite life, and sub-arcsecond positioning repeatability.",
    h: [
      "Large outer diameter provides a large radius arm, multiplying electromagnetic air-gap shear force directly into high torque.",
      "High pole counts (40–100+ magnetic poles) generate high torque at low rotational speeds (<300 RPM).",
      "Large hollow through-bore (50–300 mm ID) allows optical beam paths, cables, and vacuum lines to pass through the center.",
      "Integrated water-cooling channels in the outer stator housing dissipate resistive Joule heat during continuous stall holding."
    ],
    k: [
      ["zero backlash", "infinite mechanical stiffness due to direct shaft coupling without gears"],
      ["up to 1,000+ Nm", "peak torque output from large-diameter direct-drive torque rings"],
      ["sub-arcsecond", "positioning repeatability when paired with high-line optical encoders"]
    ],
    c: 2,
    x: "Thermal management is the fundamental trade-off: without mechanical gear multiplication, holding a static load requires high continuous phase current, dissipating high continuous $I^2R$ resistive heat inside the motor.",
    co: [
      ["ETEL S.A. (Heidenhain Group)", "World undisputed benchmark for high-end direct-drive torque and linear motors", "etel.ch", "CH"],
      ["Kollmorgen", "KBM and Cartridge DDR direct-drive rotary torque motor series", "kollmorgen.com", "US"],
      ["Schaeffler (INA Drives & Mechatronics)", "IDAM high-precision direct-drive torque motors for machine tools and robotics", "schaeffler-idam.de", "DE"],
      ["Moog Inc.", "Brushless direct-drive torque motors for aerospace and demanding robotic gimbals", "moog.com", "US"],
      ["HIWIN Mikrosystem", "Direct-drive torque motors and high-precision rotary tables", "hiwinmikro.tw", "TW"],
      ["Akribis Systems", "Direct-drive motors and precision motion control stages", "akribis-sys.com", "SG"]
    ]
  },
  {
    i: "servo", L: 7, n: "Industrial AC servo motors",
    s: "Packaged high-dynamic servo motors powering standard articulated arms",
    w: "The global fleet of hundreds of thousands of standard 6-axis industrial robots (Fanuc, Yaskawa, ABB, KUKA) is driven by fully packaged AC synchronous servo motors. Integrated with holding brakes, high-resolution optical absolute encoders, and IP65/IP67 sealed housings, these motors operate continuously for 10+ years in automotive plants.",
    h: [
      "Low-inertia cylindrical rotors allow explosive angular acceleration ($>50,000\text{ rad/s}^2$) during rapid pick-and-place.",
      "High-voltage DC bus (300–600V DC) minimizes phase current and cable conductor diameter.",
      "Serial encoder feedback protocols (BiSS-C, EnDat, Fanuc Serial, Yaskawa MECHATROLINK) transmit 24-bit position over single cable pairs.",
      "Fail-safe electromagnetic friction disc brakes lock the motor shaft upon loss of electrical supply."
    ],
    k: [
      ["50,000+ rad/s²", "peak angular acceleration capability on low-inertia servo models"],
      ["24-bit", "single-turn encoder resolution (16,777,216 counts per motor revolution)"],
      ["100,000+ hours", "MTBF on industrial servo motor stator insulation and bearings"]
    ],
    c: 2,
    x: "Japanese and European automation giants (Yaskawa, Fanuc, Mitsubishi, Siemens) maintain closed proprietary motor-drive ecosystems with proprietary communication protocols.",
    co: [
      ["Yaskawa Electric", "World's largest manufacturer of AC servo motors (Sigma-7 / Sigma-10 series)", "yaskawa.co.jp", "JP"],
      ["Fanuc Corporation", "Alpha-i and Beta-i servo motors powering all yellow Fanuc articulated robots", "fanuc.co.jp", "JP"],
      ["Mitsubishi Electric", "MELSERVO servo motors and motion controllers with optical SSCNET/CC-Link", "mitsubishielectric.com", "JP"],
      ["Siemens Digital Industries", "SIMOTICS S servo motors and SINAMICS industrial drive systems", "siemens.com", "DE"],
      ["Estun Automation", "Major Chinese servo motor and industrial robot manufacturer", "estun.com", "CN"],
      ["Tamagawa Seiki", "Specialist manufacturer of high-precision servo motors and resolvers for robotics", "tamagawa-seiki.com", "JP"]
    ]
  },
  {
    i: "magassy", L: 7, n: "Rotor magnet assembly & balancing",
    s: "Robotic placement, gluing, and dynamic balancing of permanent magnet rotors",
    w: "Affixing dozens of brittle, pre-magnetized NdFeB magnet segments to a high-speed rotor shaft requires specialized robotic assembly automation. High centrifugal forces ($>10,000\text{ RPM}$) and thermal cycling demand structural epoxy bonding, non-magnetic carbon-fibre or stainless steel retaining sleeves, and sub-milligram dynamic balancing.",
    h: [
      "Automated pick-and-place robots insert magnetic segments against repulsive magnetic fields into rotor core slots.",
      "Dual-cure structural acrylic or epoxy adhesives are dispensed with automated vision inspection.",
      "Carbon-fiber composite or thin-walled non-magnetic alloy sleeves are heat-shrunk over the outer rotor diameter.",
      "Dynamic dual-plane balancing machines spin the rotor up to 15,000 RPM, removing material with laser ablating heads."
    ],
    k: [
      ["ISO Grade G0.4", "dynamic balance quality grade achieved on high-speed servo rotors"],
      [">15,000 RPM", "burst speed rating guaranteed by carbon-fibre rotor retaining sleeves"],
      ["<0.05 mm", "air gap distance maintained between stator bore and rotor magnet surface"]
    ],
    c: 2,
    x: "Handling strong permanent magnets without chipping or human injury requires automated magnetic insertion tooling and custom vacuum holding fixtures.",
    co: [
      ["Schenck RoTec (Dürr Group)", "World leader in dynamic balancing machines and rotor balancing technology", "schenck-rotec.com", "DE"],
      ["Arnold Magnetic Technologies", "Precision magnetic assemblies, rotor sleeving, and laminated rotor assemblies", "arnoldmagnetics.com", "US"],
      ["TDK Corporation", "Automated rotor magnetic assembly and magnet-rotor module manufacturing", "tdk.com", "JP"],
      ["Hofmann Balancing", "High-precision dynamic balancing and laser material removal systems", "hofmann-balancing.com", "DE"],
      ["Ningbo Yunsheng", "Automated rotor assembly and permanent magnet sub-system integration", "yunsheng.com", "CN"],
      ["Sanhua Intelligent Controls", "Automated high-volume permanent magnet rotor assembly lines for actuators", "sanhuagroup.com", "CN"]
    ]
  },
  {
    i: "windings", L: 7, n: "Automated stator winding & lamination",
    s: "High-slot-fill needle winding and ultra-thin electrical steel stacks",
    w: "A motor's torque output is directly proportional to the number of ampere-turns ($N \cdot I$) packed inside its stator slots. High-speed CNC needle winders and flyer winders insert enamelled copper wire with slot fill factors exceeding 70%, minimizing winding resistance and thermal losses in compact joint envelopes.",
    h: [
      "Laser or progressive stamping dies punch 0.1–0.35 mm silicon steel laminations with micro-interlocks.",
      "Lamination stacks are glued or welded under axial compression to eliminate acoustic vibration hum.",
      "Multi-axis CNC needle winding heads wrap insulated magnet wire (Grade 200/220 °C) directly onto insulated stator teeth.",
      "Automated Trickle Impregnation or Vacuum Pressure Impregnation (VPI) infuses high-thermal-conductivity resin into all slot voids."
    ],
    k: [
      [">70%", "copper slot fill factor achieved with segmented tooth winding (vs ~45% in standard hand-wound motors)"],
      ["220 °C", "thermal class rating of high-temperature polyimide-overcoated magnet wire"],
      ["<10 pC", "partial discharge threshold ensuring 100,000-hour inverter insulation life"]
    ],
    c: 2,
    x: "High-fill needle winding machines for compact frameless stators are concentrated among specialized Italian, Swiss, and Japanese automation equipment builders.",
    co: [
      ["Marsilli S.p.A.", "World leader in automated precision winding and assembly systems for electric motors", "marsilli.com", "IT"],
      ["Aumann AG", "Specialized winding technology and automated motor manufacturing lines", "aumann.com", "DE"],
      ["Odawara Engineering", "High-speed automated coil winding machines and stator manufacturing equipment", "odawara-eng.co.jp", "JP"],
      ["Statomat (Schaeffler)", "Automated hairpin and needle winding technologies for electric stator production", "statomat.com", "DE"],
      ["Elektrorad (Nuova Elettromeccanica)", "Precision micro-winding machines for miniature robotic actuator coils", "elektrorad.com", "IT"],
      ["Tanac Automation", "CNC multi-axis coil winding machines and automated stator assembly systems", "tanac.com.cn", "CN"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 08: ACTUATION
  // ------------------------------------------------------------
  {
    i: "jointmod", L: 8, n: "Integrated robotic joint modules",
    s: "Self-contained actuators combining motor, harmonic gear, dual encoders, brake, and driver",
    w: "Modern collaborative robots (Universal Robots) and humanoids (Figure, 1X, Agility) avoid discrete mechanical plumbing by purchasing integrated 'smart actuators'. A single sealed cylindrical module houses a frameless BLDC motor, strain-wave gear, dual optical/magnetic encoders, fail-safe brake, GaN servo drive, and EtherCAT transceiver—requiring only a single power DC bus and communications fieldbus daisy-chain.",
    h: [
      "A frameless motor drives a strain-wave gear Wave Generator mounted directly on the motor shaft.",
      "Dual encoders measure position: Encoder 1 on the high-speed motor shaft for FOC commutation, Encoder 2 on the output joint shaft for absolute kinematic tracking.",
      "A compact electromagnetic brake engages directly on the motor shaft for maximum torque multiplication.",
      "An integrated PCB drive ring uses GaN MOSFETs to execute 25 kHz FOC current control inside the actuator end-cap.",
      "The outer aluminium housing acts as the primary heat sink, conducting heat directly into adjacent structural robot limb links."
    ],
    k: [
      ["6-in-1", "integration: motor + gear + 2 encoders + brake + servo drive in one housing"],
      ["100–350 Nm/kg", "peak torque density achieved in high-end titanium/aluminium joint modules"],
      ["2 wires", "power plus fieldbus daisy-chain eliminating 40+ discrete internal cables per robot arm"]
    ],
    c: 3,
    x: "Primary cost and performance determinant of modern robots. Assembling these modules requires sub-micron concentricity alignment between motor, wave generator, crossed-roller bearing, and dual encoders.",
    co: [
      ["Universal Robots (Teradyne)", "Pioneered high-reliability modular cobot joint actuators (Odense, Denmark)", "universal-robots.com", "DK"],
      ["Synapticon GmbH", "Integrated ACTILINK joint modules and ultra-compact SOMANET servo drive nodes", "synapticon.com", "DE"],
      ["Harmonic Drive Systems (Mechatronics Div)", "Integrated SHA/FHA AC servo actuators with built-in harmonic gearing", "harmonicdrive.net", "JP"],
      ["Robotis (Dynamixel)", "Modular DYNAMIXEL-P and Pro joint actuators standard in research and service robots", "robotis.com", "KR"],
      ["Unitree Robotics (Actuator Div)", "High-torque Go-M8010 and B1 joint modules for legged and humanoid platforms", "unitree.com", "CN"],
      ["INNFOS Drive", "Integrated SCA (Smart Compliant Actuator) joint modules for humanoids", "innfos.com", "CN"]
    ]
  },
  {
    i: "drives", L: 8, n: "High-frequency servo drives",
    s: "Compact GaN/MOSFET servo controllers executing 20–50 kHz FOC current loops",
    w: "A robot's position accuracy, impedance compliance, and acoustic silence depend on the servo drive regulating motor coil currents. Miniature PCB-mounted servo drives leverage wide-bandgap Gallium Nitride (GaN) FETs to switch PWM at 50 kHz without thermal heatsinks, fitting directly onto the back of joint actuators.",
    h: [
      "GaN or low-Rds(on) silicon MOSFETs switch 48–60V DC bus voltages at 25–100 kHz PWM frequency.",
      "Isolated shunt resistors and high-speed delta-sigma ADCs sample 3-phase motor currents simultaneously.",
      "FOC hardware accelerators on real-time microcontrollers compute Clarke, Park, and Space Vector PWM algorithms.",
      "Dual-core processors execute current loop (25 kHz), velocity loop (5 kHz), and position loop (1 kHz) in deterministic lockstep."
    ],
    k: [
      ["20–50 kHz", "current loop update frequency minimizing torque ripple and acoustic whine"],
      [">98%", "switching efficiency achieved with GaN power transistors, eliminating bulky heatsinks"],
      ["<50 mm", "diameter PCB drive ring delivering up to 30A continuous / 60A peak phase current"]
    ],
    c: 2,
    x: "Compact drive engineering combines extreme thermal density, high-current PCB layout, microsecond EtherCAT synchronization, and functional safety (STO) onto miniature multi-layer PCBs.",
    co: [
      ["Elmo Motion Control (Bosch Rexroth)", "World leader in ultra-compact Gold & Platinum Twitter miniature servo drives", "elmomc.com", "IL"],
      ["Synapticon GmbH", "SOMANET Circulo ultra-compact hollow-shaft joint drive controllers", "synapticon.com", "DE"],
      ["Advanced Motion Controls (AMC)", "High-power-density servo drives and custom PCB motion controllers", "a-m-c.com", "US"],
      ["Copley Controls", "High-performance EtherCAT and CANopen distributed servo drive modules", "copleycontrols.com", "US"],
      ["Beckhoff Automation", "AX5000 / AX8000 and distributed EtherCAT servo drive terminals", "beckhoff.com", "DE"],
      ["Leadshine Technology", "High-volume low-voltage DC servo drives and integrated stepping systems", "leadshine.com", "CN"]
    ]
  },
  {
    i: "brakes", L: 8, n: "Fail-safe spring-applied holding brakes",
    s: "Power-off electromagnetic safety brakes preventing arm collapse",
    w: "When a robot loses electrical power, hits an emergency stop (E-stop), or holds a heavy payload motionless for hours, relying on active motor current burns power and overheats windings. Fail-safe spring-applied electromagnetic brakes automatically lock the joint shaft when de-energized, holding full payload without drawing power.",
    h: [
      "Heavy compression springs push a high-friction armature disc against the rotating rotor hub.",
      "When 24V DC is applied, an electromagnetic coil creates magnetic flux that overcomes the springs, pulling back the armature to release the shaft.",
      "Permanent-magnet brakes use permanent magnets for holding force and apply an opposing coil field to release.",
      "Backlash-free friction disc hubs ensure zero angular slipping when the brake engages in holding position."
    ],
    k: [
      ["<20 ms", "emergency stopping engagement time upon de-energization / E-stop trip"],
      ["zero power", "drawn during hours of static workpiece holding in power-off mode"],
      ["100% fail-safe", "mechanical spring clamping automatically engaged if power cable is severed"]
    ],
    c: 2,
    x: "Low axial profile (<15 mm thickness) and high holding torque ($>1.5\times$ motor rated torque) are critical for compact joint envelopes; Kendrion, Mayr, and Miki Pulley dominate supply.",
    co: [
      ["Mayr Power Transmission", "ROBA-stop-M and ROBA-drive safety brakes standard in industrial robot joints", "mayr.com", "DE"],
      ["Kendrion N.V.", "Permanent magnet and spring-applied brakes for robotic servo motors", "kendrion.com", "DE"],
      ["Miki Pulley", "High-precision electromagnetic spring-applied holding brakes for robotics", "mikipulley.co.jp", "JP"],
      ["Inertia Dynamics (Altra / Regal Rexnord)", "Miniature spring-set holding brakes and electromagnetic clutches", "altramotion.com", "US"],
      ["Ogura Industrial Corp", "Micro-electromagnetic spring-applied safety holding brakes", "ogura-clutch.com", "JP"],
      ["Reach Machinery", "Specialist manufacturer of electromagnetic spring-applied brakes for robotics in Asia", "reachmachinery.com", "CN"]
    ]
  },
  {
    i: "sea", L: 8, n: "Series-elastic & compliant actuators",
    s: "Physical mechanical springs in series with motors for shock tolerance and force control",
    w: "Rigid actuators with high-ratio gearboxes suffer high reflected inertia and can be damaged by sudden impact with hard obstacles. Series-Elastic Actuators (SEA) place a calibrated mechanical spring (torsion or leaf spring) between the gearbox output and the joint, turning joint position deflection into direct, low-bandwidth force measurement.",
    h: [
      "A calibrated planar torsion spring is integrated directly between the gearbox output and the outer joint link.",
      "Dual high-resolution encoders measure deflection angle ($θ_{spring} = θ_{output} - θ_{gear}$ across the spring.",
      "Hooke's Law ($τ = K_{spring} \cdot θ_{spring}$) directly computes output torque without expensive strain gauges.",
      "The physical compliance naturally filters high-frequency impact shocks, protecting delicate gearbox teeth."
    ],
    k: [
      ["100–1,000 Nm/rad", "typical torsion spring stiffness tuned for robotic force compliance"],
      [">10× shock", "attenuation during unexpected hard environmental collisions"],
      ["sub-Newton", "force control fidelity achieved during compliant surface contact"]
    ],
    c: 1,
    x: "Introduces non-linear spring hysteresis and reduces high-frequency position control bandwidth; primarily used in collaborative bipedal legs (Agility Cassie/Digit) and compliant cobots (Rethink Baxter/Sawyer).",
    co: [
      ["Agility Robotics (Actuator Div)", "Custom series-elastic spring joint actuators powering Digit bipedal legs", "agilityrobotics.com", "US"],
      ["HEBI Robotics", "X-Series and R-Series modular series-elastic actuator components", "hebirobotics.com", "US"],
      ["Sensinger Lab / Bionic Motion", "Specialized compliant actuator systems for prosthetic and rehabilitation robotics", "sensinger.org", "US"],
      ["Apptronik (Actuator Div)", "Series-elastic and hybrid liquid-cooled actuator architectures for humanoids", "apptronik.com", "US"],
      ["Bota Systems", "Compliant mechanical torque sensing modules and force integration", "botasystems.com", "CH"],
      ["ANYbotics (Actuator Div)", "Compliant joint actuators for ANYmal industrial legged robots", "anybotics.com", "CH"]
    ]
  },
  {
    i: "fluidic", L: 8, n: "Electro-hydraulic & pneumatic actuators",
    s: "Extreme power density and explosive force for dynamic robotics",
    w: "Where electric motors struggle with torque density in heavy-duty dynamic humanoids (e.g., legacy Boston Dynamics Atlas), electro-hydraulic actuators (EHA) deliver up to 50 kW/kg power density. Hydraulic servovalves regulate 200–350 bar fluid pressure to move titanium cylinders with explosive acceleration, while pneumatic artificial muscles provide soft, biological compliance.",
    h: [
      "A compact brushless motor drives a miniature radial-piston hydraulic pump at up to 10,000 RPM.",
      "High-speed 2-stage flapper-nozzle or direct-drive servovalves throttle fluid flow at 200+ bar pressure.",
      "Hydraulic cylinders generate massive linear force ($F = P \cdot A$) with zero internal gearbox backlash.",
      "Accumulator reservoirs store hydraulic energy during steady stance to deliver massive peak burst power during jumps."
    ],
    k: [
      ["up to 350 bar", "hydraulic fluid operating pressure in dynamic humanoid actuators"],
      [">5 kW/kg", "hydraulic power-to-weight density vs ~0.5 kW/kg for electric rotary actuators"],
      ["<5 ms", "full-stroke servovalve dynamic response time"]
    ],
    c: 2,
    x: "Hydraulic oil leakage risks, low overall electrical-to-mechanical efficiency (<40%), and high thermal dissipation are driving most modern robotics developers toward pure electric actuation.",
    co: [
      ["Moog Inc.", "World undisputed benchmark in high-frequency electro-hydraulic servovalves and integrated EHAs", "moog.com", "US"],
      ["Boston Dynamics (Hydraulics Div)", "Pioneered high-density 3D-printed hydraulic manifolds and servovalves for Atlas", "bostondynamics.com", "US"],
      ["Parker Hannifin", "Miniature hydraulic power units, proportional valves, and electro-hydraulic actuators", "parker.com", "US"],
      ["Bosch Rexroth (Fluid Power Div)", "Industrial hydraulic servovalves, pumps, and compact electro-hydraulic cylinders", "boschrexroth.com", "DE"],
      ["Festo SE", "Pioneers in pneumatic artificial muscles (Fluidic Muscle) and soft bionic robotics", "festo.com", "DE"],
      ["SMC Corporation", "Pneumatic actuators, high-speed directional solenoid valves, and grippers", "smcworld.com", "JP"]
    ]
  },
  {
    i: "thermact", L: 8, n: "Actuator thermal management",
    s: "Phase-change heat pipes, liquid cooling loops, and housing conduction",
    w: "Robotic actuators operate under continuous stall torque conditions (holding position against gravity), where 100% of electrical input power converts directly into resistive Joule heat ($I^2R$). Without active thermal dissipation, stator temperatures exceed 150 °C within minutes, triggering thermal throttling and cutting joint torque in half.",
    h: [
      "Internal copper stator windings conduct heat directly into high-thermal-conductivity potting resin.",
      "Flattened sintered-copper-powder heat pipes transfer heat from the stator core to the outer robot limb casting.",
      "Active liquid cooling micro-channels circulate low-viscosity dielectric fluid or water-glycol through actuator end-caps.",
      "Distributed thermistors and thermal state observers predict internal magnet temperatures in real time to prevent demagnetization."
    ],
    k: [
      ["200–400 W", "continuous thermal heat dissipated per humanoid during static standing"],
      ["2× higher", "continuous holding torque enabled by active liquid cooling vs passive air cooling"],
      ["<10 °C/W", "thermal resistance from motor winding to external chassis link heatsink"]
    ],
    c: 2,
    x: "Thermal dissipation sets the true continuous torque rating of robotic joints. While peak torque can reach 100 Nm for 1 second, continuous stall torque is often only 20–30 Nm without active cooling.",
    co: [
      ["Boyd Corporation", "Advanced thermal management, heat pipes, and cold plates for high-density mechatronics", "boydcorp.com", "US"],
      ["Aavid (Thermal Division of Boyd)", "Custom liquid cold plates and phase-change thermal heat sinks for robotics", "aavid.com", "US"],
      ["Wakefield-Vette", "Thermal solutions, extruded heatsinks, and heat pipe assemblies for servo drives", "wakefield-vette.com", "US"],
      ["Apptronik (Thermal Systems)", "Proprietary liquid-cooled joint actuator architecture for Apollo humanoid", "apptronik.com", "US"],
      ["Cooler Master (Industrial)", "Custom vapor chambers, micro-heat pipes, and compact liquid cooling pumps", "coolermaster.com", "TW"],
      ["Delta Electronics", "Thermal management solutions, brushless fans, and liquid cooling distribution units", "deltaww.com", "TW"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 09: PROPRIOCEPTION
  // ------------------------------------------------------------
  {
    i: "encoders", L: 9, n: "Absolute optical & magnetic joint encoders",
    s: "17-to-24 bit dual absolute encoders measuring pre- and post-gear positions",
    w: "A robot cannot control what it cannot measure. Modern robotic joints employ dual absolute encoders: an off-axis magnetic or optical encoder on the high-speed motor shaft for 25 kHz FOC commutation, and a high-resolution absolute optical disc on the gearbox output shaft measuring the true kinematic position of the limb after gear deflection and backlash.",
    h: [
      "Chrome-on-glass or etched metal code discs feature pseudo-random binary track codes and incremental grating tracks.",
      "Optoelectronic sensor arrays read the code pattern, generating single-turn absolute position without homing cycles.",
      "Off-axis magnetic encoder rings use multipole magnetic rubber or metal rings read by Hall sensor ICs.",
      "High-speed serial transceivers (BiSS-C, SSI, EnDat 2.2/3.0) transmit 20–24 bit angle data at up to 10 MHz clock rates."
    ],
    k: [
      ["20–24 bit", "resolution (over 1,048,576 to 16,777,216 counts per single revolution)"],
      ["dual encoder", "architecture measuring both motor shaft angle and output joint angle simultaneously"],
      ["zero homing", "true absolute battery-less multiturn position instantly available at power-on"]
    ],
    c: 3,
    x: "Crucial joint component. Heidenhain and Renishaw dominate high-accuracy optical encoders, while iC-Haus, Netzer, and Posital dominate off-axis magnetic/capacitive encoders.",
    co: [
      ["Heidenhain", "World gold standard in optical angle encoders and EnDat digital interfaces (Traunreut, Germany)", "heidenhain.de", "DE"],
      ["Renishaw", "AksIM and Resolute true-absolute magnetic and optical rotary encoders (Wotton-under-Edge, UK)", "renishaw.com", "GB"],
      ["Netzer Precision Position Sensors", "Electric Encoder high-resolution hollow-shaft rotary capacitive encoders", "netzerprecision.com", "IL"],
      ["iC-Haus", "Integrated encoder ICs, optoelectronic scanning arrays, and Hall sensor chips", "ichaus.de", "DE"],
      ["RLS d.o.o. (Renishaw Associate)", "AksIM-2 and magnetic hollow-shaft rotary encoder rings for robotic joints", "rls.si", "SI"],
      ["Posital (FRABA Group)", "IXARC absolute rotary encoders and Wiegand-wire energy-harvesting multiturn technology", "posital.com", "NL"]
    ]
  },
  {
    i: "resolver", L: 9, n: "Heavy-duty resolvers & inductive sensors",
    s: "Vibration-proof electromagnetic angle sensors for harsh industrial robots",
    w: "In foundry robots, heavy welding workcells, and high-shock environments, fragile glass optical encoder discs can crack or fail from vibration and oil mist. Brushless resolvers and PCB-based inductive sensors use transformer coupling to measure rotor angle with extreme electromagnetic noise immunity and decades of maintenance-free service life.",
    h: [
      "A sinusoidal reference AC voltage excites the primary rotor winding via a brushless rotary transformer.",
      "Secondary stator windings arranged 90° apart pick up induced voltages amplitude-modulated by rotor position ($V_{sin} = V_0 \sin θ$, $V_{cos} = V_0 \cos θ$).",
      "Resolver-to-Digital Converter (RDC) chips demodulate the sine/cosine ratio into absolute angular position.",
      "PCB inductive encoders use etched planar coils and a passive conductive target to eliminate copper wire windings entirely."
    ],
    k: [
      ["-55 to +155 °C", "extreme operational temperature rating of ruggedized industrial resolvers"],
      ["100+ g shock", "resistance without mechanical damage or signal loss"],
      ["analog ratio", "measurement ($\tan θ = V_{sin}/V_{cos}$) inherently cancels temperature-induced amplitude drift"]
    ],
    c: 2,
    x: "Tamagawa Seiki holds near-monopoly market share in precision industrial resolvers supplied to Japanese and European robot OEMs.",
    co: [
      ["Tamagawa Seiki", "World undisputed market leader in precision brushless resolvers (Singlsyn series)", "tamagawa-seiki.com", "JP"],
      ["MicroE (Novanta)", "Miniature optical and inductive encoder systems for precision medical robotics", "novanta.com", "US"],
      ["Zettlex (Novanta IMS)", "IncOder inductive angle encoders featuring hollow-bore PCB planar coils", "novanta.com", "GB"],
      ["Analog Devices", "High-accuracy Resolver-to-Digital Converter (RDC) integrated circuits", "analog.com", "US"],
      ["Broadcom (Avago)", "Integrated motion control optical and magnetic resolver-replacement encoders", "broadcom.com", "US"],
      ["Sanyo Denki", "High-reliability brushless resolvers and industrial servo drive position sensors", "sanyodenki.com", "JP"]
    ]
  },
  {
    i: "imu", L: 9, n: "Tactical-grade MEMS IMUs",
    s: "Low-drift 6-DoF inertial measurement units for humanoid balance and VIO",
    w: "Bipedal humanoids and legged robots must compute their torso orientation, angular velocity, and linear acceleration hundreds of times per second to maintain dynamic balance and prevent tipping. Tactical-grade MEMS Inertial Measurement Units (IMUs) integrate 3-axis gyroscopes and 3-axis accelerometers with sub-degree-per-hour in-run bias stability.",
    h: [
      "Silicon micromachined capacitive proof masses vibrate at high frequency, measuring Coriolis acceleration during rotation.",
      "Piezoresistive or capacitive micro-beams deflect under linear acceleration, shifting differential capacitance.",
      "Internal DSPs execute real-time thermal compensation and cross-axis alignment calibration matrices.",
      "High-speed SPI buses stream 6-DoF acceleration and angular rate vectors to state estimators at 1,000–4,000 Hz."
    ],
    k: [
      ["<1 °/hr", "gyroscope in-run bias stability on tactical-grade industrial IMUs"],
      ["1,000–4,000 Hz", "sampling update rate streamed directly to Whole-Body Control balance loops"],
      ["<0.05°", "dynamic pitch and roll attitude accuracy when fused with Visual-Inertial Odometry"]
    ],
    c: 2,
    x: "Tactical-grade low-noise MEMS gyro fabrication requires specialized deep reactive-ion etching (DRIE) and vacuum hermetic wafer-level packaging (Bosch, TDK, ADI, STMicro).",
    co: [
      ["Analog Devices (ADI)", "ADIS16488 / ADIS16500 tactical-grade precision 6-DoF MEMS IMU modules", "analog.com", "US"],
      ["Bosch Sensortec", "High-volume consumer and industrial low-power MEMS accelerometers and gyroscopes", "bosch-sensortec.com", "DE"],
      ["TDK InvenSense", "High-performance 6-axis motion tracking MEMS sensors and software", "invensense.tdk.com", "US"],
      ["STMicroelectronics", "Industrial MEMS IMUs (ISM330 series) with embedded machine learning cores", "st.com", "CH"],
      ["Epson Sensing Solutions", "Ultra-low-drift quartz gyroscopes and tactical-grade IMU units", "epson.jp", "JP"],
      ["Silicon Sensing Systems", "Pioneered vibrating ring silicon MEMS gyroscopes with zero moving parts", "siliconsensing.com", "GB"]
    ]
  },
  {
    i: "jts", L: 9, n: "6-axis wrist F/T & joint torque sensors",
    s: "Piezoresistive and optical load cells measuring contact interaction forces",
    w: "To assemble delicate electronic connectors, polish turbine blades, or safely touch a human without bruising, a robot must feel physical contact forces. 6-axis force-torque (F/T) sensors mounted at the wrist, and custom spoke-type torque sensors embedded inside joint shafts, measure $F_x, F_y, F_z$ forces and $M_x, M_y, M_z$ moments simultaneously with millinewton resolution.",
    h: [
      "A monolithic metal flexure ring deforms elastically under external forces and moments.",
      "Foil strain gauges or piezoresistive silicon gauges bonded to flexure beams change electrical resistance under micro-strain.",
      "Full Wheatstone bridge circuits convert micro-strain into analog voltage signals.",
      "A 6×6 calibration matrix computed during factory multi-axis loading decouples cross-talk between axes.",
      "High-speed DSPs digitize all 6 channels simultaneously at 1,000–8,000 Hz over EtherCAT."
    ],
    k: [
      ["<0.1 N", "force resolution achieved on 6-axis robot wrist load cells"],
      ["6-DoF", "simultaneous measurement of 3 orthogonal forces (Fx, Fy, Fz) and 3 moments (Mx, My, Mz)"],
      ["<1%", "cross-talk between orthogonal measurement axes after 6×6 matrix compensation"]
    ],
    c: 3,
    x: "F/T sensors are high-value chokepoints. Multi-axis calibration rigs, manual strain-gauge bonding, and thermal zero-drift compensation limit scalable mass production. ATI Industrial Automation holds dominant global market share.",
    co: [
      ["ATI Industrial Automation (Novanta)", "World undisputed leader in 6-axis robotic force/torque sensors (Apex, NC)", "ati-ia.com", "US"],
      ["Bota Systems", "Ultra-compact lightweight 6-axis force-torque sensors for collaborative and humanoid arms", "botasystems.com", "CH"],
      ["Robotiq", "FT 300-S force torque sensors and adaptive grippers for collaborative robots", "robotiq.com", "CA"],
      ["Kistler Group", "High-precision piezoelectric and strain-gauge multi-component force dynamometers", "kistler.com", "CH"],
      ["HBK (Hottinger Brüel & Kjær)", "Custom multi-axis load cells, strain gauges, and precision precision amplifiers", "hbkworld.com", "DE"],
      ["Kunshan Shuangzhi (Sunrise)", "Leading Asian manufacturer of 6-axis force torque sensors for industrial robots", "srf-sensor.com", "CN"]
    ]
  },
  {
    i: "currentsense", L: 9, n: "High-bandwidth phase current sensing",
    s: "Isolated shunt and Hall sensors measuring sub-milliampere commutation currents",
    w: "In Field-Oriented Control (FOC), the servo drive must know the exact instantaneous electrical current in each motor phase winding. High-speed isolated current sensors provide the feedback signal that calculates electromagnetic torque ($τ = \frac{3}{2} P \cdot \lambda_m \cdot I_q$), enabling fast collision detection and virtual compliance without dedicated joint torque sensors.",
    h: [
      "Low-inductance precision metal-alloy shunt resistors in lower inverter legs measure voltage drop.",
      "Isolated delta-sigma modulators convert millivolt shunt signals across high-voltage isolation barriers.",
      "Coreless Hall-effect current sensor ICs measure magnetic field lines generated around copper busbars.",
      "Digital sinc³ filters on real-time microcontrollers reconstruct phase currents with >12-bit ENOB at 50 kHz."
    ],
    k: [
      ["<1 µs", "current measurement propagation delay to trip overcurrent hardware safety shutoff"],
      ["<0.1%", "gain non-linearity over full operating temperature range (-40 to +125 °C)"],
      ["sensorless torque", "estimation accuracy within ±2–5% of true joint output torque"]
    ],
    c: 1,
    x: "Critical semiconductor component for FOC servo drives; Texas Instruments, Allegro MicroSystems, and LEM dominate precision current measurement ICs.",
    co: [
      ["Texas Instruments", "AMC1300 isolated delta-sigma modulators and INA precision current sense amplifiers", "ti.com", "US"],
      ["Allegro MicroSystems", "High-bandwidth coreless Hall-effect current sensor ICs for motor drives", "allegromicro.com", "US"],
      ["LEM International", "Closed-loop Hall-effect and fluxgate current transducers for industrial drives", "lem.com", "CH"],
      ["Analog Devices", "High-precision isolated current sense amplifiers and ADC converters", "analog.com", "US"],
      ["Melexis", "Triaxis Hall-effect and current sensors for automotive and robotic actuators", "melexis.com", "BE"],
      ["AKM (Asahi Kasei Microdevices)", "High-sensitivity InSb Hall current sensors for low-noise servo systems", "akm.com", "JP"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 10: EXTEROCEPTION
  // ------------------------------------------------------------
  {
    i: "cam", L: 10, n: "Global-shutter industrial RGB cameras",
    s: "High-frame-rate CMOS image sensors eliminating fast motion blur",
    w: "Robotic arms and humanoids move their heads and end-effectors rapidly through 3D space. Standard rolling-shutter smartphone cameras distort objects during high-speed motion (jello effect). Global-shutter CMOS image sensors expose all pixels simultaneously, capturing distortion-free RGB frames at 60–240 FPS for visual servoing and VLA policies.",
    h: [
      "Every pixel contains an integrated in-pixel storage node shielded from incident light.",
      "All photodiodes in the sensor array capture light simultaneously during a single exposure pulse.",
      "Charge is transferred in parallel into memory nodes and then read out row by row without spatial distortion.",
      "High-speed serial interfaces (MIPI CSI-2, USB3 Vision, GigE Vision) stream raw uncompressed frames directly into Edge SoCs."
    ],
    k: [
      ["100% global", "shutter exposure eliminating motion skew on 2 m/s moving robot end-effectors"],
      ["60–240 FPS", "frame capture rate feeding low-latency visuomotor policy loops"],
      ["<10 ms", "end-to-end photon-to-memory latency on MIPI CSI-2 camera pipelines"]
    ],
    c: 2,
    x: "Sony Semiconductor holds overwhelming global dominance in industrial global-shutter CMOS image sensor silicon (Pregius series).",
    co: [
      ["Sony Semiconductor Solutions", "World leader in Pregius global-shutter CMOS image sensors", "sony-semicon.com", "JP"],
      ["onsemi", "Industrial global-shutter image sensors (AR0234, Hyperlux) for robotics and ADAS", "onsemi.com", "US"],
      ["Basler AG", "Industrial machine vision cameras, embedded vision modules, and pylon software", "baslerweb.com", "DE"],
      ["Cognex Corporation", "Industrial vision systems, barcode readers, and automated inspection cameras", "cognex.com", "US"],
      ["Teledyne FLIR (Vision Solutions)", "High-performance machine vision cameras and GigE Vision systems", "flir.com", "US"],
      ["OmniVision Technologies", "Global-shutter CMOS sensors for automotive, robotics, and AR/VR tracking", "ovt.com", "US"]
    ]
  },
  {
    i: "depth", L: 10, n: "Active stereo & structured-light depth sensors",
    s: "Infrared pattern projection generating dense metric 3D point clouds",
    w: "To pick an item from a bin or avoid colliding with a table, a robot needs geometric 3D distance ($Z$) for every pixel. Active stereo cameras project a pseudo-random infrared dot pattern onto textureless surfaces, allowing dual IR cameras to solve optical stereo correspondence and output 3D depth maps at 30–90 Hz.",
    h: [
      "An infrared vertical-cavity surface-emitting laser (VCSEL) projector casts thousands of IR dot features.",
      "Dual global-shutter IR sensors capture stereo images with matching timestamps.",
      "Dedicated onboard ASIC hardware correlates disparity using Semi-Global Matching (SGM) algorithms.",
      "Output depth stream (XYZ point cloud) is factory calibrated against intrinsic camera distortion matrices."
    ],
    k: [
      ["0.2–4 m", "practical operational range for desktop and humanoid manipulation depth cameras"],
      ["<1 mm", "Z-depth accuracy at 1 meter distance under controlled illumination"],
      ["30–90 Hz", "dense 3D point-cloud generation rate for real-time obstacle avoidance"]
    ],
    c: 2,
    x: "Intel RealSense pioneered accessible active stereo, but industrial bin-picking relies on high-end structured light (Photoneo, Zivid, Orbbec, Mech-Mind).",
    co: [
      ["Intel RealSense", "Industry standard D435 / D455 / D405 active IR stereo depth cameras", "intelrealsense.com", "US"],
      ["Orbbec", "Femto and Gemini 3D depth cameras and customized depth engines for robotics", "orbbec.com", "CN"],
      ["Zivid", "Industrial 3D color cameras using structured light for high-precision bin-picking", "zivid.com", "NO"],
      ["Photoneo", "PhoXi 3D scanners and MotionCam-3D scanning objects in high-speed motion", "photoneo.com", "SK"],
      ["Mech-Mind Robotics", "Industrial 3D vision systems and AI bin-picking software suites", "mech-mind.com", "CN"],
      ["Luxonis (OAK)", "OAK-D spatial AI depth cameras with onboard neural network inferencing", "luxonis.com", "US"]
    ]
  },
  {
    i: "lidar", L: 10, n: "3D solid-state & mechanical LiDAR",
    s: "Multi-beam laser ranging for long-range navigation and 3D mapping",
    w: "Autonomous Mobile Robots (AMRs), warehouse forklifts, and outdoor quadrupeds navigate dynamic environments using Light Detection and Ranging (LiDAR). Infrared laser pulses (905 nm or 1550 nm) measure Time-of-Flight (ToF) reflections across 360° horizontally and 30–90° vertically, creating dense 3D point cloud maps uncorrupted by ambient lighting.",
    h: [
      "Array of 905 nm edge-emitting lasers or 1550 nm fiber lasers fire nanosecond light pulses.",
      "Mechanical rotary prisms or MEMS micro-mirrors steer laser beams across a 3D field of view.",
      "Single-Photon Avalanche Diodes (SPAD) or Silicon Photomultipliers (SiPM) detect returning photons.",
      "Time-to-Digital Converters (TDC) calculate exact distance ($d = \frac{c \cdot \Delta t}{2}$) with centimeter precision."
    ],
    k: [
      ["100–300 m", "maximum detection range for industrial autonomous navigation"],
      ["up to 1.5M pts/sec", "3D point cloud generation rate for dense spatial mapping"],
      ["cm-level", "ranging accuracy unaffected by darkness, shadow, or changing factory lighting"]
    ],
    c: 2,
    x: "Automotive ADAS scale in China has dramatically reduced LiDAR unit costs ($<500 for high-density units), giving Chinese suppliers (Hesai, RoboSense) dominant market share.",
    co: [
      ["Hesai Technology", "World leader in high-performance mechanical and solid-state 3D LiDAR sensors", "hesaitech.com", "CN"],
      ["RoboSense (Suteng Innovation)", "Automotive and robotic LiDAR sensors and AI perception software", "robosense.ai", "CN"],
      ["Ouster", "Digital flash LiDAR sensors built on silicon SPAD and VCSEL architectures", "ouster.com", "US"],
      ["SICK AG", "Industrial 2D and 3D safety LiDAR scanners for AGVs and factory automation", "sick.com", "DE"],
      ["Luminar Technologies", "Long-range 1550 nm LiDAR systems for autonomous vehicles and robotics", "luminartech.com", "US"],
      ["Hokuyo Automatic", "Compact scanning laser range finders for mobile robots and AGV obstacle avoidance", "hokuyo-aut.jp", "JP"]
    ]
  },
  {
    i: "radar", L: 10, n: "4D imaging radar & ultra-wideband",
    s: "Millimeter-wave environmental penetration through dust, smoke, and glare",
    w: "In harsh outdoor agricultural, construction, and mining automation, dust clouds, heavy rain, fog, and sun glare blind optical cameras and LiDAR. 77 GHz frequency-modulated continuous-wave (FMCW) 4D imaging radar penetrates obscurants, measuring target range, azimuth, elevation, and Doppler radial velocity in all weather conditions.",
    h: [
      "Transmitter arrays emit chirped frequency-modulated continuous waves at 76–81 GHz.",
      "Multiple-Input Multiple-Output (MIMO) virtual antenna arrays synthesize large aperture baselines.",
      "Reflected signals are mixed with transmitted signals, computing beat frequencies proportional to range.",
      "Doppler FFT processing extracts instantaneous velocity vectors for every detected point reflector."
    ],
    k: [
      ["77 GHz", "carrier frequency providing millimeter-wave spatial resolution"],
      ["all-weather", "100% operational throughput through heavy fog, rain, dust, and smoke"],
      ["Doppler velocity", "instantaneous true velocity measurement per return point"]
    ],
    c: 1,
    x: "Silicon radar transceiver chips are concentrated among automotive semiconductor giants (NXP, Texas Instruments, Infineon).",
    co: [
      ["Texas Instruments (Radar Div)", "AWR-series single-chip 77 GHz mmWave radar sensors for robotics", "ti.com", "US"],
      ["NXP Semiconductors", "Automotive and industrial 77 GHz radar transceivers and processors", "nxp.com", "NL"],
      ["Infineon Technologies", "XENSIV 24 GHz and 60 GHz / 77 GHz radar sensor integrated circuits", "infineon.com", "DE"],
      ["Arbe Robotics", "Ultra-high-resolution 4D imaging radar chipsets and processing algorithms", "arberobotics.com", "IL"],
      ["Echodyne", "Metamaterial electronically scanned array (MESA) radar for autonomous machines", "echodyne.com", "US"],
      ["Continental AG (Radar Div)", "Industrial and commercial vehicle environmental perception radar sensors", "continental.com", "DE"]
    ]
  },
  {
    i: "tactile", L: 10, n: "High-density tactile skin & optical sensing",
    s: "Vision-based elastomeric sensors and electronic skin measuring shear and pressure",
    w: "Cameras only see object surfaces before contact; once a gripper touches an item, the contact patch is occluded. Vision-based tactile sensors (GelSight, DIGIT) and multi-modal capacitive/piezoresistive electronic skins place a soft elastomer on the fingertips. An internal camera or sensor array tracks elastomer deformation, measuring sub-millimeter texture, slip, and 3D contact force vectors.",
    h: [
      "A soft synthetic elastomer pad is coated with a reflective, micro-textured skin membrane.",
      "Internal multi-color LEDs (red, green, blue) illuminate the elastomer from different angles.",
      "An embedded micro-camera captures photometric stereo images of the contacting surface profile.",
      "Neural network models reconstruct dense 3D height maps and shear strain vectors at 60–100 Hz."
    ],
    k: [
      ["<50 µm", "spatial resolution capable of feeling Braille dots and surface roughness"],
      ["3D vector", "measurement of normal pressure and multi-directional tangential shear slip"],
      ["100% occlusion", "immunity: operates when external cameras cannot see inside the hand grasp"]
    ],
    c: 2,
    x: "Elastomer durability, tear resistance under repeated friction rubbing, and camera integration inside miniature fingertips remain active engineering challenges.",
    co: [
      ["GelSight Inc.", "Pioneered vision-based elastomeric tactile sensing technology (MIT spinout)", "gelsight.com", "US"],
      ["Contactile", "Bio-inspired optical tactile sensors measuring 3D deflection, friction, and slip", "contactile.com", "AU"],
      ["Tacterion", "plyon flexible capacitive tactile sensors and smart surface sensor skin", "tacterion.com", "DE"],
      ["Xsensor Technology", "High-resolution capacitive tactile pressure mapping sensors and arrays", "xsensor.com", "CA"],
      ["SynTouch Inc.", "BioTac biomimetic tactile sensors measuring force, vibration, and thermal flux", "syntouchinc.com", "US"],
      ["PaXini Sensors", "Multidimensional optical tactile electronic skin for humanoid robot hands", "paxini.com", "CN"]
    ]
  },
  {
    i: "event", L: 10, n: "Neuromorphic event-based cameras",
    s: "Bio-inspired asynchronous pixel sensors with microsecond temporal resolution",
    w: "Standard cameras capture synchronous frames at fixed intervals (30 FPS = 33 ms latency), producing massive data redundancy when scenes are static and severe motion blur when objects move fast. Neuromorphic event cameras feature asynchronous pixels that fire events only when local log-intensity changes, delivering microsecond temporal resolution, >120 dB dynamic range, and minimal data bandwidth.",
    h: [
      "Each independent pixel contains an analog logarithmic photoreceptor, amplifier, and dual comparators.",
      "A pixel outputs an asynchronous event packet $(x, y, t, p)$ only when light intensity changes past a threshold ($p = \pm 1$).",
      "Microsecond timestamping captures rapid vibrations and high-speed projectile trajectories without motion blur.",
      "High dynamic range (>120 dB) operates seamlessly transitioning from dark tunnels into blinding sunlight."
    ],
    k: [
      ["<1 µs", "temporal latency per pixel event transition"],
      [">120 dB", "high dynamic range vs ~60–70 dB for conventional CMOS image sensors"],
      ["<10 mW", "pixel array power consumption under static background conditions"]
    ],
    c: 1,
    x: "Emerging sensing modality. Processing asynchronous sparse event streams requires novel Spiking Neural Networks (SNN) or graph convolutional event representations.",
    co: [
      ["Prophesee", "World pioneer in Metavision neuromorphic event-based vision sensors and software", "prophesee.ai", "FR"],
      ["Sony Semiconductor Solutions", "Collaborative development of stacked event-based vision sensors with Prophesee", "sony-semicon.com", "JP"],
      ["iniVation (SynSense Group)", "Dynamic Vision Sensors (DVS) and neuromorphic vision development platforms", "inivation.com", "CH"],
      ["Samsung Electronics", "Development of neuromorphic Dynamic Vision Sensor ICs for mobile and robotics", "samsung.com", "KR"],
      ["CelePixel (OmniVision)", "Event-based vision sensors integrating hybrid frame-event readout modes", "ovt.com", "CN"],
      ["Insightness", "Silicon retina event sensor modules for high-speed tracking and robotics", "insightness.com", "CH"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 11: COMPUTE
  // ------------------------------------------------------------
  {
    i: "edgesoc", L: 11, n: "Edge AI inference SoCs",
    s: "High-efficiency neural processing units executing vision transformers within 30–100W",
    w: "A mobile robot or humanoid cannot stream raw multi-camera video streams to the cloud for real-time control due to latency, bandwidth costs, and connectivity dropouts. Edge AI SoCs combine multi-core ARM CPUs, tensor-accelerated NPUs/GPUs, and hardware video decoders, executing billion-parameter VLA policies and spatial perception locally within a tight 30–100 Watt thermal budget.",
    h: [
      "Dedicated matrix multiplication tensor cores execute FP8, FP16, and INT8 transformer attention heads.",
      "Unified high-bandwidth memory (LPDDR5X, 64–128 GB at 200–500 GB/s) holds multi-modal model weights.",
      "Hardware video decoders process 4–8 simultaneous 4K global-shutter camera feeds with zero CPU load.",
      "Integrated ISP (Image Signal Processor) executes real-time lens distortion rectification and tone mapping."
    ],
    k: [
      ["30–100 W", "typical on-robot power envelope for edge neural computing"],
      ["200–1,000 TOPS", "INT8 tensor compute density delivered by modern edge robotics SoCs"],
      ["<20 ms", "end-to-end local neural policy inference latency"]
    ],
    c: 3,
    x: "NVIDIA dominates edge robotics compute with Jetson AGX Orin and Jetson Thor. Alternatives from Qualcomm, Hailo, Horizon Robotics, and Rockchip compete on power efficiency in logistics AMRs.",
    co: [
      ["NVIDIA", "Dominant market leader in robotics edge AI compute (Jetson Orin, Jetson Thor, Isaac ROS)", "nvidia.com", "US"],
      ["Qualcomm", "Snapdragon Robotics RB5 / RB6 platforms with integrated NPU and 5G connectivity", "qualcomm.com", "US"],
      ["Hailo", "Hailo-8 and Hailo-15 high-efficiency AI processors and vision accelerators", "hailo.ai", "IL"],
      ["Horizon Robotics", "Journey-series edge AI inference SoCs optimized for autonomous machines", "horizon.auto", "CN"],
      ["Ambarella", "Low-power CVflow AI vision SoCs for mobile robot perception and autonomy", "ambarella.com", "US"],
      ["Rockchip", "RK3588 and embedded AI processors widely adopted in Asian service robots", "rock-chips.com", "CN"]
    ]
  },
  {
    i: "mcu", L: 11, n: "Real-time MCUs & motor control FPGAs",
    s: "Deterministic microcontrollers executing sub-millisecond control loops",
    w: "While Edge AI SoCs run high-level vision and planning under non-real-time Linux, low-level motor commutation and safety loops cannot tolerate a single microsecond of operating system jitter. Multi-core ARM Cortex-R and Cortex-M microcontrollers and FPGAs execute 25 kHz FOC current loops, fieldbus communications, and emergency safety stops deterministically in silicon.",
    h: [
      "ARM Cortex-R5/R8 real-time cores feature tightly-coupled memory (TCM) for deterministic single-cycle instruction execution.",
      "Hardware motor control timers generate complementary PWM outputs with programmable dead-time insertion.",
      "Dual or triple lock-step CPU cores compare execution cycle-by-cycle to detect transient memory bit flips (SIL 3 / ISO 26262 ASIL-D).",
      "Integrated EtherCAT Slave Controller (ESC) hardware handles packet processing in silicon without CPU software overhead."
    ],
    k: [
      ["<1 µs", "deterministic interrupt response latency on Cortex-R real-time cores"],
      ["lock-step", "dual-core architecture guaranteeing ISO 13849 / SIL 3 functional safety compliance"],
      ["25–50 kHz", "closed-loop motor commutation executed without software OS jitter"]
    ],
    c: 2,
    x: "Texas Instruments (C2000), STMicroelectronics (STM32), NXP, and Infineon dominate real-time motor control and functional safety microcontrollers.",
    co: [
      ["Texas Instruments", "C2000 real-time microcontrollers and Sitara processors with integrated EtherCAT ESC", "ti.com", "US"],
      ["STMicroelectronics", "STM32F4/F7/H7 high-performance microcontrollers standard in embedded mechatronics", "st.com", "CH"],
      ["NXP Semiconductors", "S32K real-time processors and i.MX RT crossover MCUs for industrial robotics", "nxp.com", "NL"],
      ["Infineon Technologies", "AURIX multi-core lock-step microcontrollers for safety-critical motion control", "infineon.com", "DE"],
      ["Renesas Electronics", "RA and RZ/T2M real-time motor control processors with hardware EtherCAT", "renesas.com", "JP"],
      ["AMD (Xilinx)", "Zynq UltraScale+ MPSoC combining FPGA fabric with real-time ARM Cortex-R5 cores", "amd.com", "US"]
    ]
  },
  {
    i: "robomodule", L: 11, n: "Industrial carrier boards & SOMs",
    s: "Ruggedized System-on-Modules with vibration, thermal, and shock protection",
    w: "Consumer compute boards cannot survive the mechanical shocks, continuous vibration, and extreme temperature swings inside an industrial robot arm or AMR. Ruggedized System-on-Modules (SOM) and custom multi-layer carrier boards package compute SoCs with M12 industrial connectors, isolated power protection, and conformal coating.",
    h: [
      "System-on-Modules (SOM) route high-speed PCIe, MIPI, and memory buses onto high-density mezzanine connectors.",
      "Carrier boards integrate reverse-polarity, over-voltage, and transient load-dump protection circuitry.",
      "Conformal polyimide or silicone coatings protect components against condensation and industrial conductive dust.",
      "Passive thermal heat-spreaders clamp directly to the robot's cast chassis for structural heat rejection."
    ],
    k: [
      ["-40 to +85 °C", "industrial operating temperature range without thermal shutdown"],
      ["50 g shock", "resistance tested according to IEC 60068 industrial standards"],
      ["IP65/IP67", "sealed enclosure compatibility for washdown and outdoor robotics"]
    ],
    c: 1,
    x: "Broad ecosystem of industrial computing specialists converting raw silicon SoCs into field-deployable robotic compute bricks.",
    co: [
      ["Advantech", "Global leader in industrial computing, embedded carrier boards, and edge IPCs", "advantech.com", "TW"],
      ["Connect Tech Inc. (CTI)", "Specialized rugged carrier boards and enclosures for NVIDIA Jetson systems", "connecttech.com", "CA"],
      ["Aetina Corporation", "Industrial edge AI computing modules and specialized carrier boards for robotics", "aetina.com", "TW"],
      ["Toradex", "Industrial System on Modules (SoMs) with long-term 10-year product availability", "toradex.com", "CH"],
      ["Congatec", "Embedded computer modules (COM-HPC, COM Express) for industrial automation", "congatec.com", "DE"],
      ["Kontron", "Ruggedized embedded computing platforms and IoT edge computers", "kontron.com", "DE"]
    ]
  },
  {
    i: "traincompute", L: 11, n: "Policy training infrastructure",
    s: "Hyperscale GPU clusters for robot foundation models (Declared Boundary Station)",
    w: "Training generalist robot foundation models (VLA models, world models, diffusion policies) requires pre-training across millions of video tokens and billions of parameter updates. This compute runs in external hyperscale data centers (H100/B200 GPU clusters), representing the declared external dependency boundary of this site.",
    h: [
      "Hyperscale GPU clusters (1,000–10,000+ accelerators) execute distributed FP8/BF16 matrix multiplication.",
      "High-bandwidth optical network fabrics (InfiniBand / RoCE) synchronize gradient updates across thousands of nodes.",
      "Pre-training ingests web-scale internet video datasets paired with millions of physical robot teleoperation trajectory tokens.",
      "Trained model checkpoint weights are quantized (INT8/FP8) and exported for edge on-robot execution."
    ],
    k: [
      ["10⁴–10⁶ GPU-hrs", "compute required to train modern multimodal generalist robot foundation models"],
      ["FP8 / BF16", "mixed-precision numeric formats optimizing training throughput per Megawatt"],
      ["0 upstream edges", "declared on this site — upstream semiconductor fab supply is deliberately not modelled here"]
    ],
    c: 3,
    x: "This is the single declared external boundary station on this site (Decision D3). Upstream semiconductor lithography, advanced packaging, and data center facilities are modelled on sibling site Sand to Sentence.",
    co: [
      ["NVIDIA", "DGX SuperPOD clusters, HGX B200 platforms, and AI foundation model infrastructure", "nvidia.com", "US"],
      ["Microsoft Azure", "Hyperscale cloud AI infrastructure powering OpenAI and robotics model training", "azure.microsoft.com", "US"],
      ["Google Cloud (GCP)", "Cloud TPU v5p clusters and infrastructure for Gemini Robotics and RT-2", "cloud.google.com", "US"],
      ["Amazon Web Services (AWS)", "EC2 UltraClusters and Trainium infrastructure for large-scale physical AI", "aws.amazon.com", "US"],
      ["Oracle Cloud Infrastructure (OCI)", "High-performance bare-metal GPU clusters for autonomous model training", "oracle.com", "US"],
      ["CoreWeave", "Specialized high-density GPU cloud infrastructure for physical AI model developers", "coreweave.com", "US"]
    ]
  },
  {
    i: "determinism", L: 11, n: "Deterministic networking & PCIe bridges",
    s: "Time-Sensitive Networking and PCIe bridges eliminating packet latency jitter",
    w: "When an edge AI SoC issues a joint trajectory command to multiple real-time motor controllers, communication packets must arrive synchronously within sub-microsecond time windows. Time-Sensitive Networking (TSN / IEEE 802.1Qbv) and PCIe bridges schedule packet traffic with microsecond determinism, preventing control loop instability.",
    h: [
      "IEEE 802.1AS precision time protocol (gPTP) synchronizes all network clocks across the robot to <1 µs.",
      "IEEE 802.1Qbv Time-Aware Shapers open and close transmission gates on scheduled microsecond intervals.",
      "Critical cyclic motor control packets receive guaranteed zero-jitter transmission windows.",
      "Non-critical background sensor data (diagnostics, logging) is queued during real-time control slots."
    ],
    k: [
      ["<1 µs", "clock synchronization accuracy across distributed on-robot compute nodes"],
      ["zero packet loss", "guaranteed for critical control frames via scheduled time gating"],
      ["1–10 Gbps", "deterministic Ethernet bandwidth supporting multi-camera vision and joint loops"]
    ],
    c: 2,
    x: "Ethernet TSN switch silicon and real-time network controller chips are concentrated among Broadcom, NXP, Marvell, and Microchip.",
    co: [
      ["NXP Semiconductors", "SJA1110 and automotive/industrial TSN Ethernet switch integrated circuits", "nxp.com", "NL"],
      ["Broadcom Inc.", "High-speed industrial Ethernet transceivers and deterministic switching silicon", "broadcom.com", "US"],
      ["Marvell Technology", "Brightlane automotive and industrial Ethernet PHYs and switch controllers", "marvell.com", "US"],
      ["Microchip Technology", "LAN966x TSN switching silicon and EtherCAT slave controller chips", "microchip.com", "US"],
      ["Analog Devices", "Chronous industrial Ethernet physical layer devices and TSN switches", "analog.com", "US"],
      ["TTTech Industrial", "Edge computing platforms, deterministic TSN software stacks, and switch IP", "tttech-industrial.com", "AT"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 12: POWER
  // ------------------------------------------------------------
  {
    i: "cells", L: 12, n: "High-discharge lithium cells",
    s: "High-C rate cylindrical and pouch battery cells for burst acceleration",
    w: "Unlike electric vehicles that experience smooth highway cruising discharge, dynamic legged robots and high-speed arms demand massive burst currents (up to 10C–20C discharge rates) during jumps, sudden direction reversals, and heavy lifting. High-discharge cylindrical (21700, 46800) and tabless pouch cells minimize internal resistance (IR) to prevent thermal runaway.",
    h: [
      "Tabless or multi-tab current collector designs minimize internal ohmic resistance and heat generation.",
      "High-nickel NMC or high-rate LFP chemistries provide high continuous and peak discharge rates.",
      "Reinforced steel or aluminium cans withstand internal gas pressure build-up under heavy cycling.",
      "Low internal impedance (<10 mΩ per cell) limits voltage sag during sudden multi-joint peak acceleration."
    ],
    k: [
      ["10C–20C", "peak pulse discharge rate capability for dynamic humanoid jumps and heavy lifts"],
      ["<10 mΩ", "internal AC impedance per cell minimizing resistive heating under peak load"],
      ["250–300 Wh/kg", "gravimetric energy density in high-nickel cylindrical robotic cells"]
    ],
    c: 2,
    x: "High-discharge rate cells (Molicel, Samsung SDI, Panasonic, LG Energy) are specialized compared to standard EV energy cells.",
    co: [
      ["Molicel (E-One Moli Energy)", "World leader in ultra-high-discharge 21700/P45B cylindrical lithium cells", "molicel.com", "TW"],
      ["Samsung SDI", "High-power 21700 and prismatic lithium-ion cells for power tools and robotics", "samsungsdi.com", "KR"],
      ["LG Energy Solution", "High-energy cylindrical and pouch battery cells for mobile industrial automation", "lgensol.com", "KR"],
      ["Panasonic Energy", "High-density cylindrical lithium-ion cells engineered for high reliability", "panasonic.com", "JP"],
      ["CATL", "World's largest battery manufacturer producing customized LFP/NMC packs for AMRs", "catl.com", "CN"],
      ["EVE Energy", "High-rate cylindrical and prismatic lithium batteries for industrial AGVs and robots", "evebattery.com", "CN"]
    ]
  },
  {
    i: "pack", L: 12, n: "Integrated robot battery packs & BMS",
    s: "Custom battery management systems with cell balancing and thermal isolation",
    w: "Raw cells must be packaged into ruggedized packs with integrated Battery Management Systems (BMS) that monitor cell voltages, state-of-charge (SoC), state-of-health (SoH), and temperatures. The BMS prevents over-discharge, controls pre-charge contactors, and communicates with the robot's main controller over CANopen or EtherCAT.",
    h: [
      "Precision analog front-ends (AFE) measure individual cell voltages with millivolt accuracy.",
      "Active or passive cell balancing equalizes state of charge across series-connected cell groups.",
      "Solid-state MOSFET or pyrotechnic disconnect switches isolate the pack within microseconds during short circuits.",
      "Aerogel insulation barriers and phase-change materials between cells prevent thermal runaway propagation."
    ],
    k: [
      ["48–60V DC", "standard bus voltage on mobile robots and humanoids balancing power and electrical safety"],
      ["<5 mV", "cell voltage measurement precision across all series cell groups"],
      ["<10 µs", "short-circuit electronic trip isolation time protecting downstream joint drives"]
    ],
    c: 2,
    x: "Battery safety certifications (UN 38.3, UL 2271, IEC 62133) require rigorous vibration, crush, nail penetration, and thermal shock testing.",
    co: [
      ["RRC power solutions", "Standard and custom smart battery packs and charging technology for robotics", "rrc-ps.com", "DE"],
      ["Inventus Power", "Custom lithium-ion battery pack engineering and advanced BMS manufacturing", "inventuspower.com", "US"],
      ["Greenway Battery", "Custom battery packs for autonomous mobile robots and industrial equipment", "greenway-battery.com", "CN"],
      ["Akku Vision (E-Bike & Robotics)", "Engineered battery systems with integrated digital BMS for mobile machinery", "akku-vision.de", "DE"],
      ["Flux Power", "High-capacity lithium-ion battery packs for warehouse material handling AGVs", "fluxpower.com", "US"],
      ["Electrovaya", "High-cycle-life ceramic-separated lithium battery packs for heavy-duty AMRs", "electrovaya.com", "CA"]
    ]
  },
  {
    i: "powerstage", L: 12, n: "High-efficiency DC-DC power converters",
    s: "Isolated 48V-to-12V/5V/3.3V high-density power distribution regulators",
    w: "A robot's internal electrical bus must convert a fluctuating 48V battery pack voltage into clean, regulated voltages: 12V for compute modules and LIDARs, 5V for cameras and depth sensors, and 3.3V/1.8V for sensitive digital logic, while filtering motor back-EMF spikes during regenerative braking.",
    h: [
      "High-frequency synchronous buck and isolated DC-DC converter bricks operate at 500 kHz to 2 MHz.",
      "Planar transformers and integrated magnetic cores maximize power density (up to 1,000 W/in³).",
      "Transient voltage suppressors (TVS) and active clamping circuits absorb regenerative motor braking surges.",
      "Ultra-low-noise low-dropout (LDO) linear regulators supply jitter-free power to analog sensor front-ends."
    ],
    k: [
      [">95%", "power conversion efficiency minimizing internal parasitic heat generation"],
      [">1,000 W/in³", "volumetric power density achieved in advanced planar DC-DC power modules"],
      ["<20 mV", "peak-to-peak output voltage ripple under 0–100% dynamic load steps"]
    ],
    c: 1,
    x: "High-density modular power components (Vicor, TDK-Lambda, Murata) allow compact chassis integration without bulky discrete power supplies.",
    co: [
      ["Vicor Corporation", "World leader in ultra-high-density modular power components and DC-DC converters", "vicorpower.com", "US"],
      ["TDK-Lambda", "Industrial power supplies, DC-DC converters, and EMC/EMI line filters", "tdk-lambda.com", "JP"],
      ["Murata Manufacturing", "High-reliability isolated DC-DC converters and miniature power modules", "murata.com", "JP"],
      ["Infineon Technologies (Power Div)", "Power MOSFETs, GaN power stages, and high-efficiency voltage regulators", "infineon.com", "DE"],
      ["onsemi (Power Solutions)", "Automotive and industrial power management ICs and DC-DC converters", "onsemi.com", "US"],
      ["Delta Electronics (Power)", "Custom power distribution units and DC-DC converters for industrial robotics", "deltaww.com", "TW"]
    ]
  },
  {
    i: "tether", L: 12, n: "Continuous slip rings & tethers",
    s: "360° continuous rotary electrical joints and heavy-duty mains tethers",
    w: "Industrial SCARA and articulated robot wrists rotate infinitely through 360° without tangling internal wiring. Gold-on-gold contact slip rings transfer multi-channel high-current motor power, Gigabit Ethernet, and high-pressure pneumatic air through a continuous rotating joint axis without signal degradation.",
    h: [
      "Multi-track gold-plated copper rings rotate around a central stationary spindle.",
      "Multi-contact precious metal wire brushes maintain continuous electrical contact with minimal electrical noise.",
      "Integrated RF rotary joints or optical rotary joints (FORJ) pass high-bandwidth gigabit video signals.",
      "Integrated pneumatic/hydraulic rotary unions pass compressed air for vacuum suction cups and air grippers."
    ],
    k: [
      ["360° infinite", "continuous rotation on robot wrists and rotating pedestals"],
      ["<10 mΩ", "contact resistance variation across millions of continuous revolutions"],
      ["10+ channels", "simultaneous power (20A+), gigabit data, and pneumatic air channels in one compact unit"]
    ],
    c: 2,
    x: "Moog, Schleifring, and Senring dominate precision multi-channel capsule and through-bore slip rings with gold-on-gold contacts.",
    co: [
      ["Moog Inc. (Slip Ring Div)", "World leader in high-reliability military and industrial slip ring assemblies", "moog.com", "US"],
      ["Schleifring GmbH", "Precision electrical, optical, and hybrid rotary slip ring systems", "schleifring.de", "DE"],
      ["Stemmann-Technik (Wabtec)", "Industrial slip ring assemblies, cable reels, and power transmission systems", "stemmann.com", "DE"],
      ["Senring Electronics", "High-volume through-bore and capsule slip rings for robotics and pan-tilt units", "senring.com", "CN"],
      ["JINPAT Electronics", "Custom slip rings and hybrid optical-pneumatic rotary joints for robotic arms", "slipring.cn", "CN"],
      ["Deublin Company (Hoerbiger)", "Precision rotary unions for hydraulic, pneumatic, and coolant transmission", "deublin.com", "US"]
    ]
  },
  {
    i: "dock", L: 12, n: "Automated docking & charging systems",
    s: "High-power contact plates, inductive wireless charging, and battery hot-swap",
    w: "For continuous 24/7 autonomous operation in warehouse and factory logistics, robots cannot rely on humans plugging in cables. Automated floor and wall charging docks use high-current spring-loaded contact plates, high-efficiency resonant wireless charging, or automated robotic battery swap stations to recharge AMRs between transport missions.",
    h: [
      "Autonomous Mobile Robots approach charging docks using infrared beacons, AprilTags, or LiDAR alignment.",
      "Spring-loaded copper-beryllium contact pins engage copper floor pads with zero insertion force.",
      "Magnetic resonant inductive coils transfer 1–3 kW wireless power across 50 mm air gaps without exposed metal contacts.",
      "Automated battery swap stations use a secondary robotic arm to swap discharged packs for freshly charged ones in <90 seconds."
    ],
    k: [
      [">93%", "wireless power transfer efficiency achieved with resonant magnetic induction"],
      ["100A+ current", "delivered through automated physical contact plates for 15-minute fast charging"],
      ["<90 seconds", "full battery pack swap time in automated AMR battery hot-swap stations"]
    ],
    c: 1,
    x: "Standardization across multi-vendor fleets is emerging (VDA 5050 and MassRobotics standards); safety interlocks must ensure contact plates are de-energized until mated.",
    co: [
      ["Wiferion (PULS)", "World pioneer in high-power inductive wireless charging systems for AMRs and AGVs", "wiferion.com", "DE"],
      ["Conductix-Wampfler", "Industrial charging contacts, inductive power transfer (IPT), and conductor rails", "conductix.com", "DE"],
      ["Stäubli Electrical Connectors", "CombiTac automated docking connectors and high-power charging interfaces", "staubli.com", "CH"],
      ["Vahle Group", "Contactless inductive power transmission and automated charging contacts for AGVs", "vahle.com", "DE"],
      ["WiTricity", "Magnetic resonance wireless charging technology and intellectual property", "witricity.com", "US"],
      ["Daihen Corporation", "Wireless power transfer systems for automated guided vehicles and factory robots", "daihen.co.jp", "JP"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 13: CHASSIS & END-EFFECTOR
  // ------------------------------------------------------------
  {
    i: "links", L: 13, n: "Structural bionic links & chassis",
    s: "Topology-optimized skeletal links maximizing stiffness-to-weight ratio",
    w: "A robot's arm links and humanoid torso form the mechanical skeleton that bridges adjacent joint actuators. Finite Element Analysis (FEA) and bionic topology optimization hollow out solid metal, creating hollow rib-reinforced aluminium castings or carbon-fibre monocoques that resist dynamic bending under maximum payload acceleration.",
    h: [
      "Finite Element Analysis (FEA) optimizes stress distribution under combined worst-case dynamic payloads.",
      "Bionic internal ribbing patterns mimic trabecular bone structure to suppress structural resonance modes.",
      "Internal wire routing channels and sealed service access covers protect internal cabling.",
      "Precision-machined bearing and motor mounting bores hold tight geometric concentricity (<0.01 mm)."
    ],
    k: [
      [">100 Hz", "first structural resonance frequency of the robot arm to prevent control loop oscillation"],
      ["<0.1 mm", "maximum end-effector elastic deflection under full 20 kg rated payload at maximum reach"],
      ["40–60%", "mass reduction achieved through topology optimization and hollow casting"]
    ],
    c: 2,
    x: "Precision multi-axis CNC machining of large hollow castings with thin wall sections (<3 mm) requires specialized fixtures to prevent vibration chatter.",
    co: [
      ["Fanuc Corporation (Castings)", "Internal foundry and automated machining of yellow structural robot arm castings", "fanuc.co.jp", "JP"],
      ["Yaskawa Electric (Mechanics)", "Motoman robot arm chassis, base castings, and mechanical arm structures", "yaskawa.co.jp", "JP"],
      ["ABB Robotics (Manufacturing)", "Västerås and Shanghai robotic mechanical link fabrication and assembly plants", "abb.com", "SE"],
      ["KUKA AG (Augsburg Works)", "Industrial articulated robot link casting, machining, and painting automation", "kuka.com", "DE"],
      ["Efort Intelligent Robot", "Major Chinese industrial robot chassis and mechanical link manufacturer", "efort.com.cn", "CN"],
      ["Boston Dynamics (Chassis)", "Lightweight bionic aluminium and composite skeletons for quadruped and humanoid robots", "bostondynamics.com", "US"]
    ]
  },
  {
    i: "gripper", L: 13, n: "Parallel & vacuum end-effectors",
    s: "Electric 2-finger grippers, magnetic chucks, and vacuum suction arrays",
    w: "The robot arm only positions the wrist in 3D space; the end-effector does the actual physical work. Parallel electric grippers with adjustable grip force, magnetic chucks, and multi-stage Venturi vacuum suction arrays pick, hold, and place parts weighing from 1 gram to 500 kilograms across manufacturing and logistics.",
    h: [
      "Brushless servo motors drive miniature ballscrews or rack-and-pinion slides to position gripper jaws with micron precision.",
      "Embedded current sensing and load cells measure and regulate grip force to avoid crushing fragile items.",
      "Multi-stage Venturi ejector cartridges convert compressed air into deep vacuum (>85% vacuum) within milliseconds.",
      "Silicone and polyurethane suction cups feature multi-bellows geometry to conform to uneven cardboard and plastic packaging."
    ],
    k: [
      ["10–500 N", "programmable grip force regulation on precision electric parallel grippers"],
      ["<20 ms", "vacuum generation and release time for high-speed automated picking lines"],
      ["99.9%+", "grasp reliability on structured warehouse palletizing and machine tending operations"]
    ],
    c: 2,
    x: "End-of-arm tooling is bespoke per application; Schunk, Zimmer, Piab, and Schmalz dominate standardized modular industrial grippers.",
    co: [
      ["Schunk GmbH", "World benchmark in pneumatic and electric gripping systems and toolholders (Lauffen, Germany)", "schunk.com", "DE"],
      ["Zimmer Group", "The Know-How Factory: industrial grippers, linear technology, and tool changers", "zimmer-group.com", "DE"],
      ["Piab Group", "Vacuum automation, decentralized suction ejectors, and soft robotic piSOFTGRIP systems", "piab.com", "SE"],
      ["J. Schmalz GmbH", "Vacuum gripping systems, area grippers, and vacuum automation components", "schmalz.com", "DE"],
      ["Robotiq", "2-Finger and 3-Finger adaptive grippers and vacuum generators for collaborative robots", "robotiq.com", "CA"],
      ["OnRobot", "All-in-one electric, vacuum, and magnetic grippers for collaborative robot applications", "onrobot.com", "DK"]
    ]
  },
  {
    i: "hand", L: 13, n: "Anthropomorphic dexterous hands",
    s: "Multi-finger articulated robot hands with 12–20 active degrees of freedom",
    w: "Simple 2-finger parallel grippers cannot rotate a screwdriver in-hand, pick a key from a crowded pocket, or type on a keyboard. Anthropomorphic dexterous hands feature 4 to 5 multi-jointed fingers powered by 12–24 micro-motors, enabling in-hand dexterity, tool use, and bi-manual manipulation in human-centric workspaces.",
    h: [
      "Miniature brushless motors and micro-planetary gearheads pack directly inside finger phalanges or palm cavities.",
      "Stainless steel tendons or miniature four-bar linkage mechanisms transmit torque to distal interphalangeal joints.",
      "Tactile sensor arrays on fingertips measure local contact normals, shear slip, and force distribution in real time.",
      "High-speed embedded MCUs execute closed-loop grasp stability algorithms directly inside the hand palm."
    ],
    k: [
      ["12–24 DoF", "active degrees of freedom per 5-finger anthropomorphic robot hand"],
      ["5–30 N", "pinch and power grasp force delivered by individual fingertips"],
      ["<1 kg", "total hand mass matching the weight and dimensions of an adult human hand"]
    ],
    c: 3,
    x: "Extreme packaging density, high micro-motor failure rates, and high manufacturing costs ($5,000–$50,000 per hand) make dexterous hands one of the hardest mechatronic sub-systems in robotics.",
    co: [
      ["Shadow Robot Company", "Pioneered the Shadow Dexterous Hand with tactile sensing (London, UK)", "shadowrobot.com", "GB"],
      ["Wonik Robotics", "Allegro Hand 4-finger anthropomorphic research platform standard in RL manipulation", "wonikrobotics.com", "KR"],
      ["Inspire Robots", "Dexterous multi-jointed robotic hands and micro linear servo actuators (Beijing)", "inspirerobots.com", "CN"],
      ["Tesollo (Delto Hand)", "Multi-jointed dexterous robot hands and innovative gripper mechanisms", "tesollo.com", "KR"],
      ["Soft Robotics Inc.", "mGrip soft elastomeric fingers for unstructured food and fragile consumer picking", "softroboticsinc.com", "US"],
      ["Sanctuary AI (Hand Div)", "Proprietary hydraulic and electric high-DoF anthropomorphic humanoid hands", "sanctuary.ai", "CA"]
    ]
  },
  {
    i: "toolchange", L: 13, n: "Robotic tool changers & utility couplers",
    s: "Automatic pneumatic and electrical couplers for multi-process workcells",
    w: "To allow a single industrial robot to alternate between spot-welding, sealant dispensing, and vision inspection on an automotive assembly line, automatic tool changers connect and disconnect end-effectors in seconds. Hardened steel ball-locking mechanisms lock tool adapters rigidly under pneumatic pressure while coupling multi-pin electrical, air, and fluid connections.",
    h: [
      "Pneumatically driven locking pistons drive hardened steel balls into tapered locking grooves.",
      "Patented fail-safe mechanical locking cams maintain mechanical lock even if air pressure is completely lost.",
      "Spring-loaded gold-plated electrical contact pins mate high-current power and multi-gigabit data channels.",
      "Self-sealing flat-face fluid couplers pass water cooling and hydraulic oil without dripping."
    ],
    k: [
      ["<0.5 seconds", "automated tool changeover cycle time in automotive robotic cells"],
      ["±2 µm", "positional repeatability maintained across over 1,000,000 continuous tool change cycles"],
      ["100% fail-safe", "mechanical lock holds full payload even during total air pressure dump"]
    ],
    c: 1,
    x: "ATI Industrial Automation, Stäubli, and Zimmer hold dominant market share in high-reliability automated tool changers with zero tool drop failures.",
    co: [
      ["ATI Industrial Automation (Novanta)", "World undisputed leader in robotic automatic tool changers (QC series)", "ati-ia.com", "US"],
      ["Stäubli Robotics (Tool Changers)", "Automatic robotic tool changers with integrated multi-contact electrical connectors", "staubli.com", "CH"],
      ["Zimmer Group (Tool Changers)", "Pneumatic, manual, and automatic robotic tool changing systems", "zimmer-group.com", "DE"],
      ["Applied Robotics", "Robotic tool changers, collision sensors, and end-effector docking solutions", "appliedrobotics.com", "US"],
      ["Robot System Products (RSP)", "Tool changers, swivels, and dress packs for industrial articulated robots", "rsp.eu.com", "SE"],
      ["Schunk GmbH (Tool Changers)", "SWS automatic robotic tool changers and manual quick-change systems", "schunk.com", "DE"]
    ]
  },
  {
    i: "cabling", L: 13, n: "Dress packs & cable carriers",
    s: "High-flex articulated drag chains and internal joint cable routing",
    w: "An industrial robot moves through millions of complex 3D twisting cycles per year. Unprotected cables snag on workpieces and suffer internal copper conductor fatigue. Specialized articulated cable dress packs, spring-retraction mechanisms, and high-flex PUR/TPE continuous-flex cables ensure reliable power and signal routing without cable pinching.",
    h: [
      "Multi-conductor cables utilize micro-fine copper stranding (Class 6) with short pitch lengths for maximum flex fatigue life.",
      "Low-friction, flame-retardant TPE/PUR outer jackets resist industrial oils, coolants, and weld spatter.",
      "Corrugated articulated conduits with universal ball joints guide cables along the 6th axis.",
      "Internal spring-loaded retraction boxes maintain continuous cable tension, preventing loose cable loops."
    ],
    k: [
      ["10+ million", "torsional and bending cycles endured without internal conductor fracture"],
      ["±360°/m", "torsional twist angle tolerated on specialized robotics continuous-flex cables"],
      ["zero snagging", "ensured by active spring retraction mechanisms on robot wrists"]
    ],
    c: 1,
    x: "Cable fatigue failure is the #1 cause of unplanned downtime in automotive robotic spot-welding lines; Igus and Leoni dominate specialized dress packs.",
    co: [
      ["Igus", "triflex R multi-axis 3D cable carriers, chainflex robotic cables, and retraction systems", "igus.com", "DE"],
      ["Leoni AG", "Specialized industrial robot dress packs, high-flex cables, and maintenance services", "leoni.com", "DE"],
      ["Lapp Group", "ÖLFLEX ROBOT high-flex power and control cables for multi-axis robots", "lappgroup.com", "DE"],
      ["BizLink Holding", "Robotic cable assemblies, dress packs, and automation interconnect solutions", "bizlinktech.com", "TW"],
      ["Helukabel", "MULTISPEED and ROBOTIC continuous flex cables for automated machinery", "helukabel.com", "DE"],
      ["Robot System Products (RSP)", "Integrated dress packs and hose packages for ABB, Fanuc, and KUKA robots", "rsp.eu.com", "SE"]
    ]
  },
  {
    i: "ingress", L: 13, n: "Ingress protection, seals & washdown",
    s: "IP67/IP69K dynamic sealing, ISO cleanroom ratings, and explosion-proofing",
    w: "Robots deployed in food processing must withstand 100 bar high-pressure caustic chemical washdowns (IP69K), while semiconductor handling robots must shed fewer than zero particles (ISO Class 1 Cleanroom), and spray-painting robots must operate safely in explosive solvent vapors (ATEX Zone 1 / Class I Div 1).",
    h: [
      "Dynamic fluoropolymer (FKM/PTFE) rotary lip seals with stainless steel garter springs seal joint shafts.",
      "Positive internal air pressure purging (0.2–0.5 bar) prevents external dust or fluid ingress through seals.",
      "Corrosion-resistant electropolished stainless steel surfaces or FDA-compliant white epoxy coatings shed liquids.",
      "Conductive grounding straps and intrinsically safe barriers prevent electrostatic discharge sparks in paint booths."
    ],
    k: [
      ["IP69K", "high-pressure steam and caustic chemical washdown rating (100 bar at 80 °C)"],
      ["ISO Class 1", "cleanroom certification for semiconductor wafer transfer environments (<10 particles/m³)"],
      ["ATEX Zone 1", "explosion-proof certification for automated automotive spray-painting booths"]
    ],
    c: 2,
    x: "Achieving IP69K sealing while keeping joint friction low enough for collaborative force sensing is a difficult mechanical balancing act.",
    co: [
      ["Stäubli Robotics (Clean & Washdown)", "World benchmark for cleanroom, washdown (HE), and surgical robotic arms", "staubli.com", "CH"],
      ["Fanuc (Paint & Cleanroom)", "ATEX certified explosion-proof painting robots and cleanroom automation", "fanuc.co.jp", "JP"],
      ["Dürr AG", "Automated automotive paint application robots with explosion-proof ATEX ratings", "durr.com", "DE"],
      ["Yaskawa Motoman", "Food-grade washdown and cleanroom ISO Class 4 articulated robots", "yaskawa.com", "US"],
      ["Freudenberg Sealing Technologies", "Hygienic and pharmaceutical dynamic elastomer seals for food robotics", "fst.com", "DE"],
      ["Garlock (Enpro)", "High-performance dynamic shaft seals and PTFE gaskets for severe environments", "garlock.com", "US"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 14: ASSEMBLY
  // ------------------------------------------------------------
  {
    i: "cm", L: 14, n: "Robotic contract manufacturing & EMS",
    s: "High-mix high-reliability contract manufacturing facilities assembling mechatronic robots",
    w: "Most emerging robotics startups (Figure, 1X, Agility, cobot OEMs) do not own billion-dollar manufacturing plants. They partner with global Electronic Manufacturing Services (EMS) and precision mechatronics contract manufacturers who manage global component procurement, cleanroom joint assembly, and high-volume quality inspection.",
    h: [
      "Advanced SMT surface-mount lines place micro-BGA chips on multi-layer servo controller PCBs.",
      "ISO Class 7/8 cleanrooms provide climate-controlled environments for delicate harmonic gear and encoder assembly.",
      "Automated robotic assembly cells torque structural link fasteners with traceable angle-torque recording.",
      "End-of-line functional test stations execute automated power-up, flash programming, and initial motor phasing."
    ],
    k: [
      ["100,000+ units/yr", "scalable mass-production capacity in Tier-1 EMS manufacturing campuses"],
      ["100% traceability", "of every critical screw torque, motor serial number, and PCB batch code"],
      ["ISO 9001 / IATF 16949", "automotive-grade manufacturing quality management systems"]
    ],
    c: 2,
    x: "Assembling precision mechatronic robots requires mechanical assembly skills that traditional pure-electronics EMS providers take years to develop.",
    co: [
      ["Jabil Inc.", "Global contract manufacturing giant with dedicated precision robotics and healthcare divisions", "jabil.com", "US"],
      ["Flex Ltd.", "Advanced manufacturing, mechatronics assembly, and supply-chain solutions", "flex.com", "SG"],
      ["Foxconn (Hon Hai)", "World's largest electronics contract manufacturer producing Foxbot industrial robots", "foxconn.com", "TW"],
      ["Sanmina Corporation", "High-reliability manufacturing of complex medical, industrial, and robotic assemblies", "sanmina.com", "US"],
      ["Celestica", "Advanced mechatronics design, precision assembly, and industrial manufacturing", "celestica.com", "CA"],
      ["Benchmark Electronics", "High-complexity precision electromechanical contract manufacturing", "bench.com", "US"]
    ]
  },
  {
    i: "harness", L: 14, n: "Custom wire harnesses & connectors",
    s: "Automated wire stripping, crimping, and overmoulded industrial connectors",
    w: "A complex humanoid robot contains hundreds of individual wires connecting sensors, actuators, batteries, and compute boards. Automated wire harness manufacturing strips, crimps, shields, and overmoulds custom wire bundles with industrial M8/M12 and high-density circular connectors, preventing signal crosstalk and intermittent connection faults.",
    h: [
      "CNC wire processing machines cut, strip, and crimp gold-plated terminal contacts automatically.",
      "Microprocessor-controlled ultrasonic welding joins multiple grounding and power wires without solder.",
      "Braided tin-copper and aluminum foil shielding provides 360° electromagnetic interference (EMI) protection.",
      "Low-pressure injection overmoulding seals connector backshells against moisture and strain relief."
    ],
    k: [
      ["<10 mΩ", "crimp contact resistance verified by 100% automated crimp force monitoring"],
      [">100 dB", "EMI shielding effectiveness across high-frequency motor inverter switching noise"],
      ["500+ pin connections", "integrated into a single complete humanoid internal wiring harness"]
    ],
    c: 1,
    x: "Broad global supplier base; specialized high-density connectors (TE Connectivity, Molex, Amphenol) dominate robot interconnects.",
    co: [
      ["TE Connectivity", "World leader in industrial automation connectors, sensor harnesses, and micro-terminals", "te.com", "CH"],
      ["Molex (Koch Industries)", "High-density micro-connectors, custom cable harnesses, and industrial Ethernet plugs", "molex.com", "US"],
      ["Amphenol Corporation", "Harsh-environment circular connectors, high-speed data cables, and robotic harnesses", "amphenol.com", "US"],
      ["Harting Technology Group", "Han industrial heavy-duty modular connectors standard in industrial robotics", "harting.com", "DE"],
      ["LEMO", "High-precision push-pull circular connectors for surgical and collaborative robots", "lemo.com", "CH"],
      ["Phoenix Contact", "Industrial automation connection technology, fieldbus cables, and M12 connectors", "phoenixcontact.com", "DE"]
    ]
  },
  {
    i: "calib", L: 14, n: "Kinematic calibration & burn-in rigs",
    s: "Laser tracker kinematic identification and 100-hour full-load thermal burn-in",
    w: "Due to manufacturing machining tolerances, gear eccentricity, and link compliance, a newly assembled robot's nominal kinematic model differs from its true physical geometry. Kinematic calibration using 6-DoF laser trackers identifies true Denavit-Hartenberg (DH) parameters, while 48–100 hour full-load burn-in rigs weed out infant mortality in bearings and servo drives.",
    h: [
      "A 6-DoF laser tracker measures the true 3D coordinate of the robot end-effector across 50–100 poses.",
      "Non-linear optimization algorithms compute exact kinematic DH parameters and joint zero offsets.",
      "Joint compliance and gearbox backlash models are identified under forward and reverse gravitational loading.",
      "Automated burn-in cells run multi-axis full-torque cyclic trajectories for 48–100 hours in heated chambers."
    ],
    k: [
      ["10× improvement", "in absolute positioning accuracy achieved through kinematic calibration (from ±2 mm down to ±0.2 mm)"],
      ["48–100 hours", "full-load continuous burn-in cycle weeding out semiconductor and bearing infant mortality"],
      ["ISO 9283", "standardized performance testing of manipulating industrial robots"]
    ],
    c: 2,
    x: "Kinematic calibration software (RoboDK, Dynalog, Hexagon) and precision laser tracker infrastructure are essential for high-accuracy aerospace drilling and precision assembly.",
    co: [
      ["Hexagon (Leica Geosystems)", "Laser trackers and automated robotic arm volumetric calibration systems", "hexagon.com", "SE"],
      ["RoboDK", "Offline programming and robotic kinematic calibration software suites", "robodk.com", "CA"],
      ["Dynalog Inc.", "Pioneered automated robot kinematic calibration and cell alignment technology", "dynalog-inc.com", "US"],
      ["API Metrology", "Radian laser trackers and automated industrial robot calibration systems", "apimetrology.com", "US"],
      ["Faro Technologies", "Laser Tracker Vantage systems and automated dimensional inspection rigs", "faro.com", "US"],
      ["Zeiss (Calibration Systems)", "Optical tracking systems and robotic pose repeatability measurement suites", "zeiss.com", "DE"]
    ]
  },
  {
    i: "secondsource", L: 14, n: "Component qualification & supply-chain assurance",
    s: "Multi-vendor mechanical second-sourcing and accelerated life testing",
    w: "Relying on a single vendor for strain-wave gearboxes, custom frameless motors, or optical encoders creates existential supply-chain risk for robot OEMs. Component qualification teams operate accelerated life test (ALT) rigs running millions of cycles under thermal and vibration stress, certifying second-source suppliers without compromising MTBF.",
    h: [
      "Accelerated Life Testing (ALT) runs gearboxes under 1.5× rated torque and elevated temperature (80 °C).",
      "Weibull reliability statistics calculate B10 life and Mean Time Between Failures (MTBF).",
      "Metallurgical teardown and oil analysis check for micro-pitting, gear tooth flank spalling, and grease degradation.",
      "Cross-compatibility validation ensures alternative motor-gear units drop in without changing chassis tooling."
    ],
    k: [
      ["20,000+ hours", "target B10 design life for certified industrial robot joint sub-assemblies"],
      ["≥2 qualified", "independent suppliers required per critical mechanical component for Tier-1 supply assurance"],
      ["Weibull β > 2.5", "wear-out slope verification confirming absence of early random manufacturing defects"]
    ],
    c: 2,
    x: "Mechanical components (especially harmonic drives and crossed-roller bearings) take 12–24 months of continuous testing to qualify a second supplier due to long fatigue test run times.",
    co: [
      ["TÜV SÜD (Product Testing)", "Accredited accelerated life testing, environmental chambers, and component qualification", "tuvsud.com", "DE"],
      ["UL Solutions", "Reliability testing, functional safety qualification, and supply chain verification", "ul.com", "US"],
      ["Intertek Group", "Materials testing, accelerated fatigue life testing, and failure analysis", "intertek.com", "GB"],
      ["DEKRA", "Industrial product safety testing, component durability, and reliability certification", "dekra.com", "DE"],
      ["Element Materials Technology", "Specialized mechanical endurance testing, metallurgical analysis, and qualification", "element.com", "GB"],
      ["Applus+ Laboratories", "Component environmental testing, vibration testing, and life cycle verification", "appluslaboratories.com", "ES"]
    ]
  }
];
