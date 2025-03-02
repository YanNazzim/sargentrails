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
      "DL Series": { inside: "82-0805", outside: "82-0805" },
      Mortise: { inside: "82-0805", outside: "82-0806" },
      Exits: "82-0804",
    },
  },
  {
    value: "ME",
    label: "ME Lever",
    image: images.LeverME,
    partNumbers: {
      "DL Series": { inside: "82-0814", outside: "82-0814" },
      Mortise: { inside: "82-0814", outside: "82-0815" },
      Exits: "82-0813",
    },
  },
  {
    value: "MF",
    label: "MF Lever",
    image: images.LeverMF,
    partNumbers: {
      "DL Series": { inside: "82-0817", outside: "82-0817" },
      Mortise: { inside: "82-0817", outside: "82-0818" },
      Exits: "82-0816",
    },
  },
  {
    value: "NF",
    label: "NF Lever",
    image: images.LeverNF,
    partNumbers: {
      "DL Series": { inside: "82-1276", outside: "82-1276" },
      Mortise: { inside: "82-1276", outside: "82-1277" },
      Exits: "82-1275",
    },
  },
  {
    value: "MG",
    label: "MG Lever",
    image: images.LeverMG,
    partNumbers: {
      "DL Series": { inside: "82-0820", outside: "82-0820" },
      Mortise: { inside: "82-0820", outside: "82-0821" },
      Exits: "82-0819",
    },
  },
  {
    value: "MI",
    label: "MI Lever",
    image: images.LeverMI,
    partNumbers: {
      "DL Series": { inside: "82-0829", outside: "82-0829" },
      Mortise: { inside: "82-0829", outside: "82-0830" },
      Exits: "82-0828",
    },
  },
  {
    value: "MW",
    label: "MW Lever",
    image: images.LeverMW,
    partNumbers: {
      "DL Series": { inside: "82-0898", outside: "82-0898" },
      Mortise: { inside: "82-0898", outside: "82-0899" },
      Exits: "82-0897",
    },
  },

  // Odeon Series
  {
    value: "MN",
    label: "MN Lever (Handed)",
    image: images.LeverMN,
    partNumbers: {
      "DL Series": {
        inside: { LH: "82-0856", RH: "82-0853" },
        outside: { LH: "82-0856", RH: "82-0853" },
      },
      Mortise: {
        inside: { LH: "82-0856", RH: "82-0853" },
        outside: { LH: "82-0857", RH: "82-0854" },
      },
      Exits: { LH: "82-0855", RH: "82-0852" },
    },
  },
  {
    value: "MH",
    label: "MH Lever (Handed)",
    image: images.LeverMH,
    partNumbers: {
      "DL Series": {
        inside: { LH: "82-0826", RH: "82-0823" },
        outside: { LH: "82-0826", RH: "82-0823" },
      },
      Mortise: {
        inside: { LH: "82-0826", RH: "82-0823" },
        outside: { LH: "82-0827", RH: "82-0824" },
      },
      Exits: { LH: "82-0825", RH: "82-0822" },
    },
  },
  {
    value: "MS",
    label: "MS Lever (Handed)",
    image: images.LeverMS,
    partNumbers: {
      "DL Series": {
        inside: { LH: "82-1241", RH: "82-1242" },
        outside: { LH: "82-1241", RH: "82-1242" },
      },
      Mortise: {
        inside: { LH: "82-1241", RH: "82-1242" },
        outside: { LH: "82-1244", RH: "82-1243" },
      },
      Exits: { LH: "82-1240", RH: "82-1239" },
    },
  },
  {
    value: "MU",
    label: "MU Lever (Handed)",
    image: images.LeverMU,
    partNumbers: {
      "DL Series": {
        inside: { LH: "82-1249", RH: "82-1250" },
        outside: { LH: "82-1249", RH: "82-1250" },
      },
      Mortise: {
        inside: { LH: "82-1249", RH: "82-1250" },
        outside: { LH: "82-1252", RH: "82-1251" },
      },
      Exits: { LH: "82-1248", RH: "82-1247" },
    },
  },
  {
    value: "MV",
    label: "MV Lever (Handed)",
    image: images.LeverMV,
    partNumbers: {
      "DL Series": {
        inside: { LH: "82-0895", RH: "82-0892" },
        outside: { LH: "82-0895", RH: "82-0892" },
      },
      Mortise: {
        inside: { LH: "82-0895", RH: "82-0892" },
        outside: { LH: "82-0896", RH: "82-0893" },
      },
      Exits: { LH: "82-0894", RH: "82-0891" },
    },
  },
  {
    value: "NU",
    label: "NU Lever (Handed)",
    image: images.LeverNU,
    partNumbers: {
      "DL Series": {
        inside: { LH: "82-1065", RH: "82-1068" },
        outside: { LH: "82-1065", RH: "82-1068" },
      },
      Mortise: {
        inside: { LH: "82-1065", RH: "82-1068" },
        outside: { LH: "82-1069", RH: "82-1066" },
      },
      Exits: { LH: "82-1067", RH: "82-1064" },
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
      "DL Series": { inside: "RW-2005", outside: "RW-2005" },
      Mortise: { inside: "RW-2005", outside: "RW-2006" },
      Exits: "RW-2004",
    },
  },
  {
    value: "RAL",
    label: "RAL Lever",
    image: images.LeverRAL,
    partNumbers: {
      "DL Series": { inside: "RW-2021", outside: "RW-2021" },
      Mortise: { inside: "RW-2021", outside: "RW-2022" },
      Exits: "RW-2020",
    },
  },
  {
    value: "REM",
    label: "REM Lever",
    image: images.LeverREM,
    partNumbers: {
      "DL Series": { inside: "RW-2001", outside: "RW-2001" },
      Mortise: { inside: "RW-2001", outside: "RW-2002" },
      Exits: "RW-2000",
    },
  },
  {
    value: "RAM",
    label: "RAM Lever",
    image: images.LeverRAM,
    partNumbers: {
      "DL Series": { inside: "RW-2009", outside: "RW-2009" },
      Mortise: { inside: "RW-2009", outside: "RW-2010" },
      Exits: "RW-2008",
    },
  },
  {
    value: "RAS",
    label: "RAS Lever",
    image: images.LeverRAS,
    partNumbers: {
      "DL Series": { inside: "RW-2017", outside: "RW-2017" },
      Mortise: { inside: "RW-2017", outside: "RW-2018" },
      Exits: "RW-2016",
    },
  },
  {
    value: "RAG",
    label: "RAG Lever",
    image: images.LeverRAG,
    partNumbers: {
      "DL Series": { inside: "RW-2017", outside: "RW-2017" },
      Mortise: { inside: "RW-2017", outside: "RW-2018" },
      Exits: "RW-2016",
    },
  },
  {
    value: "RGM",
    label: "RGM Lever",
    image: images.LeverRGM,
    partNumbers: {
      "DL Series": { inside: "RW-2025", outside: "RW-2025" },
      Mortise: { inside: "RW-2025", outside: "RW-2026" },
      Exits: "RW-2024",
    },
  },
  {
    value: "RAW",
    label: "RAW Lever",
    image: images.LeverRAW,
    partNumbers: {
      "DL Series": { inside: "RW-2013", outside: "RW-2013" },
      Mortise: { inside: "RW-2013", outside: "RW-2014" },
      Exits: "RW-2012",
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
