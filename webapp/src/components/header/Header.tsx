import { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1 onClick={() => navigate("/")}>Insaniyat</h1>
      </div>
      <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="/campaigns">Текущие сборы</a>
          </li>
          <li>
            <a href="/programs">Наши Направления</a>
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
      {/* <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkTheme ? "🇷🇺" : "🇰🇬"}
      </button> */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};
