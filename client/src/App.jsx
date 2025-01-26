import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./context/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Table from "./components/Table";
import "./App.css";

// New AnimatedText component
const AnimatedText = ({ text }) => {
  const characters = Array.from(text);
  
  return (
    <span style={{ display: "inline-block" }}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: index * 0.03, // Delay each character
            ease: "easeIn"
          }}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const App = () => {
  const [textData, setTextData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, currentTheme } = useTheme();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");

    socket.onopen = () => {
      setIsLoading(true);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "text") {
        setTextData((prev) => [...prev, message.data]);
      } else if (message.type === "table") {
        setTableData((prev) => [...prev, message.data]);
      }
    };

    socket.onclose = () => {
      setIsLoading(false);
    };

    return () => socket.close();
  }, []);

  return (
    <div className={`app ${theme}`} style={{ backgroundColor: currentTheme.background }}>
      <div className="container">
        {/* Header */}
        <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 className="title" style={{ color: currentTheme.text }}>LLM Stream</h1>
          <ThemeSwitcher />
        </div>

        {/* Loading Animation */}
        {isLoading && (
          <div className="loading-container" style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <div className="loading-dots" style={{ display: "flex", gap: "10px" }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="loading-dot"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: i * 0.1 }}
                  style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: currentTheme.accent }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="content-grid">
          {/* Text Section */}
          <div className="content-section">
            {/* <h2 className="section-title" style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px", color: currentTheme.text }}>Text Content</h2> */}
            <div className="content-items" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {textData.map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
                    ease: "easeOut"
                  }}
                  className="content-item streaming-text"
                  style={{ 
                    padding: "10px", 
                    borderRadius: "10px", 
                    // backgroundColor: currentTheme.background, 
                    color: currentTheme.text,
                    position: "relative"
                  }}
                >
                  <AnimatedText text={text} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Table Section */}
          <div className="content-section" style={{ padding: "20px", backgroundColor: currentTheme.card }}>
            {/* <h2 className="section-title" style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px", color: currentTheme.text }}>Table Content</h2> */}
            <div className="content-items" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {tableData.map((table, index) => (
                <Table key={index} htmlContent={table} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
