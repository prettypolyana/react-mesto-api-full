import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import logoPath from '../images/logo.svg';

function Header({loggedIn, userEmail, onSignOut}) {
  return (
      <header className="header">
          <img className="header__logo" src={logoPath} alt="Логотип"/>
          {
            loggedIn ?
            (
              <div className="header__profile">
                <p className="header__email">{userEmail}</p>
                <a className="header__link header__link_grey" onClick={onSignOut}>Выйти</a>
              </div>
            ) : (
              <Switch>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__link">Войти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                </Route>
              </Switch>
            )
          }
          
      </header>
  );
}

export default Header;
