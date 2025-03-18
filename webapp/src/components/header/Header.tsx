import { useEffect, useRef, useState } from "react";
import "./Header.scss";
import { useLocation, useNavigate } from "react-router";
import Button from "../Button/Button";
import { Link } from "react-router";
import * as routes from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import { DropDownMenu } from "../DropDownMenu/DropDownMenu";
import { IoMdMenu } from "react-icons/io";
import { CiUser } from "react-icons/ci";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // Референс на контейнер меню

  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery();
  const path = useLocation();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropMenuOpen(false);
  }, [path]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        {isLoading || isError || isFetching ? null : data.me ? (
          <div
            className={`profile ${isDropMenuOpen ? "profile-open" : "profile-close"}`}
            ref={dropdownRef}
          >
            <button
              className="profile-logo"
              onClick={() => setIsDropMenuOpen(!isDropMenuOpen)}
            >
              {data.me.name.split(" ")[1][0]}
            </button>
            {isDropMenuOpen && <DropDownMenu email={data.me.email} name={data.me.name} />}
          </div>
        ) : (
          <Link to={routes.getSignInRoute()} className="buttons_sign">
            <CiUser size={30} />
          </Link>
        )}

        <button className="menu-toggle" onClick={toggleMenu}>
          <IoMdMenu color="black" size={40} />
        </button>
      </div>
    </header>
  );
};
