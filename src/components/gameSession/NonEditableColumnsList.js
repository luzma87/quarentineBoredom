import PropTypes from "prop-types";
import React from "react";

const NonEditableColumnsList = ({ columns }) => {
  return (
    <div className="columns-list">
      <div className="label">Columns:</div>
      {columns.map(column => (
        <div key={column} className="tag">
          {column}
        </div>
      ))}
    </div>
  );
};

NonEditableColumnsList.defaultProps = {
  columns: []
};

NonEditableColumnsList.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string)
};

export default NonEditableColumnsList;
