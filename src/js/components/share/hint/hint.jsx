import React from 'react';

function Hint() {
  return (
    <div className="hint">
      <h3 className="visually-hidden">
        Список подсказок
      </h3>
      <ul className="hint__list">
        <li className="hint__item">
          <p className="hint__desc">
            Для ввода номера можно использовать цифры на клавиатуре.
          </p>
        </li>
        <li className="hint__item">
          <p className="hint__desc">
            Для подтверждения ввода можно использовать ENTER или SPACE,
            а для отмены - BACKSPACE.
          </p>
        </li>
        <li className="hint__item">
          <p className="hint__desc">
            Когда виртуальная клавиатура в фокусе - можно использовать стрелки для навигации.
          </p>
        </li>
      </ul>
    </div>
  );
}

export { Hint };
