// MenuLeft.jsx
import logo from "../../assets/ibi-logo.png";
import OptionsMenuLeft from "./OptionsMenuLeft";
import { FaUserPlus, FaBed, FaRegCalendarAlt, FaHome} from "react-icons/fa";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import "./MenuLeft.css";

function MenuLeft() {

  
const navigate = useNavigate();

const handleNavigation = (route) => {
  if(route)  navigate(route);
};
const handleLogout = () => {
  navigate("/");
};

const handleGoToHome = () => {
    navigate("/menu");
};
 

  const items = [
    { icon: <FaRegCalendarAlt />, title: "Reservas", route: "/checkGuests"},
    { icon: <BiLogIn />, title: "Check-in", route: "/checkIn" },
    { icon: <BiLogOut />, title: "Check-out", route: "/checkOut" },
  ];

  return (
    <div className="containerMenuLeft" >
      <div className="menuContentWrapper">
        <div className="headerMenuLeft">
          <img src={logo} alt="logoIbiHost" onClick={handleLogout}  />
          <h1>IbiHost</h1>
        </div>
        <div className="optionsMenuLeft">
          <OptionsMenuLeft items={items} onNavigate={handleNavigation}/>
        </div>
      </div>

      <div className="homeIconContainer" onClick={handleGoToHome}>
        <FaHome />
      </div>
    </div>

    
  );
}

export default MenuLeft;