import React from 'react';
import queryString from 'query-string';

const ShowParams = (props) => {
  const paramsObj = queryString.parse(props.location.search);
  //renderParams(paramsObj);
  return (
    <div className='showParams'>
      <h1>Show Parameters</h1>
      <hr />
      {renderParams(paramsObj)}
    </div>
  );
};
const renderParams = (paramsObj) => {
  console.log(paramsObj);
  const li = [];
  for (const key in paramsObj) {
    const element = paramsObj[key];
    li.push(
      <li key={key}>
        {key} has value of {element}
      </li>
    );
  }
  return <ul>{li}</ul>;
};
export default ShowParams;
