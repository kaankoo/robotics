export const S15_S21 = [
  // ------------------------------------------------------------
  // STRATUM 15: FIRMWARE & REAL-TIME
  // ------------------------------------------------------------
  {
    i: "currentloop", L: 15, n: "High-frequency FOC current loops",
    s: "Space Vector Modulation and Clarke/Park transforms at 20–50 kHz",
    w: "The bedrock of electromagnetic motor control is the current loop. Field-Oriented Control (FOC) transforms 3-phase sinusoidal AC currents ($I_a, I_b, I_c$) into orthogonal DC reference frames ($I_d$ direct flux current, $I_q$ quadrature torque current). By driving $I_d \to 0$, 100% of current produces electromagnetic torque, minimizing resistive heat and maximizing torque linearity.",
    h: [
      "Clarke Transform maps 3-phase stationary currents ($a, b, c$) onto a 2-axis stationary frame ($α, β$).",
      "Park Transform rotates stationary $α, β$ currents onto a rotating rotor reference frame ($d, q$) using encoder angle $θ$.",
      "Proportional-Integral (PI) current controllers calculate output voltage vectors ($V_d, V_q$).",
      "Space Vector PWM (SVPWM) synthesizes 3-phase gate drive pulses, maximizing DC bus voltage utilization by 15.5%."
    ],
    k: [
      ["20–50 kHz", "closed-loop execution frequency on dedicated real-time DSP/MCU hardware"],
      ["<1 µs", "current sampling to PWM duty-cycle update calculation latency"],
      ["zero torque ripple", "achieved through online flux harmonic compensation"]
    ],
    c: 2,
    x: "FOC algorithms are well known, but implementing dead-time compensation, anti-windup, and phase-advance field weakening at 50 kHz with zero latency requires deep embedded firmware expertise.",
    co: [
      ["Texas Instruments (InstaSPIN)", "InstaSPIN-FOC motor control algorithms and embedded ROM software libraries", "ti.com", "US"],
      ["Synapticon GmbH (Motion Firmware)", "SOMANET motion control firmware and ultra-fast FOC current control loops", "synapticon.com", "DE"],
      ["Elmo Motion Control", "SimplIQ and Platinum motion control firmware with sub-microsecond servo loops", "elmomc.com", "IL"],
      ["STMicroelectronics (Motor Control)", "MC-SDK open-source Field-Oriented Control software development kit", "st.com", "CH"],
      ["SimpleFOC Community", "Open-source Field-Oriented Control firmware and embedded hardware ecosystem", "simplefoc.com", "FR"],
      ["Beckhoff Automation (TwinCAT Motion)", "TwinCAT 3 NC PTP and real-time servo drive control libraries", "beckhoff.com", "DE"]
    ]
  },
  {
    i: "fieldbus", L: 15, n: "Deterministic industrial fieldbuses",
    s: "EtherCAT, CAN-FD, and TSN protocols achieving <250 µs cycles with <1 µs jitter",
    w: "Coordinating 30–50 actuators and sensors across a humanoid robot requires a high-speed communication spine. EtherCAT (Ethernet for Control Automation Technology) uses 'processing on the fly', where a single Ethernet frame passes through all joint nodes in a daisy-chain ring, reading and injecting 32-bit position commands and torque feedback in microseconds.",
    h: [
      "A dedicated EtherCAT master (real-time Linux/IPC) transmits a single standard Ethernet frame.",
      "Dedicated hardware EtherCAT Slave Controllers (ESC) extract output commands and insert feedback data on the fly.",
      "Distributed Clocks (DC) synchronize all joint node execution clocks to within <100 nanoseconds.",
      "CAN-FD (Flexible Data-rate) provides a robust fallback bus (up to 5 Mbps) for auxiliary grippers and battery telemetry."
    ],
    k: [
      ["<250 µs", "cyclic communication update period across 30+ distributed joint nodes"],
      ["<100 ns", "hardware clock synchronization jitter achieved with EtherCAT Distributed Clocks"],
      ["100 Mbps / 1 Gbps", "full-duplex deterministic fieldbus bandwidth"]
    ],
    c: 3,
    x: "EtherCAT is the undisputed standard fieldbus for high-performance multi-axis robotics. Beckhoff maintains the core intellectual property and EtherCAT Technology Group (ETG) standards.",
    co: [
      ["Beckhoff Automation", "Invented EtherCAT technology and maintains master/slave IP and software stacks", "beckhoff.com", "DE"],
      ["EtherCAT Technology Group (ETG)", "Global standard organization with 7,000+ member automation companies", "ethercat.org", "DE"],
      ["Kvaser", "Advanced CAN and CAN-FD interfaces, transceivers, and embedded diagnostic tools", "kvaser.com", "SE"],
      ["Peak-System Technik", "Hardware CAN/CAN-FD interfaces and real-time communication software", "peak-system.com", "DE"],
      ["HMS Networks (Ixxat)", "Industrial communication bridges, CANopen, and EtherCAT safety solutions", "hms-networks.com", "SE"],
      ["acontis technologies", "EtherCAT Master software stacks (EC-Master) standard in industrial robot controllers", "acontis.com", "DE"]
    ]
  },
  {
    i: "rtos", L: 15, n: "Hard real-time OS & microkernels",
    s: "RT-Preempt Linux, QNX Neutrino, and VxWorks guaranteeing bounded interrupt latency",
    w: "Standard desktop operating systems (Windows, standard Ubuntu) prioritize average throughput over worst-case timing, allowing background garbage collection or disk indexing to block execution for tens of milliseconds—a delay that would cause a walking robot to fall over. Hard Real-Time Operating Systems (RTOS) guarantee that high-priority control tasks execute with microsecond-bounded latency.",
    h: [
      "PREEMPT_RT kernel patch converts standard Linux spinlocks into preemptible mutexes and forces high-resolution timers.",
      "QNX Neutrino and VxWorks microkernels run device drivers and protocol stacks in isolated user-space processes.",
      "Task schedulers use rate-monotonic or earliest-deadline-first (EDF) priority scheduling.",
      "Core pinning (CPU isolation) dedicates specific CPU cores exclusively to 1,000 Hz motion loops, immune to OS interrupts."
    ],
    k: [
      ["<20 µs", "maximum worst-case interrupt latency under 100% CPU stress testing"],
      ["1,000 Hz", "deterministic motion control loop rate executed without a single missed cycle"],
      ["SIL 3 / ASIL-D", "functional safety certification supported by safety-grade RTOS builds"]
    ],
    c: 2,
    x: "RT-Preempt Linux dominates modern robotics research and startups, while commercial medical and industrial robot OEMs rely on proprietary safety-certified RTOS kernels (QNX, Wind River VxWorks).",
    co: [
      ["BlackBerry QNX", "QNX Neutrino hard real-time microkernel certified up to ISO 26262 ASIL-D and IEC 61508 SIL 3", "blackberry.qnx.com", "CA"],
      ["Wind River (Aptiv)", "VxWorks hard real-time operating system deployed in aerospace and critical robotics", "windriver.com", "US"],
      ["Open Source Robotics Foundation (OSRF)", "Maintains and packages real-time Linux integration for ROS 2", "osrfoundation.org", "US"],
      ["Linux Foundation (Real-Time Linux)", "Collaborative project standardizing the PREEMPT_RT patch into mainline Linux", "linuxfoundation.org", "US"],
      ["Green Hills Software", "INTEGRITY real-time operating system for ultra-high-reliability mission-critical systems", "ghs.com", "US"],
      ["Amazon Web Services (FreeRTOS)", "Open-source market-leading real-time operating system for microcontrollers", "freertos.org", "US"]
    ]
  },
  {
    i: "safetyio", L: 15, n: "Safety-rated I/O & safe motion monitoring",
    s: "SIL3 / Cat 4 / PL e safety logic executing STO, SS1, and SLS in hardware",
    w: "Industrial standards mandate that when an emergency stop button is pressed or a human steps inside a safety light curtain, the robot must immediately drop torque or stop motion safely, even if the main CPU crashes. Dual-channel safety logic circuits and certified Safety-over-EtherCAT (FSoE) protocols execute Safe Torque Off (STO) and Safely-Limited Speed (SLS) in redundant hardware.",
    h: [
      "Dual independent hardware shutdown paths cut power to the gate drivers of the inverter power bridge (Safe Torque Off).",
      "Safety-over-EtherCAT (FSoE / IEC 61784-3) encapsulates safety data with CRC signatures inside standard network frames (Black Channel).",
      "Redundant safety microcontrollers independently calculate position from dual encoders, checking for overspeed.",
      "Hardware watchdogs automatically de-energize spring-applied holding brakes if keep-alive pulses stop."
    ],
    k: [
      ["ISO 13849-1 PL e / Cat 4", "highest machinery functional safety performance level certification"],
      ["<5 ms", "hardware Safe Torque Off (STO) reaction time from E-stop contact open to bridge cutoff"],
      ["10⁻⁹ / hour", "probability of dangerous failure per hour (PFHd) in certified safety systems"]
    ],
    c: 3,
    x: "Mandatory statutory barrier to commercial industrial and collaborative deployment. Pilz, SICK, and Beckhoff dominate safety PLC hardware and FSoE protocol implementations.",
    co: [
      ["Pilz GmbH & Co. KG", "World leader in machinery safety, PNOZ safety relays, and configurable safety controllers", "pilz.com", "DE"],
      ["SICK AG (Safety Division)", "Safety laser scanners, light curtains, and Flexi Soft modular safety controllers", "sick.com", "DE"],
      ["Beckhoff Automation (TwinSAFE)", "TwinSAFE integrated safety controllers, safety I/O terminals, and FSoE protocol", "beckhoff.com", "DE"],
      ["Omron Safety (Scientific Technologies)", "Machine safety interlocks, safety light curtains, and safety controllers", "automation.omron.com", "JP"],
      ["Schmersal Group", "Safety switchgear, optoelectronic safety guards, and functional safety engineering", "schmersal.com", "DE"],
      ["Banner Engineering", "Safety controllers, optical light curtains, and emergency stop devices", "bannerengineering.com", "US"]
    ]
  },
  {
    i: "otafw", L: 15, n: "Fail-safe embedded firmware update",
    s: "Dual-bank flash memory, cryptographic signing, and atomic rollback pipelines",
    w: "Remotely updating firmware on 50 distributed joint motor controllers, BMS packs, and safety boards across a fleet of deployed robots carries the risk of 'bricking' machines in the field. Dual-bank flash memory architectures, asymmetric cryptographic signature verification, and hardware watchdog rollbacks ensure updates are atomic and fail-safe.",
    h: [
      "Internal MCU flash memory is partitioned into active Bank A and staging Bank B.",
      "The new firmware binary is decrypted, verified against an elliptic-curve public key (ECDSA), and written to Bank B.",
      "A bootloader flag flips the active execution pointer to Bank B during the next reboot.",
      "If the new firmware fails self-tests or misses the watchdog timer, the bootloader automatically reverts to Bank A."
    ],
    k: [
      ["zero bricking", "100% fail-safe atomic rollback guaranteed by dual-bank hardware flash"],
      ["ECDSA SHA-256", "cryptographic signature validation preventing unauthorized firmware injection"],
      ["<60 seconds", "simultaneous multi-joint actuator firmware flashing over EtherCAT"]
    ],
    c: 1,
    x: "Essential operational infrastructure for scaling commercial robot fleets; standardizes secure boot and bootloader management.",
    co: [
      ["Memfault", "IoT and robotics embedded reliability platform, automated coredumps, and OTA updates", "memfault.com", "US"],
      ["Mender.io (Northern.tech)", "Open-source secure over-the-air software and firmware updater for embedded Linux", "mender.io", "NO"],
      ["Toradex (Torizon)", "Industrial Linux software platform with integrated secure OTA update management", "toradex.com", "CH"],
      ["Balena", "Container-based fleet management and automated host OS updates for edge devices", "balena.io", "GB"],
      ["JFrog (Connect)", "Remote edge device management, automated OTA updates, and security monitoring", "jfrog.com", "US"],
      ["Synapticon (OBLAC Tools)", "Web-based firmware update, motor tuning, and remote drive diagnostics suites", "synapticon.com", "DE"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 16: MIDDLEWARE
  // ------------------------------------------------------------
  {
    i: "ros", L: 16, n: "ROS 2 & distributed DDS",
    s: "Data Distribution Service and open-source pub-sub robotics middleware",
    w: "The Robot Operating System (ROS 2) is the de-facto standard software middleware connecting sensor drivers, state estimators, motion planners, and user interfaces. Built on the OMG Data Distribution Service (DDS) standard, ROS 2 provides decentralized, broker-less publish-subscribe messaging with configurable Quality of Service (QoS) across distributed nodes.",
    h: [
      "Nodes discover each other dynamically across local subnets using DDS Simple Discovery Protocol (SDP).",
      "Quality of Service (QoS) policies configure message reliability (Reliable vs Best-Effort), durability, and deadline tracking.",
      "ros2_control framework abstracts hardware actuators through generic JointState and JointCommand interfaces.",
      "Multi-threaded executors manage asynchronous callback queues and timer execution across CPU cores."
    ],
    k: [
      ["~80%", "of global robotics research labs and commercial startups build on ROS / ROS 2"],
      ["zero broker", "decentralized peer-to-peer pub-sub messaging eliminating single points of failure"],
      ["QoS profiles", "fine-tuned for high-bandwidth sensor feeds (Best-Effort) vs control commands (Reliable)"]
    ],
    c: 3,
    x: "ROS 2 is the universal lingua franca of modern robotics. The Open Source Robotics Alliance (OSRA) and leading DDS vendors maintain the core transport infrastructure.",
    co: [
      ["Open Source Robotics Alliance (OSRA / OSRC)", "Steward of the ROS and ROS 2 open-source ecosystem (part of Intrinsic / Alphabet)", "openrobotics.org", "US"],
      ["eProsima", "Fast DDS (formerly Fast RTPS) — default high-performance DDS implementation for ROS 2", "eprosima.com", "ES"],
      ["Real-Time Innovations (RTI)", "RTI Connext DDS — industry gold standard for mission-critical real-time DDS middleware", "rti.com", "US"],
      ["Apex.AI", "Apex.OS — automotive-grade and safety-certified (ISO 26262 ASIL-D) commercial ROS 2 fork", "apex.ai", "US"],
      ["ZettaScale Technology (Adlink)", "Cyclone DDS and Zenoh high-performance edge data routing middleware", "zettascale.tech", "FR"],
      ["Canonical (Ubuntu Robotics)", "Packages and maintains enterprise LTS releases of ROS and ROS 2 on Ubuntu", "canonical.com", "GB"]
    ]
  },
  {
    i: "zenoh", L: 16, n: "Low-overhead micro-middlewares",
    s: "Zero-copy, microsecond-latency data transport for high-bandwidth point clouds",
    w: "While standard DDS works well for small control packets, transferring 4K camera streams and dense 3D point clouds across microcontrollers, edge SoCs, and remote clouds introduces significant protocol header overhead and memory copies. Next-generation micro-middlewares (Zenoh, eCAL, ZeroMQ) provide zero-copy shared-memory transport with microsecond latencies.",
    h: [
      "Zero-copy shared memory (POSIX shm) passes gigabyte-scale point clouds between local processes with zero CPU memory copying.",
      "Zenoh uses a compact 4–6 byte wire header, reducing network bandwidth overhead by over 90% compared to standard DDS.",
      "Integrated routing bridges seamlessly route data across constrained CAN buses, local wireless subnets, and remote cloud brokers.",
      "eCAL (Enhanced Communication Abstraction Layer) provides lock-free, zero-copy inter-process communication."
    ],
    k: [
      ["<1 µs", "inter-process communication latency over local shared memory"],
      ["90%+ reduction", "in network packet protocol overhead compared to legacy DDS implementations"],
      ["microcontroller native", "operates directly on resource-constrained embedded ARM Cortex-M microcontrollers"]
    ],
    c: 2,
    x: "Zenoh and eCAL are rapidly replacing standard DDS in next-generation humanoid and autonomous vehicle internal software stacks.",
    co: [
      ["ZettaScale Technology", "Zenoh — zero-overhead pub/sub/query protocol for robotics and edge computing", "zenoh.io", "FR"],
      ["Continental AG (eCAL)", "Open-source Enhanced Communication Abstraction Layer for high-throughput robotics", "eclipse-ecal.github.io", "DE"],
      ["ZeroMQ / Pieter Hintjens Legacy", "High-performance asynchronous messaging library and concurrency framework", "zeromq.org", "BE"],
      ["Eclipse Foundation (IoT/Robotics)", "Open-source governance home for Zenoh, eCAL, and Cyclone DDS", "eclipse.org", "BE"],
      ["Adlink Technology", "Edge computing hardware and industrial data connectivity software solutions", "adlinktech.com", "TW"],
      ["Intrinsic (Alphabet)", "Developing next-generation developer platforms and robotic software runtimes", "intrinsic.ai", "US"]
    ]
  },
  {
    i: "drivers", L: 16, n: "Hardware abstraction layers & URDF",
    s: "Unified Robot Description Format (URDF) models and ros2_control interfaces",
    w: "High-level motion planning algorithms and physics simulators should not care whether an arm is made of aluminium or carbon fiber, or whether its motor uses EtherCAT or CAN. The Unified Robot Description Format (URDF/SDFormat) specifies the robot's link masses, inertias, joint limits, and mesh geometries in standardized XML, while hardware abstraction layers (ros2_control) present standardized velocity, position, and effort interfaces.",
    h: [
      "URDF XML files define kinematic link trees, visual meshes (STL/DAE), collision boxes, and 3×3 spatial inertia tensors.",
      "ros2_control HardwareInterface plugins translate standard command vectors into vendor-specific bus frames.",
      "Transmission interfaces model gear reduction ratios, joint torque limits, and dual-encoder kinematic offsets.",
      "Dynamic parameter servers broadcast robot state transforms ($tf2$) in a unified global coordinate tree."
    ],
    k: [
      ["1 single model", "URDF file shared across planning (MoveIt), simulation (Gazebo/MuJoCo), and physical control"],
      ["modular swapping", "switch from physical hardware to simulated mock hardware by changing 1 XML tag"],
      ["100% standardized", "joint state message formats (sensor_msgs/JointState) across all robot brands"]
    ],
    c: 2,
    x: "URDF lacks closed kinematic loops (parallel mechanisms) and deformable bodies; SDFormat and OpenUSD are emerging to overcome XML limitations.",
    co: [
      ["PickNik Robotics", "Maintainers of ros2_control, MoveIt 2, and advanced robotic manipulation software", "picknik.ai", "US"],
      ["Open Source Robotics Alliance", "Maintains URDF, SDFormat, and tf2 spatial coordinate transform libraries", "openrobotics.org", "US"],
      ["NVIDIA (Isaac ROS)", "GPU-accelerated ROS 2 hardware abstraction layers and sensor processing nodes", "developer.nvidia.com", "US"],
      ["Universal Robots (Software Div)", "Universal_Robots_ROS2_Driver supporting official external control of UR cobots", "universal-robots.com", "DK"],
      ["KUKA Robotics (Software)", "KUKA sunrise.OS, KUKA.mxAutomation, and open robotic interface drivers", "kuka.com", "DE"],
      ["PAL Robotics", "Open-source ROS control drivers and simulation packages for humanoid platforms", "pal-robotics.com", "ES"]
    ]
  },
  {
    i: "logging", L: 16, n: "Robotics telemetry, MCAP & observability",
    s: "High-throughput MCAP recording, time-synchronized bag logging, and visualization",
    w: "When a robot drops an object or triggers an E-stop in the field, engineers need to inspect exactly what the cameras saw, what the joint torques were, and what the planning nodes computed at that exact millisecond. Modern robotics logging utilizes the standardized MCAP container format, capturing gigabytes of multi-modal telemetry with zero dropped packets for offline visualization in Foxglove Studio.",
    h: [
      "High-speed disk writers serialize heterogeneous protobuf, flatbuffers, and ROS message streams into compressed MCAP files.",
      "Hardware-timestamped packet indexing enables random-access seeking through gigabytes of recorded bags.",
      "Zstandard (zstd) or LZ4 chunked compression reduces disk storage footprint by 60–80%.",
      "Web-based visualization suites (Foxglove Studio) render synchronized 3D point clouds, camera streams, and telemetry plots."
    ],
    k: [
      [">1 Gbps", "continuous disk write throughput for uncompressed multi-camera MCAP bag logging"],
      ["sub-millisecond", "time synchronization across all logged sensor, planning, and control topics"],
      ["MCAP format", "open container format standard created by Foxglove adopted across autonomous vehicles and robotics"]
    ],
    c: 2,
    x: "Foxglove, Formant, and Sudo-AI dominate the modern cloud-connected robotics observability and remote diagnostics landscape.",
    co: [
      ["Foxglove Technologies", "Foxglove Studio — modern visualization, debugging, and MCAP log analysis suite", "foxglove.dev", "US"],
      ["Formant Inc.", "Data platform for robot fleet operations, remote telemetry, and observability", "formant.io", "US"],
      ["InOrbit", "RoboOps platform for autonomous mobile robot fleet telemetry and mission monitoring", "inorbit.ai", "US"],
      ["Freedom Robotics", "Embedded edge data logging, remote control, and fleet management software", "freedomrobotics.ai", "US"],
      ["Sudo-AI (Robotics Tools)", "Telemetry extraction, replay debugging, and multi-modal robotics data indexing", "sudo-ai.com", "US"],
      ["Rerun.io", "Open-source visualizer for multimodal temporal data streams, computer vision, and robotics", "rerun.io", "SE"]
    ]
  },
  {
    i: "bt", L: 16, n: "Behavior trees & task orchestration",
    s: "Hierarchical Behavior Trees and reactive execution state machines",
    w: "Hard-coded procedural code ('if-else' spaghetti) breaks down when a robot must handle dozens of unexpected failure modes: part missing, door locked, battery low, or human in the way. Behavior Trees (BT) structure robot mission logic into modular, reactive decision trees (Sequence, Fallback, Parallel, Decorator nodes) that reactively tick at 10–50 Hz, gracefully executing error-recovery sub-trees.",
    h: [
      "Control flow nodes (Sequence: AND, Fallback: OR, Parallel) evaluate child node return states (SUCCESS, FAILURE, RUNNING).",
      "Execution leaf nodes trigger action clients (e.g., 'Navigate to Dock', 'Grasp Object', 'Scan Barcode').",
      "Reactive Fallbacks instantly abort active action servers if a higher-priority safety condition trips.",
      "Blackboard data stores pass shared contextual variables (target 3D poses, detected object IDs) between tree branches."
    ],
    k: [
      ["10–50 Hz", "tree evaluation tick rate providing instantaneous reaction to environmental changes"],
      ["100% modular", "sub-trees (e.g., 'Grasp Retry Routine') plug into any mission without modifying existing code"],
      ["BehaviorTree.CPP", "open-source standard C++ library powering Nav2 and manipulation orchestrators worldwide"]
    ],
    c: 2,
    x: "BehaviorTree.CPP and modern Nav2 task orchestrators are standard across commercial warehouse logistics and autonomous mobile manipulation.",
    co: [
      ["BehaviorTree.CPP (Davide Faconti)", "De-facto open-source standard Behavior Tree library powering ROS 2 and robotics", "behaviortree.dev", "IT"],
      ["Intrinsic (Flow / Delve)", "Behavior trees, graphical workflow orchestration, and industrial AI runtimes", "intrinsic.ai", "US"],
      ["PickNik Robotics", "MoveIt Pro task sequencer and Behavior Tree manipulation frameworks", "picknik.ai", "US"],
      ["Siemens (Factory Automation)", "PLC open sequential function charts (SFC) and industrial state machine execution", "siemens.com", "DE"],
      ["Wandelbots", "Wandelbots NOVA platform for software-defined robotic task automation", "wandelbots.com", "DE"],
      ["Realtime Robotics", "Autonomous motion planning and multi-robot workcell collision orchestration", "rtr.ai", "US"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 17: CONTROL
  // ------------------------------------------------------------
  {
    i: "kine", L: 17, n: "Kinematics & inverse kinematics (IK)",
    s: "Jacobian matrices, Denavit-Hartenberg models, and sub-millisecond IK solvers",
    w: "To move an end-effector to a desired Cartesian pose $(X, Y, Z, \text{Roll}, \text{Pitch}, \text{Yaw})$, the controller must solve Inverse Kinematics (IK) to find the corresponding joint angles ($θ_1 \dots θ_n$). Because multi-axis arms feature non-linear trigonometric kinematics, singularities, and joint limit constraints, numerical solvers compute damped least-squares Jacobian inverses thousands of times per second.",
    h: [
      "Forward Kinematics (FK) multiplies Denavit-Hartenberg (DH) homogeneous transformation matrices along the kinematic chain.",
      "The Geometric Jacobian ($J(q)$) relates joint velocities ($\dot{q}$) to end-effector spatial velocities ($v, \omega$).",
      "Inverse Kinematics solvers (Trac-IK, BioIK, Pinocchio) solve non-linear optimization with joint limit constraints.",
      "Singularity-robust damped least-squares algorithms ($J^T (J J^T + \lambda^2 I)^{-1}$) prevent explosive joint velocity spikes near kinematic singularities."
    ],
    k: [
      ["<50 µs", "solve time per 7-DoF inverse kinematics query using modern SIMD-accelerated C++ libraries"],
      ["6-DoF / 7-DoF", "kinematic redundancy resolution optimizing arm posture while holding end-effector pose fixed"],
      ["Pinocchio", "open-source spatial algebra C++ library computing analytical derivatives at microsecond speeds"]
    ],
    c: 2,
    x: "Pinocchio, KDL, and Trac-IK form the mathematical engine of all robotics planning and control frameworks.",
    co: [
      ["INRIA (Pinocchio Project)", "World's fastest open-source rigid body dynamics and kinematics C++ library", "github.com/stack-of-tasks/pinocchio", "FR"],
      ["PickNik Robotics", "Maintainers of KDL, Trac-IK, and MoveIt Kinematics packages", "picknik.ai", "US"],
      ["Orocos Project", "Open Robot Control Software and Kinematics and Dynamics Library (KDL)", "orocos.org", "BE"],
      ["RoboDK", "Commercial kinematics engine, robot simulation, and post-processor generator", "robodk.com", "CA"],
      ["Moby (Drake Group)", "Kinematic trajectory optimization and analytical derivatives inside Drake", "drake.mit.edu", "US"],
      ["Mujoco (Kinematics Engine)", "Featherstone kinematics and spatial algebra engine powering MuJoCo", "mujoco.org", "US"]
    ]
  },
  {
    i: "dyn", L: 17, n: "Rigid body dynamics & spatial algebra",
    s: "Recursive Newton-Euler and Articulated Body Algorithms on silicon",
    w: "An articulated robot moving at high speed experiences massive centrifugal forces, Coriolis couplings, and gravitational torques across its limbs. Rigid body dynamics algorithms compute the exact torques required to achieve a desired acceleration ($\tau = M(q)\ddot{q} + C(q, \dot{q})\dot{q} + g(q)$), enabling feedforward inertia compensation and high-speed trajectory tracking.",
    h: [
      "Recursive Newton-Euler Algorithm (RNEA) computes inverse dynamics in $O(N)$ linear time via forward/backward recursions.",
      "Articulated Body Algorithm (ABA) computes forward dynamics (joint accelerations from applied torques) in $O(N)$ time.",
      "Featherstone's 6D spatial vector algebra combines linear and angular spatial quantities into unified 6-vectors.",
      "Online system identification algorithms estimate payload mass, center of gravity (CoG), and inertia tensors in real time."
    ],
    k: [
      ["O(N)", "linear computational complexity relative to joint count using Featherstone's recursive algorithms"],
      ["<10 µs", "full inverse dynamics computation for a 30-DoF humanoid on a single CPU core"],
      ["30–50%", "tracking error reduction achieved by feedforward dynamic torque compensation vs simple PID"]
    ],
    c: 3,
    x: "Foundational mathematical substrate of modern robotics. The field owes its core computational algorithms to Roy Featherstone's Spatial Vector Algebra.",
    co: [
      ["INRIA (Willow / Gepetto Teams)", "Pioneered high-speed algorithmic implementations of Featherstone spatial dynamics", "inria.fr", "FR"],
      ["Toyota Research Institute (TRI)", "Drake C++ toolbox for model-based design and non-linear rigid body dynamics", "tri.global", "US"],
      ["Google DeepMind (MuJoCo Core)", "Maintains optimized Featherstone dynamics solvers inside open-source MuJoCo", "deepmind.google", "GB"],
      ["MIT Robot Locomotion Group", "Developers of Drake and analytical multi-body dynamics frameworks", "locomotion.csail.mit.edu", "US"],
      ["IIT (Italian Institute of Technology)", "iDynTree dynamic multi-body library powering humanoid robots (iCub, ergoCub)", "iit.it", "IT"],
      ["MathWorks", "MATLAB & Simulink Robotics System Toolbox with multi-body dynamics solvers", "mathworks.com", "US"]
    ]
  },
  {
    i: "mpc", L: 17, n: "Model Predictive Control (MPC)",
    s: "Receding-horizon trajectory optimization solving Quadratic Programs at 50–200 Hz",
    w: "Dynamic walking, jumping, and aggressive quadrotor flight cannot be controlled by simple reactive PID loops because the robot must anticipate future contact events and actuator torque saturation. Model Predictive Control (MPC) predicts the robot's physical trajectory over a finite future horizon (0.5–2.0 seconds) and solves a constrained optimization problem (Quadratic Program) 50–200 times per second.",
    h: [
      "Simplified physics models (Single Rigid Body Model, Inverted Pendulum) predict future center-of-mass trajectory.",
      "Friction cone constraints ($\mu F_z \ge \sqrt{F_x^2 + F_y^2}$) prevent foot slipping on slick surfaces.",
      "Convex Quadratic Programming (QP) solvers (OSQP, qpOASES, ProxQP) optimize ground reaction forces in milliseconds.",
      "The first step of the optimal solution is dispatched to low-level joint controllers, and the horizon recedes."
    ],
    k: [
      ["50–200 Hz", "receding-horizon replanning frequency updating footsteps and contact forces"],
      ["<5 ms", "QP optimization solve time per horizon cycle on embedded robot CPUs"],
      ["100% physically feasible", "guarantees foot contact forces stay inside friction cones and torque limits"]
    ],
    c: 3,
    x: "Convex QP formulation and specialized C++ solvers (OSQP, ProxQP) are the technical foundation of commercial quadruped and bipedal locomotion (Boston Dynamics Spot, Unitree, ANYbotics).",
    co: [
      ["Oxford Control Group (OSQP)", "OSQP — Operator Splitting Quadratic Program solver standard in robotics MPC", "osqp.org", "GB"],
      ["INRIA (ProxQP / Crocoddyl)", "High-performance vectorized optimization and differential dynamic programming (DDP)", "inria.fr", "FR"],
      ["ANYbotics", "Industrial legged robot developer utilizing advanced onboard convex MPC for ANYmal", "anybotics.com", "CH"],
      ["Unitree Robotics (Locomotion)", "Mass-market quadruped and humanoid robots running high-frequency onboard MPC", "unitree.com", "CN"],
      ["Boston Dynamics (Control Group)", "Pioneered model predictive control for dynamic legged robots (Spot, Atlas)", "bostondynamics.com", "US"],
      ["University of Oxford (Dynamic Robot Systems)", "Pioneered receding-horizon MPC for legged locomotion over rough terrain", "ori.ox.ac.uk", "GB"]
    ]
  },
  {
    i: "wbc", L: 17, n: "Whole-Body Control (WBC) & balance QP",
    s: "Hierarchical QP solvers mapping tasks to joint torques under floating-base dynamics",
    w: "A humanoid robot standing on one foot while reaching for a heavy box must satisfy multiple competing objectives: prevent tipping over, maintain head camera stability, track hand trajectory, and avoid joint limits. Whole-Body Control (WBC) formulates these tasks as a strict hierarchy of Quadratic Programs, computing optimal joint torques in microsecond loops.",
    h: [
      "Floating-base equations of motion decouple base acceleration from actuated joint torques.",
      "Tasks are prioritized hierarchically: Priority 1 (Balance/Contact Holonomic Constraints), Priority 2 (Posture), Priority 3 (Manipulation).",
      "Hierarchical Null-Space Projection ensures secondary tasks execute only inside the null-space of higher-priority tasks.",
      "The output joint torque vector ($\tau$) satisfies contact friction cones, motor torque limits, and dynamic momentum conservation."
    ],
    k: [
      ["1,000 Hz", "Whole-Body Control execution rate running directly above the 25 kHz motor current loop"],
      ["30+ DoF", "simultaneous torque allocation across legs, torso, arms, and neck joints"],
      ["Centroidal Momentum", "regulation ($H_G$) preventing angular momentum tipping during dynamic walking"]
    ],
    c: 3,
    x: "WBC bridges high-level policy commands and low-level physics. Without WBC or equivalent low-level torque regularization, neural policy actions cause physical humanoids to violently jerk and trip.",
    co: [
      ["IHMC Robotics", "World-renowned research institute pioneering Whole-Body Control algorithms for Atlas and Valkyrie", "ihmc.us", "US"],
      ["DLR (German Aerospace Center)", "Pioneered Whole-Body torque control and compliant space manipulation (Justin, Toro)", "dlr.de", "DE"],
      ["Agility Robotics (Control Div)", "Proprietary whole-body locomotion and manipulation controllers for Digit humanoid", "agilityrobotics.com", "US"],
      ["Boston Dynamics", "Pioneered hierarchical whole-body quadratic programming on hydraulic and electric Atlas", "bostondynamics.com", "US"],
      ["KAIST (Hubo Lab / Rainbow Robotics)", "Humanoid whole-body balance control and commercial bipedal platforms", "rainbow-robotics.com", "KR"],
      ["Figure AI (Control Group)", "Whole-body kinematic and dynamic stabilization software for Figure 01/02", "figure.ai", "US"]
    ]
  },
  {
    i: "impedance", L: 17, n: "Cartesian impedance & admittance control",
    s: "Active programmable mechanical compliance for safe physical contact",
    w: "Traditional industrial robots behave like infinitely stiff position sources: if a human hand is caught in the joint path, the robot applies destructive force without stopping. Cartesian Impedance Control (formulated by Neville Hogan) actively emulates a virtual spring-damper system at the end-effector ($F_{ext} = M_d \ddot{e} + D_d \dot{e} + K_d e$), allowing the robot to yield smoothly to external forces.",
    h: [
      "The controller measures or estimates external contact forces ($F_{ext}$) via wrist F/T load cells or joint torque sensors.",
      "The error between desired and actual Cartesian position is converted into virtual restoring force ($F = K \cdot \Delta x$).",
      "The transpose of the kinematic Jacobian ($J^T$) maps Cartesian virtual forces directly into joint torques ($\tau = J^T F$).",
      "Admittance control integrates measured contact forces into modified reference trajectory positions for position-controlled robots."
    ],
    k: [
      ["Neville Hogan 1985", "formulation of impedance control foundational to all collaborative robotics"],
      ["0–5,000 N/m", "programmable Cartesian stiffness tunable in real time from feather-soft to iron-rigid"],
      ["<5 ms", "force-reflection latency enabling smooth human lead-through hand guiding"]
    ],
    c: 3,
    x: "Crucial technology for collaborative robotics (cobots) and precision assembly. Universal Robots, Franka Robotics, and KUKA LBR iiwa built their entire product categories on torque-based impedance control.",
    co: [
      ["Franka Robotics (Franka Emika)", "Pioneered torque-sensor-in-every-joint collaborative robot arms (Panda)", "franka.de", "DE"],
      ["Universal Robots (Teradyne)", "Cobot market leader implementing current-based Cartesian compliance control", "universal-robots.com", "DK"],
      ["KUKA AG (LBR iiwa Div)", "Lightweight collaborative robot arm with integrated joint torque sensors for assembly", "kuka.com", "DE"],
      ["Neura Robotics", "Cognitive collaborative robots with integrated torque sensors and multimodal touch", "neura-robotics.com", "DE"],
      ["Agile Robots SE", "High-precision torque-controlled robotic arms and dexterous manipulation systems", "agile-robots.com", "DE"],
      ["Doosan Robotics", "Collaborative robots with high-sensitivity joint torque sensors in all 6 axes", "doosanrobotics.com", "KR"]
    ]
  },
  {
    i: "motionplan", L: 17, n: "Trajectory generation & collision avoidance",
    s: "MoveIt, OMPL, CHOMP, and TrajOpt finding collision-free motion paths",
    w: "To move an arm around a shelf without hitting the frame, motion planning algorithms search high-dimensional joint configuration space ($\mathcal{C}$-space). Sampling-based algorithms (RRT*, PRM) and trajectory optimization methods (TrajOpt, CHOMP) find smooth, time-optimal, collision-free joint trajectories within milliseconds.",
    h: [
      "The continuous 3D world is represented as collision meshes or octree voxel maps (OctoMap).",
      "Rapidly-exploring Random Trees (RRT-Connect / OMPL) sample configuration space, growing trees toward goal poses.",
      "Continuous collision checking (Flexible Collision Library / FCL) validates swept volumes against obstacles.",
      "Time-optimal path parameterization (TOPP-RA) scales velocity and acceleration profiles to respect motor torque limits."
    ],
    k: [
      ["<10 ms", "planning time for 6-DoF collision-free point-to-point motion using optimized RRT-Connect"],
      ["MoveIt", "open-source motion planning framework powering over 150+ robot manipulator architectures"],
      ["100% collision-free", "mathematically guaranteed by continuous swept-volume collision verification"]
    ],
    c: 2,
    x: "PickNik Robotics leads MoveIt development. Realtime Robotics provides hardware-accelerated FPGA collision-checking pipelines for multi-robot workcells.",
    co: [
      ["PickNik Robotics", "Developers and maintainers of MoveIt, MoveIt 2, and MoveIt Pro motion planning software", "picknik.ai", "US"],
      ["Open Motion Planning Library (OMPL)", "Core sampling-based motion planning library developed at Rice University", "ompl.kavrakilab.org", "US"],
      ["Realtime Robotics", "FPGA-accelerated motion planning processor computing millions of collision checks per second", "rtr.ai", "US"],
      ["Siemens (Process Simulate)", "Industrial robot path planning, multi-robot interlock validation, and offline programming", "siemens.com", "DE"],
      ["Dassault Systèmes (DELMIA)", "Digital manufacturing and robotic trajectory optimization software suites", "3ds.com", "FR"],
      ["Intrinsic (Planning Tools)", "Automated motion planning, trajectory smoothing, and obstacle avoidance runtimes", "intrinsic.ai", "US"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 18: DATA
  // ------------------------------------------------------------
  {
    i: "teleop", L: 18, n: "Bimanual master-slave teleoperation rigs",
    s: "ALOHA, GELLO, and bilateral master arms capturing 50 Hz human demonstrations",
    w: "Unlike Large Language Models that train on trillions of freely scrapable internet text tokens, physical robot manipulation has no internet to crawl. Bimanual master-slave teleoperation rigs (Stanford ALOHA, UC Berkeley GELLO) place low-cost leader arms in human hands, capturing 50 Hz joint trajectories, gripper forces, and multi-camera RGB video streams during skilled manual tasks.",
    h: [
      "Human operator grasps leader manipulator arms, moving hands naturally through 3D space.",
      "Joint position encoders on the leader arm mirror motion directly to follower robot arms at 50–100 Hz.",
      "Overhead and wrist-mounted RGB global-shutter cameras record synchronized multi-view visual frames.",
      "Data ingestion pipelines package $(s_t, a_t)$ state-action pairs: visual tokens, joint positions, and gripper efforts."
    ],
    k: [
      ["$10–$50", "fully-loaded human labor cost per hour of curated manipulation demonstration data"],
      ["50 Hz", "state-action trajectory sampling frequency capturing fine human corrective reflexes"],
      ["50–200 demos", "required per specific task (e.g., zip-tie threading, cup stacking) for imitation learning"]
    ],
    c: 3,
    x: "The single most expensive operational bottleneck in modern Physical AI. Collecting 100,000 real-world demonstrations requires hundreds of physical rigs, human teleoperators, and thousands of hours of physical reset time.",
    co: [
      ["Physical Intelligence (π)", "Physical AI foundation model company scaling industrial bimanual teleoperation fleets", "physicalintelligence.company", "US"],
      ["Skild AI", "Building general-purpose robot foundation models on large-scale multimodal teleoperation data", "skild.ai", "US"],
      ["Trossen Robotics", "Commercial manufacturer of standardized ALOHA and Mobile ALOHA teleoperation kits", "trossenrobotics.com", "US"],
      ["Dexmate", "Specialized hardware-software teleoperation stations and data curation services", "dexmate.com", "US"],
      ["Figure AI (Data Operations)", "Internal teleoperation fleet harvesting real-world manipulation data for Figure humanoids", "figure.ai", "US"],
      ["Collaborative Robotics (Cobot)", "Developing practical collaborative robots and human-in-the-loop demonstration pipelines", "co.bot", "US"]
    ]
  },
  {
    i: "demo", L: 18, n: "Wearable capture & spatial video demonstration",
    s: "Apple Vision Pro, VR gloves, and optical mocap retargeting human hands to robot kinematics",
    w: "Teleoperating a robot through master arms introduces kinematic mismatch and mechanical fatigue. Wearable capture systems use Spatial Computing headsets (Apple Vision Pro), optical motion capture suits, and data gloves to track human hand poses and retarget human hand trajectories directly onto robot kinematics in real time.",
    h: [
      "Spatial computing headsets track 3D human hand keypoints ($21\text{ joints per hand}$) via external computer vision.",
      "IMU and bend-sensor data gloves capture finger joint flex angles with millisecond latency.",
      "Kinematic retargeting optimization maps human 5-finger poses onto arbitrary robot gripper/hand morphologies.",
      "Low-latency WebRTC streams stream real-time stereo camera video from the robot's head into the VR headset."
    ],
    k: [
      ["<30 ms", "glass-to-glass visual latency from robot stereo cameras to VR headset display"],
      ["21 keypoints", "tracked per human hand without markers using spatial computer vision"],
      ["5–10× faster", "data collection speed compared to traditional keyboard/joystick teleoperation"]
    ],
    c: 2,
    x: "Kinematic retargeting must resolve morphology mismatches (human hands have flexible palms and opposable thumbs; robot hands have rigid palms and fewer DoFs).",
    co: [
      ["Apple (Vision Pro / Spatial Frameworks)", "Spatial computing platform widely adopted for immersive robot teleoperation", "apple.com", "US"],
      ["Manus Meta", "High-precision quantum tracking data gloves and motion capture for VR and robotics", "manus-meta.com", "NL"],
      ["Qualisys AB", "High-precision optical motion capture camera systems for biomechanics and robotics", "qualisys.com", "SE"],
      ["Vicon Motion Systems", "World leader in optical motion tracking and spatial tracking technologies", "vicon.com", "GB"],
      ["SenseGlove", "Force-feedback haptic gloves enabling teleoperators to feel virtual contact stiffness", "senseglove.com", "NL"],
      ["OptiTrack (NaturalPoint)", "High-speed infrared optical motion capture cameras and tracking software", "optitrack.com", "US"]
    ]
  },
  {
    i: "fleetdata", L: 18, n: "Fleet-harvested telemetry & failure capture",
    s: "Automated extraction of real-world disengagements and edge-case trajectories",
    w: "Lab demonstrations suffer from artificial lighting and clean backgrounds. Commercial robot fleets deployed in real customer warehouses automatically record 'hard interventions'—moments where a policy failed, slipped, or required remote human assistance. This failure data is tagged, prioritized, and ingested into active learning training pipelines.",
    h: [
      "Edge trigger daemons detect policy uncertainty, excessive joint tracking errors, or human intervention trips.",
      "Ring buffers save the 30 seconds of multi-modal data preceding and following the failure event.",
      "Compressed failure bags are uploaded automatically to cloud storage during charging dock sessions.",
      "Automated curation pipelines filter out redundant data, clustering novel failure modes for model retraining."
    ],
    k: [
      ["100% real-world", "edge-case coverage captured under true factory dust, lighting, and packaging variations"],
      ["10–100× higher", "training sample efficiency when training on curated failure boundaries vs random successes"],
      ["shadow mode", "evaluation: running candidate models in parallel on live robot fleets without actuation authority"]
    ],
    c: 2,
    x: "Commercial moat of scaled robot deployments. Companies with 1,000+ deployed robots harvest millions of operational hours per month that lab-bound startups cannot replicate.",
    co: [
      ["Tesla (Optimus Data Fleet)", "Leveraging autonomous vehicle fleet data harvesting pipelines for humanoid robots", "tesla.com", "US"],
      ["Symbotic", "Massive fleet data logging across hundreds of high-throughput automated warehouse systems", "symbotic.com", "US"],
      ["Amazon Robotics", "Harvesting operational data across 750,000+ deployed mobile robots in fulfillment centers", "amazon.com", "US"],
      ["Covariant (Amazon AI)", "Universal AI robotics brain learning from diverse real-world picking deployments", "covariant.ai", "US"],
      ["Scale AI (Robotics Division)", "Data annotation, RLHF, and edge-case curation for autonomous robot fleets", "scale.com", "US"],
      ["Encord", "Active learning, automated curation, and quality management platform for physical AI datasets", "encord.com", "GB"]
    ]
  },
  {
    i: "openx", L: 18, n: "Open action consortia & data repositories",
    s: "Open X-Embodiment, DROID, and LeRobot standardizing action tokens",
    w: "To break the data bottleneck, global academic and industrial consortia pool physical robot trajectories into standardized open datasets. Initiatives like Open X-Embodiment (Open X), DROID, and Hugging Face LeRobot standardize multi-robot coordinate frames, action token formats, and metadata schemas across dozens of robot morphologies.",
    h: [
      "Trajectories from 20+ distinct robot embodiments (Franka, UR, WidowX, ALOHA, Mobile) are pooled into a unified schema.",
      "State-action spaces are normalized across end-effector velocity, delta pose, and joint position representations.",
      "Hugging Face LeRobot provides standardized PyTorch data loaders, training recipes, and policy evaluation harnesses.",
      "Pre-training on diverse multi-robot datasets improves cross-embodiment generalization and zero-shot policy transfer."
    ],
    k: [
      ["1M+ trajectories", "aggregated in the Open X-Embodiment dataset across 22 robot embodiments"],
      ["LeRobot", "open-source library democratizing imitation learning and robotics dataset sharing"],
      ["cross-embodiment", "transfer: training policies on one arm morphology that generalize to a different arm"]
    ],
    c: 2,
    x: "Open datasets establish baseline research models, but high-value commercial applications still rely on proprietary, highly curated task demonstrations.",
    co: [
      ["Open X-Embodiment Consortium", "Collaborative academic-industrial consortium aggregating multi-robot datasets", "robotics-transformer-x.github.io", "US"],
      ["Hugging Face (LeRobot)", "Open-source robotics library, pre-trained models, and community dataset hub", "huggingface.co/lerobot", "FR"],
      ["Google DeepMind (Robotics Research)", "Pioneered Open X-Embodiment and RT-X foundation model architectures", "deepmind.google", "GB"],
      ["DROID Dataset Consortium", "Large-scale in-the-wild robot manipulation dataset across diverse household environments", "droid-dataset.github.io", "US"],
      ["Embodied AI Foundation", "Non-profit fostering open-source datasets, benchmarks, and physical AI infrastructure", "embodiedai.org", "US"],
      ["Stanford Vision and Learning Lab (SVL)", "Pioneered ALOHA open-hardware datasets and BEHAVIOR benchmark environments", "svl.stanford.edu", "US"]
    ]
  },
  {
    i: "annot", L: 18, n: "Action chunk annotation & semantic filtering",
    s: "Multi-camera synchronization, semantic sub-goal tagging, and trajectory smoothing",
    w: "Raw teleoperation logs contain operator hesitation, camera timing jitter, and failed sub-actions. Action annotation pipelines apply automated time synchronization, spline trajectory smoothing, semantic sub-goal segmentation ('open drawer', 'reach handle', 'grasp mug'), and automated quality filtering before data enters neural training sets.",
    h: [
      "Hardware timestamps align multi-view camera video frames with 50 Hz joint encoder trajectories.",
      "Cubic spline smoothing filters high-frequency human hand tremor while preserving sharp contact transitions.",
      "Vision-Language Models (VLM) automatically generate dense natural-language sub-task captions for every video clip.",
      "Automated anomaly detectors flag trajectories where gripper slip or unexpected collision occurred."
    ],
    k: [
      ["<5 ms", "cross-camera timestamp alignment across all recorded visual streams"],
      ["100% semantic", "sub-goal captioning enabling natural-language conditioned policy training"],
      ["20–30% data reduction", "by filtering out operator hesitation, pauses, and failed retry loops"]
    ],
    c: 2,
    x: "High-quality semantic data curation is the difference between a policy that generalizes and one that hallucinates erratic joint motions.",
    co: [
      ["Scale AI", "Data engine for physical AI, multi-camera annotation, and 3D bounding box tracking", "scale.com", "US"],
      ["Surge AI", "High-quality human data labeling, LLM evaluation, and robotics demonstration curation", "surgehq.ai", "US"],
      ["Encord", "Automated multimodal data curation, active learning, and segmentation for computer vision", "encord.com", "GB"],
      ["Labelbox", "Data-centric AI platform for training data generation, model evaluation, and annotation", "labelbox.com", "US"],
      ["SuperAnnotate", "Enterprise platform for building, fine-tuning, and managing multimodal AI datasets", "superannotate.com", "US"],
      ["V7 Labs", "Automated image and video annotation platform with pixel-accurate auto-segmentation", "v7labs.com", "GB"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 19: SIMULATION
  // ------------------------------------------------------------
  {
    i: "physeng", L: 19, n: "Contact-rich physics engines",
    s: "MuJoCo, NVIDIA PhysX 5, Genesis, and Drake solving stiff multi-body contact dynamics",
    w: "Because collecting billions of real-world trials on physical robots would break thousands of arms, robotics relies on physics engines to simulate multi-body mechanics. Solvers (MuJoCo, PhysX 5, Drake, Genesis) formulate contact dynamics as Linear/Non-Linear Complementarity Problems (LCP/NCP), simulating stiff impacts, friction cones, and multi-joint kinematics at millions of physics steps per second.",
    h: [
      "Generalized coordinates (Lagrangian dynamics) eliminate redundant constraints for articulated kinematic trees.",
      "Convex contact models (MuJoCo smooth contact formulation) avoid non-convex combinatorial contact search.",
      "GPU-accelerated physics (Isaac PhysX / Warp / Genesis) simulates 10,000+ parallel robot environments simultaneously.",
      "Continuous collision detection models dynamic contact friction cones and joint limit stops."
    ],
    k: [
      ["100,000+ FPS", "parallel simulation throughput per GPU using NVIDIA Isaac Sim / PhysX 5"],
      ["sub-millisecond", "stiff contact collision solving with smooth convex friction approximations"],
      ["MuJoCo", "open-source benchmark physics engine developed by Emo Todorov, maintained by Google DeepMind"]
    ],
    c: 3,
    x: "Physics engines make simplifications: non-linear stick-slip friction, cable compliance, and soft deformable contact are approximated, creating the persistent Sim-to-Real gap.",
    co: [
      ["Google DeepMind (MuJoCo)", "Multi-Joint dynamics with Contact — world standard open-source physics engine for robotics", "mujoco.org", "GB"],
      ["NVIDIA (PhysX / Isaac Sim)", "PhysX 5 and Isaac Lab GPU-accelerated massively parallel robotics simulation", "developer.nvidia.com", "US"],
      ["Toyota Research Institute (Drake)", "Drake — model-based design and high-fidelity physical multi-body simulation", "drake.mit.edu", "US"],
      ["Genesis Physics (Genesis Lab)", "Next-generation generative physics engine for robotics and physical AI", "genesis-world.org", "US"],
      ["Coppelia Robotics", "CoppeliaSim (V-REP) versatile multi-physics robot simulation platform", "coppeliarobotics.com", "CH"],
      ["Open Robotics (Gazebo)", "Gazebo / Ignition multi-robot simulation suite standard in ROS 2 development", "gazebosim.org", "US"]
    ]
  },
  {
    i: "render", L: 19, n: "Photoreal sensor simulation & raytracing",
    s: "RTX raytracing and synthetic visual data generation",
    w: "To train visual policies in simulation that transfer directly to physical cameras, synthetic images must match real-world lighting, shadows, lens distortion, and surface materials. Photorealistic rendering pipelines (NVIDIA Omniverse RTX, Unreal Engine 5, Unity) use real-time hardware raytracing to generate millions of synthetic camera, depth, and LiDAR images with ground-truth semantic segmentation.",
    h: [
      "Hardware RT cores trace rays through Universal Scene Description (OpenUSD) 3D environments.",
      "Physically Based Rendering (PBR) shaders simulate true material reflectance, roughness, and metallicity.",
      "Physical camera models simulate chromatic aberration, depth of field, lens flare, and sensor noise profiles.",
      "Automated ground-truth generation exports pixel-perfect instance segmentation masks, depth maps, and 3D bounding boxes."
    ],
    k: [
      ["100% ground-truth", "pixel-perfect semantic segmentation, depth, and surface normals automatically generated"],
      ["real-time RTX", "hardware-accelerated raytracing producing photorealistic camera streams at 60+ FPS"],
      ["OpenUSD format", "universal 3D scene description standard standardizing robotic simulation assets"]
    ],
    c: 2,
    x: "Visual photorealism is largely solved; the remaining bottleneck is simulating physical material contact mechanics rather than visual pixels.",
    co: [
      ["NVIDIA (Omniverse / Isaac Sim)", "Omniverse RTX rendering engine and OpenUSD simulation framework", "nvidia.com", "US"],
      ["Epic Games (Unreal Engine 5)", "Lumen real-time global illumination and Nanite virtualized geometry for simulation", "unrealengine.com", "US"],
      ["Unity Technologies", "Unity Robotics Hub and synthetic computer vision data generation tools", "unity.com", "US"],
      ["Applied Intuition", "Simulation and synthetic data infrastructure for autonomous vehicles and robotics", "appliedintuition.com", "US"],
      ["Rendered.ai", "PaaS platform for generating physics-based synthetic computer vision datasets", "rendered.ai", "US"],
      ["Synthesis AI", "Synthetic human and physical interaction data generation for AI vision models", "synthesis.ai", "US"]
    ]
  },
  {
    i: "domainrand", L: 19, n: "Domain randomization & Sim-to-Real",
    s: "Systematic physical perturbation bridging the reality gap",
    w: "If a neural network policy is trained in a single perfect simulation, it immediately fails when deployed on real metal due to real-world friction variations, cable drag, and motor latency. Domain Randomization (DR) systematically randomizes physics parameters during simulated training (friction $\pm 50\%$, link mass $\pm 20\%$, camera pose, latency delays), forcing the policy to learn robust, reality-invariant control reflexes.",
    h: [
      "Mass, center of gravity, friction coefficients, and motor damping are randomized per simulation episode.",
      "Observation noise and random latency delays (10–50 ms) are injected into sensor observation buffers.",
      "System identification (SysID) tunes simulated nominal parameters to match physical hardware telemetry.",
      "Teacher-Student policy distillation trains an unprivileged student policy on randomized noisy observations."
    ],
    k: [
      ["zero-shot transfer", "locomotion and manipulation policies deploying directly to real metal without fine-tuning"],
      ["±50% friction", "randomization forcing neural policies to rely on robust closed-loop tactile feedback"],
      ["100× reduction", "in physical robot hardware damage during policy exploration phases"]
    ],
    c: 3,
    x: "Domain Randomization is what enabled deep reinforcement learning locomotion (ANYmal, Boston Dynamics, Unitree) to transition from simulation to real world.",
    co: [
      ["NVIDIA (Isaac Lab / Orbit)", "Isaac Lab modular framework for robot learning and domain randomization", "developer.nvidia.com", "US"],
      ["Google DeepMind (Locomotion Group)", "Pioneered Sim2Real transfer and domain randomization for legged robots", "deepmind.google", "GB"],
      ["MIT Improbable AI Lab", "Pioneered extreme domain randomization for legged locomotion and parkour", "improbable.csail.mit.edu", "US"],
      ["ETH Zurich (RSL / ANYbotics)", "Robotic Systems Lab pioneering Sim2Real reinforcement learning on ANYmal", "rsl.ethz.ch", "CH"],
      ["Berkeley AI Research (BAIR)", "Pioneered Domain Randomization and generalized Sim-to-Real manipulation", "bair.berkeley.edu", "US"],
      ["Carnegie Mellon University (Robotics)", "Advanced policy distillation and adaptive Sim-to-Real transfer frameworks", "ri.cmu.edu", "US"]
    ]
  },
  {
    i: "scenegen", L: 19, n: "Procedural 3D scene & asset generation",
    s: "Automated procedural generation of warehouses, homes, and interactable USD assets",
    w: "Training generalist robot policies requires exposing models to thousands of distinct rooms, tables, furniture layouts, and manipulable objects. Procedural scene generation tools use generative 3D models and layout algorithms to automatically synthesize millions of physics-valid, cluttered 3D environments populated with interactable articulated objects (drawers, doors, appliances).",
    h: [
      "Grammar-based and diffusion-based layout generators place furniture according to architectural rules.",
      "3D generative models (Point-E, Shap-E, 3D Gaussian Splats) generate diverse CAD object geometries.",
      "Physics articulation metadata (joint limits, friction, stiffness) is bound automatically to OpenUSD assets.",
      "Large language models generate programmatic scene descriptions and task challenge variations."
    ],
    k: [
      ["10,000+ rooms", "procedurally generated with diverse object clutter and spatial layouts"],
      ["OpenUSD assets", "standardized articulated objects with accurate physics and collision geometry"],
      ["automated task", "curation generating diverse picking, placing, opening, and navigating tasks"]
    ],
    c: 2,
    x: "Scaling scene generation requires high-quality articulated 3D assets with physically realistic collision meshes and mass properties.",
    co: [
      ["NVIDIA (Omniverse NuScenes)", "Generative AI tools and procedural OpenUSD scene generation pipelines", "nvidia.com", "US"],
      ["Stanford University (BEHAVIOR / Habitat)", "BEHAVIOR-1K benchmark of 1,000 everyday household simulation activities", "behavior.stanford.edu", "US"],
      ["Meta FAIR (Habitat Sim)", "Habitat-Sim high-efficiency photorealistic 3D indoor simulator and dataset", "ai.meta.com", "US"],
      ["Allen Institute for AI (AI2-THOR)", "AI2-THOR interactive environment for embodied AI and visual reasoning", "ai2thor.allenai.org", "US"],
      ["World Labs", "Spatial intelligence and generative 3D world models for AI and simulation", "worldlabs.ai", "US"],
      ["RoboCasa (UT Austin)", "Large-scale simulation benchmark for everyday humanoid kitchen tasks", "robocasa.ai", "US"]
    ]
  },
  {
    i: "benchsim", L: 19, n: "Standardized simulation benchmarks",
    s: "ManiSkill, RoboCasa, and RLBench providing reproducible policy evaluations",
    w: "To measure whether a new robot foundation model or reinforcement learning algorithm actually advances the state of the art, the community relies on standardized simulation benchmarks. Platforms like ManiSkill, RoboSuite, and RLBench define hundreds of deterministic, reproducible manipulation and locomotion tasks with standardized scoring metrics.",
    h: [
      "Standardized task suites evaluate grasping, insertion, tool use, and long-horizon multi-step manipulation.",
      "Episodic reward functions and task success metrics evaluate policy completion rates rigorously.",
      "Standardized train/validation splits measure out-of-distribution generalization to unseen object geometries.",
      "Automated evaluation servers run headless Docker containers, preventing test set overfitting."
    ],
    k: [
      ["100+ tasks", "standardized across tabletop manipulation, bi-manual coordination, and mobile navigation"],
      ["0–100% success", "rate scoring with standardized confidence intervals across random seeds"],
      ["reproducibility", "guaranteed across research labs worldwide via deterministic physics seeds"]
    ],
    c: 2,
    x: "Simulation benchmarks can lead to 'benchmark hacking' where policies exploit simulation physics quirks that fail on real hardware.",
    co: [
      ["ManiSkill (UC San Diego)", "GPU-parallelized robotics benchmark suite built on SAPIEN physics", "maniskill.ai", "US"],
      ["UT Austin (RoboSuite / RoboCasa)", "Modular simulation framework and benchmark for robot learning", "robosuite.ai", "US"],
      ["Imperial College London (RLBench)", "Robot Learning Benchmark with 100 challenging manipulation tasks", "rlbench.github.io", "GB"],
      ["Meta AI (Ego4D / Habitat)", "Benchmarks evaluating visual navigation, mobile manipulation, and human interaction", "ai.meta.com", "US"],
      ["Google DeepMind (Control Suite)", "DeepMind Control Suite standardizing continuous control reinforcement learning tasks", "github.com/deepmind/dm_control", "GB"],
      ["Simon Fraser University (BEHAVIOR)", "Benchmark evaluating realistic physical domestic activities", "behavior.stanford.edu", "CA"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 20: POLICY
  // ------------------------------------------------------------
  {
    i: "vla", L: 20, n: "Vision-Language-Action (VLA) foundation models",
    s: "Large multimodal transformers mapping RGB pixels and language commands to action tokens",
    w: "Vision-Language-Action (VLA) models (Google RT-2, OpenVLA, π0, GR-1) represent the convergence of LLMs and robotics. By treating physical actions (joint angles, delta end-effector poses) as token sequences alongside text and image tokens, a single large transformer leverages internet-scale visual reasoning to execute multi-modal robot manipulation commands ('pick up the ripe banana').",
    h: [
      "A Vision Transformer (ViT) encodes multi-camera RGB video frames into visual patch tokens.",
      "A causal Large Language Model (Llama, Gemma, PaLM) fuses visual tokens with natural-language text instructions.",
      "Actions are discretized into continuous bins or tokenized as action chunks ($a_{t:t+k}$).",
      "The transformer outputs action token predictions directly to the low-level controller at 10–50 Hz."
    ],
    k: [
      ["1B–7B+", "parameters in modern generalist Vision-Language-Action foundation models"],
      ["10–50 Hz", "action token generation frequency controlling physical robot joints"],
      ["zero-shot", "semantic generalization to novel object classes and unstructured environments"]
    ],
    c: 3,
    x: "VLA models require high inference compute (>30W GPU), have inference latency (50–100 ms), and can hallucinate physically impossible actions without low-level safety regularizers.",
    co: [
      ["Physical Intelligence (π)", "Pioneered π0 (pi-zero) generalist robot foundation model for complex manipulation", "physicalintelligence.company", "US"],
      ["Google DeepMind (RT / Gemini)", "Robotics Transformer (RT-1, RT-2) and Gemini Robotics embodied reasoning", "deepmind.google", "GB"],
      ["OpenVLA Project (Stanford / Berkeley)", "OpenVLA — open-source 7B generalist Vision-Language-Action foundation model", "openvla.github.io", "US"],
      ["NVIDIA (Project GR00T)", "GR00T generalist foundation model for humanoid robot embodiment", "developer.nvidia.com", "US"],
      ["Covariant (RFM-1)", "Robotics Foundation Model 1 reasoning across text, image, video, and action modalities", "covariant.ai", "US"],
      ["Skild AI", "Scalable robot foundation model intelligence powering diverse physical robots", "skild.ai", "US"]
    ]
  },
  {
    i: "diffpolicy", L: 20, n: "Diffusion policies & flow matching",
    s: "Denoising diffusion models generating multimodal continuous action distributions",
    w: "Traditional neural networks predict a single mean action, failing when a task has multiple valid solutions (e.g., dodging an obstacle left OR right causes the network to average the two and crash into the center). Diffusion Policies (DP) and Flow Matching formulate action generation as a conditional denoising process, generating expressive, multi-modal continuous action trajectories.",
    h: [
      "A 1D temporal convolutional or transformer network starts from pure Gaussian noise.",
      "The network iteratively denoises the action sequence conditioned on camera visual features and proprioception.",
      "Action Chunking predicts a future trajectory of 16–64 steps ($a_{t \dots t+H}$) simultaneously.",
      "Denoising steps are accelerated using DDIM (Denoising Diffusion Implicit Models) to achieve 50 Hz real-time inference."
    ],
    k: [
      ["16–64 steps", "action chunking horizon predicted simultaneously, ensuring temporal trajectory smoothness"],
      ["multimodal", "distribution modeling naturally resolving symmetry and obstacle avoidance choices"],
      ["50 Hz", "real-time execution rate achieved with accelerated flow matching and DDIM solvers"]
    ],
    c: 3,
    x: "Diffusion Policy (invented by Cheng Chi, Shuran Song et al.) has become the dominant visuomotor policy architecture across academia and industry.",
    co: [
      ["Columbia University (Song Lab)", "Pioneered Diffusion Policy for Visuomotor Policy Learning (Cheng Chi, Shuran Song)", "diffusion-policy.cs.columbia.edu", "US"],
      ["Physical Intelligence (π)", "Integrated flow-matching and diffusion policy generation into large foundation models", "physicalintelligence.company", "US"],
      ["TRI (Toyota Research Institute)", "Diffusion policy implementations for robust household manipulation tasks", "tri.global", "US"],
      ["Hugging Face (LeRobot DP)", "Open-source optimized PyTorch implementations of Diffusion Policy", "huggingface.co/lerobot", "FR"],
      ["Dexmate", "Commercial deployment of diffusion-based teleoperation manipulation policies", "dexmate.com", "US"],
      ["Figure AI (Manipulation Policy)", "Leveraging action chunking and diffusion architectures for humanoid manipulation", "figure.ai", "US"]
    ]
  },
  {
    i: "il", L: 20, n: "Action chunking & imitation learning",
    s: "Action Chunking with Transformers (ACT) and behavior cloning from human demos",
    w: "Imitation Learning (Behavior Cloning) trains policies directly to mimic human demonstrations via supervised regression. Action Chunking with Transformers (ACT) combines a Conditional Variational Autoencoder (CVAE) with a transformer architecture, predicting chunks of future actions to eliminate compounding error drift and temporal jerkiness.",
    h: [
      "A CVAE encoder captures human demonstration style variations into a latent space variable ($z$).",
      "A transformer decoder takes visual tokens, joint states, and latent $z$ to predict a sequence of future action vectors.",
      "Temporal Ensembling computes an exponentially weighted average of overlapping action chunks at every time step.",
      "Mean Squared Error (MSE) loss plus KL-divergence loss train the network via standard gradient descent."
    ],
    k: [
      ["ACT (Tony Zhao / Chelsea Finn)", "pioneered Action Chunking with Transformers on low-cost ALOHA hardware"],
      ["50 demonstrations", "sufficient to learn high-precision bimanual tasks (e.g., slotting batteries into toys)"],
      ["zero compounding error", "achieved through multi-step temporal action chunk prediction"]
    ],
    c: 2,
    x: "Imitation learning policies are narrow: they excel at the demonstration task but fail to generalize if objects are moved outside the demonstration distribution.",
    co: [
      ["Stanford University (IRIS Lab / Finn)", "Pioneered ACT (Action Chunking with Transformers) and Mobile ALOHA (Tony Z. Zhao)", "tonyzhaozh.github.io/aloha", "US"],
      ["Hugging Face (LeRobot ACT)", "Standard open-source reference implementations and pre-trained weights for ACT", "huggingface.co/lerobot", "FR"],
      ["Generalist AI", "Imitation learning architectures and action chunking systems for physical manipulation", "generalist.ai", "US"],
      ["AgiBot (Software)", "Deploying transformer-based imitation learning on mass-produced humanoid robots", "agibot.com", "CN"],
      ["Unitree Robotics (AI Policy)", "Behavior cloning and imitation learning policies for bimanual manipulation", "unitree.com", "CN"],
      ["Dyna Robotics", "Imitation learning and foundation policy deployment on collaborative robots", "dynarobotics.com", "US"]
    ]
  },
  {
    i: "rl", L: 20, n: "Reinforcement learning for locomotion",
    s: "Proximal Policy Optimization (PPO) training robust blind and vision-guided legged gaits",
    w: "Hand-crafted classical controllers struggle to walk over rugged boulders, climb stairs, or recover from violent kicks. Deep Reinforcement Learning (RL) using Proximal Policy Optimization (PPO) trains neural network policies in massively parallel simulation over billions of environmental steps, learning agile, robust locomotion reflexes that transfer zero-shot to physical quadrupeds and humanoids.",
    h: [
      "Actor and Critic neural networks evaluate state observations and predict continuous joint position targets ($q_{des}$).",
      "PPO clipped surrogate objective function updates policy weights while preventing destructive large policy updates.",
      "Reward functions reward forward velocity and penalize foot slip, energy consumption, and high joint accelerations.",
      "A low-level PD controller ($τ = K_p(q_{des} - q) - K_d \dot{q}$) converts policy targets into physical motor torques at 1,000 Hz."
    ],
    k: [
      ["billions of steps", "simulated in hours across parallel GPU physics environments (Isaac Gym / Orbit)"],
      ["zero-shot transfer", "to physical outdoors, ice, gravel, and obstacle terrain without hardware fine-tuning"],
      ["5–10 m/s", "running speeds achieved on quadruped and bipedal robots using deep RL locomotion policies"]
    ],
    c: 3,
    x: "Deep RL has completely replaced classical trajectory optimization for quadrupedal and bipedal legged locomotion across the industry.",
    co: [
      ["NVIDIA (Isaac Gym / Orbit)", "Pioneered massively parallel GPU reinforcement learning for robotics locomotion", "developer.nvidia.com", "US"],
      ["ETH Zurich (Robotic Systems Lab)", "Pioneered PPO locomotion on ANYmal (Marco Hutter et al.)", "rsl.ethz.ch", "CH"],
      ["MIT (Biomimetic Robotics Lab / Sangbae Kim)", "Pioneered dynamic RL locomotion and parkour on MIT Cheetah", "biomimetics.mit.edu", "US"],
      ["Unitree Robotics", "Mass-market quadrupeds and humanoids running deep RL locomotion controllers", "unitree.com", "CN"],
      ["Boston Dynamics (AI Locomotion)", "Integrated deep RL adaptive locomotion into Spot and electric Atlas platforms", "bostondynamics.com", "US"],
      ["Agility Robotics (Locomotion RL)", "Reinforcement learning locomotion frameworks powering Digit humanoid fleets", "agilityrobotics.com", "US"]
    ]
  },
  {
    i: "worldmodel", L: 20, n: "Generative world models for robotics",
    s: "Video prediction and latent dynamics models simulating forward physical consequences",
    w: "To plan complex multi-step actions without trial-and-error in the real world, an embodied intelligence must imagine what will happen next. World models (e.g., Sora-like generative video models, DreamerV3) learn a compressed latent representation of the physical world, predicting future visual frames and physical contact dynamics conditioned on proposed candidate actions.",
    h: [
      "A spatial autoencoder compresses high-resolution RGB camera frames into compact latent vectors ($z_t$).",
      "A recurrent or transformer sequence model predicts the future latent state distribution ($z_{t+1}$) given action $a_t$.",
      "Model-Based RL algorithms imagine thousands of trajectories entirely inside the latent world model without interacting with real physics.",
      "Generative diffusion video models render high-fidelity future video predictions to verify safety constraints."
    ],
    k: [
      ["100% latent", "imagination: policies train inside the neural world model without querying physics engines"],
      ["physical common sense", "learned implicitly from millions of hours of real-world internet video datasets"],
      ["counterfactual planning", "simulating 'what happens if I push this glass?' before physical execution"]
    ],
    c: 2,
    x: "Emerging frontier of physical AI. World models promise to eliminate the need for hand-crafted physics simulators, but currently struggle with precise metric contact dynamics.",
    co: [
      ["World Labs (Fei-Fei Li)", "Spatial intelligence and generative 3D physical world models for embodied agents", "worldlabs.ai", "US"],
      ["Google DeepMind (Dreamer / Genie)", "DreamerV3 and Genie generative interactive world models", "deepmind.google", "GB"],
      ["Wayve", "GAIA-1 and LINGO generative world models for autonomous physical navigation", "wayve.ai", "GB"],
      ["OpenAI (Sora / Robotics)", "Generative physical world simulation and visual prediction research", "openai.com", "US"],
      ["Physical Intelligence (π)", "Incorporating predictive world modeling into multimodal robot foundation models", "physicalintelligence.company", "US"],
      ["Meta FAIR (I-JEPA / V-JEPA)", "Joint-Embedding Predictive Architecture learning world representations from video", "ai.meta.com", "US"]
    ]
  },
  {
    i: "rfm", L: 20, n: "Commercial robot foundation model providers",
    s: "Venture-backed foundation model developers providing hosted policy APIs",
    w: "Rather than training physical AI models from scratch, hardware OEMs (cobot builders, humanoid manufacturers) license hosted foundation models and policy APIs. Commercial physical AI model providers supply pre-trained generalist models, fine-tuning infrastructure, and fleet deployment runtimes as an enterprise software subscription.",
    h: [
      "Hardware OEMs connect robot sensor streams to the provider's edge runtime SDK.",
      "Customer-specific demonstration trajectories are uploaded to secure cloud fine-tuning clusters.",
      "Pre-trained generalist weights are specialized for specific customer workcells in hours.",
      "Inference executes locally on edge SoCs with fallback to cloud reasoning models for open-ended queries."
    ],
    k: [
      ["$100M–$1B+", "venture capital invested into physical AI foundation model startups in 2024–2026"],
      ["API abstraction", "enabling hardware robot OEMs to add autonomous visual picking without an in-house ML team"],
      ["continuous learning", "models improve weekly as customer fleets upload operational intervention data"]
    ],
    c: 3,
    x: "Physical AI foundation models represent the highest-margin software layer in the robotics economy, potentially capturing the economic surplus of downstream hardware commoditization.",
    co: [
      ["Physical Intelligence (π)", "General-purpose robot foundation model intelligence (San Francisco, CA)", "physicalintelligence.company", "US"],
      ["Skild AI", "Generalist brain for robotics across diverse manipulation and locomotion embodiments", "skild.ai", "US"],
      ["Covariant (Amazon)", "Universal AI robotics brain and foundation models for supply chain and warehouse automation", "covariant.ai", "US"],
      ["Figure AI (Helix AI)", "Developing integrated physical foundation models for Figure humanoid robots", "figure.ai", "US"],
      ["Sanctuary AI (Carbon)", "Carbon AI control system for general-purpose humanoid robots", "sanctuary.ai", "CA"],
      ["1X Technologies (NEO AI)", "Embodied foundation models for bipedal and wheeled humanoid platforms", "1x.tech", "NO"]
    ]
  },

  // ------------------------------------------------------------
  // STRATUM 21: ASSAY
  // ------------------------------------------------------------
  {
    i: "benchmark", L: 21, n: "Physical benchmarks & performance assays",
    s: "Standardized real-world physical task evaluations measuring success rate and cycle time",
    w: "A simulation benchmark score does not prove a robot can assemble a real gearbox on a factory floor. Standardized physical benchmark assays measure true real-world performance: insertion success rate (peg-in-hole with 20 µm clearance), pick-and-place cycle times (Picks Per Hour / PPH), grasp stability under external perturbation, and mean time to completion.",
    h: [
      "Standardized physical test workcells (NIST Assembly Task Board, YCB Object Set) present calibrated challenges.",
      "High-speed optical tracking systems verify final part seating depth, orientation angle, and force limits.",
      "Automated randomized part feeder trays present workpieces with varying orientations and lighting angles.",
      "Statistical trial runs (100–1,000 continuous cycles) calculate true 95% confidence intervals on success rates."
    ],
    k: [
      ["YCB Object Set", "Yale-CMU-Berkeley standardized physical artifact set used for manipulation benchmarking worldwide"],
      ["NIST Task Board", "National Institute of Standards and Technology assembly benchmark for precision manufacturing"],
      ["PPH (Picks Per Hour)", "core commercial warehouse KPI: target 400–600 PPH matching human manual pickers"]
    ],
    c: 2,
    x: "Lack of universal physical benchmarks makes comparing robot foundation model capabilities difficult; real-world evaluations remain labor-intensive.",
    co: [
      ["NIST (Intelligent Systems Division)", "U.S. National Institute of Standards and Technology developing robot benchmarks", "nist.gov", "US"],
      ["A3 (Association for Advancing Automation)", "Industry trade association setting robotic performance metrics and standards", "automate.org", "US"],
      ["VDI / VDE (Society for Measurement)", "German technical standards for industrial robot performance characterization", "vdi.de", "DE"],
      ["RoboWorld / IROS Benchmark Competitions", "Standardized autonomous manipulation and mobile robotic competitions", "ieee-ras.org", "US"],
      ["Fraunhofer IPA", "Applied research institute evaluating industrial robot performance and system automation", "ipa.fraunhofer.de", "DE"],
      ["Yaskawa Motoman (Test Labs)", "Commercial application test facilities benchmarking real-world customer cycle times", "yaskawa.com", "US"]
    ]
  },
  {
    i: "reliability", L: 21, n: "Accelerated reliability testing & MTBF",
    s: "Environmental chamber thermal cycling, joint stress testing, and Weibull analysis",
    w: "Industrial robots must operate 24 hours a day, 365 days a year for 8–10 years without unplanned breakdown. Reliability testing runs full robot arms and joint actuators inside climatic chambers under continuous maximum payload, temperature cycling (-20 to +60 °C), and 100% duty cycle, calculating Mean Time Between Failures (MTBF) and B10 component life.",
    h: [
      "Multi-axis cyclic test rigs cycle robot joints continuously under 1.2× rated dynamic torque.",
      "Climatic environmental chambers cycle humidity (0–95% RH) and temperature to accelerate thermal aging.",
      "Oil spectroscopy samples analyze metal particle wear concentration in gearboxes every 500 hours.",
      "Weibull failure statistical modeling calculates infant mortality (β < 1), random failure (β = 1), and wear-out (β > 1)."
    ],
    k: [
      ["60,000–100,000 hrs", "MTBF on premium 6-axis articulated industrial arms (Fanuc, Yaskawa, ABB)"],
      ["B10 Life", "the time by which 10% of tested components will fail (target >20,000 operating hours)"],
      ["<0.5% / year", "unplanned component failure rate in automotive body shop robotic installations"]
    ],
    c: 3,
    x: "Industrial OEMs built their reputation over 40 years of field reliability data. Emerging humanoid startups face severe skepticism regarding joint MTBF (currently often <2,000 hours in early pilot units).",
    co: [
      ["Fanuc Corporation (Reliability Labs)", "World-renowned reliability engineering achieving 100,000+ hour robot MTBF", "fanuc.co.jp", "JP"],
      ["Yaskawa Electric (Quality Assurance)", "Stringent robotic endurance testing and global servo motor reliability standards", "yaskawa.co.jp", "JP"],
      ["ABB Robotics (Test Center)", "Accelerated mechanical life testing and environmental qualification facilities", "abb.com", "SE"],
      ["KUKA AG (Quality & Testing)", "Automotive qualification, endurance burn-in, and fatigue life verification", "kuka.com", "DE"],
      ["ReliaSoft (Hottinger Brüel & Kjær)", "Weibull++ reliability analytics and life data analysis software suites", "reliasoft.com", "US"],
      ["TÜV Rheinland (Reliability Testing)", "Independent accredited reliability, environmental, and endurance testing laboratories", "tuv.com", "DE"]
    ]
  },
  {
    i: "machsafety", L: 21, n: "Machinery safety standards & directives",
    s: "ISO 10218-1/-2:2025 industrial robot safety standards and EU Machinery Regulation",
    w: "An industrial robot capable of moving 200 kg at 2 m/s is legally classified as dangerous machinery. International harmonized standards (ISO 10218-1/-2, updated in 2025) and the EU Machinery Regulation (2023/1230) mandate risk assessments, safety interlock architectures (ISO 13849-1 Performance Level d/e), and validated safety-rated stop functions before a robot can be powered on in a workplace.",
    h: [
      "ISO 12100 risk assessments identify all mechanical pinch, crushing, and high-speed impact hazards.",
      "Safety Circuit Architecture is designed to Category 3 or 4 with designated Performance Level (PL d / PL e).",
      "SISTEMA software calculates the Performance Level achieved based on component MTTFd, DCavg, and CCF.",
      "Safety integration validates physical interlocks, optical perimeter scanners, and emergency stop circuits."
    ],
    k: [
      ["ISO 10218-1/-2:2025", "comprehensive updated international safety standard for industrial robots and robot systems"],
      ["EU 2023/1230", "Mandatory European Machinery Regulation replacing the legacy Machinery Directive"],
      ["PL d / PL e", "required Performance Level for robot safety-related parts of control systems (SRP/CS)"]
    ],
    c: 3,
    x: "Statutory legal requirement. A robot cannot be sold or operated legally in Europe or North America without CE marking, UKCA, or OSHA/NRTL third-party certification confirming machinery directive compliance.",
    co: [
      ["ISO / TC 299 (Robotics Technical Committee)", "International Organization for Standardization committee drafting ISO 10218 and ISO 13482", "iso.org", "CH"],
      ["IFA (Institut für Arbeitsschutz der DGUV)", "Developers of SISTEMA safety calculation tool and European machinery safety research", "dguv.de", "DE"],
      ["Pilz GmbH (Safety Consulting)", "Global machinery safety services, risk assessment, and CE conformity certification", "pilz.com", "DE"],
      ["TÜV SÜD (Machinery Safety)", "Notified Body auditing and certifying industrial robot systems and safety components", "tuvsud.com", "DE"],
      ["UL Solutions (Industrial Robotics)", "UL 1740 safety standard certification for robots and robotic equipment", "ul.com", "US"],
      ["ANSI / RIA (Robotic Industries Association)", "ANSI/RIA R15.06 national consensus safety standard for industrial robots in the US", "automate.org", "US"]
    ]
  },
  {
    i: "servicesafety", L: 21, n: "Collaborative & personal care robot standards",
    s: "ISO/TS 15066 biomechanical limits and ISO 13482 personal care robot safety",
    w: "When a robot operates outside safety cages—sharing a tabletop with a human or walking inside a home—traditional fence interlocks do not apply. ISO/TS 15066 establishes strict biomechanical pain and injury thresholds (maximum permissible pressure and force for 29 human body regions), while ISO 13482 governs personal care and physical assistant humanoids.",
    h: [
      "Biomechanical impact testing measures dynamic transient impact force ($F_{transient}$) and static clamping force ($F_{static}$).",
      "Calibrated bio-fidelic force-pressure measuring devices equipped with human-skin-mimicking spring dampers record impact curves.",
      "Speed and Separation Monitoring (SSM) dynamically limits TCP velocity based on human distance and reaction time.",
      "Power and Force Limiting (PFL) triggers automatic soft safety stops if contact forces exceed body-zone thresholds (e.g., 140 N on hands/arms)."
    ],
    k: [
      ["ISO/TS 15066", "technical specification defining biomechanical force and pressure limits for human-robot collaboration"],
      ["ISO 13482:2014", "international safety standard for personal care robots, physical assistant robots, and humanoids"],
      ["140 N / 200 N", "maximum permissible transient impact force on human chest and arm regions"]
    ],
    c: 3,
    x: "High-speed humanoids currently cannot legally operate at full speed near humans under ISO/TS 15066 without physical safety separation or low-inertia collaborative operation modes.",
    co: [
      ["Pilz (Collaborative Safety)", "PRODIS biomechanical force and pressure measurement sets for cobots", "pilz.com", "DE"],
      ["Fraunhofer IFF (Magdeburg)", "Pioneered biomechanical pain threshold studies establishing ISO/TS 15066 limits", "iff.fraunhofer.de", "DE"],
      ["TÜV Rheinland (Collaborative Robotics)", "Testing and certification according to ISO/TS 15066 and ISO 13482", "tuv.com", "DE"],
      ["UL Solutions (UL 3300)", "UL 3300 Outline of Investigation for Service, Communication, and Education Robots", "ul.com", "US"],
      ["DEKRA (Consumer Robotics Safety)", "Safety testing and certification for domestic and collaborative robots", "dekra.com", "DE"],
      ["Universal Robots (Safety Team)", "Pioneered certified collaborative robot safety functions (UR Safety Core)", "universal-robots.com", "DK"]
    ]
  },
  {
    i: "certbody", L: 21, n: "Notified bodies & accredited test labs",
    s: "TÜV, UL Solutions, and DEKRA issuing statutory field compliance certificates",
    w: "Before a robotic workcell can be insured or powered up on an enterprise customer's shop floor, independent accredited testing laboratories (Notified Bodies in Europe, Nationally Recognized Testing Laboratories / NRTLs in the US) audit the machine design, test electrical safety (IEC 60204-1), verify EMC emissions, and issue statutory conformity certificates.",
    h: [
      "Accredited test engineers audit technical design files, electrical schematics, and functional safety architecture.",
      "Anechoic RF chambers measure electromagnetic emissions (EMC / EMI) and immunity to high-frequency transients.",
      "Dielectric withstand and ground-continuity tests verify electrical insulation safety under high voltage.",
      "Official Type Examination Certificates and NRTL listing marks are issued for commercial field deployment."
    ],
    k: [
      ["CE / UKCA / NRTL", "mandatory statutory marks required for commercial legal machinery operation"],
      ["IEC 60204-1", "international standard for safety of machinery electrical equipment"],
      ["10–50k USD", "typical third-party certification and auditing cost per robotic platform type"]
    ],
    c: 2,
    x: "Independent certification is legally non-negotiable for enterprise deployments; Notified Bodies hold gatekeeper authority over new autonomous machine form factors.",
    co: [
      ["TÜV SÜD", "World-renowned German Notified Body and accredited testing organization for industrial automation", "tuvsud.com", "DE"],
      ["TÜV Rheinland", "Global testing and certification services for robotics, industrial machinery, and functional safety", "tuv.com", "DE"],
      ["UL Solutions", "Leading U.S. Nationally Recognized Testing Laboratory (NRTL) and global safety standards developer", "ul.com", "US"],
      ["DEKRA", "Global testing, inspection, and certification organization for industrial and automotive robotics", "dekra.com", "DE"],
      ["Intertek Group", "ETL Listed Mark and comprehensive industrial equipment safety and EMC certification", "intertek.com", "GB"],
      ["SGS Group", "World leader in inspection, verification, testing, and certification for industrial equipment", "sgs.com", "CH"]
    ]
  },
  {
    i: "failure", L: 21, n: "Fault injection & hazard analysis",
    s: "Hardware-in-the-loop fault injection and adversarial cyber-physical testing",
    w: "To ensure a robot never enters an uncontrolled runaway state, safety engineers conduct adversarial fault injection testing. Hardware-in-the-loop (HIL) simulators and physical test benches inject simulated encoder bit errors, open-circuit phase wires, severed fieldbus cables, and frozen sensor streams, proving that the robot safely enters a fail-safe state under all single-point fault conditions.",
    h: [
      "Fault Injection Test Benches break physical connections, short motor phase lines, and corrupt fieldbus data frames.",
      "Failure Mode and Effects Analysis (FMEA) and Fault Tree Analysis (FTA) systematically map all potential failure modes.",
      "Diagnostic Coverage (DCavg) metrics quantify the percentage of dangerous faults detected by self-test routines.",
      "Adversarial cyber-security testing audits CAN/Ethernet networks against spoofing and unauthorized packet injection."
    ],
    k: [
      [">99%", "Diagnostic Coverage (DC) required for ISO 13849-1 Category 4 / PL e safety systems"],
      ["100% single-fault", "tolerance: no single hardware or software failure may lead to loss of safety function"],
      ["HIL simulation", "thousands of fault injection scenarios tested automatically in CI/CD software pipelines"]
    ],
    c: 2,
    x: "Required for aerospace, surgical, and automotive-grade robotic safety cases; ensures compliance with ISO 13849 and ISO 26262 standards.",
    co: [
      ["dSPACE GmbH", "Hardware-in-the-Loop (HIL) simulation and automated fault injection test systems", "dspace.com", "DE"],
      ["National Instruments (Emerson)", "TestStand, LabVIEW, and automated HIL test benches for mechatronics validation", "ni.com", "US"],
      ["Vector Informatik", "CANoe and vTESTstudio automated test and fault injection tools for real-time networks", "vector.com", "DE"],
      ["Ansys (medini analyze)", "Model-based functional safety and cybersecurity analysis software (FMEA, FTA)", "ansys.com", "US"],
      ["Item Software", "Reliability engineering, FMEA, Fault Tree analysis, and safety risk assessment tools", "itemsoft.com", "US"],
      ["TÜV SÜD (Cyber Security & Safety)", "Cyber-physical security auditing and fault injection verification for industrial machinery", "tuvsud.com", "DE"]
    ]
  }
];
