import React, { useContext, useState } from 'react';
import InputMask from 'react-input-mask';

import { AppRoute } from '../../const';
import { PageContext } from '../../context';
import { undoNum, addNum } from '../../utils/number';

const MAX_COUNT_DIGIT = 11;
const TEL_INIT_VALUE = '+7(___)___-__-__';
const TEL_UNDO_VALUE = 'UNDO';

function Form() {
  const setCurrentPage = useContext(PageContext);
  const [tel, setTel] = useState(TEL_INIT_VALUE);
  const [checked, setChecked] = useState(false);

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

    setTel((prev) => {
      if (evt.target.value === TEL_UNDO_VALUE) {
        return undoNum(prev);
      }

      return addNum(prev, evt.target.value);
    });
  };

  const handleKeyboardFocus = (evt) => {
    if (evt.target === evt.currentTarget) {
      return;
    }

    console.log(evt.target);
  };

  console.log(tel);

  const isValidityTel = (!!tel && tel.match(/\d/g).length === MAX_COUNT_DIGIT);
  const isValidityCheckbox = checked;
  const isValidityForm = (isValidityTel && isValidityCheckbox);

  return (
    <form
      className="form"
      action="#"
      method="post"
    >
      <h2 className="form__title">
        Введите ваш номер мобильного телефона
      </h2>

      <InputMask
        mask="+7(999)999-99-99"
        placeholder={TEL_INIT_VALUE}
        className="form__input"
        type="tel"
        name="TEL"
        required
        value={tel}
        onChange={(evt) => handleTelChange(evt)}
      />

      <p className="form__desc">
        и с Вами свяжется наш менеждер для дальнейшей консультации
      </p>

      <div
        className="form__keyboard keyboard"
        onClick={handleKeyboardClick}
        onFocus={handleKeyboardFocus}
      >
        <button className="keyboard__btn btn" type="button" value="1">1</button>
        <button className="keyboard__btn btn" type="button" value="2">2</button>
        <button className="keyboard__btn btn" type="button" value="3">3</button>
        <button className="keyboard__btn btn" type="button" value="4">4</button>
        <button className="keyboard__btn btn" type="button" value="5">5</button>
        <button className="keyboard__btn btn" type="button" value="6">6</button>
        <button className="keyboard__btn btn" type="button" value="7">7</button>
        <button className="keyboard__btn btn" type="button" value="8">8</button>
        <button className="keyboard__btn btn" type="button" value="9">9</button>
        <button className="keyboard__btn keyboard__btn--reset btn" type="button" value={TEL_UNDO_VALUE}>Стереть</button>
        <button className="keyboard__btn btn" type="button" value="0">0</button>
      </div>

      <input
        className="form__checkbox-input visually-hidden"
        type="checkbox"
        id="checkboxUser"
        required
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label
        className="form__checkbox-label"
        htmlFor="checkboxUser"
      >
        Согласие на обработку персональных данных
      </label>

      <button
        className="form__submit btn"
        type="submit"
        disabled={!isValidityForm}
        onClick={() => setCurrentPage(AppRoute.PAGE_FINAL)}
      >
        Подтвердить номер
      </button>
    </form>
  );
}

export { Form };
