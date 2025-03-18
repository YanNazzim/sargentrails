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
  {
    code: "70",
    name: "SFIC (Housing to accept 6- or 7-Pin SFIC Permanent Cores, plastic disposable core provided)",
    conflicts: ["49", "5CH"], // Conflicts with other prefixes
  },
  {
    code: "49",
    name: "Inside Visual Indicator for 8816",
    conflicts: ["12"], // Conflicts with other prefixes
  },
  {
    code: "5CH",
    name: "5LB Maximum Force",
    conflicts: ["12"], // Conflicts with other prefixes
  },
  {
    code: "53",
    name: "Latchbolt Monitoring Switch",
    conflicts: [], // No conflicts
  },
  {
    code: "59",
    name: "Electroguard® Delayed Egress",
    conflicts: [], // No conflicts
  },
  // Add more prefixes as needed
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