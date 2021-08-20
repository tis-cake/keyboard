import React, { useState } from 'react';

import { PagePreview } from '../pages/page-preview/page-preview';
import { PageFinal } from '../pages/page-final/page-final';
import { PageForm } from '../pages/page-form/page-form';
import { Video } from '../share/video/video';

import { AppRoute } from '../../const';
import { PageContext } from '../../context';

function App(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState(AppRoute.PAGE_DEFAULT);

  return (
    <PageContext.Provider value={{ setCurrentPage }}>
      <main>
        <section className="hero">
          <div className="hero__wrap-hidden">
            <h1 className="visually-hidden">Промо раздел с вводом номера</h1>

            <Video />

            {(currentPage === AppRoute.PAGE_PREVIEW) && <PagePreview />}
            {(currentPage === AppRoute.PAGE_FORM) && <PageForm />}
            {(currentPage === AppRoute.PAGE_FINAL) && <PageFinal />}
          </div>
        </section>
      </main>
    </PageContext.Provider>
  );
}

export { App };
