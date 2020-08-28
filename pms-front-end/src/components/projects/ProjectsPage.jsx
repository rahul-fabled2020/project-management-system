import React, { Component } from 'react';

import withAuth from '../../hoc/withAuth';
import { NavLink, Link } from 'react-router-dom';
import http from '../../utils/http';
import CookieManager from '../../utils/cookie';

import { Table } from 'react-bootstrap';
import Error from '../Error';
import AddProjectModal from './AddProjectModal';
import handleError from '../../utils/handleError';
import { connect } from 'react-redux';
import * as apiActions from '../../redux/actions/apiActions';
import { ROLES } from '../../configs/constants';

class ProjectsPage extends Component {
  state = { error: '', showModal: false };

  onDelete = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      const token = CookieManager.getCookie('token');
      http
        .destroy(`/projects/${id}`, token)
        .then((res) => res)
        .catch((err) => handleError(err));
    }
  };

  componentDidMount() {
    this.props.storeProjects([]);
    const token = CookieManager.getCookie('token');
    const user = JSON.parse(CookieManager.getCookie('user'));
    const url =
      user.roles[0].id === ROLES['Project Manager'] || user.roles[0].id === ROLES['Admin']
        ? '/projects'
        : `/users/${user.id}/projects`;
    http
      .get(url, token)
      .then((res) => {
        const projects = res.data;

        if (projects) {
          projects.sort((a, b) => (a.id > b.id ? -1 : 1));
          this.props.storeProjects(projects);
        }

        if (res.error) {
          this.setState(() => ({ error: handleError(res.error) }));
        }
      })
      .catch((err) => this.setState({ error: handleError(err) }));
  }

  render() {
    const { showModal } = this.state;
    const { projects } = this.props;

    return (
      <div className="container">
        <Error message={this.state.error} />
        <nav aria-label="breadcrumb" className="dashboard__nav-bar">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/" activeClassName="active" exact={true}>
                Home
              </NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/projects" activeClassName="active">
                Projects
              </NavLink>
            </li>
          </ol>
        </nav>

        <div className="dasboard__add-btn-wrapper">
          <button className="dashboard__add-btn" onClick={() => this.setState(() => ({ showModal: true }))} title="Add">
            <i className="fas fa-plus-circle"></i>
          </button>
        </div>

        <Table responsive className="dashboard__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Manager</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan={4}>No projects present</td>
              </tr>
            )}
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.title}</td>
                <td>{project.manager}</td>
                <td>
                  <Link to={`/projects/${project.id}`} className="dashboard__table-links" title="View">
                    <i className="fas fa-eye"></i>
                  </Link>
                  <Link to={`/projects/${project.id}/edit`} className="dashboard__table-links" title="Edit">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <span className="dashboard__table-links" onClick={(e) => this.onDelete(project.id)} title="Delete">
                    <i className="fas fa-trash-alt"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add Project Modal */}
        <AddProjectModal show={showModal} onHide={() => this.setState(() => ({ showModal: false }))} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { projects: state.api.projects };
}

function mapDispatchToProps(dispatch) {
  return { storeProjects: (projects) => dispatch(apiActions.storeProjects(projects)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(ProjectsPage));
