import React, { useState } from "react";
import PropTypes from "prop-types";

const initFormData = {
  age: "",
  height: "",
  name: ""
};

const Table = ({ data, activeName, onUpdateData }) => {
  const [formData, setFormData] = useState(initFormData);

  const onChange = ev => {
    const newFormData = { ...formData, [ev.target.name]: ev.target.value };
    setFormData(newFormData);
  };

  const onSubmit = ev => {
    ev.preventDefault();
    const newData = [...data, formData];
    onUpdateData(newData);
    setFormData(initFormData);
  };

  const onRemove = ev => {
    const newData = data.filter(s => s.name !== ev.target.name);
    onUpdateData(newData);
  };

  return (
    <div style={{ background: "green" }}>
      <form
        style={{
          padding: 8,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridRowGap: 4
        }}
        onSubmit={ev => onSubmit(ev)}
      >
        <input
          type="text"
          value={formData.name}
          placeholder="Name"
          name="name"
          onChange={ev => onChange(ev)}
          style={{ width: 100 }}
        />
        <input
          type="text"
          value={formData.height}
          placeholder="Height"
          name="height"
          onChange={ev => onChange(ev)}
          style={{ width: 100 }}
        />
        <input
          type="text"
          value={formData.age}
          placeholder="Age"
          name="age"
          onChange={ev => onChange(ev)}
          style={{ width: 100 }}
        />
        <button type="submit">Add</button>
      </form>
      <div
        style={{
          padding: 8,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridRowGap: 4
        }}
      >
        <div>Name</div>
        <div>Height</div>
        <div>Age</div>
        <div>Remove</div>
        {data.map(student => {
          const style =
            activeName === student.name
              ? { background: "grey" }
              : { background: "#a1cea1" };
          return (
            <React.Fragment
              key={`${student.name}_${student.age}_${student.height}_fragment`}
            >
              <div style={style}>{student.name}</div>
              <div style={style}>{student.height}</div>
              <div style={style}>{student.age}</div>
              <div>
                <button
                  type="button"
                  name={student.name}
                  onClick={ev => onRemove(ev)}
                >
                  Remove
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

Table.defaultProps = {
  activeName: null
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onUpdateData: PropTypes.func.isRequired,
  activeName: PropTypes.string
};

export default Table;
