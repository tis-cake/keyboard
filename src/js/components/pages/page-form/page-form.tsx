import React from 'react';

import { Form } from '../../form/form';
import { Hint } from '../../share/hint/hint';
import { PageBaseWrapper } from '../page-base-wrapper/page-base-wrapper';

function PageForm(): React.ReactElement {
  return (
    <>
      <PageBaseWrapper>
        <Form />
      </PageBaseWrapper>

      <Hint />
    </>
  );
}

export { PageForm };
