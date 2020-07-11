import React from 'react';

const ProgramaticNavigation = (props) => {
  return (
    <div>
      <button className='btn btn-primary m-2' onClick={() => handlePush(props)}>
        Customers - push()
      </button>
      <button
        className='btn btn-primary ml-2'
        onClick={() => handleReplace(props)}>
        Customers - replace()
      </button>
    </div>
  );
};
// for login pages
const handlePush = (props) => {
  props.history.push('/customers');
};
const handleReplace = (props) => {
  //back will not work it will be replaced from history
  props.history.replace('/customers');
};

export default ProgramaticNavigation;
