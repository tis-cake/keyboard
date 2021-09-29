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

import { TKeyboardButtons } from '../../ts-services/types';

type TSetStateTelServerStatus = React.Dispatch<React.SetStateAction<boolean>>;

const KEYBOARD_BUTTONS_COUNT: number = 11;
const MAX_COUNT_DIGIT: number = 11;
const TEL_INIT_VALUE: string = '+7(___)___-__-__';

let buttonFocusIndex: number;
let isButtonKeyboardFocus: boolean;

const validateTelPerServer = (number: string, setValidatedTelServer: TSetStateTelServerStatus, setInvalidatedTelServer: TSetStateTelServerStatus) => {
  api(number).then((data) => {
    if (!data.valid) {
      setInvalidatedTelServer(true);
    }

    setValidatedTelServer(data.valid);
  });
};

function Form(): React.ReactElement  {
  const { setCurrentPage } = useContext(PageContext);
  const [tel, setTel] = useState(TEL_INIT_VALUE);
  const [checked, setChecked] = useState(false);
  const [validatedTelServer, setValidatedTelServer] = useState(false);
  const [invalidatedTelServer, setInvalidatedTelServer] = useState(false);

  const buttons: TKeyboardButtons = new Array(KEYBOARD_BUTTONS_COUNT)
    .fill('')
    .map(() => useRef(null));

  const handleTelChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (!evt.currentTarget.value) {
      return;
    }
    setTel(evt.currentTarget.value);
  };

  const handleKeyboardClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    if (evt.target === evt.currentTarget) {
      return;
    }

    const inputValue: string = (evt.target as HTMLButtonElement).value;
    updateTelState(setTel, inputValue);
  };

  const handleKeyboardFocus = (evt: React.FocusEvent<HTMLButtonElement>): void => {
    if (evt.target === evt.currentTarget) {
      return;
    }

    const inputValue: number = Number(evt.target.value);

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

    isButtonKeyboardFocus = true;
  };

  const handleKeyboardBlur = (): void => {
    isButtonKeyboardFocus = false;
  };

  const handleWindowKeyPress = (evt: KeyboardEvent): void => {
    if (KeyCodeInputValue[evt.keyCode] || KeyCodeInputValue[evt.keyCode] === TEL_ZERO_VALUE) {
      const inputValue: any[string | number] = KeyCodeInputValue[evt.keyCode];

      if (ArrowAction[inputValue] && isButtonKeyboardFocus) {
        evt.preventDefault();
        updateFocus(buttons, buttonFocusIndex, inputValue);

        return;
      }

      updateTelState(setTel, inputValue);
    }
  };

  const isValidatedCheckbox: boolean = checked;
  const isValidatedTelLength: boolean = (!!tel && tel.match(/\d/g).length === MAX_COUNT_DIGIT);
  const isValidatedForm: boolean = (validatedTelServer && isValidatedTelLength && isValidatedCheckbox);

  const formInvalidClass: string = invalidatedTelServer
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
