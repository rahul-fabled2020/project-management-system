import React, { useState } from 'react';
import { withRouter } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';

const Dash = (props) => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="dashboard">
      <Sidebar visible={visible} setVisible={setVisible} />
      <div className="dashboard__content">
        <Header />
        {props.children}
      </div>
    </div>
  );
};
const Dashboard = withRouter(Dash);
export default Dashboard;
