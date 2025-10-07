// src/searchableData.js

// Import all required data structures
import { lockbodiesData as cylindricalData } from './components/CylindricalLockbodies';
import { lockbodyFunctions as mortiseFunctionData } from './components/MortiseLockbodies';
import { spindleData } from './components/MortiseSpindles';
import { boredLockLatchesData } from './components/Latches';
import { leverStyleOptions } from './components/LeverStyles';
import { partsData as railData } from './partsData';
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
                                        [
                                            series,
                                            device,
                                            functionCode,
                                            searchKeyBase,
                                            `${defaultTrim}${defaultLever}`,
                                            handing,
                                            finish.value,
                                            thickness,
                                            cylinderUsed,
                                            `F${functionCode}`,
                                            `full output trim`,
                                            `${series} ${device} trim`,
                                        ],
                                        [`${series}-${device}-${functionCode}`, `${defaultTrim} trim`, `${defaultLever} lever`, 'exit trim full output']
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
                const partNumbers = optionDetails.base.replace(/<br\s*\/?>/gi, ' '); 

                const backsetMatch = optionDetails.label.match(/(\d-\d\/\d")/);
                const backsetKeyword = backsetMatch ? backsetMatch[0] : '';

                latches.push({
                    category: "Bored Lock Latches",
                    subcategory: seriesKey,
                    search_key: optionKey,
                    description: optionDetails.label,
                    part_info: optionDetails.base.replace(/<br\/>/g, ' / ').replace(/<br \/>/g, ' / '),
                    keywords: buildKeywords(
                        [
                            friendlySeriesName,
                            seriesKey,
                            optionKey,
                            optionDetails.label,
                            partNumbers,
                            backsetKeyword,
                            'bored lock latch',
                            'cylindrical latch',
                            'latch',
                            'backset',
                        ],
                        ['cylindrical lock', 'strike latch', 'latchbolt', 'replacement latch', 'series latch']
                    )
                });
            }
        }
    }
    return latches;
};

const getSearchableMortiseFunctions = () => {
    return mortiseFunctionData.map(func => ({
        category: "Mortise Lockbodies",
        subcategory: "Function Description",
        search_key: func.value,
        description: func.label,
        part_info: func.description.substring(0, 75) + '...',
        keywords: buildKeywords(
            [
                func.value,
                func.label,
                func.description,
                '8200 mortise lockbody',
                'mortise lock function',
                'lockbody function',
            ],
            ['mortise body', 'series 8200', 'function description', 'mortise trim']
        )
    }));
};

const getSearchableCylindricalLockbodies = () => {
    const lockbodies = [];
    const lockbodyParts = cylindricalData["10X Line"].parts;

    for (const [type, typeData] of Object.entries(lockbodyParts)) {
        for (const [funcKey, funcData] of Object.entries(typeData)) {
            for (const [thickness, thicknessData] of Object.entries(funcData)) {
                for (const [leverType, partNo] of Object.entries(thicknessData)) {
                    if (partNo && partNo !== 'N/A') {
                        let funcLabel = funcKey;
                        lockbodies.push({
                            category: "Bored Lockbodies (10X)",
                            subcategory: funcKey,
                            search_key: funcKey,
                            description: `${funcKey} | ${type} | ${thickness} | Lever: ${leverType}`,
                            part_info: partNo.replace(/\*/g, '').replace(/~/g, ''),
                            keywords: buildKeywords(
                                [
                                    '10x',
                                    'bored lockbody',
                                    funcKey,
                                    type,
                                    leverType,
                                    thickness,
                                    funcLabel,
                                    partNo,
                                ],
                                ['cylindrical lockbody', 'lock body', 'series 10x', '7 line compatible', 'cylindrical chassis']
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
            
            let extraKeywords = '';
            if (thicknessRange.includes("1-3/4 to 2")) extraKeywords += " 1-7/8";
            if (thicknessRange.includes("2-1/8 to 2-3/8")) extraKeywords += " 2-1/4";
            if (thicknessRange.includes("2-1/2 to 2-3/4")) extraKeywords += " 2-5/8";

            spindles.push({
                category: "Mortise Spindles",
                subcategory: trimType,
                search_key: thicknessRange,
                description: `Fits Door: ${thicknessRange}"`,
                part_info: `Part: ${partDetails.partNo}. Lengths: ${length}.`,
                keywords: buildKeywords(
                    [
                        trimType,
                        thicknessRange,
                        extraKeywords,
                        partDetails.partNo,
                        length,
                        'mortise spindle',
                        'door thickness',
                        '82-16 spindle',
                    ],
                    ['spindle kit', 'trim spindle', 'replacement spindle']
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
            let keywords = lever.label;

            if (isHanded) {
                partDetails = `Exit: RH=${exitParts.RH} / LH=${exitParts.LH}`;
                keywords += ` handed ${exitParts.RH} ${exitParts.LH}`;
            } else if (exitParts) {
                partDetails = `Exit: ${exitParts}`;
                keywords += ` exit ${exitParts}`;
            }

            if (mortiseParts && !isHanded) {
                 partDetails += (partDetails ? ' | ' : '') + `Mortise: Inside: ${mortiseParts.inside} / Outside: ${mortiseParts.outside}`;
                 keywords += ` mortise ${mortiseParts.inside} ${mortiseParts.outside}`;
            }
            
            const leverKeywords = `${lever.value} lever style handle ${lever.label}`

            levers.push({
                category: "Levers",
                subcategory: lever.label,
                search_key: lever.value,
                description: lever.label + (isHanded ? " (Handed)" : ""),
                part_info: partDetails || "Part details available upon selection.",
                keywords: buildKeywords(
                    [
                        lever.value,
                        lever.label,
                        leverKeywords,
                        keywords,
                        partDetails,
                        'lever handle',
                        'trim lever',
                        'door lever',
                        isHanded ? 'handed lever' : 'non handed lever',
                    ],
                    ['lever style', 'lever design', 'exit trim lever', 'mortise lever']
                )
            });
        }
    });
    return levers;
};

const getSearchableRails = () => {
    const rails = [];
    for (const [railType, railParts] of Object.entries(railData)) {
        for (const [key, partNo] of Object.entries(railParts)) {
            const keyParts = key.split('-');
            if (partNo && partNo !== 'Not Found' && !partNo.includes('Contact TPS')) {
                const sizeCode = keyParts.pop();
                const prefixes = keyParts.slice(1).filter(p => p !== sizeCode).join(', ');
                const stylizedRailType = railType.replace(/Rails$/, '');

                rails.push({
                    category: "Exit Device Rails",
                    subcategory: stylizedRailType,
                    search_key: key,
                    description: `Size ${sizeCode} | Prefixes: ${prefixes || 'Standard'}`,
                    part_info: partNo.replace(/ - Only for .*$/, ''),
                    keywords: buildKeywords(
                        [
                            stylizedRailType,
                            `${stylizedRailType} rail`,
                            `${stylizedRailType} rails`,
                            sizeCode,
                            prefixes,
                            partNo,
                            key,
                            'exit device rail',
                            'crossbar',
                            'rail assembly',
                        ],
                        ['rail combo', 'rail combination', 'rail kit', 'rail set', 'rail head']
                    )
                });
            }
        }
    }
    return rails;
};

const getSearchableChassis = () => {
    const chassis = [];
    const deviceMap = {
        "8300": "Mortise Narrow", "8900": "Mortise Wide",
        "8500": "Rim Narrow", "8800": "Rim Wide",
        "MD8400": "CVR Narrow", "AD8400": "CVR Narrow",
        "MD8600": "CVR Wide", "AD8600": "CVR Wide", "WD8600": "CVR Wide",
        "8700": "SVR Wide", "NB8700": "SVR No Bottom Rod",
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
        
        chassis.push({
            category: "Exit Device Chassis (Rail Head)",
            subcategory: device,
            search_key: key,
            description: `${device} Chassis (${handing}) - ${deviceType}`,
            part_info: `Chassis: ${chassisInfo.substring(0, 50)}...`,
            keywords: buildKeywords(
                [
                    device,
                    handing,
                    deviceType,
                    chassisInfo,
                    'rail head',
                    'exit device chassis',
                    'chassis',
                    'rim',
                    'mortise',
                    'cvr',
                    'svr',
                ],
                ['chassis cover', 'rail head cover', 'base chassis', 'exit device body']
            )
        });
    }
    return chassis;
};

const getSearchableVerticalRods = () => {
    const rodParts = [];
    verticalRodDevices.forEach(device => {
        const deviceCode = device.code;
        const keywordsBase = `${deviceCode} ${device.display} vertical rod CVR SVR rod kit strike case latch rods`;

        if (device.topRodParts) {
            rodParts.push({
                category: "Vertical Rod Device Internals",
                subcategory: device.display,
                search_key: `${deviceCode}_Rods`,
                description: `${deviceCode} Top and Bottom Rod Kits`,
                part_info: `Top: ${device.topRodKit} / Bottom: ${device.bottomRodKit}`,
                keywords: buildKeywords(
                    [
                        deviceCode,
                        device.display,
                        device.topRodKit,
                        device.bottomRodKit,
                        'vertical rod kit',
                        'rod kit',
                        'top rod',
                        'bottom rod',
                        'exit device rod',
                    ],
                    ['vr kit', 'rod package', 'rod parts', 'cvr rods', 'svr rods']
                )
            });
        }

        if (device.topCaseParts) {
            device.topCaseParts.forEach(part => {
                rodParts.push({
                    category: "Vertical Rod Device Internals",
                    subcategory: `${device.display} - Case`,
                    search_key: `${deviceCode}_Case_${part.code}`,
                    description: `Case Part: ${part.description}`,
                    part_info: `Part: ${part.code} (Type: ${part.type || 'Standard'})`,
                    keywords: buildKeywords(
                        [
                            deviceCode,
                            device.display,
                            part.code,
                            part.description,
                            part.type,
                            'vertical rod case',
                            'case part',
                            'latch case',
                        ],
                        ['rod mechanism', 'rod housing', 'vr case', 'exit device case']
                    )
                });
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

            const availableTrims = getAvailableTrims(series, device, functionCode);
            const trimLeverCombos = [];
            for (const trim of availableTrims) {
                for (const lever of leverStyleOptions) {
                    trimLeverCombos.push(`${trim}${lever.value}`);
                }
            }

            trims.push({
                category: "Exit Trims",
                subcategory: "Styles/Codes",
                search_key: key,
                description: `${trimType} - Function ${functionCode} (Base Template)`,
                part_info: `Template: ${partTemplate.replace(/\n/g, ' ')}`,
                keywords: buildKeywords(
                    [
                        series,
                        device,
                        functionCode,
                        examplePart,
                        trimType,
                        partTemplate,
                        search_key_alias,
                        search_key_alias_2,
                        availableTrims,
                        trimLeverCombos,
                        'exit trim',
                        'trim style',
                        'pull plate',
                        'escutcheon',
                    ],
                    ['trim template', 'function trim', `${series} ${device} trim`, `${functionCode} trim`]
                )
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
            keywords: buildKeywords(
                [
                    t.label,
                    t.key,
                    t.parts,
                    'exit trim',
                    'trim style',
                    'pull handle',
                ],
                ['trim code', 'trim designation']
            )
        });
    });

    return trims;
};

const getSearchableEndCaps = () => {
    const endCaps = [];
    
    for (const [series, details] of Object.entries(endCapPartDetails)) {
        const seriesKey = series.replace(/\s/g, '');

        const defaultCap = details.default.endCap.replace(/-\$/g, '');
        const bracketPart = details.default.bracket.replace(/-\$/g, '');
        const screwPart = details.default.screws.replace(/-\$/g, '');

        endCaps.push({
            category: "Exit Device End Caps",
            subcategory: series,
            search_key: `${seriesKey}_DEFAULT`,
            description: `Standard End Cap, Bracket, and Screws (Base)`,
            part_info: `Cap: ${defaultCap} / Bracket: ${bracketPart} / Screws: ${screwPart}`,
            keywords: buildKeywords(
                [
                    series,
                    defaultCap,
                    bracketPart,
                    screwPart,
                    'end cap',
                    'cap screws',
                    'bracket',
                    'cover',
                ],
                ['standard end cap', 'exit device cap', 'rail cap', 'tip cap']
            )
        });

        for (const [prefixCode, parts] of Object.entries(details).filter(([key]) => key !== 'default')) {
             const prefixedCap = parts.endCap.replace(/-\$/g, '');
             const prefixDef = endCapPrefixesData.find(p => p.code === prefixCode);
             const screwPartPrefixed = parts.screws.replace(/-\$/g, '');

             endCaps.push({
                category: "Exit Device End Caps",
                subcategory: series,
                search_key: `${seriesKey}_${prefixCode}`,
                description: `${prefixCode} - ${prefixDef?.name} End Cap`,
                part_info: `End Cap: ${prefixedCap} / Screws: ${screwPartPrefixed}`,
                keywords: buildKeywords(
                    [
                        series,
                        prefixCode,
                        prefixDef?.name,
                        prefixedCap,
                        screwPartPrefixed,
                        'end cap',
                        'cover',
                        'screws',
                        'flush end cap',
                        'overlapping end cap',
                    ],
                    ['prefix end cap', 'series end cap', 'trim cap']
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
                [
                    func.value,
                    func.label,
                    `9${func.value}`,
                    'mortise exit lockbody',
                    'function',
                    '8900',
                    '8300',
                ],
                ['exit body function', 'pe80 function', '80 series function']
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
                [
                    prefix.code,
                    prefix.name,
                    'mortise exit lockbody prefix',
                    'fire rated',
                ],
                ['prefix code', 'prefix option', 'series prefix']
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
                [
                    device.value,
                    device.label,
                    'mortise exit lockbody device',
                    '8000',
                    'pe8000',
                ],
                ['device option', 'mortise exit device', 'exit device family']
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
                    keywords: buildKeywords(
                        [
                            path,
                            data.part,
                            cylinderType,
                            competitiveType,
                            brand,
                            functionType,
                            cylinderSubtype,
                            doorThickness,
                            'tailpiece',
                            'tail piece',
                            'tailpieces',
                            'tail',
                            'cylinder tail',
                            'bored lock',
                            '10x',
                        ],
                        ['adapter tailpiece', 'conversion tail', 'cam tailpiece']
                    )
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
        ...getSearchableRails(),
        ...getSearchableChassis(),
        ...getSearchableVerticalRods(),
        ...getSearchableTrims(),
        ...getSearchableEndCaps(),
        ...getSearchableMortiseExitLockbodies(),
        ...getSearchableTailpieces()
    ];
};