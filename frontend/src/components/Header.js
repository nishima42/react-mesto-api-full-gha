import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import logo from '../images/mesto-logo.svg';

function Header(props) {

  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('token');
    navigate('/sign-in', {replace: true});
    props.handleLogOut();
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место Россия" />
      <div className="header__container">
        {props.loggedIn && <p className="header__user-email">{props.userEmail }</p>}
        {props.loggedIn && <p className="header__auth-button" onClick={signOut}>Выйти</p>}
        <Routes>
          <Route path='/sign-up' element={<Link to='/sign-in' className="header__auth-button">Войти</Link>} />
          <Route path='/sign-in' element={<Link to='/sign-up' className="header__auth-button">Регистрация</Link>} />
        </Routes>
      </div>
    </header>
  );
}

export default Header;