import React, { useState } from 'react';

import { PagePreview } from '../pages/page-preview/page-preview';
import { PageFinal } from '../pages/page-final/page-final';
import { PageForm } from '../pages/page-form/page-form';

import { AppRoute } from '../../const';
import { PageContext } from '../../context';

function App() {
  const [currentPage, setCurrentPage] = useState(AppRoute.PAGE_DEFAULT);

  return (
    <PageContext.Provider value={setCurrentPage}>
      <main>
        <section className='hero'>
          <h1 className="visually-hidden">Промо раздел с вводом номера</h1>

          {(currentPage === AppRoute.PAGE_PREVIEW) && <PagePreview />}
          {(currentPage === AppRoute.PAGE_FORM) && <PageForm />}
          {(currentPage === AppRoute.PAGE_FINAL) && <PageFinal />}
        </section>
      </main>
    </PageContext.Provider>
  );
}

export { App };
