import React, { Component } from 'react';

class FormField extends Component {
  render() {
    const {
      id,
      name,
      label,
      type,
      value,
      defaultValue,
      error,
      placeholder,
      onChange,
    } = this.props;
    return (
      <div className='form-field'>
        <div className='form-group'>
          <label htmlFor={id}>{label}</label>
          {error && <span className='badge badge-danger ml-3'>{error}</span>}
          <input
            type={type}
            name={name}
            id={id}
            className='form-control'
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
}

export default FormField;
