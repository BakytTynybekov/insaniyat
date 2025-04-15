import { Link, NavLink, Outlet } from "react-router";
import "./profile.scss";
import { MdLogout } from "react-icons/md";
import { getSignOutRoute } from "../../lib/routes";
import { FaAward, FaFileDownload, FaHistory, FaRegUser } from "react-icons/fa";
import { trpc } from "../../lib/trpc";
import { useContext } from "react";
import { GeneralContext } from "../../lib/context";

export const Profile = () => {
  const context = useContext(GeneralContext);

  if (!context) {
    throw new Error("MyComponent must be used within a GeneralContextProvider");
  }

  const { isActive, setIsActive } = context;

  const getMeResult = trpc.getMe.useQuery(undefined, {
    retry: false,
  });

  if (getMeResult.isLoading) {
    return <span>Loading</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  const me = getMeResult.data.me;

  if (!me) {
    return <span>Only for authorized</span>;
  }

  return (
    <div className="profile">
      <div
        className={`profile__item ${isActive ? "" : "profile__item-menu"}`}
        onClick={() => setIsActive(false)}
      >
        <div className="profile__accInfo">
          <span className="profile__accInfo-name">Привет, {me.name}</span>
          <span className="profile__accInfo-email">{me.email}</span>
          <div className="support_sum">
            <span>Ваш вклад</span>
            <div className="sum_box">
              <i className="icon-heart-outline"></i>
              <strong>0 Р</strong>
            </div>
          </div>{" "}
        </div>
        <ul className="profile__list">
          <li className="profile_list-item">
            <NavLink to="/profile/edit" className="profile__list-item-link">
              <span>
                <FaRegUser />
              </span>
              Профиль
            </NavLink>
          </li>
          <li className="profile_list-item">
            <NavLink to="history" className="profile__list-item-link">
              <span>
                <FaHistory />
              </span>
              История пожертвований
            </NavLink>
          </li>
          <li className="profile_list-item">
            <NavLink to="history" className="profile__list-item-link">
              <span>
                <FaHistory />
              </span>
              Мои подписки
            </NavLink>
          </li>
          <li className="profile_list-item">
            <NavLink to="awards" className="profile__list-item-link">
              <span>
                <FaAward />
              </span>
              Мои достижения
            </NavLink>
          </li>
          <li className="profile_list-item">
            <Link to="history" className="profile__list-item-link">
              <span>
                <FaFileDownload />
              </span>
              Публичная оферта
            </Link>
          </li>
          <li className="profile_list-item">
            <Link to="history" className="profile__list-item-link">
              <span>
                <FaFileDownload />
              </span>
              Политика конфиденциальности
            </Link>
          </li>
          <li className="profile_list-item">
            <Link to={getSignOutRoute()} className="profile__list-item-link">
              <span>
                <MdLogout />
              </span>
              Выход
            </Link>
          </li>
        </ul>
      </div>
      <div className={`profile__item ${isActive ? "profile__item-page" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};
