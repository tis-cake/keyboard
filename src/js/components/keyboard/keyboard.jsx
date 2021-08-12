import React from 'react';
import PropTypes from 'prop-types';

import {
  TEL_UNDO_TITLE,
  TEL_UNDO_VALUE,
  TEL_ZERO_VALUE,
  BUTTON_UNDO_INDEX,
  BUTTON_ZERO_INDEX,
} from '../../const';

const FOCUS_INIT_INDEX = 4;

function Keyboard(props) {
  const {
    buttons,
    handleKeyboardClick,
    handleKeyboardFocus,
    handleKeyboardBlur,
  } = props;

  return (
    <div
      className="form__keyboard keyboard"
      onClick={handleKeyboardClick}
      onFocus={handleKeyboardFocus}
      onBlur={handleKeyboardBlur}
    >
      {buttons.map((button, index) => {
        const isBtnReset = (index === BUTTON_UNDO_INDEX);
        const isBtnZero = (index === BUTTON_ZERO_INDEX);
        const isAutofocus = (index === FOCUS_INIT_INDEX);
        const btnResetClass = (isBtnReset) ? 'keyboard__btn--reset' : '';

        const correctIndex = index + 1;
        let correctValue = correctIndex;
        let correctTitle = correctIndex;

        if (isBtnReset) {
          correctValue = TEL_UNDO_VALUE;
          correctTitle = TEL_UNDO_TITLE;
        }

        if (isBtnZero) {
          correctValue = TEL_ZERO_VALUE;
          correctTitle = TEL_ZERO_VALUE;
        }

        return (
          <button
            key={`keybord-btn-${correctValue}`}
            className={`keyboard__btn ${btnResetClass} btn btn--big`}
            type="button"
            autoFocus={isAutofocus}
            value={correctValue}
            ref={button}
          >
            {correctTitle}
          </button>
        );
      })}
    </div>
  );
}

Keyboard.propTypes = {
  handleKeyboardClick: PropTypes.func.isRequired,
  handleKeyboardFocus: PropTypes.func.isRequired,
  handleKeyboardBlur: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
  ).isRequired,
};

export { Keyboard };
