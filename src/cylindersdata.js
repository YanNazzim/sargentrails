import images from "./images";

// Device types
export const deviceTypes = [
  { value: "exitDevices", label: "Exit Devices" },
  { value: "mortiseLocks", label: "Mortise Locks" },
  { value: "boredLocks", label: "Bored Locks" },
];

// Functions for each device type
export const functionsByDeviceType = {
  exitDevices: [
    { value: "04", label: "04 - Night Latch - Key Retracts Latch" },
    {
      value: "06",
      label:
        "06 - Storeroom - Key Unlocks Lever Trim, Trim Retracts Latch (Trim relocks when key removed)",
    },
    {
      value: "13",
      label:
        "13 - Classroom - Key Unlocks Lever Trim, Trim Retracts Latch (Can be left unlocked, must relock manually)",
    },
    {
      value: "16",
      label:
        "16 - Classroom Intruder - Key Outside Retracts Latch, Key Inside Locks/Unlocks Outside Trim (8800/8900 Only || PE8800/PE8900 Only)",
    },
  ],
  mortiseLocks: [
    { value: "function1", label: "Function 1" },
    { value: "function2", label: "Function 2" },
  ],
  boredLocks: [
    { value: "function1", label: "Function 1 (Bored Locks)" },
    { value: "function2", label: "Function 2 (Bored Locks)" },
  ],
};

// Prefixes with conflicts
export const prefixes = [

  // Degree Key System
  {
    code: "DG1",
    name: "SARGENT Degree Key System Level 1 (bump resistant with patented keys)",
    category: "Degree Key System",
    conflicts: [], // Add actual conflicts if any
  },
  {
    code: "DG1-21",
    name: "Degree Level 1 Construction Master Keying",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG1-60",
    name: "Degree Level 1 Removable Disposable Construction Core",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG1-63",
    name: "Degree Level 1 Removable Core",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG1-64",
    name: "Degree Level 1 Removable Construction Keyed LFIC",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG1-65",
    name: "Degree Level 1 Unassembled/Uncombined Core",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG2",
    name: "SARGENT Degree Key System Level 2 (geographically exclusive; bump and pick resistant)",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG2-21",
    name: "Degree Level 2 Construction Master Keying",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG2-60",
    name: "Degree Level 2 Removable Disposable Construction Core",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG2-63",
    name: "Degree Level 2 Removable Core",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG2-64",
    name: "Degree Level 2 Removable Construction Keyed LFIC",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG2-65",
    name: "Degree Level 2 Unassembled/Uncombined Core",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG3",
    name: "SARGENT Degree Key System Level 3 (geographically exclusive; UL437 certified; bump and pick resistant)",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG3-21",
    name: "Degree Level 3 Construction Master Keying",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG3-60",
    name: "Degree Level 3 Removable Disposable Construction Core",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG3-63",
    name: "Degree Level 3 Removable Core",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG3-64",
    name: "Degree Level 3 Removable Construction Keyed LFIC",
    category: "Degree Key System",
    conflicts: [],
  },
  {
    code: "DG3-65",
    name: "Degree Level 3 Unassembled/Uncombined Core",
    category: "Degree Key System",
    conflicts: [],
  },

  // Signature Key System
  {
    code: "10",
    name: "SARGENT Signature Key System (Not available with other Key systems unless specified)",
    category: "Signature Key System",
    conflicts: [],
  },
  {
    code: "10-21",
    name: "SARGENT Signature Construction Key System (Lost Ball)",
    category: "Signature Key System",
    conflicts: [],
  },
  {
    code: "10-63",
    name: "SARGENT Signature Large Format Interchangeable Core Cylinder (Removable)",
    category: "Signature Key System", // Assuming this belongs here, adjust if needed
    conflicts: [],
  },

  // XC Key System
  {
    code: "11",
    name: "XC Key System (Not available with other Key systems unless specified)",
    category: "XC Key System",
    conflicts: [],
  },
  {
    code: "11-21",
    name: "XC- Construction Key System (Lost Ball)",
    category: "XC Key System",
    conflicts: [],
  },
  {
    code: "11-60",
    name: "Housing to accept XC- Permanent Large Format Interchangeable Core, Disposable plastic Core- provided",
    category: "XC Key System", // Assuming LFIC
    conflicts: [],
  },
  {
    code: "11-63",
    name: "Housing provided with XC- Large Format Interchangeable Core Cylinder - (Includes masterkeying, grand masterkeying)",
    category: "XC Key System", // Assuming LFIC
    conflicts: [],
  },
  {
    code: "11-64",
    name: "Housing provided with Keyed construction core to accept XC- Permanent Large Format Interchangeable Core (ordered separately)",
    category: "XC Key System", // Assuming LFIC
    conflicts: [],
  },
  {
    code: "11-70-7P",
    name: "Housing to accept XC- SFIC ( 7-Pin) XC- Permanent Cores, plastic disposable core provided",
    category: "XC Key System", // Assuming SFIC
    conflicts: [],
  },
  {
    code: "11-72-7P",
    name: "Housing to accept XC- SFIC (7-Pin Keyed Construction Core provided) cylinder Permanent core ordered separately",
    category: "XC Key System", // Assuming SFIC
    conflicts: [],
  },
  {
    code: "11-73-7P",
    name: "Housing provided with XC- Small Format 7-Pin interchangeable core (Includes masterkeying, grand masterkeying)",
    category: "XC Key System", // Assuming SFIC
    conflicts: [],
  },
  {
    code: "11-65-73-7P",
    name: "Housing provided to accept XC- Uncombinated 7-Pin SFIC (Permanent) Core - (Packed Loose) ",
    category: "XC Key System", // Assuming SFIC
    conflicts: [],
  },

  // Construction Key Systems
  {
    code: "21",
    name: "SARGENT Lost Ball Construction Keying for Conventional, XC and Signature Series (N/A with 63- or 73-)",
    category: "Construction Key Systems",
    conflicts: [],
  },
  {
    code: "22",
    name: "SARGENT Construction Split Key System for Conventional Cylinders (Existing Systems Only) (N/A with 10-, 11-, 63- or 73-)",
    category: "Construction Key Systems",
    conflicts: [],
  },

  // LFIC
  {
    code: "60",
    name: "Housing to accept SARGENT Permanent Large Format Interchangeable Core, Disposable plastic Core provided (Permanent Cores ordered separately)",
    category: "LFIC",
    conflicts: [],
  },
  {
    code: "63",
    name: "Housing with Large Format Interchangeable Core Cylinder - (Includes masterkeying, grand masterkeying)",
    category: "LFIC",
    conflicts: [],
  },
  {
    code: "64",
    name: "Housing with Keyed construction core to accept Permanent Large Format Interchangeable Core (ordered separately)",
    category: "LFIC",
    conflicts: [],
  },

  // SFIC
  {
    code: "70",
    name: "Housing to accept 6 or 7 Pin SFIC Permanent Cores (plastic disposable core provided)",
    category: "SFIC",
    conflicts: [],
  },
  {
    code: "72",
    name: "Housing to accept 6 or 7 Pin SFIC (6-Pin Keyed Construction Core provided) (Permanent Core ordered separately)",
    category: "SFIC",
    conflicts: [],
  },
  {
    code: "73",
    name: "Housing with 6-Pin SFIC (Includes masterkeying, grand masterkeying)",
    category: "SFIC",
    conflicts: [],
  },
  {
    code: "73-7P",
    name: "Housing with with Small Format 7-Pin Interchangeable Core (Includes masterkeying, grand masterkeying)",
    category: "SFIC",
    conflicts: [],
  },
  {
    code: "65-73",
    name: "Housing with Uncombinated 6-Pin SFIC (Permanent) Core - (Packed Loose for field keying)",
    category: "SFIC",
    conflicts: [],
  },
  {
    code: "65-73-7P",
    name: "Housing with Uncombinated 7-Pin SFIC (Permanent) Core - (Packed Loose for field keying)",
    category: "SFIC",
    conflicts: [],
  },
   // --- ADD A CATEGORY FOR OTHER/MISC PREFIXES ---
   // For example:
   {
     code: "LC", // Add any missing prefixes like LC, BR, SC, SE, SF etc.
     name: "Less Cylinder",
     category: "Options", // Or another suitable category
     conflicts: [],
   },
   {
     code: "BR",
     name: "Bump Resistant Cylinder...",
     category: "Options",
     conflicts: [],
   },
   {
     code: "SC",
     name: "Schlage C keyway cylinder...",
     category: "Options",
     conflicts: [],
    },
    {
      code: "SE",
      name: "Schlage E keyway cylinder...",
      category: "Options",
      conflicts: [],
    },
    {
      code: "SF",
      name: "L Lever to accept Schlage® large format...",
      category: "Options",
      conflicts: [],
    },
     {
      code: "51",
      name: "Removable Core Cylinder (Old Style)",
      category: "Options", // Or "Legacy Core Systems"
      conflicts: [],
    },
    {
      code: "52",
      name: "Removable Construction Core (Old Style)",
      category: "Options", // Or "Legacy Core Systems"
      conflicts: [],
    },
];

// Finishes
export const finishes = [
  {
    value: "03",
    label: "03 - Bright brass, clear coated",
    image: images.finish03,
  },
  {
    value: "04",
    label: "04 - Satin brass, clear coated",
    image: images.finish04,
  },
  {
    value: "09",
    label: "09 - Bright bronze, clear coated",
    image: images.finish09,
  },
  {
    value: "10",
    label: "10 - Satin bronze, clear coated",
    image: images.finish10,
  },
  {
    value: "10B",
    label: "10B - Dark oxidized satin bronze, oil rubbed",
    image: images.finish10B,
  },
  {
    value: "10BE",
    label: "10BE - Dark oxidized satin bronze-equivalent",
    image: images.finish10BE,
  },
  {
    value: "10BL",
    label: "10BL - Dark oxidized satin bronze, clear coated",
    image: images.finish10BL,
  },
  {
    value: "14",
    label: "14 - Bright nickel plated, clear coated",
    image: images.finish14,
  },
  {
    value: "15",
    label: "15 - Satin nickel plated, clear coated",
    image: images.finish15,
  },
  {
    value: "20D",
    label: "20D - Dark oxidized statuary bronze, clear coated",
    image: images.finish20D,
  },
  {
    value: "26",
    label: "26 - Bright chromium plated over nickel",
    image: images.finish26,
  },
  {
    value: "26D",
    label: "26D - Satin chromium plated over nickel",
    image: images.finish26D,
  },
  {
    value: "32",
    label: "32 - Bright Stainless Steel",
    image: images.finish32,
  },
  {
    value: "32D",
    label: "32D - Satin Stainless Steel",
    image: images.finish32D,
  },
  {
    value: "BSP",
    label: "BSP - Black suede powder coat, sprayed",
    image: images.finishBSP,
  },
  {
    value: "WSP",
    label: "WSP - White suede powder coat, sprayed",
    image: images.finishWSP,
  },
];

// Part numbers based on device type, function, and prefixes
export const partNumbers = {
  exitDevices: {
    16: {
      base: "EXIT-F1-BASE",
      prefixes: {
        12: "EXIT-F1-12",
        49: "EXIT-F1-49",
        "12-59": "EXIT-F1-12-59", // Combined prefix key
      },
    },
    function2: {
      base: "EXIT-F2-BASE",
      prefixes: {
        12: "EXIT-F2-12",
        49: "EXIT-F2-49",
      },
    },
  },
  cylinderDogging: {
    base: "DOG-BASE", // Base part number for cylinder dogging
    prefixes: {
      12: "DOG-12", // Example prefix for cylinder dogging
      53: "DOG-53", // Another example prefix
    },
  },
  alarmKit: {
    base: "ALARM-BASE", // Base part number for alarm kits
    prefixes: {
      12: "ALARM-12", // Example prefix for alarm kits
      59: "ALARM-59", // Another example prefix
    },
  },
  mortiseLocks: {
    function1: {
      base: "MORT-F1-BASE",
      prefixes: {
        12: "MORT-F1-12",
        53: "MORT-F1-53",
      },
    },
    function2: {
      base: "MORT-F2-BASE",
      prefixes: {
        12: "MORT-F2-12",
      },
    },
  },
  boredLocks: {
    function1: {
      base: "BORED-F1-BASE",
      prefixes: {
        12: "BORED-F1-12",
      },
    },
    function2: {
      base: "BORED-F2-BASE",
      prefixes: {
        12: "BORED-F2-12",
      },
    },
  },
};
