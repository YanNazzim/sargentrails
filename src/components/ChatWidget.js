// src/components/ChatWidget.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import "../components/ChatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  // State for handling images
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am your AI Tech Support and Sargent Specialist. I can help with Part ID, Templates, and technical questions. Upload a photo or ask a question!",
      sources: [],
      video: null,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Helper to process files (used by both Paste and File Input)
  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setSelectedImage({
          mimeType: file.type,
          data: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Ctrl+V Paste
  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          processFile(file);
        }
      }
    }
  };

  // Handle File Selection (Paperclip button)
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

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
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim();
    const currentImage = selectedImage;
    const currentPreview = imagePreview;

    const newMessages = [
      ...messages,
      {
        role: "user",
        text: userMessage,
        image: currentPreview,
      },
    ];
    setMessages(newMessages);

    setInput("");
    clearImage();
    setIsLoading(true);

    const FUNCTION_URL = "/.netlify/functions/chat";

    try {
      // OPTIMIZATION: Prepare History
      const historyPayload = newMessages
        .slice(1) // Skip the first message (Greeting)
        .filter((msg) => msg.text && msg.role !== "system")
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          text: msg.text,
        }));

      const response = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: {
            text: userMessage || "Identify this Sargent product",
            image: currentImage,
          },
          history: historyPayload,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Server Error");

      if (data.answer) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.answer.answerText || data.answer,
            sources: parseSources(data.answer.citations),
            video: data.answer.video || null, // Capture video data
          },
        ]);
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
    <div
      className={`chat-widget-container ${isOpen ? "open" : ""}`}
      onPaste={handlePaste}
    >
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

                  {/* VIDEO DISPLAY COMPONENT */}
                  {msg.video && (
                    <div
                      className="video-card"
                      style={{
                        marginTop: "12px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid #e0e0e0",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "#f5f5f5",
                          borderBottom: "1px solid #e0e0e0",
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          color: "#333",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>📺</span> Recommended Video
                      </div>
                      <div
                        style={{
                          position: "relative",
                          paddingBottom: "56.25%", // 16:9 Aspect Ratio
                          height: 0,
                        }}
                      >
                        <iframe
                          src={`https://www.youtube.com/embed/${msg.video.id}`}
                          title={msg.video.title}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                          }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div
                        style={{
                          padding: "8px",
                          fontSize: "0.8rem",
                          color: "#666",
                          textAlign: "center",
                        }}
                      >
                        {msg.video.title}
                      </div>
                    </div>
                  )}
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
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />

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