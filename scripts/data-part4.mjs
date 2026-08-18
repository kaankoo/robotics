export const S22_S27 = [
  // ------------------------------------------------------------
  // STRATUM 22: AUTONOMY
  // ------------------------------------------------------------
  {
    i: "taskplan", L: 22, n: "High-level task planning & LLM agents",
    s: "Large Language Models translating human intents into structured sub-goal DAGs",
    w: "A human supervisor does not command a robot with raw motor torques or joint angles; they say 'clean the table' or 'palletize the incoming boxes'. High-level task planners and LLM agent frameworks (SayCan, AutoGPT for Robotics, PaLM-E) decompose open-ended natural language goals into ordered directed acyclic graphs (DAGs) of executable robotic skills.",
    h: [
      "Multimodal LLMs parse human natural-language commands and scene context descriptions.",
      "Affordance functions evaluate which sub-skills are physically feasible in the current environment state.",
      "Symbolic planners (PDDL, STRIPS) or language agents generate sequential sub-goal plans with precondition checks.",
      "Hierarchical state orchestrators dispatch concrete parameterized primitives ('approach', 'grasp', 'lift') to low-level policies."
    ],
    k: [
      ["SayCan / PaLM-E", "pioneered grounding large language model reasoning into physical affordances"],
      ["10–50 sub-goals", "sequenced reliably in long-horizon autonomous domestic and industrial tasks"],
      ["natural language", "task specification allowing factory workers to program tasks without coding"]
    ],
    c: 2,
    x: "High-level language reasoning can hallucinate physical affordances without strict physical grounding and verification.",
    co: [
      ["Google DeepMind (PaLM-E / SayCan)", "Pioneered embodied language models grounding LLMs in robotic affordances", "deepmind.google", "GB"],
      ["OpenAI (Embodied Agents)", "Research into multimodal reasoning and task planning for autonomous systems", "openai.com", "US"],
      ["Physical Intelligence (Task Agent)", "Hierarchical language-conditioned task planning and policy orchestration", "physicalintelligence.company", "US"],
      ["Intrinsic (Task Engine)", "AI orchestration frameworks translating high-level business logic into robotic moves", "intrinsic.ai", "US"],
      ["Covariant (Brain Task Engine)", "Task planning and reasoning for automated warehouse manipulation", "covariant.ai", "US"],
      ["Agility Robotics (Software)", "High-level logistics workflow dispatch and warehouse task sequencing for Digit", "agilityrobotics.com", "US"]
    ]
  },
  {
    i: "recovery", L: 22, n: "Reflexes, slip detection & error recovery",
    s: "Automated grasp retry loops, tactile slip reflexes, and collision back-off",
    w: "In real-world operations, grasps slip, items drop, and doors stick. If every minor anomaly triggers an emergency stop requiring a human to walk over, the system's economic value collapses. Autonomous recovery architectures execute low-latency reflex loops: tactile slip detection tightens grip force within 10 ms, while failed grasps trigger automated retreat and re-grasp sequences.",
    h: [
      "High-frequency tactile sensors detect micro-vibrations indicative of incipient friction slip.",
      "Hardware reflex loops increase parallel gripper normal force within 10 milliseconds to arrest slippage.",
      "If a grasp verification sensor reads false after lifting, the robot automatically drops the payload and re-segments the bin.",
      "Joint torque limit spikes trigger an immediate 50 mm compliance back-off to prevent mechanical jamming."
    ],
    k: [
      ["<10 ms", "tactile slip detection and reactive grip tightening response time"],
      ["80–90%", "of minor physical execution anomalies resolved autonomously without human intervention"],
      ["zero damage", "collision back-off routines preventing motor drive overcurrent trips"]
    ],
    c: 2,
    x: "Distinguishing between a benign heavy contact force and an unintended collision requires fast multi-sensor fusion.",
    co: [
      ["GelSight (Reflex Sensing)", "High-speed slip detection and tactile reflex control algorithms", "gelsight.com", "US"],
      ["Covariant (Error Handling)", "Automated anomaly detection, grasp retry, and exception resolution in logistics", "covariant.ai", "US"],
      ["Ambi Robotics", "AmbiSort AI parcel sorting systems with automated grasp recovery loops", "ambirobotics.com", "US"],
      ["Plus One Robotics", "PickOne perception and Yonder human-in-the-loop exception handling software", "plusonerobotics.com", "US"],
      ["PickNik Robotics (MoveIt Pro)", "Automated fault recovery behaviors and interactive trajectory replanning", "picknik.ai", "US"],
      ["Berkshire Grey", "Intelligent enterprise robotics with integrated automated exception handling", "berkshiregrey.com", "US"]
    ]
  },
  {
    i: "remoteassist", L: 22, n: "Low-latency remote assist & tele-driving",
    s: "WebRTC streaming and remote cockpit cockpits rescuing stuck robots over 4G/5G",
    w: "When an autonomous robot encounters a scenario outside its policy distribution (e.g., an un-modeled spill, a jammed gate), it does not halt indefinitely. Remote assistance platforms stream ultra-low-latency video to a human operator in a centralized operations center, who provides a 5-second spatial hint or takes over direct teleoperation to unblock the machine before returning it to autonomous mode.",
    h: [
      "Adaptive H.264/H.265 video encoders stream multi-camera views over bonded cellular 4G/5G links.",
      "WebRTC protocol with customized congestion control maintains glass-to-glass latency under 100 ms.",
      "Human operators use steering wheels, VR controllers, or spatial 3D click-to-point waypoints to guide the robot.",
      "The intervention is tagged and recorded into active learning datasets to retrain the autonomous policy."
    ],
    k: [
      ["<100 ms", "glass-to-glass video streaming and control latency over public cellular 5G networks"],
      ["1 : 20 to 1 : 100", "operator-to-robot ratio achieved with remote assistance (1 human oversees 50 robots)"],
      ["<15 seconds", "average human intervention resolution duration for typical warehouse pick exceptions"]
    ],
    c: 3,
    x: "Remote assist is the bridge that makes commercial autonomy economically viable today while foundation models mature.",
    co: [
      ["Plus One Robotics (Yonder)", "Human-in-the-loop remote assistance platform for automated warehouse sortation", "plusonerobotics.com", "US"],
      ["Formant Inc.", "Real-time teleoperation, remote assist, and observability infrastructure for robot fleets", "formant.io", "US"],
      ["Phantom Auto", "Remote tele-driving and supervision software for logistics forklifts and yard trucks", "phantomauto.com", "US"],
      ["Oxa (Oxa Teleoperation)", "Autonomous vehicle and mobile robot remote assistance and fleet oversight software", "oxa.tech", "GB"],
      ["DriveU.auto", "Superior connectivity platform for autonomous vehicle and robot teleoperation", "driveu.auto", "IL"],
      ["Ottopia", "Universal teleoperation software platform for commercial autonomous fleets", "ottopia.tech", "IL"]
    ]
  },
  {
    i: "intervention", L: 22, n: "Intervention rate & autonomy measurement",
    s: "Mean Distance Between Interventions and human-minutes per robot-hour",
    w: "The economic viability of an autonomous physical deployment is determined by a single metric: the intervention rate. In software AI, a 95% accurate model is useful; in physical robotics, a 95% reliable action means an intervention every 20 actions—requiring a human to constantly babysit the machine. Autonomy monitoring systems track human-minutes per robot-hour and Mean Distance Between Interventions (MDBI).",
    h: [
      "Telemetry daemons record the exact timestamp, duration, and root cause of every human touch.",
      "Intervention Rate is calculated as total human operator minutes divided by total operational robot hours ($M_{human} / H_{robot}$).",
      "Mean Time Between Interventions (MTBI) and Mean Picks Between Failures (MPBF) are tracked against SLAs.",
      "Survival curves analyze autonomy decay across novel object categories and environmental conditions."
    ],
    k: [
      ["<1 human-min / robot-hr", "commercial profitability threshold for autonomous warehouse and industrial deployments"],
      ["MPBF > 1,000", "Mean Picks Between Failures required for unattended warehouse induction stations"],
      ["log-odds reliability", "why moving from 99% to 99.9% reliability is 10× more valuable than 90% to 99%"]
    ],
    c: 3,
    x: "The fundamental economic metric of physical intelligence. If the intervention rate is high, labor costs are not eliminated, only shifted to teleoperators.",
    co: [
      ["InOrbit", "RoboOps autonomy metrics, incident tracking, and fleet efficiency analytics", "inorbit.ai", "US"],
      ["Formant", "Operational analytics, SLA compliance tracking, and intervention rate metrics", "formant.io", "US"],
      ["Apex.AI", "Autonomy software health monitoring and certified data analytics runtimes", "apex.ai", "US"],
      ["Symbotic (Fleet Analytics)", "Proprietary high-throughput fleet telemetry and system availability metrics", "symbotic.com", "US"],
      ["Covariant (Metrics & Telemetry)", "Real-time pick success rate, throughput, and error analysis across logistics sites", "covariant.ai", "US"],
      ["Foxglove Technologies", "Telemetry logging and automated failure metric extraction for robotics fleets", "foxglove.dev", "US"]
    ]
  },
  {
    i: "hri", L: 22, n: "Shared autonomy & Human-Robot Interaction",
    s: "Intent prediction, dynamic speed throttling, and non-verbal robot communication",
    w: "When autonomous mobile robots and humanoids navigate crowded hospital corridors or factory floors alongside humans, they cannot behave like blind bulldozers. Human-Robot Interaction (HRI) algorithms predict human walking trajectories, communicate intent through gaze tracking and dynamic light signaling, and dynamically adapt speed to human comfort zones.",
    h: [
      "Human pose estimation algorithms track pedestrian head orientation, gait vectors, and predicted intent.",
      "Social force models and social costmaps bias path planners to pass humans on socially accepted sides (e.g., right-hand rule).",
      "Dynamic LED light projectors project forward path lines and turning indicators directly onto the floor.",
      "Robot head and eye displays orient toward the target object before movement, giving humans non-verbal cues."
    ],
    k: [
      ["1.5–2.0 m", "social comfort distance maintained during autonomous mobile navigation past workers"],
      ["<200 ms", "human gaze and walking trajectory prediction latency in dense factory aisles"],
      ["zero surprise", "floor projection and auditory cues eliminating worker anxiety near mobile machines"]
    ],
    c: 1,
    x: "Worker acceptance and ergonomic psychological safety determine whether physical automation is embraced or resisted by shop-floor labor.",
    co: [
      ["Locus Robotics", "Pioneered intuitive collaborative human-robot warehouse picking interfaces", "locusrobotics.com", "US"],
      ["Agility Robotics (HRI Team)", "Digit humanoid non-verbal communication, eye gestures, and human-safe interaction", "agilityrobotics.com", "US"],
      ["Boston Dynamics (Safety & HRI)", "Spot and Stretch intuitive operator tablet controls and visual status indicators", "bostondynamics.com", "US"],
      ["Universal Robots (HRI Interface)", "Polyscope intuitive teach pendant software and collaborative lead-through guiding", "universal-robots.com", "DK"],
      ["Neura Robotics (Cognitive HRI)", "Multimodal touch, voice, and visual intent recognition for collaborative assistants", "neura-robotics.com", "DE"],
      ["1X Technologies", "Designing human-friendly, quiet, and compliant domestic humanoid interaction", "1x.tech", "NO"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 23: FLEET
  // ------------------------------------------------------------
  {
    i: "fleetops", L: 23, n: "Fleet management systems & dispatch",
    s: "VDA 5050 compliant orchestrators managing multi-robot traffic and dispatch",
    w: "One autonomous robot is a tech demo; five hundred robots moving pallets simultaneously across a million-square-foot distribution center is a logistics system. Fleet Management Systems (FMS) solve Multi-Agent Path Finding (MAPF) to prevent gridlock, dispatch jobs from Warehouse Management Systems (WMS), and route robots to charging docks before batteries deplete.",
    h: [
      "Central dispatchers ingest mission orders from enterprise SAP/WMS systems via REST and OPC UA APIs.",
      "Multi-Agent Path Finding (MAPF) algorithms (Conflict-Based Search / CBS) route hundreds of robots with zero traffic deadlocks.",
      "Standardized VDA 5050 JSON/MQTT protocols transmit mission orders to heterogeneous mobile robots.",
      "Dynamic task re-allocation redirects orders to the nearest available AMR if a robot reports a flat tire or low charge."
    ],
    k: [
      ["1,000+ robots", "coordinated simultaneously inside single multi-tier automated fulfillment facilities"],
      ["VDA 5050", "European automotive industry standard protocol for multi-vendor AGV/AMR interoperability"],
      ["zero gridlock", "guaranteed through dynamic reservation of intersection spatial-temporal occupancy tiles"]
    ],
    c: 3,
    x: "Fleet orchestration is the operating system of the modern automated warehouse; Symbotic, Daifuku, and Dematic command enterprise lock-in through their fleet software.",
    co: [
      ["Symbotic", "Proprietary AI fleet orchestrator managing thousands of high-speed warehouse rovers", "symbotic.com", "US"],
      ["AutoStore", "World leader in cubic automated storage and retrieval (ASRS) fleet management software", "autostore.com", "NO"],
      ["Daifuku Co., Ltd.", "World's largest material handling automation and AGV fleet management provider", "daifuku.com", "JP"],
      ["Dematic (KION Group)", "Global warehouse automation software, AGV fleet dispatch, and supply chain solutions", "dematic.com", "US"],
      ["Locus Robotics (LocusServer)", "Enterprise AMR fleet management coordinating thousands of autonomous picking bots", "locusrobotics.com", "US"],
      ["Geek+ (Robotics OS)", "Global AMR and mobile sorting robot fleet scheduling and management platform", "geekplus.com", "CN"]
    ]
  },
  {
    i: "ota", L: 23, n: "Over-the-air policy deployment & canary staging",
    s: "Containerized edge updates and canary rollouts across customer sites",
    w: "Deploying an updated neural vision model or navigation algorithm across 5,000 commercial robots requires staged, risk-mitigated software deployment. Cloud deployment platforms use Docker containerization, staging pipelines, and automated canary rollouts (updating 1% of the fleet first and monitoring intervention rates for 24 hours) before full global fleet deployment.",
    h: [
      "Robot software components are packaged as isolated OCI / Docker container images.",
      "Canary deployment pipelines push new container images to 1% of the fleet across designated pilot sites.",
      "Automated telemetry monitors check for spikes in CPU temperature, motor current, or operator interventions.",
      "If anomaly thresholds are exceeded, the fleet automatically rolls back to the previous container image in seconds."
    ],
    k: [
      ["1-click rollback", "instantaneous revert to previous verified container image upon anomaly detection"],
      ["canary staging", "gradual 1% -> 10% -> 100% rollout minimizing enterprise operational risk"],
      ["delta updates", "binary difference compression reducing OTA network bandwidth costs by up to 90%"]
    ],
    c: 2,
    x: "Balena, Formant, and AWS IoT Greengrass provide the containerized deployment backbone for modern robotics companies.",
    co: [
      ["Balena", "Container-based deployment, host OS management, and fleet management for edge devices", "balena.io", "GB"],
      ["Formant", "Cloud fleet management, automated container deployments, and edge application lifecycle", "formant.io", "US"],
      ["AWS IoT Greengrass", "Edge runtime and cloud service for building, deploying, and managing edge robot software", "aws.amazon.com", "US"],
      ["Mender.io", "Secure over-the-air software updater for embedded Linux and containerized applications", "mender.io", "NO"],
      ["Canonical (Ubuntu Core / Snaps)", "Strictly confined, atomic transactional snap packages for robotics edge software", "ubuntu.com/core", "GB"],
      ["Microsoft Azure IoT Edge", "Cloud intelligence and custom container deployment to edge robotics devices", "azure.microsoft.com", "US"]
    ]
  },
  {
    i: "roc", L: 23, n: "Remote Operations Centers (ROC)",
    s: "24/7 centralized monitoring facilities and global uptime telemetry",
    w: "Enterprise customers purchasing Robots-as-a-Service (RaaS) demand 99%+ uptime SLAs without hiring in-house robotics engineers. Robotics companies operate centralized 24/7 Remote Operations Centers (ROC), where banks of human teleoperators monitor live dashboards, resolve exceptions within seconds, and dispatch local field service technicians for hardware repairs.",
    h: [
      "Centralized video walls display real-time status, battery levels, and active task queues across all customer sites.",
      "Automated alerting systems ring operators when a robot triggers an exception state.",
      "Operators resolve visual and navigation edge cases remotely using high-speed tele-driving interfaces.",
      "Ticketing systems automatically log hardware degradation trends (e.g., rising motor temperatures) for preventive maintenance."
    ],
    k: [
      ["99.5%+", "contractual uptime SLA guaranteed to enterprise warehouse and manufacturing customers"],
      ["24/7/365", "continuous real-time monitoring and remote intervention availability"],
      ["<30 seconds", "incident-to-resolution response time for standard warehouse robot exceptions"]
    ],
    c: 2,
    x: "Operating a high-reliability ROC requires redundant cloud connectivity, strict customer data privacy compliance (SOC 2, ISO 27001), and trained tele-operators.",
    co: [
      ["Symbotic (Operations Center)", "Centralized 24/7 monitoring and remote operation of enterprise warehouse automation", "symbotic.com", "US"],
      ["Locus Robotics (Mission Operations)", "Global remote operations monitoring thousands of warehouse AMRs worldwide", "locusrobotics.com", "US"],
      ["Phantom Auto (Operations)", "Remote operations center infrastructure for logistics, yard trucks, and forklifts", "phantomauto.com", "US"],
      ["Plus One Robotics (Mission Command)", "24/7 Human-in-the-Loop supervision centers for robotic parcel sortation", "plusonerobotics.com", "US"],
      ["Brain Corp", "Autonomy services and centralized operations platform for commercial cleaning fleets", "braincorp.com", "US"],
      ["Outrider", "Autonomous yard truck operations and centralized distribution yard management", "outrider.ai", "US"]
    ]
  },
  {
    i: "service", L: 23, n: "Field service engineering & spares networks",
    s: "On-site maintenance teams, joint lubrication, and rapid module replacement depots",
    w: "Even the best-engineered robots suffer mechanical wear, accidental forklift impacts, and cable fatigue. Sustaining a commercial fleet requires regional spare parts warehouses, certified Field Service Engineers (FSE), scheduled preventative maintenance protocols (gearbox regreasing every 5,000 hours), and 4-hour on-site repair SLAs.",
    h: [
      "Preventive maintenance schedules track motor run-hours, brake engagements, and cable flex cycles.",
      "Field Service Engineers use modular drop-in replacement joint modules to swap damaged actuators in <30 minutes.",
      "Laser alignment tools recalibrate robot tool centers (TCP) after accidental physical collisions.",
      "Used joint modules and electronics are returned to central depots for refurbishment and metallurgical inspection."
    ],
    k: [
      ["<4 hours", "on-site emergency response SLA for tier-1 automotive manufacturing plants"],
      ["5,000 hours", "preventative maintenance interval for harmonic drive and cycloidal grease replenishment"],
      ["<30 minutes", "mean time to replace a modular joint actuator in the field"]
    ],
    c: 2,
    x: "Field service density is a major competitive moat for incumbent industrial robot manufacturers (Fanuc, ABB, Yaskawa, KUKA) over cash-strapped robotics startups.",
    co: [
      ["Fanuc America (Service Network)", "Industry benchmark global field service network with guaranteed lifetime spare parts support", "fanucamerica.com", "US"],
      ["ABB Robotics (Customer Service)", "Global service infrastructure, preventative maintenance, and robot remanufacturing", "abb.com", "SE"],
      ["Yaskawa Motoman (Global Service)", "Field engineering, 24/7 technical support hotline, and regional spare depots", "yaskawa.com", "US"],
      ["KUKA Robotics (Customer Service)", "Comprehensive on-site maintenance, repair, and training academy networks", "kuka.com", "DE"],
      ["Bastian Solutions (Toyota Advanced Logistics)", "Material handling integration, field maintenance, and regional service support", "bastiansolutions.com", "US"],
      ["Daifuku (Customer Service)", "24/7 global maintenance and spare parts network for automated material handling", "daifuku.com", "JP"]
    ]
  },
  {
    i: "interop", L: 23, n: "Multi-vendor interoperability & standards",
    s: "VDA 5050, MassRobotics AMR standard, and OPC UA / companion standards",
    w: "Enterprise factories do not want a separate proprietary fleet manager for every brand of robot (e.g., one screen for MiR, another for Geek+, a third for AutoStore). Open interoperability standards like VDA 5050, MassRobotics AMR Interoperability Standard, and OPC UA Robotics Companion Specifications allow a single master fleet system to control multi-vendor mobile robots.",
    h: [
      "VDA 5050 defines a standardized MQTT/JSON protocol for passing navigation nodes, edges, and actions.",
      "MassRobotics AMR standard enables mobile robots from different vendors to share spatial location and avoid deadlocks.",
      "OPC UA Robotics Companion Specification standardizes data exchange between robot controllers and factory MES/PLCs.",
      "Middleware adapter gateways translate vendor-specific internal state topics into standardized external schemas."
    ],
    k: [
      ["VDA 5050", "universal standard adopted across German automotive manufacturing for mixed AMR fleets"],
      ["1 single dashboard", "controlling heterogeneous mobile robots, pallet movers, and tuggers across a facility"],
      ["OPC UA Part 100", "standardized robotics companion specification for Industry 4.0 connectivity"]
    ],
    c: 1,
    x: "Overcomes customer fear of vendor lock-in; enables enterprise customers to mix specialized robot form factors on a single floor.",
    co: [
      ["VDMA (German Engineering Federation)", "Key driver of VDA 5050 and OPC UA Robotics companion specifications", "vdma.org", "DE"],
      ["MassRobotics", "Pioneered the MassRobotics AMR Interoperability Standard for mixed mobile robot fleets", "massrobotics.org", "US"],
      ["Open Source Robotics Alliance (Open-RMF)", "Open Robotics Middleware Framework for multi-fleet and infrastructure coordination", "openrobotics.org", "US"],
      ["Körber Supply Chain", "Unified control platform orchestrating multi-vendor AMR, AGV, and manual workflows", "koerber-supplychain.com", "DE"],
      ["Siemens (SIMOVE)", "Standardized AGV/AMR system software platform built on VDA 5050 standards", "siemens.com", "DE"],
      ["SICK AG (Integration)", "Co-development of standardized localization and safety communication protocols", "sick.com", "DE"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 24: WORK
  // ------------------------------------------------------------
  {
    i: "pickpack", L: 24, n: "Piece picking & order fulfilment",
    s: "Automated e-commerce item picking, tote consolidation, and induction",
    w: "In e-commerce fulfillment centers (Amazon, Walmart, Target), millions of diverse items (shampoo bottles, boxed electronics, bagged apparel) must be picked from bulk storage totes and placed into shipping boxes. Piece picking robots combine 3D vision, suction/parallel grippers, and foundation models to grasp thousands of unknown SKUs at speeds matching human workers.",
    h: [
      "High-resolution 3D depth cameras segment unknown objects in cluttered bin piles.",
      "Neural grasp planners evaluate grasp affordance maps for suction cups and parallel gripper fingers.",
      "A 6-axis articulated or SCARA robot executes rapid pick-and-place trajectories at up to 1,000 picks/hr.",
      "Barcode scanners verify item UPC in-flight before placing it into the outbound order tote."
    ],
    k: [
      ["400–700 PPH", "Picks Per Hour throughput matching or exceeding manual human warehouse pickers"],
      ["99.5%+", "grasp success rate across millions of un-modeled consumer e-commerce SKUs"],
      ["$0.02–$0.05", "operating cost per picked item vs $0.15–$0.30 for manual human warehouse labor"]
    ],
    c: 2,
    x: "Highly competitive commercial market. The key challenge is handling deformable items, transparent plastic polybags, and reflective metallic surfaces without drop errors.",
    co: [
      ["RightHand Robotics", "RightPick autonomous piece-picking system for e-commerce order fulfillment", "righthandrobotics.com", "US"],
      ["Covariant", "AI-powered robotic piece-picking and sorting systems for logistics", "covariant.ai", "US"],
      ["Berkshire Grey", "Intelligent enterprise robotic picking and item sortation systems", "berkshiregrey.com", "US"],
      ["Ambi Robotics", "AmbiSort AI robotic parcel sortation systems powered by Dex-Net simulation", "ambirobotics.com", "US"],
      ["Plus One Robotics", "PickOne 3D vision and picking systems for warehouse induction and parcel sortation", "plusonerobotics.com", "US"],
      ["Mujin Inc.", "Intelligent robot controllers for automated logistics picking and palletizing", "mujin-corp.com", "JP"]
    ]
  },
  {
    i: "palletise", L: 24, n: "Palletising & container unloading",
    s: "High-payload robotic stacking and unstructured shipping container unloading",
    w: "Unloading heavy 30 kg boxes from 40-foot sea shipping containers in 40 °C heat, and stacking mixed-SKU pallets for retail store delivery, is backbreaking manual labor with high injury rates. Heavy-payload robotic arms (Boston Dynamics Stretch, Mujin, Fanuc) use suction arrays and computer vision to autonomously unload unstructured trailers and build stable pallet stacks.",
    h: [
      "Laser scanners and 3D depth sensors map the shifting wall of boxes inside shipping containers.",
      "High-reach articulated arms with vacuum gripper arrays grasp boxes from top or face surfaces.",
      "Mixed-case palletizing algorithms solve 3D bin-packing optimization to build stable, dense pallet stacks.",
      "Mobile AMR bases transport completed pallets directly into automated stretch-wrapping stations."
    ],
    k: [
      ["500–1,200 cases/hr", "container unloading throughput eliminating manual trailer lumpers"],
      ["up to 1,000 kg", "pallet payload handled by heavy industrial palletizing articulated arms"],
      ["3D bin packing", "algorithms optimizing pallet density and weight distribution for trucking"]
    ],
    c: 2,
    x: "Challenging unstructured environment: shipping containers feature shifted boxes, crushed cardboard, and extreme seasonal temperatures.",
    co: [
      ["Boston Dynamics (Stretch)", "Stretch mobile robot designed specifically for autonomous truck and container unloading", "bostondynamics.com", "US"],
      ["Mujin Inc.", "Intelligent heavy-duty truck unloading and mixed-case robotic palletizing systems", "mujin-corp.com", "JP"],
      ["Symbotic", "High-density automated mixed-case palletizing systems for grocery retail chains", "symbotic.com", "US"],
      ["Fanuc Robotics (Palletizing)", "M-410 series heavy-payload industrial palletizing articulated robots", "fanucamerica.com", "US"],
      ["KUKA Robotics (Palletizing)", "KR QUANTEC PA high-speed industrial palletizing robots and software", "kuka.com", "DE"],
      ["Fizyr", "AI computer vision software for automated truck unloading and parcel induction", "fizyr.com", "NL"]
    ]
  },
  {
    i: "weld", L: 24, n: "Arc, laser & spot welding",
    s: "High-precision automotive seam welding and metal joining",
    w: "Automotive vehicle body assembly is the historic birthplace of industrial robotics. Articulated robots with spot-welding guns apply 4,000 spot welds per car chassis with sub-millimeter positioning accuracy, while robotic laser and MIG/TIG seam welding robots track weld joints with adaptive laser optical seam tracking.",
    h: [
      "Articulated robot positions heavy servo-actuated spot welding guns around car body sheet metal.",
      "High-current transformers deliver 10,000+ Amperes across copper electrodes, melting sheet steel in milliseconds.",
      "Laser triangulation sensors scan 20 mm ahead of the welding torch, tracking seam gap variations in real time.",
      "Robotic power sources dynamically modulate wire feed speed and arc voltage to prevent weld burn-through."
    ],
    k: [
      ["4,000+ welds", "applied per automotive body-in-white by robotic welding lines in <60 seconds"],
      ["±0.1 mm", "seam tracking accuracy maintained along complex 3D curved joint seams"],
      ["100% duty cycle", "continuous automated welding eliminating human welder arc-flash exposure"]
    ],
    c: 2,
    x: "Automotive body shops require massive capital investment ($100M+ per body shop); Fanuc, Yaskawa, ABB, and KUKA dominate global automotive welding.",
    co: [
      ["Fanuc Corporation (Welding)", "World market leader in automotive robotic spot and arc welding automation", "fanuc.co.jp", "JP"],
      ["Yaskawa Motoman", "AR-series arc welding robots and MOTOMAN industrial spot welding systems", "yaskawa.com", "JP"],
      ["ABB Robotics (Welding Div)", "Integrated robotic welding cells, positioners, and RobotStudio arc software", "abb.com", "SE"],
      ["KUKA AG (Welding Automation)", "Industrial welding robots standard in European automotive manufacturing", "kuka.com", "DE"],
      ["Fronius International", "Advanced robotic welding power sources and TPS/i intelligent arc systems", "fronius.com", "AT"],
      ["Lincoln Electric", "Robotic arc welding systems, consumables, and automated welding integration", "lincolnelectric.com", "US"]
    ]
  },
  {
    i: "assemble", L: 24, n: "Precision mechanical assembly & fastening",
    s: "Automated screwdriving, peg-in-hole press-fitting, and electronics assembly",
    w: "Assembling smartphone camera modules, automotive gearboxes, and home appliances requires inserting tight-tolerance pins, routing delicate flexible PCBs, and driving micro-screws to exact torque limits. Collaborative and SCARA robots with force-torque feedback execute compliant peg-in-hole insertions with 20-micron clearances.",
    h: [
      "High-precision SCARA or 6-axis arms locate screw holes using high-resolution machine vision.",
      "Torque-controlled electric screwdrivers drive fasteners with continuous angle-torque monitoring.",
      "Spiral search and force-compliant insertion algorithms insert tight-tolerance bearing pins into bores.",
      "Automated optical inspection cameras verify screw seating depth and thread engagement."
    ],
    k: [
      ["<20 µm", "clearance tolerance assembled reliably using active force-compliance algorithms"],
      ["<0.5 seconds", "per automated precision screwdriving cycle with torque-angle validation"],
      ["zero cross-threading", "guaranteed through real-time reverse-rotation thread finding"]
    ],
    c: 2,
    x: "Electronics assembly requires high speed and cleanroom compliance; Seiko Epson, Denso, and Yamaha dominate precision SCARA assembly.",
    co: [
      ["Epson Robots (Seiko Epson)", "World leader in precision SCARA and 6-axis robots for electronics assembly", "epson.com", "JP"],
      ["Denso Robotics", "High-speed compact industrial 6-axis and SCARA assembly robots", "densorobotics.com", "JP"],
      ["Yamaha Motor (Robotics Div)", "Precision SCARA robots, linear pick-and-place modules, and vision systems", "yamaha-motor.com", "JP"],
      ["Universal Robots (Assembly)", "Collaborative robots for precision screwdriving, insertion, and electronics assembly", "universal-robots.com", "DK"],
      ["Stäubli Robotics (Assembly)", "Ultra-high-precision industrial and cleanroom fast-picker assembly robots", "staubli.com", "CH"],
      ["Atlas Copco (Industrial Tools)", "Micro-torque electric screwdrivers and automated robotic fastening tools", "atlascopco.com", "SE"]
    ]
  },
  {
    i: "inspect", L: 24, n: "Automated visual & dimensional inspection",
    s: "In-line metrology, defect classification, and 3D optical scanning in manufacturing",
    w: "Human visual inspection in factories is slow, subjective, and suffers from eye fatigue. Inspection robots equipped with high-resolution 3D optical scanners, structured-light sensors, and deep learning defect classification models inspect 100% of manufactured parts in-line, measuring dimensional deviations against CAD down to microns.",
    h: [
      "A high-precision 6-axis robot guides an optical blue-light 3D scanner around the part.",
      "Dense point clouds are aligned to CAD nominal models using Iterative Closest Point (ICP) algorithms.",
      "Color-coded deviation heatmaps flag out-of-tolerance features, warpage, and flush/gap errors.",
      "Deep convolutional neural networks detect surface scratches, paint blemishes, and porosity defects."
    ],
    k: [
      ["100% in-line", "inspection eliminating statistical batch sampling in automotive quality control"],
      ["±5 µm", "dimensional measurement accuracy achieved on robotic optical metrology cells"],
      ["<60 seconds", "full 3D surface scan of complete stamped car doors and aerospace components"]
    ],
    c: 2,
    x: "Metrology certification requires traceable calibration standards (ISO 10360); Zeiss, Hexagon, and GOM dominate industrial optical inspection.",
    co: [
      ["GOM GmbH (Zeiss Group)", "ATOS optical 3D scanners and automated robotic inspection cells (ScanBox)", "gom.com", "DE"],
      ["Hexagon (Metrology)", "Robotic laser trackers, 3D optical area scanners, and automated CMM cells", "hexagon.com", "SE"],
      ["Creaform (AMETEK)", "MetraSCAN 3D optical CMM scanners mounted on industrial robot arms", "creaform3d.com", "CA"],
      ["Keyence Corporation (Vision)", "In-line 3D vision sensors, profile measurement, and automated defect inspection", "keyence.com", "JP"],
      ["Cognex Corporation", "Industrial machine vision systems, VisionPro deep learning, and 3D inspection", "cognex.com", "US"],
      ["Scantech", "3D laser scanners and automated robotic 3D measurement workstations", "3d-scantech.com", "CN"]
    ]
  },
  {
    i: "intralog", L: 24, n: "Internal logistics & AMR material transport",
    s: "Autonomous Mobile Robots moving pallets, totes, and sub-assemblies across factories",
    w: "In modern lean manufacturing and warehousing, moving raw materials, WIP sub-assemblies, and finished goods between workstations accounts for huge labor costs. Autonomous Mobile Robots (AMRs) navigate dynamically around workers, forklifts, and changing obstacles, replacing fixed conveyor belts with flexible, software-defined internal logistics.",
    h: [
      "Natural-feature SLAM (LiDAR and visual odometry) maps facility walls without physical magnetic floor tape.",
      "Autonomous path planners navigate around dynamic obstacles (pallets, humans, forklifts) in real time.",
      "Integrated scissor lifts, roller conveyors, or robotic arm top-modules load and unload materials.",
      "Fleet managers dispatch transportation tasks automatically from ERP, MES, and warehouse management systems."
    ],
    k: [
      ["100–1,500 kg", "payload transport capacity across tote-carrying and heavy pallet-moving AMRs"],
      ["1.5–2.5 m/s", "autonomous travel speed in mixed human-industrial factory environments"],
      ["zero fixed infrastructure", "deploys without cutting floor wires, installing reflectors, or laying tape"]
    ],
    c: 2,
    x: "Rapidly consolidating global market; Mobile Industrial Robots (MiR), OTTO Motors, and Geek+ lead commercial enterprise deployments.",
    co: [
      ["Mobile Industrial Robots - MiR (Teradyne)", "Pioneered industrial collaborative AMRs for internal material transport (Odense, DK)", "mobile-industrial-robots.com", "DK"],
      ["OTTO Motors (Rockwell Automation)", "Heavy-duty autonomous mobile robots for industrial material handling and automotive plants", "ottomotors.com", "CA"],
      ["Geek+", "Global autonomous mobile robot leader across warehouse fulfillment and factory logistics", "geekplus.com", "CN"],
      ["Seegrid Corporation", "Autonomous mobile robots and vision-guided tow tractors for manufacturing", "seegrid.com", "US"],
      ["Fetch Robotics (Zebra Technologies)", "Autonomous mobile robots for warehousing, intralogistics, and cloud fleet management", "zebra.com", "US"],
      ["Hai Robotics", "Autonomous Case-handling Robot (ACR) systems for ultra-high-density warehouse storage", "hairobotics.com", "CN"]
    ]
  },
  {
    i: "clean", L: 24, n: "Commercial cleaning & facility care",
    s: "Autonomous floor scrubbers, vacuuming, and hazardous waste remediation",
    w: "Cleaning expansive airport concourses, shopping malls, logistics warehouses, and hospital floors is repetitive, low-wage manual labor with high worker turnover. Autonomous floor scrubbers and sweepers navigate commercial facilities overnight, scrubbing, vacuuming, and squeegeeing millions of square feet with verified sanitation tracking.",
    h: [
      "2D/3D LiDAR, sonar, and depth cameras provide 360° obstacle avoidance around displays and pedestrians.",
      "Coverage path planning algorithms optimize floor cleaning patterns to minimize overlap and water consumption.",
      "Water recycling and squeegee suction systems scrub and dry floors in a single pass.",
      "Cloud dashboards generate daily heatmaps verifying cleaned square footage for facility management audits."
    ],
    k: [
      ["20,000–50,000 sq ft/hr", "cleaning productivity per commercial autonomous floor scrubber"],
      ["99.9% autonomous", "operation with human involvement limited to tank filling and debris emptying"],
      ["100% verified proof", "of clean: digital telemetry maps confirming exactly which floor tiles were scrubbed"]
    ],
    c: 1,
    x: "Brain Corp (BrainOS) powers the autonomy stack inside most leading commercial cleaning machine brands (Tennant, Nilfisk, Kärcher).",
    co: [
      ["Brain Corp", "BrainOS autonomy platform powering thousands of commercial robotic floor scrubbers worldwide", "braincorp.com", "US"],
      ["Tennant Company", "World leader in commercial floor cleaning equipment integrating autonomous BrainOS tech", "tennantco.com", "US"],
      ["Nilfisk", "Commercial cleaning machines and autonomous robotic scrubbers (Nilfisk Liberty series)", "nilfisk.com", "DK"],
      ["Avidbots", "Neo and Neo 2 autonomous floor scrubbing robots designed from the ground up for commercial facilities", "avidbots.com", "CA"],
      ["SoftBank Robotics (Whiz)", "Whiz autonomous AI commercial vacuum cleaning robots for offices and hotels", "softbankrobotics.com", "JP"],
      ["Gausium (Gaussian Robotics)", "Comprehensive lineup of autonomous commercial cleaning and sweeping robots", "gausium.com", "CN"]
    ]
  },
  {
    i: "agri", L: 24, n: "Precision agriculture & harvest robotics",
    s: "Selective fruit picking, robotic laser weeding, and autonomous vineyard pruning",
    w: "Agricultural labor shortages threaten fruit harvests and crop yields worldwide. Agricultural robots leverage multispectral vision to detect crop ripeness, delicate soft silicone grippers to pick apples and berries without bruising, and high-frequency targeted lasers to incinerate 200,000 weeds per hour without chemical herbicides.",
    h: [
      "Multispectral cameras and deep learning object detectors identify ripe fruit in dense foliage.",
      "Soft pneumatic or silicone tendon fingers gently grasp and twist fruit from stems without bruising flesh.",
      "High-power CO₂ lasers track and zap weed meristems in milliseconds as the tractor moves at 5 mph.",
      "RTK-GNSS receivers provide centimeter-accurate autonomous navigation between crop rows."
    ],
    k: [
      ["200,000+ weeds/hr", "eliminated by autonomous laser weeding rigs, reducing herbicide use by 90%"],
      ["<2 seconds", "per selective fruit pick cycle with zero bruising on delicate apples and berries"],
      ["24/7 harvest", "capability during narrow seasonal weather windows without human picker shortages"]
    ],
    c: 2,
    x: "Harsh outdoor environment: changing sunlight, mud, vibration, dust, and non-uniform organic crops make agricultural manipulation difficult.",
    co: [
      ["John Deere (Blue River Technology)", "See & Spray smart agricultural machines and autonomous farm tractors", "deere.com", "US"],
      ["Carbon Robotics", "LaserWeeder autonomous laser weeding robots eliminating weeds without chemicals", "carbonrobotics.com", "US"],
      ["Monarch Tractor", "Autonomous electric smart tractors with integrated farm data platforms", "monarchtractor.com", "US"],
      ["Burro", "Autonomous collaborative agricultural utility robots assisting field harvest crews", "burro.ai", "US"],
      ["Advanced Farm Systems", "Automated robotic strawberry and apple harvesting systems", "advanced.farm", "US"],
      ["Naïo Technologies", "Autonomous electric weeding and agricultural robots for vineyards and vegetable crops", "naio-technologies.com", "FR"]
    ]
  },
  {
    i: "surg", L: 24, n: "Surgical & interventional robotics",
    s: "Minimally invasive laparoscopic arms, orthopedic bone resection, and microsurgical tele-manipulators",
    w: "In operating rooms worldwide, surgical robots (Intuitive Surgical da Vinci, Stryker Mako) eliminate hand tremor, scale surgeon motion, and articulate miniature wrist tools with 7 degrees of freedom inside human body cavities—enabling minimally invasive surgeries with smaller incisions, less blood loss, and faster patient recovery.",
    h: [
      "Master surgeon console captures hand movements, filtering physiological tremor and scaling motion.",
      "Multi-articulated EndoWrist instruments articulate with 7 DoF inside laparoscopic trocars.",
      "High-definition 3D stereo endoscopes project magnified stereoscopic surgical views to the surgeon's eyes.",
      "Haptic boundaries on orthopedic robots prevent cutting tools from breaching pre-planned bone resection margins."
    ],
    k: [
      ["10M+ surgeries", "performed globally with Intuitive Surgical da Vinci systems"],
      ["0.1 mm", "motion scaling and tremor cancellation for ultra-fine micro-vascular suturing"],
      ["FDA Class III", "highest medical device regulatory scrutiny and statutory clinical trial requirements"]
    ],
    c: 3,
    x: "Intuitive Surgical holds an immense clinical and patent moat in soft-tissue laparoscopic surgery; Stryker and Medtronic lead orthopedic and spine robotics.",
    co: [
      ["Intuitive Surgical", "World pioneer and dominant leader in robotic-assisted minimally invasive surgery (da Vinci)", "intuitive.com", "US"],
      ["Stryker (Mako Surgical)", "Mako robotic-arm assisted orthopedic surgery for total knee, partial knee, and hip", "stryker.com", "US"],
      ["Medtronic (Hugo RAS)", "Hugo robotic-assisted surgery system and Mazor robotic spine navigation", "medtronic.com", "US"],
      ["Johnson & Johnson (Ottava / Monarch)", "Robotic-assisted surgery and endoluminal robotic bronchoscopy platforms", "jnjmedtech.com", "US"],
      ["CMR Surgical", "Versius modular surgical robotic system expanding access to minimal access surgery", "cmrsurgical.com", "GB"],
      ["Globus Medical (ExcelsiusGPS)", "Robotic navigation and positioning systems for spine and orthopedic surgery", "globusmedical.com", "US"]
    ]
  },
  {
    i: "avdrone", L: 24, n: "Autonomous vehicles & inspection UAS",
    s: "Industrial yard trucks, mining haulers, and infrastructure inspection drones (Boundary Vertical)",
    w: "Industrial logistics yards, open-pit mines, and utility infrastructure deploy autonomous heavy haulers and unmanned aerial systems (UAS). Autonomous yard trucks move shipping trailers across intermodal hubs, 300-ton mining trucks haul ore autonomously in Western Australia, and autonomous drone docks inspect power lines and oil pipelines daily.",
    h: [
      "Multi-LiDAR, radar, and camera fusion builds 360° situational awareness for heavy 40-ton vehicles.",
      "Drive-by-wire electro-pneumatic brake and steering actuators execute trajectory tracking.",
      "Autonomous docking stations launch, land, and recharge inspection drones without human pilots.",
      "High-definition 3D geospatial maps and RTK-GNSS maintain centimeter-level vehicle localization."
    ],
    k: [
      ["300+ tons", "autonomous mining haul truck payload operating 24/7 in Australian iron ore mines"],
      ["100% autonomous", "inspection flights launched from sealed weatherproof drone-in-a-box stations"],
      ["Boundary Station", "shares common sensing, actuation, and compute substrates without replicating full automotive supply"]
    ],
    c: 2,
    x: "Declared boundary vertical (Decision D2). Shares common sensing, compute, and battery substrates with robotics without modelling the entire automotive/aerospace Tier-1 supply chain.",
    co: [
      ["Outrider", "Autonomous distribution yard trucks, trailer positioning, and automated brake line coupling", "outrider.ai", "US"],
      ["Caterpillar (Autonomous Mining)", "Cat Command for hauling — autonomous 300-ton mining truck fleet operations", "caterpillar.com", "US"],
      ["Skydio", "Autonomous AI inspection drones, 360° obstacle avoidance, and Skydio Dock systems", "skydio.com", "US"],
      ["DJI (Enterprise)", "Industrial inspection drones, thermal imaging payloads, and automated DJI Dock infrastructure", "dji.com", "CN"],
      ["Kodiak Robotics", "Autonomous trucking technology and defense vehicle autonomy systems", "kodiak.ai", "US"],
      ["Einride", "Autonomous electric freight pods and commercial transportation ecosystems", "einride.tech", "SE"]
    ]
  },
  {
    i: "lastmile", L: 24, n: "Last-mile & sidewalk delivery rovers",
    s: "Autonomous sidewalk delivery pods and parcel delivery rovers (Boundary Vertical)",
    w: "Last-mile delivery represents over 50% of total parcel shipping costs. Autonomous sidewalk delivery rovers and compact road pods navigate urban sidewalks, bike lanes, and residential neighborhoods, delivering food orders and e-commerce parcels directly to doorsteps at a fraction of manual courier costs.",
    h: [
      "Low-profile 6-wheeled electric chassis climb curbs and navigate sidewalk pedestrian traffic.",
      "Multi-camera vision and ultrasonic sonar sensors detect pedestrians, pets, and driveway hazards.",
      "GPS/cellular tracking alerts customers, who unlock the insulated parcel compartment via smartphone app.",
      "Remote teleoperation centers step in when sidewalk rovers encounter blocked crosswalks or road construction."
    ],
    k: [
      ["5M+ commercial", "autonomous sidewalk deliveries completed globally (Starship Technologies)"],
      ["$1–$2 / delivery", "operating unit cost vs $5–$10 for gig-economy human courier delivery"],
      ["4–6 km/h", "safe sidewalk cruising speed matching pedestrian walking pace"]
    ],
    c: 1,
    x: "Declared boundary vertical (Decision D2). Relies on municipal regulatory sidewalk permissions, ADA compliance, and low-cost manufacturing.",
    co: [
      ["Starship Technologies", "World leader in autonomous sidewalk delivery rovers operating on college campuses and towns", "starship.xyz", "US"],
      ["Nuro", "Autonomous zero-occupant on-road electric delivery vehicles for grocery and parcel logistics", "nuro.ai", "US"],
      ["Serve Robotics (Uber spinout)", "Sidewalk delivery robots serving food delivery platforms in major US metros", "serverobotics.com", "US"],
      ["Ottonomy.IO", "Autonomous delivery robots operating across indoor airports and outdoor curbs", "ottonomy.io", "US"],
      ["Coco Delivery", "Remotely piloted electric sidewalk delivery rovers for urban restaurant takeout", "cocodelivery.com", "US"],
      ["Neolix", "Autonomous delivery vans and mobile retail vending pods in China and Europe", "neolix.cn", "CN"]
    ]
  },
  {
    i: "construct", L: 24, n: "Construction & heavy civil automation",
    s: "Robotic bricklaying, concrete 3D printing, rebar tying, and autonomous excavation (Boundary Vertical)",
    w: "Construction is one of the least digitized and most dangerous industries in the global economy. Autonomous construction machinery—including 3D concrete printing gantries, robotic rebar-tying arms (TyBot), and autonomous excavators—executes heavy earthmoving, foundation pouring, and structural framing with millimeter precision.",
    h: [
      "Large-scale Cartesian gantry systems extrude high-slump quick-setting concrete layer by layer.",
      "Gantry-mounted robotic arms with machine vision locate rebar intersections and tie wire in <1 second.",
      "Autonomous excavators use GNSS and 3D terrain models to dig building foundations to exact grade.",
      "Laser scanning mobile robots autonomously map construction sites overnight, comparing progress against BIM models."
    ],
    k: [
      ["1,000 ties/hr", "rebar tying speed achieved by autonomous bridge-deck tying robots"],
      ["48 hours", "continuous 3D concrete printing time to complete building structural walls"],
      ["cm-level", "autonomous grading and trenching precision eliminating manual surveying stakes"]
    ],
    c: 1,
    x: "Declared boundary vertical (Decision D2). Operates under extreme outdoor mud, dust, weather, and strict civil engineering building codes.",
    co: [
      ["ICON 3D", "Advanced 3D construction printing technology, robotics, and building materials", "iconbuild.com", "US"],
      ["Advanced Construction Robotics (TyBot)", "Autonomous rebar-tying (TyBot) and rebar-placing (IronBot) robots", "constructionrobotics.com", "US"],
      ["Built Robotics", "Exosystem converting standard excavators into fully autonomous trenching robots", "builtrobotics.com", "US"],
      ["Dusty Robotics", "FieldPrinter autonomous layout robots printing full BIM blueprints on construction floors", "dustyrobotics.com", "US"],
      ["Komatsu (Smart Construction)", "Autonomous excavators, bulldozers, and digital drone jobsite mapping", "komatsu.com", "JP"],
      ["COBOD International", "World market leader in 3D construction printing gantry robotics (BOD2)", "cobod.com", "DK"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 25: INTERFACE
  // ------------------------------------------------------------
  {
    i: "pendant", L: 25, n: "Industrial teach pendants & lead-through",
    s: "Handheld teach pendants, 3-position deadman switches, and kinesthetic guiding",
    w: "Before a robot can weld a car door, an operator must teach it the desired trajectory. Industrial teach pendants provide ruggedized touchscreen interfaces with physical emergency stop buttons and 3-position deadman enabling switches, while modern collaborative robots feature zero-gravity kinesthetic lead-through teaching by directly grabbing the tool.",
    h: [
      "3-position enabling switches ('deadman switches') require mid-position hold: panicking (clenching) or releasing drops power.",
      "Kinesthetic lead-through uses joint torque sensors and gravity compensation to make the arm feel weightless in human hands.",
      "Operators press button points at key poses, which the controller interpolates into linear (MOVL) or circular (MOVC) motion.",
      "Ruggedized IP54 housings survive repeated 1.5-meter drops onto concrete factory floors."
    ],
    k: [
      ["3-position", "enabling switch mandated by ISO 10218-1 for safe manual teach mode operation"],
      ["zero-gravity", "hand guiding mode: joint torque sensors compensate link mass so arm floats effortlessly in air"],
      ["IP54 drop-tested", "ruggedized enclosure designed for oily, harsh industrial plant floors"]
    ],
    c: 2,
    x: "Standardized user interface across traditional robotics; Fanuc, Yaskawa, ABB, and KUKA teach pendant workflows require dedicated operator training.",
    co: [
      ["Fanuc (iPendant)", "Touch-screen color iPendant with integrated 3D graphics and safety switches", "fanucamerica.com", "US"],
      ["ABB Robotics (FlexPendant)", "FlexPendant graphical handheld programming unit running RobotStudio", "abb.com", "SE"],
      ["Yaskawa Motoman (Smart Pendant)", "Smart Pendant with intuitive Smart Frame technology for simplified programming", "yaskawa.com", "US"],
      ["KUKA Robotics (smartPAD)", "KUKA smartPAD industrial touch programming pendant", "kuka.com", "DE"],
      ["Universal Robots (Teach Pendant)", "12-inch touchscreen collaborative teach pendant running Polyscope software", "universal-robots.com", "DK"],
      ["Euchner GmbH", "Handheld enabling switches, safety pendants, and industrial human-machine interfaces", "euchner.de", "DE"]
    ]
  },
  {
    i: "nlprog", L: 25, n: "Natural-language & no-code programming",
    s: "Visual block programming, tablet-based flow builders, and speech interfaces",
    w: "Traditional robot programming required proprietary vendor scripting languages (Fanuc Karel, KUKA KRL, ABB RAPID), creating a massive shortage of certified automation programmers. No-code graphical flow builders and natural-language programming allow non-technical shop-floor operators to teach robots new tasks in minutes using tablet interfaces or voice instructions.",
    h: [
      "Visual drag-and-drop block interfaces (Blockly-style) assemble complex logic without syntax errors.",
      "Tablet vision apps allow operators to tap on live camera video to designate target pick objects.",
      "Large Language Model interpreters convert natural-language prompts ('sort blue parts into box A') into underlying API calls.",
      "Augmented reality (AR) overlays project projected robot trajectories and safety keep-out zones onto the floor."
    ],
    k: [
      ["<15 minutes", "to teach a brand-new pick-and-place task without writing a single line of code"],
      ["80% reduction", "in software integration and commissioning labor costs for flexible SME manufacturing"],
      ["multi-vendor", "no-code platforms generating native code for ABB, Fanuc, KUKA, and Universal Robots"]
    ],
    c: 2,
    x: "Democratizes robotics adoption for small and medium enterprises (SMEs) that cannot afford full-time robotics software engineers.",
    co: [
      ["Wandelbots", "Wandelbots NOVA and Teaching Pen for no-code multi-vendor robot programming", "wandelbots.com", "DE"],
      ["Robotiq (Lean Robotics)", "Plug-and-play collaborative software suites and application kits", "robotiq.com", "CA"],
      ["Ready Robotics", "ForgeOS — universal industrial operating system for multi-brand robot programming", "ready-robotics.com", "US"],
      ["Universal Robots (PolyScope)", "Pioneered intuitive graphical touch-screen robot programming for cobots", "universal-robots.com", "DK"],
      ["Augmentir", "AI-based connected worker platform and augmented reality industrial workflows", "augmentir.com", "US"],
      ["Cobot Lift", "No-code software and collaborative robotic palletizing automation kits", "cobot-lift.com", "DK"]
    ]
  },
  {
    i: "commission", L: 25, n: "Virtual commissioning & offline programming",
    s: "Process Simulate, RobotStudio, and DELMIA validating 3D workcells before install",
    w: "Shutting down an active car factory for three weeks to debug robot code costs millions of dollars per hour. Virtual Commissioning (Offline Programming / OLP) builds a physics-accurate 3D digital twin of the entire manufacturing cell, validating robot reachability, cycle times, PLC ladder logic, and multi-robot interlocks in software before physical installation.",
    h: [
      "Complete CAD cell geometry, robot kinematics, tooling, and clamping fixtures are assembled in 3D.",
      "Virtual PLC software (Hardware-in-the-Loop / Software-in-the-Loop) connects directly to the digital twin.",
      "Automated trajectory optimizers minimize cycle times and check for swept-volume collisions.",
      "Post-processors generate 100% syntactically correct native robot code uploaded directly to physical controllers."
    ],
    k: [
      [">90%", "of software and PLC debugging completed virtually before physical steel is bolted to the floor"],
      ["weeks to days", "reduction in on-site physical commissioning and changeover downtime"],
      ["cycle time prediction", "accuracy within ±1% of physical robot cell throughput"]
    ],
    c: 2,
    x: "Siemens (Tecnomatix), Dassault Systèmes (DELMIA), and ABB RobotStudio dominate enterprise automotive and aerospace manufacturing engineering.",
    co: [
      ["Siemens Digital Industries (Tecnomatix)", "Process Simulate — industry benchmark for virtual commissioning and robotics OLP", "siemens.com", "DE"],
      ["Dassault Systèmes (DELMIA)", "Digital manufacturing, 3D simulation, and robotic offline programming software", "3ds.com", "FR"],
      ["ABB Robotics (RobotStudio)", "RobotStudio — leading robot simulation, offline programming, and virtual commissioning tool", "abb.com", "SE"],
      ["RoboDK", "Universal offline programming, post-processors, and robot simulation software", "robodk.com", "CA"],
      ["Visual Components", "3D factory layout, material flow simulation, and robot offline programming", "visualcomponents.com", "FI"],
      ["Rockwell Automation (Emulate3D)", "Dynamic digital twin software for virtual commissioning and material handling", "rockwellautomation.com", "US"]
    ]
  },
  {
    i: "perimeter", L: 25, n: "Safety laser scanners & light curtains",
    s: "Type 4 optical safety light curtains and multi-zone safety area scanners",
    w: "To protect human workers from entering high-speed industrial robot workcells without building permanent opaque walls, electro-sensitive protective equipment (ESPE) monitors physical space. Type 4 optical safety light curtains and multi-zone safety laser scanners create invisible infrared safety planes, tripping hardware E-stops within milliseconds if an arm or body breaks the beam.",
    h: [
      "Infrared LED emitter bars project dense parallel light beams (14–30 mm resolution) to receiver bars.",
      "Multi-channel microprocessor logic monitors light reception; any interrupted beam trips redundant OSSD safety outputs.",
      "Safety laser scanners sweep Time-of-Flight laser beams horizontally across 275°, monitoring custom-drawn Warning and Stop zones.",
      "Muting sensors distinguish between a human walking in (triggering a stop) vs an automated pallet entering (allowing muting)."
    ],
    k: [
      ["<15 ms", "optical detection and hardware OSSD output switching response time"],
      ["14 mm resolution", "finger detection capability on high-resolution safety light curtains"],
      ["Type 4 / SIL 3", "highest safety integrity level certification according to IEC 61496-1/-2"]
    ],
    c: 2,
    x: "SICK, Keyence, Omron, and Pilz dominate certified industrial optoelectronic safety sensors.",
    co: [
      ["SICK AG", "Invented the optical safety light curtain and safety laser scanner (microScan3, deTec)", "sick.com", "DE"],
      ["Keyence Corporation (Safety)", "High-performance safety laser scanners, light curtains, and safety interlocks", "keyence.com", "JP"],
      ["Omron Automation (Safety)", "F3SG safety light curtains and OS32C safety laser scanners for machinery", "automation.omron.com", "JP"],
      ["Pilz GmbH (Sensor Technology)", "PSENopt safety light curtains and PSENscan safety laser scanners", "pilz.com", "DE"],
      ["Banner Engineering (Safety)", "EZ-SCREEN safety light curtains and SC26 safety controllers", "bannerengineering.com", "US"],
      ["Schmersal Group", "Optoelectronic safety light grids and heavy-duty industrial interlocks", "schmersal.com", "DE"]
    ]
  },
  {
    i: "ssm", L: 25, n: "Speed-and-separation & 3D safety zones",
    s: "3D safety camera systems monitoring human proximity and dynamically throttling speed",
    w: "Traditional light curtains enforce binary behavior: either the robot runs at 100% speed or stops dead when a beam breaks. Speed and Separation Monitoring (SSM / ISO/TS 15066) uses ceiling-mounted 3D safety cameras to track human workers in real time, smoothly throttling robot TCP speed from 2.0 m/s down to 0.5 m/s as a worker approaches, and resuming full speed as they walk away.",
    h: [
      "Ceiling-mounted 3D Time-of-Flight or stereo safety camera systems monitor the entire 3D volume around the robot.",
      "Safety software tracks human skeletal positions and calculates dynamic protective safety distances in real time.",
      "Dynamic speed zones continuously scale robot axis velocities via Safe Motion over EtherCAT.",
      "Eliminates unnecessary emergency stops, maximizing manufacturing productivity while ensuring zero human collision."
    ],
    k: [
      ["0–100% dynamic", "speed scaling based on instantaneous human worker distance and velocity vector"],
      ["30–50% throughput", "increase in collaborative workstations by replacing hard stops with dynamic slowdowns"],
      ["ISO 13849 PL d", "certified 3D spatial safety monitoring volume coverage"]
    ],
    c: 2,
    x: "Veo Robotics and Pilz developed the first certified 3D dynamic speed and separation monitoring camera systems.",
    co: [
      ["Veo Robotics", "FreeMove — 3D safety camera system enabling industrial robots to work safely alongside humans", "veorobotics.com", "US"],
      ["Pilz GmbH (SafetyEYE)", "SafetyEYE — first safe 3D camera system for three-dimensional zone monitoring", "pilz.com", "DE"],
      ["SICK AG (Safe Motion)", "safeVisionary2 3D Time-of-Flight camera for dynamic safety zone protection", "sick.com", "DE"],
      ["Cognex (Industrial Safety)", "3D vision and industrial sensing solutions for robotic workspace monitoring", "cognex.com", "US"],
      ["Inxpect", "3D safety radar systems certified for dynamic speed-and-separation in harsh environments", "inxpect.com", "IT"],
      ["Universal Robots (Safety Core)", "Integrated software-configurable safety zones and speed limits", "universal-robots.com", "DK"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 26: CAPITAL & CONTROL
  // ------------------------------------------------------------
  {
    i: "raas", L: 26, n: "Robots-as-a-Service (RaaS) & leasing",
    s: "Operational expense subscription models charging per pick, hour, or square meter",
    w: "Buying an industrial robotic workcell requires $100k–$500k in upfront capital expenditure (capex) and a 12–18 month engineering lead time. Robots-as-a-Service (RaaS) eliminates upfront capex by leasing robots as an operational expense (opex), charging customers purely on throughput ($0.05 per pick, $8 per operating hour, or $0.01 per cleaned sq ft) inclusive of maintenance, software updates, and remote assistance.",
    h: [
      "Hardware, software, deployment, and ongoing maintenance are bundled into a single ongoing subscription.",
      "Billing engines ingest real-time robot telemetry (picks completed, runtime hours, square feet cleaned).",
      "Asset-backed debt facilities and infrastructure funds finance the upfront hardware manufacturing cost.",
      "Guaranteed uptime SLAs ensure the RaaS provider bears the financial risk of hardware breakdowns."
    ],
    k: [
      ["$0 capex", "upfront hardware investment for enterprise warehouse and facility customers"],
      ["3–6 months", "to positive customer ROI compared to 2–4 year payback periods on capex purchases"],
      ["RaaS market", "projected to exceed $50B by 2030 across logistics, cleaning, and manufacturing"]
    ],
    c: 2,
    x: "Shifts capital risk to the robotics OEM, requiring massive debt financing facilities to fund hardware fleets sitting on customer balance sheets.",
    co: [
      ["Locus Robotics", "Pioneered large-scale RaaS deployment model for warehouse collaborative picking", "locusrobotics.com", "US"],
      ["Formic Technologies", "Robotics-as-a-Service provider delivering automated palletizing and machine tending on opex", "formic.co", "US"],
      ["Ambi Robotics", "RaaS parcel sorting automation deployed across major commercial postal networks", "ambirobotics.com", "US"],
      ["Rapid Robotics", "RaaS machine tending, heat-staking, and secondary manufacturing automation", "rapidrobotics.com", "US"],
      ["Brain Corp (RaaS Partners)", "Software platform enabling OEM partners to offer commercial scrubbers on RaaS", "braincorp.com", "US"],
      ["Symbotic", "Multi-billion-dollar supply-chain automation contracts structured as managed system services", "symbotic.com", "US"]
    ]
  },
  {
    i: "capexpolicy", L: 26, n: "Capex, industrial subsidies & automation tax",
    s: "Government manufacturing tax credits, robot adoption subsidies, and sovereign funds",
    w: "Global adoption of industrial robotics is heavily influenced by national industrial policy. Government initiatives—such as Section 179 accelerated depreciation in the US, China's Made in China 2025 subsidies, South Korea's Intelligent Robot Development Act, and European automation innovation grants—subsidize robot capital costs by 20–50%, accelerating factory automation adoption.",
    h: [
      "Accelerated capital depreciation rules allow businesses to deduct 100% of robot equipment cost in Year 1.",
      "Direct municipal and regional subsidies co-fund up to 30–50% of collaborative robot purchase costs for local SMEs.",
      "Sovereign wealth funds and state industrial banks inject billions into domestic humanoid and core component startups.",
      "Import tariffs protect domestic motor, reducer, and robot manufacturing against foreign dumping."
    ],
    k: [
      ["~50%", "of all global industrial robot installations in 2023–2025 occurred inside Chinese manufacturing plants"],
      ["Section 179 / Bonus Depr", "U.S. tax code accelerating 100% equipment capex write-off in year of deployment"],
      ["billions in subsidies", "deployed annually by South Korea, Japan, China, and Germany to secure robotics leadership"]
    ],
    c: 2,
    x: "Changes in government depreciation tax policy or industrial subsidies cause wild swings in annual robot order volumes.",
    co: [
      ["Ministry of Industry and Information Technology (MIIT)", "China's central ministry directing national robotics subsidies and supply chain targets", "miit.gov.cn", "CN"],
      ["U.S. Department of Commerce (NIST/CHIPS)", "Administers U.S. manufacturing innovation institutes and advanced automation grants", "commerce.gov", "US"],
      ["METI (Ministry of Economy, Trade and Industry)", "Japan's ministry directing New Robot Strategy and robotics development roadmaps", "meti.go.jp", "JP"],
      ["MOTIE (Ministry of Trade, Industry and Energy)", "South Korea's ministry implementing Intelligent Robot Development and Promotion plans", "motie.go.kr", "KR"],
      ["European Commission (Horizon Europe / Made in Europe)", "EU multi-billion euro funding program for advanced manufacturing and AI robotics", "ec.europa.eu", "BE"],
      ["A3 (Association for Advancing Automation)", "Advocates for pro-automation tax policy and workforce training in North America", "automate.org", "US"]
    ]
  },
  {
    i: "exportctl", L: 26, n: "Export controls & dual-use regulations",
    s: "ITAR, EAR, and Wassenaar Arrangement restrictions on motors, magnets, and AI",
    w: "Because advanced multi-axis robotics, high-density frameless motors, and tactile sensors have direct military and aerospace applications (missile gimbals, autonomous weapons, military quadrupeds), they are subject to strict export controls. Multilateral frameworks (Wassenaar Arrangement), U.S. EAR/ITAR, and Chinese rare-earth/magnet export restrictions strictly regulate cross-border shipment.",
    h: [
      "Export Control Classification Numbers (ECCN) classify high-torque motors, 5-axis machine tools, and tactile sensors.",
      "End-user declarations and import licenses prevent diversion of industrial robotic hardware to sanctioned entities.",
      "Chinese export controls restrict export of heavy rare-earth separation technology and magnetic manufacturing IP.",
      "U.S. BIS entity listings restrict access to advanced GPU silicon and robotic simulation tools for foreign defense groups."
    ],
    k: [
      ["Wassenaar Arrangement", "multilateral export control regime for dual-use goods and advanced technologies (42 states)"],
      ["ITAR / EAR", "U.S. International Traffic in Arms Regulations governing military robotics and drone components"],
      ["2024–2026 sanctions", "expanding export controls on humanoid robot components, high-torque actuators, and rare earth processing"]
    ],
    c: 3,
    x: "Geopolitical export controls are redrawing the global robotics supply chain, forcing Western OEMs to seek non-Chinese magnet supply while Chinese OEMs localize harmonic reducers and edge SoCs.",
    co: [
      ["U.S. Bureau of Industry and Security (BIS)", "Administers Export Administration Regulations (EAR) and Entity List restrictions", "bis.doc.gov", "US"],
      ["Ministry of Commerce of China (MOFCOM)", "Administers Chinese export control lists on rare earths, magnets, and dual-use technologies", "mofcom.gov.cn", "CN"],
      ["Wassenaar Arrangement Secretariat", "Multilateral secretariat coordinating dual-use export control lists across 42 nations", "wassenaar.org", "AT"],
      ["BAFA (Federal Office for Economic Affairs)", "German agency enforcing dual-use export controls on machine tools and automation", "bafa.de", "DE"],
      ["Directorate of Defense Trade Controls (DDTC)", "U.S. State Department agency regulating ITAR defense articles and robotic systems", "pmddtc.state.gov", "US"],
      ["METI (Security Export Control)", "Japan's export control authority regulating advanced machine tools and robotic components", "meti.go.jp", "JP"]
    ]
  },
  {
    i: "liability", L: 26, n: "Robot liability, insurance & underwriting",
    s: "Product liability insurance, bodily injury indemnification, and risk underwriting",
    w: "If an autonomous forklift or humanoid robot malfunctions and injures a worker or damages a million-dollar stamping press, who is legally liable: the robot OEM, the software foundation model provider, the integrator, or the facility operator? Commercial insurance underwriters write specialized product liability and cyber-physical property policies to indemnify automated operations.",
    h: [
      "Contracts strictly partition liability between OEM (defect in design), integrator (commissioning error), and user (operating out of spec).",
      "Actuarial models assess facility safety architecture (safety scanner density, worker training) to price premiums.",
      "Black-box telemetry logging provides tamper-proof flight-recorder logs to establish root-cause fault during litigation.",
      "Statutory strict liability laws (EU AI Liability Directive / Product Liability Directive) hold manufacturers strictly liable for autonomous defects."
    ],
    k: [
      ["EU AI Liability Directive", "European regulatory framework easing burden of proof for AI-caused physical damage"],
      ["$5M–$20M", "standard commercial umbrella liability insurance required per automated facility deployment"],
      ["tamper-proof logging", "mandated by underwriters to reconstruct sensor and control states preceding incidents"]
    ],
    c: 2,
    x: "Enterprise customers will not sign multi-million dollar robotics contracts without comprehensive indemnification and third-party insurance backing.",
    co: [
      ["Munich Re", "World leader in reinsurance and innovative performance warranty insurance for AI and automation", "munichre.com", "DE"],
      ["Swiss Re", "Global reinsurance group underwriting industrial robotics, property, and cyber-physical risks", "swissre.com", "CH"],
      ["Travelers Insurance", "Commercial industrial insurance and robotic machinery breakdown coverage", "travelers.com", "US"],
      ["Allianz Global Corporate & Specialty (AGCS)", "Specialized industrial automation, product liability, and robotic risk underwriting", "allianz.com", "DE"],
      ["Chubb", "Global property and casualty insurance for advanced technology manufacturing and robotics", "chubb.com", "US"],
      ["Marsh McLennan", "World's leading insurance broker structuring risk management solutions for autonomous fleets", "marsh.com", "US"]
    ]
  },
  {
    i: "mechip", L: 26, n: "Mechatronic patents & transmission IP",
    s: "Defensive patent thickets on strain-wave tooth profiles, dual encoders, and dexterous hands",
    w: "The precision robotics industry is protected by dense patent thickets. Harmonic Drive Systems, Nabtesco, Heidenhain, and Fanuc hold thousands of patents covering conjugate tooth profiles, flexspline metallurgical treatments, integrated dual-encoder hollow-shaft hubs, and dexterous hand linkages. New entrants must navigate or license this IP to avoid multi-year patent infringement injunctions.",
    h: [
      "Conjugate gear tooth curves (e.g., S-tooth, double-circular-arc) are patented to maximize tooth contact area.",
      "Hollow-shaft packaging patents protect concentric integration of motor stator, wave generator, and bearing.",
      "Dual-encoder calibration and online gear backlash estimation algorithms are protected by software patents.",
      "Patent licensing agreements and cross-licensing pacts allow major Japanese and European OEMs to co-exist."
    ],
    k: [
      ["20 years", "patent exclusivity duration protecting breakthrough mechanical transmission geometry"],
      ["10,000+ patents", "filed globally on robotic joint actuators, harmonic drives, and dexterous hands"],
      ["multi-million dollar", "patent litigation risks when entering U.S., European, and Japanese automation markets"]
    ],
    c: 2,
    x: "Leaderdrive and other emerging reducer manufacturers had to engineer proprietary non-infringing tooth profile curves (e.g., Y-series tooth profile) to sell globally.",
    co: [
      ["Harmonic Drive Systems (IP Portfolio)", "Foundational and defensive patent portfolio covering strain-wave gearing and mechatronics", "harmonicdrive.net", "JP"],
      ["Nabtesco Corporation (IP Div)", "Extensive patent portfolio protecting RV cycloidal pin-wheel reducers and gear tooth geometry", "nabtesco.com", "JP"],
      ["Heidenhain (Patent Portfolio)", "Global patent portfolio covering optical absolute scanning reticles and EnDat protocol", "heidenhain.de", "DE"],
      ["Fanuc Corporation (IP Division)", "Massive patent portfolio covering robotic mechanical kinematics, servo control, and CNC", "fanuc.co.jp", "JP"],
      ["Leaderdrive (R&D / IP)", "Proprietary Y-series and P-series harmonic drive tooth profile patent portfolio", "leaderdrive.com", "CN"],
      ["WPO (World Intellectual Property Organization)", "UN agency administering the Patent Cooperation Treaty (PCT) for international filings", "wipo.int", "CH"]
    ]
  },
  {
    i: "labourlaw", L: 26, n: "Labour regulations & works council approvals",
    s: "Works council deployment agreements, ergonomic standards, and worker consent",
    w: "In Germany, France, Scandinavia, and unionized manufacturing facilities worldwide, installing a robot is not purely a management decision. Codetermination laws mandate formal consultation with labor unions and Works Councils (Betriebsrat). Deployments must prove compliance with ergonomic workplace standards, privacy laws (GDPR restrictions on camera facial recognition), and worker health protections.",
    h: [
      "Works Councils audit robotic installations to verify employee psychological safety and workload impact.",
      "Workplace privacy agreements require anonymization or blurring of worker faces captured by robot cameras (GDPR).",
      "Ergonomic health assessments (NIOSH lifting equation / REBA score) demonstrate robots eliminate hazardous heavy lifting.",
      "Formal retraining agreements ensure displaced human operators transition to robot technician and supervisor roles."
    ],
    k: [
      ["Betriebsrat (Works Council)", "formal statutory approval required before deploying autonomous robots in German industrial plants"],
      ["GDPR compliance", "strict privacy enforcement restricting video recording of workers in EU factories"],
      ["zero operator layoff", "commitments frequently negotiated in exchange for union automation deployment consent"]
    ],
    c: 2,
    x: "Failure to achieve union and works council alignment can stall robotics rollouts for months in European automotive and manufacturing plants.",
    co: [
      ["IG Metall", "Germany's largest industrial trade union negotiating automation codetermination agreements", "igmetall.de", "DE"],
      ["DGUV (German Social Accident Insurance)", "Statutory accident insurance setting workplace safety and robotic ergonomic rules", "dguv.de", "DE"],
      ["OSHA (Occupational Safety and Health Admin)", "U.S. Department of Labor agency setting workplace safety regulations for robotics", "osha.gov", "US"],
      ["United Auto Workers (UAW)", "U.S. labor union negotiating automation protections and technology deployment rules", "uaw.org", "US"],
      ["European Trade Union Institute (ETUI)", "Research institute analyzing AI, automation, and labor rights in the European Union", "etui.org", "BE"],
      ["ILO (International Labour Organization)", "UN agency setting international labour standards on technology transition and safety", "ilo.org", "CH"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 27: RETURN & RESIDUE
  // ------------------------------------------------------------
  {
    i: "payback", L: 27, n: "Unit payback & cost per hour",
    s: "Calculating capital amortisation vs fully-loaded human wage equivalents",
    w: "At the end of the entire chain sits a single economic equation: does the robot cost less per hour than the human labor it replaces or augments? Unit payback analysis amortizes the robot's upfront purchase price, energy draw, maintenance, and facility overhead against fully-loaded human wages ($25–$45/hr in US manufacturing, $35–$60/hr in Europe), yielding true payback periods across 1-shift, 2-shift, or 3-shift operations.",
    h: [
      "Total Cost of Ownership (TCO) aggregates capital amortisation, energy ($/kWh), preventative maintenance, and tooling wear.",
      "Fully-loaded human wage equivalents include base wages, health insurance, overtime, payroll taxes, and worker's compensation.",
      "Payback period is calculated: $\text{Payback (Years)} = \frac{\text{Initial Capital Investment}}{\text{Annual Net Labor Savings} - \text{Annual Operating Costs}}$.",
      "Running 3 shifts (24/7 operation) triples annual labor hours, compressing payback periods from 3 years down to under 12 months."
    ],
    k: [
      ["12–24 months", "target payback period for industrial and collaborative robot installations in high-wage economies"],
      ["$4–$8 / hour", "fully-loaded operating cost of an industrial robot arm amortized over an 8-year service life"],
      ["3-shift operation", "the single largest lever accelerating robotics return on capital investment"]
    ],
    c: 3,
    x: "The terminal economic justification for the entire physical-intelligence stack. If net cost per hour does not undercut prevailing labor rates, adoption halts.",
    co: [
      ["A3 (Association for Advancing Automation)", "Publishes industrial robotics ROI calculators and economic adoption data", "automate.org", "US"],
      ["Universal Robots (ROI Tools)", "Interactive cobot payback calculators and cost-per-hour comparison tools", "universal-robots.com", "DK"],
      ["McKinsey & Company (Operations)", "Global automation economics, labor productivity, and robotics capital consulting", "mckinsey.com", "US"],
      ["Boston Consulting Group (BCG)", "Robotics and advanced manufacturing practice analyzing industrial TCO", "bcg.com", "US"],
      ["International Federation of Robotics (IFR)", "World Robotics annual statistical reports on robot density and economic impact", "ifr.org", "DE"],
      ["ARK Invest (Automation Research)", "Research and financial models on Wright's Law cost declines in industrial and humanoid robotics", "ark-invest.com", "US"]
    ]
  },
  {
    i: "labourshift", L: 27, n: "Labour displacement & created roles",
    s: "Measuring shifted manual labor against new robotic technician and fleet jobs",
    w: "Industrial automation does not simply destroy jobs; it shifts labor from dangerous, repetitive, physically destructive tasks (lifting 30 kg boxes in hot containers, manual welding in toxic fumes) into new technical roles: robot cell programmers, fleet maintenance technicians, and remote teleoperation specialists.",
    h: [
      "Econometric tracking measures direct manual labor displacement across manufacturing and warehousing sectors.",
      "New career pathways emerge: Robot Integration Technicians, Fleet Supervisors, and Teleoperation Rescue Specialists.",
      "Workplace injury rates (musculoskeletal disorders, repetitive strain injuries) drop by over 80% in automated cells.",
      "Apprenticeship programs and vocational academies upskill former manual operators into certified automation engineers."
    ],
    k: [
      ["80%+ reduction", "in severe workplace musculoskeletal and repetitive strain injuries in automated workcells"],
      ["1 to 3 new roles", "created (technicians, integrators, programmers) per 10 industrial robots installed"],
      ["World Economic Forum", "Future of Jobs report analyzing net employment shifts from physical automation"]
    ],
    c: 1,
    x: "Navigating workforce transitions requires proactive corporate retraining programs and regional vocational certification partnerships.",
    co: [
      ["World Economic Forum (Future of Work)", "Global research and policy frameworks for automation-driven workforce transformation", "weforum.org", "CH"],
      ["Fanuc Academy", "Global vocational training centers certifying thousands of robot technicians annually", "fanucamerica.com", "US"],
      ["Universal Robots Academy", "Free online and in-person collaborative robot training certifying over 100,000 users", "universal-robots.com", "DK"],
      ["Yaskawa Academy", "Industrial robotics, welding, and automation training for plant operators", "yaskawa.com", "US"],
      ["MIT Task Force on the Work of the Future", "Academic research on technology adoption, wage inequality, and labor markets", "workofthefuture.mit.edu", "US"],
      ["OECD (Employment, Labour and Social Affairs)", "Policy analysis of automation, employment protection, and adult retraining", "oecd.org", "FR"]
    ]
  },
  {
    i: "refurb", L: 27, n: "Secondary markets & factory refurbishment",
    s: "Certified pre-owned robots, joint rebuilds, and controller retrofits",
    w: "A high-quality 6-axis articulated robot casting made by Fanuc, KUKA, or ABB does not wear out after its first 8-year automotive production cycle. A thriving secondary market buys decommissioned robots, completely tears down and rebuilds joint gearboxes, rewires internal harnesses, retrofits modern controllers, and resells certified pre-owned robots at 40–60% of new equipment cost.",
    h: [
      "Decommissioned robots are disassembled down to bare casting links and steam-cleaned.",
      "Gearboxes and crossed-roller bearings are inspected for wear; harmonic flexsplines and seals are replaced with virgin spares.",
      "Internal wire harnesses and encoder communication cables are 100% replaced.",
      "Controllers are retrofitted with modern software, and the robot undergoes 48-hour laser-calibrated burn-in testing."
    ],
    k: [
      ["40–60%", "cost discount on certified pre-owned industrial robots relative to brand-new list price"],
      ["10–15 years", "extended service life achieved through professional joint refurbishment and regreasing"],
      ["circular economy", "preventing thousands of tons of high-grade aluminium and steel castings from being scrapped"]
    ],
    c: 1,
    x: "Provides an affordable entry point for small job shops and universities; established industrial OEMs operate official factory refurbishment divisions.",
    co: [
      ["Surplus Record", "World's largest online directory for surplus and refurbished industrial machinery", "surplusrecord.com", "US"],
      ["UsedRobots.com (Robots Gallery)", "Leading European buyer, rebuilder, and reseller of certified used industrial robots", "usedrobots.com", "ES"],
      ["ABB Robotics (Certified Pre-Owned)", "Official manufacturer remanufacturing and certified pre-owned robot program", "abb.com", "SE"],
      ["KUKA Robotics (Refurbishment)", "Official factory overhaul, controller upgrades, and second-life robot certification", "kuka.com", "DE"],
      ["Eurobots", "Specialized refurbished industrial robots, spare parts, and custom robotic welding cells", "eurobots.net", "ES"],
      ["Robots.com (TIE Industrial)", "Industrial robot refurbishing, servo motor repair, and automation integration", "robots.com", "US"]
    ]
  },
  {
    i: "recycle", L: 27, n: "Magnet, motor & battery recycling",
    s: "Hydrometallurgical rare-earth recovery and circular battery recycling",
    w: "Decommissioned robots contain high-value strategic raw materials: sintered NdFeB magnets rich in Neodymium and Dysprosium, high-conductivity copper motor coils, and lithium-ion battery packs. Advanced hydrometallurgical recycling facilities crush old motors and batteries, dissolving and recovering 95%+ of virgin-grade rare earths, lithium, and copper for circular remanufacturing.",
    h: [
      "Robotic disassembly cells unbolt joint modules and extract permanent-magnet rotors and battery packs.",
      "Magnet scrap is demagnetized via heat treatment and shredded under inert atmosphere.",
      "Hydrometallurgical acid leaching and solvent extraction separate 99.5%+ pure Nd₂O₃ and Dy₂O₃ rare earth oxides.",
      "Spent lithium battery packs are shredded into 'black mass' to recover battery-grade lithium carbonate, nickel, and cobalt."
    ],
    k: [
      [">95%", "recovery efficiency of high-purity rare earth oxides from recycled NdFeB magnet scrap"],
      ["70–85%", "lower carbon emissions in recycled rare-earth refining vs virgin hard-rock mining"],
      ["closed-loop", "circular economy securing domestic critical mineral supply without foreign mine dependencies"]
    ],
    c: 2,
    x: "Recovering heavy rare earths from spent robotic motors is becoming a vital non-mining supply source for Europe and North America.",
    co: [
      ["Redwood Materials", "World leader in closed-loop lithium battery and critical materials recycling", "redwoodmaterials.com", "US"],
      ["Li-Cycle", "Commercial resource recovery from lithium-ion batteries using clean Spoke & Hub hydrometallurgy", "li-cycle.com", "CA"],
      ["Noveon Magnetics (Urban Mining)", "High-performance sintered NdFeB magnets made from 100% recycled rare earth magnets", "noveon.co", "US"],
      ["Umicore (Battery Recycling)", "Industrial closed-loop precious metal, rare earth, and battery recycling operations", "umicore.com", "BE"],
      ["Cyclic Materials", "Advanced circular supply chain for recycling rare earth elements from permanent magnets", "cyclicmaterials.earth", "CA"],
      ["Brunp Recycling (CATL Group)", "World's largest battery recycler recovering cathode precursors and battery metals", "brunp.com.cn", "CN"]
    ]
  },
  {
    i: "decom", L: 27, n: "Decommissioning & electronic asset disposition",
    s: "Certified e-waste disposition, battery disposal, and scrap metal processing",
    w: "When a robot reaches the end of its economic life and cannot be refurbished, certified Electronic Asset Disposition (ITAD) protocols govern its final decommissioning. Batteries are safely discharged and neutralized, hazardous hydraulic oils and grease are collected, and structural metals are shredded into raw scrap streams, closing the 27-strata loop back to the earth.",
    h: [
      "Industrial technicians execute safe de-energization, discharging internal DC bus capacitors and disconnecting batteries.",
      "Hazardous fluoropolymer greases and synthetic lubricants are drained and disposed of under environmental protocols.",
      "Printed circuit boards are shredded for precious metal recovery (gold, silver, palladium, copper).",
      "Structural cast iron and aluminium links are sheared, sorted by eddy current separators, and melted into recycled billet."
    ],
    k: [
      ["100% compliant", "hazardous material disposition meeting EU WEEE and RoHS environmental directives"],
      ["R2 / e-Stewards", "certified electronic asset disposition ensuring zero illegal toxic waste export"],
      ["full loop closure", "scrap steel and aluminium returned to Stratum 01/02 smelters as recycled furnace feed"]
    ],
    c: 1,
    x: "Ensures environmental compliance and prevents hazardous lithium battery fires in municipal waste streams.",
    co: [
      ["Sims Lifecycle Services (SLS)", "Global leader in IT asset disposition, electronic recycling, and circular economy", "simslifecycle.com", "US"],
      ["ERI (Electronic Recyclers International)", "World's largest fully integrated ITAD and electronic waste recycling company", "eridirect.com", "US"],
      ["Veolia", "Global ecological transformation, industrial hazardous waste management, and decommissioning", "veolia.com", "FR"],
      ["Remondis", "International recycling, industrial waste management, and raw material recovery group", "remondis.com", "DE"],
      ["TES (SK ecoplant)", "Sustainable technology lifecycle services, ITAD, and battery recycling", "tes-amm.com", "SG"],
      ["Schnitzer Steel (Radius Recycling)", "One of North America's largest recyclers of scrap metal and shredded alloys", "radiusrecycling.com", "US"]
    ]
  }
];
