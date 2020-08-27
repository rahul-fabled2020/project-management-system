import React, { Component } from 'react';
import { connect } from 'react-redux';

import http from './utils/http';
import withAuth from './hoc/withAuth';
import Error from './components/Error';
import CookieManager from './utils/cookie';
import handleError from './utils/handleError';

class App extends Component {
  state = {
    totalCounts: {
      usersCount: 0,
      projectsCount: 0,
      tasksCount: 0
    },
    error: ''
  };

  componentDidMount() {
    const token = CookieManager.getCookie('token');

    http
      .get('/stats', token)
      .then((res) => this.setState(() => ({ totalCounts: res.data })))
      .catch((error) => this.setState(() => ({ error: handleError(error) })));
  }

  render() {
    return (
      <div className="app">
        <Error message={this.state.error} />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card-counter primary">
                <i className="fas fa-project-diagram"></i>
                <span className="count-numbers">{this.state.totalCounts.projectsCount}</span>
                <span className="count-name">Projects</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-counter danger">
                <i className="fas fa-tasks"></i>
                <span className="count-numbers">{this.state.totalCounts.tasksCount}</span>
                <span className="count-name">Tasks</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-counter info">
                <i className="fa fa-users"></i>
                <span className="count-numbers">{this.state.totalCounts.usersCount}</span>
                <span className="count-name">Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(App));
