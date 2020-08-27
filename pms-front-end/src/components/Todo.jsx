import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import http from '../utils/http';
import CookieManager from '../utils/cookie';
import { deleteTodo } from '../redux/actions/todoActions';

const Todo = (props) => {
  return (
    <li className="todo__item">
      {props.title && (
        <div className="card">
          <h1 onClick={(e) => onClick(props)} className={`card__heading${props.isCompleted ? ' line-through' : ''}`}>
            <input type="checkbox" name="status" checked={props.isCompleted} />
            {" "+props.title}
          </h1>
          <div onClick={(e) => onClick(props)} className={`card__body${props.isCompleted ? ' line-through' : ''}`}>
            {props.description}
          </div>
          <div className="card__footer">
            <div className="card__buttons">
              <button
                className="button button--secondary"
                onClick={(e) => window.confirm(`Are you sure to delete ${props.title}?`) && onDelete(props)}
              >
                Delete
              </button>
              <Link
                to={{
                  pathname: '/edit',
                  state: {
                    id: props.id,
                    title: props.title,
                    description: props.description,
                    isCompleted: props.isCompleted
                  }
                }}
                className="button button--primary"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

const onClick = (props) => {
  http.put(
    `/todos/${props.id}`,
    {
      title: props.title,
      description: props.description,
      iscompleted: `${!props.isCompleted}`
    },
    CookieManager.getCookie('token')
  ).then(res=>{
    if(res.data) {
      props.onClick();
    }
  });
};

const onDelete = (props) => {
  http
    .destroy(`/todos/${props.id}`, CookieManager.getCookie('token'))
    .then((res) => {
      if (!res.error) {
        props.deleteTodo(props.id);
      }
    })
    .catch((err) => err);
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) => dispatch(deleteTodo(id))
  };
};

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
