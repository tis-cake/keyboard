import React, { useContext } from 'react';

import { AppRoute } from '../../const';
import { PageContext } from '../../context';

function ButtonClose() {
  const setCurrentPage = useContext(PageContext);

  return (
    <button
      className="button-close"
      type="button"
      onClick={() => setCurrentPage(AppRoute.PAGE_DEFAULT)}
    >
      <p className="visually-hidden">
        Закрыть окно.
      </p>
    </button>
  );
}

export { ButtonClose };
