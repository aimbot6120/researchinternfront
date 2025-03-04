"use client";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        {/* Logo on the left */}
        <a href="#" className="logo">
          <img src="/logo.svg" alt="XGaming Logo" className="logo-icon" />
        </a>
      </div>
    </header>
  );
};

export default Header;
