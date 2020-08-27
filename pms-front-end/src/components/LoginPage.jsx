import {Alert} from 'react-bootstrap';
import React, { useState } from 'react';

import Error from './Error';
import http from '../utils/http';
import CookieManager from '../utils/cookie';
import handleError from '../utils/handleError';

const LoginPage = (props) => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  return (
    <div className="login">
      {error && <Error message={error} />}
      {loading && <Alert variant="info" className="text-center">Logging In...</Alert>}
      <form action="#" className="form login__form" onSubmit={(e) => onSubmit(e, props, setError, setLoading)}>
        <div className="container">
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <input type="email" className="form__input" name="email" placeholder="Enter email" required />
          </div>

          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input type="password"  className="form__input" name="password" placeholder="Enter Password" required />
          </div>

          <div className="form__group">
            <button type="submit" className="button button--primary form__btn">
              Login
            </button>
          </div>
        </div>

        <div className="container">
          <div className="form__footer">
            Don't have an account? <a href="mailto: rahul.fabled@gmail.com">Contact Admin</a>
          </div>
        </div>
      </form>
    </div>
  );
};

function onSubmit(e, props, setError, setLoading) {
  e.preventDefault();
  setLoading(true);

  const email = e.target.email.value;
  const password = e.target.password.value;

  e.target.email.value='';
  e.target.password.value='';

  http
    .post('/auth/login', { email, password })
    .then((res) => {
      if(res.data) {

        const expiryDays = 1;
        CookieManager.setCookie("user", JSON.stringify(res.data.user), expiryDays);
        CookieManager.setCookie("token", res.data.token, expiryDays);

        props.history.push('/');
      }else {
        setLoading(false);
        setError(handleError(res.error));
      }
    })
    .catch((err) => setLoading(false) || setError(handleError(err)));
}

export default LoginPage;
