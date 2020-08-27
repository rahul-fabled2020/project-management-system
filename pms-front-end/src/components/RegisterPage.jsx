import React, { Component } from 'react';
import http from '../utils/http';
import Error from './Error';

class RegisterPage extends Component {
  state = { error: undefined };
  render() {
    return (
      <div>
        {this.state.error && <Error message={this.state.error} />}
        <form action="#" className="form login__form" onSubmit={this.onSubmit}>
          <div className="container">
            <div className="form__group">
              <label htmlFor="firstname" className="form__label">
                First Name
              </label>
              <input type="text" className="form__input" name="firstname" placeholder="Enter First Name" required />
            </div>

            <div className="form__group">
              <label htmlFor="lastname" className="form__label">
                Last Name
              </label>
              <input type="text" className="form__input" name="lastname" placeholder="Enter Last Name" required />
            </div>            

            <div className="form__group">
              <label htmlFor="username" className="form__label">
                Username
              </label>
              <input type="text" className="form__input" name="username" placeholder="Enter Username" required />
            </div>

            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input type="password" className="form__input" name="password" placeholder="Enter Password" required />
            </div>

            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <input type="email" className="form__input" name="email" placeholder="Enter Email" required />
            </div>

            <div className="form__group">
              <button type="submit" className="btn btn-primary form__btn">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  onSubmit = (e) => {
    e.preventDefault();

    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    
    http
      .post('/auth/register', { firstname, lastname, email, username, password })
      .then((res) => {
        if(res.data) {    
          this.props.history.push('/login');
        }else {
          this.setState(()=>({error:res.error.message}))
        }
      })
      .catch((err) => this.setState(()=>({error:err.message})));
  };
}

export default RegisterPage;
