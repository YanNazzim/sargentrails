// src/components/MortiseTrimKits.js
import React, { useState, useRef, useEffect } from "react";
import Select, { components } from "react-select";
import "../App.css"; // Ensure App.css styles are applied
import images from "../images"; // Adjust path as needed
import leverStyles from "./LeverStyles"; // Lever styles and data

// --- Reusable Custom Select Components ---

// Custom Option to render finish image and label in the dropdown list
const FinishOption = (props) => {
  return (
    <components.Option {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "30px",
          height: "auto",
          marginRight: "10px",
          verticalAlign: "middle",
          borderRadius: "25px"
        }}
      />
      <span>{props.data.label}</span>
    </components.Option>
  );
};

const RoseOption = (props) => {
  return (
    <components.Option {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "120px",
          height: "auto",
          marginRight: "10px",
          verticalAlign: "middle",
        }}
      />
      <span
        style={{
          fontSize: "2em",
        }} 
      >
        {props.data.label}
      </span>    </components.Option>
  );
};

// Custom SingleValue to render the selected finish with its image
const FinishSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "30px",
          height: "auto",
          marginRight: "10px",
          verticalAlign: "middle",
        }}
      />
      <span>{props.data.label}</span>
    </components.SingleValue>
  );
};

const RoseSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "240px",
          height: "auto",
          marginRight: "10px",
          verticalAlign: "middle",
        }}
      />
      <span
        style={{
          fontSize: "2em",
        }} 
      >
        {props.data.label}
      </span>
    </components.SingleValue>
  );
};

// Custom Styles for general Select components (like Finish, Handing, Function)
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
    color: "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isFocused ? "#007bff20" : "white",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    borderRadius: "25px"
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "4px",
  }),
};

// Custom Option for Lever Style Dropdown
const CustomLeverOption = (props) => {
  const { partNumbers = {} } = props.data; // Default to an empty object if partNumbers is missing

  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{
            width: "120px",
            height: "auto",
            marginRight: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        />
        <div>
          <h3 style={{ margin: "0 0 5px 0", color: "#2ecc71" }}>
            {props.data.label}
          </h3>
          <div style={{ color: "#888" }}>
            {Object.entries(partNumbers).map(([platform, part]) => (
              <div key={platform}>
                <strong>{platform}:</strong>{" "}
                {typeof part === "object"
                  ? `${part.inside || "N/A"} / ${part.outside || "N/A"}`
                  : part || "N/A"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </components.Option>
  );
};

// Custom SingleValue for Lever Style Dropdown
const CustomLeverSingleValue = (props) => (
  <components.SingleValue {...props}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "60px",
          height: "auto",
          marginRight: "15px",
          borderRadius: "8px",
        }}
      />
      <span>{props.data.label}</span>
    </div>
  </components.SingleValue>
);

// Custom Styles for Lever Dropdown
const customLeverStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "50px",
    border: "2px solid #2c3e50",
    borderRadius: "8px",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#2ecc71",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#e8f5e9" : "white",
    color: state.isSelected ? "white" : "#2c3e50",
    padding: "10px",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // Corrected property name
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
};

// --- Data Definitions ---

const lockbodyFunctions = [
  // Functions from "Deadbolt Only"
  {
    value: "8203",
    label: "8203 - Classroom Deadlock (F29)",
    description:
      "Deadbolt only operation. Key outside retracts and projects deadbolt. Thumbturn inside retracts deadbolt only, will not project it.",
    image: null,
  },
  // Functions from "Single Cylinder without Deadbolt"
  {
    value: "8204",
    label: "8204 - Storeroom or Closet (F07)",
    description:
      "Key outside retracts latchbolt. Trim outside locked at all times. Trim inside always retracts latchbolt. Auxiliary deadlatch.",
    image: null,
  },
  {
    value: "8205",
    label: "8205 - Office or Entry (F04)",
    description:
      "Key outside retracts latchbolt, also locks & unlocks outside trim. Trim inside always retracts latchbolt, trim outside remains locked. Thumbturn inside locks & unlocks outside trim. Auxiliary deadlatch. A Multi-Function 8200/7800 Lockbody.",
    image: null,
  },
  {
    value: "8206",
    label: "8206 - Storeroom or Service",
    description:
      "Trim inside always retracts latchbolt. Auxiliary deadlatch. A Multi-Function 8200/7800 Lockbody. Same as 04 Function without trim outside.",
    image: null,
  },
  // Functions from "Non-Keyed"
  {
    value: "8212",
    label: "8212 - Passage with Indicator",
    description:
      'For doors with indicator that do not require locking. Latchbolt retracted by trim either side at all times. Throwing thumbturn on inside changes state of status indicator. Rotating either trim returns indicator to previous state. Note: Only available with "V" series indicators. Indicator option code must be specified with this function.',
    image: null,
  },
  {
    value: "8213",
    label: "8213 - Exit Latch (F31)",
    description:
      "No outside trim or cylinder. Trim inside retracts latchbolt. A Multi-Function 8200/7800 Lockbody. Auxiliary deadlatch.",
    image: null,
  },
  {
    value: "8215",
    label: "8215 - Passage or Closet (F01)",
    description: "Trim from either side retracts latchbolt at all times.",
    image: null,
  },
  // Functions from "Double Cylinder without Deadbolt"
  {
    value: "8216",
    label: "8216 - Apartment, Exit or Public Restroom (F09)",
    description:
      "Key outside retracts latchbolt. Key inside is required to lock and unlock trim outside. Trim inside always retracts latchbolt. Auxiliary deadlatch. Special-105 cam, required for inside cylinder (supplied).",
    image: null,
  },
  {
    value: "8217",
    label: "8217 - Asylum or Institutional (F30)",
    description:
      "Key from either side retracts latchbolt. Trim on both sides are locked at all times. Auxiliary deadlatch. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  // Functions from "Deadbolt Only"
  {
    value: "8220",
    label: "8220 - Deadlock (F18)",
    description:
      "Deadbolt operation only. Key outside retracts and projects deadbolt. No inside operation.",
    image: null,
  },
  {
    value: "8221",
    label: "8221 - Deadlock (F17)",
    description:
      "Deadbolt operation only. Key outside retracts and projects deadbolt. Thumbturn inside retracts and projects deadbolt.",
    image: null,
  },
  {
    value: "8222",
    label: "8222 - Deadlock (F16)",
    description:
      "Deadbolt operation only. Key outside or inside retracts and projects deadbolt.",
    image: null,
  },
  {
    value: "8223",
    label: "8223 - Classroom Deadlock",
    description:
      "Deadbolt only operation. Key outside or inside retracts and projects deadbolt. Thumbturn inside retracts deadbolt, does not project deadbolt. Same as 03 function with cylinder inside. Not Available with Behavioral Health Trim.",
    image: null,
  },
  // Functions from "Single Cylinder with Deadbolt"
  {
    value: "8224",
    label: "8224 - Room Door (F21)",
    description:
      "Key outside or thumbturn inside retracts and projects deadbolt. Trim either side retracts latchbolt. Latchbolt & deadbolt operate independently of each other. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8225",
    label: "8225 - Dormitory or Exit (F13)",
    description:
      "Key outside or thumbturn inside retracts and projects deadbolt. Trim from either side retracts latchbolt, when the deadbolt is in the retracted position. Trim outside is locked, when the deadbolt is projected. When deadbolt is projected, Trim inside retracts latchbolt and deadbolt simultaneously, unlocking outside trim.",
    image: null,
  },
  // Functions from "Double Cylinder with Deadbolt"
  {
    value: "8226",
    label: "8226 - Store Door (F14)",
    description:
      "Key from either side retracts & projects deadbolt. Trim from either side retracts latchbolt. Latchbolt and deadbolt are independent of each other. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8227",
    label: "8227 - Closet or Storeroom",
    description:
      "Key outside retracts and projects deadbolt. Trim from either side retracts latchbolt. Same as 24 function without thumbturn. Latchbolt & deadbolt operate independently of each other. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8228",
    label: "8228 - Dummy Trim Deadlock",
    description:
      "Deadbolt operation only. Key outside retracts and projects deadbolt. Trim inside always retracts deadbolt. Trim outside is always locked. Thumbturn inside retracts and projects deadbolt. Note: Indicator shows deadbolt position only.",
    image: null,
  },
  {
    value: "8229",
    label: "8229 - Dummy Trim Deadlock",
    description:
      "Deadbolt operation only. Key on either side retracts & projects deadbolt. Trim inside retracts deadbolt. Trim outside is always locked. Note: Indicator shows deadbolt position only.",
    image: null,
  },
  {
    value: "8230",
    label: "8230 - Dummy Trim Deadlock",
    description:
      "Deadbolt operation only. Key outside retracts and projects deadbolt. Trim inside always retracts deadbolt. Trim outside is always locked. Same as 28 Function without a thumbturn. Note: Indicator shows deadbolt position only.",
    image: null,
  },
  {
    value: "8231",
    label: "8231 - Utility",
    description:
      "Key outside retracts latchbolt. Trim outside is always locked. No inside trim or cylinder. A Multi-Function 8200/7800 Lockbody. Auxiliary deadlatch. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8235",
    label: "8235 - Storeroom (F20)",
    description:
      "Key outside retracts and projects deadbolt. Trim outside retracts latchbolt, except when deadbolt is projected. No inside trim or cylinder. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8236",
    label: "8236 - Closet",
    description:
      "Key locks and unlocks trim. No inside trim or cylinder. A Multi-Function 8200/7800 Lockbody. Auxiliary dead latch. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8237",
    label: "8237 - Classroom (F05)",
    description:
      "Key outside retracts latchbolt, also locks & unlocks outside trim. Trim inside always retracts latchbolt. Auxiliary deadlatch. A Multi-Function 8200/7800 Lockbody.",
    image: null,
  },
  {
    value: "8238",
    label: "8238 - Classroom Security Intruder Latchbolt (F32)",
    description:
      "Key from either side locks & unlocks outside trim. Key from either side retracts latchbolt. Trim outside retracts latchbolt, except when locked. Trim inside always retracts latchbolt. A Multi-Function 8200/7800 Lockbody. Auxiliary deadlatch. Handed function; handing must be specified. This function is NOT field reversible for handing.",
    image: null,
  },
  {
    value: "8239",
    label: "8239 - Classroom Security Intruder Deadbolt (F33)",
    description:
      "Key either from side retracts or projects deadbolt which also unlocks or locks outside trim. Trim outside retracts latchbolt, except when locked. Trim outside is only locked by projecting the deadbolt. Trim inside retracts both latchbolt and deadbolt simultaneously, and unlocks outside trim.",
    image: null,
  },
  {
    value: "8240",
    label: "8240 - Classroom Security Intruder Deadbolt (F34)",
    description:
      "Key from either side retracts or projects deadbolt which also unlocks or locks outside trim. Trim outside retracts latchbolt, except when locked. Trim outside is only locked by projecting the deadbolt. Trim inside retracts both latchbolt and deadbolt simultaneously, and unlocks outside trim. Auxiliary deadlatch. Same as an 8239 with Auxiliary deadlatch.",
    image: null,
  },
  {
    value: "8241",
    label: "8241 - Classroom Security Intruder Deadbolt",
    description:
      "Key from either side retracts and projects deadbolt. When deadbolt is projected, 1st key rotation retracts deadbolt, 2nd key rotation unlocks trim outside. Key retraction of latchbolt from either side unlocks trim outside. Trim outside retracts latchbolt, except when locked. Trim inside (when deadbolt is projected) retracts both latchbolt and deadbolt simultaneously and the outside trim remains locked. Auxiliary deadlatch.",
    image: null,
  },
  {
    value: "8242",
    label: "8242 - Classroom Security Intruder Latchbolt",
    description:
      "Key inside only locks outside trim (does not unlock). Key outside locks and unlocks outside trim. Key outside retracts latchbolt. Trim outside retracts latchbolt, except when locked. Trim inside always retracts latchbolt. Auxiliary deadlatch.",
    image: null,
  },
  {
    value: "8243",
    label: "8243 - Apartment Corridor Door",
    description:
      "Key and thumbturn both retract & project the deadbolt. Trim outside is locked by toggle or projecting deadbolt. Trim outside is unlocked by toggle only. Key retracts both latchbolt and deadbolt, trim outside remains locked. Trim inside always retracts latchbolt (and deadbolt simultaneously), trim outside remains locked. Auxiliary deadlatch.",
    image: null,
  },
  {
    value: "8245",
    label: "8245 - Dormitory or Exit (F12)",
    description:
      "Key and thumbturn both retract & project deadbolt. Trim outside is locked by toggle or projecting deadbolt. Trim outside is unlocked by toggle only. Key retracts both latchbolt and deadbolt, trim outside remains locked. Trim inside always retracts latchbolt (and deadbolt simultaneously), trim outside remains locked. Same as an 8243 without Auxiliary Deadlatch. Note: Indicator shows deadbolt position only.",
    image: null,
  },
  {
    value: "8246",
    label: "8246 - Dormitory or Exit",
    description:
      "Key from either side retracts and projects deadbolt. Key from either side retracts both latchbolt and deadbolt, trim outside remains locked. Trim outside is locked by toggle or projecting deadbolt. Trim outside is unlocked by toggle only. Trim inside (when deadbolt is projected) retracts both latchbolt and deadbolt simultaneously and the outside trim remains locked. Note: Indicator shows deadbolt position only.",
    image: null,
  },
  {
    value: "8247",
    label: "8247 - Front Door or Apartment Corridor Door (F08/F10)",
    description:
      "Key and thumbturn both retract & project deadbolt. Trim outside is locked by toggle or projecting deadbolt. Trim outside is unlocked by toggle only. Key retracts both latchbolt and deadbolt, trim outside remains locked. Trim inside retracts latchbolt only, deadbolt is retracted manually & trim outside remains locked. Note: Indicator shows deadbolt position only. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8248",
    label: "8248 - Store Door (F25)",
    description:
      "Key from either side retracts and projects deadbolt. Key from either side retracts latchbolt. Trim outside is locked by toggle or projecting deadbolt and unlocked by toggle only. Trim inside (when deadbolt is projected) retracts latchbolt only, and outside trim remains locked. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8249",
    label: "8249 - Security Deadbolt",
    description:
      "Key from either side retracts and projects deadbolt. Key from either side retracts latchbolt. Trim inside & outside are locked only when deadbolt is projected. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8250",
    label: "8250 - Hotel Guest (F15)",
    description:
      "Hotel Cylinder (50 Function) Required (Standard & Emergency Keys). Standard Key retracts latchbolt only, will not retract or project deadbolt. Emergency Key (P/N 7268EMK ordered separately) will retract latchbolt & deadbolt and also project deadbolt. Thumbturn retracts & projects deadbolt. Trim inside retracts latchbolt & deadbolt simultaneously. Trim outside is always locked. Auxiliary deadlatch. Available with Conventional, LFIC (60- & 63-), Degree (60-, 63-, & 64-) and Keso (82- & F1-82-) key systems. Note: Indicator shows deadbolt position only.",
    image: null,
  },
  {
    value: "8251",
    label: "8251 - Storeroom Deadbolt",
    description:
      "Key and thumbturn both retract & project the deadbolt. Key will also retract latchbolt. Trim inside retracts latchbolt & deadbolt simultaneously. Trim outside is always locked. Auxiliary deadlatch. Same as 50 function with a standard cylinder. Note: Indicator shows deadbolt position only.",
    image: null,
  },
  {
    value: "8252",
    label: "8252 - Institutional Deadbolt",
    description:
      "Key from either side retracts and projects deadbolt. Key from either side retracts latchbolt. Trim inside and out are always locked. Auxiliary deadlatch. Note: Indicator shows deadbolt position only. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8255",
    label: "8255 - Office or Entry",
    description:
      "Key outside retracts latchbolt. Trim inside always retracts latchbolt, outside trim remains locked. Trim outside is locked & unlocked by the toggle only. Auxiliary deadlatch.",
    image: null,
  },
  {
    value: "8256",
    label: "8256 - Office & Inner Entry Lock",
    description:
      "Key outside retracts latchbolt. Trim inside always retracts latchbolt and unlocks outside trim. Trim outside is locked by thumbturn or key. Auxiliary deadlatch.",
    image: null,
  },
  {
    value: "8257",
    label: "8257 - Institutional Privacy (F26)",
    description:
      "Key outside retracts latchbolt, overriding thumbturn when held in locked position. Thumbturn inside locks & unlocks outside trim. Trim outside unlocks when the door closes or operating trim inside. Trim inside always retracts latchbolt. Auxiliary deadlatch. Note: Key locks & unlocks trim outside.",
    image: null,
  },
  {
    value: "8258",
    label: "8258 - Institutional Privacy",
    description:
      "Key outside retracts latchbolt, overriding thumbturn when held in locked position. Thumbturn inside locks & unlocks outside trim. Trim outside does not unlock when the door closes. Trim outside unlocks when operating trim inside. Trim inside always retracts latchbolt. Auxiliary deadlatch. Note: Key locks & unlocks trim outside.",
    image: null,
  },
  {
    value: "8259",
    label: "8259 - Double Locking",
    description:
      "Key from either side locks & unlocks both the inside & outside trims. Key from either side retracts latchbolt. Key from either side can retract latchbolt without unlocking trims. Auxiliary deadlatch. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8265",
    label: "8265 - Privacy Bath/Bedroom (F22)",
    description:
      "Trim outside retracts latchbolt except when locked by thumbturn. Trim inside retracts latchbolt and unlocks outside trim. Emergency Release locks/unlocks trim outside-by coin, screwdriver or Emergency key (14-0057) ordered separately. Thumbturn locks and unlocks trim outside. Closing the door will unlock outside trim.",
    image: null,
  },
  {
    value: "8266",
    label: "8266 - Privacy Bath/Bedroom (F19)",
    description:
      "Trim outside retracts latchbolt except when deadbolt is projected. Trim inside retracts both latchbolt and deadbolt simultaneously, unlocking the outside trim. Emergency Release retracts and projects deadbolt - by coin, screw driver or Emergency key (14-0057) ordered separately. Thumbturn retracts and projects deadbolt.",
    image: null,
  },
  {
    value: "8267",
    label: "8267 - Institutional Privacy",
    description:
      "Key outside retracts latchbolt, overriding thumbturn when held in locked position. Thumbturn inside locks & unlocks outside trim. Trim outside unlocks when the door closes or operating trim inside. Trim inside always retracts latchbolt. Auxiliary deadlatch. Note: Key does not lock trim outside, only unlocks it.",
    image: null,
  },
  {
    value: "8268",
    label: "8268 - Privacy Bath/Bedroom (F02)",
    description:
      "Trim from either side retracts latchbolt at all times. Thumbturn retracts and projects deadbolt. Emergency release retracts and projects deadbolt - by coin, screwdriver or Emergency key (14-0057) ordered separately. Latchbolt and deadbolt are independent of each other. CAUTION: Not recommended for use on any door used for Life Safety egress.",
    image: null,
  },
  {
    value: "8289",
    label: "8289 - Holdback (F06)",
    description:
      "Key outside retracts latchbolt, also locks & unlocks outside trim. Trim inside always retracts latchbolt. Auxiliary deadlatch. Latch holdback to set, rotating & hold lever, then rotate key twice toward latchbolt. Lever will remain in rotated position indicating it is unlocked.",
    image: null,
  },
  {
    value: "8290",
    label: "8290 - Classroom Security Holdback",
    description:
      "Key from either side retracts latchbolt, also locks & unlocks outside trim. Latchbolt can be locked in the retracted position by key from either side. Trim inside always retracts latchbolt. Auxiliary deadlatch. Latch holdback to set, rotating & hold lever, then rotate key twice toward latchbolt. Lever will remain in rotated position indicating it is unlocked.",
    image: null,
  },
  {
    value: "8291",
    label: "8291 - All Purpose Holdback",
    description:
      "Key outside retracts latchbolt. Key outside can lock latchbolt in retracted position. Trim inside always retracts latchbolt. No outside trim. Auxiliary deadlatch. Latch holdback set by rotating & holding trim, then rotate key toward latchbolt. Lever will remain in rotated position for unlocked indication.",
    image: null,
  },
  {
    value: "8292",
    label: "8292 - All Purpose Holdback",
    description:
      'Key outside retracts latchbolt. Key inside can lock latchbolt in retracted position when the lever is rotated. Trim inside always retracts latchbolt. No outside trim. Auxiliary deadlatch. 7892"T" turn is used in place of knob (32 or 32D only). Special-105 cam required for inside cylinder (Supplied Standard). Latch holdback to set, rotating & hold lever, then rotate key twice toward latchbolt. Lever will remain in rotated position indicating it is unlocked.',
    image: null,
  },
  {
    value: "8293",
    label: "8293 - Trim Dummy",
    description:
      "Trim on inside of door is always rigid. Trim only used as door pull. For double door applications, installed on the inactive door, use template #4298 to accept latchbolt from active door. Note: Lever is throughbolted-",
    image: null,
  },
  {
    value: "8294",
    label: "8294 - Trim Dummy",
    description:
      "Trim on both sides are always rigid. Trim only used as door pull. Recommended for double door applications on the inactive door, use template #4298, to accept latchbolt from active door. Note: Lever not surface mounted.",
    image: null,
  },
  {
    value: "8295",
    label: "8295 - Single Trim Dummy",
    description:
      "Trim inside only. Trim is always rigid. Includes lock case and armor front. Not recommended on double door applications (will not accept latchbolt from active door).",
    image: null,
  },
  {
    value: "8296",
    label: "8296 - Double Trim Dummy",
    description:
      "Trim on both sides of the door. Both trims are always rigid. Includes lock case and armor front. Not recommended on double door applications (will not accept latchbolt from active door).",
    image: null,
  },
  {
    value: "8297",
    label: "8297 - Active Trim Dummy",
    description:
      "Trim on both sides are active. Includes lock case and armor front. Not recommended on double door applications (will not accept latchbolt from active door).",
    image: null,
  },
].sort((a, b) => parseInt(a.value) - parseInt(b.value)); // Ensure functions are sorted numerically

// Updated Rose/Escutcheon Options based on 7800 & 8200 Mortise Catalog.pdf (Page 10)
const roseEscutcheonOptions = [
  // Roses
  { value: "ORose", label: "O Rose", image: images.ORose },
  { value: "LNRose", label: "LN Rose", image: images.LNRose },
  { value: "CORose", label: "CO Rose", image: images.CORose },
  { value: "CRRose", label: "CR Rose", image: images.CRRose }, // Corrected: images.CRRose
  { value: "TORose", label: "TO Rose", image: images.TORose }, // Corrected: images.TORose
  { value: "TRRose", label: "TR Rose", image: images.TRRose },
  { value: "E2Rose", label: "E2 Rose", image: images.E2Rose }, // Corrected: images.E2Rose
  { value: "E3Rose", label: "E3 Rose", image: images.E3Rose },
  { value: "E4Rose", label: "E4 Rose", image: images.E4Rose },
  { value: "ERose", label: "E Rose", image: images.ERose }, // Added missing ERose image reference
  // Escutcheons
  { value: "LE1Escutcheon", label: "LE1/LE2 Escutcheon", image: images.LE1Esc },
  { value: "LE3Escutcheon", label: "LE3/LE4 Escutcheon", image: images.LE3Esc },
  { value: "LW1Escutcheon", label: "LW1 Escutcheon", image: images.LW1Esc },
  { value: "VN1Escutcheon", label: "VN1 Escutcheon", image: images.VN1Esc },
  { value: "LSEscutcheon", label: "LS Escutcheon", image: images.LSEsc },
  { value: "WTEscutcheon", label: "WT Escutcheon", image: images.WTEsc },
  { value: "CEEscutcheon", label: "CE Escutcheon", image: images.CEEsc },
  { value: "TEEscutcheon", label: "TE Escutcheon", image: images.TEEsc },
];

const handingOptions = [
  { value: "RH", label: "RH - Right Hand" },
  { value: "LH", label: "LH - Left Hand" },
  { value: "RHR", label: "RHR - Right Hand Reverse" },
  { value: "LHR", label: "LHR - Left Hand Reverse" },
];

const finishOptions = [
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

// --- MortiseTrimKits Component ---

const MortiseTrimKits = () => {
  const [formData, setFormData] = useState({
    functionCode: null,
    roseEscutcheon: null,
    leverStyle: null,
    handing: null,
    finish: null,
  });
  const [generatedPartNumbers, setGeneratedPartNumbers] = useState({
    inside: "",
    outside: "",
  });
  const [displayResult, setDisplayResult] = useState(false);
  const resultRef = useRef(null);

  // Auto-scroll to results when displayResult becomes true
  useEffect(() => {
    if (displayResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayResult]);

  const handleChange = (selectedOption, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.functionCode &&
      formData.roseEscutcheon &&
      formData.leverStyle &&
      formData.handing &&
      formData.finish
    ) {
      // Logic to construct the combined Lever/Rose/Escutcheon part
      const roseEscutcheonShorthand = formData.roseEscutcheon.value.replace(
        /(Rose|Escutcheon)/g,
        ""
      );
      const leverShorthand = formData.leverStyle.value;
      const combinedLeverRoseEscutcheon = `${roseEscutcheonShorthand}${leverShorthand}`;

      const insidePartNumber = `IS-${formData.functionCode.value} ${combinedLeverRoseEscutcheon} ${formData.handing.value} ${formData.finish.value}`;
      const outsidePartNumber = `OS-${formData.functionCode.value} ${combinedLeverRoseEscutcheon} ${formData.handing.value} ${formData.finish.value}`;

      setGeneratedPartNumbers({
        inside: insidePartNumber,
        outside: outsidePartNumber,
      });
      setDisplayResult(true);
    } else {
      setDisplayResult(false);
      alert("Please select all options.");
    }
  };

  const handleReset = () => {
    setFormData({
      functionCode: null,
      roseEscutcheon: null,
      leverStyle: null,
      handing: null,
      finish: null,
    });
    setGeneratedPartNumbers({ inside: "", outside: "" });
    setDisplayResult(false);
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">Mortise Trim Kits</h1>

      <form onSubmit={handleSubmit} className="part-form">
        {/* Function Selection */}
        <div className="form-group">
          <label>Function:</label>
          <Select
            options={lockbodyFunctions}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "functionCode")
            }
            value={formData.functionCode}
            placeholder="Select Function..."
            styles={customSelectStyles}
            required
          />
        </div>

        {/* Rose/Escutcheon Selection */}
        <div className="form-group">
          <label>Rose / Escutcheon:</label>
          <Select
            options={roseEscutcheonOptions}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "roseEscutcheon")
            }
            value={formData.roseEscutcheon}
            placeholder="Select Rose / Escutcheon..."
            components={{ Option: RoseOption, SingleValue: RoseSingleValue }}
            styles={customSelectStyles}
            required
          />
        </div>

        {/* Lever Style Selection */}
        <div className="form-group">
          <label>Lever Style:</label>
          <Select
            options={leverStyles}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "leverStyle")
            }
            value={formData.leverStyle}
            placeholder="Select Lever Style..."
            components={{
              Option: CustomLeverOption,
              SingleValue: CustomLeverSingleValue,
            }}
            styles={customLeverStyles}
            required
          />
        </div>

        {/* Handing Selection */}
        <div className="form-group">
          <label>Handing:</label>
          <Select
            options={handingOptions}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "handing")
            }
            value={formData.handing}
            placeholder="Select Handing..."
            styles={customSelectStyles}
            required
          />
        </div>

        {/* Finish Selection */}
        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={finishOptions}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "finish")
            }
            value={formData.finish}
            placeholder="Select Finish..."
            components={{
              Option: FinishOption,
              SingleValue: FinishSingleValue,
            }}
            styles={customSelectStyles}
            required
          />
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="generate-button">
            Generate Information
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>

      {/* Results */}
      {displayResult && (
        <div ref={resultRef} className="result-container">
          <h2>Selected Mortise Trim Kit Details:</h2>

          <p>
            <strong>Inside:</strong> {generatedPartNumbers.inside}
          </p>
          <p>
            <strong>Outside:</strong> {generatedPartNumbers.outside}
          </p>
        </div>
      )}
    </div>
  );
};

export default MortiseTrimKits;
