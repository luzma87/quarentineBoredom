import PropTypes from "prop-types";
import React, { useState } from "react";
import ConditionalComponent from "../_common/ConditionalComponent";
import InputWithButton from "../_common/InputWithButton";

const LettersList = ({ letters, editable, onSave }) => {
  const [letter, setLetter] = useState("");

  const onChange = ev => {
    const inputLetter = ev.target.value.trim();
    setLetter(inputLetter[inputLetter.length - 1]);
  };

  const onSaveLetter = () => {
    setLetter("");
    onSave(letter);
  };

  return (
    <>
      <ConditionalComponent visible={letters.length > 0}>
        <div style={{ display: "flex" }}>
          <div className="label">Past letters:</div>
          {letters.join(", ")}
        </div>
      </ConditionalComponent>
      <ConditionalComponent visible={editable}>
        <InputWithButton
          id="letter"
          value={letter}
          onChange={ev => onChange(ev)}
          label="next letter"
          icon="save"
          onClick={() => onSaveLetter()}
        />
      </ConditionalComponent>
    </>
  );
};

LettersList.defaultProps = {
  letters: [],
  editable: false
};

LettersList.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string),
  onSave: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

export default LettersList;
