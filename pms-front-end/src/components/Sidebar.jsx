import React from 'react';
import { withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';

const Side = (props) => {
  return (
    <div className="sidebar" style={props.visible ? { width: '250px' } : { width: '0' }}>
      <h1 className="sidebar__heading">PMS-Dashboard</h1>
      <span className="closebtn" onClick={() => props.setVisible(false)}>
        ×
      </span>

      <NavLink to="/" activeClassName="active" exact={true}>Home</NavLink>
      <NavLink to="/users" activeClassName="active">Users</NavLink>
      <NavLink to="/projects" activeClassName="active">Projects</NavLink>
      <NavLink to="/tasks" activeClassName="active">Tasks</NavLink>
    </div>
  );
};

const Sidebar = withRouter(Side);
export default Sidebar;
