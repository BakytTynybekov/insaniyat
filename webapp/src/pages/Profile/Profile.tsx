import { Link, NavLink, Outlet } from "react-router";
import "./profile.scss";
import { MdLogout } from "react-icons/md";
import { getSignOutRoute } from "../../lib/routes";
import { FaAward, FaFileDownload, FaHistory, FaRegUser } from "react-icons/fa";

export const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__item">
        <div className="profile__accInfo">
          <span className="profile__accInfo-name">Привет, Бакыт Тыныбеков </span>
          <span className="profile__accInfo-email">bakyt.tynybekov@gmail.com</span>
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
      <div className="profile__item">
        <Outlet />
      </div>
    </div>
  );
};
