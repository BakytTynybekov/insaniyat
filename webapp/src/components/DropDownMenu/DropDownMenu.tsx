import { Link } from "react-router";
import "./dropDownMenu.scss";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { getSignOutRoute } from "../../lib/routes";

export const DropDownMenu = ({ name, email }: { name: string; email: string }) => {
  return (
    <div className="dropDownMenu">
      <div className="dropDownMenu__accInfo">
        <span className="dropDownMenu__accInfo-name">Привет, {name.split(" ")[0]} </span>
        <span className="dropDownMenu__accInfo-email">{email}</span>
      </div>
      <ul className="dropDownMenu__list">
        <li className="dropDownMenu_list-item">
          <Link to="" className="dropDownMenu__list-item-link">
            <span>
              <CiUser />
            </span>
            Профиль
          </Link>
        </li>
        <li className="dropDownMenu_list-item">
          <Link to={getSignOutRoute()} className="dropDownMenu__list-item-link">
            <span>
              <CiLogout />
            </span>
            Выход
          </Link>
        </li>
      </ul>
    </div>
  );
};
