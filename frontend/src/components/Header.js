import { Link, NavLink } from "react-router-dom";
import images from "./images";

const Header = () => {
  return (
    <header className="unselectable">
      <Link to="/" className="logo-container">
        <img src={images.appLogo} alt="Logo" className="app-logo" />
        <div>Arsela Internship</div>
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink end to="/">
              Apply
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
