import React from "react";
import logo from "../images/svg/logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Место Россия" />
    </header>
  );
}

export default Header;
