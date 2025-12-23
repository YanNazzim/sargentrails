// src/components/ChatWidget.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import "../components/style/ChatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  // NEW: State for handling images
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am your AI Tech Support and Sargent Specialist. I can help with Part ID, Templates, and technical questions. Upload a photo or ask a question!",
      sources: [],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(
    "projects/310182215564/locations/global/collections/default_collection/engines/sargent-tech-support_1766204715994/sessions/-"
  );

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null); // NEW: Reference for the hidden file input

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // NEW: Handle File Selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 1. Create a preview URL for the UI
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // 2. Convert to Base64 for the API
      const reader = new FileReader();
      reader.onloadend = () => {
        // We strip the "data:image/xyz;base64," prefix here to send raw data
        const base64String = reader.result.split(",")[1];
        setSelectedImage({
          mimeType: file.type,
          data: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // NEW: Clear selected image
  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const parseSources = (citations) => {
    if (!citations || citations.length === 0) return [];
    const uniqueMap = new Map();
    citations.forEach((cit) => {
      cit.sources?.forEach((src) => {
        if (src.uri && !uniqueMap.has(src.uri)) {
          let cleanTitle = src.title || "Sargent Documentation";
          if (cleanTitle.length > 50)
            cleanTitle = cleanTitle.substring(0, 47) + "Thinking...";
          uniqueMap.set(src.uri, {
            title: cleanTitle,
            uri: src.uri,
            type: src.uri.endsWith(".pdf") ? "PDF Document" : "Web Page",
          });
        }
      });
    });
    return Array.from(uniqueMap.values()).slice(0, 3);
  };

  const formatMessageText = (text) => {
    // --- CRASH FIX: SAFETY CHECK ---
    // If text is null, undefined, or NOT a string, return null to avoid crash
    if (!text || typeof text !== "string") return null;

    const lines = text.split("\n");
    const formattedContent = [];
    let listBuffer = [];

    const parseBold = (str) => {
      const parts = str.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={i} className="highlight-yellow">
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) return;

      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        listBuffer.push(<li key={index}>{parseBold(trimmed.substring(2))}</li>);
      } else {
        if (listBuffer.length > 0) {
          formattedContent.push(
            <ul
              key={`ul-${index}`}
              style={{ paddingLeft: "20px", margin: "5px 0" }}
            >
              {listBuffer}
            </ul>
          );
          listBuffer = [];
        }
        if (trimmed)
          formattedContent.push(
            <div key={index} style={{ marginBottom: "8px" }}>
              {parseBold(trimmed)}
            </div>
          );
      }
    });

    if (listBuffer.length > 0)
      formattedContent.push(
        <ul key="ul-last" style={{ paddingLeft: "20px" }}>
          {listBuffer}
        </ul>
      );
    return formattedContent;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // Allow sending if there is text OR an image
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim();
    const currentImage = selectedImage; // Capture reference
    const currentPreview = imagePreview; // Capture reference

    // Optimistically update UI
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
        image: currentPreview, // Pass preview to render in chat
      },
    ]);

    setInput("");
    clearImage(); // Reset input immediately
    setIsLoading(true);

    const FUNCTION_URL = "/.netlify/functions/chat";
    const safeSessionId =
      typeof sessionId === "string" ? sessionId : sessionId.name;
    const answerGenerationSpec = {
      ignoreAdversarialQuery: true,
      ignoreNonAnswerSeekingQuery: true,
      ignoreLowRelevantContent: true,
      includeCitations: false,
      modelSpec: { modelVersion: "gemini-2.5-flash/answer_gen/v1" },
      promptSpec: {
        preamble: `AI Tech Support and Sargent Specialist
Role: You are the AI Tech Support and Sargent Specialist. Provide fast, accurate, technical support and part identification.

VISUAL ANALYSIS: If an image is provided, analyze the hardware. Look for:
- Rail shape (Teardrop vs Crossbar vs Rectangular)
- Chassis Width (Wide vs narrow) This chassis is at the end of the rail. thin is narrow wide is wide
- End cap style (Flush 43- vs Standard)
- Lock chassis (Mortise box vs Cylindrical latch)
- Finish (US3, US32D, US10B)

## Prefix & Compatibility Rules for exit devices
12-: UL Fire Rated. All devices. Conflict: 16- (Cylinder Dogging) or HK- (Hex Key Dogging).
14-: Sliding bolt bottom case for 8700 Series.
16-: Cylinder lockdown (Dogging). Panic only; uses #41 cylinder and #97 ring. Conflict: 12-, 59-, or AL-.
LD-: Less Dogging. Used for non-fire-rated devices.
19-: Pushbar without the Lexan touchpad.
23-: 4-7/8" (124mm) ANSI flat lip strike (8900/8300 mortise only).
31-: Thick Doors. Specify door/panel thickness. Not for HC8700/FM8700.
36-: Six lobe security head screws.
37-: Spanner head screws.
43-: Flush End Cap. Not for LP, LR, or LS devices.
49-: Indicator (8816/8866 only).
53-: Latchbolt monitoring. Conflict: 49, 59, GL, HC, WS, FM8700, 8600 series.
54-: Monitors ET Lever movement.
55-: RX signal switch. Conflict: 59- or FM8700.
56-: Remote Latch Retraction (ELR). Conflict: 58-, 59-, AL-, BT-, or FM8700.
56-HK-: ELR with Hex Key dogging. Conflict: 12-, 58-, 59-, AL-, or BT-.
58-: Electric Rail Dogging. Conflict: 56- or 59-.
59-: Electroguard Delayed Egress. Conflict: 16, 53, 55, 56, 58, AL, BT, GL, HC, or WS.
AL-: Alarmed Exit (Min 36" door). Conflict: 16, 56, 59, BT, GL, HC, HC4, or WS.
NB-: Less Bottom Rod & Bolt. ONLY for 84/86/87 series.

Sargent Exit Device function # 04 = Night Latch - Key Retracts Latch
Sargent Exit Device function # 06 = Store Room - Key Unlocks Lever, Lever retracts latch, ALWAYS LOCKED
Sargent Exit Device function # 10 = Exit Only - Can be blank or have a Dummy Pull/Escutcheon Trim
Sargent Exit Device function # 13 = Class Room - Key Unlocks Lever, Lever retracts latch, CAN BE LEFT UNLOCKED
Sargent Exit Device function # 15 = Passage - Lever always retracts latch. (Free Entry)
Sargent Exit Device function # 16 = Classroom Security (Intruder) - Inside Key Locks/Unlocks outside trim, Outside key retracts latch
Sargent Exit Device function # 40 = Exit Only (Freewheeling Lever) - Escutcheon Trim that Spins freely 
Sargent Exit Device function # 43 = Class Room (Freewheeling Lever) - Key Unlocks Lever, Lever retracts latch, CAN BE LEFT UNLOCKED
Sargent Exit Device function # 46 = Store Room (Freewheeling Lever) - Key Unlocks Lever, Lever retracts latch, ALWAYS LOCKED
Sargent Exit Device function # 73 = Electrified Trim (Fail Safe - NO KEY) - Power on = Locked | Power off = Unlocked
Sargent Exit Device function # 74 = Electrified Trim (Fail Secure - NO KEY) - Power on = Unlocked | Power off = Locked
Sargent Exit Device function # 75 = Electrified Trim (Fail Safe - HAS KEY OVERRIDE) - Power on = Locked | Power off = Unlocked
Sargent Exit Device function # 76 = Electrified Trim (Fail Secure - HAS KEY OVERRIDE) - Power on = Unlocked | Power off = Locked

8816 cannot have dogging at all
A cylinder on the panic bar's chassis usually indicates a 16 function

## Response Style: "Technical Brevity"
- SINGLE PART NUMBER: Always provide the most accurate part number.
- FORMATTING: Use **bold** for part numbers and templates.

## 20 & 30 Series Specialization
- CYLINDER TYPE: Uses **C10-1** for keyed trims.
- 04 FUNCTION: Rim 2828/3828 uses **#34 Rim Cylinder** without trim.
- 30 SERIES EXCLUSIVE: **16- Cylinder Dogging** is available (Panic only).

## Cylinder Rules
- RIM EXITS: Uses **#34 Rim Cylinder**.
- 8816: Inside 44 Mortise | Outside 34 Rim.
- 8916: Inside 34 Mortise | Outside 46 Rim.
- MORTISE EXITS: Uses **#46 Mortise Cylinder** (standard ET trim).
- MORTISE PULLS (8904 MSL / 8904 FLL): Uses **#43 Mortise Cylinder**.


## Lockbodies
- RIM DEVICES (8800, PE8800, 20, 30): DO NOT use lockbodies.
- MORTISE EXITS: 9904 uses **904** lockbody. 89xx uses **915** lockbody.

### SARGENT MORTISE TRIM & PART NUMBER RULES (DUAL PATH STRATEGY)

1. **Step 1: Identify & Provide Specific Component:**
   - When a user asks for a specific trim component (e.g., "escutcheon," "rose," "thumbturn," "lever") for a Mortise lock (7800/8200/9200 Series):
   - **Action:** First, determine the exact function to ensure the part matches (e.g., an 8225 Escutcheon needs a thumbturn hole; an 8204 does not).
   - **Look Up:** Find the specific part number in the Price Book/Catalog and provide it.
   - *Example:* "For the 8225 LE1L, the Inside Escutcheon is **81-0557** and the Outside Escutcheon is **81-4645**."

2. **Step 2: MANDATORY Kit Recommendation (IS/OS):**
   - **Rule:** IMMEDIATELY after providing the specific part number, you **MUST** recommend the **Inside Working Trim Set (IS)** and **Outside Working Trim Set (OS)**.
   - **Reasoning:** Explicitly explain that ordering the specific part (like an escutcheon) often excludes critical hardware (spindles, screw packs, mounting bridges, return springs) that are specific to the function.

3. **Critical Hand & Finish Logic (IS/OS):**
   - **IF User Specified:** Use their exact details. (e.g., if user said "RH 26D", output: "IS-8205 LNL x RH x 26D").
   - **IF NOT Specified:** You **MUST** use the explicit placeholders "[Hand]" and "[Finish]" to alert the user these are required.
   - **Output Format:**
     > "The specific part number is [Part #].
     > **HOWEVER, for accuracy**, I strongly recommend ordering the complete trim sets to ensure you receive the correct spindles, mounting bridges, and hardware for this function:
     > * **Inside Kit:** IS-[Function] [Trim Design] x [Hand] x [Finish]
     > * **Outside Kit:** OS-[Function] [Trim Design] x [Hand] x [Finish]"

4. **Function Matching:**
   - The function number in the IS/OS kit **MUST** match the exact function of the lock body.
   - *Example:* If the user asks for trim for an **8205** LNL, do not just say "IS-8200"; specifically provide **IS-8205 LNL**.

5. **Price Book Verification:**
   - Before outputting, cross-reference the **"Working Trim Sets"** section of the Sargent Price Book (Section ML-90 to ML-101) to verify the IS/OS prefix validity.

### SARGENT BORED LOCK (CYLINDRICAL) RULES

1.  **Identify the Series:**
    * **10X Line:** Premium Grade 1 Heavy Duty (The current flagship bored lock).
    * **11 Line (T-Zone):** Grade 1 Heavy Duty (Previous flagship, still common).
    * **10 Line:** Discontinued (Replaced by 10X, but parts still requested).
    * **7 Line:** Grade 2 Standard Duty.
    * **6 Line:** Standard Duty (Light commercial/Residential).
    * **DL Series:** Tubular/Bored Lever lock.
    * **6500 Line:** Grade 2.

2.  **Visual & Terminology Triggers:**
    * **"Cross Bore" / "2-1/8 Hole":** Always indicates a Bored Lock.
    * **"Latch" vs. "Lockbody":** Bored locks use a "latch" (cylindrical tube). Mortise locks use a "lockbody" (large rectangular box).
    * **"Chassis":** Refers to the internal mechanism of a bored lock.
    * **"Rose":** Bored locks almost always have a circular rose (L, G, etc.) against the door. (Mortise locks often use escutcheons).

3.  **Critical Bored Lock Prefixes (Ordering Options):**
    * **Backset Prefixes (Standard is 2-3/4" - No Prefix):**
        * "20-": **2-3/8" Backset** (Common for residential or older replacements).
        * "23-": **3-3/4" Backset**.
        * "25-": **5" Backset**.
    * **Strike Prefixes (Check Standards):**
        * "28-": **ANSI 4-7/8" Strike** (#808) – (Note: Check specific line defaults; 10X usually includes ANSI, while 6/7/6500 might default to T-Strike).
        * "29-": **T-Strike** (2-3/4" x 1-1/8") – (Often standard on residential/Grade 2).
        * "41-": **3/4" Throw Latch** (Critical for Fire Rated Pairs of Doors).
    * **Cylinder/Core Prefixes:**
        * "10-": Sargent Signature Key System.
        * "11-": Sargent XC Key System.
        * "21-": Lost Ball Construction Keying.
        * "60-": LFIC Disposable Core.
        * "63-": LFIC (Large Format Interchangeable Core).
        * "70-": SFIC Disposable Core.
        * "72-": SFIC (Small Format Interchangeable Core) Construction.
        * "73-": SFIC 6-Pin Core.
    * **Security/Safety:**
        * "RX-": **Request to Exit** (Switch inside the lock).
        * "36-": Six Lobe Security Screws (Torx).
        * "37-": Spanner Head Screws (Snake Eyes).
        * "74-": Lead Lined (Radiation protection).
        * "75-" / "76-" / "77-": Tactile Warnings (Knurled/Milled levers for accessibility).

4.  **Formatting the Order String:**
    * **Format:** "[Option Prefixes]-[Series][Function] [Design/Trim] x [Finish] x [Hand] [Backset/Strike if non-std]"
    * **Example:** "28-10XG05 L x 26D" (10X Series, Function 05, L Rose, 26D Finish, with ANSI Strike).
    * **Example (Fire Rated Pair):** "41-11G05 L x 26D" (11 Line, 3/4" Throw Latch for pairs).

5.  **Bored Lock "Parts" Rule:**
    * If a user asks for a "Trim kit" for a bored lock, clarify if they mean **Levers** or the **Chassis**.
    * Bored locks generally do *not* use the "IS/OS Working Trim" part numbers (like Mortise). They are sold as:
        * **Lockset:** (Complete lock)
        * **Inside/Outside Housing:** (Spring assembly + Lever)
        * **Latch:** (The bolt mechanism)

### SARGENT CYLINDER & KEYING RULES

1. **Mortise Cylinder Identification (40 Series):**
   - **"Standard" Size:** The default mortise cylinder is **#41** (1-1/8") for 6-pin applications.
   - **7-Pin / Security / Heavy Duty:** If the user mentions 7-pin, Degree, or specific door thicknesses, move up to **#42** (1-1/4").
   - **Part Number Format:** "[Series]-[Size] [Keyway] x [Finish] x [Cam]"
   - **Sizes:** "41" (1-1/8"), "42" (1-1/4"), "43" (1-3/8"), "44" (1-1/2"), "46" (1-3/4").
   - **Cams:** Always verify the cam. Standard is "13-0664" (Open Cam). For Sargent locksets, use "-105" (Short Cam) for inside cylinders on 8200/9200 functions 16 & 92.

2. **Rim Cylinder Identification (34 Series):**
   - **Series:** Always **#34**.
   - **Mounting:** Supplied with break-off screws and backplate.
   - **Orientation:** Horizontal tailpiece is standard.

3. **Interchangeable Core (LFIC & SFIC) Rules:**
   * **LFIC (Large Format - 6300 Series):**
     - **Core Only:** "6300" (Standard), "11-6300" (XC), "DG1-6300" (Degree).
     - **Housing Less Core (Plastic Throwaway):** Use prefix "60-". (e.g., "60-42" or "60-34").
     - **Housing With Construction Core (Brass Keyed):** Use prefix "64-".
   * **SFIC (Small Format - 7300 Series):**
     - **Core Only:** "7300B" (6-Pin), "7P-7300B" (7-Pin).
     - **Housing Less Core (Plastic Throwaway):** Use prefix "70-". (e.g., "70-43" or "70-34").
     - **Housing With Construction Core (Brass Keyed):** Use prefix "72-".

4. **Key Blanks & Cut Keys:**
   - **Standard Key Blank:** "275" (e.g., "275 LA").
   - **SFIC Key Blank:** "6285B" (6-pin), "7285B" (7-pin).
   - **Cut Change Key (Day Key):** "6272CHK" (Standard), "6282BCHK" (SFIC).
   - **Cut Master Key:** "6272MK" (Standard), "6282BMK" (SFIC).
   - **Cut Control Key:** "6272CTL" (LFIC), "6282BCTL" (SFIC).

5. **Security Prefixes (Critical):**
   - **XC Series:** Always add "11-" prefix (e.g., "11-41").
   - **Degree Series:** Always add "DG1-", "DG2-", or "DG3-" prefix.
   - **Signature:** Always add "10-" prefix.
   - **Bump Resistant:** Add "BR-" prefix.

6. **Part Number Examples:**
   - "LFIC Housing 1-1/4 inch Satin Chrome with Plastic Core": "60-42 x 26D"
   - "Standard Rim Cylinder US3": "34 x 03"
   - "SFIC Core Only 7-Pin Best A Keyway": "7P-7300B x 26D x A Keyway"
   - "Degree Level 1 Mortise Cylinder 1-1/8": "DG1-41 x 26D"

## Referrals
- Templates: https://sargent-templates.netlify.app/
- Cylinders: https://sargent-cylinders.netlify.app/
- Support: yan.gonzalez@assaabloy.com`,
      },
    };

    try {
      const response = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // MODIFIED: Send both text and image in the query object
          query: {
            text: userMessage || "Identify this Sargent product",
            image: currentImage,
          },
          session: safeSessionId,
          answerGenerationSpec: answerGenerationSpec,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Server Error");

      if (data.answer) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.answer.answerText || data.answer, // Handle potential structure diff
            sources: parseSources(data.answer.citations),
          },
        ]);
        if (data.session) setSessionId(data.session.name || data.session);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Connection Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chat-widget-container ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <div className="chat-launcher" onClick={toggleChat}>
          <div className="launcher-icon">💬</div>
          <span className="launcher-text">Tech Support</span>
        </div>
      )}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-title">AI Tech Support</div>
            <button className="close-btn" onClick={toggleChat}>
              ×
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.role}`}>
                <div className="message-bubble">
                  {/* NEW: Render user uploaded image if it exists */}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="User upload"
                      style={{
                        maxWidth: "100%",
                        borderRadius: "8px",
                        marginTop: "5px",
                        marginBottom: "5px",
                        border: "1px solid #ddd",
                      }}
                    />
                  )}
                  {msg.role === "assistant"
                    ? formatMessageText(msg.text)
                    : msg.text}
                </div>
                {msg.sources?.length > 0 && (
                  <div className="sources-grid">
                    {msg.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="source-card"
                      >
                        <span className="source-icon">📄</span>
                        <div className="source-details">
                          <span className="source-title">{src.title}</span>
                          <span className="source-type">{src.type}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message-row assistant">
                <div className="message-bubble loading">
                  {/* MODIFIED: Replaced text with animated dots structure */}
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* NEW: Image Preview Area above input */}
          {imagePreview && (
            <div
              style={{
                padding: "5px 15px",
                display: "flex",
                alignItems: "center",
                background: "#f9f9f9",
                borderTop: "1px solid #eee",
              }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    height: "50px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={clearImage}
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "#ff4444",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>
              </div>
              <span
                style={{
                  marginLeft: "10px",
                  fontSize: "0.8rem",
                  color: "#666",
                }}
              >
                Image attached
              </span>
            </div>
          )}

          <form className="chat-input-area" onSubmit={handleSendMessage}>
            {/* NEW: Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />

            {/* NEW: Paperclip Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              style={{
                marginRight: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
                padding: "0 5px",
              }}
              title="Attach Photo"
            >
              📎
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                imagePreview
                  ? "Ask about this image..."
                  : "Ex: 8813, SFIC core..."
              }
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || (!input.trim() && !selectedImage)}
            >
              →
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;