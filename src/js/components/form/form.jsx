import React, { useContext } from 'react';

import { AppRoute } from '../../const';
import { PageContext } from '../../context';

function Form() {
  const setCurrentPage = useContext(PageContext);

  return (
    <form
      className="form"
      action="#"
      method="post"
    >
      <h2 className="form__title">
        Введите ваш номер мобильного телефона
      </h2>

      <input
        className="form__input"
        type="tel"
        name="TEL"
        placeholder="+7(___)___-__-__"
        required
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
        // disabled
        onClick={() => setCurrentPage(AppRoute.PAGE_FINAL)}
      >
        Подтвердить номер
      </button>
    </form>
  );
}

export { Form };
