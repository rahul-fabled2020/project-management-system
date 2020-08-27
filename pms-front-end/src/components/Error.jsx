import React from 'react';

function Error(props) {
  return (
    props.message ? <div className="error">Error: {props.message}</div>: null
  );
}

export default Error;