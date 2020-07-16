import React, { Component } from 'react';

class DropDown extends Component {
  /*     state={

    }
  change(event) {
    this.setState({ value: event.target.value });
  } */
  render() {
    const {
      id,
      name,
      label,
      options,
      optionText,
      optionValue,
      onChange,
    } = this.props;
    return (
      <div className='form-group'>
        <label htmlFor={id}>{label}</label>
        <select
          name={name}
          id={id}
          className='form-control'
          onChange={onChange}>
          {options.map((option, i) => (
            // dynamically accessing properties of an object
            <option key={i} value={option[optionValue]}>
              {option[optionText]}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
// default properties, if we do not define any this will be applied
DropDown.defaultProps = {
  optionText: 'Telephone',
  optionValue: 'Id',
};
export default DropDown;
