import PropTypes from 'prop-types';
import React, { useState } from 'react';
import InputWithButton from '../_common/InputWithButton';

const LettersList = ({ letters, onSave }) => {
    const [letter, setLetter] = useState("");

    const onChange = (ev) => {
        const letter = ev.target.value.trim();
        setLetter(letter[letter.length - 1]);
    }

    const onSaveLetter = () => {
        setLetter("");
        onSave(letter);
    }


    return (
        <>
            <div style={{ display: 'flex' }}>
                Letters: {letters.join(", ")}
            </div>
            <InputWithButton
                id="letter"
                value={letter}
                onChange={(ev => onChange(ev))}
                label="next letter"
                icon="save"
                onClick={() => onSaveLetter()} />
        </>
    );
}

LettersList.defaultProps = {
    letters: [],
}

LettersList.propTypes = {
    letters: PropTypes.arrayOf(PropTypes.string),
    onSave: PropTypes.func,
}

export default LettersList;
