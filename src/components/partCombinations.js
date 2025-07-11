// Define part combinations with base parts and prefix overrides
const partCombinations = {
  // Narrow Stile
  "8300-Left": {
    base: {
      chassis: `
        <br /> 1-3/4" Door = 68-2481 
        <br /> 2" to 2-3/4" Door = 68-2483`,
      chassisCover: `68-0496-FINISH`,
    },
  },
  "8300-Right": {
    base: {
      chassis: `
        <br /> 1-3/4" Door = 68-2482 
        <br /> 2" to 2-3/4" Door = 68-2484`,
      chassisCover: `68-0496-FINISH`,
    },
  },
  "MD8400-Left": {
    base: {
      chassis: `
        <br /> Standard Door = 68-5944 
        <br /> 1/4" Cladding = 68-6013 
        <br /> 1/2" Cladding = 68-5946`,
      innerChassis: `94-2008`,
      chassisCover: `68-0496-FINISH`,
      prefixes: {
        12: {
          innerChassis: `68-3627`,
        },
        "12-53": {
          innerChassis: `68-3855`,
        },
        "12-5CH": {
          innerChassis: `68-7935`,
        },
        "12-53-5CH": {
          innerChassis: `68-7790`,
        },
        53: {
          innerChassis: `68-3854`,
        },
        "5CH": {
          innerChassis: `68-7936`,
        },
        "53-5CH": {
          innerChassis: `68-7789`,
        },
      },
    },
  },
  "MD8400-Right": {
    base: {
      chassis: `
        <br /> Standard Door = 68-5945 
        <br /> 1/4" Cladding = 68-6014 
        <br /> 1/2" Cladding = 68-5951`,
      innerChassis: `94-2008`,
      chassisCover: `68-0496-FINISH`,
      prefixes: {
        12: {
          innerChassis: `68-3627`,
        },
        "12-53": {
          innerChassis: `68-3855`,
        },
        "12-5CH": {
          innerChassis: `68-7935`,
        },
        "12-53-5CH": {
          innerChassis: `68-7790`,
        },
        53: {
          innerChassis: `68-3854`,
        },
        "5CH": {
          innerChassis: `68-7936`,
        },
        "53-5CH": {
          innerChassis: `68-7789`,
        },
      },
    },
  },
  "AD8400-Left": {
    base: {
      chassis: `
        <br /> Standard Door = 68-5944 
        <br /> 1/4" Cladding = 68-6013 
        <br /> 1/2" Cladding = 68-5946`,
      innerChassis: `94-2008`,
      chassisCover: `68-0496-FINISH`,
      prefixes: {
        12: {
          innerChassis: `68-3627`,
        },
        "12-53": {
          innerChassis: `68-3855`,
        },
        "12-5CH": {
          innerChassis: `68-7935`,
        },
        "12-53-5CH": {
          innerChassis: `68-7790`,
        },
        53: {
          innerChassis: `68-3854`,
        },
        "5CH": {
          innerChassis: `68-7936`,
        },
        "53-5CH": {
          innerChassis: `68-7789`,
        },
      },
    },
  },
  "AD8400-Right": {
    base: {
      chassis: `
        <br /> Standard Door = 68-5945 
        <br /> 1/4" Cladding = 68-6014 
        <br /> 1/2" Cladding = 68-5951`,
      innerChassis: `94-2008`,
      chassisCover: `68-0496-FINISH`,
      prefixes: {
        12: {
          innerChassis: `68-3627`,
        },
        "12-53": {
          innerChassis: `68-3855`,
        },
        "12-5CH": {
          innerChassis: `68-7935`,
        },
        "12-53-5CH": {
          innerChassis: `68-7790`,
        },
        53: {
          innerChassis: `68-3854`,
        },
        "5CH": {
          innerChassis: `68-7936`,
        },
        "53-5CH": {
          innerChassis: `68-7789`,
        },
      },
    },
  },
  "8500-Left": {
    base: {
      chassis: `68-5880`,
      chassisCover: `68-0495-FINISH`,
      prefixes: {
        53: {
          chassis: `68-7411`,
        },
        "5CH": {
          chassis: `68-8009`,
        },
        "53-5CH": {
          chassis: `68-8010`,
        },
        GL: {
          chassis: `68-5881`,
        },
        59: {
          chassis: `68-5882`,
        },
      },
    },
  },
  "8500-Right": {
    base: {
      chassis: `68-5880`,
      chassisCover: `68-0495-FINISH`,
      prefixes: {
        53: {
          chassis: `68-7411`,
        },
        "5CH": {
          chassis: `68-8009`,
        },
        "53-5CH": {
          chassis: `68-8010`,
        },
        GL: {
          chassis: `68-5881`,
        },
        59: {
          chassis: `68-5882`,
        },
      },
    },
  },
  // Wide Stile
  "MD8600-Left": {
    base: {
      chassis: ` 68-5068`,
      innerChassis: `94-2008`,
      chassisCover: `68-0407-FINISH`,
      prefixes: {
        12: {
          innerChassis: `68-3627`,
        },
        "12-53": {
          innerChassis: `68-3855`,
        },
        "12-5CH": {
          innerChassis: `68-7935`,
        },
        "12-53-5CH": {
          innerChassis: `68-7935`,
        },
        53: {
          innerChassis: `68-3854`,
        },
        "5CH": {
          innerChassis: `68-7936`,
        },
        "53-5CH": {
          innerChassis: `68-7789`,
        },
        59: {
          chassis: `68-5070`,
        },
      },
    },
  },
  "MD8600-Right": {
    base: {
      chassis: `
        <br /> Standard Door = 68-5069 
`,
      innerChassis: `94-2008`,
      chassisCover: `68-0407-FINISH`,
      prefixes: {
        12: {
          innerChassis: `68-3627`,
        },
        "12-53": {
          innerChassis: `68-3855`,
        },
        "12-5CH": {
          innerChassis: `68-7935`,
        },
        "12-53-5CH": {
          innerChassis: `68-7935`,
        },
        53: {
          innerChassis: `68-3854`,
        },
        "5CH": {
          innerChassis: `68-7936`,
        },
        "53-5CH": {
          innerChassis: `68-7789`,
        },
        59: {
          chassis: `68-5071`,
        },
      },
    },
  },

  "AD8600-Left": {
    base: {
      chassis: "68-5068",
      innerChassis: `94-2008`,
      chassisCover: `68-0407-FINISH`,
      prefixes: {
        12: {
          innerChassis: `68-3627`,
        },
        "12-53": {
          innerChassis: `68-3855`,
        },
        "12-5CH": {
          innerChassis: `68-7935`,
        },
        "12-53-5CH": {
          innerChassis: `68-7935`,
        },
        53: {
          innerChassis: `68-3854`,
        },
        "5CH": {
          innerChassis: `68-7936`,
        },
        "53-5CH": {
          innerChassis: `68-7789`,
        },
        59: {
          chassis: `68-5070`,
        },
      },
    },
  },
  "AD8600-Right": {
    base: {
      chassis: "68-5069",
      innerChassis: `94-2008`,
      chassisCover: `68-0407-FINISH`,
      prefixes: {
        53: {
          innerChassis: `68-3854`,
        },
        "5CH": {
          innerChassis: `68-7936`,
        },
        "53-5CH": {
          innerChassis: `68-7789`,
        },
        59: {
          chassis: `68-5071`,
        },
      },
    },
  },
  "WD8600-Left": {
    base: {
      chassis: "68-5068",
      innerChassis: `68-3580`,
      chassisCover: `68-0407-FINISH`,
      prefixes: {
        12: {
          innerChassis: `68-3580`,
        },
        "12-53": {
          innerChassis: `68-3859`,
        },
        53: {
          innerChassis: `68-3859`,
        },
        "5CH": {
          innerChassis: `68-7785`,
        },
        "53-5CH": {
          innerChassis: `68-7786`,
        },
        59: {
          chassis: `68-5070`,
        },
      },
    },
  },
  "WD8600-Right": {
    base: {
      chassis: "68-5069",
      innerChassis: `94-2008`,
      chassisCover: `68-0407-FINISH`,
      prefixes: {
        12: {
          innerChassis: `68-3580`,
        },
        "12-53": {
          innerChassis: `68-3859`,
        },
        53: {
          innerChassis: `68-3859`,
        },
        "5CH": {
          innerChassis: `68-7785`,
        },
        "53-5CH": {
          innerChassis: `68-7786`,
        },
        59: {
          chassis: `68-5071`,
        },
      },
    },
  },
  "8700-Left": {
    base: {
      chassis: `
        <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-2201 
        <br /> Functions 10 & 40 = 68-2163 
        <br /> Function 28 = 68-2210 
        <br /> Functions 62 & 63 = 68-2204`,
      chassisCover: `68-0405-FINISH`,
      prefixes: {
        53: {
          chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-3714 
            <br /> Functions 10 & 40 = 68-3823 
            <br /> Function 28 = 68-3829 
            <br /> Functions 62 & 63 = 68-3826`,
        },
        FM: {
          chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-7306 
            <br /> Functions 10 & 40 = 68-7308/>`,
        },
        HC4: {
          chassis: `68-4112`,
        },
      },
    },
  },
  "8700-Right": {
    base: {
      chassis: `
        <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-2202 
        <br /> Functions 10 & 40 = 68-2164 
        <br /> Function 28 = 68-2211 
        <br /> Functions 62 & 63 = 68-2205`,
      chassisCover: `68-0405-FINISH`,
      prefixes: {
        53: {
          chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-3715 
            <br /> Functions 10 & 40 = 68-3824 
            <br /> Function 28 = 68-3830 
            <br /> Functions 62 & 63 = 68-3827`,
        },
        FM: {
          chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-7307 
            <br /> Functions 10 & 40 = 68-7309`,
        },
        HC4: {
          chassis: `68-4113`,
        },
      },
    },
  },
  "NB8700-Left": {
    base: {
      chassis: `68-4568`,
      chassisCover: `68-0405-FINISH`,
      prefixes: {
        53: {
          chassis: "68-5449",
        },
      },
    },
  },
  "NB8700-Right": {
    base: {
      chassis: `68-4569`,
      chassisCover: `68-0405-FINISH`,
      prefixes: {
        53: {
          chassis: "68-5450",
        },
      },
    },
  },
  "8800-Left": {
    base: {
      chassis: `
        <br /> All functions (Except 16, 28, 63, 66) = 68-4261 
        <br /> 16 Function Only (No Indicator) = 68-2425 
        <br /> 28 Function Only (Pull Trim) = 68-2329
        <br /> 63 Function Only (Pull Trim) = 68-2326
        <br /> 66 Function Only (Pull Trim) = 68-2443
        `,
      chassisCover: `
        <br /> All Functions (Except 16 & 66) = 68-0406-FINISH
        <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-0408-FINISH
        `,
      prefixes: {
        53: {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-6075 
            <br /> 16 Function Only (No Indicator) = 68-3722,
            <br /> 28 Function Only (Pull Trim) = 68-3835
            <br /> 63 Function Only (Pull Trim) = 68-3727
            <br /> 66 Function Only (Pull Trim) = 68-3732
            `,

          chassisCover: `
            <br /> All Functions (Except 16, 28, 63, 66) = 68-0406-FINISH 
            <br /> 16 & 66 Function (No Indicator) = 68-1015-FINISH 
            <br /> 28 & 63 Function (Pull Trim) = 68-1014-FINISH`,
        },
        59: {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
            <br /> 16 Function Only (No Indicator) = 68-3722 
            <br /> 28 Function Only (Pull Trim) = 68-3835
            <br /> 63 Function Only (Pull Trim) = 68-3727
            <br /> 66 Function Only (Pull Trim) = 68-3732
            `,
          chassisCover: `
            <br /> All Functions (Except 16, 28, 63, 66) = 68-0406-FINISH 
            <br /> 16 & 66 Function (No Indicator) = 68-1015-FINISH 
            <br /> 28 & 63 Function (Pull Trim) = 68-1014-FINISH`,
        },
        12: {
          chassis: `
          <br /> All functions (Except 16, 28, 63, 66) = 68-4263 
          <br /> 16 Function Only (No Indicator) = 68-2425 
          <br /> 28 Function Only (Pull Trim) = 68-2329
          <br /> 63 Function Only (Pull Trim) = 68-2326
          <br /> 66 Function Only (Pull Trim) = 68-2443
          `,
        },
        GL: {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
            <br /> 16 Function Only (No Indicator) = 68-4077 
            <br /> 28 Function Only (Pull Trim) = 68-4082
            <br /> 63 Function Only (Pull Trim) = 68-4099
            <br /> 66 Function Only (Pull Trim) = 68-4104
            `,
          chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-1014-FINISH
            <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-1015-FINISH
            `,
        },
        AL: {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
            <br /> 16 Function Only (No Indicator) = 68-4077 
            <br /> 28 Function Only (Pull Trim) = 68-4082
            <br /> 63 Function Only (Pull Trim) = 68-4099
            <br /> 66 Function Only (Pull Trim) = 68-4104
            `,
          chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-1014-FINISH
            <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-1015-FINISH
            `,
        },
        49: {
          chassis: `
            <br /> 16 Function (Includes Indicator) = 68-6265
            <br /> 66 Function (Includes Indicator) = 68-6271
            `,
          chassisCover: `68-1782-FINISH`,
        },
        "49-AL": {
          chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6287
            <br /> 66 Function Only (Includes Indicator) = 68-6283
            `,
          chassisCover: `68-1784-FINISH`,
        },
        "49-GL": {
          chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6287`,
          chassisCover: `68-1784-FINISH`,
        },
        "49-59": {
          chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6287`,
          chassisCover: `68-1784-FINISH`,
        },
        "12-GL": {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4411 
            <br /> 16 Function Only (No Indicator) = 68-4077
            <br /> 28 Function Only (Pull Trim) = 68-4082`,
          chassisCover: `68-1014-FINISH`,
        },
        "12-AL": {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4411 
            <br /> 16 Function Only (No Indicator) = 68-4077
            <br /> 28 Function Only (Pull Trim) = 68-4082`,
          chassisCover: `68-1014-FINISH`,
        },
        "12-AL-GL": {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4411 
            <br /> 16 Function Only (No Indicator) = 68-4077
            <br /> 28 Function Only (Pull Trim) = 68-4082`,
          chassisCover: `68-1014-FINISH`,
        },
        "5CH": {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-7484
            <br /> 16 Function Only (No Indicator) = 68-7512  
            <br /> 28 Function Only (Pull Trim) = 68-7514
            <br /> 63 Function Only (Pull Trim) = 68-7516
            <br /> 63 Function Only (Pull Trim) = 68-7518
            `,
          chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-0406-FINISH
            <br /> 16 & 66 Function (No Indicator) = 68-0408-FINISH
            `,
        },
        "53-5CH": {
          chassis: `
            <br /> 16 Function Only (No Indicator) = 68-7965 
            <br /> 28 Function Only (Pull Trim) = 68-7971
            <br /> 63 Function Only (Pull Trim) = 68-7967
            <br /> 66 Function Only (Pull Trim) = 68-7969
            `,
          chassisCover: `
              <br /> 16 & 66 Function (No Indicator) = 68-1015-FINISH 
              <br /> 28 & 63 Function (Pull Trim) = 68-1014-FINISH`,
        },
        "59-5CH": {
          chassis: `
            <br /> 16 Function Only (No Indicator) = 68-7965 
            <br /> 28 Function Only (Pull Trim) = 68-7971
            <br /> 63 Function Only (Pull Trim) = 68-7967
            <br /> 66 Function Only (Pull Trim) = 68-7969
            `,
          chassisCover: `
              <br /> 16 & 66 Function (No Indicator) 68-1015-FINISH 
              <br /> 28 & 63 Function (Pull Trim) = 68-1014-FINISH`,
        },
      },
    },
  },
  "8800-Right": {
    base: {
      chassis: `
        <br /> All functions (Except 16, 28, 63, 66) = 68-4261 
        <br /> 16 Function Only (No Indicator) = 68-2426 
        <br /> 28 Function Only (Pull Trim) = 68-2330
        <br /> 63 Function Only (Pull Trim) = 68-2327
        <br /> 66 Function Only (Pull Trim) = 68-2444
        `,
      chassisCover: `
        <br /> All Functions (Except 16 & 66) = 68-0406-FINISH
        <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-0409-FINISH
        `,
      prefixes: {
        53: {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-6075 
            <br /> 16 Function Only (No Indicator) = 68-3723
            <br /> 28 Function Only (Pull Trim) = 68-3836
            <br /> 63 Function Only (Pull Trim) = 68-3728
            <br /> 66 Function Only (Pull Trim) = 68-3733
            `,

          chassisCover: `
            <br /> All Functions (Except 16, 28, 63, 66) = 68-0406-FINISH 
            <br /> 16 & 66 Function (No Indicator) = 68-1016-FINISH 
            <br /> 28 & 63 Function (Pull Trim) = 68-1014-FINISH`,
        },
        59: {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
            <br /> 16 Function Only (No Indicator) = 68-3723 
            <br /> 28 Function Only (Pull Trim) = 68-3836
            <br /> 63 Function Only (Pull Trim) = 68-3728
            <br /> 66 Function Only (Pull Trim) = 68-3733
            `,
          chassisCover: `
            <br /> All Functions (Except 16, 28, 63, 66) = 68-0406-FINISH 
            <br /> 16 & 66 Function (No Indicator) = 68-1016-FINISH 
            <br /> 28 & 63 Function (Pull Trim) = 68-1014-FINISH`,
        },
        12: {
          chassis: `
        <br /> All functions (Except 16, 28, 63, 66) = 68-4263 
        <br /> 16 Function Only (No Indicator) = 68-2426 
        <br /> 28 Function Only (Pull Trim) = 68-2330
        <br /> 63 Function Only (Pull Trim) = 68-2327
        <br /> 66 Function Only (Pull Trim) = 68-2444
        `,
        },
        "12-53": {
          chassis: "68-6076",
        },
        GL: {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
            <br /> 16 Function Only (No Indicator) = 68-4078 
            <br /> 28 Function Only (Pull Trim) = 68-4083
            <br /> 63 Function Only (Pull Trim) = 68-4100
            <br /> 66 Function Only (Pull Trim) = 68-4105
            `,
          chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-1014-FINISH
            <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-1016-FINISH
            `,
        },
        AL: {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
            <br /> 16 Function Only (No Indicator) = 68-4078 
            <br /> 28 Function Only (Pull Trim) = 68-4083
            <br /> 63 Function Only (Pull Trim) = 68-4100
            <br /> 66 Function Only (Pull Trim) = 68-4105
            `,
          chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-1014-FINISH
            <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-1016-FINISH
            `,
        },
        49: {
          chassis: `
            <br /> 16 Function (Includes Indicator) = 68-6266
            <br /> 66 Function (Includes Indicator) = 68-6272
            `,
          chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-1782-FINISH
            <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-1783-FINISH
            `,
        },
                "12-49": {
          chassis: `
            <br /> 16 Function (Includes Indicator) = 68-6266
            <br /> 66 Function (Includes Indicator) = 68-6272
            `,
          chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-1782-FINISH
            <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-1783-FINISH
            `,
        },
                "12-49-AL": {
          chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6288
            <br /> 66 Function Only (Includes Indicator) = 68-6284
            `,
          chassisCover: `68-1785-FINISH`,
        },
        "49-AL": {
          chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6288
            <br /> 66 Function Only (Includes Indicator) = 68-6284
            `,
          chassisCover: `68-1785-FINISH`,
        },
                "12-49-GL": {
          chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6288
            <br /> 66 Function Only (Includes Indicator) = 68-6284
            `,
          chassisCover: `68-1785-FINISH`,
        },
        "49-GL": {
          chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6288
            <br /> 66 Function Only (Includes Indicator) = 68-6284
            `,
          chassisCover: `68-1785-FINISH`,
        },
        "49-59": {
          chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6287`,
          chassisCover: `68-1784-FINISH`,
        },
        "12-GL": {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4411 
            <br /> 16 Function Only (No Indicator) = 68-4077
            <br /> 28 Function Only (Pull Trim) = 68-4082`,
          chassisCover: `68-1014-FINISH`,
        },
        "12-AL": {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4411 
            <br /> 16 Function Only (No Indicator) = 68-4077
            <br /> 28 Function Only (Pull Trim) = 68-4082`,
          chassisCover: `68-1014-FINISH`,
        },
        "12-AL-GL": {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4411 
            <br /> 16 Function Only (No Indicator) = 68-4077
            <br /> 28 Function Only (Pull Trim) = 68-4082`,
          chassisCover: `68-1014-FINISH`,
        },
        "5CH": {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-7484
            <br /> 16 Function Only (No Indicator) = 68-7513 
            <br /> 28 Function Only (Pull Trim) = 68-7515
            <br /> 63 Function Only (Pull Trim) = 68-7517
            <br /> 63 Function Only (Pull Trim) = 68-7519
            `,
          chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-0406-FINISH
            <br /> 16 & 66 Function (No Indicator) = 68-0409-FINISH
            `,
        },
        "12-5CH": {
          chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-7485
            <br /> 16 Function Only (No Indicator) = 68-7513 
            <br /> 28 Function Only (Pull Trim) = 68-7515
            <br /> 63 Function Only (Pull Trim) = 68-7517
            <br /> 63 Function Only (Pull Trim) = 68-7519
            `,
          chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-0406-FINISH
            <br /> 16 & 66 Function (No Indicator) = 68-0409-FINISH
            `,
        },
        "53-5CH": {
          chassis: `
            <br /> 16 Function Only (No Indicator) = 68-7966 
            <br /> 28 Function Only (Pull Trim) = 68-7972
            <br /> 63 Function Only (Pull Trim) = 68-7968
            <br /> 66 Function Only (Pull Trim) = 68-7970
            `,
          chassisCover: `
              <br /> 16 & 66 Function (No Indicator) = 68-1016-FINISH 
              <br /> 28 & 63 Function (Pull Trim) = 68-1014-FINISH`,
        },
        "59-5CH": {
          chassis: `
            <br /> 16 Function Only (No Indicator) = 68-7966 
            <br /> 28 Function Only (Pull Trim) = 68-7972
            <br /> 63 Function Only (Pull Trim) = 68-7968
            <br /> 66 Function Only (Pull Trim) = 68-7970
            `,
          chassisCover: `
              <br /> 16 & 66 Function (No Indicator) = 68-1016-FINISH 
              <br /> 28 & 63 Function (Pull Trim) = 68-1014-FINISH`,
        },
      },
    },
  },
  "8900-Left": {
    base: {
      chassis: `
        <br /> All Functions (Except 16 & 66) = 68-2172
        <br /> 16 & 66 Functions = 68-2213
        `,
      chassisCover: `        
        <br /> All Functions (Except 16 & 66) = 68-0407-FINISH
        <br /> 16 & 66 Functions = 68-0410-FINISH
        `,
    },
  },
  "8900-Right": {
    base: {
      chassis: `
        <br /> All Functions (Except 16 & 66) = 68-2173
        <br /> 16 & 66 Functions = 68-2214
        `,
      chassisCover: `        
        <br /> All Functions (Except 16 & 66) = 68-0407-FINISH
        <br /> 16 & 66 Functions = 68-0411-FINISH
        `,
    },
  },

  // Narrow Stile
  "PE8300-Left": {
    base: {
      chassis: `
            <br /> 1-3/4" Door = 68-2481 
            <br /> 2" to 2-3/4" Door = 68-2483`,
      chassisCover: `PE-0140-FINISH`,
      prefixes: {
        59: {
          chassis: `
                <br /> 1-3/4" Door = 68-2346 
                <br /> 2" to 2-3/4" Door = 68-2348`,
        },
      },
    },
  },
  "PE8300-Right": {
    base: {
      chassis: `
            <br /> 1-3/4" Door = 68-2482 
            <br /> 2" to 2-3/4" Door = 68-2484`,
      chassisCover: `PE-0140-FINISH`,
      prefixes: {
        59: {
          chassis: `
                <br /> 1-3/4" Door = 68-2347 
                <br /> 2" to 2-3/4" Door = 68-2349`,
        },
      },
    },
  },
  "MD-PE8400-Left": {
    base: {
      chassis: `
            <br /> Standard Door = 68-5944 
            <br /> 1/4" Cladding = 68-6013 
            <br /> 1/2" Cladding = 68-5946`,
      innerChassis: `PE-2657`,
      chassisCover: `PE-0140-FINISH`,
      prefixes: {
        59: {
          chassis: `
          <br /> Standard Door = PE-2326 
          <br /> 1/4" Cladding = PE-2330
          <br /> 1/2" Cladding = PE-2328`,
        },
        12: {
          innerChassis: `PE-2659`,
        },
        "12-53": {
          innerChassis: `PE-2663`,
        },
        "12-5CH": {
          innerChassis: `PE-2660`,
        },
        "12-53-5CH": {
          innerChassis: `PE-2664`,
        },
        53: {
          innerChassis: `PE-2661`,
        },
        "5CH": {
          innerChassis: `PE-2658`,
        },
        "53-5CH": {
          innerChassis: `PE-2662`,
        },
      },
    },
  },
  "MD-PE8400-Right": {
    base: {
      chassis: `
            <br /> Standard Door = 68-5945 
            <br /> 1/4" Cladding = 68-6014 
            <br /> 1/2" Cladding = 68-5951`,
      innerChassis: `PE-2657`,
      chassisCover: `PE-0140-FINISH`,
      prefixes: {
        59: {
          chassis: `
          <br /> Standard Door = PE-2327 
          <br /> 1/4" Cladding = PE-2331
          <br /> 1/2" Cladding = PE-2329`,
        },
        12: {
          innerChassis: `PE-2659`,
        },
        "12-53": {
          innerChassis: `PE-2663`,
        },
        "12-5CH": {
          innerChassis: `PE-2660`,
        },
        "12-53-5CH": {
          innerChassis: `PE-2664`,
        },
        53: {
          innerChassis: `PE-2661`,
        },
        "5CH": {
          innerChassis: `PE-2658`,
        },
        "53-5CH": {
          innerChassis: `PE-2662`,
        },
      },
    },
  },
  "AD-PE8400-Left": {
    base: {
      chassis: `
            <br /> Standard Door = 68-5944 
            <br /> 1/4" Cladding = 68-6013 
            <br /> 1/2" Cladding = 68-5946`,
      innerChassis: `PE-2657`,
      chassisCover: `PE-0140-FINISH`,
      prefixes: {
        59: {
          chassis: `
          <br /> Standard Door = PE-2326 
          <br /> 1/4" Cladding = PE-2330
          <br /> 1/2" Cladding = PE-2328`,
        },
        12: {
          innerChassis: `PE-2659`,
        },
        "12-53": {
          innerChassis: `PE-2663`,
        },
        "12-5CH": {
          innerChassis: `PE-2660`,
        },
        "12-53-5CH": {
          innerChassis: `PE-2664`,
        },
        53: {
          innerChassis: `PE-2661`,
        },
        "5CH": {
          innerChassis: `PE-2658`,
        },
        "53-5CH": {
          innerChassis: `PE-2662`,
        },
      },
    },
  },
  "AD-PE8400-Right": {
    base: {
      chassis: `
            <br /> Standard Door = 68-5945 
            <br /> 1/4" Cladding = 68-6014 
            <br /> 1/2" Cladding = 68-5951`,
      innerChassis: `PE-2657`,
      chassisCover: `PE-0140-FINISH`,
      prefixes: {
        59: {
          chassis: `
          <br /> Standard Door = PE-2327 
          <br /> 1/4" Cladding = PE-2331
          <br /> 1/2" Cladding = PE-2329`,
        },
        12: {
          innerChassis: `PE-2659`,
        },
        "12-53": {
          innerChassis: `PE-2663`,
        },
        "12-5CH": {
          innerChassis: `PE-2660`,
        },
        "12-53-5CH": {
          innerChassis: `PE-2664`,
        },
        53: {
          innerChassis: `PE-2661`,
        },
        "5CH": {
          innerChassis: `PE-2658`,
        },
        "53-5CH": {
          innerChassis: `PE-2662`,
        },
      },
    },
  },
  "PE8500-Left": {
    base: {
      chassis: `68-5880`,
      chassisCover: `PE-0139-FINISH`,
      prefixes: {
        53: {
          chassis: `68-7411`,
        },
        "5CH": {
          chassis: `68-8009`,
        },
        "53-5CH": {
          chassis: `68-8010`,
        },
        GL: {
          chassis: `68-5881`,
        },
        59: {
          chassis: `PE-2325`,
        },
      },
    },
  },
  "PE8500-Right": {
    base: {
      chassis: `68-5880`,
      chassisCover: `PE-0139-FINISH`,
      prefixes: {
        53: {
          chassis: `68-7411`,
        },
        "5CH": {
          chassis: `68-8009`,
        },
        "53-5CH": {
          chassis: `68-8010`,
        },
        GL: {
          chassis: `68-5881`,
        },
        59: {
          chassis: `PE-2325`,
        },
      },
    },
  },
  // Wide Stile
  "MD-PE8600-Left": {
    base: {
      chassis: ` 68-5068`,
      innerChassis: `PE-2657`,
      chassisCover: `PE-0146-FINISH`,
      prefixes: {
        12: {
          innerChassis: `PE-2659`,
        },
        "12-53": {
          innerChassis: `PE-2663`,
        },
        "12-5CH": {
          innerChassis: `PE-2660`,
        },
        "12-53-5CH": {
          innerChassis: `PE-2664`,
        },
        53: {
          innerChassis: `PE-2661`,
        },
        "5CH": {
          innerChassis: `PE-2658`,
        },
        "53-5CH": {
          innerChassis: `PE-2662`,
        },
        59: {
          chassis: `PE-2332`,
        },
      },
    },
  },
  "MD-PE8600-Right": {
    base: {
      chassis: ` 68-5069`,
      innerChassis: `PE-2657`,
      chassisCover: `PE-0146-FINISH`,
      prefixes: {
        12: {
          innerChassis: `PE-2659`,
        },
        "12-53": {
          innerChassis: `PE-2663`,
        },
        "12-5CH": {
          innerChassis: `PE-2660`,
        },
        "12-53-5CH": {
          innerChassis: `PE-2664`,
        },
        53: {
          innerChassis: `PE-2661`,
        },
        "5CH": {
          innerChassis: `PE-2658`,
        },
        "53-5CH": {
          innerChassis: `PE-2662`,
        },
        59: {
          chassis: `PE-2333`,
        },
      },
    },
  },

  "AD-PE8600-Left": {
    base: {
      chassis: ` 68-5068`,
      innerChassis: `PE-2657`,
      chassisCover: `PE-0146-FINISH`,
      prefixes: {
        12: {
          innerChassis: `PE-2659`,
        },
        "12-53": {
          innerChassis: `PE-2663`,
        },
        "12-5CH": {
          innerChassis: `PE-2660`,
        },
        "12-53-5CH": {
          innerChassis: `PE-2664`,
        },
        53: {
          innerChassis: `PE-2661`,
        },
        "5CH": {
          innerChassis: `PE-2658`,
        },
        "53-5CH": {
          innerChassis: `PE-2662`,
        },
        59: {
          chassis: `PE-2332`,
        },
      },
    },
  },
  "AD-PE8600-Right": {
    base: {
      chassis: ` 68-5069`,
      innerChassis: `PE-2657`,
      chassisCover: `PE-0146-FINISH`,
      prefixes: {
        12: {
          innerChassis: `PE-2659`,
        },
        "12-53": {
          innerChassis: `PE-2663`,
        },
        "12-5CH": {
          innerChassis: `PE-2660`,
        },
        "12-53-5CH": {
          innerChassis: `PE-2664`,
        },
        53: {
          innerChassis: `PE-2661`,
        },
        "5CH": {
          innerChassis: `PE-2658`,
        },
        "53-5CH": {
          innerChassis: `PE-2662`,
        },
        59: {
          chassis: `PE-2333`,
        },
      },
    },
  },
  "WD-PE8600-Left": {
    base: {
      chassis: "68-5068",
      innerChassis: `68-3580`,
      chassisCover: `68-0407-FINISH`,
      prefixes: {
        12: {
          innerChassis: `68-3580`,
        },
        "12-53": {
          innerChassis: `68-3859`,
        },
        53: {
          innerChassis: `68-3859`,
        },
        "5CH": {
          innerChassis: `68-7785`,
        },
        "53-5CH": {
          innerChassis: `68-7786`,
        },
        59: {
          chassis: `68-5070`,
        },
      },
    },
  },
  "WD-PE8600-Right": {
    base: {
      chassis: ` 68-5069`,
      innerChassis: `PE-2028`,
      chassisCover: `PE-0146-FINISH`,
      prefixes: {
        12: {
          innerChassis: `PE-2028`,
        },
        "12-53": {
          innerChassis: `PE-2030`,
        },
        "12-5CH": {
          innerChassis: `PE-2029`,
        },
        "12-53-5CH": {
          innerChassis: `PE-2031`,
        },
        53: {
          innerChassis: `PE-2030`,
        },
        "5CH": {
          innerChassis: `PE-2029`,
        },
        "53-5CH": {
          innerChassis: `PE-2031`,
        },
        59: {
          chassis: `PE-2333`,
        },
      },
    },
  },
  "PE8700-Left": {
    base: {
      chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-2201 
            <br /> Functions 10 & 40 = 68-2163 
            <br /> Function 28 = 68-2210 
            <br /> Functions 62 & 63 = 68-2204`,
      chassisCover: `PE-0144-FINISH`,
      prefixes: {
        53: {
          chassis: `
                <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-3714 
                <br /> Functions 10 & 40 = 68-3823 
                <br /> Function 28 = 68-3829 
                <br /> Functions 62 & 63 = 68-3826`,
        },
        FM: {
          chassis: `
                <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-7306 
                <br /> Functions 10 & 40 = 68-7308/>`,
        },
        HC4: {
          chassis: `68-4112`,
        },
      },
    },
  },
  "PE8700-Right": {
    base: {
      chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-2202 
            <br /> Functions 10 & 40 = 68-2164 
            <br /> Function 28 = 68-2211 
            <br /> Functions 62 & 63 = 68-2205`,
      chassisCover: `PE-0144-FINISH`,
      prefixes: {
        53: {
          chassis: `
                <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-3715 
                <br /> Functions 10 & 40 = 68-3824 
                <br /> Function 28 = 68-3830 
                <br /> Functions 62 & 63 = 68-3827`,
        },
        FM: {
          chassis: `
                <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-7307 
                <br /> Functions 10 & 40 = 68-7309`,
        },
        HC4: {
          chassis: `68-4113`,
        },
      },
    },
  },
  "PE-NB8700-Left": {
    base: {
      chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-2201 
            <br /> Functions 10 & 40 = 68-2163 
            <br /> Function 28 = 68-2210 
            <br /> Functions 62 & 63 = 68-2204`,
      chassisCover: `PE-0144-FINISH`,
      prefixes: {
        53: {
          chassis: `
                <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-3714 
                <br /> Functions 10 & 40 = 68-3823 
                <br /> Function 28 = 68-3829 
                <br /> Functions 62 & 63 = 68-3826`,
        },
        59: {
          chassis: `
                <br /> All Functions (Except 10, 28, 40, 62, 63) = PE-2334 
                <br /> Functions 10 & 40 = PE-2338 
                <br /> Function 28 = PE-2342 
                <br /> Functions 62 & 63 = PE-2340`,
        },
        FM: {
          chassis: `
                <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-7306 
                <br /> Functions 10 & 40 = 68-7308/>`,
        },
        HC4: {
          chassis: `68-4112`,
        },
      },
    },
  },
  "PE-NB8700-Right": {
    base: {
      chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-2202 
            <br /> Functions 10 & 40 = 68-2164 
            <br /> Function 28 = 68-2211 
            <br /> Functions 62 & 63 = 68-2205`,
      chassisCover: `PE-0144-FINISH`,
      prefixes: {
        53: {
          chassis: `
                <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-3715 
                <br /> Functions 10 & 40 = 68-3824 
                <br /> Function 28 = 68-3830 
                <br /> Functions 62 & 63 = 68-3827`,
        },
        59: {
          chassis: `
                <br /> All Functions (Except 10, 28, 40, 62, 63) = PE-2335 
                <br /> Functions 10 & 40 = PE-2339 
                <br /> Function 28 = PE-2343 
                <br /> Functions 62 & 63 = PE-2341`,
        },
        FM: {
          chassis: `
                <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-7307 
                <br /> Functions 10 & 40 = 68-7309`,
        },
        HC4: {
          chassis: `68-4113`,
        },
      },
    },
  },
  "PE8800-Left": {
    base: {
      chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4261 
            <br /> 16 Function Only (No Indicator) = 68-2425 
            <br /> 28 Function Only (Pull Trim) = 68-2329
            <br /> 63 Function Only (Pull Trim) = 68-2326
            <br /> 66 Function Only (Pull Trim) = 68-2443
            `,
      chassisCover: `
            <br /> All Functions (Except 16 & 66) = PE-0145-FINISH
            <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0147-FINISH
            `,
      prefixes: {
        53: {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-6075 
                <br /> 16 Function Only (No Indicator) = 68-3722,
                <br /> 28 Function Only (Pull Trim) = 68-3835
                <br /> 63 Function Only (Pull Trim) = 68-3727
                <br /> 66 Function Only (Pull Trim) = 68-3732
                `,

          chassisCover: `
                <br /> All Functions (Except 16, 28, 63, 66) = PE-0145-FINISH 
                <br /> 16 & 66 Function (No Indicator) = PE-0410-FINISH 
                <br /> 28 & 63 Function (Pull Trim) = PE-0409-FINISH`,
        },
        59: {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = PE-2321 
                <br /> 16 Function Only (No Indicator) = 68-3722 
                <br /> 28 Function Only (Pull Trim) = PE-2313
                <br /> 63 Function Only (Pull Trim) = 68-3727
                <br /> 66 Function Only (Pull Trim) = 68-3732
                `,
          chassisCover: `
                <br /> All Functions (Except 16 & 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (No Indicator) = PE-0410-FINISH `,
        },
        "12-59": {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = PE-2322 
                <br /> 16 Function Only (No Indicator) = 68-3722 
                <br /> 28 Function Only (Pull Trim) = PE-2313
                <br /> 63 Function Only (Pull Trim) = 68-3727
                <br /> 66 Function Only (Pull Trim) = 68-3732
                `,
          chassisCover: `
                <br /> All Functions (Except 16, 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (No Indicator) = PE-0410-FINISH 
                `,
        },
        12: {
          chassis: `
          <br /> All functions (Except 16, 28, 63, 66) = 68-4261 
          <br /> 16 Function Only (No Indicator) = 68-2425 
          <br /> 28 Function Only (Pull Trim) = 68-2329
          <br /> 63 Function Only (Pull Trim) = 68-2326
          <br /> 66 Function Only (Pull Trim) = 68-2443
          `,
        },
        GL: {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
                <br /> 16 Function Only (No Indicator) = 68-4077 
                <br /> 28 Function Only (Pull Trim) = 68-4082
                <br /> 63 Function Only (Pull Trim) = 68-4099
                <br /> 66 Function Only (Pull Trim) = 68-4104
                `,
          chassisCover: `
                <br /> All Functions (Except 16 & 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0410-FINISH
                `,
        },
        AL: {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
                <br /> 16 Function Only (No Indicator) = 68-4077 
                <br /> 28 Function Only (Pull Trim) = 68-4082
                <br /> 63 Function Only (Pull Trim) = 68-4099
                <br /> 66 Function Only (Pull Trim) = 68-4104
                `,
          chassisCover: `
                <br /> All Functions (Except 16, 28, 63, 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0410-FINISH
                `,
        },
        49: {
          chassis: `
                <br /> 16 Function (Includes Indicator) = PE-2353
                <br /> 66 Function (Includes Indicator) = PE-2613
                `,
          chassisCover: `
                <br /> 16 Function (Includes Indicator) = PE-0412
                <br /> 66 Function (Includes Indicator) = PE-0151
                `,
        },
        "49-AL": {
          chassis: `
                <br /> 16 Function (Includes Indicator) = PE-2353
                <br /> 66 Function Only (Includes Indicator) = PE-2611
                `,
          chassisCover: `PE-0412-FINISH`,
        },
        "49-GL": {
          chassis: `
                <br /> 16 Function (Includes Indicator) = PE-2353
                <br /> 66 Function Only (Includes Indicator) = PE-2611
                `,
          chassisCover: `PE-0412-FINISH`,
        },
        "12-GL": {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
                <br /> 16 Function Only (No Indicator) = 68-4077 
                <br /> 28 Function Only (Pull Trim) = 68-4082
                <br /> 63 Function Only (Pull Trim) = 68-4099
                <br /> 66 Function Only (Pull Trim) = 68-4104
                `,
          chassisCover: `
                <br /> All Functions (Except 16, 28, 63, 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0410-FINISH
                `,
        },
        "12-AL": {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
                <br /> 16 Function Only (No Indicator) = 68-4077 
                <br /> 28 Function Only (Pull Trim) = 68-4082
                <br /> 63 Function Only (Pull Trim) = 68-4099
                <br /> 66 Function Only (Pull Trim) = 68-4104
                `,
          chassisCover: `
                <br /> All Functions (Except 16, 28, 63, 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0410-FINISH
                `,
        },
        "12-AL-GL": {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
                <br /> 16 Function Only (No Indicator) = 68-4077 
                <br /> 28 Function Only (Pull Trim) = 68-4082
                <br /> 63 Function Only (Pull Trim) = 68-4099
                <br /> 66 Function Only (Pull Trim) = 68-4104
                `,
          chassisCover: `
                <br /> All Functions (Except 16, 28, 63, 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0410-FINISH
                `,
        },
        "5CH": {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-7484
                <br /> 16 Function Only (No Indicator) = 68-7512  
                <br /> 28 Function Only (Pull Trim) = 68-7514
                <br /> 63 Function Only (Pull Trim) = 68-7516
                <br /> 63 Function Only (Pull Trim) = 68-7518
                `,
          chassisCover: `
                <br /> All Functions (Except 16 & 66) = PE-0145-FINISH
                <br /> 16 & 66 Function (No Indicator) = PE-0147-FINISH
                `,
        },
        "53-5CH": {
          chassis: `
                <br /> 16 Function Only (No Indicator) = 68-7965 
                <br /> 28 Function Only (Pull Trim) = 68-7971
                <br /> 63 Function Only (Pull Trim) = 68-7967
                <br /> 66 Function Only (Pull Trim) = 68-7969
                `,
          chassisCover: `
                  <br /> 16 & 66 Function (No Indicator) = PE-0410-FINISH 
                  <br /> 28 & 63 Function (Pull Trim) = PE-0409-FINISH
                  <br /> 16 Function Only (No Indicator) = PE-0147-FINISH 
                  `,
        },
        "59-5CH": {
          chassis: `
                <br /> 16 Function Only (No Indicator) = 68-7965 
                <br /> 28 Function Only (Pull Trim) = 68-7971
                <br /> 63 Function Only (Pull Trim) = 68-7967
                <br /> 66 Function Only (Pull Trim) = 68-7969
                `,
          chassisCover: `
                <br /> 16 & 66 Function (No Indicator) = PE-0410-FINISH 
                <br /> 28 & 63 Function (Pull Trim) = PE-0409-FINISH`,
        },
      },
    },
  },
  "PE8800-Right": {
    base: {
      chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4261 
            <br /> 16 Function Only (No Indicator) = 68-2426 
            <br /> 28 Function Only (Pull Trim) = 68-2330
            <br /> 63 Function Only (Pull Trim) = 68-2327
            <br /> 66 Function Only (Pull Trim) = 68-2444
            `,
      chassisCover: `
            <br /> All Functions (Except 16 & 66) = PE-0145-FINISH
            <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0147-FINISH
            `,
      prefixes: {
        53: {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-6075 
                <br /> 16 Function Only (No Indicator) = 68-3723,
                <br /> 28 Function Only (Pull Trim) = 68-3836
                <br /> 63 Function Only (Pull Trim) = 68-3728
                <br /> 66 Function Only (Pull Trim) = 68-3733
                `,

          chassisCover: `
                <br /> All Functions (Except 16, 28, 63, 66) = PE-0145-FINISH 
                <br /> 16 & 66 Function (No Indicator) = PE-0411-FINISH 
                <br /> 28 & 63 Function (Pull Trim) = PE-0409-FINISH`,
        },
        59: {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = PE-2321 
                <br /> 16 Function Only (No Indicator) = PE-2320 
                <br /> 28 Function Only (Pull Trim) = PE-2314
                <br /> 63 Function Only (Pull Trim) = PE-2318
                <br /> 66 Function Only (Pull Trim) = PE-2316
                `,
          chassisCover: `
                <br /> All Functions (Except 16 & 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (No Indicator) = PE-0411-FINISH `,
        },
        "12-59": {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = PE-2322 
                <br /> 16 Function Only (No Indicator) = 68-3722 
                <br /> 28 Function Only (Pull Trim) = PE-2313
                <br /> 63 Function Only (Pull Trim) = 68-3727
                <br /> 66 Function Only (Pull Trim) = 68-3732
                `,
          chassisCover: `
                <br /> All Functions (Except 16, 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (No Indicator) = PE-0411-FINISH 
                `,
        },
        12: {
          chassis: `
          <br /> All functions (Except 16, 28, 63, 66) = 68-4261 
          <br /> 16 Function Only (No Indicator) = 68-2425 
          <br /> 28 Function Only (Pull Trim) = 68-2329
          <br /> 63 Function Only (Pull Trim) = 68-2326
          <br /> 66 Function Only (Pull Trim) = 68-2443
          `,
        },
        GL: {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
                <br /> 16 Function Only (No Indicator) = 68-4077 
                <br /> 28 Function Only (Pull Trim) = 68-4083
                <br /> 63 Function Only (Pull Trim) = 68-4100
                <br /> 66 Function Only (Pull Trim) = 68-4105
                `,
          chassisCover: `
                <br /> All Functions (Except 16 & 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0411-FINISH
                `,
        },
        AL: {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
                <br /> 16 Function Only (No Indicator) = 68-4077 
                <br /> 28 Function Only (Pull Trim) = 68-4082
                <br /> 63 Function Only (Pull Trim) = 68-4099
                <br /> 66 Function Only (Pull Trim) = 68-4105
                `,
          chassisCover: `
                <br /> All Functions (Except 16, 28, 63, 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0411-FINISH
                `,
        },
        49: {
          chassis: `
                <br /> 16 Function (Includes Indicator) = PE-2353
                <br /> 66 Function (Includes Indicator) = PE-2614
                `,
          chassisCover: `
                <br /> 16 Function (Includes Indicator) = PE-0412
                <br /> 66 Function (Includes Indicator) = PE-0152
                `,
        },
        "49-AL": {
          chassis: `
                <br /> 16 Function (Includes Indicator) = PE-2353
                <br /> 66 Function Only (Includes Indicator) = PE-2612
                `,
          chassisCover: `PE-0412-FINISH`,
        },
        "49-GL": {
          chassis: `
                <br /> 16 Function (Includes Indicator) = PE-2353
                <br /> 66 Function Only (Includes Indicator) = PE-2612
                `,
          chassisCover: `PE-0412-FINISH`,
        },
        "12-GL": {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
                <br /> 16 Function Only (No Indicator) = 68-4077 
                <br /> 28 Function Only (Pull Trim) = 68-4082
                <br /> 63 Function Only (Pull Trim) = 68-4099
                <br /> 66 Function Only (Pull Trim) = 68-4104
                `,
          chassisCover: `
                <br /> All Functions (Except 16, 28, 63, 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0410-FINISH
                `,
        },
        "12-AL": {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
                <br /> 16 Function Only (No Indicator) = 68-4077 
                <br /> 28 Function Only (Pull Trim) = 68-4082
                <br /> 63 Function Only (Pull Trim) = 68-4099
                <br /> 66 Function Only (Pull Trim) = 68-4104
                `,
          chassisCover: `
                <br /> All Functions (Except 16, 28, 63, 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0410-FINISH
                `,
        },
        "12-AL-GL": {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
                <br /> 16 Function Only (No Indicator) = 68-4077 
                <br /> 28 Function Only (Pull Trim) = 68-4082
                <br /> 63 Function Only (Pull Trim) = 68-4099
                <br /> 66 Function Only (Pull Trim) = 68-4104
                `,
          chassisCover: `
                <br /> All Functions (Except 16, 28, 63, 66) = PE-0409-FINISH 
                <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = PE-0410-FINISH
                `,
        },
        "5CH": {
          chassis: `
                <br /> All functions (Except 16, 28, 63, 66) = 68-7484
                <br /> 16 Function Only (No Indicator) = 68-7512  
                <br /> 28 Function Only (Pull Trim) = 68-7514
                <br /> 63 Function Only (Pull Trim) = 68-7516
                <br /> 63 Function Only (Pull Trim) = 68-7519
                `,
          chassisCover: `
                <br /> All Functions (Except 16 & 66) = PE-0145-FINISH
                <br /> 16 & 66 Function (No Indicator) = PE-0148-FINISH
                `,
        },
        "53-5CH": {
          chassis: `
                <br /> 16 Function Only (No Indicator) = 68-7965 
                <br /> 28 Function Only (Pull Trim) = 68-7971
                <br /> 63 Function Only (Pull Trim) = 68-7967
                <br /> 66 Function Only (Pull Trim) = 68-7970
                `,
          chassisCover: `
                  <br /> 16 Function Only (No Indicator) = PE-0410-FINISH 
                  <br /> 28 & 63 Function (Pull Trim) = PE-0409-FINISH
                  <br /> 66 Function Only (No Indicator) = PE-0148-FINISH 
                  `,
        },
        "59-5CH": {
          chassis: `
                <br /> 16 Function Only (No Indicator) = 68-7965 
                <br /> 28 Function Only (Pull Trim) = 68-7971
                <br /> 63 Function Only (Pull Trim) = 68-7967
                <br /> 66 Function Only (Pull Trim) = 68-7969
                `,
          chassisCover: `
                <br /> 16 & 66 Function (No Indicator) = PE-0410-FINISH 
                <br /> 28 & 63 Function (Pull Trim) = PE-0409-FINISH`,
        },
      },
    },
  },
  "PE8900-Left": {
    base: {
      chassis: `
            <br /> All Functions (Except 16 & 66) = 68-2172
            <br /> 16 & 66 Functions = 68-2213
            `,
      chassisCover: `        
            <br /> All Functions (Except 16 & 66) = PE-0146-FINISH
            <br /> 16 & 66 Functions = PE-0149-FINISH
            `,
      prefixes: {
        59: {
          chassis: `        
            <br /> All Functions (Except 16 & 66) = PE-2344
            <br /> 16 & 66 Functions = PE-2336
            `,
        },
      },
    },
  },
  "PE8900-Right": {
    base: {
      chassis: `
            <br /> All Functions (Except 16 & 66) = 68-2173
            <br /> 16 & 66 Functions = 68-2214
            `,
      chassisCover: `        
            <br /> All Functions (Except 16 & 66) = PE-0146-FINISH
            <br /> 16 & 66 Functions = PE-0150-FINISH
            `,
      prefixes: {
        59: {
          chassis: `        
            <br /> All Functions (Except 16 & 66) = PE-2345
            <br /> 16 & 66 Functions = PE-2337
            `,
        },
      },
    },
  },
};

export default partCombinations;
