import React, { Component } from 'react';

import Dashboard from '../components/Dashboard';

function withDashboard(WrappedComponent) {
  return class extends Component {

    render() {
      return (
        <Dashboard>
          <WrappedComponent {...this.props} />
        </Dashboard>
      );
    }
  };
}

export default withDashboard;
