import { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { useLocation, useNavigate } from "react-router";
import Button from "../Button/Button";
import { Link } from "react-router";
import * as routes from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import { IoMdMenu } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { GeneralContext, useMe } from "../../lib/context";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Loader } from "../Loader/Loader";
import { env } from "../../lib/env";
import { getCloudinaryUploadUrl } from "@insaniyat/backend/src/lib/cloudinaryShared";

// Данные для dropdown меню

export const Header = () => {
  const me = useMe();
  const getProgramsResult = trpc.getPrograms.useQuery();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const context = useContext(GeneralContext);

  if (!context) {
    throw new Error("MyComponent must be used within a GeneralContextProvider");
  }

  const { setIsActive } = context;

  const path = useLocation();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAccClick = () => {
    if (path.pathname.split("/")[1] === "profile") {
      setIsActive(true);
    } else {
      navigate("profile/edit");
      setIsActive(true);
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [path]);

  if (getProgramsResult.isLoading) {
    return <Loader type="page" />;
  }

  const menuItems = [
    {
      title: "Текущие сборы",
      link: routes.getViewCampaignsRoute,
    },
    {
      title: "Наши Направления",
      link: "/programs",
      submenu: getProgramsResult.data?.programs.map((program) => ({
        title: program.title,
        link: `/programs/${program.title}`,
      })),
    },
    {
      title: "О нас",
      link: "/about",
      submenu: [
        {
          title: "Контакты",
          link: "/contacts",
        },

        {
          title: "Новости",
          link: "/news",
        },
        {
          title: "Учредительные документы",
          link: "/documents",
        },
      ],
    },
    {
      title: "Помощь",
      link: "/contacts",
      submenu: [
        {
          title: "Как получить?",
          link: "/get-help",
        },
        {
          title: "Часто задаваемые вопросы",
          link: "/questions",
        },
      ],
    },
    {
      title: "Отчеты",
      link: "/otchety",
      submenu: [
        {
          title: "Ежемесячные поступления",
          link: "monthly-receipts",
        },
        {
          title: "Ежемесячные отчеты",
          link: "monthly-reports",
        },
      ],
    },
  ];

  return (
    <header className="header">
      <div className="logo">
        <h1 onClick={() => navigate("/")}>Insaniyat</h1>
      </div>
      <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          {menuItems.map((item, i) => (
            <li
              key={i}
              className={`menu-item ${item.submenu ? "has-submenu" : ""}`}
              onMouseEnter={() => item.submenu && setActiveDropdown(item.title)}
              onMouseLeave={() => item.submenu && setActiveDropdown(null)}
            >
              <Link
                className={`menu-link ${item.submenu ? "menu-link-with-submenu" : ""}`}
                to={item.link}
              >
                {item.title}
                {item.submenu && <MdKeyboardArrowDown className="dropdown-icon" />}
              </Link>

              {item.submenu && (
                <div
                  className={`dropdown-menu ${
                    activeDropdown === item.title ? "active" : ""
                  }`}
                >
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.link}
                      className="dropdown-item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="buttons">
        <Link to={routes.getViewCampaignsRoute} className="buttons_help">
          <Button>Хочу помочь</Button>
        </Link>

        {me ? (
          <div className={`profile-btn`}>
            <button className="profile-logo" onClick={() => handleAccClick()}>
              {/* {me.name[0]} */}
              {me.avatar ? (
                <img
                  className="header_logo-img"
                  src={getCloudinaryUploadUrl(
                    env.VITE_CLOUDINARY_CLOUD_NAME,
                    me.avatar,
                    "image",
                    "large"
                  )}
                  alt=""
                />
              ) : (
                me.name[0]
              )}
            </button>
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
