// src/components/LeverStyles.js
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
        inside: { LH: "81-0467", RH: "81-0468" },
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
      "10X Series": {
        // Category-based structure
        categories: {
          Standard: {
            Plain: "10-1121",
            "Push Button/Thumb Turn (Sargent Conventional)": "10-1120",
            "Fixed Core": "10-1122",
            LFIC: "10-1123",
            SF: "10-1125",
            YRC: "Not Available",
            SFIC: "10-1124",
            KESO: "10-1126",
          },
          Milling: {
            Plain: "10-1146",
            "Push Button/Thumb Turn (Sargent Conventional)": "10-1145",
            "Fixed Core": "10-1147",
            LFIC: "10-1148",
            SF: "10-1150",
            YRC: "Not Available",
            SFIC: "10-1149",
            KESO: "10-1151",
          },

        }
      },
      "DL Series": { inside: "DL-0042", outside: "DL-0042" },
      Mortise: { inside: "81-0490", outside: "82-0153" },
      Exits: "82-0153",
    },
  },
  {
    value: "E",
    label: "E Lever",
    image: images.LeverE,
    partNumbers: {
      "DL Series": { inside: "DL-0043", outside: "DL-0043" },
      Mortise: { inside: "81-0470", outside: "82-0154" },
      Exits: "82-0154",
    },
  },
  {
    value: "F",
    label: "F Lever",
    image: images.LeverF,
    partNumbers: {
      "DL Series": { inside: "DL-0044", outside: "DL-0044" },
      Mortise: { inside: "81-0471", outside: "82-0155" },
      Exits: "82-0155",
    },
  },
  {
    value: "J",
    label: "J Lever",
    image: images.LeverJ,
    partNumbers: {
      "DL Series": { inside: "DL-0045", outside: "DL-0045" },
      Mortise: { inside: "81-0447", outside: "82-0156" },
      Exits: "97-0486",
    },
  },
  {
    value: "L",
    label: "L Lever",
    image: images.LeverL,
    partNumbers: {
      "10X Series": {
        // Category-based structure
        categories: {
          Standard: {
            Plain: "10-1128",
            "Push Button/Thumb Turn (Sargent Conventional)": "10-1127",
            "Fixed Core": "10-1129",
            LFIC: "10-1130",
            SF: "10-1132",
            YRC: "10-1134",
            SFIC: "10-1131",
            KESO: "10-1133",
          },
          Milling: {
            Plain: "10-1153",
            "Push Button/Thumb Turn (Sargent Conventional)": "10-1152",
            "Fixed Core": "10-1154",
            LFIC: "10-1155",
            SF: "10-1157",
            YRC: "10-1159",
            SFIC: "10-1156",
            KESO: "10-1158",
          },

        }
      },
      "DL Series": { inside: "DL-0046", outside: "DL-0046" },
      Mortise: { inside: "81-0489", outside: "82-0157" },
      Exits: "97-0485",
    },
  },
  {
    value: "P",
    label: "P Lever",
    image: images.LeverP,
    partNumbers: {
      "10X Series": {
        // Category-based structure
        categories: {
          Standard: {
            Plain: "10-1137",
            "Push Button/Thumb Turn (Sargent Conventional)": "10-1136",
            "Fixed Core": "10-1138",
            LFIC: "10-1139",
            SF: "10-1141",
            YRC: "10-1143",
            SFIC: "10-1140",
            KESO: "10-1142",
          },
          Milling: {
            Plain: "10-1162",
            "Push Button/Thumb Turn (Sargent Conventional)": "10-1161",
            "Fixed Core": "10-1163",
            LFIC: "10-1164",
            SF: "10-1166",
            YRC: "10-1168",
            SFIC: "10-1165",
            KESO: "10-1167",
          },

        }
      },
      "DL Series": { inside: "DL-0047", outside: "DL-0047" },
      Mortise: { inside: "81-0513", outside: "82-0158" },
      Exits: "97-0484",
    },
  },
  {
    value: "W",
    label: "W Lever",
    image: images.LeverW,
    partNumbers: {
      "DL Series": { inside: "DL-0048", outside: "DL-0048" },
      Mortise: { inside: "81-0445", outside: "82-0159" },
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
      Mortise: { inside: "82-0516", outside: "82-0517" },
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
        inside: { LH: "82-0520", RH: "82-0521" },
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
        inside: { LH: "83-0528", RH: "82-0529" },
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
        inside: { LH: "82-0524", RH: "82-0525"},
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
      "10X Series": {
        // Category-based structure
        categories: {
          Standard: {
            Plain: "10-1240",
            "Push Button/Thumb Turn (Sargent Conventional)": "10-1241",
            "Fixed Core": "10-1242",
            LFIC: "10-1243",
            SF: "Not Available",
            YRC: "Not Available",
            SFIC: "10-1244",
            KESO: "Not Available",
          },
          Milling: {
            Plain: "Not Available",
            "Push Button/Thumb Turn (Sargent Conventional)": "Not Available",
            "Fixed Core": "Not Available",
            LFIC: "Not Available",
            SF: "Not Available",
            YRC: "Not Available",
            SFIC: "Not Available",
            KESO: "Not Available",
          },

        }
      },
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
      "10X Series": {
        // Category-based structure
        categories: {
          Standard: {
            Plain: "10-1245",
            "Push Button/Thumb Turn (Sargent Conventional)": "10-1246",
            "Fixed Core": "10-1247",
            LFIC: "10-1248",
            SF: "Not Available",
            YRC: "Not Available",
            SFIC: "10-1249",
            KESO: "Not Available",
          },
          Milling: {
            Plain: "Not Available",
            "Push Button/Thumb Turn (Sargent Conventional)": "Not Available",
            "Fixed Core": "Not Available",
            LFIC: "Not Available",
            SF: "Not Available",
            YRC: "Not Available",
            SFIC: "Not Available",
            KESO: "Not Available",
          },

        }
      },
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
    label: "GT Lever",
    image: images.LeverGT,
    partNumbers: {
      "DL Series": { inside: "81-0936", outside: "81-0936" },
      Mortise: { inside: "81-0936", outside: "81-0937" },
      Exits: "81-0935",
    },
  },

  // Aventura Series
  {
    value: "MB",
    label: "MB Lever",
    image: images.LeverMB,
    partNumbers: {
      "10X Series": {
        // Category-based structure
        categories: {
          Standard: {
            Plain: "10-1263",
            "Push Button/Thumb Turn (Sargent Conventional)": "10-1264",
            "Fixed Core": "10-1265",
            LFIC: "10-1266",
            SF: "Not Available",
            YRC: "Not Available",
            SFIC: "10-1267",
            KESO: "Not Available",
          },
          Milling: {
            Plain: "Not Available",
            "Push Button/Thumb Turn (Sargent Conventional)": "Not Available",
            "Fixed Core": "Not Available",
            LFIC: "Not Available",
            SF: "Not Available",
            YRC: "Not Available",
            SFIC: "Not Available",
            KESO: "Not Available",
          },

        }
      },
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
      "10X Series": {
        // Category-based structure
        categories: {
          Standard: {
            Plain: "10-1268",
            "Push Button/Thumb Turn (Sargent Conventional)": "10-1269",
            "Fixed Core": "10-1270",
            LFIC: "10-1271",
            SF: "Not Available",
            YRC: "Not Available",
            SFIC: "10-1272",
            KESO: "Not Available",
          },
          Milling: {
            Plain: "Not Available",
            "Push Button/Thumb Turn (Sargent Conventional)": "Not Available",
            "Fixed Core": "Not Available",
            LFIC: "Not Available",
            SF: "Not Available",
            YRC: "Not Available",
            SFIC: "Not Available",
            KESO: "Not Available",
          },

        }
      },
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
        inside: { LH: "81-1068", RH: "81-1060" },
        outside: { LH: "81-1068", RH: "81-1060" },
      },
      Mortise: {
        inside: { LH: "81-1068", RH: "81-1060" },
        outside: { LH: "81-1069", RH: "81-1061" },
      },
      Exits: { LH: "81-1067", RH: "81-1059" },
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
      "DL Series": { inside: "82-1951", outside: "82-1951" },
      Mortise: { inside: "82-1951", outside: "82-1952" },
      Exits: "82-1950",
    },
  },
  {
    value: "H016",
    label: "H016 Lever",
    image: images.LeverH016,
    partNumbers: {
      "DL Series": { inside: "82-1955", outside: "82-1955" },
      Mortise: { inside: "82-1955", outside: "82-1956" },
      Exits: "82-1954",
    },
  },
  {
    value: "H017",
    label: "H017 Lever",
    image: images.LeverH017,
    partNumbers: {
      "DL Series": { inside: "82-1947", outside: "82-1947" },
      Mortise: { inside: "82-1947", outside: "82-1948" },
      Exits: "82-1946",
    },
  },
  {
    value: "H018",
    label: "H018 Lever",
    image: images.LeverH018,
    partNumbers: {
      "DL Series": { inside: "81-0861", outside: "81-0861" },
      Mortise: { inside: "81-0861", outside: "81-0862" },
      Exits: "81-0860",
    },
  },

  // Wooster Square
  {
    value: "H001",
    label: "H001 Lever",
    image: images.LeverH001,
    partNumbers: {
      "DL Series": { inside: "82-1581", outside: "82-1581" },
      Mortise: { inside: "82-1581", outside: "82-1582" },
      Exits: "82-1580",
    },
  },
  {
    value: "H002",
    label: "H002 Lever",
    image: images.LeverH002,
    partNumbers: {
      "DL Series": { inside: "82-1584", outside: "82-1584" },
      Mortise: { inside: "82-1584", outside: "82-1585" },
      Exits: "82-1583",
    },
  },
  {
    value: "H003",
    label: "H003 Lever",
    image: images.LeverH003,
    partNumbers: {
      "DL Series": { inside: "82-1587", outside: "82-1587" },
      Mortise: { inside: "82-1587", outside: "82-1588" },
      Exits: "82-1586",
    },
  },
  {
    value: "H004",
    label: "H004 Lever",
    image: images.LeverH004,
    partNumbers: {
      "DL Series": { inside: "82-1587", outside: "82-1587" },
      Mortise: { inside: "82-1587", outside: "82-1588" },
      Exits: "82-1586",
    },
  },
  {
    value: "H005",
    label: "H005 Lever",
    image: images.LeverH005,
    partNumbers: {
      "DL Series": { inside: "82-1590", outside: "82-1590" },
      Mortise: { inside: "82-1590", outside: "82-1591" },
      Exits: "82-1589",
    },
  },
  {
    value: "H006",
    label: "H006 Lever",
    image: images.LeverH006,
    partNumbers: {
      "DL Series": { inside: "82-1590", outside: "82-1590" },
      Mortise: { inside: "82-1590", outside: "82-1591" },
      Exits: "82-1589",
    },
  },
  {
    value: "H007",
    label: "H007 Lever",
    image: images.LeverH007,
    partNumbers: {
      "DL Series": { inside: "82-1593", outside: "82-1593" },
      Mortise: { inside: "82-1593", outside: "82-1594" },
      Exits: "82-1592",
    },
  },
  {
    value: "H008",
    label: "H008 Lever (Handed)",
    image: images.LeverH008,
    partNumbers: {
      "DL Series": {
        inside: { LH: "81-1598", RH: "81-1597" },
        outside: { LH: "81-1598", RH: "81-1597" },
      },
      Mortise: {
        inside: { LH: "81-1598", RH: "81-1597" },
        outside: { LH: "82-1600", RH: "82-1599" },
      },
      Exits: { LH: "82-1596", RH: "82-1595" },
    },
  },
  {
    value: "H011",
    label: "H011 Lever",
    image: images.LeverH011,
    partNumbers: {
      "DL Series": { inside: "82-1608", outside: "82-1608" },
      Mortise: { inside: "82-1608", outside: "82-1609" },
      Exits: "82-1607",
    },
  },
  {
    value: "VSLL-GRN",
    label: "VSLL Red/Green Indicator Lever",
    image: images.LeverVSLLGreen,
    partNumbers: {
      "10X Series": {
        categories: {
          "Red/Green Indicator Lever (VSLL)": {
            "Plain": { inside: "10-3834", outside: "10-3819" },
            "Emergency": "10-3838",
            "Fixed Core": "10-3823",
            "Push Button": { inside: "10-3835", outside: "10-2440" },
            "LFIC": "10-3820",
            "SF": "10-3824",
            "YRC": "10-3825",
            "SFIC": "10-3821",
            "KESO": "10-3822",


          }
        }
      },
    }
  },
  {
    value: "VSLL-WHT",
    label: "VSLL Red/white Indicator Lever",
    image: images.LeverVSLLWhite,
    partNumbers: {
      "10X Series": {
        categories: {
          "Red/white Indicator Lever (VSLL)": {
            "Plain": { inside: "10-3836", outside: "10-3826" },
            "Emergency": "10-3839",
            "Fixed Core": "10-3831",
            "Push Button": { inside: "10-3837", outside: "10-3827" },
            "LFIC": "10-3828",
            "SF": "10-3832",
            "YRC": "10-3833",
            "SFIC": "10-3829",
            "KESO": "10-3830",

          }
        }
      },
    }
  },
];

export default leverStyleOptions;
export { leverStyleOptions };