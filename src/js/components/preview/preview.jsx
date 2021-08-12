import React, { useContext } from 'react';

import { QrPreview } from '../share/qr/qr-preview';

import { PageContext } from '../../context';
import { FIGCAPTION_QR_PREVIEW, AppRoute } from '../../const';

function Preview() {
  const setCurrentPage = useContext(PageContext);

  return (
    <section className="preview">
      <h2 className="preview__title">
        <span className="preview__title-item">Awesome h2-заголовок</span>
        <span className="preview__title-item">Сеошники лябят такие вещи</span>
      </h2>

      <QrPreview
        blockClassName="preview__qr"
        figcaption={FIGCAPTION_QR_PREVIEW}
      />

      <button
        className="preview__btn btn"
        type="button"
        onClick={() => setCurrentPage(AppRoute.PAGE_FORM)}
      >
        keyboard
      </button>
    </section>
  );
}

export { Preview };
