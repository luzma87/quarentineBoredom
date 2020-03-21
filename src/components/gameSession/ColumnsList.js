import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CustomIconButton from '../_common/CustomButton';
import InputWithButton from '../_common/InputWithButton';

const ColumnsList = ({ columns, onAdd, onDelete }) => {
    const [value, setValue] = useState("");

    const onChange = (ev) => {
        setValue(ev.target.value.trim());
    }

    const onSave = () => {
        setValue("");
        onAdd(value);
    }

    return (
        <div style={{ display: 'flex' }}>
            Columns: <InputWithButton
                id="column"
                value={value}
                onChange={(ev => onChange(ev))}
                label="new column"
                icon="save"
                onClick={() => onSave()} />
            {columns.map(column => (
                <div key={column} style={{ padding: '0 4px' }}>
                    {column}
                    <CustomIconButton icon="trash-alt" onClick={() => onDelete(column)} />
                </div>
            ))}
        </div>
    );
}

ColumnsList.defaultProps = {
    columns: []
}

ColumnsList.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string),
    onAdd: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default ColumnsList;
