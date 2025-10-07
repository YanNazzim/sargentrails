// src/searchableData.js

import { lockbodiesData as cylindricalData } from './components/CylindricalLockbodies';
import { lockbodyFunctions as mortiseFunctionData } from './components/MortiseLockbodies';
import { spindleData } from './components/MortiseSpindles';
import { boredLockLatchesData } from './components/Latches';
import { leverStyleOptions } from './components/LeverStyles';
import { partsData as railData } from './partsData'; // <-- Import railData here
import { trimsData } from './trimsData'; // <-- IMPORTANT FOR NEW LOGIC
import partCombinations from './components/partCombinations';
import { verticalRodDevices } from './components/RodsForm';
import { devices as mortiseExitDevices, functions as mortiseExitFunctions, prefixes as mortiseExitPrefixes } from './components/MortiseExitLockbodies';
import { prefixesData as endCapPrefixesData, endCapPartDetails } from './components/EndCaps';
import { tailpieceData } from './components/Tailpieces'; // <-- Correctly imported

// Utility helpers to create robust keyword metadata for Fuse.js searches
const createKeywordBuilder = () => {
    const tokens = new Set();

    const addToken = (term) => {
        if (term === undefined || term === null) return;
        const cleaned = String(term)
            .replace(/<[^>]+>/g, ' ')
            .replace(/&amp;/g, '&')
            .trim();
        if (!cleaned) return;

        const lower = cleaned.toLowerCase();
        const normalizedVariants = [
            lower,
            lower.replace(/[-_/]/g, ' '),
            lower.replace(/\s+/g, ''),
            lower.replace(/\s+/g, '-'),
        ];

        normalizedVariants.forEach(variant => {
            if (variant) tokens.add(variant);
        });

        lower.split(/[^a-z0-9]+/).forEach(piece => {
            if (piece) tokens.add(piece);
        });
    };

    const build = () => Array.from(tokens).join(' ');

    return { addToken, build };
};

const buildKeywords = (...termGroups) => {
    const builder = createKeywordBuilder();
    termGroups.flat().forEach(term => builder.addToken(term));
    return builder.build();
};

// 検 NEW HELPER FOR CHASSIS: Extracts part numbers (e.g., 68-1234, PE-0000) from HTML string
const extractPartNumbers = (text) => {
    if (!text || typeof text !== 'string') return [];
    // Regex to match part number format (e.g., 68-1234, PE-0000, 94-0000)
    const matches = text.match(/[\w-]+/g) || [];
    // Filter to ensure they look like actual part numbers and exclude placeholders
    return matches.filter(p => p.includes('-') && !p.includes('FINISH') && p.length > 5);
};


// Helper function to determine available trims (Keep existing helper)
const getAvailableTrims = (series, device, functionCode) => {
    if (functionCode === "04" && (device === "8800" || device === "PE8800")) {
      return ["FSW", "FSL", "PSB", "MSL", "STS", "862", "863", "864", ...(series === "PE80" ? ["WE", "NE"] : ["ET"])];
    }
    if (functionCode === "04" || functionCode === "10") {
      return ["FLL", "FLW", "MAL", "PTB", "STS", "862", "863", "864", ...(series === "PE80" ? ["WE", "NE"] : ["ET"])];
    }
    if (["28", "62", "63", "66"].includes(functionCode)) {
      return ["FLL", "FLW", "MAL", "PTB", "STS"];
    }
    if (series === "7000") {
      return ["ET", "ER", "ES"];
    }
    return series === "PE80" ? ["WE", "NE"] : ["ET"];
};

// Helper to get hardware details (copied from TrimsForm.js logic)
const getTrimHardware = (series, thickness, basePartNumber) => {
    if (!basePartNumber) return { formatted: "Unknown Hardware" };

    const category = series.startsWith("7000") ? "7000" : "standard";
    const suffixMatch = basePartNumber.match(/-(8|4|2)$/);
    const suffix = suffixMatch ? suffixMatch[0] : "";
    
    const trimHardware = trimsData.trimHardware;
    const selectedThickness = trimHardware[category]?.[thickness] ? thickness : "1-3/4"; 
    
    const screws = trimHardware[category]?.[selectedThickness]?.screws || ["Unknown Screws"];
    const spindle = trimHardware[category]?.[selectedThickness]?.spindles?.[suffix] || "Unknown Spindle";

    let hardwareText = "";
    const currentFunctionCode = basePartNumber.split('-')[0].substring(3); 
    
    if (!Array.isArray(screws)) {
        hardwareText = "Hardware details not available";
    } else {
        if (currentFunctionCode === "04") {
             hardwareText = screws.slice(0, 2).join(", ");
        } else if (currentFunctionCode === "10") {
             hardwareText = screws[0] || "";
        } else {
             hardwareText = screws[0] + "<br />" + (spindle || "");
        }
    }
    
    return { formatted: hardwareText };
};

const getCylinderUsed = (lookupKey, thickness) => {
    const cylinderData = trimsData.cylinders && trimsData.cylinders[lookupKey];
    return cylinderData && thickness in cylinderData
        ? cylinderData[thickness]
        : "N/A"; 
};

// -------------------------------------------------------------
// START: DEFINITIONS FOR ALL SEARCH FUNCTIONS (must be defined before being called)
// -------------------------------------------------------------

const getSearchableTrimsFullOutput = () => {
    const fullTrims = [];
    const supportedSeries = ["80", "PE80", "90"];
    const supportedDevices = {
        "80": ["8800", "8500"], 
        "PE80": ["PE8800", "PE8500"],
        "90": ["9800", "9900"],
    };
    const supportedFunctions = [ "04", "06", "13", "16", "44", "75"]; 
    const supportedHandings = ["RHR", "LHR"];
    const supportedThicknesses = ["1-3/4", "2-1/4"];
    const standardFinishes = [
        { value: "15", label: "15" }, 
        { value: "26D", label: "26D" },
    ];
    const defaultTrim = "ET"; 
    const defaultLever = "L"; 

    for (const series of supportedSeries) {
        for (const device of supportedDevices[series]) {
            for (const functionCode of supportedFunctions) {
                const lookupKey = `${series}-${device}-${functionCode}`;
                const partTemplate = trimsData.trimsParts[lookupKey];

                if (partTemplate) {
                    for (const handing of supportedHandings) {
                        for (const finish of standardFinishes) {
                            for (const thickness of supportedThicknesses) {
                                
                                const availableTrims = getAvailableTrims(series, device, functionCode);
                                if (!availableTrims.includes(defaultTrim)) continue;

                                let basePartRaw = partTemplate.split(' ')[0]; 
                                
                                let generatedNumber = partTemplate
                                    .replace("[handing]", handing)
                                    .replace("[finish]", finish.value)
                                    .replace("[thickness]", thickness)
                                    .replace("[trim]", defaultTrim)
                                    .replace("[lever style]", defaultLever);
                                    
                                const finalPartLine = generatedNumber.replace(/^(.*)\[trim\](.*)$/g, '$1' + defaultTrim + defaultLever + '$2');
                                
                                const cylinderUsed = getCylinderUsed(lookupKey, thickness);
                                const hardwareDetails = getTrimHardware(series, thickness, basePartRaw);
                                
                                const formattedOutput = `
                                    <strong>Part Number:</strong> ${finalPartLine}<br />
                                    <strong>Cylinder Used:</strong> ${cylinderUsed}<br />
                                    ${hardwareDetails.formatted}
                                `;
                                
                                const searchKeyBase = basePartRaw.replace(/[^\w-]/g, '');

                                fullTrims.push({
                                    category: "Exit Trims (Full Output)",
                                    subcategory: `${series} ${device}`,
                                    search_key: searchKeyBase,
                                    description: `F${functionCode} ${searchKeyBase} ${defaultTrim}${defaultLever} ${handing} ${finish.value} ${thickness}`,
                                    part_info: formattedOutput.trim().replace(/\n\s*/g, ' '),
                                    keywords: buildKeywords(
                                        series, 
                                        device, 
                                        "trim", 
                                        "full output", 
                                        searchKeyBase, 
                                        functionCode, 
                                        `${defaultTrim}${defaultLever}`, 
                                        handing, 
                                        finish.value, 
                                        thickness, 
                                        cylinderUsed
                                    )
                                });
                            }
                        }
                    }
                }
            }
        }
    }
    return fullTrims;
};

const getSearchableLatches = () => {
    const latches = [];
    const seriesNameMap = {
        "6Line": "6 Line",
        "6500Series": "6500 Series",
        "7Line": "7 Line",
        "8X": "8X Line",
        "10X": "10X Series",
        "11Line": "11 Line",
    };

    for (const [seriesKey, seriesData] of Object.entries(boredLockLatchesData)) {
        if (seriesData.options) {
            for (const [optionKey, optionDetails] of Object.entries(seriesData.options)) {
                const friendlySeriesName = seriesNameMap[seriesKey] || seriesKey;
                // Get all individual part numbers mentioned in the base property
                const rawPartNumbers = optionDetails.base.replace(/<br\s*\/?>/gi, ' '); 
                const partNumbers = rawPartNumbers.match(/(\d{2}-\d{4,5})/g) || [];

                const backsetMatch = optionDetails.label.match(/(\d-\d\/\d")/);
                const backsetKeyword = backsetMatch ? backsetMatch[0] : '';

                latches.push({
                    category: "Bored Lock Latches",
                    subcategory: seriesKey,
                    search_key: optionKey,
                    description: optionDetails.label,
                    part_info: optionDetails.base.replace(/<br\/>/g, ' / ').replace(/<br \/>/g, ' / '),
                    keywords: buildKeywords(
                        "latch", 
                        "latches", 
                        "bored lock", 
                        "cylindrical lock", 
                        friendlySeriesName, 
                        seriesKey, 
                        optionKey, 
                        optionDetails.label, 
                        partNumbers, // <-- Added part numbers
                        "backset", 
                        backsetKeyword
                    )
                });
            }
        }
    }
    return latches;
};

// 検 ENHANCED: Added ANSI/BHMA F-codes to keywords
const getSearchableMortiseFunctions = () => {
    return mortiseFunctionData.map(func => {
        // Extract ANSI F-codes from description, e.g., "(F29)" or "(F33/F34)"
        const ansiCodeMatch = func.description.match(/(F\d{2,3}(?:\/[^)]+)?)/g);
        const ansiCodes = ansiCodeMatch 
            ? ansiCodeMatch.flatMap(m => m.replace(/[()]/g, '').split('/')) 
            : [];
            
        return {
            category: "Mortise Lockbodies",
            subcategory: "Function Description",
            search_key: func.value,
            description: func.label,
            part_info: func.description.substring(0, 75) + '...',
            keywords: buildKeywords(
                "8200", 
                "mortise", 
                "function", 
                func.value, 
                func.label, 
                func.description, 
                "trim", 
                "deadbolt", 
                "lockbody",
                ansiCodes // <-- Added all extracted ANSI codes
            )
        };
    });
};

const getSearchableCylindricalLockbodies = () => {
    const lockbodies = [];
    const lockbodyParts = cylindricalData["10X Line"].parts;

    for (const [type, typeData] of Object.entries(lockbodyParts)) {
        for (const [funcKey, funcData] of Object.entries(typeData)) {
            for (const [thickness, thicknessData] of Object.entries(funcData)) {
                for (const [leverType, partNoRaw] of Object.entries(thicknessData)) {
                    const partNo = String(partNoRaw);
                    if (partNo && partNo !== 'N/A') {
                        const cleanedPartNo = partNo.replace(/\*/g, '').replace(/~/g, '');
                        const functionKeywords = funcKey.split(/[^a-zA-Z0-9]+/).filter(Boolean); // e.g., ["10XG04"] -> ["10XG04"]

                        lockbodies.push({
                            category: "Bored Lockbodies (10X)",
                            subcategory: funcKey,
                            search_key: funcKey,
                            description: `${funcKey} | ${type} | ${thickness} | Lever: ${leverType}`,
                            part_info: cleanedPartNo,
                            keywords: buildKeywords(
                                "10X", 
                                "bored lock", 
                                "lockbody", 
                                "cylindrical", 
                                type, 
                                leverType, 
                                thickness, 
                                cleanedPartNo, 
                                functionKeywords // <-- Added parts of the function key
                            )
                        });
                    }
                }
            }
        }
    }
    return lockbodies;
};

const getSearchableSpindles = () => {
    const spindles = [];
    for (const [trimType, trimData] of Object.entries(spindleData)) {
        for (const [thicknessRange, partDetails] of Object.entries(trimData)) {
            const dim = partDetails.dimension;
            const length = dim.standard ? `Std: ${dim.standard}" / Studio: ${dim.studio}"` : 'N/A';
            
            let extraKeywords = [];
            if (thicknessRange.includes("1-3/4 to 2")) extraKeywords.push("1-7/8");
            if (thicknessRange.includes("2-1/8 to 2-3/8")) extraKeywords.push("2-1/4");
            if (thicknessRange.includes("2-1/2 to 2-3/4")) extraKeywords.push("2-5/8");

            spindles.push({
                category: "Mortise Spindles",
                subcategory: trimType,
                search_key: thicknessRange,
                description: `Fits Door: ${thicknessRange}"`,
                part_info: `Part: ${partDetails.partNo}. Lengths: ${length}.`,
                keywords: buildKeywords(
                    "spindle", 
                    "mortise", 
                    trimType, 
                    thicknessRange, 
                    partDetails.partNo, 
                    "82-16", 
                    "door thickness", 
                    extraKeywords
                )
            });
        }
    }
    return spindles;
};

const getSearchableLevers = () => {
    const levers = [];
    leverStyleOptions.forEach(lever => {
        const mortiseParts = lever.partNumbers.Mortise;
        const exitParts = lever.partNumbers.Exits;
        
        const isHanded = typeof exitParts === 'object' && exitParts !== null && exitParts.LH;

        if (mortiseParts || exitParts) {
            let partDetails = "";
            let partsArray = [];

            if (isHanded) {
                partDetails = `Exit: RH=${exitParts.RH} / LH=${exitParts.LH}`;
                partsArray.push("handed", exitParts.RH, exitParts.LH);
            } else if (exitParts) {
                partDetails = `Exit: ${exitParts}`;
                partsArray.push("exit", exitParts);
            }

            if (mortiseParts && !isHanded) {
                 partDetails += (partDetails ? ' | ' : '') + `Mortise: Inside: ${mortiseParts.inside} / Outside: ${mortiseParts.outside}`;
                 partsArray.push("mortise", mortiseParts.inside, mortiseParts.outside);
            }
            
            const leverKeywords = `${lever.value} lever style handle ${lever.label}`
            
            levers.push({
                category: "Levers",
                subcategory: lever.label,
                search_key: lever.value,
                description: lever.label + (isHanded ? " (Handed)" : ""),
                part_info: partDetails || "Part details available upon selection.",
                keywords: buildKeywords(
                    leverKeywords, 
                    "handle", 
                    "trim", 
                    partsArray
                )
            });
        }
    });
    return levers;
};

const getSearchableRails = () => {
    const rails = [];
    
    // Iterate over each top-level category in railData
    for (const [railCategory, railParts] of Object.entries(railData)) {
        let stylizedRailType = railCategory.replace(/Rails$/, '').replace(/DummyRail/g, 'Dummy Rail ').replace(/LowProfile/g, 'Low Profile ');

        // This is the key change. Ensure "Rail" is in the subcategory for better searching.
        if (!stylizedRailType.toLowerCase().includes('rail')) {
            stylizedRailType += ' Rail';
        }
        
        const categoryBase = stylizedRailType.trim();

        for (const [key, partNoRaw] of Object.entries(railParts)) {
            const partNo = String(partNoRaw);
            if (!partNo || partNo === 'Not Found' || partNo.includes('Contact TPS')) continue;
            
            const keyParts = key.split('-');
            const sizeCode = keyParts.length > 0 ? keyParts[keyParts.length - 1] : '';
            const prefixes = keyParts.slice(1, keyParts.length - 1).filter(p => p !== sizeCode).join(', ');
            const mainRailType = keyParts[0] || '';
            const [cleanPartNo, note] = partNo.split(' - Only for ');
            
            let description = `Size ${sizeCode}`;
            if (prefixes) {
                description += ` | Prefixes: ${prefixes}`;
            }

            const keywordList = ["rail", "crossbar", "exit device", mainRailType, categoryBase, sizeCode, prefixes, cleanPartNo, key, "80 series"];
            
            rails.push({
                category: "Exit Device Rails",
                subcategory: categoryBase,
                search_key: key,
                description: description,
                part_info: cleanPartNo + (note ? ` (Note: Only for ${note})` : ''),
                keywords: buildKeywords(keywordList)
            });
        }
    }

    // --- NEW LOGIC TO ADD DYNAMICALLY GENERATED RAILS ---
    const peSizes = [
        { code: "E", display: 'E - For openings 26" to 32"' },
        { code: "F", display: 'F - For openings 32.5" to 36"' },
        { code: "J", display: 'J - For openings 36.5" to 42"' },
        { code: "G", display: 'G - For openings 42.5" to 48"' },
    ];
    const peStiles = [
        { code: "PENarrow", base: "PE80N", display: "PE80 Series Narrow Stile Rail" },
        { code: "PEWide", base: "PE80W", display: "PE80 Series Wide Stile Rail" }
    ];

    for (const stile of peStiles) {
        for (const size of peSizes) {
            const partNo = `${stile.base}${size.code}`;
            const key = `${stile.code}--${size.code}`;
            rails.push({
                category: "Exit Device Rails",
                subcategory: stile.display,
                search_key: key,
                description: `PE Series Rail, Size ${size.code} (${size.display})`,
                part_info: `Base Part: ${partNo}`,
                keywords: buildKeywords("rail", "crossbar", "exit device", "PE", "PE80 series", stile.code, size.code, partNo, key)
            });
        }
    }

    const series90Sizes = [
        { code: "E", display: 'E - For openings 24" to 32"' },
        { code: "F", display: 'F - For openings 33" to 36"' },
        { code: "J", display: 'J - For openings 37" to 42"' },
        { code: "G", display: 'G - For openings 43" to 48"' },
    ];
    const series90Stile = '90Series';
    const series90Display = "90 Series Rail";

    for (const size of series90Sizes) {
        let partNo = `981-${size.code}`;
        let key = `${series90Stile}--${size.code}`;
        rails.push({
            category: "Exit Device Rails",
            subcategory: series90Display,
            search_key: key,
            description: `90 Series Rail, Size ${size.code} (${size.display})`,
            part_info: `Base Part: ${partNo}`,
            keywords: buildKeywords("rail", "crossbar", "exit device", series90Stile, "90 series", size.code, partNo, key)
        });

        partNo = `42-981-${size.code}`;
        key = `${series90Stile}-42-${size.code}`;
        rails.push({
            category: "Exit Device Rails",
            subcategory: series90Display,
            search_key: key,
            description: `90 Series Rail, Size ${size.code} (${size.display}) with Reinforced Crossbar`,
            part_info: `Base Part: ${partNo}`,
            keywords: buildKeywords("rail", "crossbar", "exit device", series90Stile, "90 series", "42", size.code, partNo, key)
        });
    }
    
    return rails;
};
// -----------------------------------------------------------------

// 検 ENHANCED: Now includes all possible chassis and cover part numbers in keywords
const getSearchableChassis = () => {
    const chassis = [];
    const deviceMap = {
        "8300": "Mortise Narrow", "8900": "Mortise Wide",
        "8500": "Rim Narrow", "8800": "Rim Wide",
        "MD8400": "CVR Narrow", "AD8400": "CVR Narrow",
        "MD8600": "CVR Wide", "AD8600": "CVR Wide", "WD8600": "CVR Wide",
        "8700": "SVR Wide", "NB8700": "SVR No Bottom Rod",
        "OLD8700": "NB8700 SVR (Old Style: Pre 04/14/25)",
        "PE8300": "P/E Mortise Narrow", "PE8500": "P/E Rim Narrow",
        "MD-PE8400": "P/E CVR Narrow", "AD-PE8400": "P/E CVR Narrow",
        "MD-PE8600": "P/E CVR Wide", "AD-PE8600": "P/E CVR Wide", "WD-PE8600": "P/E CVR Wide",
        "PE8700": "P/E SVR Wide", "PE-NB8700": "P/E SVR No Bottom Rod",
        "PE8800": "P/E Rim Wide", "PE8900": "P/E Mortise Wide"
    };
    
    for (const [key, details] of Object.entries(partCombinations)) {
        const [device, handing] = key.split('-');
        
        let chassisInfo = details.base.chassis.replace(/<br \/>/g, ' / ').replace(/<br\/>/g, ' / ');
        const deviceType = deviceMap[device] || device;

        // Collect all relevant part numbers for keywords
        let collectedParts = [];
        
        // 1. Collect from base parts (chassis, innerChassis, cover)
        collectedParts = collectedParts.concat(
            extractPartNumbers(details.base.chassis),
            extractPartNumbers(details.base.innerChassis),
            extractPartNumbers(details.base.chassisCover)
        );

        // 2. Collect from all prefix overrides
        if (details.base.prefixes) {
            for (const prefixDetails of Object.values(details.base.prefixes)) {
                collectedParts = collectedParts.concat(
                    extractPartNumbers(prefixDetails.chassis),
                    extractPartNumbers(prefixDetails.innerChassis),
                    extractPartNumbers(prefixDetails.chassisCover)
                );
            }
        }
        
        // Filter out duplicates
        const uniqueParts = Array.from(new Set(collectedParts));
        
        chassis.push({
            category: "Exit Device Chassis (Rail Head)",
            subcategory: device,
            search_key: key,
            description: `${device} Chassis (${handing}) - ${deviceType}`,
            part_info: `Chassis: ${chassisInfo.substring(0, 50)}...`,
            keywords: buildKeywords(
                "chassis", 
                "rail head", 
                "inner cover", 
                device, 
                handing, 
                deviceType, 
                "rim", 
                "mortise", 
                "CVR", 
                "SVR",
                uniqueParts // <-- Added all unique part numbers
            )
        });
    }
    return chassis;
};

// 検 ENHANCED: Now includes all rod/case component part codes and descriptions
const getSearchableVerticalRods = () => {
    const rodParts = [];
    verticalRodDevices.forEach(device => {
        const deviceCode = device.code;
        const keywordsBase = [deviceCode, device.display, "vertical rod", "CVR", "SVR", "rod kit", "strike", "case", "latch", "rods"];
        const allComponentParts = [];
        
        // Helper to collect parts from array fields
        const collectParts = (partsArray) => {
            if (partsArray) {
                partsArray.forEach(part => {
                    const cleanCode = String(part.code).replace('-$', '').trim();
                    if (cleanCode && cleanCode !== 'N/A' && cleanCode.length > 3) {
                        allComponentParts.push(cleanCode);
                        // Also add descriptions as keywords
                        keywordsBase.push(part.description);
                    }
                });
            }
        };

        collectParts(device.topRodParts);
        collectParts(device.bottomRodParts);
        collectParts(device.topCaseParts);
        collectParts(device.bottomCaseParts);
        
        const uniqueComponentParts = Array.from(new Set(allComponentParts));

        if (device.topRodParts) {
            rodParts.push({
                category: "Vertical Rod Device Internals",
                subcategory: device.display,
                search_key: `${deviceCode}_Rods`,
                description: `${deviceCode} Top and Bottom Rod Kits`,
                part_info: `Top: ${device.topRodKit} / Bottom: ${device.bottomRodKit}`,
                keywords: buildKeywords(
                    keywordsBase, 
                    "rod kit", 
                    device.topRodKit, 
                    device.bottomRodKit,
                    uniqueComponentParts // <-- Added all unique component part numbers
                )
            });
        }
    });
    return rodParts;
};

const getSearchableTrims = () => {
    const trims = [];

    for (const [key, partTemplate] of Object.entries(trimsData.trimsParts)) {
        const keyParts = key.split('-');
        if (keyParts.length >= 3) {
            const series = keyParts[0];
            const device = keyParts[1];
            const functionCode = keyParts[2];

            const examplePart = partTemplate.split(' ')[0].replace(/\[.*\]/g, '');
            const trimType = examplePart.includes('70') ? 'Escutcheon' : 'Pull Plate';
            
            const devicePrefix = device.substring(0, 2);
            const search_key_alias = `${devicePrefix}${functionCode}`;
            const search_key_alias_2 = `${device}${functionCode}`;

            let availableTrims = getAvailableTrims(series, device, functionCode);
            let leverStylesList = leverStyleOptions.map(l => l.value);
            
            // Build comprehensive keyword list
            const keywordsBase = [
                "trim", 
                "pull", 
                "escutcheon", 
                "handle", 
                "function", 
                series, 
                device, 
                functionCode, 
                examplePart, 
                "700", 
                "P700", 
                search_key_alias, 
                search_key_alias_2, 
                trimType,
                ...availableTrims.flatMap(t => leverStylesList.map(l => `${t}${l}`)) // Add all trim/lever combos
            ];

            trims.push({
                category: "Exit Trims",
                subcategory: "Styles/Codes",
                search_key: key,
                description: `${trimType} - Function ${functionCode} (Base Template)`,
                part_info: `Template: ${partTemplate.replace(/\n/g, ' ')}`,
                keywords: buildKeywords(keywordsBase)
            });
        }
    }
    
    const specificTrims = [
        { key: '704', label: '704 Night Latch Trim', parts: 'Key Retracts Latch' },
        { key: '713', label: '713 Classroom Trim', parts: 'Key Unlocks Lever' },
        { key: '715', label: '715 Passage Trim', parts: 'Passage (No Cylinder)' },
        { key: '716', label: '716 Intruder Trim', parts: 'Double Cylinder/Intruder' },
        { key: 'WE', label: 'WE Wide Escutcheon', parts: 'Wide Escutcheon Design' },
        { key: 'NE', label: 'NE Narrow Escutcheon', parts: 'Narrow Escutcheon Design' },
        { key: 'FLL', label: 'FLL/FLW Pull Plate', parts: 'Flat Pull Plate' },
    ];
    specificTrims.forEach(t => {
        trims.push({
            category: "Exit Trims",
            subcategory: "Styles/Codes",
            search_key: t.key,
            description: t.label,
            part_info: t.parts,
            keywords: buildKeywords(t.label, "trim", "pull", "handle", "code", t.key)
        });
    });
    
    return trims;
};

// 検 ENHANCED: Explicitly includes bracket and screw part numbers in keywords
const getSearchableEndCaps = () => {
    const endCaps = [];
    
    for (const [series, details] of Object.entries(endCapPartDetails)) {
        const seriesKey = series.replace(/\s/g, '');

        const defaultCap = details.default.endCap.replace(/-\$/g, '');
        const defaultBracket = details.default.bracket.replace(/-\$/g, '');
        const defaultScrews = details.default.screws.replace(/-\$/g, '');

        endCaps.push({
            category: "Exit Device End Caps",
            subcategory: series,
            search_key: `${seriesKey}_DEFAULT`,
            description: `Standard End Cap, Bracket, and Screws (Base)`,
            part_info: `Cap: ${defaultCap} / Bracket: ${defaultBracket} / Screws: ${defaultScrews}`,
            keywords: buildKeywords(
                "end cap", 
                series, 
                "cover", 
                "base", 
                defaultCap, 
                defaultBracket, 
                defaultScrews, 
                "screws",
                "bracket"
            )
        });
        
        for (const [prefixCode, parts] of Object.entries(details).filter(([key]) => key !== 'default')) {
             const prefixedCap = parts.endCap.replace(/-\$/g, '');
             const prefixedBracket = parts.bracket ? parts.bracket.replace(/-\$/g, '') : defaultBracket;
             const prefixDef = endCapPrefixesData.find(p => p.code === prefixCode);
             const screwPartPrefixed = parts.screws.replace(/-\$/g, '');

             endCaps.push({
                category: "Exit Device End Caps",
                subcategory: series,
                search_key: `${seriesKey}_${prefixCode}`,
                description: `${prefixCode} - ${prefixDef?.name} End Cap`,
                part_info: `End Cap: ${prefixedCap} / Screws: ${screwPartPrefixed}`,
                keywords: buildKeywords(
                    "end cap", 
                    series, 
                    "cover", 
                    prefixCode, 
                    prefixDef?.name, 
                    prefixedCap, 
                    prefixedBracket, 
                    screwPartPrefixed, 
                    "screws", 
                    "flush", 
                    "overlapping",
                    "bracket"
                )
            });
        }
    }
    return endCaps;
};

const getSearchableMortiseExitLockbodies = () => {
    const lockbodies = [];
    
    mortiseExitFunctions.forEach(func => {
        lockbodies.push({
            category: "Mortise Exit Lockbodies (80/PE80)",
            subcategory: "Function",
            search_key: func.value,
            description: func.label,
            part_info: `Example Base Part: 9${func.value}-`,
            keywords: buildKeywords(
                "mortise", 
                "exit", 
                "lockbody", 
                "function", 
                func.value, 
                func.label, 
                `9${func.value}`, 
                "8900", 
                "8300"
            )
        });
    });

    mortiseExitPrefixes.forEach(prefix => {
        lockbodies.push({
            category: "Mortise Exit Lockbodies (80/PE80)",
            subcategory: "Prefixes",
            search_key: prefix.code,
            description: `${prefix.code} Prefix`,
            part_info: prefix.name,
            keywords: buildKeywords(
                "mortise", 
                "exit", 
                "lockbody", 
                "prefix", 
                prefix.code, 
                prefix.name, 
                "fire rated"
            )
        });
    });
    
    mortiseExitDevices.forEach(device => {
        lockbodies.push({
            category: "Mortise Exit Lockbodies (80/PE80)",
            subcategory: "Devices",
            search_key: device.value,
            description: device.label,
            part_info: `Used for ${device.label} Lockbodies.`,
            keywords: buildKeywords(
                "mortise", 
                "exit", 
                "lockbody", 
                "device", 
                device.value, 
                device.label, 
                "8000", 
                "pe8000"
            )
        });
    });

    return lockbodies;
};

const getSearchableTailpieces = () => {
    const tailpieces = [];
    
    const traverseData = (data, path = []) => {
        if (data && typeof data === 'object') {
            if (data.part && data.imageKey) {
                const [/* lockSeries */, cylinderType, competitiveType, brand, functionType, cylinderSubtype, doorThickness] = path;
                
                const category = "Bored Lock Tailpieces";
                const subcategory = [cylinderType, competitiveType, brand].filter(Boolean).join(' / ');
                
                const description = [functionType, cylinderSubtype, doorThickness].filter(Boolean).join(' | ');
                
                tailpieces.push({
                    category: category,
                    subcategory: subcategory,
                    search_key: data.part,
                    description: description,
                    part_info: data.part,
                    path: path, // <-- ADDED PATH FOR PRE-FILLING
                    keywords: buildKeywords(path, data.part, "tailpiece", "cylinder", "bore lock", "10x")
                });
                return;
            }

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    traverseData(data[key], [...path, key]);
                }
            }
        }
    };
    
    traverseData(tailpieceData);
    
    return tailpieces;
};

// -------------------------------------------------------------
// END: DEFINITIONS FOR ALL SEARCH FUNCTIONS
// -------------------------------------------------------------


export const getSearchableData = () => {
    return [
        ...getSearchableTrimsFullOutput(),
        ...getSearchableLatches(),
        ...getSearchableMortiseFunctions(),
        ...getSearchableCylindricalLockbodies(),
        ...getSearchableSpindles(),
        ...getSearchableLevers(),
        ...getSearchableRails(), // <-- This now includes all rails
        ...getSearchableChassis(),
        ...getSearchableVerticalRods(),
        ...getSearchableTrims(),
        ...getSearchableEndCaps(),
        ...getSearchableMortiseExitLockbodies(),
        ...getSearchableTailpieces()
    ];
};