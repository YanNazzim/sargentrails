import images from "../images"; // Adjust path as needed

const leverStyleOptions = [
  // Standard Levers
  {
    value: "A",
    label: "A Lever (Handed)",
    image: images.LeverA,
    partNumbers: {
      "DL Series": {
        inside: { LH: "DL-0041", RH: "DL-0040" },
        outside: { LH: "DL-0041", RH: "DL-0040" },
      },
      Mortise: {
        inside: { LH: "DL-0041", RH: "DL-0040" },
        outside: { LH: "82-0152", RH: "82-0151" },
      },
      Exits: { LH: "82-0152", RH: "82-0151" },
    },
  },
  {
    value: "B",
    label: "B Lever",
    image: images.LeverB,
    partNumbers: {
      "DL Series": { inside: "DL-0042", outside: "DL-0042" },
      Mortise: { inside: "DL-0042", outside: "82-0153" },
      Exits: "82-0153",
    },
  },
  {
    value: "E",
    label: "E Lever",
    image: images.LeverE,
    partNumbers: {
      "DL Series": { inside: "DL-0043", outside: "DL-0043" },
      Mortise: { inside: "DL-0043", outside: "82-0154" },
      Exits: "82-0154",
    },
  },
  {
    value: "F",
    label: "F Lever",
    image: images.LeverF,
    partNumbers: {
      "DL Series": { inside: "DL-0044", outside: "DL-0044" },
      Mortise: { inside: "DL-0044", outside: "82-0155" },
      Exits: "82-0155",
    },
  },
  {
    value: "J",
    label: "J Lever",
    image: images.LeverJ,
    partNumbers: {
      "DL Series": { inside: "DL-0045", outside: "DL-0045" },
      Mortise: { inside: "DL-0045", outside: "82-0156" },
      Exits: "97-0486",
    },
  },
  {
    value: "L",
    label: "L Lever",
    image: images.LeverL,
    partNumbers: {
      "DL Series": { inside: "DL-0046", outside: "DL-0046" },
      Mortise: { inside: "DL-0046", outside: "82-0157" },
      Exits: "97-0485",
    },
  },
  {
    value: "P",
    label: "P Lever",
    image: images.LeverP,
    partNumbers: {
      "DL Series": { inside: "DL-0047", outside: "DL-0047" },
      Mortise: { inside: "DL-0047", outside: "82-0158" },
      Exits: "97-0484",
    },
  },
  {
    value: "W",
    label: "W Lever",
    image: images.LeverW,
    partNumbers: {
      "DL Series": { inside: "DL-0048", outside: "DL-0048" },
      Mortise: { inside: "DL-0048", outside: "82-0159" },
      Exits: "82-0159",
    },
  },

  // Coastal Series
  {
    value: "R",
    label: "R - Rockport Lever",
    image: images.LeverR,
    partNumbers: {
      "DL Series": { inside: "DL-0049", outside: "DL-0049" },
      Mortise: { inside: "DL-0049", outside: "82-0517" },
      Exits: "82-0517",
    },
  },
  {
    value: "S",
    label: "S - Sanibel Lever (Handed)",
    image: images.LeverS,
    partNumbers: {
      "DL Series": {
        inside: { LH: "DL-0052", RH: "DL-0051" },
        outside: { LH: "DL-0052", RH: "DL-0051" },
      },
      Mortise: {
        inside: { LH: "DL-0052", RH: "DL-0051" },
        outside: { LH: "82-0522", RH: "82-0523" },
      },
      Exits: { LH: "82-0522", RH: "82-0523" },
    },
  },
  {
    value: "Y",
    label: "Y - Yarmouth Lever (Handed)",
    image: images.LeverY,
    partNumbers: {
      "DL Series": {
        inside: { LH: "DL-0056", RH: "DL-0055" },
        outside: { LH: "DL-0056", RH: "DL-0055" },
      },
      Mortise: {
        inside: { LH: "DL-0056", RH: "DL-0055" },
        outside: { LH: "82-0530", RH: "82-0531" },
      },
      Exits: { LH: "82-0530", RH: "82-0531" },
    },
  },
  {
    value: "G",
    label: "G - Gulfport Lever (Handed)",
    image: images.LeverG,
    partNumbers: {
      "DL Series": {
        inside: { LH: "DL-0054", RH: "DL-0053" },
        outside: { LH: "DL-0054", RH: "DL-0053" },
      },
      Mortise: {
        inside: { LH: "DL-0054", RH: "DL-0053" },
        outside: { LH: "82-0526", RH: "82-0527" },
      },
      Exits: { LH: "82-0526", RH: "82-0527" },
    },
  },
  // Centro Series
  {
    value: "MD",
    label: "MD Lever",
    image: images.LeverMD,
    partNumbers: {
      "DL Series": { inside: "82-0811", outside: "82-0811" },
      Mortise: { inside: "82-0811", outside: "82-0812" },
      Exits: "82-0810",
    },
  },
  {
    value: "MJ",
    label: "MJ Lever",
    image: images.LeverMJ,
    partNumbers: {
      "DL Series": { inside: "82-0832", outside: "82-0832" },
      Mortise: { inside: "82-0832", outside: "82-0833" },
      Exits: "82-0831",
    },
  },
  {
    value: "MP",
    label: "MP Lever",
    image: images.LeverMP,
    partNumbers: {
      "DL Series": { inside: "82-0862", outside: "82-0862" },
      Mortise: { inside: "82-0862", outside: "82-0863" },
      Exits: "82-0861",
    },
  },
  {
    value: "ND",
    label: "ND Lever",
    image: images.LeverND,
    partNumbers: {
      "DL Series": { inside: "82-0908", outside: "82-0908" },
      Mortise: { inside: "82-0908", outside: "82-0909" },
      Exits: "82-0907",
    },
  },
  {
    value: "NJ",
    label: "NJ Lever",
    image: images.LeverNJ,
    partNumbers: {
      "DL Series": { inside: "82-0914", outside: "82-0914" },
      Mortise: { inside: "82-0914", outside: "82-0915" },
      Exits: "82-0913",
    },
  },

  // Notting Hill Series
  {
    value: "MA",
    label: "MA Lever",
    image: images.LeverMA,
    partNumbers: {
      "DL Series": { inside: "82-0802", outside: "82-0802" },
      Mortise: { inside: "82-0802", outside: "82-0803" },
      Exits: "82-0801",
    },
  },
  {
    value: "MQ",
    label: "MQ Lever (Handed)",
    image: images.LeverMQ,
    partNumbers: {
      "DL Series": {
        inside: { LH: "82-0868", RH: "82-0865" },
        outside: { LH: "82-0868", RH: "82-0865" },
      },
      Mortise: {
        inside: { LH: "82-0868", RH: "82-0865" },
        outside: { LH: "82-0869", RH: "82-0866" },
      },
      Exits: { LH: "82-0867", RH: "82-0864" },
    },
  },
  {
    value: "MT",
    label: "MT Lever (Handed)",
    image: images.LeverMT,
    partNumbers: {
      "DL Series": {
        inside: { LH: "82-0883", RH: "82-0880" },
        outside: { LH: "82-0883", RH: "82-0880" },
      },
      Mortise: {
        inside: { LH: "82-0883", RH: "82-0880" },
        outside: { LH: "82-0884", RH: "82-0881" },
      },
      Exits: { LH: "82-0882", RH: "82-0879" },
    },
  },
  {
    value: "MO",
    label: "MO Lever",
    image: images.LeverMO,
    partNumbers: {
      "DL Series": { inside: "82-0859", outside: "82-0859" },
      Mortise: { inside: "82-0859", outside: "82-0860" },
      Exits: "82-0858",
    },
  },
  {
    value: "MZ",
    label: "MZ Lever (Handed)",
    image: images.LeverMZ,
    partNumbers: {
      "DL Series": {
        inside: { LH: "82-1080", RH: "82-1083" },
        outside: { LH: "82-1080", RH: "82-1083" },
      },
      Mortise: {
        inside: { LH: "82-1080", RH: "82-1083" },
        outside: { LH: "82-1084", RH: "82-1081" },
      },
      Exits: { LH: "82-1082", RH: "82-1079" },
    },
  },
  {
    value: "GT",
    label: "GT Lever (Handed)",
    image: images.LeverGT,
    partNumbers: {
      "DL Series": {
        inside: { LH: "GT-CYL-INS-001-LH", RH: "GT-CYL-INS-001-RH" },
        outside: { LH: "GT-CYL-OUT-001-LH", RH: "GT-CYL-OUT-001-RH" },
      },
      Mortise: {
        inside: { LH: "GT-MO-INS-001-LH", RH: "GT-MO-INS-001-RH" },
        outside: { LH: "GT-MO-OUT-001-LH", RH: "GT-MO-OUT-001-RH" },
      },
      Exits: { LH: "GT-EX-001-LH", RH: "GT-EX-001-RH" },
    },
  },

  // Aventura Series
  {
    value: "MB",
    label: "MB Lever",
    image: images.LeverMB,
    partNumbers: {
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
      "DL Series": {
        inside: { LH: "NF-CYL-INS-001-LH", RH: "NF-CYL-INS-001-RH" },
        outside: { LH: "NF-CYL-OUT-001-LH", RH: "NF-CYL-OUT-001-RH" },
      },
      Mortise: {
        inside: { LH: "NF-MO-INS-001-LH", RH: "NF-MO-INS-001-RH" },
        outside: { LH: "NF-MO-OUT-001-LH", RH: "NF-MO-OUT-001-RH" },
      },
      Exits: { LH: "NF-EX-001-LH", RH: "NF-EX-001-RH" },
    },
  },
  {
    value: "MG",
    label: "MG Lever",
    image: images.LeverMG,
    partNumbers: {
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
      "DL Series": {
        inside: { LH: "MN-CYL-INS-001-LH", RH: "MN-CYL-INS-001-RH" },
        outside: { LH: "MN-CYL-OUT-001-LH", RH: "MN-CYL-OUT-001-RH" },
      },
      Mortise: {
        inside: { LH: "MN-MO-INS-001-LH", RH: "MN-MO-INS-001-RH" },
        outside: { LH: "MN-MO-OUT-001-LH", RH: "MN-MO-OUT-001-RH" },
      },
      Exits: { LH: "MN-EX-001-LH", RH: "MN-EX-001-RH" },
    },
  },
  {
    value: "MH",
    label: "MH Lever (Handed)",
    image: images.LeverMH,
    partNumbers: {
      "DL Series": {
        inside: { LH: "MH-CYL-INS-001-LH", RH: "MH-CYL-INS-001-RH" },
        outside: { LH: "MH-CYL-OUT-001-LH", RH: "MH-CYL-OUT-001-RH" },
      },
      Mortise: {
        inside: { LH: "MH-MO-INS-001-LH", RH: "MH-MO-INS-001-RH" },
        outside: { LH: "MH-MO-OUT-001-LH", RH: "MH-MO-OUT-001-RH" },
      },
      Exits: { LH: "MH-EX-001-LH", RH: "MH-EX-001-RH" },
    },
  },
  {
    value: "MS",
    label: "MS Lever (Handed)",
    image: images.LeverMS,
    partNumbers: {
      "DL Series": {
        inside: { LH: "MS-CYL-INS-001-LH", RH: "MS-CYL-INS-001-RH" },
        outside: { LH: "MS-CYL-OUT-001-LH", RH: "MS-CYL-OUT-001-RH" },
      },
      Mortise: {
        inside: { LH: "MS-MO-INS-001-LH", RH: "MS-MO-INS-001-RH" },
        outside: { LH: "MS-MO-OUT-001-LH", RH: "MS-MO-OUT-001-RH" },
      },
      Exits: { LH: "MS-EX-001-LH", RH: "MS-EX-001-RH" },
    },
  },
  {
    value: "MU",
    label: "MU Lever (Handed)",
    image: images.LeverMU,
    partNumbers: {
      "DL Series": {
        inside: { LH: "MU-CYL-INS-001-LH", RH: "MU-CYL-INS-001-RH" },
        outside: { LH: "MU-CYL-OUT-001-LH", RH: "MU-CYL-OUT-001-RH" },
      },
      Mortise: {
        inside: { LH: "MU-MO-INS-001-LH", RH: "MU-MO-INS-001-RH" },
        outside: { LH: "MU-MO-OUT-001-LH", RH: "MU-MO-OUT-001-RH" },
      },
      Exits: { LH: "MU-EX-001-LH", RH: "MU-EX-001-RH" },
    },
  },
  {
    value: "MV",
    label: "MV Lever (Handed)",
    image: images.LeverMV,
    partNumbers: {
      "DL Series": {
        inside: { LH: "MV-CYL-INS-001-LH", RH: "MV-CYL-INS-001-RH" },
        outside: { LH: "MV-CYL-OUT-001-LH", RH: "MV-CYL-OUT-001-RH" },
      },
      Mortise: {
        inside: { LH: "MV-MO-INS-001-LH", RH: "MV-MO-INS-001-RH" },
        outside: { LH: "MV-MO-OUT-001-LH", RH: "MV-MO-OUT-001-RH" },
      },
      Exits: { LH: "MV-EX-001-LH", RH: "MV-EX-001-RH" },
    },
  },
  {
    value: "NU",
    label: "NU Lever (Handed)",
    image: images.LeverNU,
    partNumbers: {
      "DL Series": {
        inside: { LH: "NU-CYL-INS-001-LH", RH: "NU-CYL-INS-001-RH" },
        outside: { LH: "NU-CYL-OUT-001-LH", RH: "NU-CYL-OUT-001-RH" },
      },
      Mortise: {
        inside: { LH: "NU-MO-INS-001-LH", RH: "NU-MO-INS-001-RH" },
        outside: { LH: "NU-MO-OUT-001-LH", RH: "NU-MO-OUT-001-RH" },
      },
      Exits: { LH: "NU-EX-001-LH", RH: "NU-EX-001-RH" },
    },
  },
  {
    value: "WG",
    label: "WG Lever (Handed)",
    image: images.LeverWG,
    partNumbers: {
      "DL Series": {
        inside: { LH: "WG-CYL-INS-001-LH", RH: "WG-CYL-INS-001-RH" },
        outside: { LH: "WG-CYL-OUT-001-LH", RH: "WG-CYL-OUT-001-RH" },
      },
      Mortise: {
        inside: { LH: "WG-MO-INS-001-LH", RH: "WG-MO-INS-001-RH" },
        outside: { LH: "WG-MO-OUT-001-LH", RH: "WG-MO-OUT-001-RH" },
      },
      Exits: { LH: "WG-EX-001-LH", RH: "WG-EX-001-RH" },
    },
  },

  // Gramercy Series
  {
    value: "RCM",
    label: "RCM Lever",
    image: images.LeverRCM,
    partNumbers: {
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
      "DL Series": { inside: "H011-CYL-INS-001", outside: "H011-CYL-OUT-001" },
      Mortise: { inside: "H011-MO-INS-001", outside: "H011-MO-OUT-001" },
      Exits: "H011-EX-001",
    },
  },
];

export default leverStyleOptions;
