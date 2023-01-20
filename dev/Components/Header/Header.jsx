import React, { useState, useEffect, useContext } from "react";
import "./Header.scss";

import logo from "../../media/logo.png";

import BehaviorsContext from "../../Context/Behaviors";

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  const { outerWidth } = useContext(BehaviorsContext);

  const handlerMenuToggle = () => {
    console.log(menuToggle);
    setMenuToggle(!menuToggle);
  };

  useEffect(() => {
    menuToggle || outerWidth >= 768 ? (document.getElementById("header-bar-nav").style.display = "block") : (document.getElementById("header-bar-nav").style.display = "none");
  }, [menuToggle, outerWidth]);

  return (
    <header className='header' id='home'>
      <div className='header-content'>
        <div className='header-bar'>
          <div className='menu-toggle' onClick={handlerMenuToggle}>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-list' viewBox='0 0 16 16'>
              <path fillRule='evenodd' d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z' />
            </svg>
          </div>
          <div className='header-bar-title'>
            <img src={logo} alt='Logo' />
            <h1>METALYPLAST</h1>
          </div>
          <nav className='header-bar-nav' id='header-bar-nav'>
            <ul>
              <li>
                <a href='#home'>Inicio</a>
              </li>
              <li>
                <a href='#gallery'>Galeria</a>
              </li>
              <li>
                <a href='#aboutus'>Sobre Nosotros</a>
              </li>
              <li>
                <a href='#contact'>Contacto</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className='header-body'>
          <p>El placer de descansar de los Santandereanos</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
