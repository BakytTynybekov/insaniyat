import { useState } from "react";
import "./Header.scss";
import { useNavigate } from "react-router";
import Button from "../Button/Button";
import { Link } from "react-router";
import * as routes from "../../lib/routes";

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
            <Link to={routes.getViewCampaignsRoute}>Текущие сборы</Link>
          </li>
          <li>
            <Link to="/programs">Наши Направления</Link>
          </li>
          <li>
            <Link to="/about">О нас</Link>
          </li>
          <li>
            <Link to="/contacts">Контакты</Link>
          </li>
          <li>
            <Link to="/news">Новости</Link>
          </li>
        </ul>
      </nav>

      <div className="buttons">
        <Link to={routes.getViewCampaignsRoute} className="buttons_help">
          <Button>Хочу помочь</Button>
        </Link>

        <Link to={routes.getSingUpRoute()} className="buttons_sign">
          <Button className="sign-btn" variant="secondary">
            Войти
          </Button>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};
