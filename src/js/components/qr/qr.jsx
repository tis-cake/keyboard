import React, { useContext } from 'react';

import { AppRoute } from '../../const';
import { PageContext } from '../../context';

function Qr() {
  const setCurrentPage = useContext(PageContext);

  return (
    <section className="qr">
      <h2 className="qr__title">
        <span className="qr__title-item">ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!</span>
        <span className="qr__title-item">ПОДАРИТЕ ЕМУ СОБАКУ!</span>
      </h2>

      <figure className="qr__img-wrap">
        <img className="qr__img" src="assets/img/qr-code.png" alt="QR-код" width="126" height="126" />
      </figure>

      <p className="qr__desc">
        Сканируйте QR-код или нажмите ОК
      </p>

      <button
        className="qr__btn btn"
        type="button"
        onClick={() => setCurrentPage(AppRoute.PAGE_FORM)}
      >
        Ок
      </button>
    </section>
  );
}

export { Qr };
