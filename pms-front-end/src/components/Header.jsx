import React from 'react';
import { connect } from 'react-redux';

import CookieManager from '../utils/cookie';
import { Link, withRouter } from 'react-router-dom';

const Header = (props) => {
  let user;
  try {
  user = JSON.parse(CookieManager.getCookie('user'));
  }catch {
    user = {}
  }
  const token = CookieManager.getCookie('token');

  return (
    <div className="header">
      <div className="container">
        <h1 className="header__heading">
        <i class="fas fa-hamburger mr-2" onClick={()=>props.setSidebarVisible(true)} style={{cursor: 'pointer'}} title="Show Sidebar"></i>
          <Link to="/" className="header__link">
            Project Management System
          </Link>
        </h1>
        {token && (
          <div className="header__user-wrapper">
            <button className="button button--secondary header__button" onClick={(e) => logOut(props)}>
              Log Out
            </button>
            <div className="header__user-info">
              <div className="header__user-name">{user.firstname + ' ' + user.lastname}</div>
              <div className="header__user-role">{user.roles && user.roles[0].title}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function logOut(props) {
  const expiryDays = 0;
  CookieManager.setCookie('token', '', expiryDays);
  props.history.push('/login');
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(withRouter(Header));
