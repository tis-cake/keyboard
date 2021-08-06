import React, { useContext, useState } from 'react';
import InputMask from 'react-input-mask';

import { AppRoute } from '../../const';
import { PageContext } from '../../context';

const REGEXP_PATTERN = /\d/g;
const MAX_COUNT_NUMBERS = 11;

function Form() {
  const setCurrentPage = useContext(PageContext);
  const [tel, setTel] = useState('');
  const [checked, setChecked] = useState(false);

  // const handleTelChange = (evt) => {
  //   setTel(evt.currentTarget.value);
  // };

  // const handleCheckboxChange = () => {
  //   setChecked(!checked);
  // };

  const isValidityTel = (!!tel && tel.match(REGEXP_PATTERN).length === MAX_COUNT_NUMBERS);
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
        placeholder="+7(___)___-__-__"
        className="form__input"
        type="tel"
        name="TEL"
        required
        onChange={(evt) => setTel(evt.currentTarget.value)}
      />

      <p className="form__desc">
        и с Вами свяжется наш менеждер для дальнейшей консультации
      </p>

      <div className="form__keyboard keyboard">
        <button className="keyboard__btn btn" type="button">1</button>
        <button className="keyboard__btn btn" type="button">2</button>
        <button className="keyboard__btn btn" type="button">3</button>
        <button className="keyboard__btn btn" type="button">4</button>
        <button className="keyboard__btn btn" type="button">5</button>
        <button className="keyboard__btn btn" type="button">6</button>
        <button className="keyboard__btn btn" type="button">7</button>
        <button className="keyboard__btn btn" type="button">8</button>
        <button className="keyboard__btn btn" type="button">9</button>
        <button className="keyboard__btn keyboard__btn--reset btn" type="button">Стереть</button>
        <button className="keyboard__btn btn" type="button">0</button>
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
