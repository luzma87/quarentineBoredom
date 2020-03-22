import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CustomIconButton from '../_common/CustomButton';
import InputWithButton from '../_common/InputWithButton';

const ColumnsList = ({
  columns, editable, onAdd, onDelete,
}) => {
  const [value, setValue] = useState('');

  const onChange = (ev) => {
    setValue(ev.target.value);
  };

  const onSave = () => {
    setValue('');
    onAdd(value.trim());
  };

  return (
    <div style={{ display: 'flex' }}>
      Columns:
      {editable
        ? (
          <InputWithButton
            id="column"
            value={value}
            onChange={((ev) => onChange(ev))}
            label="new column"
            icon="save"
            onClick={() => onSave()}
          />
        )
        : null}
      {columns.map((column) => (
        <div key={column} style={{ padding: '0 4px' }}>
          {column}
          {editable
            ? <CustomIconButton icon="trash-alt" onClick={() => onDelete(column)} />
            : null}
        </div>
      ))}
    </div>
  );
};

ColumnsList.defaultProps = {
  columns: [],
  editable: false,
};

ColumnsList.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

export default ColumnsList;
