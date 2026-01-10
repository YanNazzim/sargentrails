// src/components/ChatWidget.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import "../components/ChatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am your **Sargent Specialist**. I can help with Part ID, Templates, and technical questions. How can I assist you today?",
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
  }, [messages, isOpen, isLoading]); // Added isLoading to trigger scroll when "Thinking" starts

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
            cleanTitle = cleanTitle.substring(0, 47) + "...";
          uniqueMap.set(src.uri, {
            title: cleanTitle,
            uri: src.uri,
            type: src.uri.endsWith(".pdf") ? "PDF" : "WEB",
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
            <ul key={`ul-${index}`} className="chat-list">
              {listBuffer}
            </ul>
          );
          listBuffer = [];
        }
        if (trimmed)
          formattedContent.push(
            <div key={index} className="text-paragraph">
              {parseBold(trimmed)}
            </div>
          );
      }
    });

    if (listBuffer.length > 0)
      formattedContent.push(
        <ul key="ul-last" className="chat-list">
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
      const historyPayload = newMessages
        .slice(1)
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
            video: data.answer.video || null,
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
    <div className={`chat-widget-container ${isOpen ? "open" : ""}`} onPaste={handlePaste}>
      {!isOpen && (
        <div className="chat-launcher" onClick={toggleChat}>
          <div className="launcher-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <span className="launcher-text">Support</span>
        </div>
      )}
      
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-info">
              <div className="online-indicator"></div>
              <div className="header-title">Sargent Support</div>
            </div>
            <button className="close-btn" onClick={toggleChat}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.role}`}>
                <div className="message-bubble">
                  {msg.image && (
                    <div className="message-image-container">
                      <img src={msg.image} alt="User upload" />
                    </div>
                  )}
                  <div className="message-text">
                    {msg.role === "assistant" ? formatMessageText(msg.text) : msg.text}
                  </div>

                  {msg.video && (
                    <div className="video-card">
                      <div className="video-card-header">
                        <span className="video-tag">PRO TIP</span>
                        <span className="video-title-text">{msg.video.title}</span>
                      </div>
                      <div className="video-frame-container">
                        <iframe
                          src={`https://www.youtube.com/embed/${msg.video.id}`}
                          title={msg.video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>

                {msg.sources?.length > 0 && (
                  <div className="sources-list">
                    {msg.sources.map((src, idx) => (
                      <a key={idx} href={src.uri} target="_blank" rel="noreferrer" className="source-link">
                        <span className="source-badge">{src.type}</span>
                        <span className="source-label">{src.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* IMPROVED THINKING STATE */}
            {isLoading && (
              <div className="message-row assistant">
                <div className="thinking-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="thinking-text">Sargent Specialist is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            {imagePreview && (
              <div className="preview-bar">
                <div className="preview-thumb">
                  <img src={imagePreview} alt="Preview" />
                  <button onClick={clearImage} className="clear-preview">×</button>
                </div>
                <span className="preview-status">Analyzing exit device...</span>
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
                className="action-btn"
                onClick={() => fileInputRef.current.click()}
                title="Attach Photo"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={imagePreview ? "Ask about this device..." : "Ask a Sargent question..."}
                disabled={isLoading}
              />
              
              <button
                type="submit"
                className="send-btn"
                disabled={isLoading || (!input.trim() && !selectedImage)}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;