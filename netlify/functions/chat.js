// netlify/functions/chat.js
const { VertexAI } = require("@google-cloud/vertexai");
const path = require("path");

/* VIDEO LIBRARY CONFIGURATION 
  Map specific topics to YouTube Video IDs here.
  The AI will check this list and recommend videos if the topic matches.
*/
const VIDEO_LIBRARY = {
  "Mortise Locks Rehanding": {
    id: "3alaDlEST1k", 
    title: "How to Change the Handing of a SARGENT Mortise Lock",
  },
  "Ordering Sargent Exit Devices, Order String, Prefixes": {
    id: "qr2lvvIOfXs", 
    title: "How to Order SARGENT Exit Devices",
  },
  "Ordering Sargent Bored Locks, Order String, Prefixes": {
    id: "VJYuw2poXJ4", 
    title: "How to Order SARGENT Bored Locks",
  },
    "Ordering Sargent Mortise Locks, Order String, Prefixes": {
    id: "90c06zoJt_E", 
    title: "How to Order SARGENT Mortise Locks",
  },
  "56-8200, Sargent 8200 mortise lock with MELR, Electric latch retraction": {
    id: "HTRW27b37TU", 
    title:
      "SARGENT 8200 Series Mortise Lock with Motorized Electric Latch Retraction 56",
  },
  "Changing functions on Exit Device ET trim from classroom to storeroom or vice versa, Locking slide specific":
    {
      id: "YriRFZK7loU", 
      title: "How to Change the Locking Slide on a SARGENT ET Lever Control",
    },

  "Rehanding Sargent Exit Device 700 series ET trim, RHR, LHR": {
    id: "x8Eq1moV97Y",
    title: "How to Rehand a 700 Series Lever Trim in an 80 Series Exit Device",
  },
  "Rehanding Sargent Exit Device P700 series NE or WE trim, RHR, LHR": {
    id: "Mm9RR3Q3SCI", 
    title: "How to Rehand a P700 Series Lever Trim in an PE80 Series Exit Device",
  },
    "80 Series Keyed Cylinder Dogging (816 kit)": {
    id: "tKgbjR2U8Gw", 
    title:
      "How to Retrofit an 816 Cylinder Dogging Kit into a SARGENT 80 Series Exit Device",
  },
  "PE80 Series Keyed Cylinder Dogging": {
    id: "XwrEIV0mEeo", 
    title:
      "How to Retrofit a Keyed Cylinder Dogging Kit into a PE80 Series Exit Device",
  },
    "21- Lost Ball Construction option": {
    id: "KfJLfwyZoWQ", 
    title:
      "Information on 21- Option Lost Ball for SARGENT Cylinders - Technical Product Support",
  },
    "Installing VN1 Escutcheon Indicator": {
    id: "7TjVrhmkh0k", 
    title:
      "SARGENT Escutcheon Indicator Installation",
  },
      "Installing V Series Sectional Indicator (SA190's kits)": {
    id: "lyODTUue6mU", 
    title:
      "SARGENT Sectional Indicator Installation",
  },
      "Installing 7300 series multipoint lock": {
    id: "Pf8kJ4doXM4", 
    title:
      "SARGENT FM7300 Series Multi-Point Lock Factory Installation Procedure",
  },
        "Installing the 80 serries 8700 series SVR Exit Device": {
    id: "RO7eNs3p9IQ", 
    title:
      "How to Install the SARGENT 8700 Series Surface Vertical Rod Exit Device",
  },
    "PE80 Series General product Info": {
    id: "fF2tbpJxAI8", 
    title:
      "The SARGENT PE80 Series: A New Standard for Design and Performance in Exit Devices",
  },
      "PE80 Series Rod Adjustment (Concealed Rods)": {
    id: "iC_4u2jrn6s", 
    title:
      "How to Easily Adjust the Center Case on SARGENT PE80 Series Exit Devices",
  },
"10X Bored Lock Status Indicators": {
    id: "5Tj1SJcT824", 
    title: "SARGENT 10X Line Bored Lock Now Available With Status Indicators",
},
"8200 Mortise Lock Status Indicators": {
    id: "7bSGmF-z9eE", 
    title: "Enhancing Privacy and Security in Commercial Spaces with 8200 Series Mortise Lock Status Indicators",
},
"49- Pe80 series trim Status Indicators for PE8816 or PE8866": {
    id: "ZDSJ3hollSA", 
    title: "Chassis Indicator for PE80 Series Exit Device",
},
    "PE80 Series Hex Dogging": {
    id: "9NBHGMUkx_U",  
    title:
      "How to Retrofit Hex Dogging Kit (No Keys Involved) into a PE80 Series Exit Device Rail",
  },
      "80 Series Hex Dogging": {
    id: "G6hFZg9QsYI",  
    title:
      "Installing Hex Key Dogging Kits on an 80 Series Exit Device –Technical Product Support",
  },
      "809 Black Lexan Touchpad kit for the 80 series": {
    id: "T32cOWrcOO8",  
    title:
      "How to Install the Black Lexan Touchpad Kits on an 80 Series Exit Device - Technical Product Support",
  },
  "Changin spindles on 700 series ET Trim for 80 and 90 series": {
    id: "sB8LWq5EKx4", 
    title:
      "Changing Spindles on Our ET Lever Trims - Technical Product Support",
  },
  "Changing mortise lock functions (8200) Going from one function to the other":
    {
      id: "M_B9fDqIvQY", 
      title: "How to Change Functions on a SARGENT Mortise Lock",
    },
};

/* AUTHENTICATION LOGIC */
const getAuthOptions = () => {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      return {
        credentials: {
          client_email: credentials.client_email,
          private_key: credentials.private_key,
        },
      };
    } catch (error) {
      console.error("Auth Error:", error);
    }
  }
  return {
    keyFilename: path.join(process.cwd(), "sargent-key.json"),
  };
};

// Initialize Vertex AI
const vertex_ai = new VertexAI({
  project: "310182215564",
  location: "us-central1",
  googleAuthOptions: getAuthOptions(),
});

// Define your Sargent Data Store
const sargentDataStore = {
  retrieval: {
    vertexAiSearch: {
      datastore:
        "projects/310182215564/locations/global/collections/default_collection/dataStores/sargent-docs_1766204355624",
    },
  },
};

const model = vertex_ai.getGenerativeModel({
  model: "gemini-2.5-flash",
  tools: [sargentDataStore],
  generationConfig: {
    temperature: 0.1,
    maxOutputTokens: 2048,
    topP: 0.8,
    topK: 40,
  },
  systemInstruction: {
    parts: [
      {
        text: `Public Expert Preamble (Optimized for Accuracy & Brevity)
CORE IDENTITY: You are the Sargent Hardware Expert AI. You provide immediate, accurate technical data for Sargent Manufacturing products.

TECHNICAL LOOKUP PROTOCOL (MANDATORY):
Source of Truth: Before answering, you MUST scan local data files: ExitDeviceData.js, MortiseLocksData.js, BoredLocksData.js, and CylindersData.js.

Visual Identification Rules:
Narrow Stile: Identify as 8300, 8400, 8500, or PE8500 series.
Wide Stile: Identify as 8600, 8700, or 8800 series.
Rod Types: Differentiate SVR (Surface), CVR (Concealed), and NB (No Bottom Rod).

VIDEO RECOMMENDATION PROTOCOL:
You have access to a video library for the following specific topics:
${Object.keys(VIDEO_LIBRARY)
  .map((topic) => `- ${topic}`)
  .join("\n")}

Rule: If the user's query specifically asks about "how to install", "how to rehand", "dogging kits", or "pinning cylinders" related to the topics above, you MUST append a hidden tag at the very end of your response in this format: 
||VIDEO: [Topic Name]||
Example: ||VIDEO: 80 Series Installation||

RESPONSE PROTOCOL:
Brevity First: Provide direct technical answers. Use bullet points for specifications.
No Personal Mention: Do not mention Yan Gonzalez.
Mandatory Citations: Always cite the Doc# (e.g., Doc# 4310-E).
`,
      },
    ],
  },
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST")
    return { statusCode: 405, body: "Method Not Allowed" };
  try {
    const { query, history } = JSON.parse(event.body);
    const userContentParts = [];
    if (query.text) userContentParts.push({ text: query.text });
    if (query.image?.data) {
      userContentParts.push({
        inlineData: { mimeType: query.image.mimeType, data: query.image.data },
      });
    }

    const recentHistory = (history || []).slice(-8).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({ history: recentHistory });
    const result = await chat.sendMessage(userContentParts);
    const response = await result.response;
    const candidate = response.candidates[0];

    // --- VIDEO DETECTION LOGIC ---
    let finalAnswer = candidate.content.parts[0].text;
    let videoData = null;

    // Check for the hidden video tag using Regex
    const videoTagRegex = /\|\|VIDEO: (.*?)\|\|/;
    const match = finalAnswer.match(videoTagRegex);

    if (match) {
      const videoKey = match[1].trim();
      // Look up the video in our library
      if (VIDEO_LIBRARY[videoKey]) {
        videoData = VIDEO_LIBRARY[videoKey];
      }
      // Remove the tag from the user-facing text
      finalAnswer = finalAnswer.replace(match[0], "").trim();
    }
    // -----------------------------

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: {
          answerText: finalAnswer,
          citations: candidate.citationMetadata?.citations || [],
          video: videoData, // Send video data to frontend
        },
      }),
    };
  } catch (error) {
    console.error("Vertex AI Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Service Error: " + error.message }),
    };
  }
};
