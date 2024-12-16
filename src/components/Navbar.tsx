import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Apply or remove dark mode class on body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <nav
      style={{
        backgroundColor: isDarkMode ? "#222" : "#333",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed", // Fix navbar to the top
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {/* IIT Ropar Logo */}
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoYQxam_cVQzFBeyam0UcKBM0YqqkAIVL92HECfT35q5fIV1tQTz5QWUc&s"
          alt="IIT Ropar Logo"
          style={{ height: "40px", cursor: "pointer" }}
        />
      </div>

      {/* Dark Mode Toggle */}
      <div>
        <button
          onClick={toggleDarkMode}
          style={{
            backgroundColor: isDarkMode ? "#555" : "#444",
            color: "#fff",
            padding: "5px 10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="lg" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
