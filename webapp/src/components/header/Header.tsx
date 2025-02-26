import { useState } from "react";
import "./Header.css";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("light-theme", !isDarkTheme);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Insaniyat</h1>
      </div>
      <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#funds ">Текущие сборы</a>
          </li>
          <li>
            <a href="#programs">Наши Программы</a>
          </li>
          <li>
            <a href="#about">О нас</a>
          </li>
          <li>
            <a href="#contacts">Контакты</a>
          </li>
          <li>
            <a href="#news">Новости</a>
          </li>
        </ul>
      </nav>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkTheme ? "🇷🇺" : "🇰🇬"}
      </button>
      <button className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};
