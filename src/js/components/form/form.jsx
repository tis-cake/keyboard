import React, { useContext, useState, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';

import { Keyboard } from '../keyboard/keyboard';
import { FormCheckbox } from './form-checkbox/form-checkbox';
import { FormNotifyInvalid } from './form-notify-invalid/form-notify-invalid';

import { api } from '../../server/api';
import { PageContext } from '../../context';
import { updateTelState, updateFocus } from '../../utils/number';
import {
  TEL_UNDO_VALUE,
  TEL_ZERO_VALUE,
  BUTTON_UNDO_INDEX,
  BUTTON_ZERO_INDEX,
  AppRoute,
  ArrowAction,
  KeyCodeInputValue,
} from '../../const';

const KEYBOARD_BUTTONS_COUNT = 11;
const MAX_COUNT_DIGIT = 11;
const TEL_INIT_VALUE = '+7(___)___-__-__';

let buttonFocusIndex;
let buttonKeyboardFocus;

const validateTelPerServer = (number, setValidatedTelServer, setInvalidatedTelServer) => {
  api(number).then((data) => {
    if (!data.valid) {
      setInvalidatedTelServer(true);
    }

    setValidatedTelServer(data.valid);
  });
};

function Form() {
  const setCurrentPage = useContext(PageContext);
  const [tel, setTel] = useState(TEL_INIT_VALUE);
  const [checked, setChecked] = useState(false);
  const [validatedTelServer, setValidatedTelServer] = useState(false);
  const [invalidatedTelServer, setInvalidatedTelServer] = useState(false);
  const buttons = new Array(KEYBOARD_BUTTONS_COUNT).fill('').map(() => useRef(null));

  const handleTelChange = (evt) => {
    if (!evt.currentTarget.value) {
      return;
    }
    setTel(evt.currentTarget.value);
  };

  const handleKeyboardClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      return;
    }

    const inputValue = evt.target.value;
    updateTelState(setTel, inputValue);
  };

  const handleKeyboardFocus = (evt) => {
    if (evt.target === evt.currentTarget) {
      return;
    }

    const inputValue = Number(evt.target.value);

    switch (inputValue) {
      case TEL_UNDO_VALUE: {
        buttonFocusIndex = BUTTON_UNDO_INDEX;
        break;
      }

      case TEL_ZERO_VALUE: {
        buttonFocusIndex = BUTTON_ZERO_INDEX;
        break;
      }

      default: {
        buttonFocusIndex = inputValue - 1;
      }
    }

    buttonKeyboardFocus = true;
  };

  const handleKeyboardBlur = () => {
    buttonKeyboardFocus = false;
  };

  const handleWindowKeyPress = (evt) => {
    if (KeyCodeInputValue[evt.keyCode] || KeyCodeInputValue[evt.keyCode] === TEL_ZERO_VALUE) {
      const inputValue = KeyCodeInputValue[evt.keyCode];

      if (ArrowAction[inputValue] && buttonKeyboardFocus) {
        evt.preventDefault();
        updateFocus(buttons, buttonFocusIndex, inputValue);

        return;
      }

      updateTelState(setTel, inputValue);
    }
  };

  const isValidatedCheckbox = checked;
  const isValidatedTelLength = (!!tel && tel.match(/\d/g).length === MAX_COUNT_DIGIT);
  const isValidatedForm = (validatedTelServer && isValidatedTelLength && isValidatedCheckbox);

  const formInvalidClass = invalidatedTelServer
    ? 'form--invalid'
    : '';

  useEffect(() => {
    window.addEventListener('keydown', handleWindowKeyPress);
    return () => { window.removeEventListener('keydown', handleWindowKeyPress); };
  }, []);

  useEffect(() => {
    if (isValidatedTelLength) {
      validateTelPerServer(tel, setValidatedTelServer, setInvalidatedTelServer);
    }

    if (!isValidatedTelLength) {
      setInvalidatedTelServer(false);
    }
  }, [isValidatedTelLength]);

  return (
    <form
      className={`form ${formInvalidClass}`}
      action="#"
      method="post"
    >
      <h2 className="form__title">
        Введите ваш номер телефона
      </h2>

      <p className="form__desc">
        и прочтите этот подзаголовок
      </p>

      <InputMask
        mask="+7(999)999-99-99"
        placeholder={TEL_INIT_VALUE}
        className="form__input"
        type="tel"
        name="TEL"
        required
        value={tel}
        onChange={handleTelChange}
      />

      <Keyboard
        buttons={buttons}
        handleKeyboardClick={handleKeyboardClick}
        handleKeyboardFocus={handleKeyboardFocus}
        handleKeyboardBlur={handleKeyboardBlur}
      />

      {invalidatedTelServer ? <FormNotifyInvalid /> : <FormCheckbox checked={checked} setChecked={setChecked} />}

      <button
        className="form__submit btn"
        type="submit"
        disabled={!isValidatedForm}
        onClick={() => setCurrentPage(AppRoute.PAGE_FINAL)}
      >
        Подтвердить номер
      </button>
    </form>
  );
}

export { Form };
