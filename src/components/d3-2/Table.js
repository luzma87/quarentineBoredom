/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import PropTypes from "prop-types";

const initFormData = {
  age: "",
  height: "",
  name: "",
};

const Table = ({ data, activeName, onUpdateData, onUpdateName }) => {
  const [formData, setFormData] = useState(initFormData);

  const onChange = (ev) => {
    const newFormData = { ...formData, [ev.target.name]: ev.target.value };
    setFormData(newFormData);
  };

  const onClick = (name) => {
    onUpdateName(name);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const newData = [...data, formData];
    onUpdateData(newData);
    onUpdateName(formData.name);
    setFormData(initFormData);
  };

  const onRemove = (ev) => {
    const newData = data.filter((s) => s.name !== ev.target.name);
    onUpdateData(newData);
  };

  const styleCentered = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      style={{
        border: "solid 2px #999",
        borderRadius: 8,
      }}
    >
      <form
        style={{
          padding: 8,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridRowGap: 4,
        }}
        onSubmit={(ev) => onSubmit(ev)}
      >
        <input
          type="text"
          value={formData.name}
          placeholder="Name"
          name="name"
          onChange={(ev) => onChange(ev)}
          style={{ width: 100 }}
        />
        <input
          type="text"
          value={formData.height}
          placeholder="Height"
          name="height"
          onChange={(ev) => onChange(ev)}
          style={{ width: 100 }}
        />
        <input
          type="text"
          value={formData.age}
          placeholder="Age"
          name="age"
          onChange={(ev) => onChange(ev)}
          style={{ width: 100 }}
        />
        <button type="submit">Add</button>
      </form>
      <div
        style={{
          padding: 8,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridRowGap: 4,
        }}
      >
        <div style={styleCentered}>Name</div>
        <div style={styleCentered}>Height</div>
        <div style={styleCentered}> Age</div>
        <div style={styleCentered}>Remove</div>
        {data.map((student) => {
          let style =
            activeName === student.name
              ? { background: "lightgray" }
              : { background: "#a1cea1" };
          style = { ...style, ...styleCentered };
          return (
            <React.Fragment
              key={`${student.name}_${student.age}_${student.height}_fragment`}
            >
              <div style={style} onClick={() => onClick(student.name)}>
                {student.name}
              </div>
              <div style={style}>{student.height}</div>
              <div style={style}>{student.age}</div>
              <div>
                <button
                  type="button"
                  name={student.name}
                  onClick={(ev) => onRemove(ev)}
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
  activeName: null,
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onUpdateData: PropTypes.func.isRequired,
  onUpdateName: PropTypes.func.isRequired,
  activeName: PropTypes.string,
};

export default Table;
