import PropTypes from "prop-types";
import React from "react";
import EditableColumnsList from "./EditableColumnsList";
import NonEditableColumnsList from "./NonEditableColumnsList";

const ColumnsList = ({ columns, editable, onAdd, onDelete }) => {
  if (editable) {
    return (
      <EditableColumnsList
        columns={columns}
        onAdd={onAdd}
        onDelete={onDelete}
      />
    );
  }
  return <NonEditableColumnsList columns={columns} />;
};

ColumnsList.defaultProps = {
  columns: [],
  editable: false
};

ColumnsList.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

export default ColumnsList;
