import React from "react";
import PropTypes from "prop-types";

const GenderDropdown = ({ onChange }) => {
  return (
    <label htmlFor="genders">
      Choose a gender:&nbsp;
      <select
        id="genders"
        onBlur={ev => onChange(ev)}
        onChange={ev => onChange(ev)}
      >
        <option value="women">Women</option>
        <option value="men">Men</option>
      </select>
    </label>
  );
};

GenderDropdown.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default GenderDropdown;
