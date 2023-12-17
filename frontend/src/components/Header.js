import { Link, NavLink } from "react-router-dom";
import images from "./images";

const Header = () => {
  return (
    <header>
      <Link to="/" className="logo-container">
        <img src={images.appLogo} alt="Logo" className="app-logo" />
      </Link>
      <nav>
        <ul id="menu-list">
          <li>
            <NavLink end to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink end to="/participants">
              Participants
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
