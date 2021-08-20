import React from 'react';

import { Done } from '../../done/done';
import { PageBaseWrapper } from '../page-base-wrapper/page-base-wrapper';

function PageFinal(): React.ReactElement {
  return (
    <PageBaseWrapper>
      <Done />
    </PageBaseWrapper>
  );
}

export { PageFinal };
