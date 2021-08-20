import React from 'react';

import {
  TEL_UNDO_TITLE,
  TEL_UNDO_VALUE,
  TEL_ZERO_VALUE,
  BUTTON_UNDO_INDEX,
  BUTTON_ZERO_INDEX,
} from '../../const';

import { TKeyboardButtons } from '../../ts-services/types';

interface IKeyboardProps {
  buttons: TKeyboardButtons,
  handleKeyboardClick(evt: React.MouseEvent): void,
  handleKeyboardFocus(evt: React.FocusEvent): void,
  handleKeyboardBlur(): void,
}

const FOCUS_INIT_INDEX: number = 4;

const Keyboard: React.FC<IKeyboardProps> = (props) => {
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
        const isBtnReset: boolean = (index === BUTTON_UNDO_INDEX);
        const isBtnZero: boolean = (index === BUTTON_ZERO_INDEX);
        const isAutofocus: boolean = (index === FOCUS_INIT_INDEX);
        const btnResetClass: string = (isBtnReset) ? 'keyboard__btn--reset' : '';

        const correctIndex: number = index + 1;
        let correctValue: number = correctIndex;
        let correctTitle: string | number = correctIndex;

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
};

export { Keyboard };
