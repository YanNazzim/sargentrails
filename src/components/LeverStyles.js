import images from "../images"; // Adjust path as needed

const leverStyleOptions = [
  // Standard Levers
  {
    value: "A",
    label: "A Lever (Handed)",
    image: images.LeverA,
    partNumbers: {
      "Cylindrical (Bored Locks)": "A-CYL-001",
      "DL Series": { inside: "A-CYL-INS-001", outside: "A-CYL-OUT-001" },
      Mortise: { inside: "A-MO-INS-001", outside: "A-MO-OUT-001" },
      Exits: "A-EX-001",
    },
  },
  {
    value: "B",
    label: "B Lever",
    image: images.LeverB,
    partNumbers: {
      "Cylindrical (Bored Locks)": "B-CYL-001",
      "DL Series": { inside: "B-CYL-INS-001", outside: "B-CYL-OUT-001" },
      Mortise: { inside: "B-MO-INS-001", outside: "B-MO-OUT-001" },
      Exits: "B-EX-001",
    },
  },
  {
    value: "E",
    label: "E Lever",
    image: images.LeverE,
    partNumbers: {
      "Cylindrical (Bored Locks)": "E-CYL-001",
      "DL Series": { inside: "E-CYL-INS-001", outside: "E-CYL-OUT-001" },
      Mortise: { inside: "E-MO-INS-001", outside: "E-MO-OUT-001" },
      Exits: "E-EX-001",
    },
  },
  {
    value: "F",
    label: "F Lever",
    image: images.LeverF,
    partNumbers: {
      "Cylindrical (Bored Locks)": "F-CYL-001",
      "DL Series": { inside: "F-CYL-INS-001", outside: "F-CYL-OUT-001" },
      Mortise: { inside: "F-MO-INS-001", outside: "F-MO-OUT-001" },
      Exits: "F-EX-001",
    },
  },
  {
    value: "J",
    label: "J Lever",
    image: images.LeverJ,
    partNumbers: {
      "Cylindrical (Bored Locks)": "J-CYL-001",
      "DL Series": { inside: "J-CYL-INS-001", outside: "J-CYL-OUT-001" },
      Mortise: { inside: "J-MO-INS-001", outside: "J-MO-OUT-001" },
      Exits: "J-EX-001",
    },
  },
  {
    value: "L",
    label: "L Lever",
    image: images.LeverL,
    partNumbers: {
      "Cylindrical (Bored Locks)": "L-CYL-001",
      "DL Series": { inside: "L-CYL-INS-001", outside: "L-CYL-OUT-001" },
      Mortise: { inside: "L-MO-INS-001", outside: "L-MO-OUT-001" },
      Exits: "L-EX-001",
    },
  },
  {
    value: "P",
    label: "P Lever",
    image: images.LeverP,
    partNumbers: {
      "Cylindrical (Bored Locks)": "P-CYL-001",
      "DL Series": { inside: "P-CYL-INS-001", outside: "P-CYL-OUT-001" },
      Mortise: { inside: "P-MO-INS-001", outside: "P-MO-OUT-001" },
      Exits: "P-EX-001",
    },
  },
  {
    value: "W",
    label: "W Lever",
    image: images.LeverW,
    partNumbers: {
      "Cylindrical (Bored Locks)": "W-CYL-001",
      "DL Series": { inside: "W-CYL-INS-001", outside: "W-CYL-OUT-001" },
      Mortise: { inside: "W-MO-INS-001", outside: "W-MO-OUT-001" },
      Exits: "W-EX-001",
    },
  },

  // Coastal Series
  {
    value: "R",
    label: "R - Rockport Lever",
    image: images.LeverR,
    partNumbers: {
      "Cylindrical (Bored Locks)": "R-CYL-001",
      "DL Series": { inside: "R-CYL-INS-001", outside: "R-CYL-OUT-001" },
      Mortise: { inside: "R-MO-INS-001", outside: "R-MO-OUT-001" },
      Exits: "R-EX-001",
    },
  },
  {
    value: "S",
    label: "S - Sanibel Lever (Handed)",
    image: images.LeverS,
    partNumbers: {
      "Cylindrical (Bored Locks)": "S-CYL-001",
      "DL Series": { inside: "S-CYL-INS-001", outside: "S-CYL-OUT-001" },
      Mortise: { inside: "S-MO-INS-001", outside: "S-MO-OUT-001" },
      Exits: "S-EX-001",
    },
  },
  {
    value: "Y",
    label: "Y - Yarmouth Lever (Handed)",
    image: images.LeverY,
    partNumbers: {
      "Cylindrical (Bored Locks)": "Y-CYL-001",
      "DL Series": { inside: "Y-CYL-INS-001", outside: "Y-CYL-OUT-001" },
      Mortise: { inside: "Y-MO-INS-001", outside: "Y-MO-OUT-001" },
      Exits: "Y-EX-001",
    },
  },
  {
    value: "G",
    label: "G - Gulfport Lever (Handed)",
    image: images.LeverG,
    partNumbers: {
      "Cylindrical (Bored Locks)": "G-CYL-001",
      "DL Series": { inside: "G-CYL-INS-001", outside: "G-CYL-OUT-001" },
      Mortise: { inside: "G-MO-INS-001", outside: "G-MO-OUT-001" },
      Exits: "G-EX-001",
    },
  },

  // Centro Series
  {
    value: "MD",
    label: "MD Lever",
    image: images.LeverMD,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MD-CYL-001",
      "DL Series": { inside: "MD-CYL-INS-001", outside: "MD-CYL-OUT-001" },
      Mortise: { inside: "MD-MO-INS-001", outside: "MD-MO-OUT-001" },
      Exits: "MD-EX-001",
    },
  },
  {
    value: "MJ",
    label: "MJ Lever",
    image: images.LeverMJ,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MJ-CYL-001",
      "DL Series": { inside: "MJ-CYL-INS-001", outside: "MJ-CYL-OUT-001" },
      Mortise: { inside: "MJ-MO-INS-001", outside: "MJ-MO-OUT-001" },
      Exits: "MJ-EX-001",
    },
  },
  {
    value: "MP",
    label: "MP Lever",
    image: images.LeverMP,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MP-CYL-001",
      "DL Series": { inside: "MP-CYL-INS-001", outside: "MP-CYL-OUT-001" },
      Mortise: { inside: "MP-MO-INS-001", outside: "MP-MO-OUT-001" },
      Exits: "MP-EX-001",
    },
  },
  {
    value: "ND",
    label: "ND Lever",
    image: images.LeverND,
    partNumbers: {
      "Cylindrical (Bored Locks)": "ND-CYL-001",
      "DL Series": { inside: "ND-CYL-INS-001", outside: "ND-CYL-OUT-001" },
      Mortise: { inside: "ND-MO-INS-001", outside: "ND-MO-OUT-001" },
      Exits: "ND-EX-001",
    },
  },
  {
    value: "NJ",
    label: "NJ Lever",
    image: images.LeverNJ,
    partNumbers: {
      "Cylindrical (Bored Locks)": "NJ-CYL-001",
      "DL Series": { inside: "NJ-CYL-INS-001", outside: "NJ-CYL-OUT-001" },
      Mortise: { inside: "NJ-MO-INS-001", outside: "NJ-MO-OUT-001" },
      Exits: "NJ-EX-001",
    },
  },

  // Notting Hill Series
  {
    value: "MA",
    label: "MA Lever",
    image: images.LeverMA,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MA-CYL-001",
      "DL Series": { inside: "MA-CYL-INS-001", outside: "MA-CYL-OUT-001" },
      Mortise: { inside: "MA-MO-INS-001", outside: "MA-MO-OUT-001" },
      Exits: "MA-EX-001",
    },
  },
  {
    value: "MQ",
    label: "MQ Lever (Handed)",
    image: images.LeverMQ,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MQ-CYL-001",
      "DL Series": { inside: "MQ-CYL-INS-001", outside: "MQ-CYL-OUT-001" },
      Mortise: { inside: "MQ-MO-INS-001", outside: "MQ-MO-OUT-001" },
      Exits: "MQ-EX-001",
    },
  },
  {
    value: "MT",
    label: "MT Lever (Handed)",
    image: images.LeverMT,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MT-CYL-001",
      "DL Series": { inside: "MT-CYL-INS-001", outside: "MT-CYL-OUT-001" },
      Mortise: { inside: "MT-MO-INS-001", outside: "MT-MO-OUT-001" },
      Exits: "MT-EX-001",
    },
  },
  {
    value: "MO",
    label: "MO Lever",
    image: images.LeverMO,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MO-CYL-001",
      "DL Series": { inside: "MO-CYL-INS-001", outside: "MO-CYL-OUT-001" },
      Mortise: { inside: "MO-MO-INS-001", outside: "MO-MO-OUT-001" },
      Exits: "MO-EX-001",
    },
  },
  {
    value: "MZ",
    label: "MZ Lever (Handed)",
    image: images.LeverMZ,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MZ-CYL-001",
      "DL Series": { inside: "MZ-CYL-INS-001", outside: "MZ-CYL-OUT-001" },
      Mortise: { inside: "MZ-MO-INS-001", outside: "MZ-MO-OUT-001" },
      Exits: "MZ-EX-001",
    },
  },
  {
    value: "GT",
    label: "GT Lever (Handed)",
    image: images.LeverGT,
    partNumbers: {
      "Cylindrical (Bored Locks)": "GT-CYL-001",
      "DL Series": { inside: "GT-CYL-INS-001", outside: "GT-CYL-OUT-001" },
      Mortise: { inside: "GT-MO-INS-001", outside: "GT-MO-OUT-001" },
      Exits: "GT-EX-001",
    },
  },

  // Aventura Series
  {
    value: "MB",
    label: "MB Lever",
    image: images.LeverMB,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MB-CYL-001",
      "DL Series": { inside: "MB-CYL-INS-001", outside: "MB-CYL-OUT-001" },
      Mortise: { inside: "MB-MO-INS-001", outside: "MB-MO-OUT-001" },
      Exits: "MB-EX-001",
    },
  },
  {
    value: "ME",
    label: "ME Lever",
    image: images.LeverME,
    partNumbers: {
      "Cylindrical (Bored Locks)": "ME-CYL-001",
      "DL Series": { inside: "ME-CYL-INS-001", outside: "ME-CYL-OUT-001" },
      Mortise: { inside: "ME-MO-INS-001", outside: "ME-MO-OUT-001" },
      Exits: "ME-EX-001",
    },
  },
  {
    value: "MF",
    label: "MF Lever",
    image: images.LeverMF,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MF-CYL-001",
      "DL Series": { inside: "MF-CYL-INS-001", outside: "MF-CYL-OUT-001" },
      Mortise: { inside: "MF-MO-INS-001", outside: "MF-MO-OUT-001" },
      Exits: "MF-EX-001",
    },
  },
  {
    value: "NF",
    label: "NF Lever",
    image: images.LeverNF,
    partNumbers: {
      "Cylindrical (Bored Locks)": "NF-CYL-001",
      "DL Series": { inside: "NF-CYL-INS-001", outside: "NF-CYL-OUT-001" },
      Mortise: { inside: "NF-MO-INS-001", outside: "NF-MO-OUT-001" },
      Exits: "NF-EX-001",
    },
  },
  {
    value: "MG",
    label: "MG Lever",
    image: images.LeverMG,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MG-CYL-001",
      "DL Series": { inside: "MG-CYL-INS-001", outside: "MG-CYL-OUT-001" },
      Mortise: { inside: "MG-MO-INS-001", outside: "MG-MO-OUT-001" },
      Exits: "MG-EX-001",
    },
  },
  {
    value: "MI",
    label: "MI Lever",
    image: images.LeverMI,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MI-CYL-001",
      "DL Series": { inside: "MI-CYL-INS-001", outside: "MI-CYL-OUT-001" },
      Mortise: { inside: "MI-MO-INS-001", outside: "MI-MO-OUT-001" },
      Exits: "MI-EX-001",
    },
  },
  {
    value: "MW",
    label: "MW Lever",
    image: images.LeverMW,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MW-CYL-001",
      "DL Series": { inside: "MW-CYL-INS-001", outside: "MW-CYL-OUT-001" },
      Mortise: { inside: "MW-MO-INS-001", outside: "MW-MO-OUT-001" },
      Exits: "MW-EX-001",
    },
  },

  // Odeon Series
  {
    value: "MN",
    label: "MN Lever (Handed)",
    image: images.LeverMN,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MN-CYL-001",
      "DL Series": { inside: "MN-CYL-INS-001", outside: "MN-CYL-OUT-001" },
      Mortise: { inside: "MN-MO-INS-001", outside: "MN-MO-OUT-001" },
      Exits: "MN-EX-001",
    },
  },
  {
    value: "MH",
    label: "MH Lever (Handed)",
    image: images.LeverMH,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MH-CYL-001",
      "DL Series": { inside: "MH-CYL-INS-001", outside: "MH-CYL-OUT-001" },
      Mortise: { inside: "MH-MO-INS-001", outside: "MH-MO-OUT-001" },
      Exits: "MH-EX-001",
    },
  },
  {
    value: "MS",
    label: "MS Lever (Handed)",
    image: images.LeverMS,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MS-CYL-001",
      "DL Series": { inside: "MS-CYL-INS-001", outside: "MS-CYL-OUT-001" },
      Mortise: { inside: "MS-MO-INS-001", outside: "MS-MO-OUT-001" },
      Exits: "MS-EX-001",
    },
  },
  {
    value: "MU",
    label: "MU Lever (Handed)",
    image: images.LeverMU,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MU-CYL-001",
      "DL Series": { inside: "MU-CYL-INS-001", outside: "MU-CYL-OUT-001" },
      Mortise: { inside: "MU-MO-INS-001", outside: "MU-MO-OUT-001" },
      Exits: "MU-EX-001",
    },
  },
  {
    value: "MV",
    label: "MV Lever (Handed)",
    image: images.LeverMV,
    partNumbers: {
      "Cylindrical (Bored Locks)": "MV-CYL-001",
      "DL Series": { inside: "MV-CYL-INS-001", outside: "MV-CYL-OUT-001" },
      Mortise: { inside: "MV-MO-INS-001", outside: "MV-MO-OUT-001" },
      Exits: "MV-EX-001",
    },
  },
  {
    value: "NU",
    label: "NU Lever (Handed)",
    image: images.LeverNU,
    partNumbers: {
      "Cylindrical (Bored Locks)": "NU-CYL-001",
      "DL Series": { inside: "NU-CYL-INS-001", outside: "NU-CYL-OUT-001" },
      Mortise: { inside: "NU-MO-INS-001", outside: "NU-MO-OUT-001" },
      Exits: "NU-EX-001",
    },
  },
  {
    value: "WG",
    label: "WG Lever (Handed)",
    image: images.LeverWG,
    partNumbers: {
      "Cylindrical (Bored Locks)": "WG-CYL-001",
      "DL Series": { inside: "WG-CYL-INS-001", outside: "WG-CYL-OUT-001" },
      Mortise: { inside: "WG-MO-INS-001", outside: "WG-MO-OUT-001" },
      Exits: "WG-EX-001",
    },
  },

  // Gramercy Series
  {
    value: "RCM",
    label: "RCM Lever",
    image: images.LeverRCM,
    partNumbers: {
      "Cylindrical (Bored Locks)": "RCM-CYL-001",
      "DL Series": { inside: "RCM-CYL-INS-001", outside: "RCM-CYL-OUT-001" },
      Mortise: { inside: "RCM-MO-INS-001", outside: "RCM-MO-OUT-001" },
      Exits: "RCM-EX-001",
    },
  },
  {
    value: "RAL",
    label: "RAL Lever",
    image: images.LeverRAL,
    partNumbers: {
      "Cylindrical (Bored Locks)": "RAL-CYL-001",
      "DL Series": { inside: "RAL-CYL-INS-001", outside: "RAL-CYL-OUT-001" },
      Mortise: { inside: "RAL-MO-INS-001", outside: "RAL-MO-OUT-001" },
      Exits: "RAL-EX-001",
    },
  },
  {
    value: "REM",
    label: "REM Lever",
    image: images.LeverREM,
    partNumbers: {
      "Cylindrical (Bored Locks)": "REM-CYL-001",
      "DL Series": { inside: "REM-CYL-INS-001", outside: "REM-CYL-OUT-001" },
      Mortise: { inside: "REM-MO-INS-001", outside: "REM-MO-OUT-001" },
      Exits: "REM-EX-001",
    },
  },
  {
    value: "RAM",
    label: "RAM Lever",
    image: images.LeverRAM,
    partNumbers: {
      "Cylindrical (Bored Locks)": "RAM-CYL-001",
      "DL Series": { inside: "RAM-CYL-INS-001", outside: "RAM-CYL-OUT-001" },
      Mortise: { inside: "RAM-MO-INS-001", outside: "RAM-MO-OUT-001" },
      Exits: "RAM-EX-001",
    },
  },
  {
    value: "RAS",
    label: "RAS Lever",
    image: images.LeverRAS,
    partNumbers: {
      "Cylindrical (Bored Locks)": "RAS-CYL-001",
      "DL Series": { inside: "RAS-CYL-INS-001", outside: "RAS-CYL-OUT-001" },
      Mortise: { inside: "RAS-MO-INS-001", outside: "RAS-MO-OUT-001" },
      Exits: "RAS-EX-001",
    },
  },
  {
    value: "RAG",
    label: "RAG Lever",
    image: images.LeverRAG,
    partNumbers: {
      "Cylindrical (Bored Locks)": "RAG-CYL-001",
      "DL Series": { inside: "RAG-CYL-INS-001", outside: "RAG-CYL-OUT-001" },
      Mortise: { inside: "RAG-MO-INS-001", outside: "RAG-MO-OUT-001" },
      Exits: "RAG-EX-001",
    },
  },
  {
    value: "RGM",
    label: "RGM Lever",
    image: images.LeverRGM,
    partNumbers: {
      "Cylindrical (Bored Locks)": "RGM-CYL-001",
      "DL Series": { inside: "RGM-CYL-INS-001", outside: "RGM-CYL-OUT-001" },
      Mortise: { inside: "RGM-MO-INS-001", outside: "RGM-MO-OUT-001" },
      Exits: "RGM-EX-001",
    },
  },
  {
    value: "H015",
    label: "H015 Lever",
    image: images.LeverH015,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H015-CYL-001",
      "DL Series": { inside: "H015-CYL-INS-001", outside: "H015-CYL-OUT-001" },
      Mortise: { inside: "H015-MO-INS-001", outside: "H015-MO-OUT-001" },
      Exits: "H015-EX-001",
    },
  },
  {
    value: "H016",
    label: "H016 Lever",
    image: images.LeverH016,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H016-CYL-001",
      "DL Series": { inside: "H016-CYL-INS-001", outside: "H016-CYL-OUT-001" },
      Mortise: { inside: "H016-MO-INS-001", outside: "H016-MO-OUT-001" },
      Exits: "H016-EX-001",
    },
  },
  {
    value: "H017",
    label: "H017 Lever",
    image: images.LeverH017,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H017-CYL-001",
      "DL Series": { inside: "H017-CYL-INS-001", outside: "H017-CYL-OUT-001" },
      Mortise: { inside: "H017-MO-INS-001", outside: "H017-MO-OUT-001" },
      Exits: "H017-EX-001",
    },
  },
  {
    value: "H018",
    label: "H018 Lever",
    image: images.LeverH018,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H018-CYL-001",
      "DL Series": { inside: "H018-CYL-INS-001", outside: "H018-CYL-OUT-001" },
      Mortise: { inside: "H018-MO-INS-001", outside: "H018-MO-OUT-001" },
      Exits: "H018-EX-001",
    },
  },

  // Wooster Square
  {
    value: "H001",
    label: "H001 Lever",
    image: images.LeverH001,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H001-CYL-001",
      "DL Series": { inside: "H001-CYL-INS-001", outside: "H001-CYL-OUT-001" },
      Mortise: { inside: "H001-MO-INS-001", outside: "H001-MO-OUT-001" },
      Exits: "H001-EX-001",
    },
  },
  {
    value: "H002",
    label: "H002 Lever",
    image: images.LeverH002,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H002-CYL-001",
      "DL Series": { inside: "H002-CYL-INS-001", outside: "H002-CYL-OUT-001" },
      Mortise: { inside: "H002-MO-INS-001", outside: "H002-MO-OUT-001" },
      Exits: "H002-EX-001",
    },
  },
  {
    value: "H003",
    label: "H003 Lever",
    image: images.LeverH003,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H003-CYL-001",
      "DL Series": { inside: "H003-CYL-INS-001", outside: "H003-CYL-OUT-001" },
      Mortise: { inside: "H003-MO-INS-001", outside: "H003-MO-OUT-001" },
      Exits: "H003-EX-001",
    },
  },
  {
    value: "H004",
    label: "H004 Lever",
    image: images.LeverH004,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H004-CYL-001",
      "DL Series": { inside: "H004-CYL-INS-001", outside: "H004-CYL-OUT-001" },
      Mortise: { inside: "H004-MO-INS-001", outside: "H004-MO-OUT-001" },
      Exits: "H004-EX-001",
    },
  },
  {
    value: "H005",
    label: "H005 Lever",
    image: images.LeverH005,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H005-CYL-001",
      "DL Series": { inside: "H005-CYL-INS-001", outside: "H005-CYL-OUT-001" },
      Mortise: { inside: "H005-MO-INS-001", outside: "H005-MO-OUT-001" },
      Exits: "H005-EX-001",
    },
  },
  {
    value: "H006",
    label: "H006 Lever",
    image: images.LeverH006,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H006-CYL-001",
      "DL Series": { inside: "H006-CYL-INS-001", outside: "H006-CYL-OUT-001" },
      Mortise: { inside: "H006-MO-INS-001", outside: "H006-MO-OUT-001" },
      Exits: "H006-EX-001",
    },
  },
  {
    value: "H007",
    label: "H007 Lever",
    image: images.LeverH007,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H007-CYL-001",
      "DL Series": { inside: "H007-CYL-INS-001", outside: "H007-CYL-OUT-001" },
      Mortise: { inside: "H007-MO-INS-001", outside: "H007-MO-OUT-001" },
      Exits: "H007-EX-001",
    },
  },
  {
    value: "H008",
    label: "H008 Lever",
    image: images.LeverH008,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H008-CYL-001",
      "DL Series": { inside: "H008-CYL-INS-001", outside: "H008-CYL-OUT-001" },
      Mortise: { inside: "H008-MO-INS-001", outside: "H008-MO-OUT-001" },
      Exits: "H008-EX-001",
    },
  },
  {
    value: "H011",
    label: "H011 Lever",
    image: images.LeverH011,
    partNumbers: {
      "Cylindrical (Bored Locks)": "H011-CYL-001",
      "DL Series": { inside: "H011-CYL-INS-001", outside: "H011-CYL-OUT-001" },
      Mortise: { inside: "H011-MO-INS-001", outside: "H011-MO-OUT-001" },
      Exits: "H011-EX-001",
    },
  },
];

export default leverStyleOptions;
