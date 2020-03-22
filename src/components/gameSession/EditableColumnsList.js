import PropTypes from "prop-types";
import React, { useState } from "react";
import CustomInput from "../_common/CustomInput";
import DeleteTagButton from "./DeleteTagButton";

const EditableColumnsList = ({ columns, onAdd, onDelete }) => {
  const [value, setValue] = useState("");

  const onChange = ev => {
    setValue(ev.target.value);
  };

  const onSave = e => {
    e.preventDefault();
    setValue("");
    onAdd(value.trim());
  };

  return (
    <div className="columns-list">
      <div className="label">Columns:</div>
      <div className="editable-colums-list-wrapper">
        <div
          className={`editable-colums-list ${
            columns.length > 0 ? "filled" : ""
          }`}
        >
          <form onSubmit={e => onSave(e)}>
            <CustomInput
              id="column"
              value={value}
              onChange={ev => onChange(ev)}
            />
          </form>
          {columns.map(column => (
            <div key={column} className="tag with-button">
              {column}
              <DeleteTagButton onClick={() => onDelete(column)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

EditableColumnsList.defaultProps = {
  columns: []
};

EditableColumnsList.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default EditableColumnsList;
