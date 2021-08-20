import React, { useContext } from 'react';

import { AppRoute } from '../../../const';
import { PageContext } from '../../../context';

function ButtonClose(): React.ReactElement {
  const { setCurrentPage } = useContext(PageContext);

  return (
    <button
      className="button-close btn btn--big"
      type="button"
      onClick={() => setCurrentPage(AppRoute.PAGE_DEFAULT)}
    >
      <p className="visually-hidden">
        Вернуться к начальной странице.
      </p>
    </button>
  );
}

export { ButtonClose };
