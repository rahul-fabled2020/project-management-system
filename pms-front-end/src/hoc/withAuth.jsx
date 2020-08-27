import React, { Component } from 'react';

import CookieManager from '../utils/cookie';

function withAuth(WrappedComponent) {
  return class extends Component {

    render() {
      const token = CookieManager.getCookie('token');
      if(!token) {
        this.props.history.push('/login');
      }

      return token && <WrappedComponent {...this.props} />;
    }
  };
}

export default withAuth;
