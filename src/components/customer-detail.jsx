import React from 'react';

const CustomerDetail = (props) => {
  const style = {
    color: props.match.params.color || 'white',
  };
  return (
    <div className='customerDetail'>
      <h1>
        <span className='badge badge-danger'>
          Customer id:{' '}
          <span className='badge badge-dark' style={style}>
            {props.match.params.id}
          </span>
        </span>
      </h1>
      <hr />
    </div>
  );
};

export default CustomerDetail;
